# Concept A · A escala / The scale

**Thesis.** Oceânica as an operational force. The hero opens on a single real photograph that holds the whole business at once: an Oceânica deck at dawn, a Work Class ROV in its launch system, and on the horizon the production unit and tanker that the vessel serves. The camera then travels from the deck to that horizon and arrives alongside the production unit.

**Emotion.** Power, calm confidence, the scale of an industry at sea. Warm dawn against steel blue.

**Frames.** `frames/1.webp` (entry), `frames/2.webp` (mid-scroll), `frames/3.webp` (exit), `frames/m.webp` (mobile entry). Source file: `index.html?f=1|2|3|m`. All four are static compositions of real Oceânica photographs, graded and typeset in HTML and rendered with headless Chrome. **No motion exists yet.**

---

## 1. Headline candidates

Portuguese first. ★ marks the recommendation.

| # | PT | EN | Note |
|---|---|---|---|
| 1 ★ | **Engenharia do tamanho do mar.** | **Engineering at the scale of the sea.** | Short and spatial; the image proves it. A figure of speech, not a claim. |
| 2 | Ao lado de quem produz. | Right alongside production. | Literal to frame 3. Strong as the closing line. |
| 3 | A operação por trás da operação. | The operation behind the operation. | Clever, but less visual. |
| 4 | No horizonte, a produção. No convés, quem a mantém. | Production on the horizon. On deck, the people who keep it running. | Describes frame 1 exactly. Used as the mid-scroll statement. |
| 5 | Onde a produção não pode parar, a Oceânica já está. | Where production cannot stop, Oceânica is already there. | Confident, verging on a claim. Needs client sign-off. |
| 6 | 48 anos no mar, todos os dias. | 48 years at sea, every day. | Uses a verified number; better kept for chapter 02. |

The starting lines from the brief, assessed:
- *"A engenharia por trás de grandes operações offshore"*: accurate, but it reads like a subtitle.
- *"Por trás de cada grande operação, existe uma engenharia ainda maior"*: too long for this frame.

Supporting copy (PT): *Embarcações, ROVs, mergulhadores e engenharia a serviço da energia offshore. Da superfície a três mil metros.*

## 2. Art direction

### Camera
- **Lens feeling:** 24 mm from the bridge wing, deep focus at entry. A long lens feeling (85 to 135 mm) by the end, as the horizon compresses.
- **Framing:** horizon on the upper third (y ≈ 39 %); the deck as a triangle rising from the bottom edge; the FPSO slightly right of centre; the sun just behind the FPSO.
- **Angle:** high, looking aft and down from the bridge. Frame 3 is a near-vertical top view from the production unit's deck.
- **Trajectory:** forward and slightly down over the deck toward the horizon (push-in), then a motivated cut through the sun to the overhead view alongside. One direction of travel: toward the infrastructure.

### Light
- **Key:** low sun on the horizon, behind the FPSO. Ambient is cold steel blue from the overcast sky.
- **Contrast:** high, with lifted blacks. Highlights roll off warm; shadows stay cool and dense.
- **Atmosphere:** horizon haze; a warm bloom around the sun that grows as the camera approaches (screen-blended radial).
- **Frame 3:** hard midday light on deep Atlantic blue. The contrast between dawn and full day marks the passage from approach to work.

### Depth
| Plane | Content | Parallax rate (scale over the push) |
|---|---|---|
| Foreground | Deck: containers, crane, ROV in its cage (Vision mask, `assets/deck-fg.webp`) | 1.0 → 2.6, sliding down out of frame, blur 0 → 8 px |
| Middle | Sea surface | 1.0 → 1.45 |
| Background | Horizon strip with FPSO and tanker | 1.0 → 1.9 (it approaches) |
| Far | Sky | 1.0 → 1.25 (slowest) |
| Interface | Header, meter, annotations | Fixed |

**Occlusion:** the deck hides the lower sea at entry and reveals it as it slides away, so the visitor feels the camera leave the vessel.

### Material
Wet steel deck and painted container walls under grazing dawn light; the yellow ROV is the only saturated object on the deck. Water is real (photographed), never simulated in this concept.

### Typography
- **Headline:** 112 px at 1440, Archivo 500, tracking -0.05em, two lines in the sky over the dark cloud mass, left-aligned on a 40 px margin. It never crosses the horizon.
- **Annotations:** IBM Plex Mono 11 px uppercase, on hairline leaders that name what is visible ("Unidade de produção · FPSO", "ROV Work Class no convés"). Two at most per frame.
- **Statement in frame 2:** 72 px, two lines.
- **Numbers in frame 2:** 76 px with mono labels; source line at the bottom right.
- **Negative space:** sky (frames 1 and 2) and open sea (frame 3).

