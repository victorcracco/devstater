"""Configuração da captação: nichos, região padrão e caminhos."""
import os
from pathlib import Path

DATA_DIR = Path(os.environ.get("DATA_DIR", "/data"))
RFB_DIR = DATA_DIR / "rfb"
DB_PATH = DATA_DIR / "leads.db"

# Compartilhamento público (Nextcloud) onde a Receita publica a base mensal de CNPJ
RFB_WEBDAV = "https://arquivos.receitafederal.gov.br/public.php/webdav"
RFB_SHARE_TOKEN = "YggdBLfdninEJX9"

# CNAE fiscal principal de cada nicho (7 dígitos, sem pontuação)
NICHOS = {
    "transportadoras": {"4930201", "4930202", "4930203", "4930204"},
    "medicos": {"8630501", "8630502", "8630503"},
    "imobiliarias": {"6821801", "6821802", "6822600"},
}

# Região padrão: estabelecimentos da UF com telefone cadastrado num destes DDDs
UF_PADRAO = "SP"
DDDS_PADRAO = ("14",)

PROCESSOS = int(os.environ.get("PROCESSOS", "4"))
CONCORRENCIA_SITES = 10
USER_AGENT = "Mozilla/5.0 (compatible; DevStarterBot/0.1; +https://devstarter.com.br)"
