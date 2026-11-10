# ZRK · raw observations

Source: https://www.zrk.technology · observed 2026-11-10 · observation only (L4, no writes, no assets or code copied).
Method: built-in browser at 1024×768 and 375×812, reading the rendered DOM, computed styles and media element state while scrolling. Numbers below are measurements, not copies of source.

Tags: `[obs]` seen in the rendered page · `[inf]` inference.

## Platform
- `[obs]` Webflow (`meta generator`), jQuery, GSAP + ScrollTrigger + Observer, Lenis smooth scroll.
- `[obs]` Two `<canvas class="canvas">` elements with WebGL2 contexts, default 300×150 backing size at the time of reading.
- `[inf]` The canvases are small decorative layers (noise, grain or the header meter), not the main 3D. The main "3D" is pre-rendered video.
- `[obs]` Fonts: "Inter Display" (display and body), "Geist Mono" (technical labels).
- `[obs]` 133 `<img>`, 132 of them `loading="lazy"`; formats webp, svg, png.

## Page length (1024×768)
Document height 30 413 px = 39.6 viewports.

| # | Wrapper class | Height px | Viewports | Sticky child | What happens |
|---|---|---|---|---|---|
| 1 | section-hero-h | 8448 | 11.0 | section-hero-st | Product reveal, video scrubbed by scroll, 5 spec counters |
| 2 | line-text | 2150 | 2.8 | line-text-wrap | One sentence revealed line by line over full-bleed FPV footage |
| 3 | number-sec-wrap | 1920 | 2.5 | number-sec | One huge number (2 000), label swaps Ukraine / Middle East, 01/02 |
| 4 | info-v-wrap-h | 3456 | 4.5 | info-v-wrap | Same object, macro framing, 5 feature callouts A to E in one fixed card slot |
| 5 | card-h | 6528 | 8.5 | card-st | 5 history cards 01 to 05, duotone image right, text left |
| 6 | stat-wrap | 1536 | 2.0 | stat-section | Cost comparison bars, single orange object |
| 7 | new-sec | 3456 | 4.5 | new-sec-st | Statement + two big numbers (948, 12K) |
| 8 | hover-area-wrapper | 2227 | 2.9 | hover-area | System scene (dark photo), 6 columns A to F highlight on hover |
| 9 | ppo-wrap | 2227 | 2.9 | ppo | Closing statement, footer |

- `[obs]` Sections overlap: wrapper 3 starts at 9830 px, before wrapper 2 ends (10 598 px). Chapters cross-dissolve inside shared scroll distance.
- `[obs]` Every chapter is a tall wrapper with exactly one `position: sticky` stage. 9 sticky stages, 7 fixed elements.

## Hero video
- `[obs]` `SCROLL-1.mp4`, 1280×720, 20 s, `preload="auto"`, not autoplaying. `currentTime` follows scroll: 1.21 s at 1500 px, 3.68 s at 3500 px, 7.95 s at 7600 px (about 1 s per viewport after an initial hold).
- `[obs]` A separate `SCROLL_2_MOBILE.mp4` (540×720, 8 s) and a 390×900 mobile video exist. Mobile gets its own portrait renders.
- `[obs]` A looping autoplay footage video (1280×720, 12.4 s) sits behind chapter 2.
- `[inf]` The scrub is `video.currentTime = f(scroll)` driven by ScrollTrigger with smoothing. Works because the video is short, low resolution and (very likely) encoded with dense keyframes.

## Hero choreography (desktop)
| Scroll px | Frame |
|---|---|
| 0 | Near-black frame. Mono telemetry block top-left. Headline bottom-left, 3 lines. Nothing else. |
| 1500 | Object appears as a tiny light point, centre-left. No copy. |
| 3500 | Object flies toward camera from the left. Centre: counter "14 mins" inside a thin reticle circle with one orange vertical tick. |
| 5500 | Object fills a third of the frame. "Flight time" left, "002" right, counter "20" centre, orange arc. |
| 7600 | Extreme macro, the object crosses the full frame diagonally. Counter becomes an odometer strip (5900 / 6000 / 6100). |

- `[obs]` Counter is always dead centre. Label is always left edge, index always right edge. The object moves, the UI does not.
- `[obs]` Header carries a segmented meter that fills in orange with scroll progress. It is the only persistent progress indicator.

## Type (measured at 1024 px wide)
All sizes scale with viewport width. Converted to a 1440 px design:

| Role | 1024 px | vw | At 1440 | Tracking | Line height |
|---|---|---|---|---|---|
| Display number | 142.2 px | 13.9 | 200 px | -0.05em | 0.74 |
| H1 / statement | 51.2 px | 5.0 | 72 px | -0.05em | 0.88 to 0.95 |
| H2 | 34.1 px | 3.33 | 48 px | -0.04em | 0.90 |
| Lead / label | 22.75 px | 2.22 | 32 px | -0.03em | 0.90 |
| Small | 9.96 px | 0.97 | 14 px | -0.01em | 1.3 |
| Mono technical | 7.11 px | 0.69 | 10 px | 0, uppercase | 1.0 to 1.3 |
| Mono micro | 5.69 px | 0.56 | 8 px | 0, uppercase | 1.0 |

- `[obs]` Only two weights (400, 500). No bold anywhere.
- `[obs]` Ratio display : mono is 20 : 1. Nothing sits in between 14 px and 32 px.

## Color
| Token | Value | Use |
|---|---|---|
| Background | #050505 | Everything |
| Text | #DDDDDD | Headlines, numbers |
| Line | #333333 | Hairlines, frames |
| Accent | #FC4F00 | One element per screen: tick, arc, active meter, one number, duotone |
| Text alphas | 40 / 20 / 10 / 4 % of #DDD | Inactive labels, ghost numbers, grid |

## Mobile (375×812)
- `[obs]` Document 31 668 px, hero 8932 px (still 11 viewports). Same structure, not shortened.
- `[obs]` Nav links removed, header keeps logo + meter + one CTA. H1 40 px. Telemetry block grows to fill the top third.
- `[obs]` Object framing is recomposed for portrait (object enters from the left edge, counter stays centred).
- `[obs]` A crosshair read-out "X: 0 / Y: 0" sits in the bottom corners on both sizes.

## Not tested
- Real device performance, Safari video scrub behaviour, reduced-motion behaviour.
- Load waterfall and total transfer weight (cross-origin resources reported 0 bytes to the timing API).
- Whether the WebGL canvases do more at larger viewport sizes.
- Hover states in chapter 8 beyond what the DOM text implies.
