/* All visible copy lives here. English first; a pt-BR file mirrors this shape later.
   Depth beats quote general ocean physics, never Oceânica operational data. */

export const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Assets", href: "#assets" },
  { label: "Engineering", href: "#engineering" },
  { label: "ESG", href: "#esg" },
  { label: "Investors", href: "#investors" },
];

export const HERO = {
  title: ["Engineering", "the depth."],
  lede: "Subsea engineering and offshore operations, from the surface to the seabed.",
  cue: "Scroll to descend",
  beats: [
    {
      mark: "0200 m",
      text: "Sunlight ends here.",
      note: "Below this line the sea keeps less than one percent of the light it had at the surface.",
      in: [0.27, 0.3],
      out: [0.37, 0.42],
    },
    {
      mark: "1000 m",
      text: "No daylight has ever reached this water.",
      note: "One hundred times the pressure of the air above. This is where the infrastructure lives.",
      in: [0.5, 0.535],
      out: [0.61, 0.66],
    },
    {
      mark: "3000 m",
      text: "Down here, the only light is the one we bring.",
      note: "",
      in: [0.76, 0.84],
      out: [1.2, 1.3],
    },
  ],
};

/* Chapter 02. Every figure and claim below is taken from oceanica.com.br
   (read 2026-11-10). See research/OCEANICA-CURRENT.md for the source of each. */
export const BELOW = {
  mark: "02 · Below the surface",
  title: "Asset integrity, from zero to three thousand metres.",
  body: "Since 1978, Oceânica has inspected, maintained and repaired the structures offshore energy depends on. Prevention first, contingency when it counts, engineering for what does not exist yet.",
  rovCaption: "Work Class ROV on a subsea structure · image: oceanica.com.br",
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
    mark: "0000 m · Surface unit",
    text: "Every descent starts on deck. OCEANICASUB X carries a Work Class ROV rated for service down to 3000 metres.",
    meta: "OCEANICASUB X · AHTS · acquired 2023",
  },
  foot: ["Concept study · hero and first transition", "Not an official Oceânica page"],
};
