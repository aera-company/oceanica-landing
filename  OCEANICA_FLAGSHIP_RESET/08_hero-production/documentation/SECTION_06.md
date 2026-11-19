# Capítulo 06 · Confiança

Data: 18/11/2026. Endereço: `http://localhost:4173/#confianca`. Nada publicado.

Está nas duas páginas, logo depois do capítulo 05.

## O que é

A consistência institucional da Oceânica, mostrada com evidências que têm fonte, e não com adjetivos.

- **Tom:** claro, depois do capítulo 05, escuro.
- **Abertura:** a assinatura oficial da empresa, em corpo grande, identificada como tal: "Ativos mais seguros para um mundo mais limpo." É o único capítulo cujo título não é proposta minha.
- **Seis evidências** em grade de três colunas: Certificações, Contratos, Reconhecimento, Prêmios, Sustentabilidade, Ética e governança. Cada uma tem uma frase e a fonte.
- **Uma fotografia** em toda a largura: a equipe reunida, de frente.
- **Os seis princípios e valores** do site, em uma linha.
- **Celular:** as evidências viram uma coluna só; a fotografia fica em 4:3.

Sem selos, sem logotipos de certificadoras, sem contadores.

## Evidências e fontes

Release de Resultados 3T26 (12/11/2026) e site oficial, lido em 18/11/2026.

| Evidência | Texto na página | Fonte |
|---|---|---|
| Certificações | ISO 9001, ISO 14001 e ISO 45001, obtidas há mais de dez anos. Organismo de inspeção conforme a ABNT NBR ISO/IEC 17020. | Site, página de SMS: "certificações ISO 9001, ISO 14001, ISO 45001, que comprovam sua capacitação e foram obtidas há mais de 10 anos"; "ABNT NBR ISO/IEC 17020:2012" |
| Contratos | Quarenta e seis contratos ativos e R$ 10,3 bilhões em receitas contratadas, que se estendem até 2030 e 2031. | Release: "46 contratos ativos"; "O backlog da Oceânica atingiu R$ 10,3 bilhões"; "o backlog de receitas contratadas se estende até 2030/2031" |
| Reconhecimento | Reconhecida pela Petrobras, em 2026, por contribuir para a formação dos primeiros 50 supervisores IMCA do Brasil. | Release: "foi reconhecida pela Petrobras por sua contribuição para a formação dos primeiros 50 supervisores IMCA do Brasil" |
| Prêmios | Prêmio Petrobras Melhor Fornecedor em Serviços de Mergulho e Destaque de SMS, em 2018. | Site, linha do tempo 2018: "Prêmio Petrobras Melhor Fornecedor na Área de Serviços de Mergulho e Prêmio Petrobras Melhor Fornecedor como Destaque de SMS" |
| Sustentabilidade | Quarto Relatório de Sustentabilidade consecutivo. Projeto Praia Limpa, com colaboradores e comunidade em limpeza de praias e educação ambiental. | Release: "publicou seu quarto Relatório de Sustentabilidade consecutivo"; "projeto Praia Limpa, que reuniu colaboradores e membros da comunidade em ações de limpeza de praias e educação ambiental" |
| Ética e governança | Código de Ética e Conduta, compliance, auditoria interna e canal de denúncia seguro e anônimo, 24 horas por dia. | Site: "Código de Ética, Compliance, Canal de Denúncia, Auditoria Interna"; "Disponibilizamos um canal SEGURO e ANÔNIMO"; "24 horas e 7 dias por semana" |
| Assinatura | Ativos mais seguros para um mundo mais limpo. | Site, home e "A Oceânica" |
| Valores | Ética · Excelência com senso de dono · Segurança · União · Inovação · Sustentabilidade | Site, "Princípios e valores", na mesma ordem |

### Divergências que encontrei nas fontes

- **Versão da ISO 45001.** A página de SMS diz "ISO 45001:2018"; a home e a página de Investidores dizem "ISO 45001:2015". A página não cita ano de versão para evitar o conflito. A Oceânica precisa informar os certificados vigentes.
- **Relatório de Sustentabilidade.** O release 3T26 fala no quarto relatório consecutivo. A página de Sustentabilidade do site ainda diz que o primeiro está "em processo de elaboração". Segui o release, que é o documento datado e mais recente. O site está desatualizado nesse ponto.
- **Projeto Praia Limpa** aparece no release e não no site.
- **Prêmio PEOTRAM,** citado na pesquisa de 16/11 a partir do release 1T26, não aparece no site nem no release 3T26. Ficou de fora.
- **Segurança em números.** A pesquisa de 16/11 trazia dados do Relatório de Sustentabilidade 2023 (zero óbitos, horas trabalhadas). Não achei o relatório no site e não o reli, então esses números não entraram. Um indicador de segurança atual e datado seria a evidência mais forte deste capítulo, e falta.

### Fora de propósito

- "94% da receita com a Petrobras", que está no release: é concentração de cliente, não evidência de confiança.
- As classificadoras que o site lista ("ABS, BV, DBV e Lloyds Register"): há um erro de grafia na fonte, e não sei qual entidade é "DBV".
- Dados de treinamento de 2020 ("49.350 treinamentos"): antigos.

## Mudança na seção 02

Ao ler o release, achei o quadro de pessoal: **2.391 colaboradores no 3T26** (2.106 homens e 285 mulheres). A seção 02 mostrava "2.300+", do site, sem data. Troquei por 2.391, com a fonte "Release 3T26". Agora quatro dos cinco números da seção 02 vêm do mesmo documento datado; só os 56 ROVs continuam vindo do site.

## O que foi verificado

- 12 capturas do capítulo: abertura, evidências e imagem em 1440 × 900; evidências em 1920 × 1080; abertura e evidências em inglês; quatro posições em 390 × 844; mais 768 × 1024 e 360 × 640 (`screens-scroll/secao06-*`). Uma captura da seção 02 com o número novo. Nenhuma tem rolagem horizontal.
- No navegador embutido, sem erros no console: as seis evidências ganham o estado de entrada ao chegar à tela; a troca para inglês muda assinatura, textos e a descrição da imagem; na seção 02 o número aparece como 2.391 em português e 2,391 em inglês.

## O que não foi verificado

- A entrada dos blocos em movimento.
- Safari, iPhone, teclado e leitor de tela.
- Contraste medido do texto cinza pequeno.

## Limitações

1. **Falta um indicador de segurança.** O capítulo fala de confiança em uma empresa cuja prioridade declarada é a segurança, e não mostra nenhum número de segurança.
2. **A assinatura em inglês é tradução minha** ("Safer assets for a cleaner world."). Se a Oceânica tiver uma versão oficial em inglês, ela deve substituir esta.
3. **A fotografia mostra dezenas de pessoas identificáveis** e é do mesmo momento da imagem de Pessoas da seção 02, vista de outro ângulo.
4. **Só a Petrobras aparece como cliente,** em duas das seis evidências. É o que as fontes sustentam.
5. **As evidências são texto.** Não há link para certificado, relatório ou release.
6. **O capítulo não leva ao 07,** que ainda não existe.

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/trust.css` | Estilos |
| `web/js/trust.js` | Textos nos dois idiomas e entrada dos blocos |
| `web/media/s06-crew*` | A fotografia |
| `design/section-06_desktop-board.jpg`, `section-06_mobile-board.jpg` | Pranchas |
| `documentation/screens-scroll/secao06-*` | Capturas |

Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao06` (servidor ligado).
