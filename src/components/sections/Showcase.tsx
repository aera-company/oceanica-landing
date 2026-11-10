"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { ASSETS, srcSet } from "@/lib/site";
import { Ext } from "./Ext";

/* Chapter 04: the stage. One asset at a time, full screen, real photograph.
   Selection by category, by index, by arrow keys and by swipe. The incoming
   picture wipes in over the outgoing one; nothing fades to black. */

export function Showcase({ t, a11y }: { t: Dict["showcase"]; a11y: Dict["a11y"] }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (n: number) => {
      const next = (n + ASSETS.length) % ASSETS.length;
      if (next === idx) return;
      setPrev(idx);
      setIdx(next);
      setSeen((s) => new Set(s).add(next));
    },
    [idx],
  );

  /* load the first picture only when the stage is near, the neighbours once it is on screen */
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "120% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!near) return;
    const n = (idx + 1) % ASSETS.length;
    /* warm the next picture in the size this screen will ask for */
    const img = new Image();
    const set = srcSet(ASSETS[n].src, ASSETS[n].w);
    if (set) {
      img.sizes = "100vw";
      img.srcset = set;
    }
    img.src = ASSETS[n].src;
    void img.decode?.().catch(() => {});
  }, [near, idx]);

  useEffect(() => {
    const btn = stripRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    const strip = stripRef.current;
    if (btn && strip) strip.scrollTo({ left: btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
  }, [idx]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(idx - 1);
    }
  };

  const a = ASSETS[idx];
  const item = t.items[a.id];
  const cats = ["vessels", "rovs"] as const;

  return (
    <section id="assets" data-s className="stage s-stage" aria-labelledby="assets-title">
      <div
        ref={stageRef}
        className="stage-view"
        data-fit={a.fit}
        onKeyDown={onKey}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x;
          const dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.6) go(idx + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="stage-pics" aria-hidden="true">
          {ASSETS.map((p, i) =>
            near && seen.has(i) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.id}
                src={p.src}
                srcSet={srcSet(p.src, p.w)}
                sizes="100vw"
                alt=""
                width={p.w}
                height={p.h}
                decoding="async"
                className="stage-pic"
                data-fit={p.fit}
                data-state={i === idx ? "on" : i === prev ? "was" : "off"}
                style={{ objectPosition: p.pos }}
              />
            ) : null,
          )}
        </div>
        <div className="stage-scrim" aria-hidden="true" />

        <div className="stage-top">
          <h2 id="assets-title" className="mono slate">
            <span className="tick" />
            {t.mark}
          </h2>
          <div className="cats mono" role="group" aria-label={t.title}>
            {cats.map((c) => {
              const first = ASSETS.findIndex((x) => x.cat === c);
              const count = ASSETS.filter((x) => x.cat === c).length;
              return (
                <button key={c} type="button" aria-pressed={a.cat === c} onClick={() => a.cat !== c && go(first)}>
                  {t.cats[c]}
                  <sup>{String(count).padStart(2, "0")}</sup>
                </button>
              );
            })}
          </div>
        </div>

        {/* keyed: the text block re-enters with each selection */}
        <div key={a.id} className="stage-info" role="tabpanel" id="asset-panel" aria-labelledby={`asset-tab-${a.id}`}>
          <div className="stage-id">
            <p className="mono stage-kind">{item.kind}</p>
            <h3 className="stage-name">{item.name}</h3>
            <p className="stage-text">{item.text}</p>
            <span className="sr">{item.alt}</span>
          </div>
          <div className="stage-side">
            <figure className="loupe" aria-hidden="true">
              <div style={{ backgroundImage: near ? `url(${a.src})` : undefined, backgroundPosition: `${a.loupe[0]}% ${a.loupe[1]}%` }} />
              <figcaption className="mono">{t.detail}</figcaption>
            </figure>
            <dl className="specs">
              {item.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="stage-bar">
          <div ref={stripRef} className="strip mono" role="tablist" aria-label={t.title}>
            {ASSETS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`asset-tab-${p.id}`}
                aria-selected={i === idx}
                aria-controls="asset-panel"
                tabIndex={i === idx ? 0 : -1}
                onClick={() => go(i)}
              >
                <span className="strip-n">{String(i + 1).padStart(2, "0")}</span>
                {t.items[p.id].name}
              </button>
            ))}
          </div>
          <div className="stage-nav">
            <button type="button" aria-label={a11y.prev} onClick={() => go(idx - 1)}>
              ←
            </button>
            <span className="mono stage-count" aria-hidden="true">
              {String(idx + 1).padStart(2, "0")} / {String(ASSETS.length).padStart(2, "0")}
            </span>
            <button type="button" aria-label={a11y.next} onClick={() => go(idx + 1)}>
              →
            </button>
          </div>
        </div>
      </div>

      <div className="stage-more mono">
        {t.more.map((m) => (
          <Ext key={m.href} to={m.href} note={a11y.external}>
            {m.label}
          </Ext>
        ))}
      </div>
    </section>
  );
}
