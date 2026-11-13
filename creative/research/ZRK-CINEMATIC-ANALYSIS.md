# ZRK · cinematic analysis

Reference: https://www.zrk.technology. Outside-in study, observation only (RES method: drive the rendered site, measure, tag every statement).

- **Sources.** A measured pass on 2026-11-10, recorded in [`research/zrk/observations.md`](../../research/zrk/observations.md) and [`research/ZRK-ANALYSIS.md`](../../research/ZRK-ANALYSIS.md). A second pass on 2026-11-12, made for this document: eight headless Chrome captures at 1440 × 900, scroll 0 to 26 000 px. The captures are kept outside the repository.
- **Tags.** `[obs]` was seen or measured. `[inf]` is inferred from what was seen.
- **Not copied.** No code, image, model, logo, colour or composition from ZRK is reused in the Oceânica work. Its military vocabulary (reticles, targets, threat language) is excluded on purpose.
- **Limits.** In the 11-12 headless pass the scroll-scrubbed hero video did not paint, so only the HTML layers were visible. The video frames described below come from the 11-10 pass in a normal browser window.

---

## 1. Hero composition
- `[obs]` The first frame is near-black. A three-line headline (about 72 px at 1440) sits bottom-left. A small mono block of fake telemetry sits top-left. Nothing else is on screen.
- `[obs]` The object is absent at scroll 0 and arrives as a point of light around 1500 px.
- `[inf]` The emptiness is the composition. It sets a scale (a vast dark volume) before the object has a size to compare against.

## 2. Product protagonism
- `[obs]` One object for the whole hero (11 viewports). Every later chapter returns to the same object or its world.
- `[obs]` Statements and numbers always refer to that object. There is no second subject competing.
- `[inf]` Protagonism comes from exclusivity: nothing else is ever lit.

## 3. Cinematic camera movement
- `[obs]` A single continuous move from far to extreme macro (a 6 px point becomes wider than the screen). No cuts.
- `[obs]` The move is a pre-rendered 20 s video, 1280 × 720, with its `currentTime` tied to scroll. That is about 1 s of video per viewport after an initial hold.
- `[inf]` The camera is never handheld and never reverses. It is a dolly with constant intent, which reads as "expensive".

## 4. Scroll-driven transformations
- `[obs]` Every chapter is a tall wrapper holding one sticky stage. The page has 9 stages in 39.6 viewports.
- `[obs]` In-stage changes:
  - a counter replaces itself (340 km/h, 30 km, …);
  - a dial or arc fills;
  - a five-item card slot swaps content (A to E);
  - a cost comparison draws bars.
- `[obs]` Wrappers overlap in scroll distance, so chapters cross-dissolve.

