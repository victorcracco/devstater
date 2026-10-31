---
name: devstarter-design
description: Como criar modelos de site da DevStarter sem cara de IA nem de template. Use sempre que for criar ou mudar um modelo visual em app/(prototipos)/p/[slug]/modelos, ou escolher fontes, cores, fotos e textos de um site para pequenas empresas brasileiras.
---

# Sites da DevStarter sem cara de IA

Leia também a skill `frontend-design`, que traz o método geral. Esta aqui diz como aplicá-lo ao nosso caso.

## Quem vai olhar

O dono de uma oficina, uma transportadora ou um consultório no interior de São Paulo. Quase sempre vê no celular, entre um atendimento e outro, e nunca contratou um designer.

Ele não quer um site premiado. Quer pensar: **"parece uma empresa de verdade, e parece a minha"**. Um visual ousado demais assusta tanto quanto um genérico. O objetivo é ser específico, não exótico.

## O teste principal

Troque o nome da empresa e o ramo. Se o site continuar fazendo sentido para qualquer outro negócio, ele está genérico: refaça. Cada modelo precisa ter **uma** ideia forte, que dê para descrever em uma frase, sem usar "moderno", "clean" ou "profissional".

## O que denuncia um site feito por IA

Nossos quatro modelos atuais ainda têm vários destes vícios. **Não os copie como referência visual**, só como referência técnica.

**Layout**
- Hero com título enorme à esquerda, dois botões e foto escurecida atrás.
- Três ou quatro cartões iguais, com ícone em cima, título e duas linhas de texto.
- Todas as seções com o mesmo ritmo: título centralizado, subtítulo e grade.
- O mesmo `rounded-2xl` e a mesma sombra suave em tudo.

**Tipografia e cor**
- Uma palavra do título destacada em outra cor ou em degradê.
- Etiqueta em MAIÚSCULAS com letras espaçadas acima de cada título.
- Fundo quase preto com um único destaque neon (laranja, verde-limão).
- Creme, serifa e terracota, que virou o "elegante" padrão.
- Roxo e azul em degradê.

**Detalhes**
- Itens separados por "·" e seta "→" no fim de botões.
- Numeração 01, 02, 03 em algo que não é uma sequência.
- Emoji como ícone e ícones de biblioteca em todo lugar.
- Animação de entrada em cada seção.

**Texto**
- "Soluções sob medida", "Excelência em...", "Transforme seu negócio", "Seu parceiro ideal", "Muito mais que...", "Não é só X, é Y".
- Frases simétricas e slogans vazios. Nenhuma frase que só serviria para aquele ramo.

## O que fazer no lugar

- **Parta do mundo do ramo.** Transportadora: placas de estrada, faixas de sinalização, nota de frete, mapa de rotas. Oficina: etiqueta de ordem de serviço, tabela de revisão. Imobiliária: planta baixa, ficha de imóvel, mapa do bairro. Consultório: ficha, horário de atendimento, sala. Use isso na estrutura, não como enfeite.
- **Quebre o ritmo.** Alterne larguras, deixe uma seção ser só uma frase grande, use lista onde a tendência seria cartão. Nem tudo precisa de caixa.
- **Escolha fontes de propósito.** Evite Inter, Roboto e a Manrope do nosso site. Combine com o ramo: uma condensada como Barlow Condensed em transporte, uma humanista em saúde, uma serifa de caráter em imobiliária. Carregue com `next/font/google` no próprio arquivo do modelo.
- **Cor vinda do ramo**, com no máximo 4 a 6 tons definidos no plano. Saúde não precisa ser verde-hospital; transporte não precisa ser laranja.
- **Ícone só quando ajuda a entender.** Serviços podem ser uma lista bem tipografada.
- **Texto simples, como o dono falaria.** Frase curta, verbo direto. "A gente busca a carga e entrega no combinado" é melhor que "Soluções logísticas integradas". O texto fica no nicho, nunca no modelo.

## Como trabalhar

1. **Plano antes do código.** Escreva no PR: a ideia em uma frase, 4 a 6 cores em hex, as fontes e o layout em ASCII, para celular e computador.
2. **Revise o plano.** Se alguma parte for o que você faria para qualquer site parecido, troque e diga o que mudou.
3. **Construa e veja.** Tire prints em 375px e 1280px com os exemplos em `exemplos/prototipos/`, inclusive o mínimo, e anexe ao PR.
4. **Critique.** Passe a lista de vícios acima. Se a primeira impressão for "foi feito por IA", refaça. Antes de entregar, tire um enfeite.
5. **Compare com os outros modelos.** Lado a lado, precisam parecer de empresas diferentes. Se parecerem o mesmo site com outra cor, não está pronto.

## O que nunca muda

As regras do `AGENTS.md` valem acima de qualquer escolha visual: não inventar fatos, contraste AA, foco visível, sem rolagem lateral em 375px, fotos com licença gratuita confirmada e respeito a `prefers-reduced-motion`.
