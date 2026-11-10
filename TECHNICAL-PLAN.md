# Technical plan

## 1. Decision: what carries the hero

The brief asked to weigh the HUMAN image-sequence system against WebGL before choosing. Three carriers were considered.

| | A. Frame sequence (HUMAN) | B. Procedural shader | C. three.js scene |
|---|---|---|---|
| Source needed | Footage or a render of the full descent. **Does not exist.** | None | 3D models of sea, vessel, ROV. Do not exist |
| Weight before first motion | 8 to 12 MB | Under 100 KB | 600 KB library plus models |
| Motion | Stepped (about 170 states) | Continuous, idles, follows the pointer | Continuous |
| Picture ceiling | Photoreal | Stylised water and light | Depends on assets |
| Can show a real asset | **Yes, the only honest way** | No | Only with accurate models |
| Risk | iOS memory, load wait, needs footage | Looks designed, not filmed | New stack, new failure modes |
| New dependencies | None | None | Yes |

**Chosen for the proof of concept: B, with real photographs composited in HTML.**
The descent is water, light and darkness, exactly the kind of non-documentary atmosphere that may be generated. A shader does it at near-zero weight, never repeats, and responds to scroll continuously, which is what makes the waterline feel physical. Nothing in it depicts an Oceânica asset.

**Reserved for chapter 03 (ROV approach): A.** A scrubbed sequence is the right tool the moment real ROV footage or a CAD-accurate render exists. The HUMAN engine is reused then, with its gaps closed (section 6).

**Rejected: C.** No models, a second stack, and nothing it would do here that B does not.

### The honest limit of B, and the upgrade path

The sea is stylised. It will not be mistaken for footage. If the hero must read as photographed, the options are, in order of preference:

1. **Real footage from Oceânica**: a camera or ROV going through the surface and down. Becomes a frame sequence for the first 20 % of the hero; the shader takes over below 50 m where there is nothing to film anyway.
2. **A generated water plate** (surface and waterline only, no assets) as a short frame sequence, blended into the shader below the surface. Allowed by the brief for atmospheres. Costs generation credits and needs approval.
3. **Keep the shader and raise its quality.** Done in the refinement pass: sky by direction with a low sun and lit clouds, sea normals with Fresnel reflection, radial shafts, crossing bubbles, speed streaks, volumetric beams. Still stylised, but it now reads as a lit scene. Ray-marched swell and caustics remain possible, at more GPU cost.

## 2. Architecture as built

```
scroll (native, Lenis on wheel)
   │  passive listener, one rAF per frame
   ▼
Hero.update()            p = progress through a 440 vh wrapper
   │  pure functions in src/lib/depth.ts
   ├─ waterline(p)  ─┐
   ├─ depthAt(p)     ├─► scene { line, depth, lamp, travel }   plain module object
   └─ lampAt(p)     ─┘        │
                              ▼
WaterColumn (fixed, behind the whole page)
   WebGL 1, one quad, one fragment shader
   eases toward scene.* each frame (mass)
   calls scene.onLine(easedLine) ──► Hero cuts the headline at the same line
                              
HTML on top: headline, statements, gauge, read-outs, chapter 02
```

- **No React state on the scroll path.** Positions, opacity and text content are written through refs. Text content is only touched when its value changes.
- **HTML copy is HTML.** Nothing is baked into the picture. The headline is an `h1`; the refracted copy is `aria-hidden`.
- **The cut uses transforms only:** two full-stage wrappers with `overflow: hidden`, translated in opposite directions. No `clip-path`, no animated mask.
- **One shared timeline.** `depth.ts` is the single source for picture, gauge, read-outs and the still renderer.

### Files

| File | Role |
|---|---|
| `src/lib/depth.ts` | Timeline functions, shared scene object, read-out physics |
| `src/lib/copy.ts` | All visible copy, with sources noted |
| `src/components/depth/shader.ts` | Vertex and fragment shader source |
| `src/components/depth/WaterColumn.tsx` | WebGL lifecycle, tiers, fps watchdog, still mode |
| `src/components/depth/Hero.tsx` | Pinned stage, headline cut, statements, gauge |
| `src/components/depth/Below.tsx` | Chapter 02, light reveal, image pre-decode |
| `src/components/SmoothScroll.tsx` | Lenis, off under reduced motion |
| `scripts/cdp.mjs` | Headless Chrome: stills, review frames, fps |

### Stack

Next 16.2.2, React 19.2.4, Tailwind 4 (tokens only; components are plain CSS), Lenis 1.3. **No animation library and no 3D library.** Framer Motion from the HUMAN base was not needed and was left out. `turbopack.root` is pinned, as required on this machine.

## 3. Reused from HUMAN

| Reused | From |
|---|---|
| Sticky stage + rAF-throttled native scroll progress | new-3d-landbase `Hero.tsx` |
| Lenis settings (`lerp 0.1`, `syncTouch false`) | new-3d-landbase |
| `turbopack.root` fix | new-3d-landbase |
| WebGL wrapper: tiers, fps watchdog, resize observer, render scale | oceanica-intelligence `OceanField.tsx` |
| `cdp.mjs` measuring script (extended with a continuous-scroll test) | oceanica-intelligence |
| Oceânica logo file and validated green | oceanica-intelligence |

