"""LLMs com plano grátis, em ordem: se um falha ou estoura o limite, passa para o próximo."""
import os
import re

import httpx

RE_RACIOCINIO = re.compile(r"<think>.*?</think>", re.S)

# (nome, URL compatível com a API da OpenAI, variável da chave, variável do modelo, modelo padrão)
PROVEDORES = (
    ("groq", "https://api.groq.com/openai/v1", "GROQ_API_KEY", "GROQ_MODELO", "qwen/qwen3.8-27b"),
    ("gemini", "https://generativelanguage.googleapis.com/v1beta/openai", "GEMINI_API_KEY", "GEMINI_MODELO", "gemini-2.5-flash"),
    ("openrouter", "https://openrouter.ai/api/v1", "OPENROUTER_API_KEY", "OPENROUTER_MODELO", "meta-llama/llama-3.3-70b-instruct:free"),
)

CATEGORIAS = ("sem_interesse", "interessado", "respondeu")
INSTRUCAO_RESPOSTA = (
    "Você classifica respostas a um e-mail de prospecção que ofereceu um modelo de site para a empresa. "
    "Responda com uma única palavra: interessado (quer conversar, saber preço ou mais detalhes), "
    "sem_interesse (recusou, já tem fornecedor ou não precisa) ou respondeu (qualquer outra coisa)."
)


def _candidatos() -> list[tuple[str, str, str, str]]:
    candidatos = [
        (nome, url, os.environ[chave], os.environ.get(modelo, padrao))
        for nome, url, chave, modelo, padrao in PROVEDORES
        if os.environ.get(chave)
    ]
    if os.environ.get("OLLAMA_URL"):
        url = os.environ["OLLAMA_URL"].rstrip("/") + "/v1"
        candidatos.append(("ollama", url, "ollama", os.environ.get("OLLAMA_MODELO", "qwen3:4b")))
    return candidatos


def completar(instrucao: str, texto: str, max_tokens: int = 200) -> str | None:
    for nome, url, chave, modelo in _candidatos():
        try:
            resposta = httpx.post(
                f"{url}/chat/completions",
                headers={"Authorization": f"Bearer {chave}"},
                json={
                    "model": modelo,
                    "temperature": 0,
                    "max_tokens": max_tokens,
                    "messages": [{"role": "system", "content": instrucao}, {"role": "user", "content": texto}],
                },
                timeout=40,
            )
            resposta.raise_for_status()
            conteudo = resposta.json()["choices"][0]["message"]["content"] or ""
            # Alguns modelos devolvem o raciocínio entre <think> e </think> antes da resposta
            conteudo = RE_RACIOCINIO.sub("", conteudo).strip()
            if conteudo:
                return conteudo
            print(f"Aviso: LLM {nome} ({modelo}) devolveu resposta vazia")
        # O aviso vai para o log do ciclo: um modelo aposentado não pode falhar em silêncio
        except httpx.HTTPStatusError as e:
            print(f"Aviso: LLM {nome} ({modelo}) respondeu HTTP {e.response.status_code}")
        except (httpx.HTTPError, KeyError, IndexError, ValueError) as e:
            print(f"Aviso: LLM {nome} ({modelo}) falhou: {type(e).__name__}")
    return None


def classificar_resposta(texto: str) -> str | None:
    saida = completar(INSTRUCAO_RESPOSTA, texto[:2000])
    if not saida:
        return None
    return next((c for c in CATEGORIAS if c in saida.lower()), None)
