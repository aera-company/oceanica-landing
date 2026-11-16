# HERO V4 · Notas do diretor

Data: 16/11/2026. Base: animatic da Rota A v3 e o corte alternativo com fim no FPSO (`../route-a-v3/`).

Preservados: o conceito "Maior do que se vê", a Rota A, o tratamento A2 (Engineering Revealed) e a headline "Esta é a parte visível.". A v3 não foi alterada.

**Nada aqui está liberado para publicação.** Todo o material vem de duas cópias do YouTube: o vídeo institucional (V1) e "Oceânica 47 anos" (V2).

**Sobre o fim:** a decisão anterior era terminar no Pão de Açúcar. O Prompt 03 a substitui: o final precisa ser offshore, e o Pão de Açúcar fica como referência arquivada.

---

## 1. A ideia da V4: a janela

A v3 punha informação sobre o vídeo. A V4 tira quase tudo e usa um único recurso de direção de arte: **cada plano real aparece por uma janela, recortada sobre fundo escuro.**

- **A janela é "a parte visível".** No começo ela é estreita e mostra só um detalhe: a garra.
- **Ela cresce a cada plano**, enquanto a operação se revela: pessoa, ROV, mar, embarcação.
- **No último plano ela se abre por inteiro** sobre a embarcação junto à unidade de produção. É a grande revelação.

O recurso resolve três problemas da v3 de uma vez:

1. **A interface some.** O espaço negativo faz o papel que os painéis faziam.
2. **Os dois filmes convivem.** A diferença de qualidade entre V1 e V2 pesa menos dentro da janela do que em tela cheia.
3. **A escala vira gesto visual**, e não um número. O quadro cresce de 600 × 820 px para 1920 × 740 px.

**Por que é honesto:** no desktop, nenhum plano é ampliado (tudo em 1:1) e nenhum é deslocado. Na revelação, o plano 74 fica parado no lugar e só se descobre mais do mesmo quadro. Nenhuma passagem simula um movimento de câmera entre fontes diferentes.

---

## 2. O que saiu da v3

Cerca de 90% dos elementos gráficos saíram:

- carimbo técnico;
- régua de níveis;
- chamadas com linhas;
- moldura da folha;
- navegação completa;
- folha 02 com números.

**O que ficou:**

- **O logo**, pequeno, no alto à esquerda.
- **A headline**, em dois momentos.
- **Um indicador de rolagem** nos dois primeiros segundos.
- **Uma assinatura editorial** no fim: "Oceânica · Engenharia offshore e subsea · desde 1978". Os dados vêm do site, já usados na v3.
- **A nota de estudo e não liberação**, quase invisível. Não é interface: é uma condição de uso e precisa estar lá enquanto o material não for liberado.

Os números (frota, ROVs, pessoas) **saem da hero.** Eles têm divergências entre o site e o RI, e a hero não precisa deles para comunicar escala. Voltam no capítulo seguinte da página, com fonte.

---

## 3. Tipografia

Os três estudos foram feitos sobre quadros reais: `type-studies/typography-studies.jpg`, com as fontes em `type-studies/A1.png` … `Cm2.png`.

| Estudo | Execução | Leitura |
|---|---|---|
| A · Monumental editorial | Archivo expandida, caixa alta, 220 px, cruzando a janela | Forte, mas compete com a imagem. Lembra pôster de evento |
| B · Cinematic minimal | Instrument Serif, 64 px, ao lado da janela | Elegante e discreta. Em tela grande, a frase some |
| **C · Spatial type** | Instrument Serif, 250 px, **atrás da janela**. A imagem fica entre as palavras: "a parte [imagem] visível." | **Escolhida.** A frase e a imagem formam uma só composição, e a oclusão dá profundidade sem efeito nenhum |

**Como a frase é dividida:**

- **"Esta é"** entra aos 1,2 s, sobre a garra. Tem fade de 0,6 s e a letra "é" fica parcialmente atrás da janela.
- **"a parte"** entra junto com o corte para o braço (3,67 s), e **"visível."** 0,35 s depois.

A divisão fortalece a narrativa. A primeira imagem chega sozinha, a frase se completa sobre o segundo detalhe, e a headline sai no corte para o piloto (6,3 s). Dali em diante a imagem fala sozinha.

**O que foi evitado:** título preso ao canto, caixa alta condensada, animação de letras, texto em todos os cortes.

**As fontes são provisórias**, gratuitas do Google Fonts. A família final depende do manual de marca da Oceânica, que ainda não temos.

---

## 4. Montagem

