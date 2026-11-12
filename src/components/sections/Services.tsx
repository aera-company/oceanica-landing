import type { Dict } from "@/lib/i18n";
import { srcSet } from "@/lib/site";
import { Ext } from "./Ext";

/* Chapter 03, on paper. Three chapters with the same anatomy:
   what Oceânica does, the challenge it answers, the proof that it can. */

const MEDIA: Record<string, { src: string; w: number; h: number; shape: "wide" | "tall" }> = {
  prevention: { src: "/media/svc-prevention.webp", w: 2048, h: 1152, shape: "wide" },
  contingency: { src: "/media/svc-contingency.webp", w: 1500, h: 2000, shape: "tall" },
  engineering: { src: "/media/svc-engineering.webp", w: 2560, h: 1422, shape: "wide" },
};

export function Services({ t, a11y }: { t: Dict["services"]; a11y: Dict["a11y"] }) {
  return (
    <section id="services" data-s className="services s-cap" aria-labelledby="services-title">
      <div className="wrap">
        <header className="lede-grid">
          <p className="mono slate" data-reveal>
            <span className="tick" />
            {t.mark}
          </p>
          <h2 id="services-title" className="display" data-reveal>
            {t.title}
          </h2>
          <p className="lede-body" data-reveal style={{ ["--i" as string]: 2 }}>
            {t.intro}
          </p>
        </header>

        {t.items.map((s, i) => {
          const m = MEDIA[s.id];
          return (
            <article key={s.id} id={s.id} className={`svc svc-${m.shape}`} aria-labelledby={`${s.id}-title`}>
              <div className="svc-head">
                <span className="svc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="mono svc-tag" data-reveal>
                    {s.tag}
                  </p>
                  <h3 id={`${s.id}-title`} className="svc-name" data-reveal>
                    {s.name}
                  </h3>
                </div>
                <p className="svc-lead" data-reveal style={{ ["--i" as string]: 1 }}>
                  {s.lead}
                </p>
              </div>

              <div className="svc-body">
                <figure className="frame svc-figure" data-reveal="frame">
                  <div className="frame-clip">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img data-parallax src={m.src} srcSet={srcSet(m.src, m.w)} sizes="(max-width: 820px) 100vw, 60vw" alt={s.alt} width={m.w} height={m.h} loading="lazy" decoding="async" />
                  </div>
                  <figcaption className="mono">{s.caption}</figcaption>
                </figure>

                <div className="svc-text">
                  <dl className="qa">
                    <div data-reveal>
                      <dt className="mono">{t.labels.what}</dt>
                      <dd>{s.what}</dd>
                    </div>
                    <div data-reveal style={{ ["--i" as string]: 1 }}>
                      <dt className="mono">{t.labels.challenge}</dt>
                      <dd>{s.challenge}</dd>
                    </div>
                    <div data-reveal style={{ ["--i" as string]: 2 }}>
                      <dt className="mono">{t.labels.proof}</dt>
                      <dd>{s.proof}</dd>
                    </div>
                  </dl>

                  <dl className="proofs">
                    {s.figures.map((f, k) => (
                      <div key={f.label} data-reveal style={{ ["--i" as string]: k }}>
                        <dd>{f.value}</dd>
                        <dt className="mono">{f.label}</dt>
                      </div>
                    ))}
                  </dl>

                  <div className="scope" data-reveal>
                    <p className="mono scope-label">{t.labels.scope}</p>
                    <ul>
                      {s.scope.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <Ext to={s.id} note={a11y.external} className="mono">
                      {t.labels.more}
                    </Ext>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
