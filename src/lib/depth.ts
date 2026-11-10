/* Single source of truth for the descent. The hero writes into `scene`,
   the canvas and the gauge read from it. No React state on the scroll path. */

export const MAX_DEPTH = 3000;

export const scene = {
  p: 0, // hero progress 0..1
  line: -0.17, // waterline, screen units
  depth: 0, // metres
  lamp: 0, // 0..1
  travel: 0, // particle travel, grows with page scroll
  /* called by the render loop with the eased waterline, so HTML and picture agree */
  onLine: null as ((line: number, time: number) => void) | null,
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x: number) => x * x * (3 - 2 * x);
export const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/* Same swell as the shader's wave(), so the HTML cut bobs with the picture. */
export function swell(x: number, t: number) {
  return 0.011 * Math.sin(x * 4.6 + t * 0.85) + 0.006 * Math.sin(x * 10.3 - t * 1.3) + 0.003 * Math.sin(x * 22 + t * 2.1);
}

/* Hero timeline. Kept as pure functions so stills and tests can call them. */
export function waterline(p: number) {
  return -0.17 + ease(span(p, 0.015, 0.2)) * 0.9;
}
export function depthAt(p: number) {
  return MAX_DEPTH * Math.pow(span(p, 0.115, 0.8), 2.2);
}
export function lampAt(p: number) {
  return ease(span(p, 0.7, 0.86));
}

/* Physics used for the read-outs. Not Oceânica data.
   Pressure: about 1 bar per 10 m of seawater plus 1 bar of atmosphere.
   Light: clear open-ocean approximation, 1 % of surface light left at 200 m. */
export const pressureBar = (m: number) => 1 + m / 10;
export const surfaceLight = (m: number) => 100 * Math.exp(-m / 43.4);

export function zone(m: number) {
  if (m < 1) return "Surface";
  if (m < 200) return "Sunlight zone";
  if (m < 1000) return "Twilight zone";
  return "Midnight zone";
}

export const pad4 = (n: number) => String(Math.round(n)).padStart(4, "0");
