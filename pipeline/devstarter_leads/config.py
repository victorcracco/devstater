"""Configuração da captação: nichos, região padrão e caminhos."""
import os
from dataclasses import dataclass
from pathlib import Path

DATA_DIR = Path(os.environ.get("DATA_DIR", "/data"))
RFB_DIR = DATA_DIR / "rfb"
DB_PATH = DATA_DIR / "leads.db"

# Compartilhamento público (Nextcloud) onde a Receita publica a base mensal de CNPJ
RFB_WEBDAV = "https://arquivos.receitafederal.gov.br/public.php/webdav"
RFB_SHARE_TOKEN = "YggdBLfdninEJX9"


@dataclass(frozen=True)
class Nicho:
    cnaes: frozenset[str]  # CNAE fiscal principal (7 dígitos, sem pontuação)
    # Trechos do e-mail: "quem procura {quem_procura} no Google e não encontra o site {quem_desiste}"
    # e "pontos que podem estar custando {o_que_perde}"
    quem_procura: str
    quem_desiste: str
    o_que_perde: str
    artigo: bool = False  # True: "site da X"; False: "site de X", para nomes de pessoas de qualquer gênero
    incluir_mei: bool = False  # em transportes, MEI é caminhoneiro autônomo; em salão e oficina, é cliente real
    site_pronto: bool = False  # True quando o nicho já existe em lib/prototipos/nichos no site


NICHOS = {
    "transportadoras": Nicho(
        cnaes=frozenset({"4930201", "4930202", "4930203", "4930204"}),
        quem_procura="uma transportadora",
        quem_desiste="costuma pedir orçamento para outra",
        o_que_perde="pedidos de orçamento",
        artigo=True,
        site_pronto=True,
    ),
    "clinicas_medicas": Nicho(
        cnaes=frozenset({"8630501", "8630502", "8630503"}),
        quem_procura="uma clínica ou um médico",
        quem_desiste="costuma procurar outro profissional",
        o_que_perde="pacientes",
    ),
    "odontologia": Nicho(
        cnaes=frozenset({"8630504"}),
        quem_procura="um dentista",
        quem_desiste="costuma procurar outro profissional",
        o_que_perde="pacientes",
    ),
    "psicologia": Nicho(
        cnaes=frozenset({"8650003"}),
        quem_procura="atendimento psicológico",
        quem_desiste="costuma procurar outro profissional",
        o_que_perde="novos atendimentos",
    ),
    "estetica": Nicho(
        cnaes=frozenset({"9602502"}),
        quem_procura="uma clínica de estética",
        quem_desiste="costuma marcar em outro lugar",
        o_que_perde="agendamentos",
        incluir_mei=True,
    ),
    "oficinas": Nicho(
        cnaes=frozenset({"4520001", "4520002", "4520003", "4520004", "4520006"}),
        quem_procura="uma oficina",
        quem_desiste="costuma levar o carro em outra",
        o_que_perde="clientes",
        incluir_mei=True,
    ),
    "imobiliarias": Nicho(
        cnaes=frozenset({"6821801", "6821802", "6822600"}),
        quem_procura="uma imobiliária",
        quem_desiste="costuma procurar outra",
        o_que_perde="interessados em imóveis",
    ),
}

# Região padrão: estabelecimentos da UF com telefone cadastrado num destes DDDs
UF_PADRAO = "SP"
DDDS_PADRAO = ("14",)

PROCESSOS = int(os.environ.get("PROCESSOS", "4"))
CONCORRENCIA_SITES = 10
USER_AGENT = "Mozilla/5.0 (compatible; DevStarterBot/0.1; +https://devstarter.com.br)"
