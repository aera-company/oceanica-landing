# V03 · Premium experience

Branch `v03` · 2026-11-10. V02 is what is live at oceanica-landing.vercel.app (branch `main`); V01 is at tag `v01`.
This document adds to `V02-DIRECTION.md`. Facts and sources stay in `research/`.

## 1. Audit of V02 (live page and source)

| Area | What worked | What was missing or weak |
|---|---|---|
| Hero film | Five shots on real photographs, 60 fps, waterline cut, tiers and fallbacks | Shots 04 and 05 visibly soft. Up to 3 s of black before the first frame on a cold load |
| Page after the film | One chapter with figures and three service lines | No services content, no fleet, no ESG, investors, careers or contact. The page ended in a one-line footer |
| Colour | Coherent dark palette | Black from top to bottom, no rhythm, no light theme |
| Language | English only | No Portuguese, `lang="en"` on a Brazilian company, no hreflang |
| Navigation | Header with anchors | Four of five anchors pointed to sections that did not exist. No mobile menu |
| Motion | Scroll-synced film | A light band swept across the one photograph below the film: decorative, removed |

## 2. Intervention image (P0)

**Source.** `HEADER-ROV-1.jpg`, banner of the ROV page on oceanica.com.br. 1900 × 811, 221 KB. No larger rendition exists on the CDN (`-scaled`, unnumbered and `-2` variants return 404).

**Diagnosis.** All four suspected causes were present, in this order of weight:

1. **Low-resolution source.** The file is an upscaled standard-definition video grab. It is interlaced (comb teeth on every diagonal) and its colour is sampled far coarser than its brightness (colour bleeding around yellow and blue parts).
2. **Scaling.** The V02 camera went to zoom 2.3 on a frame that already needs 2.2× to cover a 16:10 screen: about 5× magnification on a 2880 px canvas.
3. **Compression.** JPEG blocking in the dark water.
4. **Grade.** The grab's violet-black water did not match the teal of the rest of the film.

**Treatment (deterministic, nothing generated).** `scripts/enhance-workclass.py` reads the untouched original (`public/oceanica/rov-work-class.jpg`) and writes `public/film/s4-workclass.jpg` at 3800 × 1622:

- blur of the colour channels only, removing the bleeding;
- vertical 1-2-1 blend on brightness, removing the interlace comb;
- 2× Lanczos resample, two-radius unsharp mask, gentle tone curve.

In the player (`shader.ts`, picture kind 3): edge-contrast recovery, violet shadows moved to deep teal while yellow and steel keep their colour, held lamp highlights, drifting backscatter that thickens away from the lamp, fine sensor grain. In the edit (`film.ts`): maximum zoom reduced from 2.3 to 1.62, and the final pull-back now leaves the vehicle on the left and open water on the right, where the statement sits.

**Honest limit.** This raises perceived quality; it cannot add detail the source never had. The real fix is a still from the ROV camera feed or the original footage from Oceânica.

**If an AI upscale is approved** (not run, no credits spent). Tool: Higgsfield `upscale_image`, or any restoration upscaler, on the *original* file, 2×, lowest creativity setting.

> Prompt: Faithful restoration of an underwater video frame. Work Class ROV with yellow buoyancy blocks and a grey manipulator arm working on a yellow subsea structure, lit by its own lamps in dark deep water. Remove interlacing, colour bleeding and compression blocks. Recover edge definition on the existing metal frame, hoses and cables. Keep every component exactly where it is, same count, same shape, same colours.
>
> Negative: new parts, extra cables, extra lamps, changed geometry, invented text or logos, smooth plastic surfaces, HDR glow, added fish or particles, changed framing.

Acceptance check: overlay the result on the original at 50 % and reject it if any tube, hose or bracket moved, appeared or disappeared.

## 3. What V03 adds

