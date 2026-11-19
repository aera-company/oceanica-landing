# 01 · Reset summary

Data: 17/11/2026. Etapa: nova direção de arte da hero. Nada foi programado, publicado ou animado.

## O que foi entregue

| Arquivo | Conteúdo |
|---|---|
| `00_OVERVIEW_BOARD.jpg` | Os três key visuals lado a lado, desktop e mobile |
| `02_PILLAR_EDIT.md` + `pillar-frames/` | Os melhores takes dos dois vídeos, organizados pelos 5 pilares (34 quadros em resolução cheia) |
| `03_HERO_KEY_VISUALS.md` + `kv1/`, `kv2/`, `kv3/` | Três propostas da primeira tela, cada uma com still desktop, still mobile, plate, HTML e notas |
| `04_HEADLINE_EXPLORATION.md` | 10 headlines, 5 subheadlines, 3 tons de voz |
| `05_HERO_STORY_ARC.md` + `05_STORY_ARC_BOARD.jpg` | Jornada do motion pelos 5 pilares |
| `06_RECOMMENDATION.md` | Recomendação e quality gate |

## O que encontrei no workspace

O prompt descreve uma estrutura com pastas de brief, references, assets, research, creative, storyboard, motion, prototype e archive. **Ela não existe.** A pasta tem cinco documentos soltos, o logotipo e `videos/` com os dois filmes. Não movi nem renomeei nada: criei só `04_creative/hero-reset/`. Se quiser, organizo o resto na numeração que você definir.

As fotografias listadas em `02_ASSET_INVENTORY.md` (`fleet-x.webp`, `rov-launch.webp` e outras 10) **não estão neste workspace**; continuam em `../v06/creative/assets/`. Não as copiei. Do repositório antigo, li apenas as duas shot lists, para aproveitar os tempos dos planos. Todas as imagens desta etapa saíram dos dois vídeos em `videos/`.

## O que mudou em relação às versões anteriores

| Antes (Rota A, V3 e V4) | Agora |
|---|---|
| A hero nascia como sequência; o primeiro quadro era o começo de um recuo | A hero nasce como imagem parada. O motion vem depois e parte dela |
| Abertura na garra em macro, com carimbo, chamadas e "folha 02" | Uma imagem, um título, uma frase, um link. Nenhuma chamada sobre a imagem |
| Título "Esta é a parte visível." | Três títulos novos, um por KV. O conceito "Maior do que se vê" continua por baixo |
| Narrativa em sete degraus de escala | Narrativa nos 5 pilares, em uma descida e uma volta |
| Cor única (azuis para cinza) em tudo | Cada KV tem a luz do próprio material: dourado, branco, azul profundo |
| Uma família tipográfica de interface | Tipografia de título com caráter: serifa de cinema, grotesca pesada, itálico leve |

Usado como anti-referência: grade de takes, contadores, telemetria, radar, glitch, letreiros condensados em caixa alta, preto contínuo.

## Decisões desta etapa

1. **Só material real da Oceânica.** Nenhuma imagem gerada, nenhum banco de imagens, nenhuma composição de duas fotos. Cada still é um único quadro de vídeo com recorte, cor, nitidez e grão.
2. **Nenhum crédito gasto e nada enviado a serviço externo.** Higgsfield e Magnific estão conectados e não foram usados. O tratamento é local (`_shared/make_plates.py`).
3. **A ordem dos pilares mudou em um ponto:** Tecnologia vem antes de Engenharia. A justificativa está em `05_HERO_STORY_ARC.md`.
4. **Os números da frase de apoio** (18 embarcações, 55 ROVs, 2.378 pessoas, 3.000 m) vêm do release 1T26 e do site. Precisam de validação da Oceânica antes de qualquer uso.

## Limitações que valem para tudo

- **Nada está liberado.** Os dois vídeos são cópias do YouTube. Os stills servem para aprovar direção, não para publicar.
- **Resolução.** A fonte é 1080p comprimido. O KV1 e o KV3 usam o quadro inteiro; o KV2 é um recorte ampliado 1,5 vez e fica macio em tela grande.
- **Mergulhadores.** Existe um único take em qualidade aceitável: 2,3 s, no vídeo dos 47 anos, com o rosto do mergulhador identificável. Os sete takes do vídeo institucional têm compressão forte e cor estourada. Não há mergulho de saturação, sino em operação nem equipe de superfície do mergulho em qualidade. É a maior lacuna para o KV3 e para o ato 2.
- **Engenharia.** Nenhum take em qualidade alta. Só o vídeo institucional mostra ferramenta, içamento e equipe de planejamento.
- **Offshore.** Todo o material bom é costeiro (Baía de Guanabara). A única unidade de produção aparece no vídeo institucional.
- **Logotipo.** PNG de 211 × 41 px. Nas telas ele aparece ampliado; falta o vetor.
