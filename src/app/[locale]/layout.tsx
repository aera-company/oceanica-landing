import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HTML_LANG, LOCALES, SITE_URL, getDict, isLocale } from "@/lib/i18n";

const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", axes: ["wdth"], display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

/* Runs before first paint: explicit choice first, system preference second
   (?theme=light|dark forces one, for reviews and screenshots).
   Sets data-theme on <html>, so the page never flashes the wrong theme. */
const THEME_SCRIPT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("oc-theme")}catch(e){}var q=/[?&]theme=(light|dark)/.exec(location.search);if(q)t=q[1];if(t!=="light"&&t!=="dark"){t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t;d.dataset.js="1"})()`;

/* The study uses photographs that are not cleared yet: it stays out of search
   engines unless NEXT_PUBLIC_INDEXABLE=1 is set at build time. */
const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "1";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Oceânica",
      title: t.title,
      description: t.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      images: [{ url: "/film/still-1.webp", width: 1440, height: 900 }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/film/still-1.webp"] },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#02080d" },
    { media: "(prefers-color-scheme: light)", color: "#02080d" },
  ],
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={HTML_LANG[locale]} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preload" as="image" href="/film/still-1.webp" media="(min-aspect-ratio: 3/4)" />
        <link rel="preload" as="image" href="/film/still-1-portrait.webp" media="(max-aspect-ratio: 3/4)" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
