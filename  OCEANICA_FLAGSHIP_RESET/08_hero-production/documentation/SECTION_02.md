# Seção 02 · Escala operacional

Data: 18/11/2026. Endereço: `http://localhost:4173/#escala`. Nada publicado.

A seção substitui o estudo que estava abaixo da hero. Está nas duas páginas (`index.html`, por scroll, e `autoplay.html`).

> **Atualização de 18/11/2026:** o número de Pessoas passou de "2.300+" (site, sem data) para **2.391 colaboradores**, do quadro de pessoal do Release 3T26. As tabelas abaixo registram a versão anterior. Ver `SECTION_06.md`, "Mudança na seção 02".

## O que é

Uma página de registro, não um painel de contadores. Fundo claro, depois do filme escuro: é a primeira alternância de tom do site.

1. **Cabeçalho:** o número do capítulo e o nome, com o único ponto verde da seção.
2. **Abertura:** o título "A dimensão da Oceânica." em corpo grande e, ao lado, uma frase de apresentação.
3. **Cinco linhas,** uma por indicador, na ordem do filme, da superfície para o fundo: Experiência, Frota, Pessoas, ROVs, Capacidade operacional. Cada linha tem o número em corpo muito grande, a unidade, uma frase de contexto, a fonte e uma fotografia real que dá lastro físico ao número.
4. **Nota de rodapé** sobre a situação das imagens e dos números.

## Movimento

- Nenhum número conta nem gira. O número já está lá.
- Cada linha entra uma vez, quando chega à tela: o fio superior corre da esquerda para a direita, o número e o texto sobem 22 px, a fotografia se abre de cima para baixo.
- Com movimento reduzido, tudo aparece parado.

## Números e fontes

Conferidos em 18/11/2026.

| Indicador | Valor | Fonte | Texto da fonte |
|---|---|---|---|
| Experiência | 48 anos | Release de Resultados 3T26, 12/11/2026 | "Há 48 anos, somos uma empresa brasileira que desenvolve soluções submarinas para o mercado de óleo e gás" |
| Frota | 18 embarcações | Release 3T26 | "contamos com uma frota de 18 embarcações e 19 ROVs Work Class" · "18 embarcações · Frota operacional" |
| Pessoas | 2.300+ colaboradores | Site, home e Investidores | "+ 2.300 colaboradores" |
| ROVs | 56 veículos | Site, home e Investidores | "56 ROVs em 2026" |
| ROVs Work Class | 19 | Release 3T26 | "19 ROVs Work Class" |
| Capacidade | 3.000 m | Release 3T26 | "capazes de operar em profundidades de até 3.000 metros" |

O release é o documento oficial em `oceanica.com.br/investidores`, bloco 3T26. Li o texto do PDF (22 páginas).

**O que mudou em relação ao estudo anterior:** a frota de 18 embarcações agora tem fonte atual; antes vinha do release 1T26 e aparecia em cinza. Os tipos SDSV, RSV e AHTS constam do quadro "Status das embarcações" do mesmo release.

**Pontos de atenção:**

- **56 ROVs** é número do site, sem data além de "em 2026". O release só informa os 19 Work Class. A linha "Dezenove são Work Class" junta as duas fontes; a Oceânica precisa confirmar que os números são compatíveis.
- **2.300+ colaboradores** não aparece no release 3T26. Vem só do site.
- **Mergulhadores ficaram de fora:** o site diz "+300", ">300" e "+ 350" em páginas diferentes.
- **48 anos** vira 49 em 2027.
- **Backlog (R$ 10,3 bilhões) e contratos ativos (46)** estão no release e não entraram: são números para investidor, e esta seção fala de porte operacional. Ficam disponíveis para o capítulo de confiança.

## Textos

| | Português | Inglês |
|---|---|---|
| Título | A dimensão da Oceânica. | The scale of Oceânica. |
| Apresentação | Há 48 anos desenvolvemos soluções submarinas para o mercado de óleo e gás, nas frentes de prevenção, contingência e engenharia. | For 48 years we have developed subsea solutions for the oil and gas market, across prevention, contingency and engineering. |
| Experiência | Empresa brasileira, em atividade desde 1978. | A Brazilian company, operating since 1978. |
| Frota | Frota operacional de SDSV, RSV e AHTS. | Operational fleet of SDSVs, RSVs and AHTS vessels. |
| Pessoas | Mergulhadores, pilotos de ROV, tripulações e engenharia. | Divers, ROV pilots, crews and engineering. |
| ROVs | Dezenove são Work Class. | Nineteen are Work Class. |
| Capacidade | ROVs Work Class capazes de operar a até 3.000 metros. | Work Class ROVs able to operate at up to 3,000 metres. |

A frase de apresentação é quase literal do release da própria empresa. As demais são propostas minhas, factuais e curtas, sujeitas à validação. Em inglês os milhares usam vírgula (2,300 e 3,000); a troca é automática.

## Imagens

| Linha | Imagem | Origem |
|---|---|---|
| Experiência | Profissional de costas, com a marca no uniforme | Vídeo "47 anos", 1:07 |
| Frota | Embarcação de casco verde, ponte Rio–Niterói ao fundo | Vídeo "47 anos", 1:11 |
| Pessoas | Equipe reunida em galpão, vista de cima | Vídeo "47 anos", 1:03 |
| ROVs | ROV Work Class no convés | Vídeo "47 anos", 1:18 |
| Capacidade | ROV na coluna d'água, faróis acesos | Vídeo institucional, 0:58 |

Todas são quadros de vídeo, não fotografias. **Nenhuma está liberada.** Cada uma tem duas larguras em WebP (800 e 1600 px) e um JPG de reserva; o navegador escolhe. O peso total das cinco, na maior versão, é 416 KB, carregadas só quando a seção se aproxima da tela.

## O que foi verificado

- 17 capturas da seção, em 1440 × 900, 1920 × 1080, 768 × 1024, 390 × 844 e 360 × 640, em português e inglês (`screens-scroll/secao02-*`). Nenhuma tem rolagem horizontal.
- No navegador embutido: as linhas ganham o estado de entrada quando chegam à tela; a troca de idioma muda títulos, textos, textos alternativos das imagens e o separador de milhar, nos dois sentidos; sem erros no console.

## O que não foi verificado

- A entrada das linhas em movimento. Conferi o estado antes e depois, não a animação.
- Safari e iPhone.
- Contraste medido do texto cinza pequeno (fontes e rodapé); avaliei no olho.

## Limitações

1. **A imagem da linha Experiência é a mais fraca como ideia.** Não há material de acervo (base de Macaé, primeiros navios). Usei a marca no uniforme. Uma fotografia histórica da empresa resolveria.
2. **A imagem da Frota é costeira** e mostra uma embarcação só. Uma imagem com mais de um navio, ou em campo, diria "frota" de verdade.
3. **A imagem da Capacidade é de baixa definição** (vídeo institucional), e não se sabe a profundidade em que foi feita.
4. **Pessoas identificáveis** nas linhas Experiência (de costas) e Pessoas.
5. **A seção não termina em uma ação nem em passagem para o capítulo 03,** porque ele ainda não existe.

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/scale.css` | Estilos da seção |
| `web/js/scale.js` | Textos nos dois idiomas e entrada das linhas |
| `web/media/s02-*` | As cinco imagens |
| `design/section-02_desktop-board.jpg`, `section-02_mobile-board.jpg` | Pranchas |
| `documentation/screens-scroll/secao02-*` | Capturas |

Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao02` (servidor ligado).
