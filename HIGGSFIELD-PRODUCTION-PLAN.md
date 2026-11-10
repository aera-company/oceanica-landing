# Higgsfield asset production plan

Status: **plan only. Nothing was generated and no credits were spent.** Every shot below needs explicit approval before it runs.

Purpose: turn the five real photographs of the V02 hero into five short moving shots, so the film has life (wake, swell, tether, arm) instead of a camera on a still. The generated clips become scroll-scrubbed frame sequences. HTML type, captions, logo and read-outs stay in the DOM.

## 0. Verified facts about the account and the tools

Checked on 2026-11-10 through the Higgsfield connector, read-only:

| Item | Value |
|---|---|
| Plan | Free |
| Credit balance | 0.5 |
| Unlimited generations | Not available |
| Models that accept a start image and an end image | FLUX 3 Video (5 to 20 s, 720p to 4K), MiniMax H3 Max (5 to 15 s, up to 768p) |
| Models that accept a start image only | Kling 3.0 Turbo (3 to 15 s, 720p or 1080p, 16:9 and 9:16), Grok Video 1.5 (2 to 15 s, up to 1080p) |

**Credit cost per clip is not verified.** The connector did not return prices and nothing was quoted, so no budget figure is given here. What is certain: 0.5 credits will not cover this plan. A paid plan or a top-up is required, and the first action after approval is to request a quote per shot before running anything.

## 1. Rules for every shot

1. **Source image is always a real Oceânica photograph**, used as the start frame. Where the model allows, a second real crop of the same photograph is the end frame, so the model interpolates between two true frames and cannot redesign the asset.
2. **The asset must not change.** Hull lines, helideck, crane, ROV frame, manipulators, colours and any lettering stay exactly as photographed. A take where geometry drifts is rejected, not repaired.
3. **No text, no logos, no instruments, no HUD in the video.** The hull name that already exists in the photograph must stay legible and unchanged or the take is rejected.
4. **No audio.** Turn audio generation off where the model has the switch.
5. **One camera move per shot, slow and continuous.** No cuts, no speed ramps, no handheld shake.
6. **Grade is not baked in.** Generate neutral; the site's shader grades all five shots together.
7. **Rights first.** Do not run any of this before Oceânica confirms the source images can be used.
8. **Disclosure.** Each generated clip is recorded in `public/oceanica/SOURCES.md` as "motion generated from a real photograph".

Shared negative prompt (append to every shot):

> text, captions, subtitles, watermark, logo overlay, user interface, HUD, gauges, numbers on screen, people added, extra ships, extra vehicles, changed hull shape, changed colours, altered lettering, warped railings, melting geometry, morphing, extra arms, duplicated parts, fantasy, science fiction, neon, lens flare streaks, fast motion, camera shake, cuts, time-lapse, cartoon, illustration, low detail, oversaturated

Shared delivery spec: 16:9, 1080p minimum, 24 or 30 fps, no audio. A second 9:16 pass only for the shots marked "portrait pass".

## 2. Shots

### G1 · Surface, the vessel under way (Shot 01)

| | |
|---|---|
| Source image | `public/film/s1-vessel.jpg` (OCEANICASUB VI, 2048×1526). Start frame: full image cropped to 16:9 centred on the vessel. End frame: 16:9 crop at 1.3× centred on the bridge and helideck (image point 0.57, 0.58) |
| Scene objective | The ship is moving. Water slides past the hull, the bow wave breaks, the skyline holds still |
| Framing | High three-quarter aerial, vessel filling two thirds of the width, horizon in the top fifth |
| Camera movement | Slow aerial push-in toward the superstructure, about 20 % closer over the clip. No orbit |
| Light | Low warm sun from the left behind the camera, long soft shadows on deck, haze on the skyline |
| Continuity | End frame must match the start of the V02 dip to dark: same vessel, same heading |
| Prompt | *Aerial drone shot of a green and white offshore support vessel under way on a calm dark bay at dusk. The ship moves steadily forward, white water breaking at the bow and sliding along the green hull, a soft wake trailing behind. Slow, smooth drone push-in toward the white superstructure and the green helideck. Distant city skyline and mountains stay still in warm haze. Realistic documentary cinematography, natural colour, fine detail, steady camera.* |
| Negative | Shared list, plus: ship turning, ship sinking, rough storm sea, helicopter added |
| Resolution and duration | 1080p, 16:9, 6 s |
| Method | Start frame plus end frame. First choice FLUX 3 Video (accepts both). Fallback Kling 3.0 Turbo with start frame only |
| Integration | 6 s at 24 fps gives 144 frames. Export every second frame as WebP at 1920 px (72 frames, target under 4 MB), scrub over p 0.00 to 0.21. The existing still stays as poster and as the lite tier |
| Portrait pass | Yes, 9:16 crop centred on the bridge |
| Credits | Not verified. Quote before running |

