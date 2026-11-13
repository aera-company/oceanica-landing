# Oceânica V05 · hero creative reset

This is a separate exploration on branch `v05-creative`. The live landing (`main`, oceanica-landing.vercel.app) and sections 02 to 09 were not touched. Nothing here is implemented in the site.

**Open `index.html` in this folder for the visual comparison (Portuguese).**

## What is in this folder

| Deliverable | File |
|---|---|
| 1. ZRK cinematic analysis | [`../research/ZRK-CINEMATIC-ANALYSIS.md`](../research/ZRK-CINEMATIC-ANALYSIS.md) |
| 2. Brand and visual asset audit | [`OCEANICA-AUDIT.md`](OCEANICA-AUDIT.md) |
| 3. Three hero concepts | `concept-a/`, `concept-b/`, `concept-c/`, each with `CONCEPT.md`, `index.html` (source of the frames) and `frames/` |
| 4. Visual frames | Three desktop frames (1440 × 900) and one mobile frame (390 × 844) per concept |
| 5. Motion storyboard | Section 3 of each `CONCEPT.md` |
| 6. Headlines | Section 1 of each `CONCEPT.md`: six per concept, PT and EN |
| 7. Parallax and motion treatment | Sections 2 and 3 of each `CONCEPT.md` |
| 8. Media production plan | [`MEDIA-PRODUCTION-PLAN.md`](MEDIA-PRODUCTION-PLAN.md) |
| 9. Technical feasibility | Section 6 of each `CONCEPT.md` |
| 10. Recommendation | Below |
| 11. Section 02 direction | [`SECTION-02-DIRECTION.md`](SECTION-02-DIRECTION.md) |
| 12. Oceânica Universe direction | [`OCEANICA-UNIVERSE-DIRECTION.md`](OCEANICA-UNIVERSE-DIRECTION.md) |

Re-render the frames with `creative/v05/render.sh a|b|c [1 2 3 m]` (headless Chrome, uses `scripts/cdp.mjs`).

## What is real, what is not

- **Real:** every photograph in the frames (Oceânica's own pictures from its public site, not yet cleared for publication) and every fact in the copy (checked against oceanica.com.br).
- **Drawn by hand:** the water below the line in concept B and the whole field in concept C. Each frame carries a label saying so.
- **Not done:** no image or video was generated, no credits were spent, and nothing moves yet. The frames are static compositions, not prototypes.
- **Stock:** the diver photograph is stock and is not used in any frame.

## Quality gate: the critical review before delivery

The first drafts were revised before delivery:
1. Concept A's mid-scroll line claimed that *every* unit on the horizon depends on Oceânica. That is an exaggeration, so it was replaced by *"No horizonte, a produção. No convés, quem a mantém."*
2. Concept A's exit headline covered the vessel; it was moved onto open water.
3. Concept B's headline covered the vessel; the plate was reframed so the stern sits to the right of the type.
4. Concept C's headline overlapped the platform; the sky was enlarged and the vessels redrawn with real superstructure levels.

How the three compare, honestly:

| | A · A escala | B · Acima e abaixo | C · O sistema |
|---|---|---|---|
| Size of Oceânica in the first seconds | **Yes** | Range more than size | Breadth more than size |
| Feels like a major engineering company | Yes | Once the vehicles appear | Yes |
| Genuinely remarkable | Frame 1, yes; frame 3 depends on a weaker photograph | The split headline, yes | The idea, yes; the drawing must be redone by an illustrator |
| Memorable headline | Good | **Best** | Very good, explains the company |
| Depends on stock | No | No | No |
| Meaningful parallax | **Yes**: real depth planes | Yes: water depths | Moderate: conceptual layers |
| Credibly buildable now | **Yes**, lowest risk | Yes | Yes |
| Would stand out globally | With original-resolution media or a drone take | With real over/under footage | With a top-level illustrator |

The three are not variations of one layout:
- **A** is photographic and travels forward.
- **B** is split, photographic above and drawn below, and travels down.
- **C** is graphic and travels sideways and in.

They differ in light (dawn, the waterline, paper), in camera move and in emotion.

## Recommendation

**Concept A for the hero, concept C as the foundation of the Oceânica Universe (section 05).**

- **Why A.** It is the only concept in which a visitor understands, before scrolling, that this is a major offshore operation: an Oceânica deck, its Work Class ROV, and the production unit it serves, in one real photograph. It moves the protagonist from the machine (today's live hero) to the operation, which is what the brief asks for. It is also the lowest-risk build.
- **Why C for the Universe.** C is the most original idea and exactly what an explorable system needs. Used in the hero, it would make the hero and section 05 say the same thing twice.
- **B's split headline** is the strongest single device. It can live once, at the passage into the subsea chapters, without becoming the hero.

**What would raise A from very good to exceptional:**
1. The original file of the dawn photograph.
2. A dawn drone take from the stern toward the FPSO.

Both are requests to Oceânica, not to an AI tool.

## Next step

Choose a direction. Only then does implementation start, on this branch, hero only.

## Implementation (2026-11-13)

Concept A was chosen and is built as the site's hero on this branch (`src/components/hero/HeroScale.tsx`, the V05 block at the end of `src/app/globals.css`, media from `scripts/prepare-v05-hero.py`). Sections 02 to 09 are unchanged.

Differences from the study:
- **The three verified numbers are not in the hero.** Section 02 shows the same figures immediately after, so the hero keeps only the horizon statement until section 02 is redesigned.
- **Three photographic planes, not four.** The FPSO is not cut from the horizon: separating it would have needed a generated fill. Sky, sea with horizon, and deck move at their own rates around the FPSO.
- **The arrival photograph is also used by the prevention card in Services.** To be resolved when that section is reworked.

Measured locally:
- 60 fps on desktop at 1440 × 900.
- 60 fps on phone emulation at 4× CPU throttle, with one frame over 25 ms.
- Lint, types and build pass.

Not tested on Safari or on real phones.
