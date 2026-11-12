/* V02 hero: five shots on real Oceânica photographs.
   Scroll progress p (0..1) is the only clock. This file is the edit:
   which picture is on screen, where the camera is, how the light behaves.
   The shader only draws what this timeline says. */

export type Img = "vessel" | "diver" | "rov" | "work";

export const IMAGES: Record<Img, { src: string; asp: number; mask?: string }> = {
  vessel: { src: "/film/s1-vessel.jpg", asp: 2048 / 1526, mask: "/film/s1-vessel-mask.jpg" },
  diver: { src: "/film/s2-diver.jpg", asp: 2560 / 1708, mask: "/film/s2-diver-mask.jpg" },
  rov: { src: "/film/s3-rov.jpg", asp: 1920 / 1080 },
  work: { src: "/film/s4-workclass.jpg", asp: 1900 / 811 },
};

export const MAX_DEPTH = 3000;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* camera: focus point in image space (x right, y down, 0..1) and zoom over "cover" */
type Cam = [number, number, number];
type Key = [number, Cam];

function track(keys: Key[], p: number): Cam {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const t = ease(span(p, keys[i - 1][0], keys[i][0]));
      const a = keys[i - 1][1];
      const b = keys[i][1];
      return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
    }
  }
  return keys[keys.length - 1][1];
}

/* landscape and portrait are two different edits of the same film */
const CAMS: Record<"wide" | "tall", Record<Img, Key[]>> = {
  wide: {
    vessel: [
      [0, [0.5, 0.43, 1.0]],
      [0.25, [0.57, 0.58, 1.3]],
    ],
    /* open on the diver and the sea, close in on the helmet as the water rises */
    diver: [
      [0.16, [0.5, 0.52, 1.0]],
      [0.5, [0.52, 0.46, 1.42]],
    ],
    rov: [
      [0.48, [0.4, 0.5, 1.25]],
      [0.74, [0.37, 0.52, 1.5]],
    ],
    /* the frame is a video grab: stay close enough to read the arm, never past what it resolves.
       The pull-back leaves the vehicle on the left and open water on the right for the statement. */
    work: [
      [0.72, [0.34, 0.56, 1.4]],
      [0.88, [0.41, 0.5, 1.26]],
      [1, [0.57, 0.5, 1.0]],
    ],
  },
  tall: {
    vessel: [
      [0, [0.52, 0.5, 1.0]],
      [0.25, [0.62, 0.58, 1.22]],
    ],
    /* the helmet sits low in the frame, the statement takes the sea above it */
    diver: [
      [0.16, [0.56, 0.5, 1.0]],
      [0.5, [0.58, 0.43, 1.2]],
    ],
    rov: [
      [0.48, [0.53, 0.5, 1.0]],
      [0.74, [0.53, 0.5, 1.2]],
    ],
    work: [
      [0.72, [0.3, 0.6, 1.3]],
      [0.88, [0.36, 0.5, 1.15]],
      [1, [0.36, 0.5, 1.0]],
    ],
  },
};

export type FilmState = {
  top: Img;
  under: Img;
  topCam: Cam;
  underCam: Cam;
  dissolve: number; // top -> under across the whole frame
  flare: number; // warm bloom during the dissolve
  line: number; // waterline, screen units (-0.5 bottom .. 0.5 top), outside = hidden
  emerge: number; // the under picture appearing through the water
  dark: number; // daylight lost: only the vehicle's own lamps remain
  glow: number; // lamp glow strength on the Lynx
  reveal: number; // work light uncovering the Work Class ROV
  depth: number; // metres, narrative gauge
  travel: number;
  veil: number; // after the hero: picture sinks back into dark water
};

export function depthAt(p: number) {
  /* stays shallow while the picture is still daylit, then runs through the dark */
  return MAX_DEPTH * Math.pow(span(p, 0.5, 0.9), 3);
}

export function filmAt(p: number, tall: boolean, past = 0): FilmState {
  const cams = CAMS[tall ? "tall" : "wide"];
  const cam = (img: Img) => track(cams[img], p);

  let top: Img;
  let under: Img;
  if (p < 0.26) {
    top = "vessel";
    under = "diver";
  } else if (p < 0.72) {
    top = "diver";
    under = "rov";
  } else {
    top = "diver";
    under = "work";
  }

  return {
    top,
    under,
    topCam: cam(top),
    underCam: cam(under),
    /* the cut hides in the dark: night falls on the vessel, daylight comes up on the diver */
    dissolve: p < 0.26 ? ease(span(p, 0.205, 0.235)) : 0,
    flare: Math.pow(Math.sin(Math.PI * span(p, 0.16, 0.28)), 1.3),
    line: p < 0.36 ? -0.9 : -0.9 + ease(span(p, 0.38, 0.52)) * 1.75,
    emerge: p < 0.72 ? ease(span(p, 0.5, 0.6)) : 1,
    dark: p < 0.72 ? ease(span(p, 0.6, 0.7)) : 0,
    glow: p < 0.72 ? 1 - span(p, 0.695, 0.72) : 0,
    reveal: p < 0.72 ? 0 : ease(span(p, 0.725, 0.84)),
    depth: depthAt(p),
    travel: p * 11 + past * 2.2,
    veil: clamp(past * 1.3),
  };
}

export const pad4 = (n: number) => String(Math.round(n)).padStart(4, "0");

/* shared between the scroll handler (writes) and the render loop (reads) */
export const scene = {
  p: 0,
  past: 0,
  /* true once an opaque section covers the picture: the player stops drawing */
  idle: false,
  /* called every rendered frame with the eased waterline and shader time */
  onLine: null as ((line: number, time: number) => void) | null,
};

/* same swell as the shader's wave(), so the HTML cut bobs with the picture */
export function swell(x: number, t: number) {
  return 0.011 * Math.sin(x * 4.6 + t * 0.85) + 0.006 * Math.sin(x * 10.3 - t * 1.3) + 0.003 * Math.sin(x * 22 + t * 2.1);
}

/* when each statement is on screen. Text comes from the dictionaries, by id. */
export type BeatId = "human" | "descent" | "workclass" | "intervention";
export const BEATS: { id: BeatId; in: [number, number]; out: [number, number]; cut?: boolean; side?: "right"; busy?: boolean; place?: "top" }[] = [
  { id: "human", in: [0.275, 0.315], out: [0.5, 0.54], cut: true, place: "top" },
  { id: "descent", in: [0.56, 0.6], out: [0.67, 0.705] },
  { id: "workclass", in: [0.79, 0.83], out: [0.865, 0.895], busy: true },
  { id: "intervention", in: [0.925, 0.96], out: [1.2, 1.3], side: "right", busy: true },
];
export const SHOT_STARTS = [0, 0.21, 0.47, 0.72, 0.885];
