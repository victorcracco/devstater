"""Leitura das respostas por IMAP. Só leitura: nada é marcado como lido, movido ou apagado na caixa."""
import email
import imaplib
import os
import re
from collections import Counter
from email import policy
from email.utils import parseaddr

from . import db, llm

RE_DEVOLUCAO = re.compile(
    r"undeliver|delivery status notification|failure notice|mail delivery (failed|subsystem)"
    r"|returned mail|n[aã]o foi poss[ií]vel entregar|falha na entrega",
    re.I,
)
RE_AUSENTE = re.compile(r"resposta autom[aá]tica|automatic reply|auto.?reply|out of (the )?office|ausente|f[eé]rias", re.I)
# Pedidos de saída: frases inequívocas valem em qualquer ponto do início da resposta; a palavra
# solta ("sair") só vale se for a resposta inteira, para não pegar "vou sair de férias"
RE_SAIR_FRASE = re.compile(
    r"descadastr\w*|n[aã]o quero (mais )?receber|pare de (me )?enviar|unsubscribe"
    r"|(remov\w*|tir\w*) (meu e-?mail|meu contato|da (sua )?lista)",
    re.I,
)
RE_SAIR_CURTO = re.compile(r"^\W*(sair|remover|remova|parar|pare)\W*$", re.I)
RE_RECLAMACAO = re.compile(r"\b(spam|denunci\w*|procon|lgpd|abusiv\w*)\b", re.I)
# Sem nenhuma IA disponível, uma classificação simples por palavras
RE_SEM_INTERESSE = re.compile(
    r"n[aã]o (tenho|temos) interesse|sem interesse|n[aã]o (preciso|precisamos)|j[aá] (temos|tenho) (site|fornecedor)", re.I
)
RE_INTERESSE = re.compile(r"quanto custa|valor|pre[çc]o|interess|gostei|vamos conversar|me lig\w+|or[çc]amento", re.I)
# Onde começa o texto citado do nosso e-mail (Gmail, Outlook, Apple Mail...)
RE_CITACAO = re.compile(r"^(Em .{5,200}escreveu:|On .{5,200}wrote:|-{2,}\s*Original Message|De:\s|From:\s)", re.M)
RE_EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")


def _texto(msg) -> str:
    parte = msg.get_body(preferencelist=("plain", "html"))
    if parte is None:
        return ""
    try:
        texto = parte.get_content()
    except (LookupError, UnicodeDecodeError):
        texto = parte.get_payload(decode=True).decode("latin-1", "replace")
    if parte.get_content_type() == "text/html":
        texto = re.sub(r"<[^>]+>", " ", texto)
    return texto


def _sem_citacao(texto: str) -> str:
    corte = RE_CITACAO.search(texto)
    if corte:
        texto = texto[: corte.start()]
    linhas = [l for l in texto.splitlines() if not l.lstrip().startswith(">")]
    return "\n".join(linhas).strip()


def _lead(conn, msg, remetente: str) -> str | None:
    """CNPJ do lead que respondeu: pela conversa (In-Reply-To/References), pelo e-mail ou pelo domínio."""
    referencias = f"{msg.get('In-Reply-To', '')} {msg.get('References', '')}"
    for message_id in re.findall(r"<[^>]+>", referencias):
        linha = conn.execute("SELECT cnpj FROM envios WHERE message_id = ?", (message_id,)).fetchone()
        if linha:
            return linha[0]
    linha = conn.execute("SELECT cnpj FROM envios WHERE email = ? ORDER BY id DESC", (remetente,)).fetchone()
    if linha:
        return linha[0]
    linha = conn.execute(
        """SELECT e.cnpj FROM envios e JOIN leads l ON l.cnpj = e.cnpj
           WHERE l.email_tipo = 'corporativo' AND l.dominio = ? ORDER BY e.id DESC""",
        (remetente.partition("@")[2],),
    ).fetchone()
    return linha[0] if linha else None


def classificar(msg, remetente: str, assunto: str, texto: str) -> str:
    if remetente.startswith(("mailer-daemon", "postmaster")) or RE_DEVOLUCAO.search(assunto):
        return "devolvido"
    automatica = msg.get("Auto-Submitted", "no").lower() != "no" or msg.get("X-Autoreply") or msg.get("X-Autorespond")
    if automatica or RE_AUSENTE.search(assunto):
        return "ausente"
    if RE_RECLAMACAO.search(texto[:500]):
        return "reclamacao"
    if RE_SAIR_FRASE.search(texto[:300]) or RE_SAIR_CURTO.match(texto.strip()):
        return "descadastro"
    classificacao = llm.classificar_resposta(texto)
    if classificacao:
        return classificacao
    if RE_SEM_INTERESSE.search(texto):
        return "sem_interesse"
    if RE_INTERESSE.search(texto):
        return "interessado"
    return "respondeu"


