# HUMAN analysis

Inspected 2026-11-10, read only. Nothing in the original projects was modified, installed or run.

- HUMAN base: `~/Desktop/new-3d-landbase` (own git repo, one commit `2028476`, clean, no remote).
- Sibling folders `~/Desktop/landing-base ` and `~/Desktop/landingbase-main 3`: Astro 6 static bases, no canvas, no frames. Not earlier versions of this hero. Not relevant.
- No folder named `new-3d-landing*` exists on the Desktop (depth 3).
- Second reference, same author and same client: `~/Desktop/OCEÂNICA SYS/oceanica-intelligence` (procedural WebGL hero, no commits).

## EXISTING CAPABILITY

### A. Frame-sequence hero (new-3d-landbase)

| Item | State |
|---|---|
| Stack | Next 16.2.2, React 19.2.4, Tailwind 4, Lenis 1.3, Framer Motion 12. No gsap, no three, no shaders. |
| Engine | `src/components/sections/Hero.tsx` (409 lines): one 2D canvas, `drawImage`, native scroll + rAF throttle. |
| Config | `src/lib/hero.ts`: `FRAME_COUNT = 169`, `/frames/frame_NNNN.jpg`, annotation windows. |
| Smooth scroll | `SmoothScrollProvider.tsx`: Lenis `lerp 0.1`, `syncTouch false`, off under reduced motion. |
| UI kit | `AnimatedSection`, `ScrollRevealText`, `HudFrame`, `VideoMedia`, `Button`, `SectionLabel`, `EyebrowBadge`, `Placeholder`. |
| Process | `intelligence/` folder: persona, brief template, pipeline 0 to 6, frame budget, quality checklist. |
| Frames | **None.** `public/frames/` holds only a README. The engine has never run with real frames in this repo. |
| Tooling | ffmpeg recipe documented (`fps=18, scale=1920, webp q82`). No measuring tools. |

### B. Procedural WebGL hero (oceanica-intelligence)

| Item | State |
|---|---|
| Engine | `src/components/ocean/OceanField.tsx` (259 lines) + `shader.ts` (127 lines). Raw WebGL 1, one full-screen quad, hand-written fragment shader. Zero dependencies. |
| Lifecycle | ResizeObserver, IntersectionObserver pause, render scale 0.75 desktop and 0.6 touch, DPR cap, 30 fps cap on touch. |
| Tiers | `full` (shader), `lite` (still image + slow CSS drift), `static` (still). Chosen by save-data, device memory, measured fps, reduced motion, missing WebGL. URL override `?tier=`. |
| Watchdog | Averages 60 frames after 1 s, drops scale, then drops to lite. |
| Measuring | `scripts/cdp.mjs`: headless Chrome over CDP, screenshots at a scroll position, fps and worst frame. No dependencies. |
| Brand assets | `public/oceanica/logo-oceanica.png` (211×41). Oceânica green `#009c48` already validated by Tiago on 2026-11-06. |
| Measured | 60 fps at 1440×900 DPR 2 on an M1, worst frame 16.8 ms. Mobile emulation 30 fps. Real phones not measured. |

## HOW IT WORKS

**Scroll progress (both projects).** A passive `scroll` listener, throttled by rAF with a `tickingRef`. Progress is `clamp(-rect.top / (section.offsetHeight - innerHeight))` of a tall wrapper with one sticky stage. Lenis moves the real window scroll, so the native event fires and Lenis is never read directly. Everything visual is written through refs or CSS variables, never React state.

**Frame sequence.** All frames are requested at once with `new Image()`. `frameIndex = floor(progress × COUNT)`. The canvas redraws only when the index changes, with cover-fit maths and a 1.3× zoom on mobile. A loading bar blocks the hero until every frame has loaded or failed.

**Shader hero.** Progress, a "surface" value and the pointer are eased inside the render loop and passed as uniforms. The picture is computed per pixel, per frame, so it never repeats, reacts to the pointer and costs about 72 KB of assets in total.

## REUSE POTENTIAL

