# Vídeo institucional da Oceânica · shot list

Data: 16/11/2026. Substitui a decupagem preliminar (`SHOT_LOG.md`, removida), que usava outra numeração.

## 1. O arquivo

| | |
|---|---|
| Arquivo no projeto | `creative/assets/reference/oceanica-institucional-yt-qzGU8XxzSTI-1080p.mp4` (cópia; o original está em `~/Downloads`) |
| Origem | YouTube, ID `qzGU8XxzSTI`, baixado com YTDown. Não é o arquivo de produção |
| Duração | 3:54.23 (5.616 quadros) |
| Vídeo | 1920 × 1080, 23,976 qps, H.264 a cerca de 3,5 Mbit/s |
| Áudio | AAC 128 kbit/s, estéreo. Sonoro desde 0:00.4, sem silêncios longos. **Não transcrito**: não há ferramenta de transcrição local e não enviei o áudio a serviço externo |
| Data provável | 2023 [hipótese]: os letreiros dizem "45 anos" (1978 + 45), "14 embarcações", "40 ROVs", "mais de 2.000 colaboradores" |
| Direitos | Material da Oceânica. **Não liberado** para este projeto nem para uso público |

## 2. Como foi feita

- **Cortes:** detectados por diferença de histograma e de pixels entre quadros consecutivos. Foram encontrados 85 planos. Precisão de cerca de um quadro (0,04 s) nos cortes secos; nas transições com efeito, o limite é aproximado.
- **Revisão:** três quadros por plano (15%, 50% e 85% da duração), lidos um a um. Seis quadros por plano nos candidatos à hero.
- **Movimento de câmera:** descrito a partir dessas amostras. Em planos curtos, um movimento lento pode não aparecer. A estimativa automática de deslocamento não foi usada: não é confiável com água, espuma e transições.
- **Nitidez:** avaliação visual, apoiada pela variância do laplaciano no centro do quadro. A medida só compara planos de conteúdo parecido.

**Não feito:** assistir em tempo real com som, ler cada quadro, transcrever narração.

## 3. Obstáculos que valem para o vídeo inteiro

| Obstáculo | Onde | Efeito |
|---|---|---|
| Compressão do YouTube (3,5 Mbit/s) | Todo o vídeo | Água, espuma e escuro perdem detalhe; blocos visíveis nas sombras. Serve para animatic, não para tela grande |
| Cor tratada e vinheta escura embutidas | Quase todos os planos | Não se removem. Limitam o tratamento de cor da hero |
| Letreiros queimados | 25 planos (coluna "Texto") | Impedem o uso daquele trecho. Em alguns planos o texto entra no meio, e há um trecho limpo antes |
| Transições com efeito de glitch e fusões | Entre a maioria dos planos | As bordas de cada plano são inutilizáveis; os trechos limpos ficam mais curtos que o plano |
| Planos curtos | Média de 2,8 s | Pouco material para um scroll lento. Desacelerar além de 1,5 vez fica visível |
| Números defasados | Letreiros | 14 embarcações, 40 ROVs e 2.000 colaboradores contra 18, 55 e 2.378 no RI de 2026 |
| Telemetria e ordens de serviço na imagem | Planos 13, 14, 15 | Imagem de câmera de ROV com dados de operação. Precisa de avaliação de confidencialidade antes de qualquer uso |

## 4. Shot list completa

**Reuso:** H = candidato à hero · 02 = ato Escala · 03 = ato Capacidade · U = Universe · 06 = Confiança e pessoas · — = descartar.
**Nitidez:** A = alta · M = média · B = baixa (para o tipo de cena).