def _registrar(conn, cnpj, remetente, assunto, classificacao, trecho) -> None:
    conn.execute(
        "INSERT INTO respostas (cnpj, remetente, assunto, classificacao, trecho) VALUES (?, ?, ?, ?, ?)",
        (cnpj, remetente, assunto[:200], classificacao, trecho[:300]),
    )


def _processar_mensagem(conn, msg) -> str:
    remetente = parseaddr(msg.get("From", ""))[1].lower()
    assunto = str(msg.get("Subject", ""))
    texto = _sem_citacao(_texto(msg))
    classificacao = classificar(msg, remetente, assunto, texto)

    with conn:
        if classificacao == "devolvido":
            # Quem não recebeu aparece no corpo do aviso de devolução (ou no cabeçalho X-Failed-Recipients)
            completo = f"{msg.get('X-Failed-Recipients', '')} {_texto(msg)}".lower()
            enviados = {r[0] for r in conn.execute("SELECT DISTINCT email FROM envios")}
            falhas = set(RE_EMAIL.findall(completo)) & enviados
            for falha in falhas:
                cnpj = conn.execute("SELECT cnpj FROM envios WHERE email = ? ORDER BY id DESC", (falha,)).fetchone()[0]
                _registrar(conn, cnpj, falha, assunto, "devolvido", "")
                conn.execute("INSERT OR IGNORE INTO descadastros (email, motivo) VALUES (?, 'devolvido')", (falha,))
                conn.execute("UPDATE leads SET status = 'devolvido', atualizado_em = datetime('now') WHERE cnpj = ?", (cnpj,))
            return "devolvido" if falhas else "ignorado"

        cnpj = _lead(conn, msg, remetente)
        if not cnpj:
            return "ignorado"  # e-mail normal da caixa, não é de um prospect
        _registrar(conn, cnpj, remetente, assunto, classificacao, texto)
        if classificacao == "ausente":
            return classificacao  # resposta automática: a sequência continua
        if classificacao in ("descadastro", "reclamacao"):
            conn.execute(
                "INSERT OR IGNORE INTO descadastros (email, motivo) VALUES (?, ?)", (remetente, classificacao)
            )
            status = "descadastrado"
        else:
            status = classificacao
        conn.execute("UPDATE leads SET status = ?, atualizado_em = datetime('now') WHERE cnpj = ?", (status, cnpj))
    if classificacao == "reclamacao":
        db.gravar_controle(conn, "pausado", f"reclamação de {remetente}: revise antes de retomar")
    return classificacao


def processar(conn) -> dict | str:
    senha = os.environ.get("SMTP_SENHA")
    if not senha:
        return "IMAP não configurado"
    contagem = Counter()
    with imaplib.IMAP4_SSL(os.environ.get("IMAP_HOST", "imappro.zoho.com"), timeout=30) as imap:
        imap.login(os.environ.get("SMTP_USUARIO", "contato@devstarter.com.br"), senha)
        _, dados = imap.status("INBOX", "(UIDVALIDITY UIDNEXT)")
        validade = re.search(rb"UIDVALIDITY (\d+)", dados[0]).group(1).decode()
        ultimo_existente = int(re.search(rb"UIDNEXT (\d+)", dados[0]).group(1)) - 1
        if db.ler_controle(conn, "imap_validade") != validade:
            # Primeira leitura (ou caixa recriada): começa daqui, sem mexer nos e-mails antigos
            db.gravar_controle(conn, "imap_validade", validade)
            db.gravar_controle(conn, "imap_ultimo_uid", str(ultimo_existente))
            return {"iniciado_no_uid": ultimo_existente}
        ultimo = int(db.ler_controle(conn, "imap_ultimo_uid") or ultimo_existente)
        if ultimo_existente <= ultimo:
            return {}
        imap.select("INBOX", readonly=True)
        _, dados = imap.uid("search", None, f"UID {ultimo + 1}:*")
        for uid in sorted(int(u) for u in dados[0].split()):
            if uid <= ultimo:
                continue
            _, partes = imap.uid("fetch", str(uid), "(BODY.PEEK[])")
            contagem[_processar_mensagem(conn, email.message_from_bytes(partes[0][1], policy=policy.default))] += 1
            ultimo = uid
            db.gravar_controle(conn, "imap_ultimo_uid", str(ultimo))
    return dict(contagem)