## 3. Motion storyboard

The hero is pinned for about 4 viewports. `p` is scroll progress inside the hero.

| p | What the visitor sees | What moves | What holds |
|---|---|---|---|
| Load (auto, 1.4 s) | Black → the deck plate exposes from dark to dawn; headline lines rise; leaders draw from their pins | Exposure ramp; line reveals | — |
| 0 → 0.08 | Frame 1 | A slow 0.3 % "breathing" scale keeps the still alive | Type, annotations |
| 0.08 → 0.40 | Push-in: the deck slides down and out of focus; the FPSO grows; the sun blooms | The four planes at their own rates (table above) | Header and meter |
| 0.25 | Headline and annotations fade out (24 px rise) | | |
| 0.40 → 0.62 | Frame 2: the horizon hold. The statement arrives, then the three verified numbers one after another | Numbers roll in (odometer, 0.6 s each) | Picture almost still |
| 0.62 → 0.70 | The camera reaches the sun: a warm flash, motivated by the light | Exposure flash, 0.25 viewport | |
| 0.70 → 0.92 | Frame 3: overhead view alongside the FPSO. "Ao lado de quem produz." | Slow downward drift; the photograph slides up so open blue fills the bottom | Type |
| 0.92 → 1.0 | Exit: deep blue fills the frame; chapter 02 starts on the same blue | | |

**Reduced motion:** frame 1 as a still, the headline and statement stacked, the numbers as text. No push, no flash.

## 4. Mobile (390 × 844)

- The same plate cropped tall: sky and headline in the top 40 %, the FPSO on the horizon at 34 %, the deck below.
- Annotations are reduced to one caption line at the bottom.
- The push-in keeps the same layer rates; the sun flash is replaced by a simple crossfade.
- Frame 2 stacks the three numbers vertically.

## 5. Assets and production

| Asset | Today | Ideal |
|---|---|---|
| Deck at dawn | Real, 2200 px, one still | The photographer's original file (likely larger), or a 6K bracketed still from the same position. Best: a 25 s dawn drone or bridge-camera take pushing toward the FPSO |
| Deck foreground mask | Generated locally with Apple Vision | Hand-refined mask on the original |
| Alongside FPSO | Real, 2048 px | A 6K overhead drone still of the vessel alongside a production unit, with the client's and the operator's permission |
| Sky and sea motion | None | See `../MEDIA-PRODUCTION-PLAN.md`: optional image-to-video **on the empty sky and sea only**, with the deck masked out and kept as the real still |

## 6. Feasibility

- **Approach:** DOM multiplane in a sticky stage (four image layers with transforms) plus pre-blurred copies of the foreground crossfaded instead of a live `filter: blur`. No new library.
- **Option:** one WebGL canvas for the four planes if the profile shows the DOM version dropping frames on mid-range phones.
- **Weight:** about 1.1 MB desktop and 0.6 MB mobile (AVIF/WebP), with the first plate at about 260 KB as LCP.
- **Risk:** the push-in is limited by the 2200 px source; beyond about 1.9× it softens. With an original or 6K still the push can reach 3×.
- **Effort:** 2 to 3 days with the existing assets.

## 7. Transition into chapter 02

Frame 3 drifts down until open blue fills the screen. Chapter 02 opens on that blue: the three verified numbers become the scale of the operation (see `../SECTION-02-DIRECTION.md`, direction 1).

## 8. Quality gate

| Question | Answer |
|---|---|
| Does it communicate the size of Oceânica? | **Yes.** Deck, equipment and client infrastructure share one frame within a second. |
| Major offshore engineering company? | Yes. Nothing in the frame is decorative. |
| Remarkable composition? | Frame 1 is strong because the photograph is. Frame 3 depends on a crop of a phone-grade image. |
| Memorable headline? | Good, not unforgettable. #2 may be the stronger line overall. |
| Clear cinematic idea? | Yes: one approach, deck to horizon to alongside. |
| Stands out among global industrial sites? | With the original-resolution still or real footage, yes. With today's files, it is very good, not exceptional. |
| Depends on stock? | **No.** Every pixel is Oceânica photography. |
| Meaningful parallax? | Yes. The planes are real depth planes of the photograph. |
| Credibly buildable? | Yes, with the lowest risk of the three. |
| Company understood in the first seconds? | Yes. |
