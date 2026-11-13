# Oceânica Universe · future section 05 (direction only, no code)

The second major workstream, after the hero is approved. The goal is an interactive offshore world in which a visitor can explore what Oceânica does, at the level of clarity of emons.de and with Oceânica's own visual system.

## What it replaces

The current section 05 reuses the image from the official "quem somos" page (Oceânica's 3D field render, `public/media/system.webp`). Per the brief, that image stays a reference: it is not the final asset and must not be repeated anywhere as decoration. Its value is the inventory it contains: platform, FPSO, vessels, ROVs, pipelines and seabed. That inventory is the starting list for the Universe.

## What we take from Emons (principles, not form)

Observed on emons.de/en on 2026-11-12, in headless captures at 1440 × 900, scroll 0 to 7000 px:
1. The hero is one rendered isometric world: a white and grey low-poly logistics site where only the company's own assets (trucks, warehouse) carry the brand colour.
2. Round "+" hotspots sit on objects in the scene.
3. A numbered mode bar (01 to 05: road, sea, air, rail, …) changes what the world shows.
4. The scale figures (founded 1928, 3,900 people, 120+ locations, 370,000 m²) sit over a rendered globe. The numbers are attached to a physical image, not to boxes.
5. Services are shown later as single 3D objects on neutral cards.

The principles that transfer:
- a neutral world where **only the client's own assets carry colour**;
- hotspots on the objects themselves;
- modes that re-light the same world;
- numbers placed on a physical image.

Concept C already applies the first three: a paper world, green only on the active point and on Oceânica hardware, and a modes bar.

What we do **not** take:
- the isometric 3D render style;
- the red;
- the toy-town proportions;
- the layout.

Oceânica's version is an engineering **section**: a side view with true depth, which isometric logistics never needs.

## The concept

**A single drawn offshore field, the same sheet as hero concept C, that the visitor can enter.**

- **One world, three layers.**
  - Surface: vessels, platform, production unit.
  - Water column: divers, observation ROVs, risers.
  - Seabed: Work Class, manifolds, pipelines.

  Scrolling inside the section descends through the layers. Dragging or swiping moves sideways along the field.
- **Three modes**, which are Oceânica's real service pillars: **Prevenção · Contingenciamento · Engenharia**. A mode lights the assets and operations that belong to it and dims the rest (shown in concept C, frame 3).
- **Points open real stories.** Each numbered point opens a panel with:
  - one real photograph or video;
  - two lines of plain text;
  - one verified figure;
  - the vessel or vehicle involved, linked to the Assets section.

  The 13 operation descriptions already written for the V04 system map (shallow pipeline inspection, IMR from SDSVs, UWILD for FPSOs, Work Class to 3,000 m, …) are reused as the text.
- **Human and robotic activity together.** Divers and ROV pilots appear as people on deck and in the water, never as icons.
- **Zoom into operations.** Clicking a point moves the camera there, as in concept C, frame 2, and the drawing resolves into the photograph.

## Relationship to the hero

| If the hero is | The Universe |
|---|---|
| **A · A escala** | Starts from the overhead sea of the hero's exit: the camera rises until the photograph becomes the drawn field. "Now you have seen one operation; here is the whole system." |
| **B · Acima e abaixo** | Reuses the waterline as its main horizontal divider and the descent as its navigation. |
| **C · O sistema** | Is the hero's own world, expanded. In that case section 05 must add depth (stories, video, modes) rather than repeat the hero; otherwise the page says the same thing twice. |

## Build options (decide after the hero)

| Option | Look | Effort | Risk |
|---|---|---|---|
| SVG section drawing with a camera (concept C's system) | Engineering atlas | Medium | Low; accessible by default |
| Real-time 3D (three.js) of a low-poly field with the same line style (outline shader) | Spatial, orbitable | High | Performance on phones; needs vessel models |
| Pre-rendered 3D with scroll-driven frames and hotspots on top | Cinematic | High, needs a 3D artist | Fixed camera paths only |

The recommendation is to start with SVG (it shares the hero C drawing system) and move to 3D only if the client wants to orbit the field.

## Content to request
- Which operations Oceânica most wants to show, and which client assets may be depicted.
- The vessel general arrangements, to draw true silhouettes.
- One real photograph or clip per point.
