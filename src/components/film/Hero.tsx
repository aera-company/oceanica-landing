"use client";

import { useEffect, useRef } from "react";
import { BEATS, MAX_DEPTH, SHOT_STARTS, depthAt, pad4, scene, span, swell } from "@/lib/film";
import type { Dict } from "@/lib/i18n";

/* One tall wrapper, one sticky stage. Scroll is the only clock.
   The picture is drawn by <Film/>; this component is the interface on top of it:
   real HTML, fixed positions, written through refs (no React state on scroll). */

export function Hero({ t, a11y, shots }: { t: Dict["hero"]; a11y: Dict["a11y"]; shots: string[] }) {
  const wrapRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dryRef = useRef<HTMLDivElement>(null);
  const dryInRef = useRef<HTMLDivElement>(null);
  const wetRef = useRef<HTMLDivElement>(null);
  const wetInRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const depthBoxRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const root = document.documentElement;
    const stageEl = wrap.querySelector<HTMLElement>(".hero-stage");
    /* first opaque section after the film: the manifesto in the light theme, the paper chapter in the dark one */
    const covers = { light: document.getElementById("company"), dark: document.getElementById("services") };
    let filmEl: HTMLElement | null = null;
    let ticking = false;
    const last = { depth: -1, shot: -1 };

    /* the statement of shot 02 is cut by the same waterline the picture draws */
    const applyLine = (line: number, time = 21) => {
      const film = filmEl || (filmEl = document.querySelector<HTMLElement>(".film"));
      const vh = film?.clientHeight || window.innerHeight;
      const vw = film?.clientWidth || window.innerWidth;
      const H = stageEl?.clientHeight || vh;
      const x = (0.3 - 0.5) * (vw / vh);
      const y = (0.5 - line - swell(x, time)) * vh;
      const yd = Math.min(H, Math.max(0, y));
      if (dryRef.current && dryInRef.current) {
        dryRef.current.style.transform = `translate3d(0,${yd - H}px,0)`;
        dryInRef.current.style.transform = `translate3d(0,${H - yd}px,0)`;
      }
      if (wetRef.current && wetInRef.current) {
        wetRef.current.style.transform = `translate3d(0,${yd}px,0)`;
        wetInRef.current.style.transform = `translate3d(0,${-yd}px,0)`;
      }
    };
    scene.onLine = applyLine;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      /* static tier: the hero is one still frame, the story is plain content below it */
      const frozen = root.dataset.tier === "static";
      const p = frozen || scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      scene.p = p;
      scene.past = frozen ? 0 : Math.max(0, -rect.top - scrollable) / window.innerHeight;
      const cover = covers[root.dataset.theme === "light" ? "light" : "dark"];
      scene.idle = cover ? cover.getBoundingClientRect().top <= 0 : false;
      if (scene.idle && scene.past > 1) return;

      if (root.dataset.tier !== "full") {
        const line = p < 0.36 ? -0.9 : -0.9 + Math.min(1, Math.max(0, (p - 0.38) / 0.14)) * 1.75;
        applyLine(line);
      }

      if (introRef.current) {
        const o = 1 - span(p, 0.11, 0.165);
        introRef.current.style.opacity = String(o);
        introRef.current.style.visibility = o <= 0 ? "hidden" : "visible";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - span(p, 0.01, 0.05));

      BEATS.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const a = span(p, b.in[0], b.in[1]);
        const z = span(p, b.out[0], b.out[1]);
        const o = Math.min(a, 1 - z);
        el.style.opacity = String(o);
        el.style.visibility = o <= 0 ? "hidden" : "visible";
        if (!b.cut) el.style.transform = `translate3d(0,${(1 - a) * 22 - z * 22}px,0)`;
      });

      let shot = 0;
      for (let i = 0; i < SHOT_STARTS.length; i++) if (p >= SHOT_STARTS[i]) shot = i;
      if (shot !== last.shot && railRef.current) {
        last.shot = shot;
        railRef.current.querySelectorAll("li").forEach((li, i) => {
          li.dataset.state = i === shot ? "on" : i < shot ? "done" : "";
        });
      }

      if (depthBoxRef.current) depthBoxRef.current.style.opacity = String(span(p, 0.5, 0.56));
      const d = Math.round(depthAt(p));
      if (d !== last.depth) {
        last.depth = d;
        if (depthRef.current) depthRef.current.textContent = pad4(d);
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${d / MAX_DEPTH})`;
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
    window.addEventListener("oc:theme", onScroll);
    return () => {
      scene.onLine = null;
      scene.idle = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("oc:theme", onScroll);
    };
  }, []);

  const beatBody = (id: (typeof BEATS)[number]["id"], Tag: "h2" | "p") => {
    const b = t.beats[id];
    return (
      <>
        <p className="mono slate">
          <span className="tick" />
          {b.slate}
        </p>
        <Tag className="beat-text">{b.text}</Tag>
        <p className="beat-note">{b.note}</p>
        <p className="mono beat-meta">{b.meta}</p>
      </>
    );
  };

  return (
    <section ref={wrapRef} id="top" data-s className="hero s-film" aria-label={a11y.hero}>
      <div className="hero-stage">
        <div className="hero-scrim" aria-hidden="true" />

        {/* shot 01: the vessel */}
        <div ref={introRef} className="hero-intro">
          <div className="hero-head">
            <p className="mono slate">
              <span className="tick" />
              01 · {shots[0]}
            </p>
            <h1 className="hero-title">
              <span className="block">{t.title[0]}</span>
              <span className="block">{t.title[1]}</span>
            </h1>
          </div>
          <div className="hero-foot">
            <p className="hero-lede">{t.lede}</p>
            <p className="mono beat-meta">{t.asset}</p>
          </div>
        </div>

        {BEATS.map((b, i) =>
          b.cut ? (
            /* dry above the waterline, refracted below it */
            <div
              key={b.id}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className="beat-cut"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div ref={dryRef} className="cut">
                <div ref={dryInRef} className="cut-in">
                  <div className="beat">{beatBody(b.id, "h2")}</div>
                </div>
              </div>
              <div ref={wetRef} className="cut" aria-hidden="true">
                <div ref={wetInRef} className="cut-in">
                  <div className="beat beat-wet">{beatBody(b.id, "p")}</div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={b.id}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className={`beat${b.side === "right" ? " beat-right" : ""}${b.busy ? " beat-busy" : ""}`}
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {beatBody(b.id, "h2")}
            </div>
          ),
        )}

        {/* shot index: where the film is, as a list */}
        <ol ref={railRef} className="rail mono" aria-hidden="true">
          {shots.map((s, i) => (
            <li key={s}>
              <span className="rail-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="rail-l">{s}</span>
            </li>
          ))}
        </ol>

        {/* depth: supporting read-out, only once the camera is under */}
        <div ref={depthBoxRef} className="depth mono" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="depth-num">
            <span ref={depthRef}>0000</span>
            <i>m</i>
          </span>
          <div className="depth-bar">
            <div ref={fillRef} className="depth-fill" />
          </div>
        </div>

        <div ref={cueRef} className="cue mono" aria-hidden="true">
          <span className="cue-line" />
          {t.cue}
        </div>
      </div>

      {/* reduced motion: the same story as plain reading content */}
      <div className="hero-static">
        {BEATS.map((b) => (
          <div key={b.id} className="hero-static-item">
            {beatBody(b.id, "h2")}
          </div>
        ))}
      </div>
    </section>
  );
}
