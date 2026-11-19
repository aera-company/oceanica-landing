# Fontes e lista de corte

Data: 17/11/2026.

## Arquivos localizados no workspace

| Item pedido | Onde está | Observação |
|---|---|---|
| Último motion aprovado | `04_creative/hero-reset/animatic-v2-directors-cut/` | Quatro versões (fechamento A e B, EN e PT). **Usei o fechamento A** como base; ver nota abaixo |
| Vídeo institucional | `videos/YTDown.com_YouTube_Media_qzGU8XxzSTI_…_1080p.mp4` | 3:54, 1920 × 1080, 23,976 qps. SHA-256 começa em `8ae2314f7f55cecc` |
| Vídeo "47 anos" | `videos/YTDown.com_YouTube_Media_ao00-ruSDWY_…_1080p.mp4` | 1:44, 1920 × 1080 com faixas pretas, 25 qps. SHA-256 começa em `647db2f7f9ab0782` |
| Master Creative Brief | `OCEANICA_MASTER_CREATIVE_BRIEF.md` | Na raiz |
| Pesquisa | `01_RESEARCH.md` | Na raiz |
| Inventário de assets | `02_ASSET_INVENTORY.md` | Na raiz. As fotografias que ele lista não estão neste workspace |
| Estudos criativos | `04_creative/hero-reset/` | Key visuals, edição por pilar, headlines, story arc, dois animatics |
| Estrutura OCEANICA_FLAGSHIP_RESET | Raiz | Só existem `04_creative/`, `videos/` e, agora, `08_hero-production/`. As demais pastas numeradas não existem |
| Logotipo | `logo-oceanica.png` | 211 × 41 px. Não há vetor |

Os dois vídeos são cópias do YouTube. Foram lidos, nunca alterados.

**Sobre o fechamento.** O Prompt 04 aprova "o último motion" sem dizer qual dos dois fechamentos. Segui o A (embarcação junto à unidade de produção), porque o prompt pede "encerramento institucional offshore" e era a minha recomendação. Trocar para o B exige mudar uma linha em `cut.sh` e reexportar.

## Lista de corte

V1 = vídeo institucional · V2 = "47 anos". Tempos de saída em `timeline.json`.

| # | Cena | Plano | Fonte | Entrada | Duração na fonte | No filme |
|---|---|---|---|---|---|---|
| 01a | Embarcação | Proa de frente | V2, plano 14 | 0:57.32 | 2,08 s | 0,00 – 2,17 |
| 01b | Embarcação | Oceanicasub IX em três quartos | V2, plano 2 | 0:04.96 | 3,00 s | 2,17 – 5,30 |
| 02 | ROV entrando na água | ROV Work Class atravessa a superfície | V1, plano 32 | 1:26.10 | 4,15 s | 5,30 – 9,51 |
| 03a | ROV submarino | ROV na coluna d'água, faróis acesos | V1, plano 23 | 0:57.35 | 3,20 s | 9,51 – 12,76 |
| 03b | Mergulhador | Mergulhador de capacete | V2, plano 21 | 1:15.05 | 2,20 s | 12,76 – 15,06 |
| 04 | Encerramento | Oceanicasub V junto à unidade de produção | V1, plano 34 | 1:34.35 | 4,60 s | 15,06 – 19,73 |

Duração total: 19,73 s.

## O que mudou em relação ao corte aprovado

- **Montagem:** a mesma. A única alteração de tempo foi tirar 0,4 s do início do ROV submarino (era 3,6 s), para o mergulhador ocupar uma parte maior da cena 03. O plano do mergulhador não tem mais quadros para dar.
- **Velocidade:** real em todos os planos. Os do V2 passam de 25 para 23,976 qps exibindo cada quadro uma vez, sem mistura.
- **Áudio:** nenhuma trilha em nenhum arquivo exportado.
- **Texto:** saiu de dentro do vídeo. Nas versões web os títulos são HTML. Os masters `_titled_` existem só para revisão fora do site.

## Tratamento por plano

| Plano | Tratamento | Motivo |
|---|---|---|
| 01a, 01b | Saturação +2%, contraste +3% | O V2 já tem a luz certa. O verde do casco fica como está |
| 02 | Vinheta compensada, saturação −26%, meios-tons um pouco mais claros | O V1 vem com cor saturada e bordas escurecidas embutidas |
| 03a | Vinheta compensada de leve, saturação −20%, contraste +14%, nitidez moderada | Dar definição ao ROV sem inventar detalhe. A compensação é fraca porque os cantos têm blocos de compressão |
| 03b | Sombras levadas do ciano para o azul, contraste +8%, nitidez leve | Mais presença ao mergulhador; o ciano estourado da fonte deixa de dominar |
| 04 | Vinheta compensada, saturação −26%, meios-tons mais claros (gama 1,12) | O plano é escuro; os pretos da unidade estavam fechados |

Nenhum zoom, nenhuma desaceleração, nenhuma interpolação, nenhuma imagem gerada.
