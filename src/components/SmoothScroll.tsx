"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Same settings as the HUMAN base: lerp 0.1, syncTouch off, nothing under reduced motion.
   Also restores the reading position after a language switch (see Header). */
export function SmoothScroll() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("oc-pos");
      if (raw) {
        sessionStorage.removeItem("oc-pos");
        const { id, f } = JSON.parse(raw) as { id: string; f: number };
        const el = document.getElementById(id);
        if (el) window.scrollTo(0, el.offsetTop + f * el.offsetHeight);
      }
    } catch {}

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, touchMultiplier: 1.1, anchors: true });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("oc:lock", onLock);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("oc:lock", onLock);
      lenis.destroy();
    };
  }, []);
  return null;
}
