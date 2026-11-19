# Hero por scroll

Data: 17/11/2026. Endereço: `http://localhost:4173/`.

**Decisão de 17/11/2026: Tiago escolheu a versão por scroll para seguir adiante.** Ela passou a ser a página principal (`index.html`). A versão com autoplay foi preservada em `http://localhost:4173/autoplay.html`. As duas usam o mesmo filme, os mesmos títulos, a mesma navegação e o mesmo estudo da seção 02.

## O que muda para quem visita

- A primeira tela fica parada na proa de frente, com o título. Nada se move até a pessoa rolar.
- A rolagem conduz o filme: embarcação, ROV entrando na água, ROV submarino e mergulhador, encerramento. Rolar para cima volta o filme.
- As frases entram e saem nos mesmos pontos do filme. Os quatro traços no canto mostram a cena.
- Quando o filme acaba, a seção 02 sobe por cima da hero, como na outra versão.
- Nada é sequestrado: é o scroll normal da página, só mais longo (4,2 telas de filme no desktop, 3,4 no celular).

## O que veio da new-3d-landbase

Li, sem alterar nada, `src/components/sections/Hero.tsx`, `src/lib/hero.ts`, `CLAUDE.md`, `intelligence/pipeline.md`, `intelligence/reference/hero-frames.md` e `quality-checklist.md`.

| Da landbase | Aqui |
|---|---|
| Sequência de imagens pré-renderizadas em `<canvas>`, não WebGL | Igual: 168 quadros WebP no desktop, 144 no celular |
| Seção alta que cria a distância, palco fixo dentro | Igual: `.film-track` cria a distância; a hero fica fixa |
| Progresso 0→1, um desenho por quadro de tela (rAF), nada em estado de framework | Igual, em JavaScript puro |
| Desenho com cover-fit, densidade de pixel limitada a 2, scroll passivo | Igual |
| Lenis com `lerp 0.1` e `syncTouch false`, desligado em movimento reduzido | Igual. Copiei `lenis.min.js` 1.3.25 (licença MIT) da pasta da landbase para `web/vendor/` |
| Extração com ffmpeg em WebP, alvo de 40 quadros por 100vh e menos de 12 MB | Seguido: 168 quadros em 420vh; 11 MB em 1600 px, 8,8 MB em 1280 px, 5,3 MB no celular |
| Frases ligadas a frações do progresso | Igual: as três frases têm janela de entrada e saída |

## O que fiz diferente, e por quê

O estudo anterior daquele motor (`HUMAN-ANALYSIS.md`) listava oito lacunas. Fechei as oito:

| Lacuna do motor original | Aqui |
|---|---|
| Nada aparece até os 169 quadros carregarem; tela de loading | O poster aparece com a página. Os quadros carregam depois, sem tela de loading |
| Carrega em ordem, do primeiro ao último | Carrega do grosso para o fino (um a cada 16, depois 8, 4, 2, 1). Dá para rolar o filme inteiro logo no começo; ele vai ganhando fluidez |
| Sem controle de memória | Só os seis quadros seguintes são decodificados com antecedência |
| No celular, recorta e amplia 1,3 vez o quadro de desktop | Sequência própria 3:4, com recorte por plano, sem ampliar |
| Quadro que falha conta como carregado | Tenta de novo uma vez; se não vier, o quadro vizinho é desenhado |
| Sem alternativa de movimento reduzido para o canvas | Movimento reduzido e conexão lenta: poster parado, as três frases visíveis, sem distância extra de rolagem |
| Canvas realocado toda vez que a barra do iOS se move | Só quando a largura muda ou a altura muda mais de 120 px |
| `floor(p × TOTAL)` não batia com a fórmula documentada | Quadro N corresponde a `(N−1)/(TOTAL−1)` |

Também ficaram de fora, de propósito: cantos de HUD, leitura numérica decorativa, barra de progresso com rótulos, cards de vidro. São do repertório da landbase e estão na lista do que este projeto evita.

## Pesos

| | Quadros | Peso |
|---|---|---|
| Desktop largo (1600 × 900) | 168 | 11 MB |
| Desktop (1280 × 720) | 168 | 8,8 MB |
| Celular (720 × 960) | 144 | 5,3 MB |
| Lenis | — | 19 KB |

Cada visita baixa uma só das três sequências. Para comparar: a versão com autoplay baixa 10,0 / 4,8 / 3,5 MB de vídeo. **A versão por scroll pesa de 10% a 80% a mais**, e isso é da natureza do método.

## O que foi verificado

- No navegador embutido (Chromium), 1440 × 900: os 168 quadros carregaram, sem erro no console; ao rolar, as frases trocaram nos pontos certos, o filme chegou ao encerramento e a seção 02 subiu por cima da hero.
- 26 capturas em 10 tamanhos de tela (`screens-scroll/`), de 360 × 640 a 2560 × 1080: sequência certa em cada tamanho, frase certa em cada ponto, nenhuma rolagem horizontal.
- A biblioteca Lenis é carregada e reconhecida pela página.

## O que não foi verificado

- **A sensação da rolagem.** Não senti o scrub: conferi posições fixas, não o movimento. Fluidez, peso do Lenis e ritmo de cada cena precisam da sua mão no mouse e no trackpad.
- **Safari e iPhone real.** É onde este método mais costuma falhar (memória e engasgo), e o guia da landbase pede esse teste antes de aprovar.
- **Consumo de memória.** No pior caso, se o navegador mantiver tudo decodificado, a sequência de 1600 px ocupa perto de 1 GB. Limitei a decodificação antecipada, mas não medi.
- **Tempo até o filme ficar fluido** em rede real.

## Ressalvas de direção

1. **Cortes viram saltos.** O guia da landbase avisa: o método rende melhor com um plano contínuo, e "cortes secos viram saltos no scroll". O nosso filme tem cinco cortes. Aqui eles funcionam como troca de cena, mas não há a continuidade de um movimento só.
2. **Isto contraria uma decisão do Prompt 04,** que pedia reprodução natural e dizia que o vídeo não precisava estar ligado ao scroll. A escolha pela versão por scroll, em 17/11/2026, substitui aquela decisão.
3. **A primeira tela é uma imagem parada.** Ganha-se controle; perde-se o movimento da proa logo de cara, que a versão com autoplay tem.
4. **8,5 quadros por segundo de filme.** É o que cabe no orçamento de peso. Na água agitada do lançamento do ROV, o passo entre quadros é visível ao rolar devagar.
5. **A página fica mais longa:** 4,2 telas antes do conteúdo no desktop. Quem só quer chegar à informação rola mais.

## Arquivos

| Arquivo | Função |
|---|---|
| `web/index.html` | A página |
| `web/autoplay.html` | Alternativa com autoplay, preservada |
| `web/js/hero-scroll.js` | O motor |
| `web/css/hero-scroll.css` | Distância de rolagem e canvas |
| `web/media/seq/d1600`, `d1280`, `m720` | As três sequências |
| `web/vendor/lenis.min.js` | Scroll suave (MIT) |
| `documentation/capture-scroll.mjs`, `screens-scroll/` | Capturas |
| `design/hero-scroll-desktop-board.jpg`, `hero-scroll-mobile-board.jpg` | Pranchas |

Endereços de teste: `?p=0.56` fixa a rolagem em 56% do filme; `?nolenis` desliga o scroll suave; `?static` mostra a versão sem filme.
