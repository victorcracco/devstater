"""Enriquecimento: valida o domínio do e-mail, avalia o site e decide a oportunidade de cada lead."""
import asyncio
import json
from collections import Counter
from datetime import date

from . import emails, sites

SEM_DOMINIO = {"gratuito", "provedor"}
DESCARTE = {"vazio": "sem_email", "invalido": "email_invalido", "contador": "email_do_contador"}
CAMPOS_SITE = (
    "site_url", "site_status", "site_erro", "site_https", "site_mobile", "site_ms", "site_ano",
    "site_titulo", "site_plataforma", "site_instagram", "site_whatsapp", "emails_site",
)


def decidir(email_tipo: str, mx: bool | None, site: dict) -> tuple[str, list[str]]:
    if email_tipo in DESCARTE:
        return "descartar", [DESCARTE[email_tipo]]
    if mx is False:
        return "descartar", ["dominio_nao_recebe_email"]
    if email_tipo in SEM_DOMINIO:
        return "sem_site_provavel", ["sem_dominio_proprio"]
    status = site.get("site_status")
    if status == "rede_social":
        return "sem_site_provavel", ["dominio_aponta_para_rede_social"]
    if status in ("fora_do_ar", "estacionado"):
        return "site_fora_do_ar", [f"site_{status}"]
    if status == "bloqueado":
        return "revisar", ["site_bloqueou_acesso"]
    motivos = []
    if not site.get("site_https"):
        motivos.append("sem_https")
    if not site.get("site_mobile"):
        motivos.append("nao_responsivo")
    if (site.get("site_ms") or 0) > 5000:
        motivos.append("lento")
    ano = site.get("site_ano")
    if ano and ano <= date.today().year - 4:
        motivos.append(f"desatualizado_{ano}")
    return ("site_fraco" if motivos else "site_ok"), motivos


def _int(valor: bool | None) -> int | None:
    return None if valor is None else int(valor)


def enriquecer(conn, nicho: str, limite: int | None = None, refazer: bool = False) -> dict:
    leads = conn.execute(
        "SELECT cnpj, email, email_tipo FROM leads"
        " WHERE nicho = ? AND (? OR enriquecido_em IS NULL) ORDER BY cnpj LIMIT ?",
        (nicho, int(refazer), limite or -1),
    ).fetchall()
    if not leads:
        return {"processados": 0}

    def dominio(lead) -> str | None:
        return lead["email"].partition("@")[2] if lead["email"] else None

    mx = emails.verificar_mx(sorted({dominio(l) for l in leads if l["email_tipo"] not in DESCARTE}))
    com_site = sorted({
        dominio(l) for l in leads
        if l["email_tipo"] == "corporativo" and mx.get(dominio(l)) is not False
    })
    avaliacoes = asyncio.run(sites.avaliar_varios(com_site)) if com_site else {}

    contagem = Counter()
    atribuicoes = ", ".join(f"{c} = ?" for c in CAMPOS_SITE)
    with conn:
        for lead in leads:
            d = dominio(lead)
            site = avaliacoes.get(d, {}) if lead["email_tipo"] == "corporativo" else {}
            oportunidade, motivos = decidir(lead["email_tipo"], mx.get(d), site)
            conn.execute(
                f"""UPDATE leads SET dominio = ?, email_mx = ?, {atribuicoes},
                        oportunidade = ?, motivos = ?,
                        status = CASE WHEN status = 'encontrado' THEN 'enriquecido' ELSE status END,
                        enriquecido_em = datetime('now'), atualizado_em = datetime('now')
                    WHERE cnpj = ?""",
                (d, _int(mx.get(d)), *(site.get(c) for c in CAMPOS_SITE),
                 oportunidade, json.dumps(motivos), lead["cnpj"]),
            )
            contagem[oportunidade] += 1
    return {"processados": len(leads), "sites_avaliados": len(com_site), **contagem}
