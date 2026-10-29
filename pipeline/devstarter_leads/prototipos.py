"""Gera os dados dos protótipos de site (lidos pela rota /p/[slug] do site da DevStarter)."""
import json
import re
import secrets
import string
import unicodedata
import urllib.request
from datetime import date, timedelta

from . import config

PASTA = config.DATA_DIR / "prototipos"
SUFIXOS = {"LTDA", "EIRELI", "ME", "EPP", "SA", "S/A", "S.A", "-", "–", ","}
CONECTIVOS = {"de", "da", "do", "das", "dos", "e", "em"}
# A Receita grava os nomes em maiúsculas e quase sempre sem acento
ACENTOS = {
    "logistica": "Logística", "comercio": "Comércio", "servicos": "Serviços", "mudancas": "Mudanças",
    "rodoviario": "Rodoviário", "rodoviaria": "Rodoviária", "distribuicao": "Distribuição",
    "agricola": "Agrícola", "armazens": "Armazéns", "locacao": "Locação", "maquinas": "Máquinas",
    "combustiveis": "Combustíveis", "uniao": "União", "sao": "São", "joao": "João", "jose": "José",
    "antonio": "Antônio", "conceicao": "Conceição", "irmaos": "Irmãos", "familia": "Família",
    "industria": "Indústria", "graos": "Grãos", "agronegocios": "Agronegócios",
    "rodoviarios": "Rodoviários", "capitao": "Capitão", "goncalves": "Gonçalves", "fenix": "Fênix",
    "industrias": "Indústrias", "area": "Área", "ribeirao": "Ribeirão", "paraiso": "Paraíso",
    "agua": "Água", "chapadao": "Chapadão", "corrego": "Córrego", "brandao": "Brandão",
    "belizario": "Belizário", "vitorio": "Vitório", "inacio": "Inácio", "florencio": "Florêncio",
    "alcebiades": "Alcebíades", "helio": "Hélio", "nucleo": "Núcleo", "magalhaes": "Magalhães",
    "sebastiao": "Sebastião", "estacao": "Estação", "aviacao": "Aviação", "acucar": "Açúcar",
    "alcool": "Álcool", "maria": "Maria", "lucia": "Lúcia", "patricia": "Patrícia",
    "marcio": "Márcio", "sergio": "Sérgio", "rogerio": "Rogério", "claudio": "Cláudio",
    "fabio": "Fábio", "julio": "Júlio", "vinicius": "Vinícius", "tiete": "Tietê", "fe": "Fé",
    "dragao": "Dragão", "formula": "Fórmula", "nacoes": "Nações", "galvao": "Galvão",
    "chacara": "Chácara", "americo": "Américo", "ipes": "Ipês", "decio": "Décio", "tupa": "Tupã",
    "falcao": "Falcão", "leao": "Leão", "simoes": "Simões", "goncalo": "Gonçalo", "lazaro": "Lázaro",
    "liquido": "Líquido", "petroleo": "Petróleo", "transito": "Trânsito", "veiculos": "Veículos",
    "comercial": "Comercial", "operacoes": "Operações", "solucoes": "Soluções",
}
RE_INICIAIS = re.compile(r"([A-Za-z]\.)+[A-Za-z]?\.?")
RE_ROMANO = re.compile(r"(i{1,3}|iv|vi{0,3}|ix|x)", re.I)


def _sem_acento(texto: str) -> str:
    return unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()


def _palavra(p: str, primeira: bool) -> str:
    minuscula = p.lower()
    if not primeira and minuscula in CONECTIVOS:
        return minuscula
    if minuscula in ACENTOS:
        return ACENTOS[minuscula]
    if RE_INICIAIS.fullmatch(p) or "&" in p:
        return p.upper()
    if p.endswith("."):  # abreviações: Jd., Dr., Mal.
        return minuscula.capitalize()
    # Siglas curtas (GA, BRL) e numerais romanos (Jardim Maria III)
    if len(p) <= 2 or (len(p) <= 3 and not re.search(r"[aeiou]", minuscula)) or (not primeira and RE_ROMANO.fullmatch(p)):
        return p.upper()
    return "-".join(parte.capitalize() for parte in minuscula.split("-"))


def titulo(texto: str) -> str:
    return " ".join(_palavra(p, i == 0) for i, p in enumerate(texto.split()))


def nome_exibicao(fantasia: str, razao: str) -> str:
    nome = (fantasia or razao or "").strip()
    nome = re.sub(r"^\d{2}\.\d{3}\.\d{3}\s+", "", nome)  # empresário individual: CNPJ básico no início
    nome = re.sub(r"\s+\d{11}$", "", nome)  # ... ou o CPF no final
    palavras = nome.split()
    while len(palavras) > 1 and palavras[-1].upper().strip(".") in SUFIXOS:
        palavras.pop()
    return titulo(" ".join(palavras))


def _cidades_ibge(uf: str) -> dict[str, str]:
    """Nome oficial (com acento) de cada município, indexado pelo nome sem acento em maiúsculas."""
    cache = config.DATA_DIR / f"municipios_{uf}.json"
    if not cache.exists():
        # A API do IBGE costuma recusar conexões de fora do Brasil; sem ela, o nome fica sem acento
        url = f"https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios"
        try:
            nomes = [m["nome"] for m in json.load(urllib.request.urlopen(url, timeout=30))]
        except OSError as e:
            print(f"Aviso: lista de municípios do IBGE indisponível ({e}); coloque-a em {cache}")
            return {}
        cache.write_text(json.dumps(nomes, ensure_ascii=False))
    return {_sem_acento(n).upper(): n for n in json.loads(cache.read_text())}


