"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { SYSTEM_PINS, type Line } from "@/lib/site";

/* Chapter 05, the signature scene. Oceânica's own field render loops under fixed
   hotspots; the camera flies to the point that is picked. Filter by business line,
   guided tour, keyboard. On phones the field is a panorama you drag. */

const ZOOM = 2.1;
type Filter = Line | "all";

export function System({ t }: { t: Dict["system"] }) {
  const [sel, setSel] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [seen, setSeen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const visible = useMemo(() => SYSTEM_PINS.filter((p) => filter === "all" || p.lines.includes(filter)), [filter]);

  /* video plays only on screen, never under reduced motion */
  useEffect(() => {
    const view = viewRef.current;
    const v = videoRef.current;
    if (!view) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 820px)");
    const onMq = () => setNarrow(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const io = new IntersectionObserver(
      (e) => {
        const on = e[0].isIntersecting;
        if (on) setSeen(true);
        if (!v || reduce) return;
        if (on) {
          if (v.preload !== "auto") {
            v.preload = "auto";
            v.load();
          }
          void v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(view);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  /* phones: bring the picked point to the middle of the panorama */
  useEffect(() => {
    if (!narrow || sel === null) return;
    const view = viewRef.current;
    const pin = SYSTEM_PINS.find((p) => p.n === sel);
    if (!view || !pin) return;
    const world = view.firstElementChild as HTMLElement;
    view.scrollTo({ left: (pin.x / 100) * world.offsetWidth - view.clientWidth / 2, behavior: "smooth" });
  }, [sel, narrow]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const list = visible.map((p) => p.n);
      if (!list.length) return;
      if (sel === null || !list.includes(sel)) return setSel(dir === 1 ? list[0] : list[list.length - 1]);
      const i = list.indexOf(sel);
      setSel(list[(i + dir + list.length) % list.length]);
    },
    [visible, sel],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Escape" && sel !== null) {
      e.preventDefault();
      setSel(null);
    }
  };

  const pick = (f: Filter) => {
    setFilter(f);
    if (sel !== null && f !== "all" && !SYSTEM_PINS.find((p) => p.n === sel)?.lines.includes(f)) setSel(null);
  };

  /* the flight: centre the point, never show past the edge of the picture */
  const pin = sel === null ? null : SYSTEM_PINS.find((p) => p.n === sel)!;
  let transform = "none";
  if (pin && !narrow) {
    const clamp = (v: number) => Math.min(0, Math.max((1 - ZOOM) * 100, v));
    const tx = clamp(50 - pin.x * ZOOM);
    const ty = clamp(50 - pin.y * ZOOM);
    transform = `translate3d(${tx}%, ${ty}%, 0) scale(${ZOOM})`;
  }
  const item = pin ? t.items[pin.n as keyof typeof t.items] : null;
  const pos = pin ? visible.findIndex((p) => p.n === pin.n) : -1;
  const lines: Line[] = ["prevention", "contingency", "engineering"];

  return (
    <section id="system" data-s className="system s-map" aria-labelledby="system-title">
      <div className="wrap system-head">
        <p className="mono slate" data-reveal>
          <span className="tick" />
          {t.mark}
        </p>
        <h2 id="system-title" className="display" data-reveal>
          {t.title}
        </h2>
        <p className="lede-body" data-reveal style={{ ["--i" as string]: 2 }}>
          {t.body}
        </p>
      </div>

      <div className="wrap system-bar">
        <div className="chips mono" role="group" aria-label={t.mark}>
          {(["all", ...lines] as Filter[]).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => pick(f)}>
              {f === "all" ? t.all : t.lines[f]}
              <sup>{String(f === "all" ? SYSTEM_PINS.length : SYSTEM_PINS.filter((p) => p.lines.includes(f)).length).padStart(2, "0")}</sup>
            </button>
          ))}
        </div>
        <div className="tour mono">
          <span className="tour-label">{t.tour}</span>
          <button type="button" onClick={() => step(-1)} aria-label={t.prev}>
            ←
          </button>
          <span className="tour-count" aria-hidden="true">
            {pos >= 0 ? String(pos + 1).padStart(2, "0") : "––"} / {String(visible.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => step(1)} aria-label={t.next}>
            →
          </button>
        </div>
      </div>

      <div className="system-frame" data-zoomed={pin && !narrow ? "1" : undefined}>
        { }
        <div ref={viewRef} className="map-view" onKeyDown={onKey} tabIndex={0} aria-label={t.hint} data-lenis-prevent-horizontal>
          <div className="map-world" style={{ transform }} data-seen={seen ? "1" : undefined}>
            <video ref={videoRef} className="map-media" muted loop playsInline preload="none" poster={narrow ? "/media/system-m.webp" : "/media/system.webp"} aria-hidden="true">
              <source media="(max-width: 820px)" src="/media/system-m.mp4" type="video/mp4" />
              <source src="/media/system.mp4" type="video/mp4" />
            </video>
            {SYSTEM_PINS.map((p, i) => {
              const on = filter === "all" || p.lines.includes(filter);
              const name = t.items[p.n as keyof typeof t.items].name;
              return (
                <button
                  key={p.n}
                  type="button"
                  className="pin mono"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, ["--i" as string]: i, ["--z" as string]: pin && !narrow ? 1 / ZOOM : 1 }}
                  data-dim={on ? undefined : "1"}
                  data-sel={sel === p.n ? "1" : undefined}
                  aria-pressed={sel === p.n}
                  aria-label={`${t.pinLabel} ${p.n}: ${name}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setSel(sel === p.n ? null : p.n)}
                >
                  <span className="pin-n">{p.n}</span>
                  <span className="pin-label" aria-hidden="true">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="map-card" aria-live="polite">
          {pin && item ? (
            <div key={pin.n} className="map-card-in">
              <p className="mono map-card-n">
                {t.pinLabel} {String(pin.n).padStart(2, "0")}
                <span className="map-card-tags">
                  {pin.lines.map((l) => (
                    <span key={l}>{t.lines[l]}</span>
                  ))}
                </span>
              </p>
              <h3 className="map-card-name">{item.name}</h3>
              <p className="map-card-text">{item.text}</p>
              <div className="map-card-nav mono">
                <button type="button" onClick={() => step(-1)} aria-label={t.prev}>
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label={t.next}>
                  →
                </button>
                <button type="button" className="map-close" onClick={() => setSel(null)}>
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <p className="mono map-hint">
              <span className="tick" />
              {narrow ? t.drag : t.hint}
            </p>
          )}
        </div>
      </div>
      <p className="wrap mono system-caption">{t.caption}</p>
    </section>
  );
}
