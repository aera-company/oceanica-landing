import { NAV } from "@/lib/copy";

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Oceânica">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/oceanica/logo-oceanica.png" alt="Oceânica" width={211} height={41} />
      </a>
      <nav className="site-nav mono" aria-label="Primary">
        {NAV.map((n, i) => (
          <a key={n.href} href={n.href}>
            <span className="nav-idx">{String(i + 1).padStart(2, "0")}</span>
            {n.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="cta mono">
        Contact
      </a>
    </header>
  );
}
