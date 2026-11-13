# Concept B · Acima e abaixo / Above and below

**Thesis.** A whole engineering world exists across the waterline. The page itself is cut by the waterline: above it, an Oceânica vessel heading out; below it, the water column where the same company works. The headline is cut by the same line, crisp above and refracted below. As the visitor scrolls, the camera sinks: the surface rises out of frame, the headline tears apart along the line, and the work below is revealed by the vehicles' own lamps.

**Emotion.** Curiosity, then awe, then respect. The surface is daylight; the rest is earned.

**Frames.** `frames/1.webp` (entry), `frames/2.webp` (mid-water), `frames/3.webp` (seabed), `frames/m.webp` (mobile entry). Source file: `index.html?f=1|2|3|m`.
- Above the line: real photography.
- Below the line: the water is **drawn** (gradients, light shafts, particles), with **no equipment invented**.
- The vehicles shown underwater are real Oceânica video frames.

**No motion exists yet.**

---

## 1. Headline candidates

| # | PT | EN | Note |
|---|---|---|---|
| 1 ★ | **Abaixo da linha d'água, uma operação inteira.** | **Below the waterline, an entire operation.** | The line is in the sentence and in the picture. Scale without a number. |
| 2 | Metade do trabalho acontece onde ninguém vê. | Half the work happens where no one can see. | Strong, but "half" is not a measured fraction. |
| 3 | Dos dois lados da linha d'água. | On both sides of the waterline. | Elegant and short; a little quiet. |
| 4 | O que sustenta o offshore fica abaixo da linha. | What keeps offshore running lies below the line. | Good mid-scroll line. |
| 5 | O trabalho que ninguém vê mantém tudo de pé. | The work no one sees keeps everything standing. | Used at the seabed (frame 3). |
| 6 | O invisível exige engenharia. | The unseen demands engineering. | A tightened version of the brief's starting line. A little abstract. |

Supporting statement (verified figures): *Mergulhadores até 50 metros. ROVs até 3000.* EN: *Divers to 50 metres. ROVs to 3,000.*

## 2. Art direction

### Camera
- **Lens feeling:** 35 mm. The whole sequence is one vertical crane move down through the surface, at constant speed, with no cuts.
- **Framing:** the waterline starts at 62 % of the frame height; the vessel sits right of centre with the stern close and the bow away. The umbilical is a fixed vertical line just off the vessel's stern.
- **Trajectory:** down. The waterline rises from 62 % to 14 % and then leaves the frame. Later depths are reached by fading through darkness, never by cutting.

### Light
- **Above:** midday sun, saturated deep blue.
- **At the line:** a bright meniscus (a 2 px line with a soft glow) and a band of blurred, mirrored surface light just under it.
- **Below:** turquoise at the surface falling to black at 46 % of the column height, with slow light shafts from the upper left (conic gradients).
- **Deep:** the only light comes from the vehicles' lamps. The Work Class image is revealed by a growing radial mask, so the lamp seems to switch on.

### Depth
| Plane | Content | Rate |
|---|---|---|
| Above-surface plate | Vessel photograph | Moves up with the surface, then blurs as it is seen through water |
| Waterline | Meniscus and refraction band | The anchor of the composition |
| Far particles | Suspended matter | 0.4× |
| Light shafts | Conic gradients | 0.6× |
| Vehicles | Lynx and Work Class plates | 1.0×, revealed by light |
| Near particles | Streaks, blurred | 1.6× |
| Interface | Header, depth read-out, umbilical | Fixed |

### Material
Water is the material: gradient density, refraction at the line and particle streaks scaled to the speed of the descent. The vehicles keep their real colours (green Lynx, yellow Work Class), slightly cooled by the water and never recoloured.

### Typography
- **Split headline:** 104 px, three lines. The waterline crosses the third line through its letters.
  - Above the line the letters are crisp, `#f3f4f0`.
  - Below the line they are a teal tint `rgba(150,225,222,.78)`, shifted 5 px, skewed 2° and blurred 0.9 px (refraction).
  - An animated SVG turbulence displacement on the "wet" part at low amplitude makes the water legible as water.
- **Statements:** 76 to 80 px, on the left, over dark water only.
- **Depth read-out:** Plex Mono 28 px, bottom right, labelled. It shows 0000 m at the line; in deep water it shows a direction arrow, not a depth. The underwater pictures carry no depth information, so the frames do not invent one.

