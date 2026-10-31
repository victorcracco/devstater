# Nicho: oficinas (`oficinas`)

**CNAE:** 4520001 (mecânica), 4520002 (funilaria e pintura), 4520003 (elétrica), 4520004 (alinhamento e balanceamento), 4520006 (borracharia). MEI entra neste nicho.

**Tom:** direto e confiável, como o dono falando. Muitas são pequenas: o modelo Cartão costuma ser o certo.

## `montarSite`

Monte os textos e serviços pelo CNAE, como `transportadoras.ts` faz com a função `perfil`:

| CNAE | `icone` | Serviços genéricos |
|---|---|---|
| 4520001 | `ferramenta` | Revisão, freios, suspensão, motor |
| 4520002 | `pintura` | Funilaria, pintura, reparo de batidas |
| 4520003 | `engrenagem` | Parte elétrica, bateria, alternador e partida |
| 4520004 | `velocimetro` | Alinhamento, balanceamento, geometria |
| 4520006 | `carro` | Troca e conserto de pneus, calibragem |

Foto: oficina organizada, ferramentas, carro no elevador. Sem logos de montadora nem placas legíveis.

## `conversao`

- `acao`: "Pedir orçamento".
- Campos: **Nome**, **Carro (modelo e ano)**, **O que está acontecendo**.
- Passos: contar o problema, receber a avaliação, combinar o serviço.

## Regras de publicidade

Não há conselho profissional: vale o Código de Defesa do Consumidor.

- **Não diga:** "autorizada", "especialista em {marca}", "menor preço da região", "garantia de X meses", "atendimento 24h" ou "guincho", porque não sabemos.
- Sem logos de marcas de carro, de peças ou de seguradoras.

## Pipeline

Já configurado: "uma oficina", "clientes".
