"""Avaliação rápida do site de uma empresa: se está no ar, tem HTTPS, funciona no celular e parece abandonado."""
import asyncio
import re
import time
from datetime import date
from html.parser import HTMLParser
from urllib.parse import urlsplit

import httpx

from . import config

LIMITE_BYTES = 1_500_000
REDES_SOCIAIS = ("facebook.com", "instagram.com", "linktr.ee", "wa.me", "whatsapp.com", "linkedin.com")
RE_ESTACIONADO = re.compile(
    r"dom[ií]nio .{0,20}(venda|registrado|dispon[ií]vel)|this domain|domain (is )?for sale|buy this domain"
    r"|parked|em constru[cç][aã]o|under construction|em manuten[cç][aã]o|coming soon|index of /"
    r"|default (web site )?page|welcome to nginx|it works!|conta suspensa|account (has been )?suspended"
    r"|hostgator|locaweb|hostinger|kinghost|p[aá]gina padr[aã]o",
    re.I,
)
RE_ANO = re.compile(
    r"(?:©|copyright|todos os direitos)[^0-9]{0,40}((?:19|20)\d{2})(?:\s*[-–/]\s*((?:19|20)\d{2}))?",
    re.I,
)
RE_EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
RE_INSTAGRAM = re.compile(r"instagram\.com/([A-Za-z0-9_.]+)")
RE_CHARSET = re.compile(rb"charset=[\"']?([\w-]+)", re.I)
INSTAGRAM_IGNORAR = {"p", "reel", "reels", "explore", "accounts", "share", "stories", "tv"}
WHATSAPP = ("wa.me", "api.whatsapp.com", "whatsapp.com/send", "web.whatsapp")
PLATAFORMAS = (
    ("wixstatic", "wix"), ("wix.com", "wix"), ("wp-content", "wordpress"),
    ("squarespace", "squarespace"), ("webnode", "webnode"), ("nuvemshop", "nuvemshop"),
    ("shopify", "shopify"), ("sites.google.com", "google_sites"), ("site123", "site123"),
    ("weebly", "weebly"), ("joomla", "joomla"),
)


