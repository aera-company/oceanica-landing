# Institutional Director's Cut

Data: 17/11/2026. Animatic, sem som, 1920 × 1080, 23,976 qps. Material: cópias do YouTube, **não liberadas**; o aviso está no canto do quadro.

O corte anterior está preservado em `../animatic/`, intacto.

## Arquivos

| Arquivo | Fechamento | Idioma | Duração |
|---|---|---|---|
| `oceanica-directors-cut_A_EN.mp4` | A · offshore, junto à unidade | EN | 20,1 s |
| `oceanica-directors-cut_A_PT.mp4` | A | PT | 20,1 s |
| `oceanica-directors-cut_B_EN.mp4` | B · embarcação em mar aberto | EN | 18,2 s |
| `oceanica-directors-cut_B_PT.mp4` | B | PT | 18,2 s |

As três primeiras cenas são idênticas nas quatro versões. `build.sh` refaz tudo; `overlay.html` guarda os textos.

## Timeline e origem dos takes

V1 = vídeo institucional (`qzGU8XxzSTI`) · V2 = "47 anos" (`ao00-ruSDWY`).

| Tempo | Cena | Plano | Origem | Câmera | Texto |
|---|---|---|---|---|---|
| 0,00 – 2,17 | 01 · Embarcações | Proa de frente, casco verde | V2 0:57.32, plano 14 | Drone recua diante da proa | Título de abertura entra em 0,5 s |
| 2,17 – 5,30 | 01 · Embarcações | Oceanicasub IX em três quartos | V2 0:04.96, plano 2 | Drone acompanha | Título sai em 4,5 s |
| 5,30 – 9,51 | 02 · ROV entrando na água | ROV Work Class atravessa a superfície | V1 1:26.10, plano 32 | Fixa; o ROV desce | Nenhum |
| 9,51 – 13,14 | 03 · ROV submarino | ROV na coluna d'água, faróis acesos, vindo para a câmera | V1 0:57.05, plano 23 | Fixa | Intervenção entra em 9,9 s |
| 13,14 – 15,43 | 03 · Mergulhador | Mergulhador de capacete, luz acesa | V2 1:15.05, plano 21 | Câmera de ação | Intervenção sai em 14,8 s |
| 15,43 – 20,10 | 04 A · Fechamento | Oceanicasub V a contrabordo de um FPSO | V1 1:34.35, plano 34 | Drone, quase fixo | Assinatura entra em 15,7 s e fica |
| 15,43 – 18,23 | 04 B · Fechamento | Embarcação de casco verde em mar aberto, horizonte | V1 3:30.40, plano 81 | Drone acompanha | Assinatura entra em 15,7 s e fica |

## Textos

| | EN | PT |
|---|---|---|
| Abertura | ENGINEERING THE OFFSHORE FUTURE. | ENGENHARIA PARA O FUTURO OFFSHORE. |
| Intervenção | HUMAN EXPERTISE. ADVANCED TECHNOLOGY. | EXPERTISE HUMANA. TECNOLOGIA AVANÇADA. |
| Fechamento | OCEÂNICA · FROM SURFACE TO SUBSEA. | OCEÂNICA · DA SUPERFÍCIE ÀS GRANDES PROFUNDIDADES. |

Nenhuma outra frase, nenhum número, nenhuma régua de capítulos. São mensagens de estudo, não a assinatura oficial.

**Leitura sem áudio.** Abertura: 4,0 s na tela para 4 ou 5 palavras. Intervenção: 4,9 s para 4 palavras, atravessando o corte do ROV para o mergulhador. Fechamento A: 4,4 s. **Fechamento B: 2,5 s, curto** para o nome e a linha em português, que tem cinco palavras.

## Justificativa de direção

1. **Quatro cenas, seis planos.** A cena 01 e a cena 03 têm dois planos cada, porque o melhor plano de cada uma dura cerca de 2 s e este corte não desacelera nada. Dentro de cada cena os dois planos têm a mesma luz ou o mesmo meio, e um único texto atravessa o corte: a cena se lê como uma só.
2. **Velocidade real em tudo.** O corte anterior tinha quatro planos desacelerados com mistura de quadros. Aqui não há nenhum. Os planos do V2 passam de 25 para 23,976 qps exibindo cada quadro uma vez (4% mais lentos, sem fantasma).
3. **Só cortes secos.** Sem zoom, sem fusão, sem clarão, sem tela preta. A única coisa que tem fade é o texto.
4. **A cena 02 não tem texto.** É o respiro do filme e a passagem real entre superfície e operação submarina.
5. **A intervenção cobre os dois planos da cena 03.** O ROV e o mergulhador aparecem sob a mesma frase, como capacidades complementares, em vez de uma legenda para cada um.
6. **Engenharia e Tecnologia não são capítulos.** Estão no título de abertura, no ROV, no sistema de lançamento, na linha do meio e no fecho.
7. **Tipografia.** Archivo em caixa alta, largura 108%, peso médio, sempre no mesmo canto inferior esquerdo. Um corpo para a abertura, um menor para a intervenção, o nome da empresa grande no fim. A serifa do corte anterior saiu: era autoral demais para o tom institucional pedido.
8. **Cor.** Uma correção por fonte e um contraste comum. O V1 perdeu 30% da saturação embutida para se aproximar do V2. O mergulhador foi levado do ciano para o azul. Nada além disso.
9. **Marca.** O logotipo pequeno fica no canto durante o filme. No fecho, "OCEÂNICA" está composto em tipo, porque o único logotipo disponível tem 211 px de largura e não aguenta esse tamanho.

