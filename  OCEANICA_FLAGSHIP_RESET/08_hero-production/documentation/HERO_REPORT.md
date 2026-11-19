# Relatório da hero · desempenho, testes e limitações

> **Atualização de 17/11/2026:** depois deste relatório, a hero por scroll foi escolhida como versão principal. Este documento descreve a versão com autoplay, hoje em `web/autoplay.html`. Para a versão atual, ver `SCROLL_HERO.md`. Filme, títulos, composição, seção 02 e limitações de material valem para as duas.

Data: 17/11/2026. Ambiente: local, `http://localhost:4173`. Nada publicado.

## 1. O que foi entregue

| # | Entregável | Onde |
|---|---|---|
| 1 | Motion final refinado, sem áudio | `final-video/oceanica-hero_master_clean.mp4` (base) e `_master_titled_EN/PT.mp4` (para revisão) |
| 2 | Versão desktop para web | `final-video/oceanica-hero_web_1080.mp4` e `_web_720.mp4` |
| 3 | Versão mobile para web | `mobile/oceanica-hero_mobile_web_720x960.mp4` |
| 4 | Poster estático | `poster/` (desktop e mobile; AVIF, WebP, JPG) |
| 5 | Hero implementada | `web/` |
| 6 | Navegação institucional | Em `web/index.html` |
| 7 | Testes responsivos | `documentation/screens/` (32 capturas) |
| 8 | Estudo da transição para a seção 02 | Implementado abaixo da hero; pranchas em `design/section-02-transition-study_*.jpg` |
| 9 | Este relatório | `documentation/HERO_REPORT.md` |

## 2. Como a hero funciona

- **Vídeo:** autoplay, sem som, `playsinline`, sem controles, sem botão de volume, velocidade real. O arquivo não tem trilha de áudio.
- **Poster primeiro:** a imagem aparece com o HTML. O vídeo só começa a carregar depois do evento de carregamento da página, e entra por cima do poster quando já está tocando. O poster é o primeiro quadro exato do filme, então a troca não se vê.
- **Títulos em HTML,** sincronizados com o tempo do vídeo. São texto de verdade: nítidos em qualquer tela, lidos por leitor de tela, trocam de idioma sem outro arquivo de vídeo.
- **Loop:** no fim, o último quadro dissolve em 0,9 s para o poster e o filme recomeça por baixo. Não há corte seco nem tela preta, e o arquivo não foi alterado para isso.
- **Rolagem livre:** nada é sequestrado. A hero fica fixa atrás e a seção 02 sobe por cima dela, enquanto a imagem escurece de leve. O visitante pode rolar no primeiro instante.
- **Pausa** quando a hero sai da tela ou a aba fica oculta.
- **Escolha do arquivo:** retrato recebe o recorte 3:4; telas com mais de 1.500 px físicos de largura recebem 1080p; as demais, 720p.
- **Sem vídeo** em três casos: `prefers-reduced-motion`, economia de dados ou conexão 2G, e erro de carregamento. Nesses casos fica o poster com as três frases visíveis ao mesmo tempo.
- **Idiomas:** PT (padrão) e EN, pelo seletor ou por `?lang=en`.
- **Indicador do filme:** quatro traços finos no canto inferior esquerdo, um por cena. É o único elemento de interface além da navegação e do aviso de rolagem.

## 3. Composição

**Desktop.** Vídeo em tela cheia. Título no canto inferior esquerdo, em três linhas, para terminar antes do casco. Navegação em uma linha: marca, cinco links, PT/EN.

**Mobile.** Composição própria: o vídeo 3:4 ocupa os 72% superiores da tela e o título fica embaixo, sobre fundo sólido da cor da água. Cada plano tem o seu recorte: proa centrada, Oceanicasub IX, ROV, mergulhador, embarcação do encerramento. Navegação: marca, PT/EN e Menu.

**Por que 3:4 e não vertical em tela cheia.** A fonte tem 1.080 linhas. Um recorte 9:16 teria 608 px de largura para uma tela de 1.170 px físicos: ampliação de 1,9 vez. O recorte 3:4 usa 810 × 1.080 px nativos. Ainda há ampliação em telefones de alta densidade (cerca de 1,6 vez), mas é o limite honesto do material. **A versão vertical em tela cheia não é viável com os arquivos atuais.**

