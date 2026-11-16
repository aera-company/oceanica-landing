# HERO V4 · Blueprint da experiência por scroll

Data: 16/11/2026. Documento de lógica para a implementação futura. **A landing não foi implementada.**

## 1. Princípio

**O scroll controla a janela, e não o vídeo.**

- Cada plano toca na própria velocidade, em loop curto, dentro da janela.
- A rolagem decide três coisas: qual plano está na janela, o tamanho da janela e quando a headline aparece.
- O visitante nunca assiste a 26 segundos parado. Ele avança quando quer, e a página nunca prende a rolagem.

## 2. Estrutura

A hero é uma seção com altura de cerca de 4,5 telas. O palco fica fixo (`position: sticky`) e a rolagem dentro da seção vai de 0 a 1.

| Progresso | Capítulo | O que acontece | Vídeo |
|---|---|---|---|
| 0 | **Primeiro quadro** | Garra na janela 600 × 820, logo, indicador "Role". Funciona como imagem parada | Pôster JPG da garra; o clipe começa a tocar quando entra na tela |
| 0 – 0,08 | Detalhe | "Esta é" entra (opacidade amarrada à rolagem). Janela fixa | Garra em loop |
| 0,08 – 0,20 | Detalhe | Troca seca para o braço na mesma janela. "a parte · visível." | Braço em loop |
| 0,20 – 0,50 | Pessoa e máquina | A headline sai. A janela cresce aos poucos com a rolagem; os planos trocam em pontos fixos (0,28 · 0,38) | Piloto → ROV no LARS → ROV na água |
| 0,50 – 0,62 | Operação | Sub V junto à unidade, janela grande | Sub V em loop |
| 0,62 – 0,66 | Contração | Corte para a janela pequena na embarcação | Plano 74 |
| **0,66 – 0,90** | **Big Reveal** | **A abertura da janela é amarrada à rolagem**: o visitante abre a operação com o próprio gesto | Plano 74 tocando |
| 0,90 – 1 | Assinatura | Assinatura "Oceânica · Engenharia offshore e subsea · desde 1978". O palco solta e a página segue para o capítulo seguinte (frota, ROVs, pessoas, com fonte) | Plano 74 em loop |

**Regras:**

- **As trocas de plano são cortes**, disparados quando a rolagem cruza um ponto. Nunca há fusão entre fontes.
- **Só o tamanho da janela é contínuo.** É a única coisa que a rolagem anima de forma suave.
- **Nada de scrub de vídeo**, que fica pesado e trava com rolagem rápida. Cada clipe toca normalmente.
- **Rolagem rápida não perde a revelação.** Se o visitante atravessar a seção em menos de um segundo, a janela vai direto ao estado final e o plano 74 continua tocando.

## 3. Mobile

- **Composição própria:**
  - janela vertical de 420 × 620;
  - "Esta é" no alto, "a parte" no alto e "visível." embaixo;
  - na revelação, faixa final de 720 × 493.
- **Altura da seção:** cerca de 3,5 telas.
- **Clipes próprios:** recortes verticais renderizados para cada plano (até 720 × 900, H.264). Não se baixa o 1080p.
- **Barra do navegador:** a altura usa `100svh`, para a barra não empurrar o palco.

## 4. Movimento reduzido

Com `prefers-reduced-motion: reduce`:

- **Nenhum vídeo toca.** Cada capítulo mostra o quadro-chave (os mesmos de `frames/`).
- **Os quadros trocam por corte** conforme a rolagem.
- **A janela não anima.** Muda de tamanho só na troca de quadro.
- **A revelação vira dois quadros:** a janela fechada e a janela aberta.
- **A headline aparece inteira**, sem fade.

## 5. Carregamento

| Ordem | O quê | Tamanho estimado |
|---|---|---|
| 1 | Pôster da garra (AVIF ou WebP, 600 × 820) e a fonte da headline (subconjunto) | ~60 KB + ~30 KB |
| 2 | Clipe da garra e do braço (só o recorte da janela, 600 × 820, ~3 s cada) | ~0,6 MB cada |
| 3 | Os clipes seguintes, quando o anterior começa a tocar, um à frente | 0,8 – 1,5 MB cada |
| 4 | Plano 74 (1920 × 740), quando a rolagem passa de 0,4 | ~3 MB |

**Regras:**

- **Cada clipe é codificado já recortado no tamanho máximo da sua janela.** Ninguém baixa pixels que nunca aparecem.
- **Formatos:** AV1 com H.264 de reserva.
- **Conexão lenta** (`navigator.connection.saveData` ou rede 2G/3G): os mesmos quadros do modo de movimento reduzido.
- **Sem vídeo carregado:** a seção funciona com os pôsteres.

## 6. Acessibilidade

- **Texto real:** a headline é um `<h1>` ("Esta é a parte visível."), lido inteiro pelo leitor de tela, mesmo dividido visualmente.
- **Vídeos decorativos:** marcados com `aria-hidden`. A seção tem uma descrição curta: "Equipamento, equipe e embarcação da Oceânica em operação offshore."
- **Navegação:** o indicador "Role" é decorativo. Tab e as teclas de página funcionam normalmente.
- **Controle:** um botão discreto de pausar vídeo fica disponível.

## 7. O que valida a pré-visualização

Os animatics (`animatic-v4.mp4`, `animatic-v4-mobile.mp4`) são a leitura linear dessa sequência, com a rolagem em velocidade constante. O que eles **não** mostram:

- os loops de cada plano;
- a parada do visitante num capítulo;
- a abertura da janela no ritmo da mão.

Esses pontos só se validam com um protótipo de scroll, que fica para a fase de implementação, com aprovação.
