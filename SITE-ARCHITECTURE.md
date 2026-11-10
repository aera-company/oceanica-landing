# Site architecture

One long page as the flagship, plus the deep routes the current site already has. Every chapter is a depth. Every fact named below exists on oceanica.com.br today (sources in `research/OCEANICA-CURRENT.md`); anything missing is marked **needs input**.

Status: **built** in the proof of concept · **planned**.

## Scroll budget

Target: about 20 viewports for the whole page, about 2 per pinned scene. The reference site runs 40. The proof of concept uses 7.9 for hero plus chapter 02.

| # | Chapter | Depth | Pinned | Viewports |
|---|---|---|---|---|
| 01 | Hero | 0 to 3000 m | Yes | 4.4 |
| 02 | Below the surface | 3000 m | No | 3.5 |
| 03 | Prevention | Work depth | Yes | 2.5 |
| 04 | Contingency | Work depth | Short pin | 1.5 |
| 05 | Engineering | Seabed | No | 1.5 |
| 06 | Oceânica system | Full column | Yes | 2.5 |
| 07 | Assets and scale | Seabed | No | 2 |
| 08 | Innovation | Seabed | No | 1.5 |
| 09 | ESG and safety | Rising | No | 1.5 |
| 10 | Closing | Surface | Short pin | 1 |
| | | | **Total** | **about 22** |

## 00 Navigation

```
OCEÂNICA    01 Solutions   02 Assets   03 Engineering   04 ESG   05 Investors        [ Contact ]   PT / EN
```

- **Built:** logo, five numbered links, contact button. On portrait: logo and contact only.
- **Planned:** PT / EN switch, a full-screen index on portrait, and the depth gauge as the persistent progress system once the hero releases (chapter number plus depth).
- Solutions opens chapters 03 to 05. Assets opens 07. Engineering opens 05. ESG opens 09. Investors leaves to the investor area. Contact opens 10.

## 01 Hero (built)

- Split shot at the waterline. Headline "Engineering the depth." cut by the line.
- Lede: one sentence.
- Instruments: depth gauge (right edge), pressure and surface light (top left). The gauge is the scroll indicator.
- Descent to 3000 m with three statements at 200 m, 1000 m and 3000 m.
- No call to action inside the film. Contact stays in the header the whole time.

## 02 Below the surface (built)

Purpose: say what Oceânica is, in one screen, with proof.

- Real Work Class ROV frame, found by light.
- Statement: "Asset integrity, from zero to three thousand metres."
- One paragraph: since 1978, inspect, maintain, repair. Prevention, contingency, engineering.
- Four figures at display size: **0 to 3000 m** inspection range · **56** ROVs in 2026 · **+2,300** people · **48** years. Source line under them.
- Index of the three business lines as large rows, each a link to its chapter.
- Surface unit: OCEANICASUB X, the vessel that carries the ROV. Ties the seabed back to the deck.

## 03 Prevention (planned)

The site's "Prevenção": inspection, maintenance and repair (IRM), with divers and ROVs, in shallow and deep water.

- Signature scene: the camera approaches a real Work Class ROV. Far to macro, one move, callouts in one fixed slot.
- Content: non-destructive testing, FPSO support, UWILD (class inspection without dry-docking), hose inspection at ocean terminals, pull-in and pull-out, mooring chain inspection.
- Two depth bands in one chapter: divers in shallow water (own systems to 50 m, one to 90 m), ROVs to 3000 m.
- Figure: "Mais de 24 mil horas de inspeção e 57 plataformas" is dated 2020. **Needs input:** a current number.
- Route: commercial contact for inspection.

## 04 Contingency (planned)

The site's "Contingenciamento" and CRD.

- The tone shifts: shorter sentences, tighter light. This is the emergency chapter.
- Facts: CRD active since 1984. "Maior empresa nacional em contingenciamento e intervenção subsea". Emergency repair of rigid pipelines, containment tooling for blow-out scenarios, technical support available 24 hours.
- Thirteen services exist on the site. Show them as one quiet list, not thirteen cards.
- A response sequence (call, mobilise, intervene, restore). **Needs input:** real response times or a case Oceânica is allowed to tell.
- Route: an emergency contact, distinct from the commercial one. **Needs input:** the right number.

