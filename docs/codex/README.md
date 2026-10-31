# Prompts para o Codex

As regras gerais ficam em `AGENTS.md`, que o Codex lê sozinho. Aqui ficam os pedidos prontos: copie um bloco, cole no Codex e revise o PR que ele abrir.

Faça **uma tarefa por vez**, cada uma na sua branch.

## 1. Novos modelos visuais

```
Leia AGENTS.md e docs/codex/novos-modelos.md. Use $devstarter-design e $frontend-design. Primeiro abra um
PR de rascunho só com o plano de design do modelo "editorial" (ideia em uma frase, cores, fontes e layout
em ASCII) e pare para eu revisar. Trabalhe na branch codex/modelo-editorial.
```

Depois de aprovar o plano:

```
Plano aprovado. Construa o modelo e rode $devstarter-qa-visual com todas as empresas de exemplo. Anexe ao PR
o resultado, os prints em 375px e 1280px e sua crítica pela lista de vícios da skill devstarter-design.
```

Troque `editorial` pelos outros modelos do arquivo, um por PR.

## 2. Novos nichos

```
Leia AGENTS.md e docs/codex/nichos/psicologia.md. Crie o nicho descrito lá em
lib/prototipos/nichos/psicologia.ts, usando lib/prototipos/nichos/transportadoras.ts como referência, e
registre-o em lib/prototipos/nichos/index.ts. Crie os dois exemplos em exemplos/prototipos/. Antes de abrir
o PR, rode $devstarter-revisar-nicho e $devstarter-qa-visual e inclua os resultados nele. Trabalhe na branch
codex/nicho-psicologia e abra um PR.
```

Troque `psicologia` por:

| Arquivo | Nicho |
|---|---|
| `clinicas_medicas` | Clínicas e consultórios médicos |
| `odontologia` | Dentistas |
| `psicologia` | Psicólogos e psicólogas |
| `estetica` | Clínicas de estética |
| `oficinas` | Oficinas mecânicas, funilaria, elétrica, alinhamento, borracharia |
| `imobiliarias` | Imobiliárias e corretores |

## 3. Um nicho que ainda não está na lista

```
Leia AGENTS.md e docs/codex/novo-nicho.md. Pesquise as regras de publicidade do nicho de <NICHO> e escreva
o briefing em docs/codex/nichos/<id>.md, citando as fontes oficiais. Abra um PR só com o briefing, para
revisão, e não crie o conteúdo do site ainda.
```

## Depois que o PR for aprovado

Estes passos não são do Codex:

1. Publicar o site.
2. Marcar `site_pronto=True` no nicho, em `pipeline/devstarter_leads/config.py`.
3. Importar as empresas, gerar os protótipos, revisar e aprovar antes de enviar.
