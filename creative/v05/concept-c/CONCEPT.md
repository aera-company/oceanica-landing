# Concept C · O sistema / The operational universe

**Thesis.** Oceânica as an integrated engineering system. The hero is an original drawing of an offshore field: a fixed platform on the shelf, a production unit in deep water, risers, a pipeline on the seabed, and three Oceânica vessels working at once.
- A shallow-water support vessel puts a diver on the platform.
- An MPSV lowers a Work Class ROV to a manifold.
- A support vessel flies an observation ROV along the production unit's hull.

Numbered points on the drawing open **real photographs**. The camera travels into one point until the drawing becomes the photograph: the plan becomes the real thing.

**Emotion.** Clarity, intelligence, command. The page feels like an engineering atlas.

**Frames.**
- `frames/1.webp`: the whole field.
- `frames/2.webp`: the camera inside point 03, with the photograph open.
- `frames/3.webp`: the field as a tool, with the contingency mode lit.
- `frames/m.webp`: mobile.

Source files: `index.html?f=1|2|3|m` and `world.js`. The drawing is original SVG made for this study. It is not traced from the "quem somos" render, which is not used. **No motion exists yet.**

---

## 1. Headline candidates

| # | PT | EN | Note |
|---|---|---|---|
| 1 ★ | **O offshore é um sistema. Nós cuidamos dele.** | **Offshore is a system. We look after it.** | States the idea; the drawing proves it. Confident without a claim. |
| 2 | Uma empresa. Todas as profundidades. | One company. Every depth. | Short, strong; "todas" stretches the truth (0 to 3000 m is the verified range). |
| 3 | Tudo conectado, da superfície ao leito. | Everything connected, surface to seabed. | Accurate and descriptive; less memorable. |
| 4 | Cada ponto do desenho é uma operação real. | Every point on this drawing is a real operation. | Mid-scroll line (frame 2). |
| 5 | Por trás de cada operação, um sistema inteiro. | Behind every operation, an entire system. | A shortened version of the brief's starting line. |
| 6 | Quando algo falha no fundo do mar, a resposta já está no sistema. | When something fails on the seabed, the response is already in the system. | For the contingency mode (frame 3). |

Supporting copy (PT): *Embarcações, ROVs, mergulhadores e engenharia trabalhando juntos, da superfície a três mil metros.*

## 2. Art direction

### Camera
- **Lens feeling:** orthographic. There is no perspective; it is a section drawing, like an engineering sheet.
- **Framing:** the sky occupies the top 46 % (headline and lede), with the surface line at 46 %. The seabed falls diagonally from the shelf (left) to 3000 m (right), and that diagonal is the main compositional line.
- **Trajectory:**
  1. A slow lateral traverse left to right at 1.15× while each marker activates as it passes the centre.
  2. A zoom into point 03 (2.5×).
  3. A pull back to the whole field.

  This is the only concept with a horizontal move.

### Light
- **Paper:** flat, warm mineral white `#efeee8` with a soft top-left sheen.
- **Water tone:** engraved. Horizontal hairlines get denser and darker with depth, from 5 % to 37 % ink, so the drawing itself carries the falloff.
- **Ground:** hatched at 45°.
- **The only "lit" elements:** the photographs and the green marker of the active point.

### Depth
| Plane | Content | Rate |
|---|---|---|
| Paper and sky | Background | 1.0× |
| Engraved water | Hairlines | 0.85× during the traverse (the water feels deeper than the page) |
| Drawing | Structures, vessels, lines | 1.0× |
| Photo plates | Real photographs on white mounts with shadows | 1.15× (they float above the sheet) |
| Interface | Header, depth scale, modes bar | Fixed |

**Occlusion:** the plates cast soft shadows on the sheet; the open photograph in frame 2 covers the drawing it describes.

### Material
Paper, graphite line (0.9 px non-scaling stroke, so lines stay hairline at any zoom), and photographic prints on white mounts. Colour appears only where the hardware is coloured: yellow on the Work Class and the diver, green on the Lynx and on the active marker.

### Typography
- **Headline:** 74 px, ink `#0f2129`, two lines, in the sky.
- **Lede:** in the sky on the right.
- **Labels:** mono 9 to 11 px on the plates and the depth scale (log scale, labelled "escala comprimida").
- **Modes bar:** a segmented control in mono (Visão geral · Prevenção · Contingenciamento · Engenharia).

