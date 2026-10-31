# Nicho: clínicas e consultórios médicos (`clinicas_medicas`)

**CNAE:** 8630501 (ambulatorial com procedimentos cirúrgicos), 8630502 (com exames complementares), 8630503 (restrita a consultas).

**Tom:** sério, claro e tranquilizador. Sem linguagem de vendas.

## `montarSite`

- `icone`: `estetoscopio`. Foto: consultório vazio, recepção ou mãos com prancheta, sem paciente identificável.
- **Não sabemos a especialidade.** O CNAE não informa. Use só textos genéricos: "Consultas", "Atendimento particular" e, conforme o CNAE, "Exames" (8630502) ou "Procedimentos ambulatoriais" (8630501). Nunca cite doenças, órgãos ou especialidades.
- `contato.registro`: `"CRM/{uf} a informar · Diretor técnico: a informar"`.
- Em `sobre.numeros` use só fatos: ano de abertura e cidade. Não use "pacientes atendidos".

## `conversao`

- `acao`: "Agendar consulta". `mensagem`: pedido simples de agendamento.
- Campos: **Nome**, **Telefone**, **Melhor período**. Não pergunte motivo, sintoma ou convênio.
- Passos: pedir horário, receber a confirmação, comparecer.
- `nomesModelos`: `{ orcamento: "Agendamento" }`.

## Regras de publicidade

Fonte: [Resolução CFM 2.336/2023](https://crmes.org.br/wp-content/uploads/2023/09/Resolucao-2336-2023-publicidade-e-propaganda-medica.pdf). Confirme no texto oficial se algo gerar dúvida.

- **Obrigatório em médico:** nome, CRM e, quando houver especialidade registrada, o RQE.
- **Obrigatório em clínica:** nome do estabelecimento, cadastro no CRM e diretor técnico-médico com CRM (e RQE, se for clínica de especialidade).
- **Proibido:** sugerir garantia de resultado e divulgar que cuida de órgãos, sistemas ou doenças sem ser especialista.
- **Não use nos protótipos**, mesmo onde a norma permite com condições: "antes e depois", preços, promoções e depoimentos de pacientes.

Como não temos o CRM nem o RQE, tudo fica "a informar" até o cliente fechar.

## Pipeline

Já configurado: "uma clínica ou um médico", "pacientes". Nomes podem ser de pessoas: use "de {nome}".
