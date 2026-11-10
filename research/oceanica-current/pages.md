# oceanica.com.br · pages visited (observation only)

Fetched 2026-11-10 with curl (generic browser UA), 59 HTTP requests in total (incl. sitemaps, 1 CSS, 12 HEAD on media).
Everything below comes from the fetched HTML. "Not visited" = listed in sitemap but not fetched (request budget).

## Site structure facts

- Sitemap index: https://www.oceanica.com.br/sitemap_index.xml (robots.txt points to it; `/sitemap.xml` and `/wp-sitemap.xml` redirect to it). Sub-sitemaps: post, page (164 `<loc>` entries, about 110 unique), timeline (19 years), noticias (7, all test posts: "teste-1", "mais-um-teste"...), popup, category, author.
- One WordPress install serves BOTH the institutional site and the Investor Relations site. IR is not on a separate domain: it lives under `/investidores/` with its own header/nav and a link "Institucional" back.
- Languages: PT (default) and EN (`/en/`). Flag switch in header (icon-bra.png / icon-en.png). No ES: `/es/` redirects to `/esg/`.
- EN content is stale relative to PT (see facts.md, "Discrepancies").

## Main nav (institutional, PT) · from https://www.oceanica.com.br/

Top utility bar: Instagram · Facebook · LinkedIn · "Minha Oceânica" (https://intranet.oceanica.com.br/) · EN / PT flags · search icon.

1. **A Oceânica** `/a-oceanica/`
   - Quem Somos `#quem-somos`
   - O Que Fazemos `#o-que-fazemos`
   - Missão, Visão e Valores `#missao-visao-valores`
   - Nossas Instalações `#nossas-instacoes` (sic, typo in the anchor)
   - Ética e Transparência `#etica-transparencia`
2. **Serviços** `/servicos/`
   - Prevenção em águas rasas e profundas
   - Contingenciamento
   - Serviços especializados de engenharia
   - Ativos
3. **ESG** (no landing, `#`)
   - Sustentabilidade `/sustentabilidade/`
   - SMS e SGO `/esg/sms/`
4. **Contato** (no landing, `#`)
   - Fale conosco
   - Contatos comerciais
   - Canal de denúncia
   - Cadastre seu currículo
5. **Investidores** `/investidores/`
6. **Portal do Fornecedor** `/portal-fornecedor/`

Footer (home): only "Copyright © 2025 OCEÂNICA | Todos os direitos reservados". A contact strip (phone, email, site) exists in the HTML but is commented out.

## Pages

### Home · https://www.oceanica.com.br/
- Title: "Home Institucional - Oceânica - Engenharia Submarina, Navegação e Soluções Offshore". Meta description is "Relações com Investidores" (wrong for the institutional home).
- H1: "ATIVOS MAIS SEGUROS PARA UM MUNDO MAIS LIMPO" (slick slider, 2 slides, static images, no video).
- Sections (scroll dots): Banner → tabs (Prevenção / Contingenciamento / Serviços especializados de engenharia / Nossos ativos) → Sustentabilidade → "Por que escolher a Oceânica?" with 4 counters → quick access cards (Serviços, A Oceânica).
- H3s: "Prevenção de impactos ambientais através de Inspeção, Manutenção e Reparo (IRM)", "Alguns serviços do portfólio de Prevenção:", "Contingenciamento", "Soluções de Engenharia:", "Ativos", "Equipamentos de Prevenção", "Equipamentos de Contingenciamento", "Embarcações", "ROVs", "Outros Equipamentos", "Sustentabilidade", "Por que escolher a Oceânica?". Two long body paragraphs are wrongly marked up as H3.
- Summary: long text tabs for the three business lines plus assets; the proof numbers only appear at the very bottom. "Saiba mais" buttons in the tabs point to a staging host (`hibr-oceanica.mz-sites.com`).

### A Oceânica · https://www.oceanica.com.br/a-oceanica/
- H1 "A Oceânica". H3: Quem somos · O que Fazemos · Missão, Visão e Valores · Nossas Instalações · Ética e Transparência. H4: HISTÓRICO, VISÃO, MISSÃO, PRINCÍPIOS E VALORES, CENTRO DE TREINAMENTO, Rio da Ostras (RJ), MATRIZ E FILIAIS, Relatório de Igualdade entre Homens e Mulheres, Código de Conduta, Programa de Integridade, Canal de Denúncia. H2: the 19 timeline years (1978 … 2021).
- Summary: single very long page. Who we are, founder story, timeline 1978 to 2021 with photos, a 3-column block with capability numbers (Prevenção / Contingenciamento / Engenharia), an interactive Revolution Slider scene "O que Fazemos" (background mp4 of a rendered offshore field with 14 numbered hotspots), mission/vision/values, training centre, legal entity data and addresses of HQ and branches, ethics, pay-equality reports (PDF), code of conduct, compliance, whistleblowing channel.
- Nav position: item 1.

### Serviços · https://www.oceanica.com.br/servicos/
- H1 "Serviços". Five cards: Prevenção em águas rasas e profundas · Contingenciamento · Serviços especializados de Engenharia · Ativos · Cases.
- Summary: one paragraph per area plus a photo. Nav item 2.

### Prevenção em águas rasas e profundas · https://www.oceanica.com.br/servicos/prevencao-em-aguas-rasas-e-profundas/
- H1 only. Accordion of 10 services, each with photo and 1 to 3 lines (see services.md).
- Sub-pages exist per service (sitemap). Visited one: `/operacoes-diverless/` is an EMPTY page (title + "Voltar").

### Contingenciamento · https://www.oceanica.com.br/servicos/contingenciamento/
- H1 only. Grid of 13 service names with "Leia mais" (no intro text on the page).
- Visited one child: https://www.oceanica.com.br/servicos/contingenciamento/dissociacao-de-hidrato/ · one sentence + 2 photos (1280×720, 1024×576).

### Serviços especializados de engenharia · https://www.oceanica.com.br/servicos/servicos-especializados-de-engenharia/
- H1 only. Accordion of 10 items with photo and short text (see services.md).

### Ativos · https://www.oceanica.com.br/servicos/ativos/
- H1 "Ativos". Intro (2 paragraphs) + 4 icon cards: Equipamentos de Prevenção · Equipamentos de Contingenciamento · Embarcações · ROVs.
- Children visited:
  - https://www.oceanica.com.br/servicos/ativos/embarcacoes/ · H1 "Embarcações", 12 accordion entries (OCEANICASUB XI down to II, ANKH, LDBs), photo + text + PDF datasheet link (api.mziq.com filemanager) per vessel, commercial contact box.
  - https://www.oceanica.com.br/servicos/ativos/rov/ · H1 "ROVs", intro + 9 ROV models each with a spec table, contact box (ROV manager).
  - https://www.oceanica.com.br/servicos/ativos/equipamentos-de-prevencao/ · H1, 1 paragraph + 4 bullet facts on diving systems; three empty H3 and two empty `<img src="">`.
  - https://www.oceanica.com.br/servicos/ativos/equipamentos-de-contingenciamento/ · H1, 8 tools with photo but text "Nenhuma informação adicionada." plus a list "Equipamentos diversos".
  - https://www.oceanica.com.br/servicos/ativos/equipamentos-de-engenharia/ · H1 and only a commercial contact box (no content).
  - https://www.oceanica.com.br/servicos/ativos/outros-equipamentos/ · H1, "Expertise da equipe técnica" + list "Equipamentos desenvolvidos".

### Cases · https://www.oceanica.com.br/servicos/cases/
- H1 "Cases", one generic paragraph, NO cases listed.

### Sustentabilidade · https://www.oceanica.com.br/sustentabilidade/
- H1 "Sustentabilidade", H3 "Sustentabilidade". Three icon columns (Ambiental / Governança / Social) + long text. Says the first annual sustainability report is "em processo de elaboração".

### SMS e SGO · https://www.oceanica.com.br/esg/sms/
- H1 "SMS e SGO". H3: Saúde e Segurança · Certificações · Sistema de Gestão Oceânica (SGO) · Política do SGO. Six 100×100 certification badge images (no alt).

### ESG (stubs)
- https://www.oceanica.com.br/esg/ · https://www.oceanica.com.br/esg/social/ · https://www.oceanica.com.br/esg/governanca/ · all three are EMPTY (H1 + "Voltar").

### Contato
- https://www.oceanica.com.br/contato/fale-conosco/ · H1 "Fale conosco"; email + phones + Contact Form 7 (Nome*, E-mail*, Telefone, Empresa, Mensagem*, consent checkbox, reCAPTCHA).
- https://www.oceanica.com.br/contato/contatos-comerciais/ · H1; three named contacts.
- https://www.oceanica.com.br/contato/canal-de-denuncia/ · H1; text + phone + external link.
- https://www.oceanica.com.br/contato/cadastre-seu-curriculo/ · H1; text + button to Gupy.
- https://www.oceanica.com.br/contato/assessoria-de-imprensa/ · H1 "Assessoria de Imprensa"; NOT in the nav; two press contacts at an agency.
- https://www.oceanica.com.br/contato/midia/ · H1 "MÍDIA"; EMPTY; not in nav.

### Portal do Fornecedor · https://www.oceanica.com.br/portal-fornecedor/
- H1 "Portal do FORNECEDOR". H2: "Tudo o que você precisa, em um só lugar." · "Como acessar?" · "+ PRATICIDADE, AGILIDADE E TRANSPARÊNCIA PARA NOSSOS FORNECEDORES." Newest page on the site (2026 asset), its own landing-page layout. Links to https://fornecedor.oceanica.com.br, a Google Drive video and a PDF guide.

### Investidores (IR home) · https://www.oceanica.com.br/investidores/
- Same H1 and hero image as the institutional home. H2: "Por que investir na Oceânica" · "Últimas Atualizações" · "Resultados mais recentes" (2T26). Quick links: Estatuto, Políticas e Código de Ética · Resultados · Fale com RI · Cadastre-se no mailing. Popup about quarterly results.
- IR nav: A Oceânica (Quem Somos, O Que Fazemos, Missão Visão e Valores, Nossas Instalações, Ética e Transparência, ESG) · Governança Corporativa (Estrutura Societária, Administração, Estatuto Políticas e Código de Ética, Assembleias e Reuniões) · Informações aos Investidores (Central de Resultados, Formulário de Referência e Cadastral, Avisos Comunicados e Fatos Relevantes, Apresentações, Formulário CVM 44, Relatório de Rating, Relatório do Agente Fiduciário, Documentos entregues à CVM) · Serviços aos Investidores (Fale com RI, Cadastre-se no Mailing). Sitemap also lists Cobertura de Analistas and Gráficos e Cotação.
- IR children visited (shallow): `/investidores/servicos-aos-investidores/fale-com-ri/` (form only), `/investidores/a-oceanica/esg/` (document list: "Relatório de Sustentabilidade", "Inventário de Emissões GEE"; "Nenhum arquivo para o ano selecionado."), `/investidores/governanca-corporativa/estrutura-societaria/` (one image, Estrutura-Societaria-2026-1.jpg).

### Legal
- https://www.oceanica.com.br/politica-de-privacidade-de-dados-pessoais/ · H1 "Política de Privacidade de Dados Pessoais" (linked from the form consent text, not from nav/footer).
- https://www.oceanica.com.br/termo-de-consentimento-para-tratamento-de-dados-pessoais/ · linked from forms. Not visited.

### English · https://www.oceanica.com.br/en/
- H1 "SAFER ASSETS FOR A CLEANER WORLD". Mirrors the PT home. EN nav: About Oceânica (+ Financial Reports) · Services (Shallow and deep water prevention, Contingency, Engineering and specialized services, Assets) · ESG (Sustainability, HSE) · Contacts (Contact us, Complaint Channel, Commercial Contacts, Send your resume) · Investors (`/en/investors/`).
- https://www.oceanica.com.br/en/oceanica/awards-and-recognition/ · EMPTY page.

### Orphan
- https://www.oceanica.com.br/apresentacaosubii/ · "Apresentação Sub II": seven 1920×1080 slide images (Apresentacao_SUB_II-1.jpg … -7.jpg). Not in nav.

## Listed in sitemap, not visited
`/historico/`, `/missao-visao-e-valores/`, `/o-que-fazemos/`, `/etica-e-transparencia/`, `/etica-e-transparencia-2/`, `/formulario/`, `/noticias/`, `/noticias-teste/`, `/operacao-de-coleta-de-fluido/`, `/corporate-governance/`, `/timeline/<year>/` (19), the remaining per-service child pages under `/servicos/…`, the remaining IR pages, the remaining `/en/…` pages. Test content is publicly indexed: `/ola-mundo/`, `/blog-teste/`, `/noticias/teste-1/` etc.