## 4. Desempenho

### Pesos

| Arquivo | Tamanho |
|---|---|
| HTML + CSS + JS | 27 KB |
| Fonte Archivo (latin) + IBM Plex Mono | 100 KB |
| Poster desktop AVIF (WebP 180 KB, JPG 312 KB) | 134 KB |
| Poster mobile AVIF (JPG 128 KB) | 67 KB |
| Logotipo | 4 KB |
| **Primeira tela, desktop** | **cerca de 265 KB** |
| **Primeira tela, mobile** | **cerca de 198 KB** |
| Vídeo 1080p (4,3 Mbit/s) | 10,0 MB |
| Vídeo 720p (2,0 Mbit/s) | 4,8 MB |
| Vídeo mobile 720 × 960 (1,5 Mbit/s) | 3,5 MB |
| Master limpo (34 Mbit/s) | 79,9 MB |

Os pesos de texto são sem compressão; o servidor local não comprime. Em produção, com gzip ou brotli, HTML, CSS e JS caem para cerca de um terço.

### O que foi verificado

- Os três vídeos web são H.264, sem trilha de áudio, com o índice no início do arquivo (começam a tocar antes de baixar tudo).
- O servidor responde `206` a pedidos de intervalo.
- No navegador embutido (Chromium), a 1440 × 900: o vídeo tocou sozinho, as frases trocaram nos tempos certos, o filme chegou ao fim, entrou no estado de loop e recomeçou em `t = 0` tocando. Sem erros no console.
- 32 capturas em 11 tamanhos de tela, de 360 × 640 a 2560 × 1080: nenhuma tem rolagem horizontal; em todas o arquivo de vídeo escolhido foi o esperado.
- Sem deslocamento de layout por construção: poster e vídeo têm posição absoluta dentro de um bloco de altura fixa, e o `img` tem dimensões declaradas.

### O que não foi medido

- **Safari e iPhone real.** O código segue o que o Safari exige (sem som, `playsinline`, pedidos de intervalo, alturas em `svh`), mas não rodei em nenhum dos dois.
- **Tempos de carregamento (LCP, tempo até o primeiro quadro do vídeo)** e **quadros por segundo.** Não há Lighthouse nem medição de rede simulada nesta sessão.
- **O loop e as transições em movimento.** Conferi os estados da página, não assisti. No painel do navegador, as transições não avançavam entre uma captura e outra, por isso criei o modo `?t=`.
- **Contraste de texto medido.** Avaliei no olho.
- **Leitor de tela e navegação só por teclado.** A estrutura está lá (link de salto, `h1`, botões com estado, foco visível, Esc fecha o menu), sem teste com VoiceOver.

## 5. Seção 02 · estudo da transição

O que está implementado abaixo da hero é um **estudo**, marcado como tal na própria tela.

- **Transição:** a hero termina em "Oceânica · Da superfície às grandes profundidades." sobre a imagem escura. A seção 02 sobe por cima, clara, com o título "A dimensão da Oceânica." em corpo grande. A navegação passa para fundo claro e o logotipo volta ao verde original. É a primeira alternância de escuro para claro da página.
- **Composição:** uma linha de cabeçalho, o título, cinco colunas separadas por fios, uma fotografia larga. Os números não contam nem giram: entram com o bloco.
- **Verde:** um quadrado de 9 px ao lado do número do capítulo, e o logotipo. Mais nada.

### Números: o que foi conferido

Conferi o site oficial em 17/11/2026 (home, "A Oceânica" e "Investidores").

| Indicador | No estudo | Fonte | Situação |
|---|---|---|---|
| Experiência | 48 anos | Site: "48 anos de atuação" | Confere hoje. Vira 49 em 2027 |
| Pessoas | 2.300+ | Site: "+ 2.300 colaboradores" | Confere |
| ROVs | 56 | Site: "56 ROVs em 2026" | Confere no site. O release 1T26 dizia 55 |
| Capacidade operacional | 3.000 m | Site: "de 0 a 3.000 metros" | Confere. É profundidade de contrato, não a do equipamento |
| Frota | 18 | Release 1T26 | **Não confere com fonte atual.** O site não informa número de embarcações, e o release mais recente (3T26) não foi aberto. Aparece em cinza no estudo |
| Mergulhadores | fora | Site: "+300", ">300" e "+ 350" em páginas diferentes | **Divergente. Não usei** |