### G2 · Operation, the deck at first light (Shot 02)

| | |
|---|---|
| Source image | `public/film/s2-deck.jpg` (2200×1650). Start frame: 16:9 crop on the horizon and upper deck (focus 0.52, 0.38). End frame: 16:9 crop at 1.7× on the launch frame and yellow cage (focus 0.57, 0.60) |
| Scene objective | The vessel is at sea and working. Swell passes on both sides, the sun clears the horizon, the deck equipment is rigid |
| Framing | From the bridge looking aft, deck in the lower half, horizon above the middle |
| Camera movement | Slow crane-down and push toward the launch system. No pan |
| Light | Sunrise dead ahead on the horizon, orange under a heavy cloud deck, cool blue ambient on the deck |
| Continuity | Sun position and cloud deck unchanged. End frame is where the waterline rises in the site |
| Prompt | *View from the bridge of an offshore vessel looking down the working deck toward the stern at sunrise. Dark blue ocean swell rolls slowly past on both sides. On the horizon a production ship and a tanker sit against an orange sun under heavy clouds. The camera lowers and moves slowly forward toward the blue launch frame and the yellow ROV cage in the centre of the deck. Deck equipment and containers stay perfectly rigid. Realistic documentary cinematography, natural colour, steady camera.* |
| Negative | Shared list, plus: crew added, crane moving, containers shifting, sun rising fast |
| Resolution and duration | 1080p, 16:9, 6 s |
| Method | Start frame plus end frame, FLUX 3 Video. Fallback Kling 3.0 Turbo |
| Integration | 72 frames scrubbed over p 0.21 to 0.47. The shader waterline still rises over the last frames |
| Portrait pass | Yes |
| Credits | Not verified |

### G3 · Descent, the vehicle in the water (Shot 03)

| | |
|---|---|
| Source image | `public/film/s3-rov.jpg` (1920×1080), full frame as start frame. End frame: 1.2× crop centred on the vehicle |
| Scene objective | The ROV hovers and descends slightly. Thrusters stir particles, the tether sways, lamp beams cut the water |
| Framing | Frontal, vehicle centred, surface light top right, tether leaving bottom right |
| Camera movement | Very slow push-in, slight downward drift as if following the vehicle down |
| Light | Sunlight from the surface above right, two strong lamps on the vehicle pointing at camera, blue water falling to dark at the bottom |
| Continuity | Vehicle shape, green buoyancy block, two camera housings, number on the right side all unchanged. Lamps stay on |
| Prompt | *Underwater shot of a small green remotely operated vehicle hovering in clear blue water, facing the camera with two bright white lamps on. The vehicle holds position and sinks very slowly, its black tether swaying gently behind it. Fine particles drift past in the lamp beams. Sunlight ripples down from the surface above. The camera moves in slowly and follows it down. Realistic underwater documentary footage, natural colour, steady camera.* |
| Negative | Shared list, plus: fish schools added, divers added, vehicle rotating, lamps switching off, propellers exaggerated |
| Resolution and duration | 1080p, 16:9, 5 s |
| Method | Start frame plus end frame, FLUX 3 Video. Fallback Kling 3.0 Turbo |
| Integration | 60 frames scrubbed over p 0.47 to 0.72. The shader still removes daylight and keeps the lamp falloff on top of the sequence |
| Portrait pass | Yes |
| Credits | Not verified |

### G4 · Product reveal, the manipulator (Shot 04)

