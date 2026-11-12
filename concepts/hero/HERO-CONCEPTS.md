# Hero · three concepts for art direction

Phase 01 of the creative reset. Hero only. Nothing here is implemented in the site; the frames in `renders/` are static compositions built with the real assets to judge direction, not finished pictures. No credits were spent.

## What the ZRK study says about a hero (observed again 2026-11-12)

1. **The first frame is almost empty.** Near-black, a modest headline at bottom left, a few lines of mono text. The object has not arrived yet. Patience is the luxury.
2. **One object, one camera move.** The object grows from a point of light to a macro wider than the screen. No cuts between unrelated pictures.
3. **The number is the second voice.** A single number at display size, centred, rolling or replacing itself, with the object passing in front of or behind it.
4. **The interface does not move.** Headline, index and labels stay put; all motion belongs to the object and the light.
5. **Light is the reveal.** A single rim light; everything else is shadow.

**Why the V04 hero fails against this:** five different photographs, four statements, a depth counter, a rail and a waterline effect, all inside one hero. It is busy rather than cinematic, and the headline describes instead of provoking. Each concept below keeps **one subject, one move, one number or one line**.

What HUMAN (`new-3d-landbase`) brings: the scroll pattern (tall wrapper, sticky stage, rAF progress), Lenis settings, and a frame-sequence engine that can play pre-rendered footage once its loading gaps are fixed. Nothing else from it applies to these concepts.

---

## Concept 1 · Respire fundo / Breathe deep

**Subject:** the diver. **Mood:** intimate, physical, warm air against cold water.

1. **Headline.** PT: *Respire fundo.* EN: *Breathe deep.* The phrase is the last thing said before a dive, and in both languages "fundo / deep" is also where the diver is going.
2. **Concept.** The hero is one breath. It starts so close to the helmet that the visitor is almost inside it, pulls back to a person at the water's edge, and then the sea closes over the faceplate. The human comes first; the machines are announced at the exit.
3. **Composition (1440).** Frame 1: helmet faceplate rim in extreme macro across the right 60 %, black left third, headline at 176 px bottom left, two mono lines top left. Frame 2: the diver at right, headline reduced to 96 px, one sentence below. Frame 3: waterline across the frame at 55 %, cutting the faceplate in two. Frame 4: underwater, diver small and sinking at right, statement at 92 px left, depth read-out bottom right.
4. **Light.** Low sun from the right, warm rim on the brass and the yellow shell; the rest falls to black. Under the line the light turns cold teal, with slow shafts from above.
5. **Primary asset.** A real Oceânica diver at entry. Today only the stock photograph exists (Shutterstock, published on oceanica.com.br): good enough to judge the idea, not to publish.
6. **Parallax layers.** Background sea plate (0.6×); diver cut-out (1.0×); bubbles near the lens (1.5×, blurred); water droplets on the lens in frame 1 (fixed, fading); type locked.
7. **Camera.** One continuous pull-back and descent: scale 3.0 → 1.0 on the faceplate (0 to 35 %), hold (35 to 50 %), waterline rises through the faceplate (50 to 70 %), the diver drops away from camera and bubbles stream up (70 to 100 %). About 3 viewports.
8. **Entry / exit.** Entry: black, then the rim light comes up on the brass over 1.4 s while the two headline lines rise. Exit: bubbles rise past the lens and become the transition into the next section; the depth reads 50 m and hands over to the machine.
9. **Production.** Ideal: one over/under shot (split-dome housing) of an Oceânica diver entering from a dive support vessel at golden hour, 4K 50 fps, plus a macro still set of the helmet. Minimum: a 6K still of a diver at the dive stage and an underwater still of the descent. A generated version is possible from approved photographs but must be labelled.
10. **Implementation.** The existing WebGL shot player (two plates, subject mask, waterline, bubbles) carries it with a new edit; or a 120-frame sequence through the HUMAN engine if footage exists. Type in HTML. Weight: 1 to 2 MB for stills, 6 to 9 MB for a sequence.

**Risk.** Its strength depends entirely on photography Oceânica has not provided. With the stock picture it stays a mood board.

---

## Concept 2 · Nossas mãos a três mil metros / Our hands at three thousand metres

**Subject:** the Work Class ROV. **Mood:** monumental, technical, quiet. The closest in grammar to ZRK, with Oceânica's own object and number.

