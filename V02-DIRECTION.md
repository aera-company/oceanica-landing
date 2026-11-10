# V02 · Engineering is the protagonist

Branch `v02` · 2026-11-10. V01 is preserved at git tag `v01` and is what is live at oceanica-landing.vercel.app.
This document supersedes `CREATIVE-DIRECTION.md` and `MOTION-STORYBOARD.md` for the hero. Research documents stay valid.

Companion files: [MEDIA-INVENTORY.md](MEDIA-INVENTORY.md) · [HIGGSFIELD-PRODUCTION-PLAN.md](HIGGSFIELD-PRODUCTION-PLAN.md)

## 1. V01 diagnosis

What V01 got right, and what is kept:

- The descent as structure. Scroll is depth.
- The waterline as the one physical event of the page.
- Two type voices, one green mark per screen, HTML type on top of the picture.
- A shot engine with tiers, fallbacks and measured 60 fps.

Where V01 fails the brief:

| Problem | Evidence |
|---|---|
| **The sea was the subject.** For 4.4 viewports the visitor looked at procedural water, shafts and particles. No vessel, no ROV, no person, no tool. | Hero frames 1 to 5 of V01 contain zero Oceânica hardware |
| **Engineering arrived after the film.** The only real asset, one ROV frame, sat in chapter 02 as an illustration. | `docs/frames/desktop-06.webp` |
| **The copy was about the ocean.** "Sunlight ends here" is oceanography. It says nothing about what Oceânica does. | V01 `copy.ts` |
| **Instruments outweighed facts.** Depth tape, pressure and light read-outs occupied two corners, all of them generic physics. | V01 hero |
| **It under-used what exists.** The official site holds full-resolution originals (up to 5374 px) of the fleet, a working-deck sunrise and a Lynx ROV with its lamps on. V01 used none of them in the hero. | [MEDIA-INVENTORY.md](MEDIA-INVENTORY.md) |

One sentence: V01 was a well-made ocean background with a company name on it.

## 2. Revised direction

**The ocean is the environment. The engineering is the story.**

Every shot of the hero is a real Oceânica photograph with a camera on it. The shader no longer draws scenery. It supplies only what a camera and the sea would add to a real frame:

- framing, focus point and a slow push or pull;
- one grade across four sources, so they read as one film;
- motion in the sea areas of a still (the hull stays rigid, the water moves);
- the waterline, used once, as the cut between the deck and the water;
- loss of daylight, leaving the vehicle's own lamps;
- suspended particles, tied to scroll speed.

Rules:

1. **No invented hardware.** If it is on screen, it was photographed.
2. **Captions carry verified facts**, and name the asset when the source names it.
3. **Depth is a supporting read-out.** One small number, bottom right, and only once the camera is under water. The tape, pressure and light read-outs are gone.
4. **Statements are about the work**, not the water.
5. **The headline sits in the sky**, so the vessel is never covered.
6. **One film, five shots, one transition language**: darkness and light. Night falls on one shot, first light comes up on the next; daylight is lost under water, the work light arrives.

Art direction is unchanged where it worked: abyss `#02080d`, mineral white, Oceânica green `#009c48` as the single accent, Archivo and IBM Plex Mono, sentence case, no cards, no glass. The new colours on screen are real ones: green hulls, a yellow tether-management cage, a green Lynx.

## 3. Five-shot storyboard (as built)

Wrapper 620 vh on desktop (5.2 viewports of travel), 540 vh on portrait. `p` is progress, 0 to 1. Timeline lives in `src/lib/film.ts`.

