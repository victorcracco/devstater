#!/bin/bash
# Grava as credenciais no .env do servidor sem passá-las pelo chat nem pelo histórico do terminal.
# Uso, do seu computador: ssh -t vps bash /opt/devstarter-pipeline/configurar.sh
set -eu
cd "$(dirname "$0")"
umask 077
touch .env

gravar() {  # troca a linha da variável se ela já existir
  { grep -v "^$1=" .env || true; printf '%s=%s\n' "$1" "$2"; } > .env.novo
  mv .env.novo .env
}

read -rsp "Senha de app do Zoho (Enter mantém a atual): " senha; echo
read -rsp "Chave de API do Groq (Enter mantém a atual): " groq; echo
[ -n "$senha" ] && gravar SMTP_SENHA "$senha"
[ -n "$groq" ] && gravar GROQ_API_KEY "$groq"
unset senha groq

echo "Variáveis no .env (só os nomes):"
cut -d= -f1 .env
