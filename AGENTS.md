# Instruções para agentes (Codex e afins)

A DevStarter vende sites. Para prospectar, o sistema encontra empresas, gera um **protótipo de site personalizado** para cada uma e envia o link por e-mail. Sua tarefa aqui costuma ser criar **conteúdo de nichos** e **modelos visuais** desses protótipos.

## Como o projeto está organizado

| Pasta | O que é | Pode mexer? |
|---|---|---|
| `lib/prototipos/nichos/` | Conteúdo de cada nicho | Sim |
| `app/(prototipos)/p/[slug]/modelos/` | Modelos visuais dos protótipos | Sim, para adicionar. Veja a regra 7 |
| `exemplos/prototipos/` | Empresas fictícias para testar | Sim |
| `lib/prototipos/conteudo.ts` | Estrutura do conteúdo | Só se for indispensável, e explique no PR |
| `app/(clientes)/` | Demos fictícios; o modelo Completo reaproveita `transportes/components` | Só com pedido explícito |
| `app/(dev)/` | Site principal da DevStarter | **Não** |
| `pipeline/` | Captação e envio de e-mails, em produção | **Não** |

Como um protótipo é montado:

```
dados da empresa → nicho.montarSite(dados) → ConteudoPrototipo → modelo visual
(dados.ts)         (nichos/*.ts)             (conteudo.ts)       (modelos/*.tsx)
```

**A separação é a regra central:** modelo visual não contém texto de nicho, e nicho não contém visual. O mesmo modelo precisa funcionar para uma transportadora e para um consultório. A referência é `lib/prototipos/nichos/transportadoras.ts`.

## Regras inegociáveis

1. **O repositório é público.** Nunca coloque dados de empresas ou pessoas reais em código, exemplos, testes ou commits. Use só empresas fictícias, com `exemplo.com.br` e telefones como `(14) 3000-0000`.
2. **Nunca invente fatos sobre a empresa.** Número de clientes, frota, anos além do campo `desde`, prêmios, certificações, convênios, especialidades, nomes de profissionais, horários e depoimentos são proibidos. Use só os campos de `DadosPrototipo` e textos genéricos do tipo de serviço que o CNAE indica. Nunca preencha `depoimentos`.
3. **Respeite as regras de publicidade do nicho**, descritas em `docs/codex/nichos/`. Na dúvida entre um texto chamativo e um seguro, use o seguro. Registro profissional que não temos aparece como "a informar" em `contato.registro`, nunca com número inventado.
4. **Nada de promessa de resultado**, de superlativos ("o melhor", "número 1") nem de comparação com concorrentes.
5. **Imagens só com licença gratuita confirmada na página da foto.**
   - Use a URL direta `images.unsplash.com/photo-...` e registre autor e link num comentário.
   - **Nunca use `plus.unsplash.com`**: são fotos premium, com marca d'água.
   - Sem marcas ou placas legíveis, sem pessoas em situação de tratamento e sem "antes e depois".
6. **Formulários não pedem dado sensível.** Em nichos de saúde, nunca peça sintomas, diagnóstico ou motivo da consulta: só nome, assunto geral e melhor horário. O formulário não grava nada, apenas abre o WhatsApp ou o e-mail da empresa.
7. **Modelos existentes estão em produção**, com e-mails já enviados apontando para eles. Adicione modelos novos em vez de alterar `cartao`, `simples`, `orcamento` e `completo`. Correção nesses quatro precisa ser mínima e explicada no PR.
8. **Linguagem neutra para pessoas.** Nomes de profissionais não indicam gênero: prefira "de {nome}" e "para {nome}", e não "da" nem "do". Só use "a {nome}" em nichos de empresa, como faz transportadoras.
9. **Sem dependências novas** sem pedir antes. Não mexa em `.env*`, chaves ou `lib/whatsapp.ts`.

## Skills do projeto

Ficam em `.agents/skills/`. Use `$nome-da-skill` para chamar uma pelo nome.

| Skill | Quando usar |
|---|---|
| `devstarter-design` | **Sempre** ao criar ou mudar um modelo visual: como não ter cara de IA |
| `frontend-design` | Junto com a anterior: o método geral de direção visual |
| `devstarter-qa-visual` | **Sempre** antes de entregar um modelo ou um nicho: testa no celular e no computador |
| `devstarter-revisar-nicho` | **Sempre** ao criar ou mudar um nicho: fatos, regras do conselho e textos |
| `devstarter-seo` | Estrutura dos modelos e publicação de sites de clientes |
| `seo-local`, `seo-schema`, `seo-page` | Detalhes de SEO local, dados estruturados e SEO de página |

As regras deste arquivo valem acima das skills.

## Qualidade exigida

- Pensado primeiro para celular: sem rolagem lateral em 375px, inclusive com nomes e cidades longos.
- Contraste AA, foco visível no teclado e `alt` em toda imagem.
- Funciona quando faltam dados: sem WhatsApp, sem telefone, sem endereço, sem `desde`.
- Português do Brasil com acentos. Todos os textos ficam no nicho, nunca no modelo.

## Como testar

Crie um `.env.local` (fora do Git) para ler as empresas fictícias em vez do banco real:

```
PROTOTIPOS_DIR=exemplos/prototipos
```

```bash
npm run dev
```

Abra `http://localhost:3000/p/exemplo-transportadora?modelo=cartao` e troque o modelo pelo seletor no topo. **Reinicie o servidor ao mudar o `.env.local`.**

Antes de entregar, rode:

```bash
npx tsc --noEmit
npx eslint "app/(prototipos)" lib/prototipos --quiet
npm run build
```

Depois rode a skill `devstarter-qa-visual`. Em nichos, rode antes a `devstarter-revisar-nicho`. Inclua os resultados no PR.

Cada nicho novo precisa de **dois exemplos**: um completo e um mínimo, sem WhatsApp, sem endereço e com nome e cidade longos.

## Como entregar

- Uma branch por tarefa: `codex/<tarefa>`, por exemplo `codex/nicho-psicologia`. **Nunca faça push na `main`.**
- Commits em português, no estilo `feat: conteúdo do nicho de psicologia`.
- No PR, liste: o que foi criado, os links de exemplo testados, as fotos usadas com autor e licença, e qualquer dúvida sobre as regras do nicho.
- Não altere `site_pronto` no pipeline: isso só muda depois que o site estiver publicado.