Arquivo principal: `animatic-v4.mp4` (26,24 s, 1920 × 1080, 23,976 qps). Os tempos estão em `animatic-v4.json`.

| # | Tempo | Plano | Origem | Janela (px) | Movimento | Função | Entrada e saída |
|---|---|---|---|---|---|---|---|
| **Movimento 01 · The Detail** | | | | | | | |
| 1 | 0 – 3,67 | Garra do manipulador | V2 1:29,8 | 600 × 820 fixa | A garra gira devagar; câmera quase parada | Primeiro quadro: matéria, peso, um objeto que ainda não se reconhece | Abre já em movimento. Sai no corte para outro detalhe da mesma máquina |
| 2 | 3,67 – 6,30 | Braço do manipulador | V2 1:26,0 | 600 × 820 fixa | Articulação em movimento | A frase se completa. Mesma janela: é o mesmo objeto visto de outro ponto | Corte seco, com a tipografia mudando junto |
| **Movimento 02 · The Human and the Machine** | | | | | | | |
| 3 | 6,30 – 8,89 | Piloto com o controle | V2 1:27,3 | 900 × 760 → 1000 × 790 | O piloto olha para cima | A pessoa por trás do detalhe. A janela muda de forma pela primeira vez | O olhar para cima motiva o corte para o ROV suspenso |
| 4 | 8,89 – 11,14 | ROV no LARS | V1 2:21,6 | 1080 × 800 → 1160 × 830 | O ROV balança no guindaste | A máquina inteira | O ROV desce: o corte vai para a água |
| 5 | 11,14 – 14,94 | ROV entra na água | V1 1:26,4 | 1220 × 850 → 1330 × 890 | Descida, espuma | Abaixo da linha d'água. É o plano mais longo do movimento: o respiro antes da escala | O ROV some; o corte vai para a superfície e para a embarcação |
| **Movimento 03 · The Bigger Picture** | | | | | | | |
| 6 | 14,94 – 18,64 | Oceanicasub V junto à unidade | V1 1:34,5 | 1420 × 900 → 1500 × 920 | Deriva aérea lenta | A operação: casco verde, nome do navio, unidade ao fundo | Corte para a janela pequena: a contração antes da abertura |
| 7 | 18,64 – 26,24 | **Embarcação diante da unidade de produção (Big Reveal)** | V1 3:00,3 (plano 74) | 520 × 420 parada 1 s → abre em 3,2 s até 1920 × 740 | Câmera aérea acompanha a embarcação | A grande revelação. A embarcação, antes o assunto, fica pequena diante da unidade | Assinatura aos 23,2 s; o filme termina com o plano ainda em movimento |

**Ritmo:**

- O Movimento 01 é lento: 2 planos em 6,3 s.
- O Movimento 02 acelera: 3 planos em 8,6 s, com cortes motivados por direção (olhar para cima, ROV descendo).
- O Movimento 03 respira: 2 planos em 11,3 s.

**O que foi eliminado da v3:**

- **Câmera lenta com quadros misturados.** Todos os planos rodam na velocidade original. Os do V2 (25 qps) passam a 23,976 qps quadro a quadro, ficando 4% mais lentos, sem fantasma.
- **Congelamentos.** A v3 parava 2,6 s no fim. A V4 termina com o plano em movimento.
- **Repetição de casco verde em planos seguidos.**
- **Dois planos dourados em sequência.**

**Duplicações que permanecem:** existem quadros duplicados nos próprios arquivos do YouTube (12 no plano 74, 2 a 3 nos macros). Não foram criados aqui e somem com os originais.

---

## 5. Big Reveal

Arquivos:

- `big-reveal/big-reveal.mp4`, de 14,9 s até o fim;
- `big-reveal/big-reveal-board.jpg`;
- `big-reveal/big-reveal-mobile-board.jpg`.

**O mecanismo** é o primeiro dos quatro caminhos do prompt: um objeto inicialmente grande fica pequeno diante da operação completa.

1. O plano 6 termina com a maior janela até então (1500 × 920), sobre a Oceanicasub V.
2. O corte leva a uma janela pequena (520 × 420) que mostra só uma embarcação verde. Parece mais um plano de navio.
3. Depois de 1 s, a janela se abre em 3,2 s (ease in-out) até 1920 × 740.
4. Aparecem a unidade de produção, a estrutura e o mar. A embarcação vira uma parte pequena da imagem.

**No desktop é um recorte que se abre sobre o plano parado no lugar.** A imagem não é ampliada nem deslocada.

**No mobile**, a janela se abre e o quadro também é reduzido, de 0,8 para 0,667 da escala original. É uma redução de escala do mesmo plano, declarada aqui, sem ampliação.

