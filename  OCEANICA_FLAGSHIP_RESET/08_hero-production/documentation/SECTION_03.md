# Capítulo 03 · Capacidades

Data: 18/11/2026. Endereço: `http://localhost:4173/#capacidades`. Nada publicado.

Está nas duas páginas (`index.html`, por scroll, e `autoplay.html`), logo depois da seção 02.

## O que é

Os cinco pilares em um só lugar, como capacidades de uma mesma operação, e não como cinco blocos soltos.

- **Tom:** escuro. Depois do filme (escuro) e da seção 02 (clara), é a segunda alternância da página.
- **Abertura:** o número e o nome do capítulo, o título "Uma operação integrada." e uma frase de apresentação.
- **Palco fixo:** à esquerda, a lista das cinco capacidades; à direita, uma fotografia grande. A rolagem avança de uma capacidade para a seguinte: o nome ativo acende, o texto dela se abre, a fotografia troca. Um fio vertical e o contador "03 / 05" mostram a posição.
- **Ordem:** Embarcações, Mergulhadores, ROVs, Engenharia, Tecnologia, a ordem dos pilares do briefing.
- **Cada capacidade tem** uma frase, um ou dois fatos curtos e a fonte.
- **Clique:** o nome de cada capacidade é um botão que leva ao seu ponto da rolagem.
- **Telas estreitas:** sem palco fixo. As cinco capacidades viram blocos em sequência, cada um com a sua imagem.

Nada é sequestrado: é a rolagem normal da página. O palco ocupa 3,5 telas de rolagem no desktop.

## Textos e fontes

Título e frases de contexto são propostas minhas, sujeitas à validação. A frase de apresentação é quase literal do release da empresa.

| | Texto | Fonte |
|---|---|---|
| Título | Uma operação integrada. | Proposta |
| Apresentação | Atuamos nas frentes de prevenção, contingência e engenharia, mitigando os riscos ambientais das atividades de nossos clientes e contribuindo para a extensão da vida útil de seus ativos. | Release 3T26, "Quem somos" |
| Embarcações | Dezoito embarcações em operação, entre unidades de apoio a mergulho, de apoio a ROV e de manuseio de âncoras. · SDSV, RSV e AHTS · SDSV com posicionamento dinâmico DP2 | Release 3T26 (18 embarcações; quadro por tipo). Site: "Embarcações SDSVs (Shallow Dive Support Vessel) com posicionamento dinâmico (DP2)" |
| Mergulhadores | Inspeção, manutenção e reparo de ativos submarinos em operações com mergulhadores. · Centro de Treinamento em Rio das Ostras desde 2012 | Site: "atividades de inspeção, manutenção e reparo (IRM) através de operações com mergulhadores e ROVs"; "possui um Centro de Treinamento na base de Rio das Ostras (RJ), desde 2012" |
| ROVs | Cinquenta e seis ROVs para inspeção e intervenção. Dezenove são Work Class, capazes de operar a até 3.000 metros. · Primeiro contrato Work Class em 2020 | Site: "56 ROVs em 2026"; linha do tempo 2020, "Primeiro contrato Work Class ROV (RSV)". Release 3T26: "19 ROVs Work Class, capazes de operar em profundidades de até 3.000 metros" |
| Engenharia | Serviços especializados de engenharia subaquática e um departamento que projeta, desenvolve e implementa ferramentas e acessórios para ROVs. · Prevenção, contingenciamento e engenharia | Site: "Serviços especializados de engenharia"; "possuímos um departamento que projeta, desenvolve e implementa ferramentas e acessórios para ROVs" |
| Tecnologia | Centro de Treinamento para ROVs Work Class em Maricá, criado em 2021, e programas de formação de pilotos. · Projeto Mergulhador do Futuro · Programa Trainee de ROV | Site, linha do tempo 2021: "Criação do Centro de Treinamento para ROVs Work Class"; "em Maricá-RJ"; "implementação do projeto Mergulhador do Futuro e dos Programas Trainee de ROV e Trainee de Operações" |

