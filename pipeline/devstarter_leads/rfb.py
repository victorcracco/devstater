"""Download e importação da base aberta de CNPJ da Receita Federal.

A Receita publica a base todo mês num compartilhamento Nextcloud público, acessível
por WebDAV usando o token do compartilhamento como usuário e senha vazia.
"""
import base64
import csv
import io
import re
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from collections import Counter
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from . import config, db, emails

ARQUIVOS = (
    [f"Estabelecimentos{i}.zip" for i in range(10)]
    + [f"Empresas{i}.zip" for i in range(10)]
    + ["Simples.zip", "Municipios.zip", "Cnaes.zip"]
)

PORTES = {"00": "nao_informado", "01": "micro", "03": "pequeno", "05": "demais"}


def _autorizacao() -> str:
    return "Basic " + base64.b64encode(f"{config.RFB_SHARE_TOKEN}:".encode()).decode()


def ultima_competencia() -> str:
    req = urllib.request.Request(
        config.RFB_WEBDAV + "/",
        method="PROPFIND",
        headers={"Depth": "1", "Authorization": _autorizacao()},
    )
    resposta = urllib.request.urlopen(req, timeout=60).read()
    hrefs = [e.text or "" for e in ET.fromstring(resposta).iter("{DAV:}href")]
    meses = sorted(m for h in hrefs for m in re.findall(r"/(\d{4}-\d{2})/$", h))
    if not meses:
        raise RuntimeError("Nenhuma competência encontrada no compartilhamento da Receita")
    return meses[-1]


def baixar(competencia: str | None = None) -> str:
    comp = competencia or ultima_competencia()
    destino = config.RFB_DIR / comp
    destino.mkdir(parents=True, exist_ok=True)
    lista = destino / "urls.txt"
    lista.write_text("".join(f"{config.RFB_WEBDAV}/{comp}/{a}\n" for a in ARQUIVOS))
    # O servidor da Receita limita cada conexão a ~0,5 MB/s, então baixamos em paralelo
    subprocess.run(
        [
            "aria2c", "--continue=true", "--auto-file-renaming=false",
            "--max-concurrent-downloads=4", "--max-connection-per-server=4",
            "--split=4", "--min-split-size=20M",
            f"--header=Authorization: {_autorizacao()}",
            "--console-log-level=warn", "--summary-interval=120",
            "--dir", str(destino), "--input-file", str(lista),
        ],
        check=True,
    )
    return comp


def competencia_baixada() -> str:
    meses = sorted(p.name for p in config.RFB_DIR.glob("????-??") if p.is_dir())
    if not meses:
        raise SystemExit("Nenhuma base baixada. Rode 'baixar' primeiro.")
    return meses[-1]


def _linhas(caminho: Path):
    """Linhas de texto do único CSV dentro de um zip da Receita (latin-1, separado por ';')."""
    with zipfile.ZipFile(caminho) as z, z.open(z.namelist()[0]) as f:
        yield from io.TextIOWrapper(f, encoding="latin-1", newline="")


def _csv(linhas):
    return csv.reader(linhas, delimiter=";", quotechar='"')


def _anotar(mapa: dict, chave: str, basico: str, limite: int) -> None:
    usos = mapa.setdefault(chave, set())
    if len(usos) < limite:
        usos.add(basico)


def _juntar(destino: dict, origem: dict) -> None:
    for chave, usos in origem.items():
        destino.setdefault(chave, set()).update(usos)


def _telefone(ddd: str, numero: str) -> str:
    ddd, numero = ddd.strip(), numero.strip()
    if not numero:
        return ""
    meio = len(numero) - 4
    return f"({ddd}) {numero[:meio]}-{numero[meio:]}" if ddd else numero


def _data(aaaammdd: str) -> str | None:
    d = aaaammdd.strip()
    return f"{d[:4]}-{d[4:6]}-{d[6:]}" if len(d) == 8 else None


def _capital(valor: str) -> float | None:
    try:
        return float(valor.replace(".", "").replace(",", "."))
    except ValueError:
        return None


def _filtrar_estabelecimentos(caminho: Path, cnae_nicho: dict, uf: str, ddds: set):
    """Estabelecimentos ativos (matriz) dos nichos com telefone da região, mais estatísticas da região.

    Também conta, por município, quantos estabelecimentos da UF têm telefone dos DDDs: assim dá
    para descartar uma empresa da capital que só cadastrou um celular da região.
    """
    marca_uf = f'"{uf}";'
    marcas_ddd = [f';"{d}";' for d in ddds]
    total_municipio, regiao_municipio = Counter(), Counter()
    linhas_regiao = []
    for linha in _linhas(caminho):
        if marca_uf not in linha:
            continue
        # Estatística por município com um split rápido; linhas com ';' dentro de algum campo
        # ficam de fora da contagem, mas não da seleção, que usa o parser de CSV logo abaixo
        campos = linha.split(";")
        if len(campos) == 30 and campos[19].strip('"') == uf:
            municipio = campos[20].strip('"')
            total_municipio[municipio] += 1
            if campos[21].strip('"') in ddds or campos[23].strip('"') in ddds:
                regiao_municipio[municipio] += 1
        if any(m in linha for m in marcas_ddd):
            linhas_regiao.append(linha)

    registros, usos_email, usos_dominio, invalidas = [], {}, {}, 0
    for r in _csv(linhas_regiao):
        if len(r) != 30:
            invalidas += 1
            continue
        if r[19] != uf or (r[21] not in ddds and r[23] not in ddds):
            continue
        basico = r[0]
        email = r[27].strip().lower()
        if email:
            _anotar(usos_email, email, basico, 5)
            _anotar(usos_dominio, email.rpartition("@")[2], basico, 10)
        nicho = cnae_nicho.get(r[11])
        # r[5] = situação cadastral ("02" ativa), r[3] = "1" matriz
        if not nicho or r[5] != "02" or r[3] != "1":
            continue
        registros.append({
            "cnpj": basico + r[1] + r[2],
            "cnpj_basico": basico,
            "nicho": nicho,
            "nome_fantasia": r[4].strip(),
            "data_inicio": _data(r[10]),
            "cnae": r[11],
            "logradouro": f"{r[13]} {r[14]}".strip(),
            "numero": r[15].strip(),
            "complemento": r[16].strip(),
            "bairro": r[17].strip(),
            "cep": r[18].strip(),
            "uf": r[19],
            "municipio_codigo": r[20],
            "telefone1": _telefone(r[21], r[22]),
            "telefone2": _telefone(r[23], r[24]),
            "email": email,
        })
    return registros, usos_email, usos_dominio, invalidas, total_municipio, regiao_municipio