**Por que é uma faixa de 2,6:1:** o plano 74 tem o letreiro "Prêmio melhores fornecedores Petrobras 2018" na parte de baixo, a partir de 1,5 s. A faixa usada vai até a linha 740 e deixa o letreiro de fora. Com o bruto, sem letreiro, a abertura pode continuar até a tela cheia.

---

## 6. Os dois finais

Arquivos em `ending-comparison/`:

- `ending-comparison.jpg`;
- `final-a-authentic.mp4`;
- `final-b-monumental.mp4`;
- os filmes completos `../route-a-v4/animatic-v4-final-a.mp4` e `animatic-v4-mobile-final-a.mp4`.

Os dois usam o mesmo plano real, o 74: o mais aberto que existe com embarcação e unidade de produção juntas. O Pão de Açúcar ficou arquivado, como pedido.

| | Final A · Authentic Offshore | Final B · Monumental Expansion |
|---|---|---|
| Como é | Corte seco do plano 6 para o plano 74 inteiro, em 2,6:1 | Corte para uma janela fechada na embarcação, que se abre sobre o plano 74 |
| Escala | Alta: a unidade domina o quadro | **Mais alta na percepção.** A embarcação foi vista grande antes de ficar pequena |
| Clareza | Imediata | Imediata depois da abertura. O primeiro segundo pode parecer "mais um navio" |
| Impacto | Bom; o corte é um salto de escala | **Maior.** É o único momento do filme em que a forma muda diante do visitante |
| Continuidade | Nenhum risco | Nenhum risco: é o mesmo plano, sem movimento simulado |
| Qualidade visual | Limitada pela compressão do V1, inteira na tela | Igual. A janela pequena esconde a compressão no começo |
| Viabilidade | Pronta com o bruto | Pronta com o bruto. No scroll, é a abertura controlada pela rolagem (ver o blueprint) |
| Duração | 25,0 s | 26,2 s |

**Decidido por Tiago em 16/11/2026: o Final B segue para a Oceânica.** O Final A fica arquivado como alternativa.

**Recomendação: o Final B.** Ele é o Big Reveal pedido e continua sendo um registro real, sem composição sintética. O Final A é a alternativa segura, se a empresa preferir um corte sem recurso gráfico.

**Atenção:** o costado da unidade mostra "PETROBRAS 5…". Usar este plano em público exige autorização da Oceânica e do cliente. A Oceânica deve indicar se pode ser usado ou se precisa de outro plano de campo.

---

## 7. Cor

Arquivo: `grade-study/color-grading-study.jpg`, com original, grade da v3 e grade da V4 lado a lado. A definição está em `grade.sh`.

**O problema.** O V1 vem com cor de fábrica: azul elétrico, verde neon e sombras esmagadas. O V2 tem luz natural, com dourado. O grade da v3 tirava quase todo o azul (−88%) e deixava a água cinza, sem natureza.

**O que a V4 faz:**

| Fonte | Ajuste | Por quê |
|---|---|---|
| V1 | Azul e ciano −55%; verde −35%; leve aquecimento (5800 K, 40%); contraste 0,9; gama 1,07 | Tira o azul elétrico e o verde neon, devolve detalhe às sombras, aproxima o V1 do V2 |
| V2 | Leve esfriamento (7200 K, 40%); saturação 0,95 | Tira o excesso de dourado sem perder a luz natural |
| Os dois | Curva suave: pretos em 3%, brancos em 97% | Uma assinatura comum, sem vinheta, brilho artificial ou nitidez adicional |

**Preservados:**

- o verde da Oceânica (o do V2 intacto; o do V1 sem o neon);
- o amarelo do ROV;
- o laranja dos uniformes;
- a pele;
- a água azul, agora natural e não cinza.

**O que fica diferente, de propósito:** o V1 ainda é mais azul e mais comprimido que o V2. Igualar tudo deixaria a imagem artificial, como o prompt pede para evitar. A diferença restante some com os originais.

---

## 8. Quality gate

