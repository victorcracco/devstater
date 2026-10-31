---
name: devstarter-revisar-nicho
description: Revisa o conteúdo de um nicho dos protótipos antes do PR ou da aprovação. Procura fato inventado, quebra de regra de conselho profissional, promessa de resultado, dado sensível em formulário, linguagem com gênero, exemplos que parecem reais e texto com cara de IA. Use ao criar ou revisar arquivos em lib/prototipos/nichos ou docs/codex/nichos.
---

# Revisão de um nicho

O dono da empresa recebe um site escrito no nome dele. Uma frase falsa faz o protótipo perder a credibilidade na hora. Em saúde, ainda pode criar problema com o conselho profissional dele.

Esta revisão não substitui um parecer jurídico. Na dúvida, escolha o texto seguro e anote a dúvida.

## 1. Leia

- `AGENTS.md`
- `docs/codex/nichos/<id>.md`
- `lib/prototipos/nichos/<id>.ts`
- os exemplos do nicho em `exemplos/prototipos/`

## 2. Rode o script

Na raiz do repositório:

```bash
node .agents/skills/devstarter-revisar-nicho/scripts/sinais.mjs <id>
```

Cada sinal é um trecho para conferir, não um erro certo. "Melhor período", por exemplo, é um campo normal. Explique os que ficarem.

## 3. Leia frase por frase

O script não sabe se uma frase é verdadeira. Faça esta pergunta para cada frase:

> **Isto vale para qualquer empresa com este CNAE?**

Se valer só para algumas, é fato inventado: "atendemos toda a região", "equipe experiente", "resposta em uma hora", "aceitamos convênio". Reescreva de forma genérica ou apague.

Confira também:

- **Dados:** só campos de `DadosPrototipo`. Nada de número, nome, horário ou especialidade que não veio do cadastro.
- **Dados que faltam:** `desde`, `whatsapp`, `telefone` e `endereco` podem não existir. Nenhuma frase pode depender deles sem uma alternativa.
- **Norma do conselho:** compare com o briefing. Se algo gerar dúvida, abra o texto oficial. O que você não conseguiu confirmar vai escrito no relato.
- **Registro:** registro profissional que não temos fica "a informar", e o que é obrigatório precisa aparecer no modelo.
- **Formulário:** os campos são exatamente os do briefing. Campo a mais precisa de justificativa.
- **Fotos:** abra a página de cada foto e confirme a licença gratuita. O autor e o link ficam num comentário. Sem marca, placa legível ou pessoa em tratamento.
- **Tom:** o texto parece o dono falando? Passe a parte de texto da lista de vícios em `devstarter-design`.
- **Pessoas:** use "de {nome}" e "para {nome}", sem "Dr.", "Dra.", "a psicóloga" ou "o médico".
- **Separação:** nada de visual no nicho além dos campos previstos em `ConteudoPrototipo`.

## 4. Veja na tela

Rode a skill `devstarter-qa-visual` com os dois exemplos do nicho em todos os modelos. Uma frase aceitável no código pode ficar estranha no site, como "Agendar consulta" num botão de orçamento.

## 5. Relate

Liste os achados assim:

| Onde | Regra | Trecho | Ação |
|---|---|---|---|
| `arquivo:linha` | a regra do `AGENTS.md` ou do briefing | a frase | **bloqueia** ou **sugestão**, com o texto proposto |

Depois liste as dúvidas de norma que ficaram abertas.

- Fato inventado, norma quebrada, dado sensível e dado real sempre **bloqueiam**.
- Um nicho de saúde com norma não conferida fica **pendente**, nunca aprovado.
