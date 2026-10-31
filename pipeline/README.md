# Captação de leads

Pipeline que encontra empresas de um nicho numa região, a partir da base aberta de CNPJ da Receita Federal, e avalia se elas têm site e se o site é bom. Roda em Docker no servidor (`/opt/devstarter-pipeline`), ao lado do mailcow.

## Comandos

```bash
cd /opt/devstarter-pipeline
docker compose build

# 1. Baixa a base mais recente da Receita (~7 GB, uns 20–30 min)
docker compose run --rm leads baixar

# 2. Filtra por nicho e região (padrão: transportadoras, SP, DDD 14)
docker compose run --rm leads importar --nichos transportadoras --ddd 14

# 3. Valida e-mails, avalia os sites e classifica a oportunidade
docker compose run --rm leads enriquecer --nicho transportadoras

# 4. Gera os protótipos de site (um por empresa) e publica no Supabase
docker compose run --rm leads prototipos --nicho transportadoras --oportunidade site_fora_do_ar,site_fraco
docker compose run --rm leads publicar

# 5. Envio: nada sai sem aprovação. Confira o texto antes
docker compose run --rm leads previa --slug <slug> [--etapa 2]
docker compose run --rm leads aprovar --slugs <slug1>,<slug2>   # ou --oportunidade site_fraco, ou --todos
docker compose run --rm leads ciclo --simular                   # mostra o que faria
docker compose run --rm leads situacao                          # fila, envios, respostas, pausa
docker compose run --rm leads pausar / retomar / descadastrar --email <e-mail>

# Números e exportação para o Excel
docker compose run --rm leads resumo --nicho transportadoras
docker compose run --rm leads exportar --nicho transportadoras --saida /data/transportadoras.csv
```

O `ciclo` roda a cada 10 minutos pelo cron do servidor: lê as respostas novas por IMAP (só leitura), confere a trava, envia no máximo um e-mail (só com `ENVIO_ATIVO=1`, em dia útil, dentro da `JANELA` e do `LIMITE_DIARIO`, com intervalo aleatório) e publica os protótipos uma vez por dia. Lembretes saem 3 e depois 5 dias úteis após o e-mail anterior, na mesma conversa, e param quando a pessoa responde. "sair" e e-mails devolvidos vão para `descadastros`; 3 devoluções (ou 5%) em 14 dias ou qualquer reclamação pausam tudo.

Variáveis no `.env` do servidor: `SMTP_USUARIO`, `SMTP_SENHA` (senha de app do Zoho, também usada no IMAP), `REMETENTE`, `ENVIO_ATIVO`, `LIMITE_DIARIO`, `JANELA`, `GROQ_API_KEY` (e opcionais `GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `OLLAMA_URL`), além das do Supabase. Para gravar a senha e a chave sem expô-las no terminal: `ssh -t vps bash /opt/devstarter-pipeline/configurar.sh`.

Cada protótipo abre no modelo indicado pelo tamanho da empresa (`modelo_de_site` em `prototipos.py`) e o seletor no topo da página permite comparar os outros: `cartao`, `simples`, `orcamento` e `completo`.

Os protótipos ficam em `devstarter.com.br/p/<slug>`. O repositório é público, então os dados dos prospects nunca vão para o Git: ficam no `data/` do servidor e no Supabase (`supabase.sql`). As chaves ficam só no `.env` do servidor.

## Como os leads são filtrados

- **CNAE principal** do nicho (`devstarter_leads/config.py`), empresa **ativa**, só a **matriz**, MEI fora.
- **Região**: UF + DDD do telefone cadastrado.
- **Tipo do e-mail**: `corporativo` (domínio próprio), `gratuito` (Gmail, Hotmail…), `provedor` (domínio usado por várias empresas da região), `contador` (o mesmo e-mail em 3+ empresas ou com cara de escritório contábil), `invalido` ou `vazio`.

## Oportunidades

| Oportunidade | Quando |
|---|---|
| `sem_site_provavel` | e-mail gratuito/provedor, ou o domínio só aponta para rede social |
| `site_fora_do_ar` | o domínio próprio não abre, está estacionado ou em construção |
| `site_fraco` | o site abre, mas sem HTTPS, não é responsivo, é lento ou tem copyright de 4+ anos atrás |
| `site_ok` | o site parece bom (prioridade baixa) |
| `revisar` | o site bloqueou a checagem automática |
| `descartar` | sem e-mail, e-mail inválido, e-mail do contador ou domínio que não recebe e-mail |
