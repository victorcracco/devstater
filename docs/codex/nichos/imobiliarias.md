# Nicho: imobiliárias e corretores (`imobiliarias`)

**CNAE:** 6821801 (corretagem na compra, venda e avaliação), 6821802 (corretagem no aluguel), 6822600 (gestão e administração de imóveis).

**Tom:** confiável e local. O diferencial é conhecer a cidade.

## `montarSite`

- `icone`: `casa` ou `chave`. Foto: fachada ou rua residencial sem número legível, ou interior vazio.
- Serviços pelo CNAE: "Compra e venda", "Avaliação de imóveis", "Aluguel", "Administração de imóveis".
- **Não invente imóveis.** Não crie anúncios com preço, endereço ou quantidade de imóveis. Se o layout tiver vitrine, use tipos genéricos ("Casas", "Apartamentos", "Terrenos", "Salas comerciais"), sem números.
- `contato.registro`: `"CRECI a informar"`, **sempre visível, perto do nome**.

## `conversao`

- `acao`: "Falar com um corretor".
- Campos: **Nome**, **Procura comprar, alugar ou anunciar?**, **Cidade ou bairro de interesse**.
- Passos: contar o que procura, receber opções, agendar a visita.
- `nomesModelos`: `{ orcamento: "Contato" }`.

## Regras de publicidade

Fontes: Lei 6.530/78 e [Resolução COFECI 1.065/2007](https://www.legisweb.com.br/legislacao/?id=106183), com o [manual de divulgação do CRECI-SP](https://new.crecisp.gov.br/Media/Requerimentos/MANUAL%20DE%20DIVULGA%C3%87%C3%83O-REV00-20230721041255.pdf). Confirme no texto oficial.

- **Obrigatório em todo anúncio:** o número de inscrição no CRECI. Pessoa física usa "Corretor de Imóveis" com o número e a letra F; pessoa jurídica, com a letra J.
- O manual do CRECI-SP pede que o registro não seja menor que 25% do tamanho do nome. Por isso ele fica junto do nome e em tamanho legível.
- **Não diga:** "rentabilidade garantida", "valorização certa", "o melhor preço".

## Pipeline

Já configurado: "uma imobiliária", "interessados em imóveis".
