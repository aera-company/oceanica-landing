import { LINKS } from "@/lib/site";

/* A link to the official site: always a genuine URL, always marked as leaving this page. */
export function Ext({ to, children, className, note }: { to: string; children: React.ReactNode; className?: string; note: string }) {
  const href = LINKS[to as keyof typeof LINKS] ?? to;
  return (
    <a href={href} className={className ? `ext ${className}` : "ext"} target="_blank" rel="noopener noreferrer">
      <span className="ext-label">{children}</span>
      <span className="ext-arrow" aria-hidden="true">
        ↗
      </span>
      <span className="sr">({note})</span>
    </a>
  );
}
