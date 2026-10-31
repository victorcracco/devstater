# Nicho: dentistas (`odontologia`)

**CNAE:** 8630504 (atividade odontológica).

**Tom:** próximo e tranquilizador. Muita gente tem medo de dentista: evite imagens de procedimento.

## `montarSite`

- `icone`: `sorriso`. Foto: consultório limpo e vazio, sem boca aberta nem instrumentos em destaque.
- **Não sabemos os tratamentos oferecidos.** Use serviços genéricos: "Avaliação", "Prevenção e limpeza", "Tratamentos em geral". Não cite ortodontia, implante ou harmonização.
- `contato.registro`: `"CRO-{uf} a informar · Responsável técnico: a informar"`.

## `conversao`

- `acao`: "Agendar avaliação". Não diga "avaliação gratuita".
- Campos: **Nome**, **Telefone**, **Melhor período**. Não pergunte a queixa.
- `nomesModelos`: `{ orcamento: "Agendamento" }`.

## Regras de publicidade

Fontes: [Resolução CFO 196/2019](https://website.cfo.org.br/wp-content/uploads/2019/01/Resolu%c3%a7%c3%a3o-CFO-196-2019.pdf) e o Código de Ética Odontológica, capítulo de anúncio e publicidade. **Não conseguimos confirmar todos os itens no texto oficial: leia o código no site do CFO e aponte divergências no PR.**

- Mostre nome e número de inscrição no CRO. Clínica informa o responsável técnico.
- Segundo fontes secundárias, seguem proibidos preços, serviços gratuitos e modalidades de captação de pacientes.
- **Não use nos protótipos:** preços, "grátis", descontos, "antes e depois" e promessa de resultado.

## Pipeline

Já configurado: "um dentista", "pacientes". Use "de {nome}".
