# Creative direction

Internal direction: **Oceânica · Engineering the depth**
This line is a working title for the design. It is not an approved corporate slogan. The official tagline remains "Ativos mais seguros para um mundo mais limpo".

## 1. The idea

Oceânica's own headline claim is a depth range: the only company in the Brazilian market inspecting from 0 to 3000 metres. The site should be that range.

**Scrolling is descending.** The page starts at the waterline and goes down to 3000 m. Each chapter is a depth. The visitor does not read about subsea work from the deck; they go where the work is.

Three things make this specific to Oceânica and not a generic ocean site:

1. **The destination is real.** 3000 m is the company's operating claim, not a decorative number.
2. **Light is the plot.** Sunlight is gone by 200 m. Below that, everything anyone sees is lit by the operation. So the page is dark until Oceânica's light arrives, and real photography only appears inside that light.
3. **The return matters.** The mission is prevention: keep what is down there from reaching the surface. The page ends by coming back up to a clean waterline.

## 2. The signature

**The waterline crosses everything.** One horizontal line of water rises through the first screen, through the sky, the horizon and the headline. Above it, letters are dry and sharp. Below it, they are displaced, dimmed and soft, as seen through water. When the line leaves the top of the screen, the visitor is under.

It is one idea, it happens once, and it is the thing people will describe to someone else.

## 3. Tone

Premium, cinematic, precise, industrial, technical, confident, Brazilian, global, engineering-led.

In practice:

| Do | Do not |
|---|---|
| State one fact per screen, at scale | Lists of benefits, icon grids |
| Let black water be the layout | Cards, panels, glass, rounded containers |
| One green mark per screen | Green fills, gradients, glow, neon |
| Instruments that mean something: depth, pressure, light | Decorative HUD, reticles, fake telemetry |
| Real hulls, real ROVs, real frames from dives | Stock, renders passed as documentary, generated assets |
| Short declarative sentences | Superlatives the site cannot back |
| Sentence case | All-caps headlines |

Brazilian without folklore: the proof is in the work (Campos and Santos basins, Macaé, a fleet with green hulls), not in flags or tropical colour.

## 4. Color

| Token | Value | Role |
|---|---|---|
| Abyss | `#02080d` | Page ground. Deep marine black, slightly blue-green, never pure black |
| Ink | `#06121a` | Off-black navy for the rare raised surface |
| Mineral | `#e9eeec` | All type. A cold white with a trace of green |
| Mineral 70 / 45 | 70 % and 45 % of mineral | Body copy, labels |
| Hairline | 16 % of mineral | Rules, ticks |
| Oceânica green | `#009c48` | The institutional green, used as the precision accent |
| Green, lit | `#19c267` | The same hue raised for 1 px marks on black, where `#009c48` would disappear |

Rules for green: one mark per screen. A tick before a label, the gauge pointer, the progress line, a hover rule, the contact square. Never a background, never a headline.

Water colour belongs to the picture, not the palette: green-blue near the surface, navy by 200 m, near-black below 1000 m. Work light is a cold mineral white.

The only other colours on the page come from reality: the green of the hulls and the yellow of the ROVs.

## 5. Typography

| Voice | Face | Use | Settings |
|---|---|---|---|
| Editorial grotesk | **Archivo** (variable, width axis) | Headline, statements, figures | Weight 500, width 104 %, tracking -0.042 to -0.05em, line height 0.86 to 0.92 |
| Technical mono | **IBM Plex Mono** | Depth, pressure, chapter numbers, captions, nav | 11 px, uppercase, tracking 0.06em, slashed zero, tabular figures |

- Two voices, a wide gap between them: display at 12 vw against mono at 11 px. Body copy at 17 to 21 px is the only middle size, and it is used sparingly.
- Sentence case for every headline. Uppercase only in mono micro-labels.
- No bold, no italics. Hierarchy comes from size and from light.
- Archivo was chosen for its engineering feel and its width axis: wide and heavy enough to survive being cut by a line, neutral enough to sit next to a monospace. Both faces are open source and can be replaced by a licensed grotesk later without touching the layout.

## 6. Layout

- One left edge. Everything typographic hangs from the same margin (`clamp(20px, 2.4vw, 40px)`).
- Instruments on the right edge. Type on the left. The middle belongs to the water.
- No containers. Type sits on the picture. Hairlines separate, nothing encloses.
- Generous emptiness is deliberate, especially between 200 m and 3000 m. The dark is content.
- Photographs are never boxed thumbnails in a grid. Each one is a plate: large, alone, and found by light.

## 7. Imagery

Order of preference, always:

1. **Real Oceânica operations footage and photography.** The June 2024 vessel set is excellent. ROV dive footage is the single most valuable asset to obtain.
2. **Real hardware, lit and shot for the site.** A proper shoot of a Work Class ROV on deck, at night, with its own lights.
3. **Engineering drawings** of tools and structures, redrawn as line work.
4. **Generated or procedural media, only for what has no owner:** water, light, particles, bathymetry. The hero's sea is procedural for this reason.

Never: a generated vessel, ROV, diver, platform or operation. If a scene needs the true geometry of an asset, it waits for real material.

Treatment of real photos: no filters, no duotone. They keep their true colour. They are revealed by a pass of light and they fade into the water at the edges.

## 8. Voice of the copy

- English first for the concept, pt-BR in parallel for launch. The current English site is four years out of date, so both are rewritten.
- The depth statements use general ocean physics (where sunlight ends, what pressure does). They are not claims about Oceânica.
- Every claim about Oceânica is a number or sentence from its own published material, with the source recorded in `research/OCEANICA-CURRENT.md`.
- No em dashes. Commas, full stops, or a middle dot in labels.

Hero and chapter 02 copy as built:

> Engineering the depth.
> Subsea engineering and offshore operations, from the surface to the seabed.
>
> 0200 m · Sunlight ends here.
> 1000 m · No daylight has ever reached this water.
> 3000 m · Down here, the only light is the one we bring.
>
> 02 · Below the surface
> Asset integrity, from zero to three thousand metres.

## 9. What must be true for this to be credible

The benchmark is whether this could be the digital flagship of a major subsea engineering company. Honest status:

| Requirement | Status |
|---|---|
| A first frame that is recognisably Oceânica's world | Yes. Split shot, waterline, instruments |
| One motion idea people remember | Yes. The waterline through the headline |
| Real assets on screen | Partly. One ROV frame and one vessel photo from the public site, both low in the hierarchy of what Oceânica must own |
| Photoreal water | Closer, not there. After the refinement pass the sea is a lit scene (low sun, reflected sky, shafts), but still a procedural render, not footage. See the technical plan for the upgrade path |
| Proof layer | No. Clients, cases and safety numbers do not exist on the current site |
| A licensed, distinctive typeface | No. Open-source stand-ins |
