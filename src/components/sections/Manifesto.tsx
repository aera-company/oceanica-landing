import type { Dict } from "@/lib/i18n";

/* Chapter 02. In the dark theme it has no background of its own: the last frame
   of the film sinks into dark water behind it. In the light theme it is the
   first sheet of paper, rising over the film. */
export function Manifesto({ t }: { t: Dict["manifesto"] }) {
  return (
    <section id="company" data-s className="manifesto s-deep" aria-labelledby="company-title">
      <div className="wrap">
        <div className="lede-grid">
          <p className="mono slate" data-reveal>
            <span className="tick" />
            {t.mark}
          </p>
          <h2 id="company-title" className="display" data-reveal>
            {t.title}
          </h2>
          <p className="lede-body" data-reveal style={{ ["--i" as string]: 2 }}>
            {t.body}
          </p>
        </div>

        <dl className="figures">
          {t.figures.map((f, i) => (
            <div key={f.label} className="figure" data-reveal style={{ ["--i" as string]: i }}>
              <dd>
                {f.value}
                {f.unit && <i>{f.unit}</i>}
              </dd>
              <dt className="mono">{f.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mono source">{t.source}</p>

        <ol className="miles">
          {t.milestones.map((m, i) => (
            <li key={m.year} data-reveal style={{ ["--i" as string]: i }}>
              <span className="mono miles-year">{m.year}</span>
              <span className="miles-text">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
