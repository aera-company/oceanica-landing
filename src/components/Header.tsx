"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

/* The header reads the section under it and takes that section's tone,
   so it stays legible over the film, the paper chapters and the stage alike. */

export function Header({ t, locale }: { t: Dict; locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const head = ref.current;
    if (!head) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-s]"));
    const links = Array.from(head.querySelectorAll<HTMLAnchorElement>(".site-nav a"));
    let ticking = false;
    let current = "";
    let tones = new Map<HTMLElement, { tone: string; bg: string }>();

    const update = () => {
      ticking = false;
      const y = 34;
      let sec = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= y) sec = s;
      if (!sec) return;
      let look = tones.get(sec);
      if (!look) {
        const cs = getComputedStyle(sec);
        look = { tone: cs.getPropertyValue("--tone").trim() || "dark", bg: cs.getPropertyValue("--bg").trim() || "#02080d" };
        tones.set(sec, look);
      }
      head.dataset.tone = look.tone;
      head.style.setProperty("--hbg", look.bg);
      head.dataset.solid = sec.id === "top" ? "0" : "1";
      const id = sec.id === "institutional" ? activeRow() : sec.id;
      if (id !== current) {
        current = id;
        links.forEach((a) => (a.getAttribute("href") === `#${id}` ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
      }
    };
    const activeRow = () => {
      let id = "esg";
      for (const r of ["esg", "investors", "careers"]) {
        const el = document.getElementById(r);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) id = r;
      }
      return id;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onTheme = () => {
      tones = new Map();
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("oc:theme", onTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("oc:theme", onTheme);
    };
  }, []);

  /* the menu is a full-screen sheet on small screens: lock the page behind it */
  useEffect(() => {
    document.documentElement.dataset.menu = open ? "1" : "0";
    window.dispatchEvent(new CustomEvent("oc:lock", { detail: open }));
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("oc-theme", next);
    } catch {}
    window.dispatchEvent(new Event("oc:theme"));
  };

  /* keep the reader in the same section, at the same relative position, in the other language */
  const keepPlace = () => {
    try {
      const y = window.scrollY + 1;
      let sec: HTMLElement | null = null;
      document.querySelectorAll<HTMLElement>("[data-s]").forEach((s) => {
        if (s.offsetTop <= y) sec = s;
      });
      const s = sec as HTMLElement | null;
      if (s && s.id) sessionStorage.setItem("oc-pos", JSON.stringify({ id: s.id, f: (y - s.offsetTop) / s.offsetHeight }));
    } catch {}
  };

  const controls = (
    <div className="controls mono">
      <div className="lang" role="group" aria-label={t.a11y.language}>
        {(["pt", "en"] as Locale[]).map((l) =>
          l === locale ? (
            <span key={l} className="lang-on" aria-current="true" lang={l}>
              {l.toUpperCase()}
            </span>
          ) : (
            /* a full navigation on purpose: the document language, metadata and the
               pre-paint theme script all belong to the new page */
            <a key={l} href={`/${l}`} hrefLang={l === "pt" ? "pt-BR" : "en"} lang={l} onClick={keepPlace} className="lang-off">
              {l.toUpperCase()}
            </a>
          ),
        )}
      </div>
      <button type="button" className="theme" onClick={toggleTheme} aria-label={t.a11y.theme} title={t.a11y.theme}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
        </svg>
        <span className="theme-name when-dark">{t.themeNames.dark}</span>
        <span className="theme-name when-light">{t.themeNames.light}</span>
      </button>
    </div>
  );

  return (
    <>
      <header ref={ref} className="site-header" data-tone="dark" data-solid="0">
        <a href="#top" className="brand" aria-label={t.a11y.home}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/oceanica/logo-oceanica.png" alt="Oceânica" width={211} height={41} />
        </a>
        <nav className="site-nav mono" aria-label={t.a11y.primary}>
          {t.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        {controls}
        <a href="#contact" className="cta mono">
          {t.contact}
        </a>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="menu" className="menu s-close" hidden={!open} data-lenis-prevent>
        <nav aria-label={t.a11y.primary}>
          <ol className="menu-list">
            {[...t.nav, { id: "contact", label: t.contact }].map((n, i) => (
              <li key={n.id} style={{ ["--i" as string]: i }}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                  <span className="mono menu-idx">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot">
          {controls}
          <a className="mono" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </>
  );
}