## 3. Motion storyboard

The hero is pinned for about 4 viewports.

| p | What the visitor sees | What moves | What holds |
|---|---|---|---|
| Load (auto, 1.6 s) | The drawing draws itself (`stroke-dashoffset`): the surface line, then the vessels, the seabed, the risers. The markers pop in order; the plates slide up 12 px | Line draw | Headline (appears with the line) |
| 0 → 0.08 | Frame 1 | — | Everything |
| 0.08 → 0.40 | Lateral traverse at 1.15×. Markers 02, 01, 03 and 04 activate as they cross the centre; the active plate scales to 1.08 and the others dim to 70 % | Drawing, plates | Header, scale |
| 0.40 → 0.70 | Zoom into 03 (to 2.5×). The other plates fade. The photograph opens from the marker as a clip-path from a 20 px circle to a 680 × 520 rectangle. "Cada ponto do desenho é uma operação real." | Drawing scale, photo clip | Lines stay hairline (non-scaling) |
| 0.70 → 0.92 | Pull back to the field. The modes bar appears; the demonstration switches to Contingenciamento, which lights the pipeline, the MPSV, the risers and the Work Class in green and dims the rest | Drawing scale, highlight | |
| 0.92 → 1.0 | Exit: hand-off to chapter 02 or straight to the Oceânica Universe chapter | | |

Markers are real buttons: a visitor can click any point and open its plate without scrolling.

**Reduced motion:** the whole field drawn, all plates visible, no traverse or zoom; the modes still work as buttons.

## 4. Mobile (390 × 844)

- A vertical slice of the same drawing through the MPSV and its vehicle (frame `m`). The headline sits in the sky.
- The traverse becomes a vertical descent along the umbilical; markers are 44 px tap targets.
- Plates open as a bottom sheet.

## 5. Assets and production

| Asset | Today | Ideal |
|---|---|---|
| Field drawing | Original SVG, about 40 KB (`world.js`) | Redrawn by an illustrator against Oceânica's vessel general arrangements (the fleet page links a PDF datasheet per vessel) so every silhouette is the real ship |
| Photo plates | Five real photographs, two of them video grabs | One hero photograph per point, at 3000 px or more |
| Engineering point | The contingency tool photograph | Photographs of the CRD (pipeline repair coordination) operation, with permission |

No generated imagery is needed for this concept.

## 6. Feasibility

- **Approach:** inline SVG in a sticky stage, a CSS transform as the camera, `vector-effect: non-scaling-stroke` for crisp lines at any zoom, and clip-path for the photo reveal. Markers and modes are real buttons, so the hero is keyboard and screen-reader accessible.
- **Weight:** under 0.7 MB with lazily loaded plates. The lightest of the three.
- **Risk:** the drawing must be excellent. A middling drawing reads as a diagram, not a flagship. Budget a specialist illustrator.
- **Effort:** 3 days to build; illustration time on top.

## 7. Transition into chapter 02 and the Universe

- The drawing zooms out further and becomes the coastline of Rio de Janeiro state with the four verified bases (Rio de Janeiro, Macaé, Rio das Ostras, Niterói). Chapter 02's numbers sit on that map (see `../SECTION-02-DIRECTION.md`, direction 3).
- The same drawing system is the foundation of the Oceânica Universe (see `../OCEANICA-UNIVERSE-DIRECTION.md`).

## 8. Quality gate

| Question | Answer |
|---|---|
| Size of Oceânica? | **Yes, as breadth.** Three vessel types, two ROV classes, divers, a platform, an FPSO and a pipeline in one view. Less as raw physical scale. |
| Major offshore engineering company? | Yes. It looks like engineering. |
| Remarkable composition? | Distinctive. No industrial competitor's site looks like this. |
| Memorable headline? | Yes, and it explains the company in one sentence. |
| Clear cinematic idea? | Yes, but it is graphic cinema, not photographic: "the drawing becomes the photograph". |
| Stands out globally? | Yes, if the drawing quality is very high. |
| Depends on stock? | No. |
| Meaningful parallax? | Moderate. The depth here is conceptual (layers of the system) more than optical. |
| Credibly buildable? | Yes, and the most accessible. |
| Understood in seconds? | Yes: "a company that works across this whole picture". |
| Risk | The least emotional of the three. It could feel like an annual report if the motion is timid. |
