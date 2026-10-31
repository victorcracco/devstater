"""Textos dos e-mails de prospecção: curtos, com a origem do contato e saída fácil (LGPD).

Cada e-mail sai em duas versões: texto puro e HTML organizado, sem imagens. O HTML usa tabelas e
estilos na própria tag porque é o que o Outlook e os webmails renderizam igual.
"""
import json
from datetime import date
from html import escape

from . import config

WHATSAPP_TEXTO = "(14) 99846-9800"
WHATSAPP_LINK = "https://wa.me/5514998469800"
SAUDACAO = "Oi, tudo bem? Aqui é o Victor, da DevStarter."
ORIGEM = (
    "Encontrei o contato de vocês no cadastro público de CNPJ da Receita Federal. "
    'Se não quiser receber mais mensagens, é só responder "sair".'
)
FECHAMENTO = (
    "No topo da página dá para comparar versões, da mais simples à mais completa. Se gostar de alguma, "
    "coloco no ar no domínio de vocês em poucos dias. Se não fizer sentido agora, sem problema."
)
PROBLEMAS = {
    "sem_https": 'Aparece como "não seguro" no navegador',
    "nao_responsivo": "Não se ajusta à tela do celular",
    "lento": "Demora para carregar",
}

COR = "#0F4C42"
FUNDO = "#F4F7F4"
BORDA = "#D6E2DD"
SUAVE = "#6B7280"
TABELA = 'role="presentation" cellpadding="0" cellspacing="0" border="0"'


def _problemas(motivos: list[str]) -> list[str]:
    itens = [PROBLEMAS[m] for m in motivos if m in PROBLEMAS]
    for m in motivos:
        if m.startswith("desatualizado_"):
            itens.append(f"O rodapé ainda mostra {m.rpartition('_')[2]}")
    return itens


def _validade(prototipo: dict) -> str:
    return date.fromisoformat(prototipo["expiraEm"]).strftime("%d/%m")


def _html_destaque(itens: list[str]) -> str:
    linhas = "".join(f'<p style="margin:0 0 6px">• {escape(item, quote=False)}</p>' for item in itens)
    return (
        f'<table {TABELA} width="100%" style="margin:0 0 18px"><tr>'
        f'<td style="background:{FUNDO};border-left:3px solid {COR};padding:14px 16px 8px">{linhas}</td>'
        "</tr></table>"
    )


def _html_botao(link: str) -> str:
    return (
        f'<table {TABELA} style="margin:2px 0 10px"><tr>'
        f'<td bgcolor="{COR}" style="background:{COR};border-radius:6px">'
        f'<a href="{link}" style="display:inline-block;padding:13px 26px;color:#FFFFFF;font-weight:bold;'
        'text-decoration:none">Ver o modelo do site</a></td></tr></table>'
        f'<p style="margin:0 0 18px;font-size:12px;color:{SUAVE}">Ou acesse: '
        f'<a href="{link}" style="color:{SUAVE}">{link}</a></p>'
    )


def _renderizar(blocos: list[tuple], link: str) -> tuple[str, str]:
    """(texto puro, HTML) a partir dos blocos: ('p', texto), ('destaque', itens) ou ('botao', None)."""
    texto, corpo = [], []
    for tipo, valor in blocos:
        if tipo == "p":
            texto.append(valor)
            corpo.append(f'<p style="margin:0 0 16px">{escape(valor, quote=False)}</p>')
        elif tipo == "destaque":
            texto.append("\n".join(f"- {item}" for item in valor))
            corpo.append(_html_destaque(valor))
        else:
            texto.append(link)
            corpo.append(_html_botao(link))

    texto.append(f"Um abraço,\nVictor\nDevStarter · WhatsApp {WHATSAPP_TEXTO}")
    texto.append(f"—\n{ORIGEM}")
    assinatura = (
        '<p style="margin:6px 0 4px">Um abraço,<br><strong>Victor</strong><br>DevStarter · '
        f'<a href="{WHATSAPP_LINK}" style="color:{COR}">WhatsApp {WHATSAPP_TEXTO}</a></p>'
    )
    html = (
        f'<table {TABELA} width="100%" bgcolor="{FUNDO}" style="background:{FUNDO}"><tr>'
        '<td align="center" style="padding:24px 12px">'
        f'<table {TABELA} width="600" style="width:100%;max-width:600px;background:#FFFFFF;'
        f'border:1px solid {BORDA};border-radius:10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;'
        'line-height:1.6;color:#1F2933;text-align:left">'
        f'<tr><td style="padding:18px 28px;border-bottom:1px solid {BORDA};font-size:20px;font-weight:bold;'
        f'color:#10171A">Dev<span style="color:{COR}">Starter</span></td></tr>'
        f'<tr><td style="padding:24px 28px 18px">{"".join(corpo)}{assinatura}</td></tr>'
        f'<tr><td style="padding:14px 28px 18px;border-top:1px solid {BORDA};font-size:12px;line-height:1.5;'
        f'color:{SUAVE}">{escape(ORIGEM, quote=False)}</td></tr>'
        "</table></td></tr></table>"
    )
    return "\n\n".join(texto), html


