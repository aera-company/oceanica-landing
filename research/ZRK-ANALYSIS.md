# ZRK analysis

Reference: https://www.zrk.technology · studied 2026-11-10, observation only.
Raw measurements: [zrk/observations.md](zrk/observations.md).

Nothing here is to be copied: no code, no assets, no military vocabulary, no HUD reticles, no orange. What follows is why it works and which principles transfer.

## 1. What it is (observation)

A single long page, 39.6 viewports, made of 9 chapters. Each chapter is one tall wrapper with one sticky stage inside. There is no free-flowing content anywhere: the visitor is always inside a pinned scene, and scroll is the timeline.

The hero is 11 viewports long and shows one thing only: a single object, on black, travelling from a point of light to an extreme macro that crosses the whole frame. It is a 20 second pre-rendered video at 1280×720 whose playhead is tied to scroll. Over it, HTML shows five specs, one at a time, as a giant centred number.

The stack is modest: Webflow, GSAP ScrollTrigger, Lenis, two small WebGL canvases. The expensive-looking part is a video file.

## 2. Why it works

### One object, one move
The hero does not tour features. It performs one camera idea, far to macro, and never cuts. The scale change alone (a 6 px dot becoming wider than the screen) carries 11 viewports. Every later chapter returns to that same object or its world, so the page reads as one film and not nine demos.

### The object moves, the interface holds still
The counter is always dead centre. The label is always on the left edge, the index on the right. Because the UI is locked, all perceived motion belongs to the object and the camera. This is what makes it feel heavy and expensive instead of busy.

### Darkness is the layout
Background #050505, object lit by a single rim light. Most of every frame is empty. Negative space is not padding between cards, it is the black of the scene itself. Copy sits directly on the picture with no panels behind it.

### Two type voices at a 20 : 1 ratio
A grotesk at 72 to 200 px (tracking -0.05em, line height under 0.9, weight 500) against a monospace at 8 to 10 px, uppercase. Nothing in the middle. The mono carries coordinates, timestamps, indexes and captions. It works as texture and as proof of precision at the same time.

### One accent, used once per screen
Orange appears on a single tick, arc, number or meter segment. Never as a fill, never twice in the same frame.

### Numbers as images
Specs are not listed. Each number owns the screen for a full viewport, then is replaced. The last one turns into an odometer strip, so the number itself has motion.

### A progress system that belongs to the world
The header meter fills with scroll. It tells the visitor how long the film is, which makes a 40 viewport page tolerable.

### Chapters overlap
Wrappers share scroll distance, so one scene dissolves into the next while still pinned. There is never a hard section edge.

### Mobile is recomposed
Portrait video renders exist as separate files. The headline, telemetry block and object framing are rearranged for a tall frame.

## 3. What does not transfer (inference and judgment)

- **Length.** 40 viewports with 11 for the hero is too long for this project. The working rule from earlier projects is about 2 viewports per pinned scene and 20 for the page. The principle to keep is "one continuous move", not the distance.
- **Video scrub as the engine.** `currentTime` scrubbing is smooth in Chromium and uneven in Safari unless every frame is a keyframe. A canvas frame sequence or a real-time shader is the safer carrier of the same idea.
- **Everything pinned.** ZRK never lets the reader scroll normally. An institutional site with ESG, investors and contact routes needs chapters that breathe and can be scanned.
- **Vocabulary.** Reticles, target boxes and telemetry about threats belong to defence. Oceânica needs its own instruments: depth, pressure, heading, tether, visibility.
- **Tiny mono text.** 8 to 10 px uppercase is below comfortable reading size. Use it for labels only, at 11 px minimum, and never for sentences.

## 4. Reusable design principles

| # | Principle | Translation for Oceânica |
|---|---|---|
| P1 | One continuous camera move carries the hero | The camera only ever goes down. Surface to seabed, no cuts. |
| P2 | Interface holds still, world moves | Fixed depth gauge and fixed type positions. The sea moves behind them. |
| P3 | Darkness is the layout | Deep marine black as the canvas. Light exists only where the operation is. |
| P4 | Two type voices, large gap | Editorial grotesk for statements, mono for depth, coordinates and chapter numbers. |
| P5 | One accent, once per screen | Oceânica green #009c48 family as the single precision mark. |
| P6 | Numbers as images | Depth reading and verified company figures at display scale. |
| P7 | Progress belongs to the world | The progress indicator is the depth gauge. Scroll position equals metres. |
| P8 | Chapters dissolve, never cut | The water column is one continuous volume. Chapters are depths of it. |
| P9 | Mobile is its own composition | Portrait: gauge moves to a bottom bar, headline stacks, lighter render tier. |
| P10 | Real object, honest render | Real vessel, ROV and operation imagery. Generated media only for water and atmosphere. |

## 5. Performance implications (inference)

- The whole first impression costs one 720p video plus HTML. Perceived value does not depend on polygon count.
- All below-the-fold images are lazy. The hero media is the only eager heavy asset.
- Sticky stages with transforms and opacity only. No layout work per frame is visible in how the page behaves.
- Lesson for this project: put the budget in one carrier (one shader or one sequence), keep type as HTML, and keep everything else static until it enters.