def _por_basico(caminho: Path, basicos: set) -> dict[str, list[str]]:
    """Linhas de Empresas/Simples cujo CNPJ básico está no conjunto."""
    linhas = (l for l in _linhas(caminho) if l[1:9] in basicos)
    return {r[0]: r for r in _csv(linhas)}


def _tabela(caminho: Path) -> dict[str, str]:
    return {r[0]: r[1] for r in _csv(_linhas(caminho)) if len(r) >= 2}


def importar(conn, competencia: str | None, nichos: list[str], uf: str, ddds: list[str]) -> dict:
    comp = competencia or competencia_baixada()
    pasta = config.RFB_DIR / comp
    faltando = [a for a in ARQUIVOS if not (pasta / a).is_file()]
    if faltando:
        raise SystemExit(f"Faltam {len(faltando)} arquivos em {pasta}. Rode 'baixar' primeiro.")
    cnae_nicho = {cnae: n for n in nichos for cnae in config.NICHOS[n].cnaes}

    registros, usos_email, usos_dominio, invalidas = [], {}, {}, 0
    total_municipio, regiao_municipio = Counter(), Counter()
    with ProcessPoolExecutor(max_workers=config.PROCESSOS) as ex:
        partes = [
            ex.submit(_filtrar_estabelecimentos, pasta / f"Estabelecimentos{i}.zip", cnae_nicho, uf, set(ddds))
            for i in range(10)
        ]
        for parte in partes:
            regs, em, dom, inv, total, regiao = parte.result()
            registros += regs
            _juntar(usos_email, em)
            _juntar(usos_dominio, dom)
            invalidas += inv
            total_municipio.update(total)
            regiao_municipio.update(regiao)

        # Município da região = a maioria dos seus estabelecimentos tem telefone dos DDDs escolhidos
        municipios_regiao = {m for m, n in regiao_municipio.items() if n >= 0.5 * total_municipio[m]}
        encontrados = len(registros)
        registros = [r for r in registros if r["municipio_codigo"] in municipios_regiao]

        basicos = {r["cnpj_basico"] for r in registros}
        partes = [ex.submit(_por_basico, pasta / f"Empresas{i}.zip", basicos) for i in range(10)]
        simples = ex.submit(_por_basico, pasta / "Simples.zip", basicos)
        empresas = {}
        for parte in partes:
            empresas.update(parte.result())
        simples = simples.result()

    municipios = _tabela(pasta / "Municipios.zip")
    cnaes = _tabela(pasta / "Cnaes.zip")

    leads, meis = [], 0
    for r in registros:
        basico = r["cnpj_basico"]
        opcao = simples.get(basico, [])
        # Simples: [básico, opção simples, data, exclusão, opção MEI, ...]
        if len(opcao) > 4 and opcao[4] == "S" and not config.NICHOS[r["nicho"]].incluir_mei:
            meis += 1
            continue
        empresa = empresas.get(basico) or [basico, "", "", "", "", "", ""]
        leads.append({
            **{c: r[c] for c in ("cnpj", "nicho", "nome_fantasia", "cnae", "data_inicio", "logradouro",
                                 "numero", "complemento", "bairro", "cep", "uf", "telefone1",
                                 "telefone2", "email")},
            "razao_social": empresa[1].strip(),
            "capital_social": _capital(empresa[4]),
            "porte": PORTES.get(empresa[5], ""),
            "cnae_descricao": cnaes.get(r["cnae"], ""),
            "municipio": municipios.get(r["municipio_codigo"], ""),
            "email_tipo": emails.classificar(
                r["email"], usos_email, usos_dominio, (empresa[1], r["nome_fantasia"])
            ),
            "competencia_rfb": comp,
        })
    db.salvar_leads(conn, leads)
    return {
        "competencia": comp,
        "municipios_na_regiao": len(municipios_regiao),
        "encontrados": encontrados,
        "fora_da_regiao": encontrados - len(registros),
        "mei_ignorados": meis,
        "gravados": len(leads),
        "linhas_invalidas": invalidas,
    }
