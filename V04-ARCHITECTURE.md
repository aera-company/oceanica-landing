# V04 · Information and interaction architecture

Routes `/pt` (default) and `/en`; `/` redirects by browser language. One page, nine chapters. Every chapter has one focal visual and one interaction.

| # | id | Chapter (EN / PT) | Purpose | Focal visual | Key interaction | Content role | Dark theme | Light theme |
|---|---|---|---|---|---|---|---|---|
| 01 | `top` | Hero / Hero | Claim and emotion: human, machine, depth | Five-shot film: vessel, **diver**, Lynx, Work Class | Scroll is the camera; waterline cuts the diver and the statement; depth read-out reaches 3000 | Headline, lede, four statements | film | film |
| 02 | `company` | The company / A empresa | Who Oceânica is, in published numbers | Type | Reveal on entry | Tagline, 4 figures, 4 milestones | dark water | mineral |
| 03 | `people` | People / Pessoas | The human dimension, the first daylight | The diver, tight on the helmet | Picture drifts against scroll; numbers rise | Divers, diving systems, training centre, Diver of the Future | **paper** | warm paper |
| 04 | `rov` | The machine / A máquina | Technology as a hero object | Work Class ROV on its launch system, cut out | Pinned scene: the vehicle lowers into light while five parts are named in turn | Parts, hull markings, fleet figures | dark stage | dark stage |
| 05 | `system` | The system / O sistema | The whole of what Oceânica does, in one place | Oceânica's own field render, looping | 14 hotspots, filter by line, fly-to, guided tour, keyboard | 14 services in two sentences each | **light map** | light map |
| 06 | `services` | Services / Serviços | Depth on the three business lines | One real picture per line | Reveals; links to the official pages | What / challenge / proof, figures, scope | navy | warm paper |
| 07 | `assets` | Assets / Ativos | The fleet and vehicles, one at a time | Full-screen photograph | Filter, index, arrows, keys, swipe, wipe transition | Specs as published | black stage | navy stage |
| 08 | `institutional` | Institutional / Institucional | Routes a real visitor needs | Type, one training picture | Links out | ESG, Investors, Careers | **paper** | mineral |
| 09 | `contact` | Contact / Contato | Close and convert | The vessel heading out | Primary e-mail action, commercial contacts | Contacts, address, footer | dark sea | dark sea |

## Navigation

Header: Services · Assets · ESG · Investors · Careers, then PT/EN, light/dark, Contact. The header takes the tone of the section under it. Mobile: full-sheet menu with the same items and controls.

## Language

- All copy, labels, alt text, metadata and accessibility strings exist in both dictionaries (`src/lib/copy/pt.ts`, `en.ts`); the PT text is written, not translated.
- Hull markings, model names and service names in English that the industry uses in Portuguese (pull-in, UWILD, Work Class, shore approach) stay in English in PT.
- Switching language keeps the chapter and the position inside it.

## Accessibility and fallbacks

- Map: every pin is a button with its service name; the filter is a group of toggle buttons; the card is a live region; arrow keys move the tour; Escape closes.
- ROV: the five parts are an ordered list in the DOM; the pinned scene is presentation on top of it.
- Reduced motion: film becomes one still and plain statements; ROV shows all parts at once; the map shows the poster frame and no flight.

## Implemented in V04 (branch `v04`)

| Area | Files |
|---|---|
| Diver in the film, new opening, new headline and statements | `src/lib/film.ts`, `src/components/film/{shader.ts,Film.tsx,Hero.tsx}`, `src/lib/copy/{pt,en}.ts` |
| People chapter | `src/components/sections/People.tsx` |
| Machine chapter (pinned ROV) | `src/components/sections/Machine.tsx` |
| System map | `src/components/sections/System.tsx`, pins in `src/lib/site.ts` |
| Rhythm of light | roles `s-paper`, `s-object`, `s-map`, `s-cap` in `src/app/globals.css` |
| Media | `scripts/prepare-v04-media.py`, `scripts/subject-mask.swift`, originals in `media-src/` |

## Verified

- `npm run lint`, `npm run build`, typecheck: pass.
- Screenshots looked at: the hero film in eight positions, People, Machine (three scroll positions), System (rest, pin 13, Contingency filter with tour, pin 7), Services, Assets and Institutional, in the dark theme (PT) and the light theme (EN) on desktop; hero, diver, People, Machine, System and Services on a phone (dark theme, PT; diver and map also EN).
- Map: arrow keys walk the tour, Escape returns to the whole field, the filter dims the other pins, the video plays on screen and pauses off screen.
- Frame rate, headless Chrome with GPU on an Apple M1: 60 fps at every checkpoint and in a continuous scroll of the whole page at 1440 × 900 DPR 2, no frame over 25 ms. Phone emulation at 4× CPU throttle: 60 fps continuous scroll, no frame over 25 ms (two runs).
- A horizontal overflow on phones (filter chips widening the layout to 554 px) was found and fixed.

## Not verified

- Safari, Firefox, real phones. Video autoplay policies differ on iOS Low Power Mode; the poster frame is the fallback.
- Reduced motion with the system setting (only the code path).
- Mobile in the light theme for the new chapters.
- AI media: not generated. Both accounts have no usable credits (Magnific 0, Higgsfield 0.5).
