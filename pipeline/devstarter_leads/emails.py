"""Classificação e validação dos e-mails cadastrados na Receita."""
import re
import unicodedata
from concurrent.futures import ThreadPoolExecutor

import dns.exception
import dns.resolver

GRATUITOS = {
    "gmail.com", "googlemail.com", "hotmail.com", "hotmail.com.br", "outlook.com",
    "outlook.com.br", "live.com", "msn.com", "yahoo.com", "yahoo.com.br", "ymail.com",
    "bol.com.br", "uol.com.br", "terra.com.br", "ig.com.br", "superig.com.br",
    "icloud.com", "me.com", "globo.com", "globomail.com", "zipmail.com.br", "r7.com",
    "oi.com.br", "pop.com.br", "click21.com.br", "itelefonica.com.br",
    "veloxmail.com.br", "protonmail.com", "proton.me", "aol.com", "gmx.com",
    "mail.com", "yandex.com", "zoho.com",
}

DIGITACAO_ERRADA = {
    "gamil.com", "gmal.com", "gmial.com", "gnail.com", "gmaill.com", "gmail.co", "gmail.com.br",
    "hotmal.com", "hotmai.com", "hotmial.com", "hotmaill.com", "homail.com", "hormail.com",
    "hotamil.com", "hotmail.co", "hotmail.com.b", "outlok.com", "outllok.com", "outllok.com.br",
    "outlook.com.b", "yaho.com.br", "yahoo.com.b",
    "uolcom.br", "uol.com", "bol.com", "terra.com", "tera.com.br", "gmail.con", "hotmail.con",
}

# Palavras comuns em razão social que não identificam a empresa
PALAVRAS_GENERICAS = {
    "transportes", "transporte", "transportadora", "trans", "logistica", "cargas", "ltda", "eireli",
    "comercio", "servicos", "empresa", "clinica", "medica", "medicos", "saude", "consultorio",
    "imoveis", "imobiliaria", "empreendimentos", "participacoes", "administracao",
    "odontologia", "odontologica", "psicologia", "estetica", "beleza", "oficina", "mecanica", "instituto", "centro",
}

# Ordem importa: as mais longas primeiro, para 'transportadora' não virar 'adora' ao tirar 'transport'
GENERICAS_DOMINIO = (
    "transportadora", "transportes", "transporte", "odontologia", "psicologia", "consultorio", "imobiliaria",
    "logistica", "estetica", "mecanica", "instituto", "oficina", "clinica", "servicos", "express", "imoveis",
    "odonto", "centro", "grupo", "trans", "saude", "log",
)

RE_EMAIL = re.compile(r"^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$")
# Escritórios de contabilidade costumam cadastrar o próprio e-mail para os clientes
RE_CONTADOR_DOMINIO = re.compile(r"cont[aá]b|contador|assessoria|tribut|escrit")
RE_CONTADOR_LOCAL = re.compile(r"cont[aá]b|contador")


def _normalizar(texto: str) -> str:
    sem_acento = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9 ]", "", sem_acento.lower())


def _nucleo(texto: str) -> str:
    """Tira as palavras genéricas de um domínio ou nome: 'voxlogistica' -> 'vox', 'transrn' -> 'rn'."""
    for generica in GENERICAS_DOMINIO:
        texto = texto.replace(generica, "")
    return texto


def _dominio_da_empresa(dominio: str, nomes: tuple[str, ...]) -> bool:
    """O domínio parece ser da própria empresa, isto é, o nome dela aparece nele (ou vice-versa)?"""
    rotulo = dominio.split(".")[0]
    normalizados = [_normalizar(n) for n in nomes if n]
    # Siglas: 'VOX TRANSPORTADORA' com voxlogistica.com.br, 'RM TRANSPORTE' com rmservicos.log.br
    nucleo = _nucleo(rotulo)
    if len(nucleo) >= 2 and nucleo in {_nucleo(p) for n in normalizados for p in n.split()}:
        return True
    if len(rotulo) < 4:
        return False
    if any(rotulo in n.replace(" ", "") for n in normalizados):
        return True
    palavras = {p for n in normalizados for p in n.split() if len(p) >= 4 and p not in PALAVRAS_GENERICAS}
    return any(p in rotulo for p in palavras)


def site_da_empresa(dominio: str, titulo: str | None, nomes: tuple[str, ...]) -> bool:
    """O domínio (ou o título do site nele) tem o nome da empresa? Evita mandar 'o site da sua empresa'
    sobre o domínio de outro negócio, como o e-mail de uma cerâmica cadastrado por uma transportadora."""
    if _dominio_da_empresa(dominio, nomes):
        return True
    titulo_normalizado = _normalizar(titulo or "")
    palavras = {
        p for n in nomes if n for p in _normalizar(n).split() if len(p) >= 4 and p not in PALAVRAS_GENERICAS
    }
    return any(p in titulo_normalizado.split() for p in palavras)


def classificar(email: str, usos_email: dict, usos_dominio: dict, nomes: tuple[str, ...] = ()) -> str:
    """Tipo do e-mail, usando quantas empresas da região compartilham o e-mail e o domínio.

    `nomes` (razão social e nome fantasia) evita confundir um grupo de empresas que usa o
    mesmo e-mail corporativo com um escritório de contabilidade ou provedor.
    """
    if not email:
        return "vazio"
    if not RE_EMAIL.match(email):
        return "invalido"
    local, _, dominio = email.partition("@")
    if dominio in DIGITACAO_ERRADA:
        return "invalido"
    if RE_CONTADOR_LOCAL.search(local) or RE_CONTADOR_DOMINIO.search(dominio):
        return "contador"
    proprio = dominio not in GRATUITOS and _dominio_da_empresa(dominio, nomes)
    if len(usos_email.get(email, ())) >= 3 and not proprio:
        return "contador"
    if dominio in GRATUITOS:
        return "gratuito"
    # Domínio usado por várias empresas diferentes: provedor de internet local, não o site da empresa
    if len(usos_dominio.get(dominio, ())) >= 5 and not proprio:
        return "provedor"
    return "corporativo"


def _mx(dominio: str) -> bool | None:
    resolver = dns.resolver.Resolver()
    resolver.lifetime = 8
    try:
        return any(str(r.exchange) != "." for r in resolver.resolve(dominio, "MX"))
    except dns.resolver.NoAnswer:
        # Sem MX, o e-mail ainda é entregue no registro A do domínio
        try:
            return bool(resolver.resolve(dominio, "A"))
        except dns.exception.DNSException:
            return False
    except dns.resolver.NXDOMAIN:
        return False
    except dns.exception.DNSException:
        return None


def verificar_mx(dominios: list[str]) -> dict[str, bool | None]:
    with ThreadPoolExecutor(max_workers=16) as ex:
        return dict(zip(dominios, ex.map(_mx, dominios)))
