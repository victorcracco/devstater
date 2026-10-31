---
name: devstarter-qa-visual
description: Testa os protótipos da DevStarter no navegador, em celular e computador, e aponta rolagem lateral, texto cortado, dado faltando, contraste ruim e foto proibida. Use antes de entregar ou aprovar qualquer modelo visual ou nicho, ou depois de mudar algo em app/(prototipos) ou lib/prototipos.
---

# Teste visual dos protótipos

O script acha os defeitos mecânicos, mas não diz se a página está boa. Faça as duas partes: rode o script e olhe as imagens.

## 1. Prepare

Use só empresas fictícias. **Os prints vão para um repositório público:** nunca abra nem fotografe o protótipo de uma empresa real.

Com o `.env.local` indicado no `AGENTS.md`, inicie o servidor e abra qualquer página de `http://localhost:3000`. Se o `.env.local` já existia, não o sobrescreva. Reinicie o servidor sempre que ele mudar.

## 2. Escolha o que testar

| O que mudou | Exemplos | Modelos |
|---|---|---|
| Nicho novo | os dois do nicho | todos |
| Modelo novo | o completo e o mínimo de cada nicho | o novo |
| Correção em modelo existente | todos | o corrigido |

## 3. Rode a auditoria

Ajuste as três listas no topo de `scripts/auditar.js` e rode o arquivo inteiro com a ferramenta de JavaScript do navegador. O resultado é uma Promise, então a ferramenta precisa esperá-la. Se o seu navegador não executa JavaScript, diga no PR que esta etapa não foi feita.

| Tipo | O que significa | O que fazer |
|---|---|---|
| `rolagem-lateral`, `fora-da-tela` | a página fica mais larga que a tela | corrigir |
| `texto-cortado` | nome ou e-mail cortado com "..." ou fora da tela | corrigir, salvo nome muito longo num menu |
| `texto-vazando` | o texto passa da caixa | corrigir |
| `texto-quebrado` | apareceu `undefined`, `null` ou texto de preenchimento | corrigir |
| `coberto-pela-faixa` | a faixa do topo cobre o título | corrigir |
| `foto-proibida`, `foto-quebrada`, `sem-alt` | foto premium, que não carregou ou sem `alt` | corrigir |
| `link-vazio`, `ancora-quebrada` | botão que não leva a lugar nenhum | corrigir |
| `campo-sem-rotulo`, `campo-sensivel` | formulário sem rótulo ou pedindo dado sensível | corrigir |
| `titulo-principal` | a página não tem exatamente um `h1` | corrigir |
| `http`, `sem-noindex` | a página não abriu ou pode ser indexada | corrigir |
| `contraste` | abaixo de AA: 4,5 em texto normal e 3 em texto grande | conferir na imagem e corrigir |
| `alvo-pequeno` | botão ou link com menos de 36px no celular | corrigir nos principais; explicar os outros |

O script não julga contraste de texto sobre foto ou degradê: olhe esses na imagem. Depois da auditoria, leia o console do navegador e corrija os erros que vierem do site.

Modelos não podem ter texto de nicho:

```bash
git grep -niE "carga|frete|caminh|paciente|consulta|imóve|oficina" -- "app/(prototipos)/p/[slug]/modelos"
```

## 4. Olhe as imagens

Tire prints em 375px e 1280px: a primeira tela e a página inteira. O script não vê estes pontos:

- **Primeira tela no celular:** dá para saber de quem é o site, o que a empresa faz e como falar com ela, sem rolar?
- **Faixa do topo:** os botões de versão estão legíveis e dá para perceber que são clicáveis?
- **Nome longo:** a quebra de linha ficou natural? O menu e os botões continuam no lugar?
- **Dados faltando:** sobrou título sem conteúdo, seção vazia ou separador solto?
- **Fotos:** carregaram? Aparece marca, placa ou pessoa que não devia? O texto sobre a foto dá para ler?
- **Modelo novo:** passe a lista de vícios da skill `devstarter-design`.

## 5. Teste com as mãos

- **Teclado:** clique na página e aperte Tab várias vezes. O foco precisa aparecer em cada botão e link.
- **Seletor:** cada botão precisa trocar de modelo, mantendo a empresa.
- **Formulário:** preencha e envie. A mensagem precisa abrir com os dados digitados. Feche o WhatsApp ou o e-mail sem mandar nada.
- **Sem WhatsApp:** no exemplo mínimo, nenhum botão pode levar a um WhatsApp vazio.

## 6. Relate

No PR ou na revisão, informe:

1. O resultado da auditoria: páginas testadas, páginas limpas e os tipos encontrados.
2. O que foi corrigido e o que ficou, com o motivo.
3. Os prints em 375px e 1280px, se for um PR.
4. O que **não** foi testado. Nunca escreva "testado" sobre o que você não abriu.
