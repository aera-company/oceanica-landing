"use client";

import { useEffect, useRef } from "react";
import { MAX_DEPTH, depthAt, lampAt, pad4, pressureBar, scene, span, surfaceLight, swell, waterline, zone } from "@/lib/depth";
import { HERO } from "@/lib/copy";

/* The hero is one tall wrapper with one sticky stage. Scroll is the only clock.
   Everything on the scroll path is written through refs: no React state. */

const TAPE_PX_PER_M = 0.5;
const MARKS = Array.from({ length: MAX_DEPTH / 250 + 1 }, (_, i) => i * 250);

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const dryRef = useRef<HTMLDivElement>(null);
  const dryInRef = useRef<HTMLDivElement>(null);
  const wetRef = useRef<HTMLDivElement>(null);
  const wetInRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const depthRef = useRef<HTMLSpanElement>(null);
  const zoneRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const root = document.documentElement;
    const last = { depth: -1, zone: "", bar: "", light: "" };
    let ticking = false;
    let waterEl: HTMLElement | null = null;
    const stageEl = wrap.querySelector<HTMLElement>(".hero-stage");

    /* the headline is cut by the same line the shader draws */
    const applyLine = (line: number, time = 21) => {
      /* the picture fills the fixed layer, the stage is 100svh: on phones they differ */
      const water = waterEl || (waterEl = document.querySelector<HTMLElement>(".water"));
      const vh = water?.clientHeight || window.innerHeight;
      const vw = water?.clientWidth || window.innerWidth;
      const H = stageEl?.clientHeight || vh;
      /* sample the swell where the headline sits (about a third in from the left) */
      const x = (Math.min(0.5, 0.34) - 0.5) * (vw / vh);
      const y = (0.5 - line - swell(x, time)) * vh;
      if (dryRef.current && dryInRef.current) {
        dryRef.current.style.transform = `translate3d(0,${y - H}px,0)`;
        dryInRef.current.style.transform = `translate3d(0,${H - y}px,0)`;
      }
      if (wetRef.current && wetInRef.current) {
        wetRef.current.style.transform = `translate3d(0,${y}px,0)`;
        wetInRef.current.style.transform = `translate3d(0,${-y}px,0)`;
      }
    };
    scene.onLine = applyLine;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      /* static tier: the hero is a still frame, the story is plain content below it */
      const frozen = root.dataset.tier === "static";
      const p = frozen || scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      const past = Math.max(0, -rect.top - scrollable) / window.innerHeight;

      scene.p = p;
      scene.line = waterline(p);
      scene.depth = depthAt(p);
      /* after the hero the work light dims but stays on: the page lives at depth */
      scene.lamp = lampAt(p) * (1 - 0.55 * Math.min(1, past));
      scene.travel = p * 9 + past * 2.2;

      if (root.dataset.tier !== "full") applyLine(scene.line);

      if (introRef.current) {
        const o = 1 - span(p, 0.12, 0.2);
        introRef.current.style.opacity = String(o);
        introRef.current.style.visibility = o <= 0 ? "hidden" : "visible";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - span(p, 0.01, 0.06));

      HERO.beats.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const o = Math.min(span(p, b.in[0], b.in[1]), 1 - span(p, b.out[0], b.out[1]));
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0,${(1 - span(p, b.in[0], b.in[1])) * 28 - span(p, b.out[0], b.out[1]) * 28}px,0)`;
        el.style.visibility = o <= 0 ? "hidden" : "visible";
      });

      const d = Math.round(scene.depth);
      if (d !== last.depth) {
        last.depth = d;
        if (depthRef.current) depthRef.current.textContent = pad4(d);
        if (tapeRef.current) tapeRef.current.style.transform = `translate3d(0,${-d * TAPE_PX_PER_M}px,0)`;
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${d / MAX_DEPTH})`;
        const z = zone(d);
        if (z !== last.zone && zoneRef.current) zoneRef.current.textContent = last.zone = z;
        const bar = String(Math.round(pressureBar(d))).padStart(3, "0");
        if (bar !== last.bar && barRef.current) barRef.current.textContent = last.bar = bar;
        const l = surfaceLight(d);
        const light = l >= 10 ? l.toFixed(0) : l >= 0.1 ? l.toFixed(1) : "< 0.1";
        if (light !== last.light && lightRef.current) lightRef.current.textContent = last.light = light;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      scene.onLine = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const headline = (
    <>
      <span className="block">{HERO.title[0]}</span>
      <span className="block">{HERO.title[1]}</span>
    </>
  );

  return (
    <section ref={wrapRef} className="hero" aria-label="Oceânica">
      <div className="hero-stage">
        {/* headline, cut by the waterline: dry above, refracted below */}
        <div ref={introRef} className="hero-intro">
          <div ref={dryRef} className="cut">
            <div ref={dryInRef} className="cut-in">
              <h1 className="hero-title">{headline}</h1>
            </div>
          </div>
          <div ref={wetRef} className="cut" aria-hidden="true">
            <div ref={wetInRef} className="cut-in">
              <div className="hero-title hero-title-wet">{headline}</div>
            </div>
          </div>
          <p className="hero-lede">{HERO.lede}</p>
        </div>

        {/* statements: fixed position, the sea moves behind them */}
        {HERO.beats.map((b, i) => (
          <div
            key={b.mark}
            ref={(el) => {
              beatRefs.current[i] = el;
            }}
            className="beat"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="mono beat-mark">
              <span className="tick" />
              {b.mark}
            </p>
            <p className="beat-text">{b.text}</p>
            {b.note && <p className="beat-note">{b.note}</p>}
          </div>
        ))}

        {/* read-outs: physics of the water column, not company data */}
        <dl className="telemetry mono" aria-hidden="true">
          <div>
            <dt>Pressure</dt>
            <dd>
              <span ref={barRef}>001</span> bar
            </dd>
          </div>
          <div>
            <dt>Surface light</dt>
            <dd>
              <span ref={lightRef}>100</span> %
            </dd>
          </div>
        </dl>

        {/* depth gauge: the page's progress system */}
        <div className="gauge mono" aria-hidden="true">
          <div className="gauge-window">
            <div ref={tapeRef} className="gauge-tape">
              {MARKS.map((m) => (
                <span key={m} className="gauge-mark" style={{ top: m * TAPE_PX_PER_M }}>
                  {pad4(m)}
                </span>
              ))}
            </div>
            <span className="gauge-pointer" />
          </div>
          <div className="gauge-read">
            <span className="gauge-num">
              <span ref={depthRef}>0000</span>
              <i>m</i>
            </span>
            <span ref={zoneRef} className="gauge-zone">
              Surface
            </span>
            <div className="gauge-bar">
              <div ref={fillRef} className="gauge-fill" />
            </div>
          </div>
        </div>

        <div ref={cueRef} className="cue mono" aria-hidden="true">
          <span className="cue-line" />
          {HERO.cue}
        </div>
      </div>

      {/* reduced motion: the same story as plain reading content */}
      <div className="hero-static">
        {HERO.beats.map((b) => (
          <div key={b.mark} className="hero-static-item">
            <p className="mono beat-mark">
              <span className="tick" />
              {b.mark}
            </p>
            <p className="beat-text">{b.text}</p>
            {b.note && <p className="beat-note">{b.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