class _Pagina(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titulo = ""
        self.viewport = False
        self.gerador = ""
        self.links: list[str] = []
        self.texto: list[str] = []
        self._no_titulo = False
        self._ignorar = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self._no_titulo = True
        elif tag == "meta":
            nome = (a.get("name") or "").lower()
            if nome == "viewport":
                self.viewport = True
            elif nome == "generator":
                self.gerador = a.get("content") or ""
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag in ("script", "style", "noscript"):
            self._ignorar += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self._no_titulo = False
        elif tag in ("script", "style", "noscript") and self._ignorar:
            self._ignorar -= 1

    def handle_data(self, data):
        if self._no_titulo:
            self.titulo += data
        elif not self._ignorar:
            self.texto.append(data)


def _decodificar(corpo: bytes, resp: httpx.Response) -> str:
    m = RE_CHARSET.search(corpo[:4096])
    for codificacao in (m.group(1).decode("ascii", "ignore") if m else None, resp.encoding):
        if codificacao:
            try:
                return corpo.decode(codificacao, errors="replace")
            except LookupError:
                continue
    return corpo.decode("utf-8", errors="replace")


def _instagram(links: list[str]) -> str | None:
    for link in links:
        m = RE_INSTAGRAM.search(link)
        if m and m.group(1).lower() not in INSTAGRAM_IGNORAR:
            return m.group(1)
    return None


def _analisar(html: str) -> dict:
    pagina = _Pagina()
    try:
        pagina.feed(html)
        pagina.close()
    except Exception:
        pass  # HTML quebrado: fica com o que deu para ler
    texto = " ".join(" ".join(pagina.texto).split())
    titulo = " ".join(pagina.titulo.split())
    minusculo = html.lower()
    anos = [int(a) for m in RE_ANO.finditer(texto) for a in m.groups() if a]
    emails = {
        e.lower() for e in RE_EMAIL.findall(html)
        if not e.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"))
        and "sentry" not in e and "wixpress" not in e
    }
    return {
        "site_titulo": titulo[:200] or None,
        "site_mobile": int(pagina.viewport),
        "site_ano": max((a for a in anos if a <= date.today().year), default=None),
        "site_plataforma": next((nome for marca, nome in PLATAFORMAS if marca in minusculo), None)
        or (pagina.gerador[:60] or None),
        "site_instagram": _instagram(pagina.links),
        "site_whatsapp": int(any(w in link for link in pagina.links for w in WHATSAPP)),
        "emails_site": ",".join(sorted(emails)[:5]) or None,
        "estacionado": bool(RE_ESTACIONADO.search(titulo))
        or (len(texto) < 400 and bool(RE_ESTACIONADO.search(texto))),
    }


def _erro_tls(erros: list[Exception]) -> bool:
    return any("ssl" in str(e).lower() or "certificate" in str(e).lower() for e in erros)


async def _baixar_pagina(cliente: httpx.AsyncClient, urls: list[str]):
    erros = []
    for url in urls:
        inicio = time.monotonic()
        try:
            async with cliente.stream("GET", url) as resp:
                corpo = bytearray()
                async for parte in resp.aiter_bytes():
                    corpo += parte
                    if len(corpo) >= LIMITE_BYTES:
                        break
                return resp, bytes(corpo), int((time.monotonic() - inicio) * 1000), erros
        except httpx.HTTPError as e:
            erros.append(e)
    return None, b"", None, erros


async def avaliar(seguro: httpx.AsyncClient, inseguro: httpx.AsyncClient, dominio: str) -> dict:
    urls = [f"https://{dominio}", f"https://www.{dominio}", f"http://www.{dominio}", f"http://{dominio}"]
    resp, corpo, ms, erros = await _baixar_pagina(seguro, urls)
    https_valido = True
    if resp is None and _erro_tls(erros):
        # Site no ar, mas com certificado inválido: tenta de novo sem verificar
        resp, corpo, ms, _ = await _baixar_pagina(inseguro, urls[:2])
        https_valido = False
    if resp is None:
        return {"site_status": "fora_do_ar", "site_erro": type(erros[-1]).__name__ if erros else None}

    final = str(resp.url)
    host = urlsplit(final).hostname or ""
    resultado = {
        "site_url": final,
        "site_ms": ms,
        "site_https": int(https_valido and final.startswith("https://")),
    }
    if any(host == r or host.endswith("." + r) for r in REDES_SOCIAIS):
        return {**resultado, "site_status": "rede_social"}
    if resp.status_code >= 500 or resp.status_code in (404, 410):
        return {**resultado, "site_status": "fora_do_ar", "site_erro": f"HTTP {resp.status_code}"}
    if resp.status_code in (401, 403, 429):
        return {**resultado, "site_status": "bloqueado", "site_erro": f"HTTP {resp.status_code}"}

    dados = _analisar(_decodificar(corpo, resp))
    estacionado = dados.pop("estacionado")
    return {**resultado, **dados, "site_status": "estacionado" if estacionado else "ok"}


async def avaliar_varios(dominios: list[str]) -> dict[str, dict]:
    opcoes = dict(
        follow_redirects=True,
        max_redirects=8,
        timeout=httpx.Timeout(15, connect=8),
        headers={"User-Agent": config.USER_AGENT, "Accept-Language": "pt-BR,pt;q=0.9"},
    )
    limite = asyncio.Semaphore(config.CONCORRENCIA_SITES)
    async with httpx.AsyncClient(**opcoes) as seguro, httpx.AsyncClient(verify=False, **opcoes) as inseguro:

        async def um(dominio: str):
            async with limite:
                try:
                    return dominio, await asyncio.wait_for(avaliar(seguro, inseguro, dominio), timeout=60)
                except Exception as e:  # um site problemático nunca derruba o lote
                    return dominio, {"site_status": "fora_do_ar", "site_erro": type(e).__name__}

        return dict(await asyncio.gather(*(um(d) for d in dominios)))
