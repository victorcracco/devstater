# Nicho: clínicas de estética (`estetica`)

**CNAE:** 9602502 (atividades de estética e outros serviços de cuidados com a beleza). MEI entra neste nicho.

**Tom:** elegante e cuidadoso, sem culpa sobre o corpo e sem "transformação radical".

## `montarSite`

- `icone`: `brilho`. Foto: ambiente, toalhas, plantas, produtos sem marca. Sem corpos e sem "antes e depois".
- **Só serviços sem agulha e sem risco**, em termos genéricos: "Limpeza de pele", "Massagem relaxante", "Cuidados com a pele", "Depilação".
- **Nunca cite procedimentos invasivos:** toxina botulínica, preenchimento, harmonização facial, fios, enzimas, peeling profundo, micropigmentação. Eles exigem profissional de saúde habilitado, e não sabemos quem atende ali.
- `contato.registro`: deixe vazio. Se for preciso citar responsável técnico, use "a informar".

## `conversao`

- `acao`: "Agendar horário".
- Campos: **Nome**, **Telefone**, **Serviço de interesse**, **Melhor período**.
- `nomesModelos`: `{ orcamento: "Agendamento" }`.

## Regras de publicidade

Não encontramos uma norma única de publicidade para o setor. Valem o Código de Defesa do Consumidor e as regras sanitárias. A Anvisa tem [fiscalizado clínicas de estética](https://www.folhape.com.br/noticias/anvisa-fiscaliza-clinicas-de-estetica-em-seis-cidades/391524/), e já houve [pedido de sanção por propaganda enganosa](https://www.nsctotal.com.br/?p=7226083) sobre segurança de procedimentos.

- **Não afirme:** "seguro", "sem dor", "sem riscos", "resultado garantido", "emagrece X kg", "rejuvenesce".
- **Não use:** preços, promoções e depoimentos, porque não temos essas informações.

## Pipeline

Já configurado: "uma clínica de estética", "agendamentos". Use "de {nome}", porque muitos nomes são de pessoas.