Antes de a seção sair do estudo: abrir o release 3T26 e pedir à Oceânica um valor único e datado para frota, ROVs e mergulhadores.

## 6. Quality gate

| # | Pergunta | Resposta |
|---|---|---|
| 1 | A primeira tela impressiona imediatamente? | **Sim.** A proa de frente aparece com o HTML, antes de qualquer vídeo |
| 2 | O filme funciona sem áudio? | **Sim.** Foi montado sem som desde o animatic e não tem trilha |
| 3 | A headline tem presença institucional? | **Sim.** Caixa alta, três linhas, canto inferior esquerdo |
| 4 | A embarcação mantém a força visual? | **Sim no desktop.** No mobile ela é cortada nas laterais pelo recorte 3:4 e perde a paisagem |
| 5 | O ROV e o mergulhador têm protagonismo? | **O ROV na água, sim. O ROV submarino é pequeno e chapado. O mergulhador tem só 2,3 s** |
| 6 | O color grading é consistente? | **Mais do que antes; não totalmente.** A diferença de qualidade entre os dois filmes continua visível |
| 7 | A interface valoriza o vídeo? | **Sim.** Pouca coisa na tela; nada cobre o assunto principal, com uma exceção (item 7 das limitações) |
| 8 | O looping é discreto? | **Por construção, sim.** Não verifiquei em movimento |
| 9 | A versão mobile mantém impacto? | **Parcialmente.** A composição é própria e limpa, mas o vídeo ocupa 72% da tela e a imagem é ampliada em telas densas |
| 10 | A navegação é simples e sofisticada? | **Sim.** Os cinco links ainda apontam todos para a seção 02, porque as outras seções não existem |
| 11 | A performance é adequada? | **Nos pesos, sim** (265 KB até a primeira tela). Tempos reais não medidos |
| 12 | A experiência parece uma marca global? | **A direção, sim. O arquivo, ainda não:** a fonte é 1080p do YouTube |

## 7. Limitações

1. **Nada está liberado para publicação:** vídeos, pessoas (rosto do mergulhador), nome da embarcação e da unidade no encerramento. As autorizações seguem pendentes.
2. **Fonte em 1080p comprimido.** Em monitores grandes e em telas de alta densidade a imagem é ampliada. Em 2560 px de largura isso é visível.
3. **Encerramento sem plano monumental.** Mantive a direção aprovada. O plano é fechado e escuro; os dois planos offshore mais abertos dos filmes têm letreiro.
4. **Mergulhador:** 2,3 s, sem margem para alongar sem desacelerar.
5. **ROV submarino:** baixa definição e blocos de compressão nos cantos. O tratamento melhorou o contraste, não a resolução.
6. **Logotipo de 211 px.** Na navegação ele aparece com cerca de 100 px de largura e fica macio em telas de alta densidade. Falta o vetor.
7. **Título sobre o casco no segundo plano da abertura.** Em telas 16:10, as duas primeiras linhas do título ficam sobre a popa da Oceanicasub IX. Lê-se bem; não é o ideal.
8. **Copy de campanha ainda não validada** pela Oceânica, em PT e EN.
9. **Fechamento A assumido.** O prompt não escolheu entre A e B.
10. **Sem versão vertical em tela cheia** (seção 3).
11. **Protótipo estático,** sem framework. Serve para aprovar a hero; a passagem para a base definitiva do site é uma decisão da próxima fase.

## 8. Para a versão de produção

- Arquivos originais dos dois filmes, sem letreiro e sem cor, pelo menos dos seis planos usados.
- Plano offshore aberto para o encerramento (bruto do vídeo institucional em 3:00–3:08 e 1:09–1:13, ou captação).
- Logotipo em vetor e manual de marca.
- Autorizações de imagem.
- Validação da copy e dos números.
- Teste em iPhone e Safari, e medição de carregamento em rede real.