1. **Headline.** PT: *Nossas mãos a três mil metros.* EN: *Our hands at three thousand metres.* The manipulators are the company's hands where no person can go; the human and the machine are in the same sentence.
2. **Concept.** The vehicle is lowered out of darkness, alone, centred, and does not leave the frame. Behind it a depth number the width of the screen rolls from 0000 to 3000. The light around it is all that changes: daylight from above, then less, then only the dark. At 3000 the number turns solid and the vehicle stands in front of it.
3. **Composition (1440).** Frame 1: black stage; outline numerals "0000" at 600 px spanning the width; ROV cut-out hanging from the top edge, slightly right of centre; headline 86 px bottom left; depth read-out bottom right. Frame 2: deep blue gradient from above, particles streaking upward, "0640". Frame 3: total black, solid "3000" behind the vehicle, which hides its middle digits. Frame 4: extreme macro across the hull markings (PERRY XLX 142 · 3000M · 200 HP, Oceânica logo), headline at 118 px.
4. **Light.** One warm key from above at the surface; it cools and drops away with depth until the vehicle is lit only from the front, as by the pilot camera's own lamp. No invented lamps on the vehicle.
5. **Primary asset.** The ROV launch photograph (real, Oceânica-marked, cut out locally). For production: a night photo shoot of the vehicle on deck under controlled light, or a photogrammetry scan for true rotation.
6. **Parallax layers.** Numerals (0.3×, the slowest, so the vehicle seems to sink through them); far particles (0.6×); vehicle (locked, slight sway); near particles (1.6×, motion-blurred); umbilical line from the top edge.
7. **Camera.** Locked on the vehicle; the world moves. 0 to 70 %: descent, numerals roll, light decays. 70 to 85 %: 3000, numerals turn solid. 85 to 100 %: push to macro across the markings. About 3 viewports.
8. **Entry / exit.** Entry: the vehicle drops 6 % into frame on load while the outline numerals draw. Exit: the macro carries the frame into the next chapter (the technology section can start on the same vehicle).
9. **Production.** Minimum: what exists today. Better: studio-lit stills of the vehicle at 6K with a clean alpha. Best: photogrammetry model of the vehicle rendered as a 150-frame descent with alpha, so it can turn slightly as it sinks.
10. **Implementation.** DOM layers in a sticky stage (alpha WebP, HTML numerals with a CSS odometer) and one small canvas for particles. No new library. Under 1.5 MB.

**Risk.** Closest to the benchmark, so it has to win on craft: lighting of the cut-out and the quality of the numerals carry it.

---

## Concept 3 · A linha / The line

**Subject:** the vessel, seen from above, and the line that leaves it. **Mood:** editorial, architectural, light. The only light-theme hero of the three.

1. **Headline.** PT: *Tudo o que está lá embaixo começa aqui.* EN: *Everything down there starts up here.* "Here" is the vessel, at the surface, on paper.
2. **Concept.** The fleet seen from high above, small in a large sea, printed like a plate in a book. One Oceânica-green line leaves the vessel. On scroll the plate lies down and becomes the sea surface; under it the page opens into a section of the ocean, and the line runs straight down through it. Real things sit at their real depths on that line: divers at 50 m, the diving limit at 300 m, observation ROVs at 1000 m, Work Class at 3000 m. The paper darkens to ink as the line goes down.
3. **Composition (1440).** Frame 1: warm paper; headline 112 px over three lines on the left; portrait aerial plate 520 × 640 on the right; green dot on the vessel, line running off the bottom. Frame 2: the plate tilted 70° into a surface plane, the water column opening under it, "0 m" mark. Frame 3: the column full height on the right, hairline depth marks across the page, "300 m" at 250 px, small cut-outs on the line. Frame 4: page in ink, "3000 m" at 250 px, the Work Class vehicle at the end of the line.
4. **Light.** Flat daylight on paper, like a printed page; the only dramatic light is in the column, which goes from turquoise to black. The vehicle at the end is the one lit object.
5. **Primary asset.** A true overhead (nadir) drone still of an Oceânica vessel. Today: the aerial from astern, which works as a plate. Cut-outs of diver, Lynx and Work Class from existing photographs.
6. **Parallax layers.** Paper and type (1.0×); depth marks (1.0×, they are the ruler); column background (0.8×, so the water feels deeper than the page); cut-outs (1.2×); the line (drawn with scroll, not moved).
7. **Camera.** No photographic camera; the page itself is the camera. 0 to 25 %: plate tilts flat (CSS 3D). 25 to 85 %: the section scrolls under fixed marks, the line draws, numbers change at each depth. 85 to 100 %: paper inverts to ink at 3000. About 3 viewports, on a logarithmic depth scale, labelled as such.
8. **Entry / exit.** Entry: the plate slides up from the paper and the green dot appears on the vessel. Exit: the page is already dark at 3000 m, so the next section can start in the dark without a cut.
9. **Production.** One nadir drone still (6K) of an Oceânica vessel in open sea, ideally with the moon pool or launch system visible; clean cut-outs of a diver, an observation ROV and a Work Class ROV from Oceânica's own photography.
10. **Implementation.** DOM only: sticky stage, CSS 3D transform for the tilt, an SVG line with stroke-dashoffset, CSS variables driven by scroll progress. The lightest and most accessible of the three. Under 1 MB.

**Risk.** The most original and the least "cinematic" in the ZRK sense. Its power is graphic clarity, not spectacle.

---

## Comparison

| | 1 Respire fundo | 2 Nossas mãos | 3 A linha |
|---|---|---|---|
| Subject | Diver | ROV | Vessel and the line |
| Theme | Dark, warm to cold | Black | Paper to ink |
| Emotion | Human, physical | Power, precision | Clarity, scale |
| Signature moment | Waterline through the faceplate | Vehicle in front of a solid "3000" | Aerial plate tilting into a section |
| Ready with existing media | No (stock diver) | Yes, at good quality | Yes |
| Production to reach full quality | Diver shoot, over/under video | Night stills or photogrammetry | One nadir drone still |
| Technical weight | Medium | Low | Lowest |

## Recommendation

**Concept 2** for the hero: it is the one that can reach international quality with what exists today, it puts Oceânica's own branded machine at the centre, and its headline joins the person and the machine in one line. **Concept 1** is the strongest emotion but should wait for a real diver shoot; its waterline moment can live in the people chapter later. **Concept 3** is the most distinctive idea and is worth keeping for the "system" chapter, where a vertical section of the ocean is exactly what that section needs to explain.