**Theme system.** Sections declare a role (`s-film`, `s-deep`, `s-paper`, `s-stage`, `s-inst`, `s-close`); each theme decides what the role looks like. Components use semantic tokens only. The choice follows the system, is stored when the visitor picks one, and is applied by an inline script before first paint (`?theme=light|dark` forces one). The film and the closing stay cinematic in both themes.

| | Film | Company | Services | Assets | Institutional | Closing |
|---|---|---|---|---|---|---|
| Dark | photographs | film sinking into dark water | **mineral paper** | black stage | navy | dark sea |
| Light | photographs | cool mineral | warm white | navy stage | cool mineral | dark sea |

Transitions carry the narrative: light spills down through the water before the paper edge arrives; the paper cools and darkens before the stage. The header reads the section beneath it and takes that tone; the logo is green on paper and mineral on water.

**Languages.** `/pt` (default) and `/en`, statically generated. `/` redirects by `Accept-Language`. Full copy in both, written separately rather than translated line by line; metadata, Open Graph, canonical and hreflang per locale; `lang` on the document. Switching language keeps the section and the relative position in it.

**Chapters.**

- **02 Company**: official tagline, four published figures, four milestones.
- **03 Services**: Prevention, Contingency, Engineering. Each answers what Oceânica does, the challenge, the proof, with three published numbers, a scope list and a link to the official page. Pictures: support vessel alongside an FPSO, the cutting tool in the workshop, Oceânica's own field cross-section.
- **04 Assets**: a full-screen stage, one asset at a time. Four vessels, the Work Class ROV fleet, the Seaeye Lynx. Category filter, index strip, arrows, keyboard, swipe. Wipe between pictures, macro detail window, specifications exactly as published.
- **05 Institutional**: ESG, Investors, Careers, each with genuine links.
- **06 Contact and footer**: e-mail, phones, head office, commercial contacts, supplier portal, whistleblowing channel, privacy policy, social.

**Finishing.** Mobile menu, focus states, skip link, poster frame behind the player (no black on load), player pauses once an opaque section covers it, 1100 px picture variants for small screens.

## 4. Verified

- `npm run lint` and `npm run build`: pass. Typecheck: pass.
- Headless Chrome with GPU on an Apple M1, 1440 × 900 at DPR 2: 60 fps at every checkpoint and in a continuous scroll of the whole page, no frame over 25 ms.
- Phone emulation at 4× CPU throttle: 60 fps; worst frame in a continuous scroll 33 to 50 ms (was 800 ms before the small picture variants).
- Looked at, in screenshots: every section in both themes on desktop; mobile in the light theme; English in the light theme; all six stage selections that were opened (VI, VII, XI, Work Class, Lynx); mobile menu; static tier.
- Theme toggle, stored preference, language switch and position restore: exercised in the browser.
- All 23 external links answer 200, except LinkedIn, which refuses automated requests (403).
- Page length: about 19 viewports on desktop.

## 5. Not verified, and what remains

1. **Safari, Firefox and real phones** were not tested. Only Chrome, headless and in the app's browser.
2. **Reduced motion** was checked through the static tier (`?tier=static`), not with the system setting itself.
3. **Mobile in the dark theme and OCEANICASUB X on the stage** were not looked at.
4. **Rights.** Every photograph comes from the public site and none is cleared. The page stays `noindex` unless `NEXT_PUBLIC_INDEXABLE=1` is set at build time.
5. **The Work Class frame** still needs a real source (section 2).
6. **Unnamed pictures.** The site does not say which vessel is in the FPSO, deck and closing photographs, so the captions do not name them.
7. **Moving pictures.** The film is still stills with a camera. Footage from Oceânica, or the approved Higgsfield plan, is the next step up.
8. **Contact** is a mailto and links to the official forms. A form on this page needs a backend and a privacy decision.
9. **Typefaces and logo** are stand-ins: open-source fonts and a 211 px PNG. A brand guide and an SVG would replace both.
10. **Detail windows** on the stage use hand-picked focus points; they should be reviewed picture by picture.