def montar(etapa: int, lead, prototipo: dict, link: str) -> tuple[str, str, str]:
    """(assunto, texto puro, HTML) da etapa: 1 = primeiro contato, 2 e 3 = lembretes na mesma conversa."""
    nome = prototipo["nome"]
    nicho = config.NICHOS[lead["nicho"]]
    para_nome = f"para a {nome}" if nicho.artigo else f"para {nome}"
    de_nome = f"da {nome}" if nicho.artigo else f"de {nome}"
    assunto = f"Fiz um modelo de site {para_nome}"
    if etapa > 1:
        if etapa == 2:
            blocos = [
                ("p", f"Oi! Só queria saber se você conseguiu ver o modelo que fiz {para_nome}:"),
                ("botao", None),
                ("p", f"Ele fica no ar até {_validade(prototipo)}. Se quiser mudar alguma coisa, é só me dizer."),
            ]
        else:
            blocos = [
                ("p", f"Oi! Última mensagem sobre isso, prometo. O modelo {de_nome} continua aqui até {_validade(prototipo)}:"),
                ("botao", None),
                ("p", "Se em algum momento fizer sentido, é só responder este e-mail ou me chamar no WhatsApp."),
            ]
        return (f"Re: {assunto}", *_renderizar(blocos, link))

    motivos = json.loads(lead["motivos"] or "[]")
    if lead["oportunidade"] == "site_fora_do_ar":
        situacao = (
            "no lugar dele aparece uma página da hospedagem"
            if "site_estacionado" in motivos else "ele não está abrindo"
        )
        diagnostico = [(
            "p",
            f"Tentei abrir o site {de_nome} ({lead['dominio']}) e {situacao}. Talvez vocês já saibam, mas "
            f"quem procura {nicho.quem_procura} no Google e não encontra o site {nicho.quem_desiste}.",
        )]
        convite = "Por isso montei um modelo de como o site de vocês pode ficar, já com os dados da empresa:"
    elif lead["oportunidade"] == "site_fraco":
        itens = _problemas(motivos)
        quantos = "um ponto que pode estar custando" if len(itens) == 1 else "alguns pontos que podem estar custando"
        diagnostico = [("p", f"Entrei no site {de_nome} e notei {quantos} {nicho.o_que_perde}:"), ("destaque", itens)]
        convite = "Montei um modelo de site novo para vocês, já com os dados da empresa:"
    elif lead["oportunidade"] == "sem_site_provavel":
        # Sabemos só que o e-mail cadastrado é gratuito: o texto não afirma que a empresa não tem site
        diagnostico = [(
            "p",
            f"Pelo cadastro {de_nome}, não identifiquei um site de vocês. Hoje, quem procura {nicho.quem_procura} "
            f"no Google e não encontra o site {nicho.quem_desiste}. Se vocês já têm um, pode desconsiderar.",
        )]
        convite = "Montei um modelo de como o site de vocês pode ficar, já com os dados da empresa:"
    else:
        raise ValueError(f"sem texto para a oportunidade {lead['oportunidade']}")

    blocos = [("p", SAUDACAO), *diagnostico, ("p", convite), ("botao", None), ("p", FECHAMENTO)]
    return (assunto, *_renderizar(blocos, link))
