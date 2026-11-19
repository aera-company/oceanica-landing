# Animatic da hero · KV1 na abertura

Data: 17/11/2026. Arquivo: `animatic-hero-kv1.mp4` · 28,4 s · 1920 × 1080 · 23,976 qps · sem som.

É um animatic: serve para julgar ordem, ritmo, frases e passagens. Não é a hero. Todo o material é cópia do YouTube, **não liberado**; o aviso está escrito no topo do quadro.

## Sequência

| Tempo | Ato | Plano | Origem | Velocidade | Frase | Passagem de saída |
|---|---|---|---|---|---|---|
| 0,0 – 4,6 s | 1 · Embarcações | Proa de frente | V2 0:57.35 (plano 14) | 0,45× | Grande na superfície. *Maior abaixo dela.* + frase de apoio | O quadro fecha em direção à linha d'água e escurece |
| 4,6 – 7,9 s | 2 · Mergulhadores | Mergulhador de capacete | V2 1:15.05 (plano 21) | 0,65× | Ninguém desce sozinho. | A imagem estoura em branco |
| 7,9 – 11,4 s | 3 · ROVs | ROV entra na água | V1 1:26.3 (plano 32) | 1× | Onde o corpo para, a máquina continua. | Corte seco |
| 11,4 – 14,7 s | 3 · ROVs | Garra do manipulador | V2 1:29.9 (plano 28) | 1× | (a mesma frase continua) | Corte seco, no gesto |
| 14,7 – 17,9 s | 4 · Tecnologia | Piloto com o controle | V2 1:27.3 (plano 27) | 0,75× | A mão que trabalha a 3.000 metros está aqui em cima. | Corte seco |
| 17,9 – 20,0 s | 5 · Engenharia | Ferramenta no convés | V1 0:41.85 (plano 16) | 1× | Nada disso é improviso. | Corte seco |
| 20,0 – 22,8 s | 5 · Engenharia | Içamento de colchões | V1 1:30.5 (plano 33) | 1× | (a mesma frase continua) | Corte seco |
| 22,8 – 28,4 s | Fecho | Oceanicasub V junto ao FPSO | V1 1:34.5 (plano 34) | 0,8× | *Maior abaixo dela.* + 18 embarcações · 55 ROVs · 2.378 pessoas | Escurece |

A régua do rodapé acende o pilar do ato; no fecho, os cinco.

## O que é real e o que é montagem

- **O movimento de cada plano é real.** Nenhum quadro foi gerado.
- **Quatro planos estão desacelerados** com quadros misturados (atos 1, 2, 4 e fecho). No ato 1, a 0,45×, o efeito fantasma na água deve ser visível.
- **A "descida" do fim do ato 1 é um recorte animado** dentro do quadro (aproximação de 1,9× com escurecimento), não um movimento de câmera. A imagem fica macia nesse trecho.
- **A passagem do mergulhador para o ROV é um clarão em branco** feito na montagem. A luz do capacete não cresce de verdade.
- **Todos os outros cortes são secos e declarados.**
- Cor: o vídeo institucional (V1) perdeu 28% de saturação para se aproximar do V2; o mergulhador foi levado para o azul; a garra perdeu metade da cor. Não é correção final.

## O que o animatic mostra

1. **A ordem funciona.** A descida (atos 1 a 3) e a volta (atos 4 e 5) se leem sem explicação.
2. **O corte garra → piloto é o melhor momento.** A frase do ato 4 só faz sentido por causa dele.
3. **O ato 2 é curto demais** (3,4 s, já desacelerado). A frase mais forte da jornada tem o plano mais curto.
4. **O ato 5 é o mais fraco em imagem.** Dois planos do V1, de noite e de dia, sem relação visual entre si.
5. **O fecho não abre o suficiente.** O plano é fechado: a unidade vira uma parede atrás do navio. A frase fecha a ideia; a imagem não entrega a escala prometida.
6. **Três luzes diferentes convivem** (dourado, azul, convés nublado) sem parecerem três vídeos, mas o salto de qualidade entre V2 e V1 se nota.

## Pendências visíveis no quadro

- Crachá do piloto com nome legível (ato 4) e rosto do mergulhador (ato 2): autorização de imagem.
- "Oceanicasub V" legível no fecho; a unidade de produção ao fundo não está identificada.
- Marca "Imenco" na garra.
- Números do fecho marcados como "validar".

## Não feito

- Não assisti em tempo real: revi uma folha de contato (um quadro por segundo) e cinco quadros em tamanho maior. A fluidez dos trechos desacelerados e o tempo de leitura das frases precisam do seu olho.
- Sem versão mobile. O recorte vertical de 1080p perde demais; faz sentido depois de fechar a sequência.
- Sem som.

## Refazer

`animatic/build.sh` monta tudo a partir de `videos/` e das camadas em `ov/`. As frases estão em `overlay.html`; tempos, velocidades e cor, em `build.sh`. `seg/` guarda os oito trechos separados.
