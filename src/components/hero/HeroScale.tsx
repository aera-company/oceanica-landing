"use client";

import { useEffect, useRef } from "react";
import type { Dict } from "@/lib/i18n";

/* Hero, V05 concept A: "Engenharia do tamanho do mar".
   One real photograph holds the whole business: an Oceânica deck at dawn, its Work
   Class ROV in the launch system, and on the horizon the production unit it serves.
   The camera travels over the deck toward that horizon (three depth planes cut from
   the photograph, each scaling at its own rate around the FPSO), passes through the
   sun and arrives overhead, alongside the production unit.

   Scroll is the clock, eased through a short lag so the camera has mass.
   Everything is written through refs and CSS variables, never React state. */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (x: number) => x * x * (3 - 2 * x);
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/* the photograph: 2200 x 1650. Anchor = between the FPSO and the sun, on the horizon */
const PLATE = { w: 2200, h: 1650 };
const ANCHOR = { x: 0.625, y: 0.356 };

/* the timeline, in hero progress (0..1) */
const T = {
  push: [0.05, 0.44] as const, // over the deck toward the horizon
  creep: [0.44, 0.66] as const, // the slow approach while the statement holds
  flash: [0.615, 0.665, 0.715] as const, // into the sun, cut, out of the sun
  arrive: [0.665, 0.95] as const, // overhead, alongside
  title: [0.09, 0.17] as const,
  notes: [0.04, 0.1] as const,
  say: [0.4, 0.45, 0.57, 0.61] as const,
  at: [0.73, 0.79] as const,
  exit: [0.955, 1] as const,
};