| # | Entrada | Saída | Dur. (s) | Assunto | Composição | Câmera | Texto | Nitidez | Reuso |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00.00 | 0:05.42 | 5,42 | Sol no horizonte, mar calmo | Horizonte no terço superior | Fixa | Não | M | — (pôr do sol genérico) |
| 2 | 0:05.42 | 0:08.84 | 3,42 | Tartaruga marinha | Animal no centro, água turquesa | Acompanha o animal | Não | B | — (fora do assunto) |
| 3 | 0:08.84 | 0:12.18 | 3,34 | Mergulhador recreativo sobre coral | Coral em primeiro plano | Fixa | Não | M | — (não é operação) |
| 4 | 0:12.18 | 0:15.01 | 2,84 | Embarcação verde em baía, cidade ao fundo | Navio no centro, céu nublado | Aérea, deriva lenta | Não | B | 02 |
| 5 | 0:15.01 | 0:17.31 | 2,29 | Embarcação verde, vista de cima, mar aberto | Zenital oblíqua | Aérea | Não | B | 02 |
| 6 | 0:17.31 | 0:20.77 | 3,46 | Embarcação verde vindo em direção à câmera | Navio pequeno no quadro, mar azul | Aérea, fixa | "45 anos" a partir de ~0:19.0 | M | 02 (trecho limpo ~1,7 s) |
| 7 | 0:20.77 | 0:23.19 | 2,42 | Costado à noite, ROV com faróis acesos na água | Diagonal do casco à direita | Aérea, fixa | Não | M | H (alternativa noturna), 03 |
| 8 | 0:23.19 | 0:25.15 | 1,96 | Mergulhador de capacete, close | Fechado | Movimento de mergulho | Não | B | 03 |
| 9 | 0:25.15 | 0:27.49 | 2,34 | ROV de observação "228" no fundo, faróis acesos | Frontal | Fixa | "Prevenção, Contingenciamento" | M | 03 (trecho limpo ~1 s) |
| 10 | 0:27.49 | 0:31.28 | 3,80 | ROV Work Class no LARS, a bordo, marca "Oceânica" | ROV ocupa a direita, mar ao fundo | Fixa | "Prevenção, Contingenciamento, Engenharia" o plano inteiro | A | Precisa do original |
| 11 | 0:31.28 | 0:33.95 | 2,67 | Estrutura submarina, ROV ao fundo | Azul, pouca leitura | Lenta | Não | B | — |
| 12 | 0:33.95 | 0:36.58 | 2,63 | Mergulhador junto a coral-sol em estrutura | Fechado | Instável | Não | B | 03 |
| 13 | 0:36.58 | 0:37.87 | 1,29 | Inspeção por câmera de ROV, crescimento marinho | Imagem de câmera de ROV | Do ROV | Telemetria e O.S. queimadas | B | — (confidencialidade) |
| 14 | 0:37.87 | 0:39.08 | 1,21 | Manipulador de ROV em intervenção no fundo | Imagem de câmera de ROV | Do ROV | Telemetria queimada | B | 03, se a telemetria puder ser removida |
| 15 | 0:39.08 | 0:41.71 | 2,63 | Mergulhador em intervenção | Fechado | Do mergulhador | "Inspeção, Manutenção, Intervenção submarina" e O.S. | B | — |
| 16 | 0:41.71 | 0:44.09 | 2,38 | Ferramenta de intervenção no convés | Ferramenta à esquerda, mar ao fundo | Fixa | Não | A | 03, 05 |
| 17 | 0:44.09 | 0:45.00 | 0,92 | Ferramenta em uso, efeito gráfico | Saturado | — | "Reparos a mais de 3.000 m" | B | — |
| 18 | 0:45.00 | 0:47.63 | 2,63 | Equipamento, tratamento gráfico | Saturado | — | "Reparos a mais de 3.000 m" | B | — |
| 19 | 0:47.63 | 0:49.88 | 2,25 | Conexão submarina em close | Fechado | Instável | Não | B | — |
| 20 | 0:49.88 | 0:51.43 | 1,54 | Equipe em reunião diante de tela | Grupo, bandeira do Brasil | Fixa | Não | M | 06 |
| 21 | 0:51.43 | 0:53.68 | 2,25 | Capacete de mergulho com luz forte | Contraluz | Instável | Não | B | — |
| 22 | 0:53.68 | 0:56.93 | 3,25 | ROV Work Class entrando na água à noite | ROV iluminado no escuro | Fixa | Não | M | H (alternativa noturna) |
| 23 | 0:56.93 | 1:00.73 | 3,80 | ROV descendo na coluna d'água, faróis | ROV pequeno no centro | Fixa | Não | B | 03 |
| 24 | 1:00.73 | 1:03.98 | 3,25 | ROV visto de cima, na água turquesa | Zenital | Fixa | Não | B | — |
| 25 | 1:03.98 | 1:09.49 | 5,51 | Popa de embarcação junto a unidade, equipe no convés | Convés no centro | Aérea, aproximação | "Sustentável" a partir de ~1:05 | M | Precisa do original |
| 26 | 1:09.49 | 1:13.03 | 3,55 | **Oceanicasub V a contrabordo de FPSO**, plano mais aberto | Navio na diagonal, FPSO no alto | Aérea, deriva lenta | "Tecnologias avançadas" a partir de ~1:10.2 | A | H (precisa do original) |
| 27 | 1:13.03 | 1:15.33 | 2,29 | Mergulhador junto a estrutura submarina | Estrutura à esquerda | Fixa | Não | B | 03 |
| 28 | 1:15.33 | 1:17.33 | 2,00 | ROV Work Class suspenso no LARS, ao entardecer | ROV no centro, fundo escuro | Fixa | Não | M | H (alternativa ao 60) |
| 29 | 1:17.33 | 1:20.75 | 3,42 | ROV com faróis na água, ao lado do navio | Mar escuro | Fixa | "40 ROVs" | M | Precisa do original |
| 30 | 1:20.75 | 1:24.25 | 3,50 | ROV Work Class no convés, marca "Oceânica" | ROV ocupa o quadro | Lateral lenta | "ROV Work Class" | A | Precisa do original |
| 31 | 1:24.25 | 1:25.96 | 1,71 | ROV submerso junto ao casco | Escuro | Fixa | Não | B | — |
| 32 | 1:25.96 | 1:30.30 | 4,34 | **ROV Work Class entra na água, visto de cima**, marca "Oceânica" | ROV no centro, espuma | Fixa, ROV desce | Não | M | **H** |
| 33 | 1:30.30 | 1:34.26 | 3,96 | Içamento de colchões de concreto à noite | Pórtico iluminado | Fixa | Não | M | 03, U |
| 34 | 1:34.26 | 1:39.27 | 5,01 | **Oceanicasub V a contrabordo de FPSO**, plano mais fechado | Navio na diagonal, costado do FPSO ao fundo | Aérea, quase fixa | Não (glitch de saída a partir de ~1:39.0) | A | **H** (4,7 s limpos) |
| 35 | 1:39.27 | 1:42.39 | 3,13 | Costado com "Oceânica", sistema de ROV e equipe | Lateral, horizonte claro | Lateral lenta | "14 embarcações" a partir de ~1:41 | M | 02 (trecho limpo ~1,6 s) |
| 36 | 1:42.39 | 1:43.73 | 1,33 | Embarcação verde, aérea, convés de trabalho | Três quartos | Aérea | "14 embarcações" | A | Precisa do original |
| 37 | 1:43.73 | 1:45.36 | 1,63 | Embarcação com heliponto verde | Heliponto em primeiro plano | Aérea | "14 embarcações" | A | Precisa do original |
| 38 | 1:45.36 | 1:46.56 | 1,21 | Embarcação vista do zênite, heliponto verde | Navio horizontal, fundo escuro | Zenital | Até ~1:45.6 | A | 02, U (~1 s limpo) |
| 39 | 1:46.56 | 1:47.90 | 1,33 | Embarcação verde de popa, esteira | Simétrica | Aérea | Não | A | 02 |
| 40 | 1:47.90 | 1:49.03 | 1,13 | Embarcação verde em mar aberto | Navio no centro | Aérea | Não | M | 02 |
| 41 | 1:49.03 | 1:50.78 | 1,75 | Mergulhador de capacete com ferramenta | Corpo inteiro | Fixa | Não | M | 03 |
| 42 | 1:50.78 | 1:52.57 | 1,79 | Mergulhador em solda submarina | Fechado, faísca | Fixa | Não | M | 03 |
| 43 | 1:52.57 | 1:54.32 | 1,75 | Mergulhador descendo, superfície ao fundo | Corpo inteiro | Fixa | Não | M | 03 |
| 44 | 1:54.32 | 1:55.99 | 1,67 | Mergulhador no fundo | Verde | Fixa | Não | B | — |
| 45 | 1:55.99 | 1:57.08 | 1,08 | Superfície vista de baixo | Abstrato | Fixa | "Mais de 2.000 colaboradores" | M | — |
| 46 | 1:57.08 | 1:58.45 | 1,38 | Profissional olhando o horizonte, unidade ao fundo | Perfil à direita | Fixa | "Mais de 2.000 colaboradores" | M | Precisa do original (06) |
| 47 | 1:58.45 | 2:00.20 | 1,75 | Mergulhador entre estruturas | Centro | Fixa | "Mais de 2.000 colaboradores" | B | — |
| 48 | 2:00.20 | 2:01.16 | 0,96 | Sala de controle de ROV, operador de costas | Telas ao fundo | Fixa | Não | M | 03 |
| 49 | 2:01.16 | 2:02.29 | 1,13 | Mão no joystick | Close | Fixa | Não | B | — |
| 50 | 2:02.29 | 2:02.71 | 0,42 | Mão no joystick | Close | Movimento | Não | B | — |
| 51 | 2:02.71 | 2:05.46 | 2,75 | Equipe diante de computador | Grupo | Lateral lenta | Não | M | 06 |
| 52 | 2:05.46 | 2:08.38 | 2,92 | Oficina vista de cima, equipe de vermelho | Zenital | Fixa | "Garantir a integridade dos ativos dos nossos clientes" | A | Precisa do original (U) |
| 53 | 2:08.38 | 2:10.21 | 1,84 | Detalhe de uniforme e volante | Close | Movimento | Não | B | — |
| 54 | 2:10.21 | 2:10.76 | 0,54 | Volante de porta estanque | Close | Fixa | Não | B | — |
| 55 | 2:10.76 | 2:12.97 | 2,21 | Painel de mergulho saturado, operador | Painel ocupa o quadro | Instável | Não | M | 03 |
| 56 | 2:12.97 | 2:17.14 | 4,17 | Mergulhadores de capacete no sino | Dois mergulhadores | Transição longa | Não | M | 03 |
| 57 | 2:17.14 | 2:18.51 | 1,38 | Treinamento, mergulhador e instrutor | Dois rostos | Fixa | "Treinamento offshore" | M | — |
| 58 | 2:18.51 | 2:20.18 | 1,67 | Treinamento, capacete | Fechado | Fixa | "Treinamento offshore" | B | — |
| 59 | 2:20.18 | 2:21.56 | 1,38 | Treinamento no convés à noite | Fechado | Fixa | "Treinamento offshore" | B | — |
| 60 | 2:21.56 | 2:23.85 | 2,29 | **ROV Work Class suspenso no LARS, contra o céu**. Marca "Oceânica"; "SWL (SURFACE) · SWL (AT DEPTH)" impresso no braço | ROV no centro, braço à direita | Fixa, ROV oscila | Não | M | **H** |
| 61 | 2:23.85 | 2:27.06 | 3,21 | Dois profissionais em console | Dois rostos | Fixa | Não | M | 06 |
| 62 | 2:27.06 | 2:29.57 | 2,50 | Costas de uniforme com a marca | Close | Lateral | Não | M | 06 |
| 63 | 2:29.57 | 2:30.86 | 1,29 | Instrução em sala | Aberto | Fixa | Não | B | — |
| 64 | 2:30.86 | 2:32.61 | 1,75 | Equipagem de mergulhador | Fechado | Fixa | Não | B | 06 |
| 65 | 2:32.61 | 2:33.74 | 1,13 | Equipagem de mergulhador | Fechado | Fixa | Não | B | — |
| 66 | 2:33.74 | 2:35.95 | 2,21 | Foto de turma de formação, de máscara | Grupo frontal | Fixa | Não | M | 06 (máscaras datam a cena) |
| 67 | 2:35.95 | 2:38.28 | 2,34 | Mergulhador descendo junto a pernas de estrutura | Silhueta | Fixa | Não | B | 03 |
| 68 | 2:38.28 | 2:42.58 | 4,30 | Convés com guindaste amarelo e equipe | Aberto | Fixa | "Tecnologia + experiência" | A | Precisa do original (03) |
| 69 | 2:42.58 | 2:44.29 | 1,71 | Piloto de ROV nos comandos | Perfil | Fixa | Não | M | 03 |
| 70 | 2:44.29 | 2:47.25 | 2,96 | Piloto de ROV nos comandos | Perfil à direita | Fixa | "Programa Mergulhador do Futuro" | M | Precisa do original (03) |
| 71 | 2:47.25 | 2:49.04 | 1,79 | Sala de controle de ROV, telas | Telas | Fixa | "Programa Mergulhador do Futuro" | M | — |
| 72 | 2:49.04 | 2:56.43 | 7,38 | **ROV de observação sendo recuperado junto ao costado**, guindaste, equipe de laranja | Água à esquerda, costado à direita | Aérea, quase fixa; o ROV sobe | Não | A | **H** |
| 73 | 2:56.43 | 3:00.26 | 3,84 | Embarcação atracada, convés carregado | Zenital oblíqua | Aérea, lenta | Não | A | 02, U |
| 74 | 3:00.26 | 3:08.10 | 7,84 | Embarcação verde navegando junto a plataforma com "PETROBRAS" | Navio no terço inferior | Aérea, acompanha | "Prêmio melhores fornecedores Petrobras 2018" quase todo | A | Precisa do original (cliente visível) |
| 75 | 3:08.10 | 3:11.02 | 2,92 | Equipe com peça de engenharia em obra em terra | Peça na diagonal | Fixa | Não | A | 05 |
| 76 | 3:11.02 | 3:14.15 | 3,13 | Mergulhador em trabalho no fundo | Fechado | Fixa | Não | B | — |
| 77 | 3:14.15 | 3:16.91 | 2,75 | Equipe de laranja e capacete verde trabalhando | Grupo, fundo vermelho | Fixa | Não | M | 06 |
| 78 | 3:16.91 | 3:19.16 | 2,25 | Convés visto de cima, ROV pequeno e equipe | Zenital | Fixa | Não | M | 02, U |
| 79 | 3:19.16 | 3:22.62 | 3,46 | Capacete de mergulho, raios de luz | Capacete à esquerda | Fixa | "Melhor serviço offshore" | M | — |
| 80 | 3:22.62 | 3:30.29 | 7,67 | Embarcação em mar aberto (primeira metade) | Navio no centro | Aérea, acompanha | "Responsabilidade ambiental e social" no meio | A | 02 (trechos limpos curtos) |
| 81 | 3:30.29 | 3:33.21 | 2,92 | **Embarcação verde e vermelha em mar aberto** | Navio vindo em diagonal | Aérea, acompanha | Não | M | 02 |
| 82 | 3:33.21 | 3:40.47 | 7,26 | Sol no horizonte | Horizonte | Fixa | Assinatura "Ativos mais seguros para um mundo mais limpo" | M | — |
| 83 | 3:40.47 | 3:43.01 | 2,54 | Animação de radar verde | Gráfico | — | — | — | — (HUD, contrário ao brief) |
| 84 | 3:43.01 | 3:52.90 | 9,88 | Animação de radar e logotipo | Gráfico | — | Logotipo | — | — |
| 85 | 3:52.90 | 3:54.23 | 1,33 | Logotipo sobre fundo escuro | Centro | — | Logotipo | — | — |

