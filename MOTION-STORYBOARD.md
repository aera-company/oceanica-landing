# Motion storyboard

Concept: **depth**. Scroll means going down. The camera never cuts, never rises, never pans. One vertical move from the surface to the seabed carries the whole page.

Status key: **built** (in the proof of concept) · **planned** (designed, not built).

## The one idea

**The waterline crosses everything.**

The first frame is a split shot: sky and sea above a line, the inside of the water below it. Scroll raises that line through the picture and through the headline. The dry half of each letter stays crisp; the wet half is displaced, dimmed and softened, as it would be seen through water. When the line leaves the top of the screen, the visitor is under, and the page stays under until the last chapter.

Every other motion on the page is a consequence of that descent: light falls off, pressure climbs, particles drift up past the lens because the camera is sinking.

## Rules of motion

1. **The interface holds still, the sea moves.** Headline, statements, gauge and read-outs keep fixed positions. Only the water travels.
2. **Scroll is the clock.** Nothing in the descent plays on a timer. Stop scrolling and the camera hangs in the water; only the slow idle of swell and particles continues.
3. **Mass.** The picture follows scroll through a short lag (about 0.1 per frame), so the water never snaps. The HTML cut of the headline reads the same eased value and the same swell as the picture, so the cut bobs with the water and type and image cannot drift apart.
3b. **Energy follows the hand.** Bubbles at the crossing and streaking of particles are driven by how fast the visitor scrolls. Stop, and the water goes still.
4. **Light is the transition.** Chapters do not slide or fade in. They are found by light: daylight above, nothing in the middle, a work light at the bottom.
5. **Transforms and opacity only.** No animated masks, clip-paths, blend modes or filters on moving layers.
6. **No scroll-jacking.** Native scroll, Lenis smoothing on wheel only, touch untouched. The visitor can leave any scene at any speed.

## Hero · 00 to 3000 m (built)

Wrapper 440 vh on desktop (3.4 viewports of travel), 380 vh on portrait. One sticky stage. `p` is progress through the wrapper, 0 to 1.

| p | Depth | Picture | Type and instruments |
|---|---|---|---|
| 0.00 | 0000 m | Split shot at rest. First light: the sun sits on the horizon to the right, clouds catch it, the swell reflects the sky by angle (Fresnel). Waterline at two thirds of the height, breathing. Below it, green-blue water with light shafts fanning out from the sun. | Headline "Engineering the depth." bottom-left. The line cuts through the second word. Lede under water. Gauge reads 0000 m, Surface. Pressure 001 bar, surface light 100 %. Cue: "Scroll to descend". |
| 0.02 to 0.20 | 0000 m | The line rises through the frame. Sky and horizon are swallowed. Air is carried under: bubbles and a short bloom below the line, only while it is moving. Underside of the surface ripples overhead. | The headline goes under, line by line, from crisp to refracted. It fades between 0.12 and 0.20. |
| 0.12 to 0.30 | 0 to 200 m | Descent starts. Particles begin to travel upward at four parallax speeds and stretch into streaks in proportion to scroll speed. Shafts thin out. Color drains from green-blue to navy. | Gauge tape starts to run. Zone label changes to "Sunlight zone". |
| 0.27 to 0.42 | 200 m | Almost no light. Only particles close to the lens are visible. | Statement 1: "Sunlight ends here." Mark "0200 m". Light read-out drops under 1 %. Zone: "Twilight zone". |
| 0.50 to 0.66 | 1000 m | Black water. The frame is nearly empty by design. | Statement 2: "No daylight has ever reached this water." Mark "1000 m". Pressure passes 100 bar. Zone: "Midnight zone". |
| 0.70 to 0.86 | 2200 to 3000 m | A work light comes on from outside the frame, lower right. Two volumetric beams and a halo cross the water. Particles inside the beams flare white. | Gauge slows and stops at 3000 m. |
| 0.76 to 1.00 | 3000 m | Light holds. The pointer moves the beam a few degrees. | Statement 3: "Down here, the only light is the one we bring." It stays until the stage releases. |

Curves: waterline is a smoothstep over 0.015 to 0.20. Depth is `3000 × ((p − 0.115) / 0.685)^2.2`, slow near the surface where there is something to see, fast through the dark, settling at the bottom. Light is a smoothstep over 0.70 to 0.86.

## First transition · hero into "Below the surface" (built)

The stage releases and chapter 02 scrolls up in normal flow. Nothing cuts:

- The water column is a fixed layer behind the whole page. It keeps running under chapter 02.
- The work light stays on and dims to 45 % as the chapter arrives. The page now lives at depth, lit by the operation.
- Particles keep travelling with scroll, slower, so the reader still feels the descent while reading.
- Chapter 02 has no background of its own. Its type sits directly on the water.
- Real photography enters here for the first time. Each image starts dark and is uncovered by a band of light that crosses it once, left to right, as it enters the viewport. This is the "inspection light reveals the structure" beat, done with a real Oceânica photograph, not a synthesised asset.

## Later chapters (planned)

| Chapter | Depth cue | Motion idea | Carrier |
|---|---|---|---|
| 03 Prevention | Work depth | The camera approaches a real ROV. Far to macro, one move. Callouts appear in one fixed slot. | Frame sequence from official footage or a CAD render. Not generated. |
| 04 Contingency | Same depth, lights change | The beam narrows and brightens. Type gets shorter and faster. A response timeline draws once. | Shader light state + HTML. |
| 05 Engineering | Seabed | Light sweeps a drawing: plan lines of a tool or structure resolve from the dark. | SVG line work over the water. |
| 06 Oceânica system | Full column | The camera pulls back for the only time: the whole column in section, vessel on top, tether, ROV, divers, pipeline on the seabed. Hover or tap lights one relationship at a time. | SVG section drawing, HTML labels. |
| 07 Assets and scale | Seabed | Verified numbers at display size, one per screen, on black. | HTML. |
| 08 Innovation | Seabed | Same macro language as 03, applied to tooling. | Stills with light reveal. |
| 09 ESG and safety | Rising | The read-outs return as safety and environmental indicators. Light turns from work light back to daylight. | Shader state + HTML. |
| 10 Closing | Surface | The camera breaks the surface again. Same split shot as the first frame, later in the day. | Shader. |

The page ends where it began, at the waterline. One descent, one return.

## Portrait composition (built for the hero)

- Headline at 17 vw, two lines, same cut by the waterline.
- The gauge leaves the right edge and becomes a bottom instrument bar: depth left, zone right, a one-pixel progress line.
- Nav collapses to logo and contact. Scroll cue removed, the bar does that job.
- Statements move up to 24 % of the height and run full width.
- Shader renders at 0.6 scale, pixel ratio capped at 1.5, 30 fps.

## Reduced motion (built)

- No pinning, no smooth scroll, no shader loop.
- The hero is one still frame of the split shot with the headline cut by the line.
- The three statements follow as ordinary reading content, in order, with their depth marks.
- Every fact and every route stays reachable.