| Shot | p | Picture | Camera | Type |
|---|---|---|---|---|
| **01 Surface** | 0.00 to 0.21 | OCEANICASUB VI under way at dusk, Rio skyline behind. Real photograph. The sea moves, the hull does not (subject mask). | Slow push from the full vessel toward the bridge and helideck, zoom 1.0 to 1.3 | Headline in the sky: "Engineering the depth." Lede and asset caption bottom left: vessel name, class, 2 Work Class ROVs, 100 t subsea crane |
| cut | 0.16 to 0.28 | Night falls on the vessel. First light comes up on the deck. A dip through dark, not a cross-fade of two pictures. | Continuous | none |
| **02 Operation** | 0.21 to 0.47 | Back deck at first light, FPSO and tanker on the horizon, launch frame and ROV cage in the centre. Real photograph. | Tilt down from the horizon to the launch system, zoom 1.04 to 1.7 | "Every descent starts on deck." Eleven vessels, six carry Work Class ROVs |
| **transition** | 0.38 to 0.52 | **The waterline rises over the deck.** Bubbles and a short bloom under the line while it moves. The statement is cut by the line: dry above, refracted below. | Camera keeps pushing toward the cage as the water takes it | Same statement, submerging |
| **03 Descent** | 0.47 to 0.72 | A Seaeye Lynx, green, lamps on, appears through the water. Real photograph. Daylight drains from 0.60 to 0.70 until only its two lamps and what they light remain. | Slow push toward the vehicle, zoom 1.25 to 1.5 | "Below 300 metres, the work belongs to machines." 56 ROVs, more than 250 pilots. Depth read-out appears |
| **04 Work Class** | 0.72 to 0.885 | Black. A work light opens from the vehicle's own lamp outward and uncovers a manipulator in extreme close-up. Real frame of a Work Class ROV on a subsea structure. | Macro at zoom 2.3 on the arm, slow pan across the tooling | "Built to do the work, not to watch it." Seven-function manipulators, up to 250 HP, tooling designed in-house |
| **05 Intervention** | 0.885 to 1.00 | Same frame, same take: the camera pulls back from the arm to the whole vehicle working on the structure. | Zoom 1.95 to 1.1, no cut | "Inspection and intervention, from zero to three thousand metres." The only Brazilian company contracted across that range. Depth reads 3000 m |
| **into chapter 02** | after 1.00 | The last frame sinks back into dark water and stays behind the first content section as a ghost. | none | "Safer assets for a cleaner world." (the official tagline), four verified figures, the three service lines |

Portrait is a separate edit of the same film: its own focus points per shot, headline at 16.6 vw, the shot index as five segments on the bottom edge.

Reduced motion: one still of shot 01 with the headline, then the four statements as ordinary reading content.

## 4. What was implemented

- `src/lib/film.ts`: the edit. Which picture, where the camera is, light state, per scroll position. Two edits (wide, tall).
- `src/components/film/shader.ts`: the shot player. Camera on a photograph, grade, moving sea with subject mask, waterline, daylight loss with lamp falloff, work-light reveal, particles.
- `src/components/film/Film.tsx`: textures (first shot first, rest behind it), tiers full, lite and static, fps watchdog, still renderer.
- `src/components/film/Hero.tsx`: HTML interface. Headline, four statements, shot index, depth read-out, waterline cut on the shot 02 statement.
- `src/components/film/Below.tsx`: chapter 02 on the official tagline.
- A vessel subject mask produced locally with the macOS Vision framework. No paid service was used.
- Skip link past the film, semantic headings, decorative layers hidden from assistive technology.

Measured on an Apple M1, headless Chrome with GPU: 60 fps at every shot and in a continuous scroll through the whole page at 1440×900 DPR 2 (canvas 2880×1800), no frame over 25 ms. Phone emulation at 4× CPU throttle holds 60 fps page cadence. Typecheck and lint pass.

Hero weight: about 1.8 MB of photographs. The first shot (0.94 MB) loads first; the other three load while the headline is being read.

## 5. What remains to reach premium quality

In order of impact:

1. **The pictures are stills.** A camera on a photograph gives presence, not life: no wake moving past the hull, no arm moving, no tether swaying. Real footage from Oceânica is the fix. Image-to-video from these same frames is the fallback and needs approval. See the Higgsfield plan.
2. **Shots 04 and 05 are low resolution.** The Work Class frame is a 1900×811 video grab. At macro zoom it shows compression. A proper still from the ROV camera feed, or an upscale pass, is needed.
3. **Shot 03 is an observation-class ROV in shallow water.** It is real and it is green, but the story at that point is deep water. A Work Class vehicle leaving the cage would be the right frame.
4. **Rights.** Every photograph comes from the public site. None is cleared. The Work Class frame may be supplier footage. `public/oceanica/SOURCES.md` lists them.
5. **Shot 02 identification.** The deck is the site's Assets banner. The vessel and the equipment in it are not named on the site, so the caption does not name them.
6. **No sound.** A premium film at this level usually has an optional, muted-by-default ambience bed.
7. **Safari, real phones and weaker GPUs are not measured.** The page now samples two large textures per pixel.
8. **Typefaces are open-source stand-ins.**
9. **Only hero and first transition exist.** Chapters 03 to 10 from `SITE-ARCHITECTURE.md` are not built.
10. **Housekeeping.** V01 review frames are still in `docs/frames/` next to the `v02-*` ones; they could not be removed automatically and can be deleted by hand.
