"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { ROV_PARTS } from "@/lib/site";

/* Chapter 04: the machine as the object of the scene.
   A pinned stage: the vehicle is lowered into a pool of light while its parts
   are named one at a time. The parts are an ordered list in the DOM; the stage is
   presentation on top of it. No pinning on small screens or under reduced motion. */

export function Machine({ t }: { t: Dict["machine"] }) {
  const wrapRef = useRef<HTMLElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const obj = objRef.current;
    if (!wrap || !obj) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 820px)");
    let ticking = false;
    let last = -1;
    const update = () => {
      ticking = false;
      if (still.matches) {
        obj.style.transform = "";
        return;
      }
      const r = wrap.getBoundingClientRect();
      const run = wrap.offsetHeight - window.innerHeight;
      const k = Math.min(1, Math.max(0, -r.top / Math.max(1, run)));
      /* lowered into the light: a slow descent, a slight approach */
      const e = 1 - Math.pow(1 - Math.min(1, k * 1.6), 3);
      obj.style.transform = `translate3d(0,${(-16 + e * 16).toFixed(2)}%,0) scale(${(0.94 + k * 0.08).toFixed(4)})`;
      wrap.style.setProperty("--lit", e.toFixed(3));
      const n = t.parts.length;
      const idx = k < 0.14 ? 0 : Math.min(n - 1, Math.floor(((k - 0.14) / 0.8) * n));
      if (idx !== last) {
        last = idx;
        setActive(idx);
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
    still.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      still.removeEventListener("change", onScroll);
    };
  }, [t.parts.length]);

  const part = t.parts[active];
  const [px, py] = ROV_PARTS[part.id] ?? [50, 50];

  return (
    <section ref={wrapRef} id="rov" data-s className="machine s-object" aria-labelledby="rov-title">
      <div className="machine-stage">
        <div className="machine-copy">
          <p className="mono slate" data-reveal>
            <span className="tick" />
            {t.mark}
          </p>
          <h2 id="rov-title" className="machine-title" data-reveal>
            {t.title}
          </h2>
          <p className="machine-body" data-reveal style={{ ["--i" as string]: 1 }}>
            {t.body}
          </p>
        </div>

        <div className="machine-object" style={{ ["--px" as string]: `${px}%`, ["--py" as string]: `${py}%` }}>
          <div ref={objRef} className="machine-rig">
            <picture>
              <source media="(max-width: 820px)" srcSet="/media/rov-hero-m.webp" />
              { }
              <img src="/media/rov-hero.webp" alt={t.alt} width={1834} height={1798} loading="lazy" decoding="async" />
            </picture>
            {t.parts.map((p, i) => {
              const [x, y] = ROV_PARTS[p.id] ?? [50, 50];
              return (
                <span
                  key={p.id}
                  className="machine-dot"
                  data-on={i === active ? "1" : undefined}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-hidden="true"
                >
                  <i>{String(i + 1).padStart(2, "0")}</i>
                </span>
              );
            })}
          </div>
        </div>

        <div className="machine-parts">
          <p className="mono machine-parts-label">{t.partsLabel}</p>
          <ol>
            {t.parts.map((p, i) => (
              <li key={p.id} data-on={i === active ? "1" : undefined}>
                <span className="mono machine-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="machine-pname">{p.name}</span>
                <span className="machine-ptext">{p.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="machine-fleet">
          <p className="mono machine-parts-label">{t.fleetLabel}</p>
          <dl>
            {t.fleet.map((f) => (
              <div key={f.label}>
                <dd>
                  {f.value}
                  {"unit" in f && f.unit ? <i>{f.unit}</i> : null}
                </dd>
                <dt className="mono">{f.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mono machine-source">{t.source}</p>
        </div>
      </div>
    </section>
  );
}
