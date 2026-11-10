import type { Dict } from "@/lib/i18n";
import { CONTACT, LINKS, srcSet } from "@/lib/site";
import { Ext } from "./Ext";

/* Chapter 06 and the footer: back at the surface, heading out. Always dark. */
export function Closing({ t }: { t: Dict }) {
  const c = t.closing;
  const f = t.footer;
  return (
    <footer id="contact" data-s className="closing s-close">
      <div className="closing-pic" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-parallax src="/media/closing-vessel.webp" srcSet={srcSet("/media/closing-vessel.webp", 2048)} sizes="100vw" alt="" width={2048} height={1152} loading="lazy" decoding="async" />
      </div>
      <span className="sr">{c.alt}</span>

      <section className="closing-main wrap" aria-labelledby="contact-title">
        <p className="mono slate" data-reveal>
          <span className="tick" />
          {c.mark}
        </p>
        <h2 id="contact-title" className="closing-title" data-reveal>
          {c.title}
        </h2>
        <div className="closing-actions" data-reveal style={{ ["--i" as string]: 1 }}>
          <a className="btn btn-solid mono" href={`mailto:${CONTACT.email}`}>
            {c.primary}
            <span aria-hidden="true">→</span>
          </a>
          <Ext to="commercial" note={t.a11y.external} className="btn mono">
            {c.secondary}
          </Ext>
        </div>

        <dl className="closing-facts" data-reveal style={{ ["--i" as string]: 2 }}>
          <div>
            <dt className="mono">{c.labels.email}</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
          </div>
          <div>
            <dt className="mono">{c.labels.phone}</dt>
            <dd>
              {CONTACT.phones.map((p) => (
                <a key={p.href} href={p.href}>
                  {p.label}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="mono">{c.labels.office}</dt>
            <dd>
              <address>{CONTACT.address}</address>
              <span className="closing-bases">{c.body}</span>
            </dd>
          </div>
        </dl>
      </section>

      <div className="foot wrap">
        <nav className="foot-cols" aria-label={f.cols.site}>
          <div>
            <p className="mono foot-h">{f.cols.site}</p>
            <ul>
              {t.nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono foot-h">{f.cols.channels}</p>
            <ul>
              {f.channels.map((l) => (
                <li key={l.href}>
                  <Ext to={l.href} note={t.a11y.external}>
                    {l.label}
                  </Ext>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono foot-h">{f.cols.social}</p>
            <ul>
              {(["linkedin", "instagram", "facebook"] as const).map((s) => (
                <li key={s}>
                  <a href={LINKS[s]} target="_blank" rel="noopener noreferrer" className="ext">
                    <span className="ext-label">{s[0].toUpperCase() + s.slice(1)}</span>
                    <span className="ext-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="foot-base mono">
          <p>
            {CONTACT.legal} · CNPJ {CONTACT.cnpj}
          </p>
          <a href="#top" className="foot-top">
            {f.top} <span aria-hidden="true">↑</span>
          </a>
        </div>
        <p className="foot-note">{f.disclaimer}</p>
      </div>
    </footer>
  );
}
