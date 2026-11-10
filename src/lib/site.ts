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
  { id: "wrov", cat: "rovs", src: "/media/rov-workclass-launch.webp", w: 960, h: 1280, pos: "50% 50%", fit: "side", loupe: [50, 66] },
  { id: "lynx", cat: "rovs", src: "/media/rov-lynx.webp", w: 1920, h: 1080, pos: "50% 50%", fit: "cover", loupe: [52, 58] },
];

/* pictures wider than 1200 px also exist as a 1100 px file for small screens */
export const srcSet = (src: string, w: number) => (w > 1200 ? `${src.replace(".webp", "-m.webp")} 1100w, ${src} ${w}w` : undefined);
