# Estado da página · os sete capítulos

Atualizado em 19/11/2026. Protótipo local em `http://localhost:4173`. Nada publicado, nada commitado.

**Os sete capítulos estão aprovados por Tiago como protótipo.** A aprovação é de direção e construção; as pendências de publicação abaixo continuam valendo.

## Os capítulos

| # | Capítulo | Tom | O que é | Situação | Notas |
|---|---|---|---|---|---|
| 01 | Hero | Escuro | Filme de quatro cenas conduzido pela rolagem | Aprovada (versão por scroll) | `SCROLL_HERO.md`, `HERO_REPORT.md` |
| 02 | Escala operacional | Claro | Cinco números com fonte e fotografia | Aprovada | `SECTION_02.md` |
| 03 | Capacidades | Escuro | Palco fixo com os cinco pilares | Aprovada | `SECTION_03.md` |
| 04 | Oceânica Universe | Claro com cena escura | Corte da operação com nove pontos e três frentes | Direção aprovada | `SECTION_04.md` |
| 05 | Soluções | Escuro | Catálogo das três frentes | Aprovada | `SECTION_05.md` |
| 06 | Confiança | Claro | Assinatura, seis evidências, valores | Aprovada | `SECTION_06.md` |
| 07 | Conexão e rodapé | Escuro | Quatro caminhos de contato e rodapé institucional | Aprovada em 19/11/2026 | `SECTION_07.md` |

A alternativa com autoplay da hero continua em `/autoplay.html`, com os mesmos capítulos 02 a 07.

## O que vale para a página inteira

**Feito**

- Português e inglês em todos os capítulos, com troca no topo.
- Composição própria para celular em todos os capítulos.
- Movimento reduzido respeitado em todos.
- Capturas em vários tamanhos de tela para cada capítulo, sem rolagem horizontal.
- Cada número e cada afirmação institucional tem fonte anotada na documentação do capítulo.

**Pendências que bloqueiam a publicação**

1. **Autorizações.** Nenhuma imagem está liberada: são quadros de dois vídeos baixados do YouTube. Há pessoas identificáveis em vários capítulos, uma marca de terceiro e o nome de uma embarcação e de uma unidade de produção.
2. **Arquivos originais.** A fonte é 1080p comprimido. A hero e as fotografias precisam dos originais.
3. **Validação da Oceânica.** Toda a copy proposta, as traduções, os números (em especial 56 ROVs, que vem só do site) e as escolhas do Universe.
4. **Logotipo em vetor.** O disponível tem 211 px.
5. **Indicador de segurança** para o capítulo 06.

**Nunca verificado**

- **Safari e iPhone real.** Nenhum capítulo foi aberto neles. A hero por scroll é o ponto de maior risco.
- **A sensação da página em movimento:** rolagem, scroll suave, transições e entradas. Conferi estados e posições fixas, não o movimento.
- **Tempos de carregamento e memória** em rede e aparelho reais.
- **Teclado e leitor de tela.**
- **Contraste medido** dos textos pequenos.

## Decisões técnicas ainda abertas

- **Base definitiva.** O protótipo é HTML, CSS e JavaScript puros, sem framework e sem etapa de build. Serve para aprovar; a base de produção é uma decisão da próxima fase.
- **Peso.** A hero por scroll baixa de 5 a 11 MB de quadros. As demais imagens somam cerca de 1,5 MB, carregadas sob demanda.
- **Navegação sobre capítulos escuros.** Hoje ela fica sempre clara depois da hero.
- **Dois arquivos de página** (`index.html` e `autoplay.html`) repetem os capítulos 02 a 07. Quando a escolha da hero for definitiva, a alternativa pode ser arquivada.
