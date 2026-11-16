# 06 · Reavaliação com o vídeo institucional

Data: 16/11/2026. Base: `../references/institutional-video/SHOT_LIST.md`.

A direção aprovada não muda: conceito "Maior do que se vê", Rota A, recuar para revelar, tratamento A2 com o título "Esta é a parte visível.". O que muda é **de onde vêm as imagens**.

Nada aqui autoriza uso público do material. O vídeo é uma cópia do YouTube, não liberada.

---

## 1. Os três tratamentos à luz do material

| | Antes (só fotos do site) | Com o vídeo | Mudança |
|---|---|---|---|
| **A1 · Monumental Realism** | Dependia de captação nova: não existia casco atual junto a uma unidade | O plano 34 (e o 26, mais aberto) é exatamente essa imagem. Os planos 39, 40 e 81 dão o navio em mar aberto. **Falta o macro do casco**: nenhum plano começa perto o bastante | Passa a "viável com produção complementar". O primeiro quadro continua dependendo de captação ou do bruto |
| **A2 · Engineering Revealed** | Viável com produção complementar; o costado verde quase não aparecia; último quadro ao amanhecer | Os quatro quadros têm plano real: 60 (ROV no LARS, com inscrição de engenharia), 72 (sistema, equipe e costado), 32 (o ROV entra na água), 34 (casco verde junto ao FPSO, de dia) | **O mais beneficiado.** Recupera o costado verde e resolve a luz: de dia |
| **A3 · The Bigger Picture** | Viável com produção complementar, sem engenharia | O vídeo não tem nenhum plano que comece em abstração (reflexo, textura). O plano 38 (zenital) poderia abrir, mas é curto (cerca de 1 s limpo) e tem letreiro | Não melhora. Continua o mais fraco no assunto |

**A recomendação se mantém, e fica mais forte:** o A2 é o único tratamento que pode ser montado inteiro com imagens reais da Oceânica hoje.

---

## 2. O que muda na linguagem do A2

O storyboard previa **dois planos de câmera e um corte**. Com o vídeo, são **quatro planos e três cortes**.

O recuo deixa de ser um movimento de câmera e passa a ser **montagem**: cada plano é mais aberto que o anterior, e o carimbo marca o degrau.

| | Ganha | Perde |
|---|---|---|
| Montagem de quatro planos | Imagem real em cada quadro; ritmo de filme; o título ganha um momento exato (o ROV sumindo na água) | A continuidade física do recuo, que era o gesto mais autoral do conceito |

Minha leitura: a troca vale. O conceito sobrevive na montagem, porque a ordem dos planos continua sendo do menor ao maior. Se no futuro houver captação dedicada, o recuo contínuo volta como versão final.

---

## 3. Animatic com imagens reais

Arquivos em `../hero-storyboard/real-footage/`:

- `animatic-real.mp4`: 19 s, 1920 × 1080.
- `animatic-real-mobile.mp4`: 19 s, 720 × 1280, recorte vertical de cada plano.
- `frames/1–5.jpg` e `frames/m1–m5.jpg`: quadros-chave.
- `overlay.html` e `build.sh`: a camada gráfica e a montagem, para refazer.

| Tempo | Plano | Tratamento | Camada gráfica |
|---|---|---|---|
| 0 – 3,4 s | **60** · ROV no LARS | Desacelerado 1,5 vez | Título. Carimbo 1/4, Equipamento. Uma chamada: "SWL (surface) · SWL (at depth)", como impresso no LARS |
| 3,4 – 7,6 s | **72** · Recuperação junto ao costado | Velocidade real, primeiros 4,2 s | Título. Carimbo 2/4, Sistema. Chamada na equipe de convés |
| 7,6 – 11,9 s | **32** · O ROV entra na água | Velocidade real | Título. Carimbo 3/4, Abaixo da linha. Sem chamada: o momento é da imagem |
| 11,9 – 19,1 s | **34** · Oceanicasub V junto ao FPSO | Desacelerado 1,25 vez e 1,2 s parado no fim | Título sai. Carimbo 4/4, Campo. Chamadas no nome do navio e na unidade. Aos 3 s, a folha 02 abre com frota, ROVs e pessoas, cada número com fonte |