| Piece | Reuse | Notes |
|---|---|---|
| rAF + ticking progress pattern | **Yes, as is** | Proven in both projects. The backbone of the new hero. |
| `SmoothScrollProvider` (Lenis) | **Yes** | Keep `lerp 0.1`, `syncTouch false`, off under reduced motion. |
| `next.config.ts` with `turbopack.root` | **Yes, mandatory** | A lockfile in the home folder breaks dev CSS without it. |
| Tier system + fps watchdog + IO/RO lifecycle (Oceânica) | **Yes, lifted as a generic wrapper** | Gives full, lite and static for free. |
| `scripts/cdp.mjs` | **Yes** | Standalone. Needed to measure fps and take stills before delivery. |
| Frame-sequence `Hero.tsx` | **Later, with fixes** | Right tool once real footage or a 3D render of the ROV exists. Needs the gaps below closed. |
| `ScrollRevealText`, `AnimatedSection` | Selectively | Useful below the hero. The brief asks to avoid fade-up as the default, so use sparingly. |
| `.card-surface` (glass blur), HUD frame, gold accent tokens | **No** | Glass and HUD are on the "not" list for this project. |
| Bathymetric shader source | **No, write a new one** | Different picture (contour map seen from above). The new hero is a water column seen from inside. Lifecycle is reusable, the fragment shader is not. |

### Gaps in the frame-sequence engine (must be closed before it carries a hero)

1. No priority frame: nothing is shown until all 169 frames arrive.
2. No `decode()`, no batching, no `ImageBitmap`. Around 169 React re-renders during load.
3. No mobile sequence. Desktop frames are cropped and zoomed.
4. A failed frame counts as loaded. No poster, no retry.
5. No reduced-motion alternative for the canvas itself.
6. Window `resize` reallocates the canvas whenever the iOS URL bar moves.
7. `floor(p × COUNT)` disagrees with the documented `(N-1)/(COUNT-1)` mapping.
8. One scene only. No chaptered pinning.

## PERFORMANCE COST

| | Frame sequence | Shader |
|---|---|---|
| Download before first motion | 8 to 12 MB (169 × 50 to 70 KB) | Under 100 KB |
| Memory | Up to 8.3 MB per decoded 1080p frame. Worst case over 1 GB if all stay decoded. Real risk on iOS. | One framebuffer |
| Per-frame cost | One `drawImage`. Very cheap. | Full-screen fragment shader. Constant GPU load while visible. |
| Smoothness | Stepped: 169 states over the scroll distance. | Continuous, plus idle motion and pointer response. |
| Picture quality ceiling | Photoreal, limited only by the source footage. | Stylised. Good for water, light and atmosphere. Cannot show a real vessel or ROV. |
| Needs | Source footage or render that does not exist today. | Nothing external. |

## RECOMMENDATION

1. **Do not add a third animation or 3D stack.** No three.js, no GSAP. Everything needed already exists across the two projects: Lenis, Framer Motion, the rAF progress pattern, a raw WebGL wrapper with tiers, and the CDP measuring script.
2. **Hero proof of concept: shader for the water, real photographs for the assets, HTML for the type.**
   The descent (surface, waterline, light falling off with depth) is exactly the kind of non-documentary atmosphere the brief allows to be generated. A new fragment shader on the existing lifecycle gives a continuous, pointer-aware descent at near-zero weight. Real Oceânica imagery enters as composited layers, never synthesised.
3. **Keep the frame-sequence engine for the ROV approach (later chapter), once real material exists.** A scrubbed sequence is the only honest way to show the true geometry of a vessel or ROV in motion. It needs official footage or a CAD-based render from Oceânica. When that arrives, close gaps 1 to 7 first: poster frame, batched `decode()`, a portrait sequence at lower resolution, `(N-1)/(COUNT-1)` mapping.
4. **New project, new repo.** Start clean in `LANDING OCEANICA`, copy only the pieces marked "Yes". The HUMAN base and the Saving proposal stay untouched.
