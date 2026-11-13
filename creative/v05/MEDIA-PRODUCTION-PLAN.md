# Media production plan (preliminary)

Status on 2026-11-12:
- **No image or video has been generated and no credits were spent.**
- Balances at the last check: Higgsfield 0.5 credits, Magnific 0 credits.
- Every generative item below is a prompt for approval, not an order.

## Rules that apply to every shot

1. **Real first.** If Oceânica can supply a photograph or footage, that beats any generated version.
2. **No invented evidence.** Generated media may show water, sky, light and atmosphere. It may not show an Oceânica vessel, vehicle, diver or operation that was not photographed. Where a real asset appears in a generated shot, the real pixels are composited on top and the model only touches the surroundings.
3. **No text or instruments in generated frames.** All type and labels stay in HTML.
4. **Geometry is preserved.** No reshaping of hulls, cranes, A-frames or ROV frames. Upscaling runs at the lowest creativity setting.
5. **Labelling.** Any generated element that reaches a public page carries a "composição conceitual" credit in the caption layer.

## Which method for which need

| Need | Best method | Why |
|---|---|---|
| Vessel, deck, equipment, people | **Real photography or footage** | Identity and credibility; nothing else is acceptable for the subject |
| More resolution on an existing real still | **Magnific upscale, creativity 0 to 1, HDR low** | Keeps geometry and adds pixels for push-ins |
| Moving sky or sea around a real still | **Higgsfield image-to-video on a plate with the subject masked out**, then the real still composited over it | Gives life without touching the asset |
| Empty water column, light shafts | Drawn (CSS or canvas) or **Higgsfield text-to-video of empty water** | No asset involved |
| A camera move through a real environment | **Scroll-driven image sequence from real drone or ROV footage** | The ZRK method, with Oceânica's own material |
| The whole field as a system | **Illustration (SVG), or a 3D scene** for the Universe chapter | Clarity; no photographic claim |

## Shot list by concept

### Concept A · A escala

| ID | Subject | Source | Camera | Light | Motion | Duration | Aspect / resolution | Continuity | Method |
|---|---|---|---|---|---|---|---|---|---|
| A-01 | Aft deck at dawn, ROV in its launch system, FPSO and tanker on the horizon | `assets/deck-dawn.webp` (real) | 24 mm from the bridge wing, high, looking aft | Low sun behind the FPSO, cold overcast ambient | None in the still; push-in made from layers | still | 4:3 source, crops to 16:10 and 9:19.5. Target 4400 px | Horizon at 39 %; the sun stays behind the FPSO | **Ask Oceânica for the original file.** Otherwise a Magnific 2× upscale at creativity 0, HDR 1, and the deck mask redone on the upscale |
| A-02 | Sky and sea behind the deck (no deck, no vessels) | A-01 with the deck, FPSO and tanker masked out | Locked off | Same | Clouds drift left at about 1 % of the frame per second; the sea surface moves; no camera move | 8 s loop | 16:9, 1920 px | The horizon line must not move; the sun's position is fixed | Higgsfield image-to-video. Prompt: *"Locked-off camera. Dawn clouds drift slowly left, gentle open-ocean swell, sun glare steady on the horizon. No boats, no structures, no text, no camera movement."* The real deck, FPSO and tanker are composited back over the result. Labelled as atmosphere |
| A-03 | Vessel alongside a production unit, overhead | `assets/alongside-fpso.webp` (real) | Near-vertical from the unit's deck | Midday | None | still | 16:9, target 4000 px | Must read as the arrival point of A-01's push | Request a 6K drone still from the same position (with the operator's permission); Magnific 2× at creativity 0 as the fallback |
| A-ideal | Drone flight: from the stern of an Oceânica vessel, rising and pushing toward the FPSO it supports, at dawn | **New shoot** | 24 → 70 mm equivalent, slow climb and push | Dawn | One continuous move | 25 s | 4K 50 fps, plus a vertical 9:16 pass | Same vessel and FPSO as A-01 if possible | Scroll-driven image sequence (about 150 frames, AVIF), replacing the multiplane layers |

### Concept B · Acima e abaixo

| ID | Subject | Source | Camera | Light | Motion | Duration | Aspect / resolution | Continuity | Method |
|---|---|---|---|---|---|---|---|---|---|
| B-01 | Vessel heading out, stern close | `assets/astern-open-sea.webp` (real) | Drone, high, behind | Midday | None | still | 16:9, target 4000 px | The stern sits just above the cut line | Magnific 1.5× at creativity 0 |
| B-02 | Empty water column, surface to black, light shafts, suspended particles | Text only, **no equipment** | Locked, looking horizontally | Turquoise top, falling to black; shafts from the upper left | Shafts sway slowly; particles drift up | 10 s loop | 16:9 and 9:16, 1920 px | Colours must match the CSS gradient (`#0d5a68` → `#01080b`) | Optional. Higgsfield text-to-video. Prompt: *"Underwater open ocean, empty water column, sunlight shafts from the upper left fading into deep darkness, fine suspended particles drifting upward, no animals, no objects, no seabed, no divers, no text, locked camera."* The drawn CSS version already works; use only if it clearly beats it |
| B-03 | Over/under launch of a Work Class ROV | **New shoot** | Split-dome housing at the waterline beside the launch point | Daylight | The cage enters the water and descends out of frame | 20 s | 4K 50 fps | Same vessel as B-01 if possible | Real footage only. **Not to be generated** (it would show an Oceânica operation) |
| B-04 | Oceânica diver at 10 to 30 m on a structure | **New shoot** | Diving cameraperson, 18 mm | Natural light | Slow, the diver working | stills plus 15 s | 6K stills | Equipment visible and correct | Real only. **Not to be generated** |
| B-05 | Lynx mid-water; Work Class at the seabed | Existing video grabs | ROV cameras | Own lamps | — | stills | Today 1900 px, compressed | — | Request the source videos; a Magnific upscale only as the last resort, at creativity 0 (risk of hallucinated detail on machinery) |

### Concept C · O sistema

| ID | Subject | Source | Method |
|---|---|---|---|
| C-01 | The field drawing | Original SVG (`concept-c/world.js`) | An illustrator redraws it against the vessels' general arrangement drawings. No generation |
| C-02 | One photograph per point (MPSV, diver, Work Class, Lynx, production unit, contingency tool) | Real library | Request the originals at 3000 px or more. Magnific creativity 0 only to fill gaps |
| C-03 | Optional 3D version of the field for the Universe chapter | New | Low-poly real-time scene (three.js) or Blender renders. Vessels modelled from the general arrangements. Not generated |

## Priority request list for Oceânica

1. Any **moving footage**: ROV dives, launch and recovery, the June 2024 drone flight of the fleet.
2. The **original files** of the deck-at-dawn photograph and the alongside-FPSO photograph.
3. **Permission** to show the production units that appear in those frames.
4. A **real diver** shoot (or existing material from their training centre).
5. **SVG logo** and brand guide.
6. Written **image clearance**.

## Credit estimate (only if approved)

| Item | Tool | Calls | Note |
|---|---|---|---|
| A-02 sky and sea loop | Higgsfield image-to-video | 2 to 3 attempts | Short, low motion |
| B-02 water loop | Higgsfield text-to-video | 2 to 3 attempts | Optional |
| Upscales (A-01, A-03, B-01) | Magnific | 3 to 5 | Only if the originals are not available |

Exact prices depend on the model chosen at the time. A cost simulation will be run and shown before anything is spent.