Not reused: the bathymetric shader (different picture), glass cards, HUD frame, gold tokens, the frame-sequence engine (kept for chapter 03). The original projects were not modified.

## 4. Performance

Measured with `scripts/cdp.mjs` on an Apple M1, headless Chrome with GPU, 2026-11-10.

| Test | Result |
|---|---|
| Desktop 1440×900 at DPR 2, canvas 2160×1350: surface, descent, work light, chapter 02 | 60 fps at each, worst frame 16.8 ms (after the hero refinement pass: Fresnel sea, clouds, radial shafts, bubbles, beams) |
| Desktop 2560×1440 at DPR 2, canvas 3840×2160 | 60 fps at each stage and in continuous scroll, worst frame 16.8 ms |
| Desktop, continuous scroll through the whole page in 9 s | 60.1 fps average, worst frame 16.8 ms, no frame over 25 ms (clean server, final run) |
| Phone emulation 390×844 at DPR 3, 4× CPU throttle, canvas 351×760 | 60 fps page frames, worst 33 ms. Shader capped at 30 fps on touch by design |

Weight of the hero: shader source about 6 KB, four fallback stills 15 to 38 KB each, no hero media download. Chapter 02 adds two photographs (311 KB and 560 KB as JPEG; to be re-encoded as AVIF with responsive sizes).

Budget rules kept:
- Render scale 0.75 on desktop, 0.6 on touch. Pixel ratio capped at 2 and 1.5.
- The loop stops when the tab is hidden.
- A watchdog averages 60 frames after the first second; if slow, it drops render scale to 0.5, then switches to the lite tier.
- Photographs are decoded while the visitor is still in the hero. This removed a 950 ms hitch on entering chapter 02.
- No animated masks, blend modes, backdrop filters or layout reads per frame beyond one `getBoundingClientRect`.

The figures are page frame cadence (`requestAnimationFrame`) on an M1. They show the page never blocks; they do not prove headroom on weaker GPUs, where the watchdog and the lite tier take over.

**Not measured:** Safari and WebKit, real iPhone and Android hardware, low-end integrated GPUs, slow networks. An earlier run on a warm dev server showed one 133 ms frame in the continuous test; it did not repeat on a clean server. These are the next checks before anyone outside sees it.

## 5. Tiers and fallbacks

| Tier | When | What the visitor gets |
|---|---|---|
| full | Default | Live shader |
| lite | Save-Data, under 4 GB device memory, or the watchdog fails twice | Two stills rendered from the same shader (surface, deep), cross-faded by depth. Everything else identical |
| static | `prefers-reduced-motion`, no WebGL, shader compile failure | One still. No pinning, no smooth scroll. The three statements become ordinary reading content |

Force a tier with `?tier=full|lite|static`. `?still=<0..1>` freezes the shader at a point of the timeline and hides the HTML, which is how the stills are produced:

```bash
node scripts/cdp.mjs shot "http://localhost:3070/?still=0&tier=full" public/depth/still-surface.webp 1920 1080
```

Portrait versions are rendered separately at 900×1600.

## 6. Mobile

Its own composition, not a scaled desktop: headline at 17 vw, gauge as a bottom instrument bar, nav reduced to logo and contact, statements full width, hero 380 vh instead of 440. Touch scrolling is native (Lenis does not touch it). Lighter render tier as above.

## 7. Before the frame-sequence engine carries chapter 03

Gaps found in the HUMAN engine, to close when real ROV material arrives:

1. Show frame 1 immediately as a poster; load the rest in batches behind it.
2. `decode()` each frame; keep a window of decoded frames, not all of them.
3. A separate portrait sequence at lower resolution.
4. A failed frame must not count as loaded.
5. A still poster under reduced motion.
6. Resize with `ResizeObserver`, ignoring iOS URL-bar changes.
7. Map frames with `(N-1)/(COUNT-1)`.

## 8. Accessibility

- One `h1`. Chapter headings are `h2`. Decorative layers are `aria-hidden`.
- The canvas carries no information that is not also in HTML.
- Reduced motion is a complete page, not a degraded one.
- Type contrast: mineral on abyss is about 16:1; the 45 % label tone is about 5:1 and is used for labels only.
- Focus is visible. Hover effects are gated behind `(hover: hover)`.
- Open: keyboard order through the pinned hero, and a skip link past it.

## 9. Open risks

| Risk | Mitigation |
|---|---|
| Image rights: two photographs and the logo come from the public site and an earlier project | Local concept only. Confirm with Oceânica before any public deploy. Listed in `public/oceanica/SOURCES.md` |
| The ROV frame may be supplier footage | Ask Oceânica; replace with their own dive footage |
| The sea reads as stylised | Upgrade path in section 1 |
| Safari performance unknown | Measure in WebKit before sharing |
| Inconsistent numbers on the current site (divers, years) | Only undisputed figures are used. The rest wait for Oceânica |
| "Engineering the depth" is not an approved line | Marked as internal direction everywhere |

## 10. Run

```bash
npm run dev
```

Opens on http://localhost:3070. The project has its own git repository with no commits and no remote. Nothing has been deployed.
