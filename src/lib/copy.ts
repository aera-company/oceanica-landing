/* All visible copy lives here. English first; a pt-BR file mirrors this shape later.
   Every claim about Oceânica comes from oceanica.com.br (read 2026-11-10);
   the source of each one is listed in research/OCEANICA-CURRENT.md. */

export const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Assets", href: "#assets" },
  { label: "Engineering", href: "#engineering" },
  { label: "ESG", href: "#esg" },
  { label: "Investors", href: "#investors" },
];

export const SHOTS = ["Surface", "Operation", "Descent", "Work Class", "Intervention"];

export const HERO = {
  title: ["Engineering", "the depth."],
  lede: "Subsea engineering and offshore operations. Since 1978.",
  asset: "OCEANICASUB VI · MPSV · 2 Work Class ROVs · 100 t subsea crane",
  cue: "Scroll to descend",
  beats: [
    {
      id: "operation",
      slate: "02 · Operation",
      text: "Every descent starts on deck.",
      note: "Eleven vessels work from the surface. Six of them carry Work Class ROVs.",
      meta: "Back deck at first light",
      in: [0.275, 0.315],
      out: [0.5, 0.54],
      cut: true,
    },
    {
      id: "descent",
      slate: "03 · Descent",
      text: "Below 300 metres, the work belongs to machines.",
      note: "Divers stop there. 56 ROVs and more than 250 pilots carry on.",
      meta: "Seaeye Lynx · observation class · rated 1000 m",
      in: [0.56, 0.6],
      out: [0.67, 0.705],
      cut: false,
    },
    {
      id: "workclass",
      slate: "04 · Work Class",
      text: "Built to do the work, not to watch it.",
      note: "Seven-function manipulators, up to 250 HP, tooling designed in-house since 2010.",
      meta: "Work Class ROV fleet · rated to 4000 m",
      in: [0.79, 0.83],
      out: [0.865, 0.895],
      cut: false,
    },
    {
      id: "intervention",
      slate: "05 · Intervention",
      text: "Inspection and intervention, from zero to three thousand metres.",
      note: "The only Brazilian company contracted across that full range.",
      meta: "Source: oceanica.com.br",
      in: [0.925, 0.96],
      out: [1.2, 1.3],
      cut: false,
    },
  ],
};

/* Chapter 02 */
export const BELOW = {
  mark: "02 · Below the surface",
  title: "Safer assets for a cleaner world.",
  body: "Since 1978, Oceânica has inspected, maintained and repaired the structures offshore energy depends on. Prevention first, contingency when it counts, engineering for what does not exist yet.",
  figures: [
    { value: "0–3000", unit: "m", label: "Inspection range" },
    { value: "56", unit: "", label: "ROVs in 2026" },
    { value: "+2,300", unit: "", label: "People" },
    { value: "48", unit: "", label: "Years of operation" },
  ],
  source: "Figures as published on oceanica.com.br, November 2026",
  lines: [
    {
      idx: "03",
      name: "Prevention",
      desc: "Inspection, maintenance and repair with divers and ROVs, in shallow and deep water.",
      href: "#prevention",
    },
    {
      idx: "04",
      name: "Contingency",
      desc: "Emergency repair of rigid pipelines and subsea intervention, with technical support on call 24 hours.",
      href: "#contingency",
    },
    {
      idx: "05",
      name: "Engineering",
      desc: "Underwater construction, installation, decommissioning and tooling designed in-house.",
      href: "#engineering",
    },
  ],
  vessel: {
    mark: "Fleet · OCEANICASUB VII",
    text: "Eleven vessels, green hulls, one job: keep what is down there working.",
    meta: "OCEANICASUB VII · AHTS adapted as SDSV · Work Class ROV · two diving systems to 50 m",
  },
  foot: ["Concept study · hero and first transition", "Not an official Oceânica page"],
};