## 05 Engineering (planned)

The site's "Serviços especializados de engenharia".

- Content: installation of PLEM, PLET and manifolds, pipeline and cable laying, commissioning, hydrostatic testing, decommissioning, work in classified areas.
- In-house tooling since 2010: a named tool list exists (FIGI, shuttle tank, lifting tool, hot tap machine, hydraulic diverless connector and more).
- Motion: light sweeping across line drawings of real tools. **Needs input:** drawings or CAD.
- Fact worth a line: first diving system for classified areas.

## 06 Oceânica system (planned)

The one moment the camera pulls back. A section drawing of the whole water column:

```
Vessel (SDSV / RSV / AHTS)   · control room · crane
   │  tether, umbilical
Divers 0 to 50 m             · LDB "Pai e Filho"
   │
FPSO hull, risers, moorings  · UWILD, pull-in, hose inspection
   │
Work Class ROV to 3000 m
   │
Pipelines, PLEM, manifolds   · CRD repair, engineering works
```

- Each node is a relationship, not a product: hover or tap lights one path (vessel to ROV to pipeline) and shows which service line runs along it.
- This replaces the hidden 14-hotspot scene of the current site and promotes it to a signature section.
- Drawn as SVG line work over the water. HTML labels. Keyboard reachable, readable as a plain list without motion.

## 07 Assets and scale (planned)

Verified numbers, one per screen, then the fleet.

- Figures available today: 56 ROVs · more than 250 ROV pilots · 11 named vessels · 13 diving systems · four bases in Rio de Janeiro state · 1978.
- Fleet: the June 2024 photographs, one vessel per plate, with class and equipment as written on the site.
- ROV table: nine models with depth rating, weight and power.
- **Needs input:** the diver count (300 or 350), a single fleet number, datasheet data.
- Route: each vessel links to its datasheet.

## 08 Innovation (planned)

- Diverless operations: first contract 2019, the 300 m diving limit as the reason.
- "Mergulhador do Futuro": divers certified as ROV pilots. A hybrid workforce.
- Tooling designed and built in-house.
- Training centre with its own tanks in Rio das Ostras, ROV Work Class centre in Maricá.

## 09 ESG and safety (planned)

Not a separate card. The mission is the environmental case: "Mais do que remediar, trabalhamos todos os dias para prevenir acidentes."

- The instruments from the hero return with a different reading: what was prevented, not how deep.
- Certifications: ISO 9001, 14001, 45001, classification societies, INMETRO 17020.
- Decommissioning as environmental work.
- Ethics: code, compliance, whistleblowing channel.
- **Needs input:** safety statistics, emissions data, the sustainability report (announced, not published).

## 10 Closing (planned)

- The camera breaks the surface. The first frame again, in daylight.
- One statement, then two routes of equal clarity: **Talk to commercial** and **Investor relations**.
- Footer, complete this time.

## Footer and deep routes

Everything the current site offers stays reachable from the footer:

| Group | Links |
|---|---|
| Company | About · History · Mission, vision and values · Facilities |
| Solutions | Prevention · Contingency · Engineering · Assets |
| Investors | Results centre · Governance · Notices and material facts · Talk to IR · Mailing list |
| Contact | General contact · Commercial contacts · Press |
| People | Careers · Intranet |
| Suppliers | Supplier portal |
| Ethics | Whistleblowing channel (24/7, external) · Code of ethics · Compliance manual · Pay transparency reports |
| Legal | Privacy policy · Terms |
| Language and social | PT / EN · Instagram · LinkedIn · Facebook |
| Addresses | HQ and four branches |

The investor area keeps its own structure and document feeds (served by MZ). The flagship page links into it; it does not rebuild it.

## Input needed from Oceânica

1. Original ROV dive footage and vessel video.
2. SVG logo and brand guidelines.
3. The correct diver count and a current inspection-hours figure.
4. Safety statistics that can be published.
5. Clients and cases that can be named.
6. Emergency contact route for contingency.
7. Rights confirmation for the ROV banner image.
8. Tool drawings or CAD for the engineering chapter.