## 3. Motion storyboard

The hero is pinned for about 3.5 viewports.

| p | What the visitor sees | What moves | What holds |
|---|---|---|---|
| Load (auto, 1.2 s) | The waterline draws left to right; above, the photograph exposes; the headline rises; the "wet" letters start their slow ripple | Line draw, ripple (continuous, low amplitude) | — |
| 0 → 0.10 | Frame 1 | Particles drift | Type |
| 0.10 → 0.45 | The camera sinks: the waterline rises to the top; the dry half of the headline rises with the surface, while the wet half stays below and fades into the dark. **The headline tears apart along the line**: the signature moment | Surface plate, line, dry type at 1.0×; underwater planes at their own rates | Wet type, umbilical, read-out |
| 0.45 → 0.70 | Frame 2: the Lynx plate brightens from black, lamps first. The statement about 50 m and 3000 m arrives | Radial reveal, 0.4 viewport | |
| 0.70 → 0.95 | Frame 3: the surface is gone. Darkness, then the Work Class lamp opens a pool of light on the structure. "O trabalho que ninguém vê mantém tudo de pé." | Reveal mask grows | |
| 0.95 → 1.0 | Exit: the pool of light closes to a point; chapter 02 starts in the dark | | |

**Reduced motion:** frame 1 as a still with the split headline; the two statements as text; no ripple.

## 4. Mobile (390 × 844)

- The waterline sits at 56 %. The vessel is in the top half, cropped tight on the stern; the headline is three lines with the line crossing the last one.
- The descent is the same, shortened to 3 viewports. Near particles drop to 40.
- The ripple is CSS only (no SVG filter) on low-end devices.

## 5. Assets and production

| Asset | Today | Ideal |
|---|---|---|
| Vessel above water | Real drone still, 2048 px | A real over/under take (split-dome housing) of an Oceânica vessel launching a ROV, 4K 50 fps, 20 s. This is the authentic version of the whole idea |
| Diver in the shallow column | **None usable** (stock only) | A real Oceânica diver at 10 to 30 m near a structure, shot by a diving cameraperson. Not to be generated |
| Lynx mid-water | Real video grab, 1920 × 1080 | The source video the grab came from |
| Work Class at the seabed | Real video grab, 1900 × 811, compressed | High-bitrate footage from the vehicle's camera, or stills from a second camera |
| Water, shafts, particles | Drawn in CSS and canvas | Can stay drawn. An optional generated plate of **empty water only**, with no equipment and no seabed structure, is possible (see `../MEDIA-PRODUCTION-PLAN.md`) |

## 6. Feasibility

- **Approach:**
  - DOM in a sticky stage;
  - the above plate as an image;
  - the water as CSS gradients;
  - one canvas for particles (an extension of the live hero's particle code);
  - the headline as two clipped copies of the same text, with an SVG `feTurbulence` filter on the wet copy.
- **Weight:** about 0.9 MB.
- **Risks:**
  1. The underwater vehicles come from compressed video and look soft at large size; the frames keep them inside vignetted pools of light to hide this.
  2. Without a diver the column shows machines only. The brief asks for the diver and ROV together, and only a real shoot can deliver that honestly.
  3. If the drawn water becomes too schematic, the concept turns into an infographic.
- **Effort:** 2 days for the composition, 1 for the split-type behaviour on all browsers.

## 7. Transition into chapter 02

The pool of light closes to a point at the seabed. Chapter 02 opens in the dark with the numbers lit the same way, each revealed by its own pool of light (see `../SECTION-02-DIRECTION.md`, direction 2).

## 8. Quality gate

| Question | Answer |
|---|---|
| Size of Oceânica? | Partly. It shows **range** (surface to seabed) better than **size** (fleet, people, infrastructure). |
| Major offshore engineering company? | Yes, once the vehicles appear. In frame 1 alone it could read as "a vessel". |
| Remarkable composition? | The split headline is the most memorable device of the three concepts. |
| Memorable headline? | Yes. The line is in the words and in the picture. |
| Clear cinematic idea? | Yes: one descent through the line. |
| Stands out globally? | The split type does. The underwater imagery does not yet. |
| Depends on stock? | No. The diver is left out rather than faked. |
| Meaningful parallax? | Yes. Every plane is a depth of water. |
| Credibly buildable? | Yes. |
| Understood in seconds? | The vessel and the line are; the company's breadth arrives only with the scroll. |
