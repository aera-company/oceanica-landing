import type { Dict } from "./copy/en";
import { en } from "./copy/en";
import { pt } from "./copy/pt";

export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";
export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

const DICTS: Record<Locale, Dict> = { pt, en };
export const getDict = (l: Locale) => DICTS[l];
export type { Dict };

export const SITE_URL = "https://oceanica-landing.vercel.app";
export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };
