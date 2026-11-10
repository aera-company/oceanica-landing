"use client";

import { useEffect, useRef } from "react";
import { BELOW } from "@/lib/copy";

/* Chapter 02. Normal scroll, no pinning. It has no background of its own:
   the water column keeps running behind it and the work light stays on.
   Real photography enters here, uncovered once by a band of light. */

export function Below() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-lit]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.lit = "on";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.28 },
    );
    els.forEach((el) => io.observe(el));

    /* decode the photographs while the visitor is still in the hero,
       so entering the chapter never costs a frame */
    const warm = () => ref.current?.querySelectorAll("img").forEach((img) => void img.decode?.().catch(() => {}));
    const idle = window.requestIdleCallback ? window.requestIdleCallback(warm, { timeout: 2500 }) : window.setTimeout(warm, 1200);
    return () => {
      io.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return (
    <section ref={ref} id="solutions" className="below" aria-labelledby="below-title">
      <div className="below-lead">
        <figure className="plate plate-rov" data-lit="off">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/oceanica/rov-work-class.jpg" alt="Work Class ROV operating on a subsea structure" width={1900} height={811} decoding="async" />
          <span className="plate-shade" aria-hidden="true" />
          <figcaption className="mono">{BELOW.rovCaption}</figcaption>
        </figure>

        <div className="below-copy">
          <p className="mono beat-mark">
            <span className="tick" />
            {BELOW.mark}
          </p>
          <h2 id="below-title" className="below-title">
            {BELOW.title}
          </h2>
          <p className="below-body">{BELOW.body}</p>
        </div>
      </div>

      <dl className="figures">
        {BELOW.figures.map((f) => (
          <div key={f.label} className="figure" data-lit="off">
            <dd>
              {f.value}
              {f.unit && <i>{f.unit}</i>}
            </dd>
            <dt className="mono">{f.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mono source">{BELOW.source}</p>

      <ol className="lines">
        {BELOW.lines.map((l) => (
          <li key={l.idx}>
            <a href={l.href} className="line-row">
              <span className="mono line-idx">{l.idx}</span>
              <span className="line-name">{l.name}</span>
              <span className="line-desc">{l.desc}</span>
              <span className="line-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="surface-unit">
        <figure className="plate plate-vessel" data-lit="off">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/oceanica/oceanicasub-x.jpg" alt="OCEANICASUB X under way" width={1920} height={1079} decoding="async" />
          <span className="plate-shade" aria-hidden="true" />
        </figure>
        <div>
          <p className="mono beat-mark">
            <span className="tick" />
            {BELOW.vessel.mark}
          </p>
          <p className="surface-text">{BELOW.vessel.text}</p>
          <p className="mono surface-meta">{BELOW.vessel.meta}</p>
        </div>
      </div>

      <footer className="concept-foot mono">
        <span>{BELOW.foot[0]}</span>
        <span>{BELOW.foot[1]}</span>
      </footer>
    </section>
  );
}
