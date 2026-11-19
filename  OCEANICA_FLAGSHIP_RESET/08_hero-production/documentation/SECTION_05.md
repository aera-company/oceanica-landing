# Capítulo 05 · Soluções

Data: 18/11/2026. Endereço: `http://localhost:4173/#solucoes`. Nada publicado.

Está nas duas páginas, logo depois do Universe.

## O que é

A tradução das capacidades em oferta: o que a Oceânica vende, organizado nas três frentes do próprio site.

- **Tom:** escuro, depois do Universe, que termina claro.
- **Abertura:** número e nome do capítulo, o título "Três frentes de atuação." e uma frase de apresentação.
- **Três colunas,** uma por frente: Prevenção, Contingenciamento e Engenharia. Cada uma tem o nome, uma frase, a contagem de serviços e a lista completa, separada por fios.
- **Ativos** aparece como uma quarta linha, abaixo das três, porque no site é uma aba e não uma frente: é a base que atende as outras.
- **"Ver no corte":** cada coluna tem um botão que volta ao Universe já com aquela frente selecionada. Liga o catálogo ao desenho, para o capítulo não ser uma lista solta.
- **Sem fotografia.** É o capítulo de informação precisa; a imagem está nos capítulos anterior e seguinte.
- **Celular:** as colunas viram blocos em sequência e cada lista é uma sanfona, fechada por padrão, com a contagem à mostra.

Não há contadores, cartões nem ícones.

## Conteúdo e fontes

Tudo vem do site oficial, lido em 18/11/2026 (home e página de Prevenção). Os nomes dos serviços seguem o site, com pequenas reduções para caber em uma linha.

### 01 · Prevenção, 9 serviços

Frase: "Inspeção, manutenção e reparo (IRM) em águas rasas e profundas, com mergulhadores e ROVs."
Base no site: "Realizamos atividades de inspeção, manutenção e reparo (IRM) através de operações com mergulhadores e ROVs"; menu "Prevenção em águas rasas e profundas".

| Na página | No site |
|---|---|
| Ensaios não destrutivos por inspeção submarina (END) | "Ensaios não destrutivos através de técnica de inspeção submarina (END)" |
| Apoio em operações nos FPSOs | "Apoio em Operações nos FPSOs" |
| Pull-in e pull-out | "Pull-in / Pull-out" |
| Prevenção com mergulhadores e ROVs a partir de SDSVs | "Serviço de prevenção com mergulhadores e/ou ROV utilizando SDSVs" |
| Afretamento de SDSV para prevenção | "Serviço de afretamento para prevenção utilizando SDSVs" |
| Inspeção em mangotes de terminais oceânicos | "Inspeção em mangotes (terminais fixos oceânicos)" |
| Embarcações Pai e Filho | "Embarcações Pai e Filho" |
| Operações diverless | "Operações Diverless" |
| UWILD, inspeção subaquática em substituição da docagem | "Inspeção Subaquática em Substituição da Docagem", na subpágina; não está na lista da home |

### 02 · Contingenciamento, 4 serviços

Frase: "Intervenção submarina e reparo de dutos para a indústria de óleo e gás."

| Na página | No site |
|---|---|
| Intervenção submarina e serviços customizados | "(i) Intervenção Submarina e Serviços Customizados" |
| Reparo de dutos rígidos e contingência | "(ii) Reparo de Dutos Rígidos e Contingência" |
| Ferramentas de contenção e resposta em cenários de blow out | "operação de ferramentas para contenção/resposta em cenários de blow out em equipamentos submarinos" |
| Operações especiais de manutenção, intervenção e instalação submarinas | "operações especiais de manutenção, intervenção e instalação submarinas" |

**Atenção:** o site não traz uma lista de serviços nesta frente, só duas frentes nomeadas e frases de texto corrido. Os quatro itens foram montados por mim a partir dessas frases. É a coluna que mais precisa de validação.

