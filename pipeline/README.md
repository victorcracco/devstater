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

# Números e exportação para o Excel
docker compose run --rm leads resumo --nicho transportadoras
docker compose run --rm leads exportar --nicho transportadoras --saida /data/transportadoras.csv
```

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