Cor: a mesma regra do A2. Azuis e cianos vão para cinza; o verde da marca e o amarelo do equipamento ficam. Aplicada por cima da cor já tratada do vídeo.

**Até onde é crível:**

- O movimento é real em todos os planos. Não há reenquadramento digital.
- A desaceleração de 1,5 vez no plano 60 cria quadros intermediários por mistura. Em tela grande aparece como leve fantasma no movimento.
- O plano 72 é uma **recuperação**: o ROV sobe. Na hero ele lê como "sistema em operação", e não como lançamento. Não inverti o plano: água ao contrário se nota.
- A ordem 72 → 32 volta a fechar o quadro antes de abri-lo de novo. É a única quebra da regra "cada plano mais aberto"; ela existe para que o título tenha o seu momento antes do recuo final.
- A vinheta e a compressão do YouTube continuam visíveis.

---

## 4. Cenas para a HERO

### Usar

| Ordem | Plano | Por quê | Dependência para a versão final |
|---|---|---|---|
| 1 | **60** · 2:21.56–2:23.85 | Equipamento subsea com a marca e uma inscrição de engenharia verdadeira no LARS. Abre a hero em "capacidade", não em "navegação" | Bruto em resolução original. 2,3 s é pouco: pedir o take inteiro |
| 2 | **72** · 2:49.04–2:56.43 | ROV, guindaste, equipe e costado no mesmo quadro: o sistema em uma imagem | Bruto. Saber se existe o mesmo ângulo num lançamento (ROV descendo) |
| 3 | **32** · 1:25.96–1:30.30 | O ROV some na água: "esta é a parte visível" acontece na imagem | Bruto |
| 4 | **34** · 1:34.26–1:39.0 | Casco verde, nome do navio e FPSO, de dia. É a passagem natural para o ato 02 | Bruto. O plano 26 (mesma cena, mais aberto) ficaria melhor como último degrau, mas tem letreiro: precisa do original sem texto |

### Reserva

| Plano | Uso |
|---|---|
| **28** · ROV no LARS ao entardecer | Substitui o 60 numa versão de luz baixa |
| **22** e **7** · ROV entrando na água e faróis junto ao costado, à noite | Uma versão noturna inteira da hero é possível, com 22 → 7 → 33. Mais dramática, menos clara |
| **81**, **39** · embarcação em mar aberto | Início do ato 02 |

### Não usar na hero

- Planos com letreiro, enquanto não houver o original sem texto.
- Planos 13, 14, 15: imagem de câmera de ROV com telemetria e ordens de serviço. Exigem avaliação de confidencialidade.
- Plano 74: a plataforma mostra o nome do cliente.
- Mergulhadores (41–47, 56, 67): bons para o ato 03, mas na hero levariam de volta ao erro de reduzir a empresa a mergulho.
- Planos 1, 2, 3, 82: pôr do sol, tartaruga, mergulho recreativo. Fora do assunto.
- Planos 83–85: animação de radar. É o tipo de HUD que o brief proíbe.

---

## 5. O que pedir antes do storyboard definitivo

1. Os brutos dos planos 60, 72, 32, 34 e 26, em resolução original, sem letreiro e sem cor.
2. Os takes inteiros, e não só o trecho montado: a hero precisa de mais tempo por plano do que o vídeo usou.
3. Saber se o ROV do plano 60 e o do plano 32 são o mesmo equipamento, e qual é o modelo. Se forem iguais, o corte 60 → 32 vira continuidade de personagem.
4. Autorização de uso, com escopo e prazo.
5. Contato da produtora.

Se os brutos não existirem, o plano B é ampliar estes trechos. Isso exige créditos e a sua autorização, e a palavra "Oceânica" no ROV tem de ser conferida letra a letra depois da ampliação.