def _telefones(*formatados: str) -> tuple[str | None, str | None]:
    """(telefone para exibir, número de WhatsApp com DDI) a partir dos telefones da Receita."""
    exibir, whatsapp = None, None
    for formatado in formatados:
        digitos = re.sub(r"\D", "", formatado or "")
        if len(digitos) < 10:
            continue
        ddd, numero = digitos[:2], digitos[2:]
        # Cadastros antigos guardam o celular com 8 dígitos, antes do nono dígito
        if len(numero) == 8 and numero[0] in "6789":
            numero = "9" + numero
        # Fixo começa com 2 a 5 (8 dígitos); celular com 9 (9 dígitos). O resto é erro de cadastro
        if not ((len(numero) == 8 and numero[0] in "2345") or (len(numero) == 9 and numero[0] == "9")):
            continue
        texto = f"({ddd}) {numero[:-4]}-{numero[-4:]}"
        exibir = exibir or texto
        if len(numero) == 9 and numero[0] == "9":
            whatsapp = whatsapp or f"55{ddd}{numero}"
    return exibir, whatsapp


def _endereco(lead) -> str | None:
    if not lead["logradouro"]:
        return None
    numero = lead["numero"] if lead["numero"] and lead["numero"].upper() not in ("SN", "S/N", "0") else "s/n"
    texto = f"{titulo(lead['logradouro'])}, {numero}"
    return f"{texto} – {titulo(lead['bairro'])}" if lead["bairro"] else texto


def _cnpj(c: str) -> str:
    return f"{c[:2]}.{c[2:5]}.{c[5:8]}/{c[8:12]}-{c[12:]}"


def _slug(nome: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", _sem_acento(nome).lower()).strip("-")[:40].rstrip("-")
    sufixo = "".join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(4))
    return f"{base}-{sufixo}"


def _chaves(lead, telefone: str | None) -> set[str]:
    """Identificam a mesma empresa em CNPJs diferentes: o domínio próprio (ou o e-mail) e o telefone."""
    email = lead["email"] or ""
    chaves = {email.partition("@")[2] if lead["email_tipo"] == "corporativo" else email}
    if telefone:
        chaves.add(telefone)
    return chaves - {""}


def descartar_nao_enviados(conn, nicho: str) -> int:
    """Apaga os protótipos que ainda não foram enviados, para gerá-los de novo."""
    slugs = [r[0] for r in conn.execute(
        "SELECT prototipo_slug FROM leads WHERE nicho = ? AND status = 'prototipo'", (nicho,)
    )]
    for slug in slugs:
        (PASTA / f"{slug}.json").unlink(missing_ok=True)
    with conn:
        conn.execute(
            """UPDATE leads SET prototipo_slug = NULL, prototipo_expira_em = NULL, status = 'enriquecido'
               WHERE nicho = ? AND status = 'prototipo'""",
            (nicho,),
        )
    return len(slugs)


def gerar(conn, nicho: str, oportunidades: list[str], dias: int = 45, limite: int | None = None) -> dict:
    PASTA.mkdir(parents=True, exist_ok=True)
    leads = conn.execute(
        f"""SELECT * FROM leads
            WHERE nicho = ? AND prototipo_slug IS NULL
              AND oportunidade IN ({", ".join("?" * len(oportunidades))})
            ORDER BY oportunidade, cnpj LIMIT ?""",
        (nicho, *oportunidades, limite or -1),
    ).fetchall()
    # Um protótipo por empresa: grupos costumam ter vários CNPJs com o mesmo domínio ou telefone
    usados: set[str] = set()
    for anterior in conn.execute("SELECT * FROM leads WHERE prototipo_slug IS NOT NULL"):
        usados |= _chaves(anterior, _telefones(anterior["telefone1"], anterior["telefone2"])[0])
    cidades: dict[str, dict[str, str]] = {}
    expira = (date.today() + timedelta(days=dias)).isoformat()
    gerados, repetidos = 0, 0
    with conn:
        for lead in leads:
            telefone, whatsapp = _telefones(lead["telefone1"], lead["telefone2"])
            chaves = _chaves(lead, telefone)
            if chaves & usados:
                repetidos += 1
                continue
            usados |= chaves
            uf = lead["uf"]
            if uf not in cidades:
                cidades[uf] = _cidades_ibge(uf)
            nome = nome_exibicao(lead["nome_fantasia"], lead["razao_social"])
            cep = lead["cep"]
            dados = {
                "slug": _slug(nome),
                "nicho": nicho,
                "nome": nome,
                "cidade": cidades[uf].get(lead["municipio"], titulo(lead["municipio"])),
                "uf": uf,
                "endereco": _endereco(lead),
                "cep": f"{cep[:5]}-{cep[5:]}" if len(cep or "") == 8 else None,
                "telefone": telefone,
                "whatsapp": whatsapp,
                "email": lead["email"],
                "cnpj": _cnpj(lead["cnpj"]),
                "desde": int(lead["data_inicio"][:4]) if lead["data_inicio"] else None,
                "cnae": lead["cnae"],
                "expiraEm": expira,
            }
            dados = {k: v for k, v in dados.items() if v is not None}
            (PASTA / f"{dados['slug']}.json").write_text(json.dumps(dados, ensure_ascii=False, indent=2))
            conn.execute(
                """UPDATE leads SET prototipo_slug = ?, prototipo_expira_em = ?,
                       status = CASE WHEN status IN ('encontrado', 'enriquecido') THEN 'prototipo' ELSE status END,
                       atualizado_em = datetime('now')
                   WHERE cnpj = ?""",
                (dados["slug"], expira, lead["cnpj"]),
            )
            gerados += 1
    return {"gerados": gerados, "mesma_empresa": repetidos, "pasta": str(PASTA)}