export function HeroScale({ t }: { t: Dict["hero"] }) {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const plate = plateRef.current;
    if (!wrap || !stage || !plate) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 820px)");
    const q = <E extends HTMLElement>(s: string) => stage.querySelector<E>(s);
    const L = {
      sky: q("[data-l='sky']"),
      sea: q("[data-l='sea']"),
      deck: q("[data-l='deck']"),
      sharp: q("[data-l='sharp']"),
      soft: q("[data-l='soft']"),
      along: q("[data-l='along']"),
    };
    const slots: Record<string, HTMLElement | null> = {};
    stage.querySelectorAll<HTMLElement>("[data-slot]").forEach((el) => (slots[el.dataset.slot!] = el));

    /* frame the photograph like a camera, not like object-fit: the horizon sits at
       39 % of the screen and the FPSO a little right of centre, whatever the shape */
    const frame = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const s = Math.max(W / PLATE.w, H / PLATE.h) * (narrow.matches ? 1.06 : 1.0);
      const pw = PLATE.w * s;
      const ph = PLATE.h * s;
      const left = clamp(W * (narrow.matches ? 0.6 : 0.62) - ANCHOR.x * pw, W - pw, 0);
      const top = clamp(H * (narrow.matches ? 0.38 : 0.39) - ANCHOR.y * ph, H - ph, 0);
      plate.style.width = `${pw}px`;
      plate.style.height = `${ph}px`;
      plate.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`;
      /* where the FPSO and the ROV land on screen, for the annotations */
      stage.style.setProperty("--fx", `${(left + 0.605 * pw).toFixed(1)}px`);
      stage.style.setProperty("--fy", `${(top + 0.352 * ph).toFixed(1)}px`);
      stage.style.setProperty("--rx", `${(left + 0.592 * pw).toFixed(1)}px`);
      stage.style.setProperty("--ry", `${(top + 0.565 * ph).toFixed(1)}px`);
    };
    frame();

    let target = 0;
    let p = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const readScroll = () => {
      const r = wrap.getBoundingClientRect();
      const run = wrap.offsetHeight - window.innerHeight;
      target = run > 0 ? clamp(-r.top / run) : 0;
      visible = r.bottom > 0 && r.top < window.innerHeight;
    };

    /* one voice at a time: fade with a short rise */
    const fade = (el: HTMLElement | null, o: number, rise = 16) => {
      if (!el) return;
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * rise).toFixed(1)}px, 0)`;
      el.style.visibility = o <= 0.002 ? "hidden" : "visible";
    };
    const window4 = (v: number, k: readonly number[]) => Math.min(span(v, k[0], k[1]), 1 - span(v, k[2], k[3]));

    const render = (now: number) => {
      raf = 0;
      if (!visible && !reduce) return;
      const time = (now - t0) / 1000;
      if (!reduce) p += (target - p) * 0.1;
      if (Math.abs(target - p) < 0.0002) p = target;

      const e = inOut(span(p, T.push[0], T.push[1]));
      const c = ease(span(p, T.creep[0], T.creep[1]));
      /* a slow breath keeps the still alive before the first scroll */
      const breath = reduce ? 0 : Math.sin(time * 0.35) * 0.004 * (1 - e);

      /* three planes, one anchor: the sky is far and moves least; the sea and horizon
         come toward the camera; the deck passes under it and slides out of focus */
      const sky = 1 + breath + 0.42 * e + 0.12 * c;
      const sea = 1 + breath + 0.88 * e + 0.38 * c;
      const deck = 1 + breath + 1.65 * e + 0.6 * c;
      if (L.sky) L.sky.style.transform = `scale(${sky.toFixed(4)})`;
      if (L.sea) L.sea.style.transform = `scale(${sea.toFixed(4)})`;
      if (L.deck) {
        L.deck.style.transform = `translate3d(0, ${(16 * e + 14 * c).toFixed(2)}%, 0) scale(${deck.toFixed(4)})`;
        L.deck.style.opacity = (1 - 0.35 * e - 0.65 * c).toFixed(3);
      }
      const focus = span(e, 0.12, 0.62);
      if (L.sharp) L.sharp.style.opacity = (1 - focus).toFixed(3);
      if (L.soft) L.soft.style.opacity = focus.toFixed(3);

      /* light: the sun grows as we approach; we pass through it and come out overhead */
      const flashIn = span(p, T.flash[0], T.flash[1]);
      const flashOut = 1 - span(p, T.flash[1], T.flash[2]);
      const flash = reduce ? 0 : 0.94 * Math.min(ease(flashIn), ease(flashOut));
      const cut = p >= T.flash[1] && !reduce;
      const a = ease(span(p, T.arrive[0], T.arrive[1]));
      stage.style.setProperty("--bloom", (0.25 + 0.75 * e + 0.6 * c).toFixed(3));
      stage.style.setProperty("--flash", flash.toFixed(3));
      stage.style.setProperty("--dawn", cut ? "0" : "1");
      stage.style.setProperty("--along", cut ? "1" : "0");
      stage.style.setProperty("--exit", reduce ? "0" : span(p, T.exit[0], T.exit[1]).toFixed(3));
      const intro = reduce ? 1 : ease(clamp((now - t0) / 1400));
      stage.style.setProperty("--intro", intro.toFixed(3));
      if (L.along) L.along.style.transform = `translate3d(0, ${(-4 * a).toFixed(2)}%, 0) scale(${(1.16 - 0.1 * a).toFixed(4)})`;

      /* words */
      fade(slots.eyebrow, Math.min(intro, 1 - span(p, T.title[0], T.title[1])), 0);
      fade(slots.title, 1 - span(p, T.title[0], T.title[1]), -24);
      fade(slots.lede, 1 - span(p, T.title[0] - 0.02, T.title[1] - 0.03), -16);
      fade(slots.notes, 1 - span(p, T.notes[0], T.notes[1]), 0);
      fade(slots.say, window4(p, T.say));
      fade(slots.at, cut ? span(p, T.at[0], T.at[1]) : 0);
      fade(slots.atBody, cut ? span(p, T.at[0] + 0.03, T.at[1] + 0.03) : 0);
      fade(slots.atCap, cut ? span(p, T.at[0] + 0.06, T.at[1] + 0.06) : 0, 0);
      fade(slots.cue, 1 - span(p, 0.01, 0.05), 0);
      fade(slots.i1, 1 - span(p, 0.3, 0.36), 0);
      fade(slots.i2, Math.min(span(p, 0.36, 0.4), 1 - span(p, T.flash[0], T.flash[1])), 0);
      fade(slots.i3, cut ? span(p, T.at[0], T.at[1]) : 0, 0);

      if (!reduce) raf = requestAnimationFrame(render);
    };

    const kick = () => {
      readScroll();
      if (!raf && (visible || reduce)) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      frame();
      kick();
    };
    /* decode the out-of-focus deck and the arrival picture ahead of time, so the cut
       through the sun never waits on an image decode */
    const predecode = () => stage.querySelectorAll("img").forEach((img) => img.decode?.().catch(() => {}));
    const idle = window.setTimeout(predecode, 1200);
    readScroll();
    raf = requestAnimationFrame(render);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    narrow.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      narrow.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <section ref={wrapRef} id="top" data-s className="hs s-film" aria-labelledby="hero-title">
      <div ref={stageRef} className="hs-stage">
        {/* the dawn photograph, as three depth planes on one plate */}
        <div ref={plateRef} className="hs-plate">
          <div className="hs-l" data-l="sea">
            <picture>
              <source media="(max-width: 820px)" srcSet="/media/hero-sea-m.webp" />
              { }
              <img className="hs-sea" src="/media/hero-sea.webp" alt={t.alt} width={2200} height={1650} fetchPriority="high" decoding="async" />
            </picture>
            <i className="hs-bloom" aria-hidden="true" />
          </div>
          <div className="hs-l" data-l="sky" aria-hidden="true">
            <picture>
              <source media="(max-width: 820px)" srcSet="/media/hero-sky-m.webp" />
              { }
              <img className="hs-sky" src="/media/hero-sky.webp" alt="" width={2200} height={503} decoding="async" />
            </picture>
          </div>
          <div className="hs-l" data-l="deck" aria-hidden="true">
            <picture data-l="sharp" className="hs-deckwrap">
              <source media="(max-width: 820px)" srcSet="/media/hero-deck-m.webp" />
              { }
              <img className="hs-deck" src="/media/hero-deck.webp" alt="" width={2169} height={1008} decoding="async" />
            </picture>
            <picture data-l="soft" className="hs-deckwrap" style={{ opacity: 0 }}>
              <source media="(max-width: 820px)" srcSet="/media/hero-deck-b-m.webp" />
              { }
              <img className="hs-deck" src="/media/hero-deck-b.webp" alt="" width={1085} height={504} fetchPriority="low" decoding="async" />
            </picture>
          </div>
        </div>

        {/* the arrival: overhead, alongside the production unit */}
        <div className="hs-along" aria-hidden="true">
          <picture>
            <source media="(max-width: 820px)" srcSet="/media/svc-prevention-m.webp" />
            { }
            <img data-l="along" src="/media/svc-prevention.webp" alt="" width={2048} height={1152} fetchPriority="low" decoding="async" />
          </picture>
        </div>

        <div className="hs-grade" aria-hidden="true" />
        <div className="hs-flash" aria-hidden="true" />

        <p className="mono hs-index" aria-hidden="true">
          <span className="tick" />
          <span className="hs-i">
            <span data-slot="i1">{t.index[0]}</span>
            <span data-slot="i2" style={{ opacity: 0 }}>
              {t.index[1]}
            </span>
            <span data-slot="i3" style={{ opacity: 0 }}>
              {t.index[2]}
            </span>
          </span>
        </p>

        <div className="hs-words">
          <div className="hs-open">
            <p className="mono hs-eyebrow" data-slot="eyebrow">
              {t.eyebrow}
            </p>
            <h1 id="hero-title" data-slot="title" className="hs-title">
              {t.title.map((l, i) => (
                <span key={l} className="ln" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h1>
          </div>
          <p data-slot="lede" className="hs-lede">
            {t.lede}
          </p>
          <p data-slot="say" className="hs-say" style={{ opacity: 0 }}>
            {t.horizon.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <div className="hs-arrive">
            <p data-slot="at" className="hs-title hs-at" style={{ opacity: 0 }}>
              {t.alongside}
            </p>
            <p data-slot="atBody" className="hs-lede hs-at-body" style={{ opacity: 0 }}>
              {t.alongsideBody}
            </p>
            <p data-slot="atCap" className="mono hs-at-cap" style={{ opacity: 0 }}>
              {t.alongsideCaption}
            </p>
          </div>
        </div>

        {/* annotations: they name what is visible, and never sit on it */}
        <div data-slot="notes" className="hs-notes mono" aria-hidden="true">
          <p className="hs-note hs-note-fpso">
            <i />
            {t.notes[0]}
          </p>
          <p className="hs-note hs-note-rov">
            <i />
            {t.notes[1]}
          </p>
          <p className="hs-note hs-note-m">{t.caption}</p>
        </div>

        <div data-slot="cue" className="mono hs-cue" aria-hidden="true">
          <i />
          {t.cue}
        </div>
      </div>

      {/* for screen readers and reduced motion: the same words, in order */}
      <div className="sr">
        <p>{t.horizon.join(" ")}</p>
        <p>{t.alongside}</p>
        <p>{t.alongsideBody}</p>
      </div>
    </section>
  );
}