## 5. Physical depth and parallax
- `[obs]` Almost none in the DOM. Depth lives inside the rendered video (perspective, focus falloff, the object's own motion).
- `[inf]` ZRK gets depth from one rendered camera, not from multiplane HTML layers. A website that wants depth without a 3D render has to build it from layers. That is the main technical difference for Oceânica.

## 6. Light and material treatment
- `[obs]` In the macro chapter the object is dark, matte and finely textured. It is lit by one soft key from the upper right, with a long falloff into pure black (#050505). There is no fill light.
- `[obs]` The UI is drawn in hairlines at 10 to 20 % white. Only one element per screen is orange.
- `[inf]` Material is sold by grazing light across texture. The dark background is what makes a single key light readable.

## 7. Scale changes
- `[obs]` Hero scale change about 100× (point to macro). Display numbers are 200 px against 10 px mono, a 20 : 1 ratio.
- `[inf]` Two scale systems run in parallel (object size, type size), and neither has middle sizes. That absence of a middle is a large part of the "premium" feel.

## 8. Macro photography
- `[obs]` The end of the hero and chapter 4 are macro views of surfaces, edges and an optical sensor, in shallow focus.
- `[inf]` Macro turns a product into landscape and hides the lack of context. It only works when the source is a high-resolution render or photograph.

## 9. Visual hierarchy
- `[obs]` One reading point per screen: headline, or a number, or a statement. The labels and index (001, 003, 005) sit at the screen edges at 10 px.
- `[obs]` The centre of the screen is reserved for the number. Statements, such as the threat sentence in the second chapter, are centred and alone.

## 10. Typography placement
- `[obs]` Two families: a grotesk (Inter Display) at weights 400 and 500, and a mono (Geist Mono) for labels. No bold.
- `[obs]` The headline sits bottom-left. Numbers are centred. The label is always on the left edge and the index on the right. Positions never change while the object moves.
- `[obs]` Tracking is -0.05em on display sizes, with line height under 0.9.

## 11. Motion timing
- `[obs]` Statements fade in place. Numbers swap or roll as an odometer. Dials sweep. Nothing bounces.
- `[obs]` The scroll is smoothed (Lenis), and the counters follow the smoothed position.
- `[inf]` The rhythm is "hold, change, hold". Each hold lasts about a viewport and each change about a third of one.

## 12. Foreground and background interaction
- `[obs]` The object passes in front of and behind HTML type: the number sits behind the object in the video.
- `[obs]` The header meter and the corner read-outs ("X: 0 / Y: 0") stay fixed above everything.
- `[inf]` Three planes: world (video), voice (type), instrument (fixed UI). They never trade places.

## 13. Interactive chapter structure
- `[obs]`
  - Chapter 8 is a system scene with six columns (A to F) that highlight on hover.
  - Chapter 6 is a comparison that animates on entry.
  - Interactivity is light and placed late, after the film has done its work.

## 14. Technical overlays
- `[obs]` Reticles, circular scales, target markers and a fake telemetry block, all hairline, monochrome plus one accent.
- `[inf]` These overlays are defence vocabulary and carry the brand's subject. For Oceânica the equivalent instruments are depth, position on a section, a vessel's name and a real specification. They must label what is visible, never decorate.

## 15. Responsive adaptation
- `[obs]` Portrait renders exist as separate files (540 × 720 and 390 × 900). On mobile the nav is removed and the H1 drops to 40 px. The telemetry block grows to fill the top third.
- `[obs]` The page length is not shortened on mobile: the hero is still 11 viewports.

## 16. Performance strategy
- `[obs]`
  - Hero video at 1280 × 720 only, `preload="auto"`.
  - 132 of 133 images are lazy.
  - Two small WebGL canvases, both for UI.
  - The stack is Webflow, GSAP ScrollTrigger and Lenis.
- `[inf]` Low resolution is acceptable because the frames are dark and soft. Dense keyframes make the scrub smooth in Chromium; Safari scrubbing is likely uneven.

## 17. Emotional rhythm
- `[obs]` The sequence:
  1. Silence (black).
  2. Arrival (point of light).
  3. Power (numbers).
  4. Context (threat statement).
  5. Detail (macro).
  6. Proof (cost comparison).
  7. System (columns).
  8. Close.
- `[inf]` The curve goes intimate, then monumental, then rational, then calm. Proof only comes after desire.

---

## How ZRK creates perceived value

1. **Restraint as signal.** One subject, one light, two type voices, one accent. Every element left out reads as confidence.
2. **A real camera idea.** The value is in the decision "far to macro, no cuts", not in the tooling.
3. **Fixed interface over a moving world.** The UI holds still, so all motion belongs to the subject and feels physical.
4. **Numbers given the whole screen.** A specification shown alone becomes an image.
5. **Darkness as layout.** Negative space is the scene itself, not padding.

## What transfers to Oceânica, and what does not

| ZRK principle | Oceânica translation | Not to transfer |
|---|---|---|
| One continuous move | A single camera journey per hero concept (approach, descent or traverse) | 11-viewport hero length; the proposals use 3 to 4 |
| One object | Not one machine: **one operation**. The vessel, the infrastructure it serves and the vehicle it launches, in one frame | A single product shot that reduces Oceânica to an object |
| Fixed instrument layer | Annotations that name what is visible: vessel, FPSO, Work Class, depth | Reticles, targets, telemetry noise |
| Light as reveal | Dawn, the waterline and the vehicle's own lamps | Invented lamps, sci-fi glow |
| Numbers as images | The three verified figures (48 years, 2,300+ people, 56 ROVs) given space in chapter 02 | Unverified specs used as decoration |
| Pre-rendered camera | Use real footage when Oceânica provides it; until then, multiplane layers cut from real photographs | Generated footage that shows equipment or operations that did not happen |

The Oceânica hero has to do something ZRK never needed: **show scale across several kinds of asset at once**. ZRK sells one object; Oceânica sells an operation. For that reason none of the three V05 concepts is a single-object hero.
