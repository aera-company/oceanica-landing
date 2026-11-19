# Capítulo 04 · Oceânica Universe

Data: 18/11/2026. Endereço: `http://localhost:4173/#universe`. Nada publicado.

> **Decisão de 18/11/2026:** Tiago aprovou a direção em corte. Ela segue como base do capítulo; o redesenho por ilustrador e as fotografias por ponto continuam como evolução possível.

**É um estudo de direção com protótipo funcionando,** não a versão final do capítulo. O Universe é o segundo grande trabalho criativo do briefing; esta entrega propõe um caminho e o mostra em uso, para você decidir antes de qualquer produção.

## A direção proposta: um corte

A operação inteira em um só desenho, visto de lado, da superfície ao leito marinho.

- **Por que um corte.** A pesquisa apontou duas oportunidades que ninguém na categoria usa: a coluna d'água como eixo da experiência e o sistema inteiro em uma imagem navegável. O corte faz as duas coisas e continua a frase da hero, "Da superfície às grandes profundidades.", que aqui virou o título.
- **Por que desenho de linha.** O briefing pede para evitar aparência de jogo, de maquete e de infográfico corporativo. Um desenho técnico de traço fino, com muito espaço vazio e pouca tipografia, é o registro que uma empresa de engenharia reconhece como seu.
- **Por que não 3D agora.** A Emons, a referência do briefing, usa um vídeo pré-renderizado de um mundo 3D. Isso exige modelagem e render: custo de produção e de créditos que este projeto pede para não gastar sem aprovação. O corte em vetor pesa poucos kilobytes, é nítido em qualquer tela e pode ser redesenhado por um ilustrador sem mudar o código.
- **Claro em cima, escuro embaixo.** O céu é claro e a água escurece com a profundidade. O capítulo faz sozinho a alternância de tom que a página precisa depois do capítulo 03, escuro.

## Como funciona

- **A cena** é alta e se percorre com a rolagem normal: descer a página é descer na coluna d'água. Uma escala à esquerda marca 0, 1.000, 2.000 e 3.000 m.
- **Nove pontos** numerados marcam o que a Oceânica faz em cada lugar. O nome de cada ponto fica sempre visível: a cena se lê sem interação.
- **Um cartão** mostra o ponto ativo: número, frente, nome, uma frase e a fonte. Ao rolar, o ponto mais próximo do meio da tela fica ativo sozinho, como um percurso guiado. Clicar em um ponto o seleciona; as setas levam ao anterior e ao seguinte.
- **Três frentes** filtram a cena: Prevenção, Contingenciamento e Engenharia, a taxonomia do site. Escolher uma frente apaga o que não é dela, no desenho e nos pontos.
- **Desktop:** cena à esquerda; frentes e cartão em um painel fixo à direita.
- **Celular:** cena na largura da tela; frentes em uma faixa fixa no alto; cartão preso ao pé da tela. Sem depender de hover.
- **Movimento reduzido:** tudo funciona, sem transições.

## Os nove pontos

Textos montados com as palavras do site oficial, lido em 18/11/2026 (home e página de Prevenção).

| # | Ponto | Frente | Texto | O que o site diz |
|---|---|---|---|---|
| 1 | RSV | Contingenciamento | Embarcação de apoio a ROV. O primeiro contrato de ROV Work Class da Oceânica, em 2020, foi em uma RSV. | Linha do tempo, 2020: "Primeiro contrato Work Class ROV (RSV)" |
| 2 | SDSV | Prevenção | Shallow Dive Support Vessel, com posicionamento dinâmico DP2. Usada em inspeção e manutenção submarina com mergulho e ROVs. | "Embarcações dotadas de sistema de posicionamento dinâmico (DP2)"; uso em inspeção e manutenção com mergulho e ROVs |
| 3 | FPSO | Prevenção | Unidade de produção do cliente. A Oceânica realiza inspeções e manutenções submarinas em FPSOs desde 1998, incluindo inspeção de classe (UWILD). | "Realizamos desde 1998 inspeções e manutenções submarinas nas FPSOs."; inspeção de classe (UWILD) |
| 4 | Mergulhador | Prevenção | Inspeção, manutenção e reparo com mergulhadores. Apoio a operações de pull-in e pull-out de dutos flexíveis e rígidos. | "inspeção, manutenção e reparo (IRM) através de operações com mergulhadores e ROVs"; pull-in e pull-out "tanto de dutos flexíveis quanto de dutos rígidos" |
| 5 | ROV de observação | Prevenção | Operações diverless: inspeção visual, potencial eletroquímico, medição de espessura, limpeza e inspeção de amarras. | "Serviços de inspeção submarina executados por ROVs elétricos de observação", com a mesma lista de atividades |
| 6 | Risers | Engenharia | Instalação de risers e manifolds, entre as soluções de engenharia subaquática. | "Instalação de risers e manifolds" |
| 7 | ROV Work Class | Contingenciamento | Intervenção submarina e serviços customizados. Operação de ferramentas de contenção e resposta em cenários de blow out em equipamentos submarinos. | "(i) Intervenção Submarina e Serviços Customizados"; "operação de ferramentas para contenção/resposta em cenários de blow out em equipamentos submarinos" |
| 8 | Estruturas submarinas | Engenharia | Instalação de estruturas como PLEM e PLAT, e de manifolds. | "Instalação de estruturas diversas, tais como: PLEM e PLAT" |
| 9 | Dutos | Contingenciamento e Engenharia | Reparo de dutos rígidos e contingência. Reparo com conectores mecânicos, comissionamento e descomissionamento de dutos. | "(ii) Reparo de Dutos Rígidos e Contingência"; "Reparo de dutos submarinos com conectores mecânicos"; "Comissionamento e Descomissionamento de dutos" |

