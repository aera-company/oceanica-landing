"use client";

import { useEffect, useRef } from "react";
import type { Dict } from "@/lib/i18n";

/* Hero, concept 2: "Our hands at three thousand metres".
   One object, one move. The Work Class ROV hangs in a locked frame; the world
   descends around it. Behind it a depth number the width of the screen rolls
   from 0000 to 3000, then turns solid. The scene closes on a macro of the hull.

   Scroll is the clock, eased through a short lag so the camera has mass.
   Everything is written through refs and CSS variables, never React state. */

const MAX = 3000;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (x: number) => x * x * (3 - 2 * x);
const out3 = (x: number) => 1 - Math.pow(1 - x, 3);

/* the timeline, in hero progress (0..1) */
const T = {
  descent: [0.06, 0.72] as const, // the descent, from the first metre to 3000
  roll1: [0.18, 0.25] as const, // big number 0000 -> 0300
  roll2: [0.6, 0.71] as const, // big number 0300 -> 3000
  solid: [0.72, 0.8] as const, // numerals turn solid
  macro: [0.84, 1] as const, // push to the hull markings
  title: { out: [0.1, 0.16] as const, back: [0.88, 0.95] as const },
  s1: [0.22, 0.27, 0.4, 0.45] as const,
  s2: [0.47, 0.52, 0.63, 0.68] as const,
  at: [0.74, 0.78, 0.84, 0.88] as const,
};
/* where the hull markings sit on the picture, and where the macro puts them */
const MARK = { x: 0.56, y: 0.56 };

const DIGITS = Array.from({ length: 11 }, (_, i) => i % 10);

