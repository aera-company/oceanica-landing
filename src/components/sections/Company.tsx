import type { Dict } from "@/lib/i18n";
import { Ext } from "./Ext";

/* Chapter 05: the institutional routes a real visitor comes for. */
export function Company({ t, a11y }: { t: Dict["company"]; a11y: Dict["a11y"] }) {
  return (
    <section id="institutional" data-s className="company s-inst" aria-labelledby="inst-title">
      <div className="wrap">
        <header className="lede-grid">
          <p className="mono slate" data-reveal>
            <span className="tick" />
            {t.mark}
          </p>
          <h2 id="inst-title" className="display" data-reveal>
            {t.title}
          </h2>
        </header>

        <div className="rows">
          {t.rows.map((r, i) => (
            <article key={r.id} id={r.id} className="row" aria-labelledby={`${r.id}-title`}>
              <span className="mono row-idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 id={`${r.id}-title`} className="row-name" data-reveal>
                {r.name}
              </h3>
              <div className="row-main">
                <p className="row-lead" data-reveal>
                  {r.lead}
                </p>
                <p className="row-body" data-reveal style={{ ["--i" as string]: 1 }}>
                  {r.body}
                </p>
                {r.id === "careers" && (
                  <figure className="frame row-figure" data-reveal="frame">
                    <div className="frame-clip">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/media/people-training.webp" alt={t.alt} width={863} height={681} loading="lazy" decoding="async" />
                    </div>
                    <figcaption className="mono">{t.caption}</figcaption>
                  </figure>
                )}
              </div>
              <ul className="row-links mono" data-reveal style={{ ["--i" as string]: 2 }}>
                {r.links.map((l) => (
                  <li key={l.href}>
                    <Ext to={l.href} note={a11y.external}>
                      {l.label}
                    </Ext>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