| # | Pergunta | Resposta |
|---|---|---|
| 1 | O primeiro frame é memorável? | **Em parte.** A garra numa fenda vertical sobre fundo escuro é distinta e editorial. O fundo claro do macro deixa a janela com pouco contraste; um macro com fundo mais escuro seria melhor, e esse é um plano a captar |
| 2 | A Oceânica é reconhecível? | Sim: logo, nome nos ROVs (planos 4 e 5), casco verde e nome do navio (6), verde da frota (7) |
| 3 | A imagem tem mais protagonismo que a interface? | Sim. Fora a headline, a interface ocupa menos de 2% da tela |
| 4 | A tipografia parece parte de um filme premium? | Sim, com o estudo C. A fonte ainda é provisória |
| 5 | A montagem comunica engenharia? | Sim: manipulador, piloto, LARS, lançamento, operação |
| 6 | Existe uma revelação visual clara? | Sim, no Final B: a janela se abre sobre a unidade |
| 7 | O final tem escala maior que o começo? | Sim: de um detalhe de 600 px para embarcação e unidade de produção em 1920 px |
| 8 | O tratamento de cor é consistente? | Bem mais que na v3. Ainda há diferença entre V1 e V2, por qualidade de origem |
| 9 | O ritmo funciona sem áudio? | Sim. Os cortes são motivados por direção e forma, não por batida |
| 10 | Dá para adaptar ao scroll? | Sim. A janela é um parâmetro contínuo, fácil de amarrar à rolagem (ver o blueprint) |
| 11 | O mobile tem força própria? | **Em parte.** Tem composição própria (janela vertical, frase empilhada, faixa final 720 × 493), mas o final no mobile é menor que no desktop. Precisa de um plano offshore vertical ou de 4K |
| 12 | A V4 é significativamente melhor que a V3? | **Sim, como direção.** Ver abaixo |

**Por que a resposta 12 é sim:** a v3 parecia apresentação institucional, e a V4 parece filme de marca.

- A interface caiu cerca de 90%.
- A tipografia virou composição.
- Existe um momento de revelação.
- O final é offshore e maior que o começo.
- A câmera lenta com fantasma e o congelamento saíram.

**O que ainda impede aprovar como peça final:**

1. A qualidade de imagem do V1 (YouTube, cor de fábrica).
2. O plano 74 com o nome do cliente e com letreiro embaixo.
3. As fontes provisórias.
4. O primeiro quadro com pouco contraste.
5. O final mobile menor.

Nenhum desses pontos se resolve com montagem. Todos dependem dos brutos ou de captação.

---

## 9. Limitações declaradas

1. **Material:** cópias do YouTube de dois filmes. Não liberado, sem os brutos, com compressão.
2. **Plano 74:** usado só até a linha 740, para deixar o letreiro de fora; mostra o nome do cliente.
3. **V2 a 23,976 qps:** 4% mais lento que o original.
4. **Mobile:** a janela usa redução de escala (no máximo 0,8 do original). Nenhuma ampliação.
5. **Quadros duplicados** vêm dos arquivos de origem.
6. **Sem áudio**, sem trilha.
7. **Fontes:** Instrument Serif e Archivo, provisórias.
8. **Nenhuma imagem gerada** e nenhum crédito pago usado.

---

## 10. O que pedir à Oceânica para a V4 virar peça final

1. **O bruto do plano 74** (V1, 3:00–3:08), sem letreiro, com a autorização do cliente; ou outro plano aéreo aberto de embarcação junto a unidade.
2. **Os brutos dos planos 1–6** (já listados na shot list consolidada).
3. **Um macro de manipulador ou garra com fundo escuro**, para o primeiro quadro.
4. **O manual de marca**, para a família tipográfica final.

---

## 11. Arquivos

| Entregável | Arquivo |
|---|---|
| 01 Animatic V4 | `animatic-v4.mp4` (Final B) · `animatic-v4-final-a.mp4` |
| 02 Animatic V4 mobile | `animatic-v4-mobile.mp4` (Final B) · `animatic-v4-mobile-final-a.mp4` |
| 03 Estudos tipográficos | `type-studies/typography-studies.jpg`, `type-studies/*.png`, `type-studies/type.html` |
| 04 Big Reveal | `big-reveal/` |
| 05 Comparação dos finais | `ending-comparison/` |
| 06 Estudo de cor | `grade-study/color-grading-study.jpg`, `grade.sh` |
| 07 Notas do diretor | este arquivo |
| 08 Blueprint de scroll | `SCROLL_BLUEPRINT.md` |
| Apresentação | `index.html` |
| Quadros | `frames/desktop-sequence.jpg`, `frames/mobile-sequence.jpg`, `frames/1-8.jpg`, `frames/m1-m8.jpg` |
| Para refazer | `compose.py` (`python3 compose.py d B saída.mp4`), `layers.html`, `layers/` |

O clipe `../../references/institutional-video/clips/s74-vessel-platform-wide-TEXT.mp4` foi recortado do vídeo institucional (3:00,30 a 3:08,05). O letreiro faz parte do arquivo, e o recorte usado fica acima dele.
