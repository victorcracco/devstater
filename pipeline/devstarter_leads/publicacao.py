"""Publica os protótipos gerados no Supabase, de onde o site os lê."""
import json
import os

import httpx

from . import prototipos


def publicar() -> dict:
    url = os.environ.get("SUPABASE_URL")
    chave = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
    token = os.environ.get("PIPELINE_TOKEN")
    if not (url and chave and token):
        raise SystemExit("Defina SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY e PIPELINE_TOKEN no .env do pipeline.")
    linhas = [json.loads(a.read_text()) for a in sorted(prototipos.PASTA.glob("*.json"))]
    if not linhas:
        return {"publicados": 0}
    # A função confere o token (só o hash dele fica no banco) e faz upsert pelo slug
    resposta = httpx.post(
        f"{url}/rest/v1/rpc/publicar_prototipos",
        headers={"apikey": chave},
        json={"p_token": token, "p_linhas": linhas},
        timeout=60,
    )
    resposta.raise_for_status()
    return {"publicados": resposta.json()}