Em inglês, todos os textos têm versão própria.

### Decisões minhas que precisam de validação

- **A RSV está na frente de Contingenciamento.** O site diz que as embarcações atendem as três frentes. Escolhi a que corresponde ao ROV Work Class que ela lança no desenho.
- **O ROV de observação parte da SDSV e inspeciona uma amarra.** É coerente com o site ("inspeção de amarras"), mas a composição é minha.
- **O ROV Work Class está junto a um "equipamento submarino" genérico.** O site não nomeia árvore de natal molhada, então não desenhei uma.
- **A cena é uma só.** Na vida real essas atividades não acontecem todas ao mesmo tempo no mesmo campo.

### O que ficou de fora do desenho

Atividades que o site lista e que não têm ponto: inspeção em mangotes e terminais oceânicos (monoboias, FSO, navios tanque), ensaios não destrutivos, embarcações Pai e Filho (LDB, mergulho até 30 m), teste hidrostático, lançamento de cabos e dutos. Cabem em uma segunda versão ou no capítulo de soluções.

## O desenho

- Feito por mim, em vetor, direto no código. Não é obra de ilustrador e não usa nenhuma imagem de terceiros.
- **Esquemático e fora de escala,** e isso está escrito na tela. As embarcações, a unidade de produção, os ROVs e as estruturas são silhuetas genéricas, não retratos de ativos da Oceânica nem do cliente.
- A escala de profundidade não é linear nem medida: marca a ordem das coisas, não a distância entre elas.
- O mergulhador está logo abaixo da superfície, sem número de profundidade. O site só dá um número de mergulho ("até 30 metros", para as embarcações Pai e Filho), e não o apliquei aqui.

## O que foi verificado

- 21 capturas: abertura, seis pontos e duas frentes em 1440 × 900; abertura, cinco pontos e uma frente em 390 × 844; mais 1920 × 1080, 768 × 1024, 360 × 640 e uma em inglês (`screens-scroll/secao04-*`). Nenhuma tem rolagem horizontal, e a altura da tela bate em todas.
- No navegador embutido, em 1440 × 900, sem erros no console:
  - ao rolar até o meio da cena, o ponto 5 ficou ativo sozinho;
  - o filtro Engenharia levou a seleção ao ponto 6 e apagou o que não é da frente;
  - o clique no ponto 9 abriu "Dutos", com as duas frentes;
  - a troca para inglês mudou nome, texto e frentes do cartão.

### Um defeito encontrado e corrigido

Na primeira versão, a faixa de frentes e um rótulo alargavam a página no celular para 640 px. Em um telefone real, a página inteira apareceria reduzida. Corrigi a faixa, mudei de lado dois rótulos e pus uma proteção contra transbordo no capítulo. A captura agora confirma 390 px de largura e 844 de altura.

## O que não foi verificado

- O percurso em movimento: conferi estados, não a rolagem contínua.
- Toque em telefone real, Safari e iPhone.
- Teclado e leitor de tela. Pontos e frentes são botões com estado, e o cartão anuncia mudanças, mas não testei com VoiceOver.

## Limitações

1. **O desenho é meu e é simples.** Serve para aprovar a direção. Para publicar, um ilustrador técnico deveria redesenhar a cena sobre a mesma estrutura.
2. **No celular os elementos ficam pequenos** e os três rótulos do leito marinho ficam apertados.
3. **O trecho entre 300 e 1.800 m é quase vazio.** É verdadeiro (é água), e é longo no desktop.
4. **Nenhuma fotografia.** O capítulo é todo desenho; pode pedir uma imagem real por ponto no cartão.
5. **Não há passagem para o capítulo 05,** que ainda não existe.

## Caminhos de evolução

| Caminho | O que ganha | O que exige |
|---|---|---|
| Ilustração técnica profissional sobre esta estrutura | Acabamento e identidade | Ilustrador; alguns dias |
| Fotografia real no cartão de cada ponto | Lastro documental | Imagens liberadas, uma por ponto |
| Vídeo 3D pré-renderizado com paradas, como a Emons | Imersão e câmera | Modelagem, render e orçamento de produção aprovado |
| Dados reais do campo (profundidades, nomes de ativos) | Precisão | Validação e autorização da Oceânica e do cliente |

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/universe.css` | Estilos |
| `web/js/universe.js` | Textos dos nove pontos nos dois idiomas, frentes e percurso |
| `web/index.html`, `web/autoplay.html` | O desenho em SVG está dentro da página |
| `design/section-04_desktop-board.jpg`, `section-04_mobile-board.jpg`, `section-04_cena-inteira.jpg` | Pranchas |
| `documentation/screens-scroll/secao04-*` | Capturas |

Endereços de teste: `?uni=5` abre no ponto 5; `?uni=7&unif=cont` abre no ponto 7 com a frente de Contingenciamento. Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao04` (servidor ligado).