| | |
|---|---|
| Source image | `public/film/s4-workclass.jpg` (1900×811). **Upscale first**: the frame is too soft for a macro. Start frame: 16:9 crop at 2.3× on the manipulator (focus 0.30, 0.60). End frame: 16:9 crop at 1.95× (focus 0.42, 0.50) |
| Scene objective | Show the machine as hardware: hydraulic arm, hoses, frame. Almost no subject motion. The life is in the light and the particles |
| Framing | Extreme close-up, arm diagonal across the frame, structure out of focus behind |
| Camera movement | Slow lateral track left to right along the arm, about 10 % of frame width |
| Light | Hard white lamp from the upper left on the vehicle itself, deep black behind, slight particle backscatter |
| Continuity | Must cut cleanly into G5, which starts on this end frame |
| Prompt | *Extreme close-up of the hydraulic manipulator arm of a work class subsea vehicle in deep dark water, lit by the vehicle's own hard white lamp. Steel joints, hoses and cables in sharp detail. The arm stays still. Fine particles drift slowly through the light. The camera tracks slowly sideways along the arm. Black water behind. Realistic deep-sea documentary footage, steady camera.* |
| Negative | Shared list, plus: arm redesigned, extra claws, robot face, glowing parts, colourful lights |
| Resolution and duration | 1080p, 16:9, 5 s |
| Method | Upscale the source still (image upscaler, separate quote), then start frame plus end frame, FLUX 3 Video |
| Integration | 60 frames over p 0.72 to 0.885, behind the shader's work-light reveal |
| Portrait pass | No. Portrait keeps the still |
| Credits | Not verified. Two operations: upscale, then video |

### G5 · Intervention, pull back to the work (Shot 05)

| | |
|---|---|
| Source image | Same upscaled frame. Start frame: the G4 end frame. End frame: 16:9 crop at 1.1× showing the whole vehicle on the structure (focus 0.34, 0.50) |
| Scene objective | Reveal that the arm belongs to a full vehicle that is working on subsea equipment |
| Framing | Ends as a medium shot, vehicle upper centre, yellow structure lower left |
| Camera movement | Slow continuous pull-back and slight rise. No cut from G4 |
| Light | Same as G4. The lamp pool widens as the frame opens |
| Continuity | Same take as G4. The yellow structure and the hoses to it must not move |
| Prompt | *Continuing the same shot: the camera pulls back slowly from the manipulator arm to reveal the whole work class subsea vehicle, yellow and grey, holding position beside yellow subsea equipment in black deep water, lit only by its own lamps. The vehicle and the equipment stay still. Particles drift through the light. Realistic deep-sea documentary footage, steady camera.* |
| Negative | Shared list, plus: vehicle flying away, structure changing shape, seabed invented in detail |
| Resolution and duration | 1080p, 16:9, 5 s |
| Method | Start frame plus end frame, FLUX 3 Video. If available, generate G4 and G5 as one 10 s clip with three keyframes |
| Integration | 60 frames over p 0.885 to 1.00. The last frame is the one that sinks behind chapter 02 |
| Portrait pass | No |
| Credits | Not verified |

## 3. Optional, not needed for the hero

| ID | What | Why wait |
|---|---|---|
| G6 | Launch: the cage going through the surface, from the deck photograph | High risk of invented hardware. Only with real launch footage as reference |
| G7 | A night regrade of the vessel as a still (image edit, not video) | Real night photography from Oceânica is better |

## 4. Run order and acceptance

1. Rights confirmed by Oceânica for the five source images.
2. Top up credits. Request a quote per shot. Share the total before running.
3. Run **G3 first** as the test: smallest, cleanest source, easiest to judge. If the vehicle's geometry holds, continue.
4. G1, then G2, then the upscale, then G4 and G5.
5. For each clip: two takes maximum. Check frame by frame at the start, middle and end against the source photograph.

Reject a take if any of these is true:

- lettering on the hull or the vehicle changed or became unreadable;
- a structural element appeared, disappeared or bent;
- the colour of the hull, the buoyancy block or the frame shifted;
- the camera move is not monotonic (it must scrub forward and backward cleanly);
- anything resembling text or an interface appears.

## 5. Integration into the site

- Each accepted clip becomes a WebP frame sequence: 1920 px wide for desktop, a separate 900 px wide 9:16 set for portrait where a portrait pass exists.
- The player gains one texture per shot that is updated from the sequence instead of a single still. Camera keyframes for that shot are set to 1.0 (the move is now in the footage).
- Loading follows the HUMAN engine fixes listed in `TECHNICAL-PLAN.md`: poster frame first, batched decode, a window of decoded frames, a failed frame never counted as loaded.
- Target total for the five sequences: under 18 MB on desktop, under 7 MB on portrait, loaded shot by shot behind the scroll.
- The stills stay in the repository as posters, as the lite tier and as the reduced-motion fallback.

## 6. The better alternative

Every shot above is a substitute for footage Oceânica almost certainly owns: the drone flight that produced the June 2024 stills, and ROV camera recordings from real dives. One afternoon of their archive would replace this whole plan with material that is real, cleared and better.