### 03 · Engenharia, 8 serviços

Frase: "Serviços especializados de engenharia subaquática: construção e montagem, novas instalações e obras EPCistas."
Base no site: "serviços específicos de engenharia subaquática, que envolvem construção e montagem, novas instalações, obras EPCistas".

Os oito itens são a lista "Soluções de Engenharia" da home, na mesma ordem: instalação de estruturas como PLEM e PLAT; comissionamento e descomissionamento de dutos; teste hidrostático; instalação de risers e manifolds; reparo de dutos submarinos com conectores mecânicos; lançamento de cabos e dutos submarinos; operações em áreas classificadas de instalação offshore; pull-in e pull-out.

### 04 · Ativos

Frase: "As três frentes são atendidas pela mesma base de ativos." O site diz que as embarcações atendem Prevenção, Engenharia e Contingenciamento.
Itens: Embarcações; ROVs de inspeção e de intervenção ("Temos uma frota composta por ROVs de Inspeção e Intervenção."); ferramentas e acessórios desenvolvidos pela Oceânica ("projetam, desenvolvem e implementam ferramentas e acessórios").

### Textos meus, sujeitos à validação

- O título "Três frentes de atuação." e a frase de apresentação.
- A frase de Contingenciamento.
- As versões em inglês. Dois termos merecem revisão de quem é da área: "Mother and daughter craft operations" para "Embarcações Pai e Filho" e "in lieu of dry-docking" para UWILD.

### O que ficou de fora de propósito

O site afirma ser "a maior empresa nacional em contingenciamento e intervenção subsea" e "pioneira e única" em um serviço. São superlativos e precisam de aprovação antes de aparecer.

## O que foi verificado

- 12 capturas: abertura, colunas e fim em 1440 × 900; colunas em 1920 × 1080, 1280 × 720 e em inglês; abertura, sanfonas fechadas, abertas e fim em 390 × 844; mais 768 × 1024 e 360 × 640 (`screens-scroll/secao05-*`). Nenhuma tem rolagem horizontal.
- No navegador embutido, em 1440 × 900, sem erros no console:
  - as três colunas ganham o estado de entrada ao chegar à tela e as listas ficam abertas;
  - o botão "Ver no corte" de Contingenciamento rolou a página até a cena do Universe, deixou a frente Contingenciamento selecionada e o cartão no primeiro ponto dela.

### Um defeito encontrado e corrigido

Na primeira versão a palavra "Contingenciamento" quebrava no meio, no desktop e no celular. Reduzi o corpo dos títulos das colunas para que a palavra mais longa caiba inteira.

## O que não foi verificado

- A entrada das colunas em movimento.
- As sanfonas com toque em telefone real.
- Safari e iPhone.
- Teclado e leitor de tela. As sanfonas usam o elemento nativo do navegador, mas não testei com VoiceOver.

## Limitações

1. **As três colunas têm alturas muito diferentes** (9, 4 e 8 itens). A do meio fica com um vazio grande embaixo no desktop.
2. **Capítulo sem imagem.** É uma escolha; se parecer árido, uma fotografia por frente resolveria, e hoje só há material fraco para isso.
3. **Não há chamada para contato.** O capítulo de conexão ainda não existe, então as colunas terminam no botão que volta ao Universe.
4. **Os serviços não têm página própria.** São linhas de texto, não links.
5. **No inglês, o botão diz "See it in the section",** que é uma tradução frouxa de "Ver no corte".

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/solutions.css` | Estilos |
| `web/js/solutions.js` | Textos nos dois idiomas, sanfonas e ligação com o Universe |
| `design/section-05_desktop-board.jpg`, `section-05_mobile-board.jpg` | Pranchas |
| `documentation/screens-scroll/secao05-*` | Capturas |

Endereço de teste: `?goto=solucoes&off=520` rola até o capítulo mais 520 px, sem transições; `&open=1` abre as sanfonas. Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao05` (servidor ligado).