Site lido em 18/11/2026 (home e "A Oceânica"). Release 3T26 de 12/11/2026.

### O que a conferência corrigiu

A pesquisa de 16/11 trazia três afirmações que o site **não sustenta**, e que por isso ficaram de fora:

- **"Setor próprio de projeto de ferramentas desde 2010."** O departamento existe; o site não dá ano. O ano de 2010 na linha do tempo é de outra coisa.
- **"Mergulhador do Futuro forma mergulhadores como pilotos de ROV."** O nome do projeto está no site; a finalidade, não. Usei só o nome.
- **Maricá como base de ROV.** É um centro de treinamento, não uma base operacional.

### Pontos de atenção

- **"Apoio a ROV" e "manuseio de âncoras"** são o significado corrente das siglas RSV e AHTS. O site define só SDSV; o release usa as três siglas sem explicá-las. Confirmar com a Oceânica.
- **O número de mergulhadores não aparece,** porque o site traz três valores diferentes.
- **A alegação "única empresa nacional" de 0 a 3.000 m** está no site e ficou de fora de propósito: é superlativo e precisa de aprovação.
- **"Formação de pilotos"** resume "Programa Trainee de ROV"; o site não usa a palavra pilotos nessa frase.

## Imagens

| Capacidade | Imagem | Origem |
|---|---|---|
| Embarcações | Oceanicasub IX em três quartos, luz baixa | Vídeo "47 anos", 0:06 |
| Mergulhadores | Mergulhador de capacete com a luz acesa | Vídeo "47 anos", 1:16 |
| ROVs | ROV Work Class suspenso no sistema de lançamento | Vídeo institucional, 2:22 |
| Engenharia | Ferramenta de intervenção no convés | Vídeo institucional, 0:42 |
| Tecnologia | Piloto com o controle do manipulador | Vídeo "47 anos", 1:28 |

Todas são quadros de vídeo. **Nenhuma está liberada.** Duas larguras em WebP por imagem (800 e 1600 px) e um JPG de reserva.

## O que foi verificado

- 17 capturas do capítulo: abertura e as cinco capacidades em 1440 × 900 e 390 × 844, mais 1920 × 1080, 1280 × 720, 768 × 1024, 360 × 640 e uma em inglês (`screens-scroll/secao03-*`). Nenhuma tem rolagem horizontal.
- No navegador embutido, em 1440 × 900: a 50% da rolagem do palco a terceira capacidade fica ativa, o contador marca "03" e o fio está pela metade; o clique no quinto nome leva à quinta capacidade. Sem erros no console.

## O que não foi verificado

- As transições em movimento (troca da fotografia, abertura do texto). Conferi os estados, não a animação.
- A sensação da rolagem com o scroll suave ligado.
- Safari e iPhone.
- Navegação só por teclado com leitor de tela. Os nomes são botões e todo o texto das cinco capacidades fica no HTML, mas não testei com VoiceOver.

## Limitações

1. **Três das cinco imagens repetem momentos do filme da hero** (embarcação, mergulhador) ou ficam muito próximas dele. Não há outro material de qualidade.
2. **A imagem de Engenharia é a mais fraca.** Mostra uma ferramenta no convés, sem gente e sem projeto; não sei se foi desenhada pela Oceânica.
3. **A imagem de Tecnologia tem um crachá com nome legível.**
4. **Vídeo institucional em baixa definição** nas imagens de ROVs e Engenharia.
5. **A navegação continua clara sobre o capítulo escuro.** Funciona; pode merecer uma versão escura quando houver mais capítulos.
6. **O capítulo não termina em uma ação nem em passagem para o 04,** que ainda não existe.

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/caps.css` | Estilos do capítulo |
| `web/js/caps.js` | Textos nos dois idiomas e o palco |
| `web/media/s03-*` | As cinco imagens |
| `design/section-03_desktop-board.jpg`, `section-03_mobile-board.jpg` | Pranchas |
| `documentation/screens-scroll/secao03-*` | Capturas |

Endereço de teste: `?cap=3` abre na terceira capacidade, sem transições. Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao03` (servidor ligado).