## O fechamento: revisão e teste

Revi de novo os dois filmes, plano a plano, procurando o take mais monumental. Candidatos e por que ficaram ou saíram:

| Plano | O que é | Decisão |
|---|---|---|
| V1-34 · 1:34 | Oceanicasub V a contrabordo de FPSO, 4,6 s limpos | **Fechamento A** |
| V1-81 · 3:30 | Casco verde e vermelho em mar aberto, horizonte, 2,8 s limpos | **Fechamento B** |
| V1-26 · 1:09 | A mesma cena do FPSO, mais aberta | Fora: letreiro a partir de 0,4 s |
| V1-74 · 3:00 | Embarcação diante de plataforma inteira, o plano mais aberto dos dois filmes | Fora: letreiro de prêmio em quase todo o plano e nome do cliente na plataforma |
| V1-80 · 3:22 | Embarcação de trabalho em mar aberto, marca no costado | Fora: letreiro no meio; sobram 2,6 s e 1,4 s separados |
| V1-25 · 1:03 | Popa junto à unidade, equipe no convés | Fora: letreiro depois de 1 s |
| V1-6 · 0:17 | Embarcação pequena em mar aberto | Fora: "45 anos" entra em 1,7 s |
| V1-39 / V1-40 · 1:46 | Embarcações de popa e em mar aberto | Fora: 1,3 s e 1,1 s |
| V2-15 · 0:59 | Embarcação diante do Pão de Açúcar | Fora: 1,4 s, costeiro |
| V2-19 · 1:10 | Embarcação de popa, ponte Rio–Niterói | Fora: 1,8 s, costeiro |
| V2-2 / V2-14 | Oceanicasub IX e proa de frente | Já são a cena 01 |

### Comparação

| | A · junto à unidade (V1-34) | B · mar aberto (V1-81) |
|---|---|---|
| Impacto visual | Denso e escuro. O costado da unidade é uma parede preta atrás do navio; a escala da unidade não se lê | Limpo e luminoso. Navio, esteira, horizonte e céu: a composição mais institucional das duas |
| Representação da empresa | **A mais correta.** Mostra a Oceânica onde ela trabalha, ao lado do ativo do cliente. O nome "Oceanicasub V" está legível | Mostra uma embarcação em trânsito. Poderia ser de qualquer empresa de apoio marítimo |
| Integração com a narrativa | Fecha o arco: superfície, água, fundo, e de volta à operação inteira | Volta ao navio da abertura; o filme termina onde começou, sem ganhar nada |
| Tempo para o texto | 4,4 s: suficiente | 2,5 s: insuficiente |
| Qualidade | V1, compressão e vinheta visíveis | V1, igual |
| Luz em relação à abertura | Noite azul depois de três cenas claras e azuis: contraste forte | Dia, continua o tom do resto |

**Recomendação: A.** É o único plano que diz "offshore" sem depender do texto, e dá tempo para a assinatura. O B é mais bonito e mais fraco: diz menos sobre a empresa e não sustenta a leitura.

**Nenhum dos dois resolve o fechamento.** O que o briefing pede, escala, competência e confiança em uma imagem, não existe nos dois filmes sem letreiro. O plano que resolveria é o V1-74 ou o V1-26 **no arquivo original, sem texto**.

## Limitações

- **Nada está liberado.** Animatic interno.
- **Três das quatro cenas dependem do vídeo institucional (V1)**, que tem compressão forte, cor e vinheta embutidas. A abertura (V2) é visivelmente melhor que o resto.
- **ROV submarino:** o único plano limpo mostra o ROV pequeno, em azul chapado, com vinheta. Todos os planos de intervenção no fundo têm telemetria ou letreiro.
- **Mergulhador:** 2,3 s, rosto identificável, origem não confirmada.
- **Cena 01:** as duas embarcações podem não ser a mesma; só a segunda tem o nome legível (Oceanicasub IX). É costeira.
- **Fechamento B curto demais** para a leitura do texto.
- **Logotipo** em baixa resolução; falta o vetor.
- **Não verifiquei em tempo real.** Revi por folhas de quadros. Ritmo, leitura e fluidez precisam ser vistos em movimento.

## Assets necessários

| # | Asset | Resolve |
|---|---|---|
| 1 | Bruto do V1 sem letreiro, de 3:00 a 3:08 (plano 74) e de 1:09 a 1:13 (plano 26) | **O fechamento.** São os dois planos offshore mais abertos que existem |
| 2 | Brutos do V2: 0:04–0:08 e 0:56–1:00 | Abertura em qualidade de publicação e com mais segundos |
| 3 | Bruto do V1 de 1:25 a 1:31 (ROV entra na água) | Cena 02 em qualidade |
| 4 | Registro submarino de ROV em intervenção, sem telemetria, revisado quanto a confidencialidade | Cena 03, que hoje é a mais fraca em imagem |
| 5 | Registro de mergulho em arquivo original, com autorização de imagem | Cena 03 |
| 6 | Se nada disso existir: uma diária de drone em campo, com embarcação e unidade inteiras em mar aberto, de dia | Fechamento e abertura offshore |
| 7 | Logotipo em vetor | Fecho com a marca real |
| 8 | Autorização de uso de imagem da empresa e das pessoas | Qualquer uso fora do estudo |
