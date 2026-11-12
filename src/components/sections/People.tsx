import type { Dict } from "@/lib/i18n";
import { srcSet } from "@/lib/site";

/* Chapter 03, the first daylight after the descent. The person behind the work.
   The diver picture shows the profession; the numbers beside it are Oceânica's. */
export function People({ t }: { t: Dict["people"] }) {
  return (
    <section id="people" data-s className="people s-paper" aria-labelledby="people-title">
      <div className="wrap">
        <p className="mono slate" data-reveal>
          <span className="tick" />
          {t.mark}
        </p>
        <h2 id="people-title" className="people-title" data-reveal>
          {t.title}
        </h2>

        <div className="people-grid">
          <figure className="frame people-figure" data-reveal="frame">
            <div className="frame-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax
                src="/media/people-diver.webp"
                srcSet={srcSet("/media/people-diver.webp", 2560)}
                sizes="(max-width: 820px) 100vw, 58vw"
                alt={t.alt}
                width={2560}
                height={1708}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mono">{t.caption}</figcaption>
          </figure>

          <div className="people-text">
            <p className="people-body" data-reveal>
              {t.body}
            </p>
            <dl className="people-figures">
              {t.figures.map((f, i) => (
                <div key={f.label} data-reveal style={{ ["--i" as string]: i }}>
                  <dd>{f.value}</dd>
                  <dt className="mono">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="bridge">
          <figure className="frame bridge-figure" data-reveal="frame">
            <div className="frame-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/people-training.webp" alt={t.tankAlt} width={863} height={681} loading="lazy" decoding="async" />
            </div>
            <figcaption className="mono">{t.tankCaption}</figcaption>
          </figure>
          <div className="bridge-text">
            <p className="mono bridge-mark" data-reveal>
              {t.bridgeMark}
            </p>
            <p className="bridge-line" data-reveal style={{ ["--i" as string]: 1 }}>
              {t.bridge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