## 5. Os melhores takes por tema

| Tema | Takes | Observação |
|---|---|---|
| Embarcações | 34, 26, 81, 39, 38, 73, 4 | 34 é o único que une casco verde, nome do navio e unidade de produção, sem texto |
| Infraestrutura offshore | 34, 26, 74, 25 | 74 mostra o nome do cliente no costado da plataforma |
| ROVs | 60, 32, 72, 28, 22, 7, 30, 10 | 60 e 32 têm a marca legível; 30 e 10 têm texto |
| Equipamentos | 16, 33, 75 | Ferramentas e colchões; bons para Soluções |
| Mergulhadores | 41, 42, 43, 56, 67 | Confirmar que são da Oceânica |
| Equipes | 48, 69, 61, 51, 77, 62, 20 | Todos curtos (1–3 s) |

## 6. Takes que precisam do arquivo original sem texto

Para a hero: **26** (versão aberta do FPSO). Para os demais atos: **10, 25, 29, 30, 35, 36, 37, 46, 52, 68, 70, 74, 80**.

E, para a versão final, **todos os takes aproveitados**, inclusive os sem texto: a cópia do YouTube não tem qualidade de publicação.

O pedido à Oceânica:

> Os arquivos brutos do vídeo institucional (YouTube `qzGU8XxzSTI`), sem letreiros e sem tratamento de cor, na resolução original da captação. Em especial os planos de 1:09 a 1:40 (Oceanicasub V junto ao FPSO, ROV entrando na água) e de 2:21 a 2:57 (ROV no LARS, recuperação junto ao costado). E o contato da produtora, para saber se há mais material da mesma captação.

## 7. Arquivos desta pasta

- `stills/`: 20 quadros em 1920 × 1080, nomeados pelo número do plano.
- `clips/`: 11 trechos limpos (sem texto, sem transição), sem som, para estudo.
