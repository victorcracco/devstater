"""Banco SQLite dos leads."""
import sqlite3

from . import config

ESQUEMA = """
CREATE TABLE IF NOT EXISTS leads (
    cnpj TEXT PRIMARY KEY,
    nicho TEXT NOT NULL,
    razao_social TEXT,
    nome_fantasia TEXT,
    cnae TEXT,
    cnae_descricao TEXT,
    porte TEXT,
    capital_social REAL,
    data_inicio TEXT,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    bairro TEXT,
    cep TEXT,
    municipio TEXT,
    uf TEXT,
    telefone1 TEXT,
    telefone2 TEXT,
    email TEXT,
    email_tipo TEXT,          -- corporativo | gratuito | provedor | contador | invalido | vazio
    email_mx INTEGER,         -- 1 o domínio recebe e-mail, 0 não recebe, NULL não checado/inconclusivo
    dominio TEXT,
    site_url TEXT,
    site_status TEXT,         -- ok | fora_do_ar | estacionado | rede_social | bloqueado
    site_erro TEXT,
    site_https INTEGER,
    site_mobile INTEGER,
    site_ms INTEGER,
    site_ano INTEGER,
    site_titulo TEXT,
    site_plataforma TEXT,
    site_instagram TEXT,
    site_whatsapp INTEGER,
    emails_site TEXT,
    oportunidade TEXT,        -- sem_site_provavel | site_fora_do_ar | site_fraco | site_ok | revisar | descartar
    motivos TEXT,             -- JSON com o que embasou a oportunidade
    status TEXT NOT NULL DEFAULT 'encontrado',  -- encontrado | enriquecido | prototipo | ...
    prototipo_slug TEXT,
    prototipo_expira_em TEXT,
    competencia_rfb TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    atualizado_em TEXT NOT NULL DEFAULT (datetime('now')),
    enriquecido_em TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_nicho_status ON leads (nicho, status);
CREATE INDEX IF NOT EXISTS idx_leads_oportunidade ON leads (oportunidade);

-- Quem pediu para não receber mais e-mails; consultado antes de qualquer envio
CREATE TABLE IF NOT EXISTS descadastros (
    email TEXT PRIMARY KEY,
    motivo TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
"""

# Campos que vêm da Receita e são atualizados a cada importação
CAMPOS_RFB = (
    "nicho", "razao_social", "nome_fantasia", "cnae", "cnae_descricao", "porte",
    "capital_social", "data_inicio", "logradouro", "numero", "complemento", "bairro",
    "cep", "municipio", "uf", "telefone1", "telefone2", "email", "email_tipo",
    "competencia_rfb",
)


# Colunas criadas depois da primeira versão do banco
COLUNAS_NOVAS = (("prototipo_slug", "TEXT"), ("prototipo_expira_em", "TEXT"))


def conectar() -> sqlite3.Connection:
    config.DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(config.DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.executescript(ESQUEMA)
    existentes = {r[1] for r in conn.execute("PRAGMA table_info(leads)")}
    for nome, tipo in COLUNAS_NOVAS:
        if nome not in existentes:
            conn.execute(f"ALTER TABLE leads ADD COLUMN {nome} {tipo}")
    conn.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_prototipo ON leads (prototipo_slug)")
    return conn


def salvar_leads(conn: sqlite3.Connection, leads: list[dict]) -> None:
    """Insere ou atualiza os leads; o enriquecimento só é descartado se o e-mail mudou."""
    colunas = ("cnpj",) + CAMPOS_RFB
    sql = f"""
        INSERT INTO leads ({", ".join(colunas)}) VALUES ({", ".join("?" * len(colunas))})
        ON CONFLICT (cnpj) DO UPDATE SET
            {", ".join(f"{c} = excluded.{c}" for c in CAMPOS_RFB)},
            enriquecido_em = CASE WHEN leads.email IS excluded.email THEN leads.enriquecido_em END,
            atualizado_em = datetime('now')
    """
    with conn:
        conn.executemany(sql, [tuple(lead[c] for c in colunas) for lead in leads])
