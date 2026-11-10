"use client";

import { useEffect } from "react";

/* One observer and one scroll handler for the whole page.
   [data-reveal]   : becomes [data-in] the first time it enters the viewport.
   [data-parallax] : the picture inside a frame drifts a few percent against scroll. */
export function Reveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "1";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const drift = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of drift) {
        const r = (el.parentElement as HTMLElement).getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const k = ((r.top + r.height / 2) / vh - 0.5) * 2;
        el.style.transform = `translate3d(0,${(-k * 4).toFixed(2)}%,0) scale(1.1)`;
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    if (!reduce && drift.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
