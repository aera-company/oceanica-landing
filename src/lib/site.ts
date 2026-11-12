/* Language-independent facts: genuine URLs and contact details, all read on
   oceanica.com.br (2026-11-10, see research/oceanica-current/routes.md). */

const O = "https://www.oceanica.com.br";

export const LINKS = {
  official: O,
  services: `${O}/servicos/`,
  prevention: `${O}/servicos/prevencao-em-aguas-rasas-e-profundas/`,
  contingency: `${O}/servicos/contingenciamento/`,
  engineering: `${O}/servicos/servicos-especializados-de-engenharia/`,
  assets: `${O}/servicos/ativos/`,
  vessels: `${O}/servicos/ativos/embarcacoes/`,
  rovs: `${O}/servicos/ativos/rov/`,
  sustainability: `${O}/sustentabilidade/`,
  hse: `${O}/esg/sms/`,
  investors: `${O}/investidores/`,
  results: `${O}/investidores/informacoes-aos-investidores/central-de-resultados/`,
  irContact: `${O}/investidores/servicos-aos-investidores/fale-com-ri/`,
  jobs: "https://sejaoceanica.gupy.io/",
  cv: `${O}/contato/cadastre-seu-curriculo/`,
  contact: `${O}/contato/fale-conosco/`,
  commercial: `${O}/contato/contatos-comerciais/`,
  whistle: "https://contatoseguro.com.br/oceanica/",
  supplier: `${O}/portal-fornecedor/`,
  privacy: `${O}/politica-de-privacidade-de-dados-pessoais/`,
  instagram: "https://www.instagram.com/oceanica.engenharia",
  linkedin: "https://www.linkedin.com/company/oceanica",
  facebook: "https://www.facebook.com/oceanica.sub",
} as const;

export const CONTACT = {
  email: "oceanica@oceanica.com.br",
  phones: [
    { label: "+55 (21) 2139-4250", href: "tel:+552121394250" },
    { label: "+55 (22) 3321-6300", href: "tel:+552233216300" },
  ],
  legal: "Oceânica Engenharia e Consultoria S.A.",
  cnpj: "29.980.141/0001-08",
  address: "Avenida das Américas, 3.434, Bloco 01, Salas 301 a 308, Barra da Tijuca, Rio de Janeiro (RJ), 22640-102",
};

/* Showcase: pictures and their geometry. Text lives in the dictionaries, keyed by id. */
export type AssetId = "vi" | "vii" | "x" | "xi" | "wrov" | "lynx";
export const ASSETS: { id: AssetId; cat: "vessels" | "rovs"; src: string; w: number; h: number; pos: string; fit: "cover" | "side"; loupe: [number, number] }[] = [
  { id: "vi", cat: "vessels", src: "/media/fleet-vi.webp", w: 2048, h: 1526, pos: "60% 62%", fit: "cover", loupe: [70, 56] },
  { id: "vii", cat: "vessels", src: "/media/fleet-vii.webp", w: 2200, h: 1236, pos: "50% 55%", fit: "cover", loupe: [50, 48] },
  { id: "x", cat: "vessels", src: "/media/fleet-x.webp", w: 2800, h: 1572, pos: "50% 55%", fit: "cover", loupe: [50, 50] },
  { id: "xi", cat: "vessels", src: "/media/fleet-xi.webp", w: 2800, h: 2099, pos: "55% 62%", fit: "cover", loupe: [52, 60] },
  { id: "wrov", cat: "rovs", src: "/media/rov-launch.webp", w: 1834, h: 1798, pos: "50% 60%", fit: "side", loupe: [50, 66] },
  { id: "lynx", cat: "rovs", src: "/media/rov-lynx.webp", w: 1920, h: 1080, pos: "50% 50%", fit: "cover", loupe: [52, 58] },
];

/* pictures wider than 1200 px also exist as a 1100 px file for small screens */
export const srcSet = (src: string, w: number) => (w > 1200 ? `${src.replace(".webp", "-m.webp")} 1100w, ${src} ${w}w` : undefined);

/* The system map: hotspot positions in percent of Oceânica's render frame (4500 x 2500),
   recovered by matching the site's own hotspot screenshot to the video, then moved onto
   the subject each service refers to. Business lines follow the site's service lists. */
export type Line = "prevention" | "contingency" | "engineering";
export const SYSTEM_PINS: { n: number; x: number; y: number; lines: Line[] }[] = [
  { n: 1, x: 15.5, y: 38.4, lines: ["engineering"] },
  { n: 2, x: 22.9, y: 45.6, lines: ["prevention"] },
  { n: 3, x: 29.8, y: 59.0, lines: ["contingency"] },
  { n: 4, x: 35.1, y: 50.0, lines: ["prevention"] },
  { n: 5, x: 42.2, y: 28.8, lines: ["engineering"] },
  { n: 6, x: 53.8, y: 33.6, lines: ["prevention"] },
  { n: 7, x: 69.5, y: 36.5, lines: ["prevention"] },
  { n: 8, x: 70.7, y: 55.6, lines: ["prevention"] },
  { n: 9, x: 76.5, y: 45.0, lines: ["prevention", "engineering"] },
  { n: 10, x: 73.0, y: 41.5, lines: ["prevention"] },
  { n: 11, x: 80.0, y: 39.0, lines: ["prevention"] },
  { n: 12, x: 48.4, y: 50.0, lines: ["prevention"] },
  { n: 13, x: 82.4, y: 74.0, lines: ["prevention", "contingency", "engineering"] },
  { n: 14, x: 28.9, y: 36.0, lines: ["engineering"] },
];

/* The machine chapter: where each named part sits on the cut-out (percent of the picture) */
export const ROV_PARTS: Record<string, [number, number]> = {
  tms: [46.7, 36.6],
  marks: [55, 54.6],
  buoy: [30.8, 58.7],
  thruster: [64.7, 67.7],
  skid: [50, 91.5],
};
