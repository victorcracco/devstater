"""Envio dos e-mails pelo Zoho: só para leads aprovados, em horário comercial, com limite diário,
intervalo aleatório entre envios e trava automática quando as devoluções sobem."""
import json
import os
import random
import smtplib
import ssl
from datetime import date, datetime, timedelta, timezone
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid
from zoneinfo import ZoneInfo

from . import db, mensagens, prototipos, publicacao, respostas

FUSO = ZoneInfo("America/Sao_Paulo")
SITE = "https://www.devstarter.com.br/p/"
DIAS_UTEIS_ENTRE_ETAPAS = {2: 3, 3: 5}
FERIADOS_FIXOS = {"01-01", "04-21", "05-01", "09-07", "10-12", "11-02", "11-15", "11-20", "12-25"}
TAXA_MAXIMA_DEVOLUCAO = 0.05


def _cfg(nome: str, padrao: str | None = None) -> str | None:
    return os.environ.get(nome, padrao)


def _utc(texto: str) -> datetime:
    """Datas do SQLite (datetime('now')) vêm como 'AAAA-MM-DD HH:MM:SS' em UTC."""
    return datetime.fromisoformat(texto).replace(tzinfo=timezone.utc)


def _sqlite(momento: datetime) -> str:
    return momento.astimezone(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def _janela() -> tuple[str, str]:
    inicio, fim = _cfg("JANELA", "08:30-17:30").split("-")
    return inicio, fim


def _pascoa(ano: int) -> date:
    """Domingo de Páscoa, base dos feriados móveis (algoritmo de Meeus/Jones/Butcher)."""
    a = ano % 19
    b, c = divmod(ano, 100)
    d, e = divmod(b, 4)
    g = (b - (b + 8) // 25 + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = divmod(c, 4)
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    mes, dia = divmod(h + l - 7 * m + 114, 31)
    return date(ano, mes, dia + 1)


def feriado(dia: date) -> bool:
    """Feriados nacionais, mais Carnaval e Corpus Christi, em que quase nenhuma empresa lê e-mail."""
    if dia.strftime("%m-%d") in FERIADOS_FIXOS:
        return True
    return (dia - _pascoa(dia.year)).days in (-48, -47, -2, 60)


def dias_uteis(desde: datetime, ate: datetime) -> int:
    dia, fim, total = desde.astimezone(FUSO).date(), ate.astimezone(FUSO).date(), 0
    while dia < fim:
        dia += timedelta(days=1)
        total += dia.weekday() < 5 and not feriado(dia)
    return total


def aprovar(conn, slugs: list[str] | None = None, oportunidades: list[str] | None = None) -> int:
    filtros, params = ["status = 'prototipo'"], []
    if slugs:
        filtros.append(f"prototipo_slug IN ({', '.join('?' * len(slugs))})")
        params += slugs
    if oportunidades:
        filtros.append(f"oportunidade IN ({', '.join('?' * len(oportunidades))})")
        params += oportunidades
    with conn:
        return conn.execute(
            f"UPDATE leads SET status = 'aprovado', atualizado_em = datetime('now') WHERE {' AND '.join(filtros)}",
            params,
        ).rowcount


def reprovar(conn, slugs: list[str]) -> int:
    """Tira da fila protótipos aprovados que ainda não receberam nenhum e-mail."""
    with conn:
        return conn.execute(
            f"""UPDATE leads SET status = 'prototipo', atualizado_em = datetime('now')
                WHERE status = 'aprovado' AND prototipo_slug IN ({', '.join('?' * len(slugs))})""",
            slugs,
        ).rowcount


def pendentes(conn, agora: datetime) -> list[tuple]:
    """(lead, etapa) na ordem de envio: lembretes das conversas mais antigas, depois primeiros contatos."""
    hoje = agora.astimezone(FUSO).date().isoformat()
    bloqueados = {r[0] for r in conn.execute("SELECT email FROM descadastros")}
    fila = []
    # Só leads em 'contatado': quem respondeu (exceto resposta automática) sai da sequência
    for lead in conn.execute(
        """SELECT l.*, MAX(e.etapa) AS ultima_etapa, MAX(e.enviado_em) AS ultimo_envio
           FROM leads l JOIN envios e ON e.cnpj = l.cnpj
           WHERE l.status = 'contatado' GROUP BY l.cnpj ORDER BY ultimo_envio"""
    ):
        etapa = lead["ultima_etapa"] + 1
        if etapa > 3 or lead["email"] in bloqueados or lead["prototipo_expira_em"] <= hoje:
            continue
        if dias_uteis(_utc(lead["ultimo_envio"]), agora) >= DIAS_UTEIS_ENTRE_ETAPAS[etapa]:
            fila.append((lead, etapa))
    for lead in conn.execute(
        """SELECT * FROM leads WHERE status = 'aprovado' AND cnpj NOT IN (SELECT cnpj FROM envios)
           ORDER BY oportunidade, cnpj"""
    ):
        if lead["email"] not in bloqueados and lead["prototipo_expira_em"] > hoje and lead["email_mx"] != 0:
            fila.append((lead, 1))
    return fila


def bloqueio(conn, agora: datetime) -> str | None:
    """Motivo para não enviar agora, ou None se pode enviar."""
    if _cfg("ENVIO_ATIVO", "0") != "1":
        return "envio desligado (ENVIO_ATIVO=0)"
    if not _cfg("SMTP_SENHA"):
        return "SMTP não configurado"
    pausa = db.ler_controle(conn, "pausado")
    if pausa:
        return f"pausado: {pausa}"
    local = agora.astimezone(FUSO)
    if local.weekday() >= 5:
        return "fim de semana"
    if feriado(local.date()):
        return "feriado"
    inicio, fim = _janela()
    if not inicio <= local.strftime("%H:%M") < fim:
        return "fora do horário comercial"
    limite = int(_cfg("LIMITE_DIARIO", "10"))
    meia_noite = local.replace(hour=0, minute=0, second=0, microsecond=0)
    hoje = conn.execute("SELECT COUNT(*) FROM envios WHERE enviado_em >= ?", (_sqlite(meia_noite),)).fetchone()[0]
    if hoje >= limite:
        return f"limite do dia atingido ({hoje}/{limite})"
    proximo = db.ler_controle(conn, "proximo_envio")
    if proximo and agora < datetime.fromisoformat(proximo):
        return f"próximo envio depois das {datetime.fromisoformat(proximo).astimezone(FUSO):%H:%M}"
    return None


def conferir_trava(conn, agora: datetime) -> None:
    """Pausa tudo se as devoluções passarem de 5% (mínimo 3) nos últimos 14 dias."""
    desde = _sqlite(agora - timedelta(days=14))
    enviados = conn.execute("SELECT COUNT(*) FROM envios WHERE enviado_em >= ?", (desde,)).fetchone()[0]
    devolvidos = conn.execute(
        "SELECT COUNT(*) FROM respostas WHERE classificacao = 'devolvido' AND recebida_em >= ?", (desde,)
    ).fetchone()[0]
    if devolvidos and devolvidos >= max(3, enviados * TAXA_MAXIMA_DEVOLUCAO):
        db.gravar_controle(conn, "pausado", f"{devolvidos} devoluções em {enviados} envios nos últimos 14 dias")


def _mensagem(conn, lead, etapa: int) -> EmailMessage:
    prototipo = json.loads((prototipos.PASTA / f"{lead['prototipo_slug']}.json").read_text())
    assunto, texto, corpo_html = mensagens.montar(etapa, lead, prototipo, SITE + lead["prototipo_slug"])
    remetente = _cfg("REMETENTE", "victor@devstarter.com.br")
    msg = EmailMessage()
    msg["From"] = formataddr((_cfg("REMETENTE_NOME", "Victor da DevStarter"), remetente))
    msg["To"] = lead["email"]
    msg["Subject"] = assunto
    msg["Date"] = formatdate()
    msg["Message-ID"] = make_msgid(domain=remetente.partition("@")[2])
    # Lembretes entram na mesma conversa do primeiro e-mail
    anteriores = [r[0] for r in conn.execute("SELECT message_id FROM envios WHERE cnpj = ? ORDER BY etapa", (lead["cnpj"],))]
    if etapa > 1 and anteriores:
        msg["In-Reply-To"] = anteriores[-1]
        msg["References"] = " ".join(anteriores)
    msg.set_content(texto)
    msg.add_alternative(corpo_html, subtype="html")
    return msg


def previa(conn, slug: str, etapa: int = 1, html: bool = False) -> str:
    lead = conn.execute("SELECT * FROM leads WHERE prototipo_slug = ?", (slug,)).fetchone()
    if not lead:
        raise SystemExit(f"Protótipo {slug} não encontrado")
    msg = _mensagem(conn, lead, etapa)
    if html:
        return msg.get_body(preferencelist=("html",)).get_content()
    texto = msg.get_body(preferencelist=("plain",)).get_content()
    return f"De: {msg['From']}\nPara: {msg['To']}\nAssunto: {msg['Subject']}\n\n{texto}"


def _smtp() -> smtplib.SMTP_SSL:
    smtp = smtplib.SMTP_SSL(
        _cfg("SMTP_HOST", "smtp.zoho.com"), int(_cfg("SMTP_PORTA", "465")),
        context=ssl.create_default_context(), timeout=30,
    )
    smtp.login(_cfg("SMTP_USUARIO", "contato@devstarter.com.br"), _cfg("SMTP_SENHA"))
    return smtp


def testar(conn, para: str | None = None) -> dict:
    """Confere o login no IMAP e no SMTP e, se pedido, manda para `para` um e-mail igual ao de um
    prospect. Não entra na fila, no limite diário nem no histórico de envios."""
    resultado: dict = {"imap": respostas.processar(conn)}
    with _smtp() as smtp:
        resultado["smtp"] = "login ok"
        if para:
            lead = conn.execute(
                """SELECT * FROM leads WHERE prototipo_slug IS NOT NULL AND oportunidade = 'site_fraco'
                   ORDER BY cnpj LIMIT 1"""
            ).fetchone()
            msg = _mensagem(conn, lead, 1)
            msg.replace_header("To", para)
            smtp.send_message(msg)
            resultado["teste"] = f"enviado para {para} com o texto de {lead['prototipo_slug']}"
    return resultado


def enviar(conn, lead, etapa: int) -> None:
    msg = _mensagem(conn, lead, etapa)
    try:
        with _smtp() as smtp:
            smtp.send_message(msg)
    except smtplib.SMTPRecipientsRefused:
        with conn:
            conn.execute("INSERT OR IGNORE INTO descadastros (email, motivo) VALUES (?, 'recusado no envio')", (lead["email"],))
            conn.execute("UPDATE leads SET status = 'devolvido', atualizado_em = datetime('now') WHERE cnpj = ?", (lead["cnpj"],))
        return
    except smtplib.SMTPAuthenticationError:
        db.gravar_controle(conn, "pausado", "o Zoho recusou o login (confira a senha de app)")
        raise
    with conn:
        conn.execute(
            "INSERT INTO envios (cnpj, email, etapa, assunto, message_id) VALUES (?, ?, ?, ?, ?)",
            (lead["cnpj"], lead["email"], etapa, msg["Subject"], msg["Message-ID"]),
        )
        conn.execute("UPDATE leads SET status = 'contatado', atualizado_em = datetime('now') WHERE cnpj = ?", (lead["cnpj"],))


def _agendar_proximo(conn, agora: datetime) -> None:
    """Espalha os envios pela janela do dia, com variação para não sair em intervalos fixos."""
    inicio, fim = (datetime.strptime(h, "%H:%M") for h in _janela())
    minutos = (fim - inicio).seconds / 60 / int(_cfg("LIMITE_DIARIO", "10"))
    proximo = agora + timedelta(minutes=minutos * random.uniform(0.6, 1.4))
    db.gravar_controle(conn, "proximo_envio", proximo.isoformat())


def ciclo(conn, simular: bool = False) -> dict:
    """Roda a cada 10 minutos: lê respostas, confere a trava, envia no máximo um e-mail e publica os protótipos."""
    agora = datetime.now(timezone.utc)
    resumo: dict = {"hora": f"{agora.astimezone(FUSO):%d/%m %H:%M}", "respostas": respostas.processar(conn)}
    conferir_trava(conn, agora)
    fila = pendentes(conn, agora)
    resumo["na_fila"] = len(fila)
    motivo = bloqueio(conn, agora)
    if simular:
        if fila:
            lead, etapa = fila[0]
            resumo["enviaria"] = f"etapa {etapa} para {lead['email']}"
        resumo["bloqueio"] = motivo
    elif motivo:
        resumo["sem_envio"] = motivo
    elif fila:
        lead, etapa = fila[0]
        enviar(conn, lead, etapa)
        _agendar_proximo(conn, agora)
        resumo["enviado"] = f"etapa {etapa} para {lead['email']}"
    # Publicar uma vez por dia também mantém o Supabase grátis ativo (ele pausa após 7 dias parado)
    hoje = agora.astimezone(FUSO).date().isoformat()
    if not simular and db.ler_controle(conn, "publicado_em") != hoje:
        try:
            resumo["publicacao"] = publicacao.publicar()
            db.gravar_controle(conn, "publicado_em", hoje)
        except Exception as e:  # a publicação nunca impede o resto do ciclo
            resumo["publicacao"] = f"erro: {e}"
    return resumo


def situacao(conn) -> dict:
    agora = datetime.now(timezone.utc)
    return {
        "pausado": db.ler_controle(conn, "pausado"),
        "bloqueio_agora": bloqueio(conn, agora),
        "na_fila": len(pendentes(conn, agora)),
        "envios_por_etapa": dict(conn.execute("SELECT etapa, COUNT(*) FROM envios GROUP BY etapa").fetchall()),
        "respostas": dict(conn.execute("SELECT classificacao, COUNT(*) FROM respostas GROUP BY 1").fetchall()),
        "leads_por_status": dict(conn.execute(
            "SELECT status, COUNT(*) FROM leads WHERE prototipo_slug IS NOT NULL GROUP BY 1"
        ).fetchall()),
    }
