# 08 · Hero production

Fase: finalização da hero e primeira implementação web. Data: 17/11/2026.
**Publicado em `https://oceanica-landing.vercel.app` desde 19/11/2026,** a pedido de Tiago; como foi feito e como voltar atrás estão em `documentation/DEPLOY.md`. Todo o material de vídeo continua **não liberado** para uso público.

> **Os sete capítulos da página estão no protótipo.** Visão geral, pendências e o que nunca foi verificado: `documentation/PAGE_STATUS.md`.

## Como abrir

```bash
node 08_hero-production/web/server.mjs
```

Depois abra `http://localhost:4173`. O servidor não tem dependências e atende pedidos de intervalo, que o Safari exige para vídeo.

Endereços úteis:

| Endereço | O que mostra |
|---|---|
| `http://localhost:4173/` | **Hero por scroll** (versão escolhida em 17/11/2026): a rolagem conduz o filme. Ver `documentation/SCROLL_HERO.md` |
| `http://localhost:4173/?lang=en` | A mesma, em inglês |
| `http://localhost:4173/#escala` | **Seção 02, Escala operacional.** Ver `documentation/SECTION_02.md` |
| `http://localhost:4173/#capacidades` | **Capítulo 03, Capacidades.** Ver `documentation/SECTION_03.md` |
| `http://localhost:4173/#universe` | **Capítulo 04, Oceânica Universe** (direção em corte, aprovada em 18/11/2026). Ver `documentation/SECTION_04.md` |
| `http://localhost:4173/#solucoes` | **Capítulo 05, Soluções.** Ver `documentation/SECTION_05.md` |
| `http://localhost:4173/#confianca` | **Capítulo 06, Confiança.** Ver `documentation/SECTION_06.md` |
| `http://localhost:4173/#conexao` | **Capítulo 07, Conexão, e rodapé.** Ver `documentation/SECTION_07.md` |
| `http://localhost:4173/?static` | Versão sem filme (a mesma de movimento reduzido e conexão lenta) |
| `http://localhost:4173/?p=0.56` | Rolagem fixada em 56% do filme, para conferir uma cena |
| `http://localhost:4173/?nolenis` | Sem o scroll suave, para comparar |
| `http://localhost:4173/autoplay.html` | Alternativa com autoplay, preservada. Aceita `?t=11` para congelar o filme em 11 s |

Para testar no iPhone: com o computador e o telefone na mesma rede, abra `http://<IP do computador>:4173`.

## Pastas

| Pasta | Conteúdo |
|---|---|
| `source/` | Lista de corte e tratamento (`cut.sh`), script de exportação (`build-film.sh`), tempos das cenas (`timeline.json`), manifesto das fontes (`SOURCES.md`). Os vídeos originais ficam em `../videos/` e não foram tocados |
| `final-video/` | Master limpo (sem texto), masters com títulos em EN e PT, versões web 1080 e 720. Nenhum arquivo tem trilha de áudio |
| `mobile/` | Master e versão web do recorte 3:4 (720 × 960) |
| `poster/` | Poster desktop e mobile em AVIF, WebP e JPG. É o primeiro quadro exato do filme |
| `design/` | Pranchas da hero (desktop e mobile), estudo da transição para a seção 02, camada de títulos dos masters |
| `web/` | A hero implementada: `index.html`, `css/`, `js/`, `fonts/`, `media/`, `server.mjs` |
| `documentation/` | Relatório (`HERO_REPORT.md`), 32 capturas em `screens/`, script de captura (`capture.mjs`) |

## Refazer

```bash
08_hero-production/source/build-film.sh        # reexporta filme, mobile e posters
node 08_hero-production/documentation/capture-scroll.mjs   # capturas da hero por scroll (servidor ligado)
node 08_hero-production/documentation/capture.mjs          # capturas da alternativa com autoplay
```