export function HeroRov({ t }: { t: Dict["hero"] }) {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const readRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const rig = rigRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !stage || !rig || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 820px)");
    const ctx = canvas.getContext("2d");
    const slots: Record<string, HTMLElement | null> = {};
    stage.querySelectorAll<HTMLElement>("[data-slot]").forEach((el) => (slots[el.dataset.slot!] = el));

    /* suspended particles: three layers, streaked by the speed of the descent */
    type Pt = { x: number; y: number; z: number; s: number };
    let pts: Pt[] = [];
    let W = 0;
    let H = 0;
    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = narrow.matches ? 70 : 150;
      pts = Array.from({ length: n }, () => {
        const z = Math.random();
        return { x: Math.random() * W, y: Math.random() * H, z, s: 0.4 + Math.random() * 0.6 };
      });
    };
    seed();

    let target = 0;
    let p = reduce ? 0.78 : 0;
    let lastP = p;
    let vel = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const readScroll = () => {
      const r = wrap.getBoundingClientRect();
      const run = wrap.offsetHeight - window.innerHeight;
      target = run > 0 ? clamp(-r.top / run) : 0;
      visible = r.bottom > 0 && r.top < window.innerHeight;
    };

    const fade = (el: HTMLElement | null, k: readonly number[], v: number) => {
      if (!el) return;
      const o = Math.min(span(v, k[0], k[1]), 1 - span(v, k[2], k[3]));
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0,${((1 - span(v, k[0], k[1])) * 18 - span(v, k[2], k[3]) * 18).toFixed(1)}px,0)`;
      el.style.visibility = o <= 0.001 ? "hidden" : "visible";
    };

    const render = (now: number) => {
      raf = 0;
      if (!visible && !reduce) return;
      const time = (now - t0) / 1000;
      const prev = p;
      if (!reduce) p += (target - p) * 0.1;
      vel += (Math.min(1, Math.abs(p - prev) * 120) - vel) * 0.12;

      /* depth: the read-out runs continuously; the big number rolls only at the
         two moments the story names a depth, like a counter that clicks over */
      /* the read-out agrees with the big number: 300 m when the story says 300, 3000 at the end */
      const d = reduce ? MAX : 300 * ease(span(p, T.descent[0], T.roll1[1])) + (MAX - 300) * ease(span(p, T.roll1[1] + 0.02, T.roll2[1]));
      const r1 = reduce ? 1 : ease(span(p, T.roll1[0], T.roll1[1]));
      const r2 = reduce ? 1 : ease(span(p, T.roll2[0], T.roll2[1]));
      for (let i = 0; i < 4; i++) {
        const col = colRefs.current[i];
        if (!col) continue;
        /* 0000 -> 0300 -> 3000, each column rolling forward through its digits */
        const a = [0, 0, 0, 0][i];
        const b = [0, 3, 0, 0][i];
        const c = [3, 0, 0, 0][i];
        const step = (from: number, to: number, e: number) => from + ((to - from + 10) % 10) * e;
        let pos = step(a, b, r1);
        if (r2 > 0) pos = step(b, c, r2);
        col.style.transform = `translate3d(0,${((-pos * 100) / 11).toFixed(3)}%,0)`;
      }
      if (readRef.current) readRef.current.textContent = String(Math.round(d)).padStart(4, "0");

      /* light: daylight from above, lost with depth; the dark is total at 3000 */
      const surface = 1 - span(p, 0.04, 0.3);
      const water = Math.min(span(p, 0.06, 0.2), 1 - span(p, 0.5, 0.74));
      const solid = reduce ? 1 : ease(span(p, T.solid[0], T.solid[1]));
      const macro = reduce ? 0 : out3(span(p, T.macro[0], T.macro[1]));
      stage.style.setProperty("--surface", surface.toFixed(3));
      stage.style.setProperty("--water", water.toFixed(3));
      stage.style.setProperty("--solid", solid.toFixed(3));
      stage.style.setProperty("--macro", macro.toFixed(3));
      stage.style.setProperty("--deep", span(p, 0.45, 0.75).toFixed(3));
      stage.style.setProperty("--exit", reduce ? "0" : span(p, 0.965, 1).toFixed(3));

      /* the vehicle: dropped in on load, a slow sway, then the push to the markings */
      const intro = reduce ? 1 : out3(clamp((now - t0) / 1600));
      const sway = reduce ? 0 : Math.sin(time * 0.6) * 0.5 + Math.sin(time * 0.23) * 0.4;
      const w = rig.offsetWidth;
      const h = rig.offsetHeight;
      const left = rig.offsetLeft;
      const top = rig.offsetTop;
      const S = 1 + macro * (narrow.matches ? 1.9 : 2.6);
      const tx = (W * (narrow.matches ? 0.5 : 0.64) - left - MARK.x * w * S) * macro;
      const ty = (H * (narrow.matches ? 0.36 : 0.42) - top - MARK.y * h * S) * macro;
      const drop = (1 - intro) * -7 + (1 - macro) * Math.sin(p * Math.PI) * 1.5;
      rig.style.transform = `translate3d(${tx.toFixed(1)}px, calc(${ty.toFixed(1)}px + ${drop.toFixed(2)}%), 0) rotate(${(sway * (1 - macro)).toFixed(3)}deg) scale(${S.toFixed(4)})`;

      /* words: one slot, one voice at a time */
      fade(slots.title, [-1, 0, T.title.out[0], T.title.out[1]], p);
      fade(slots.s1, T.s1, p);
      fade(slots.s2, T.s2, p);
      fade(slots.at, T.at, p);
      fade(slots.close, [T.title.back[0], T.title.back[1], 2, 3], p);
      if (reduce) {
        for (const key of ["s1", "s2", "at", "close"]) fade(slots[key], [2, 3, 4, 5], p);
        fade(slots.title, [-1, 0, 2, 3], p);
      }

      /* particles */
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        const lit = 0.25 + 0.75 * Math.max(water, 0.35 * (1 - surface)) * (1 - macro);
        const speed = 0.2 + vel * 26;
        ctx.lineCap = "round";
        for (const q of pts) {
          const z = 0.35 + q.z * 1.4;
          q.y -= speed * z * (reduce ? 0 : 1) + 0.08 * z;
          q.x += Math.sin(time * 0.3 + q.s * 9) * 0.04 * z;
          if (q.y < -60) {
            q.y = H + Math.random() * 40;
            q.x = Math.random() * W;
          }
          const len = 1 + vel * 46 * z;
          ctx.strokeStyle = `rgba(190,230,228,${(lit * (0.12 + 0.4 * q.s) * Math.min(1, z)).toFixed(3)})`;
          ctx.lineWidth = q.z > 0.86 ? 2.2 : 0.6 + q.z;
          ctx.beginPath();
          ctx.moveTo(q.x, q.y);
          ctx.lineTo(q.x, q.y + len);
          ctx.stroke();
        }
      }
      lastP = p;
      if (!reduce) raf = requestAnimationFrame(render);
    };

    const kick = () => {
      readScroll();
      if (!raf && (visible || reduce)) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      seed();
      kick();
    };
    readScroll();
    raf = requestAnimationFrame(render);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      void lastP;
    };
  }, []);

  return (
    <section ref={wrapRef} id="top" data-s className="hrov s-film" aria-labelledby="hero-title">
      <div ref={stageRef} className="hrov-stage">
        <div className="hrov-bg" aria-hidden="true">
          <i className="hrov-surface" />
          <i className="hrov-water" />
        </div>

        {/* the depth, as an image: four rolling columns */}
        <div ref={numRef} className="hrov-num" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="hrov-digit">
              <span
                className="hrov-col"
                ref={(el) => {
                  colRefs.current[i] = el;
                }}
              >
                {DIGITS.map((n, j) => (
                  <span key={j}>{n}</span>
                ))}
              </span>
            </span>
          ))}
        </div>

        <canvas ref={canvasRef} className="hrov-snow" aria-hidden="true" />
        <span className="hrov-line" aria-hidden="true" />

        <div ref={rigRef} className="hrov-rig">
          <picture>
            <source media="(max-width: 820px)" srcSet="/media/rov-hero-m.webp" />
            { }
            <img src="/media/rov-hero.webp" alt={t.alt} width={1834} height={1798} fetchPriority="high" decoding="async" />
          </picture>
          <i className="hrov-tone hrov-warm" aria-hidden="true" />
          <i className="hrov-tone hrov-cold" aria-hidden="true" />
        </div>

        <div className="hrov-vig" aria-hidden="true" />

        <p className="mono hrov-eyebrow">
          <span className="tick" />
          {t.eyebrow}
          <span className="hrov-eyebrow-sub">{t.eyebrowSub}</span>
        </p>

        <div className="hrov-words">
          <h1 id="hero-title" data-slot="title" className="hrov-title">
            {t.title.map((l, i) => (
              <span key={l} className="ln" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p data-slot="s1" className="hrov-say" style={{ opacity: 0 }}>
            {t.statements[0]}
          </p>
          <p data-slot="s2" className="hrov-say" style={{ opacity: 0 }}>
            {t.statements[1]}
          </p>
          <p data-slot="at" className="mono hrov-at" style={{ opacity: 0 }}>
            3000 m · {t.at3000}
          </p>
          <div data-slot="close" className="hrov-close" style={{ opacity: 0 }} aria-hidden="true">
            <p className="hrov-title hrov-title-close">
              {t.title[0]} {t.title[1]}
            </p>
            <p className="hrov-closing">{t.closing}</p>
          </div>
        </div>

        <p className="mono hrov-markings">{t.markings}</p>

        <div className="mono hrov-read" aria-hidden="true">
          <b>
            <span ref={readRef}>0000</span> m
          </b>
          {t.depth}
        </div>
        <div className="mono hrov-cue" aria-hidden="true">
          <i />
          {t.cue}
        </div>
      </div>

      {/* for screen readers and reduced motion: the same words, in order */}
      <div className="sr">
        <p>{t.statements[0]}</p>
        <p>{t.statements[1]}</p>
        <p>3000 m · {t.at3000}</p>
        <p>{t.closing}</p>
        <p>{t.markings}</p>
      </div>
    </section>
  );
}
