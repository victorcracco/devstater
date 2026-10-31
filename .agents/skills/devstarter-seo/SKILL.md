---
name: devstarter-seo
description: SEO local para os sites que a DevStarter entrega a pequenas empresas brasileiras. Use ao preparar um site de cliente para publicação, ao criar títulos, metadados ou dados estruturados, ou ao revisar a estrutura de um modelo. Lembra que protótipos nunca são indexados.
---

# SEO nos sites da DevStarter

Para detalhes, use as skills `seo-local`, `seo-schema` e `seo-page`. Elas citam comandos com `CLAUDE_PLUGIN_ROOT`, que não existem aqui: ignore esses comandos e siga o restante.

## Protótipo não é site de cliente

Os protótipos em `/p/[slug]` são **sempre** `noindex`: têm dados de prospects e textos ilustrativos. Não adicione a eles metadados de busca, dados estruturados nem entrada no sitemap.

O que vale nos modelos é a estrutura, para o site já nascer pronto quando o cliente fechar: um único `h1`, hierarquia de títulos sem pular níveis, HTML semântico, `alt` descritivo, fotos otimizadas e carregamento rápido no celular.

## Ao publicar o site de um cliente

**Antes de publicar, troque o texto ilustrativo por informação real.** SEO em cima de texto genérico não funciona, e fatos inventados são um risco para o cliente.

- **Título:** `{Serviço principal} em {Cidade} | {Empresa}`, com até 60 caracteres e diferente em cada página.
- **Descrição:** até 160 caracteres, sem repetir o título e dizendo o que a pessoa encontra.
- **Nome, endereço e telefone** iguais, letra por letra, no site, no Google Business Profile e nos diretórios.
- **Google Business Profile** é a maior alavanca do negócio local: categoria certa, horários, fotos reais e avaliações. Ajude o cliente a configurar, mas nunca crie avaliações.
- **Uma página por serviço real**, com texto próprio. Não crie páginas de cidade em série, com o mesmo texto trocando o nome: o Google trata isso como spam.
- **Técnica:** HTTPS, `robots.txt`, `sitemap.xml`, URL canônica, redirecionamento único entre `www` e sem `www`, mapa com carregamento leve.

## Dados estruturados

JSON-LD só com **dados reais e visíveis na página**.

| Nicho | Tipo do Schema.org |
|---|---|
| Transportadoras | `LocalBusiness`; `MovingCompany` para mudanças |
| Clínicas médicas | `MedicalClinic` ou `Physician` |
| Odontologia | `Dentist` |
| Psicologia | `MedicalBusiness` |
| Estética | `HealthAndBeautyBusiness` |
| Oficinas | `AutoRepair` |
| Imobiliárias | `RealEstateAgent` |

**Nunca use** `aggregateRating` ou `review` sem avaliações reais publicadas no próprio site, nem horários ou preços que o cliente não confirmou.

## Nichos de saúde

O Google é mais exigente com conteúdo de saúde. Mostre quem é o responsável, com nome e registro no conselho (CRM, CRO, CRP), e não publique texto sobre doenças ou tratamentos sem revisão do profissional. As regras de publicidade em `docs/codex/nichos/` valem também para títulos e descrições.
