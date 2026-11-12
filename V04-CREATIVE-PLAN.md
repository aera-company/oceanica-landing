# V04 · Creative plan

## The idea

**Human hands. Machine reach. Three thousand metres.**

V03 told one line: the sea gets deeper. V04 tells two lines that cross: a person goes as deep as a person can, and a machine continues where the person stops. Oceânica is the company that does both, which is its real distinction: the only Brazilian company contracted from 0 to 3000 m, with more than 300 divers *and* 56 ROVs, and a programme that trains its divers to fly the ROVs.

Depth stays the structure. Human and machine become the drama.

## Hero

Five shots, one film, as before. What changes is who is in it.

| Shot | Picture | Statement (EN) | What it adds |
|---|---|---|---|
| 01 Surface | OCEANICASUB VI at dusk | Headline | Scale and identity |
| 02 Diver | A diver at the water's edge, helmet on. Night falls on the vessel, daylight comes up on the diver. The camera closes on the helmet. **The waterline rises over the diver** | Every descent starts with a person. | Humanity, risk, the moment before entry |
| 03 Descent | Seaeye Lynx, lamps on, daylight draining away | Below 300 metres, the work belongs to machines. Divers stop there, and are trained to fly ROVs | The hand-over from person to machine |
| 04 Work Class | Work light reveals the vehicle on subsea equipment | Built to do the work, not to watch it. | Capability |
| 05 Intervention | Pull back to the whole vehicle | Human hands. Machine reach. Three thousand metres down. | Brand statement |

**Opening.** The page opens on a dark frame that exposes into the vessel while the headline rises line by line. 1.6 s, no blocking, skipped under reduced motion.

**Headline options tested**

| | EN | PT | Verdict |
|---|---|---|---|
| A | Engineering the depth. | Engenharia em profundidade. | V03. Describes a category |
| B | The deep is a workplace. | O fundo do mar é local de trabalho. | Good tension, but generic to the sector |
| C | Where people stop, we keep going. | Onde as pessoas param, a gente continua. | Undervalues the divers the film then celebrates |
| D | Human hands, machine reach. | Mãos humanas, alcance de máquina. | Strong, kept as the film's last line |
| **E** | **Zero to three thousand metres.** | **De zero a três mil metros.** | **Chosen.** A claim only Oceânica can make in Brazil, and the film proves it: the depth read-out arrives at 3000 at the end |

Lede: "Divers, Work Class ROVs and our own fleet, working for offshore energy since 1978." One quiet link under it: to the system map.

## Diver

- Used **in the film** (shot 02) and **in a human chapter** right after the company chapter.
- Art direction against the stock feel: never the whole frame at rest. Tight crop on the helmet, a cooler grade with deeper blues so the yellow helmet carries the frame, the sea moves around a rigid subject (local Vision mask), and the waterline takes the diver under.
- Honesty: captions never say "Oceânica diver". The picture shows the profession; the numbers next to it are Oceânica's.
- To replace it: a real Oceânica diver at entry, from the Rio das Ostras training centre or a dive support vessel (request list below).

## Intervention

The Work Class frame cannot be made sharp without new source material or an AI upscale (no credits). V04 keeps the camera within what the frame resolves (maximum zoom 1.4, was 2.3 in V02 and 1.62 in V03) and lets darkness carry the shot. The remaster prompt from V03 stands, for when credits and approval exist.

## ROV as hero object

A dedicated chapter, "Where the diver stops, it starts." The vehicle is cut out (Vision mask), hung in a dark stage, the crane fading into the dark above it. Scrolling lowers it slowly into a pool of light while five parts are named one at a time: launch system, tether management system, buoyancy, thrusters, tooling skid. Only parts that are visible and generic to every Work Class system; no invented numbers. The hull markings (PERRY XLX 142, 3000 M, 200 HP) are quoted as markings. Fleet numbers come from the ROV page.

## The system map (signature chapter)

Oceânica's own field render becomes a living, explorable world, in the spirit of Emons' map but on Oceânica's material:

- the render video loops silently under fixed, numbered hotspots (the 14 services the site names);
- pins appear one by one when the map enters the screen;
- filter by business line (Prevention, Contingency, Engineering) and the other pins step back;
- pick a pin, or press "next": the camera flies into that part of the field and a card explains the service in two sentences, in the site's own facts;
- a guided tour walks the 14 points in order, keyboard included;
- on phones the map is a horizontal panorama you drag, with the card under it.

## Rhythm of light

| | Hero | Company | People | ROV | System | Services | Assets | Institutional | Closing |
|---|---|---|---|---|---|---|---|---|---|
| Dark theme | film | dark water | **daylight paper** | dark stage | **light map** | navy | black stage | **paper** | dark sea |
| Light theme | film | mineral | warm paper | dark stage | light map | warm paper | navy stage | mineral | dark sea |

The first light in the dark theme now arrives right after the company chapter, carried by the diver: surfacing after the descent.

## Motion language

1. **The camera is the only actor in cinematic scenes.** Push, pull, lower. No floating cards.
2. **Light is the transition.** Dips to dark, daylight returning, a lamp opening a frame, a pool of light under the ROV.
3. **Type rises from a line**, as if from under a surface. Once per element, never on loop.
4. **Interaction answers with space**: a map that flies to a point, a stage that wipes.
5. Reduced motion: no pinning, no flight, no loops; every state readable at rest.

## Media requests for Oceânica (replace, in order of impact)

1. A diver at entry from an Oceânica vessel or the training centre tank, helmet on, preferably golden hour.
2. ROV camera stills or footage of a Work Class intervention, high resolution.
3. Launch and recovery footage of the Work Class system (the hero ROV, in motion).
4. The render scene at higher quality (the source animation exists; a 4K loop with alpha layers would allow real parallax).
5. Clearance for every picture used.

## AI generation plan (not run: no credits)

| Asset | Tool | Prompt essence | Guard |
|---|---|---|---|
| Diver close-up, motion | Higgsfield image-to-video, 5 s, start frame = the diver photo | "Static camera. Gentle sea movement behind a commercial diver in a yellow helmet; the diver lowers the hand from the helmet. Natural daylight, no camera move" | Negative: text, logos, extra hoses, extra divers, face visible, camera shake. Label as generated on the page |
| Diver relight | Magnific relight | Late-afternoon side light, warmer highlights on the helmet, deeper sea | Geometry must overlay the original at 50 % |
| Work Class remaster | Magnific upscale, 2×, lowest creativity | See V03-DIRECTION.md, section 2 | Reject if any part moved or appeared |
| ROV launch, motion | Higgsfield image-to-video, start frame = ROV photo | "Static camera. The vehicle sways slightly on the crane above the sea; water moves below" | No text change on the hull |
