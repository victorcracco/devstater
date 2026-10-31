# Novos modelos visuais

Um modelo é um site com visual próprio, que recebe `PropsModelo` (`site` e `dados`) e funciona para **qualquer nicho**. Não pode ser só uma troca de cor de um modelo existente: mude a estrutura, a tipografia e a forma de organizar as seções.

**Antes de tudo, leia a skill `devstarter-design`.** O objetivo é o site não parecer feito por IA, e os quatro modelos atuais ainda têm vários desses vícios: use-os como referência técnica, não visual. Abra um PR de rascunho só com o plano de design e espere a revisão antes de construir.

## Como criar

1. Crie o componente em `app/(prototipos)/p/[slug]/modelos/Modelo<Nome>.tsx`.
2. Registre em `modelos/index.ts` e em `lib/prototipos/modelos.ts`, com um nome curto, porque ele aparece no seletor do topo.
3. Leia tudo de `site` e `dados`. Nenhum texto de nicho no componente: nada de "carga", "paciente" ou "imóvel".
4. A foto vem de `site.hero.imagem` e `site.hero.imagemAlt`. Não fixe fotos no modelo.
5. Use `site.conversao` para a ação principal (`acao`, `mensagem`). Os links prontos estão em `linkContato`, `linkLigar` e `linkMapa`.
6. Mostre `contato.cnpj` e `contato.registro` no rodapé quando existirem. Em alguns nichos, o registro é obrigatório por lei.
7. A faixa da DevStarter é fixa no topo e já é tratada pela página. Se o modelo tiver menu fixo, posicione-o com `top-[112px] md:top-[72px]`, como o `Navbar` faz com `comFaixa`.

Os componentes são de servidor. Use `"use client"` só no que for interativo, como em `FormularioOrcamento.tsx`.

## Modelos pedidos

Crie um por PR, nesta ordem.

### `editorial`: elegante e sóbrio

Para escritórios, clínicas e imobiliárias que querem parecer tradicionais. Muito espaço em branco, títulos grandes, poucas cores, fotos em destaque e seções alternadas. Sem cartões com sombra e sem botões chamativos. Evite o "elegante de IA": creme, serifa e terracota, ou jeito de jornal com linhas finas.

### `acolhedor`: leve e próximo

Para saúde e bem-estar. Tons suaves, cantos arredondados, frases curtas e tipografia confortável, com contato sempre visível. Evite verde-hospital e fotos de procedimentos.

### `direto`: uma página, sem rolagem longa

Para pequenos negócios de bairro, como oficinas e salões. Topo com nome e botões grandes de ligar e WhatsApp, serviços em lista, endereço com mapa e fim. Precisa carregar rápido e ser usado com uma mão no celular.

### `vitrine`: serviços em primeiro plano

Para quem tem muitos serviços. Os serviços vêm logo no topo, como o conteúdo principal da página, com chamada para contato em cada um. Não faça a grade comum de cartões iguais com ícone: pense em lista grande, tabela ou índice.

## Antes de entregar

Teste com todos os exemplos em `exemplos/prototipos/`, inclusive o mínimo, no celular (375px) e no computador. O modelo precisa continuar bom com nome muito longo, sem foto carregada e sem WhatsApp.
