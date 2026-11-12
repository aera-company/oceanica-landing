# V04 · Audit of V03

Live page: oceanica-landing.vercel.app/pt (V03, branch `main`, commit 3610cef). Read 2026-11-11 from the source and from the V03 review screenshots. V04 work happens on branch `v04`.

## 1. What is already strong

| Element | Why it works | Keep |
|---|---|---|
| The film engine | Scroll is the camera; real photographs; one waterline; 60 fps measured on desktop and throttled phone emulation | Yes, as the hero's spine |
| The waterline cut of a statement | The one physical event of the page; type is cut by the same line as the picture | Yes, moved onto the diver |
| Real fleet photography | Green hulls, Rio skyline, Sugarloaf: unmistakably Oceânica | Yes |
| Asset stage | Full-screen, one object at a time, specs only as published | Yes, simplified |
| Service anatomy | What we do / the challenge / the proof, with published numbers | Yes |
| Bilingual routes, two themes, semantic tokens | Infrastructure is right | Yes, extended |

## 2. What feels average

- **Company chapter.** A tagline, four big numbers, four milestones. Correct, but it is the layout every corporate site uses.
- **Institutional rows and closing.** Functional. No image, no tension, no second idea.
- **Asset stage detail window.** The loupe shows a hand-picked crop that adds no information. Decoration.

## 3. What still feels generic

- **The headline.** "Engenharia em profundidade" describes a category, not this company. Any subsea contractor could sign it.
- **The deck shot.** Sunrise, horizon, cargo: offshore mood that says nothing about Oceânica.
- **Engineering illustration.** Oceânica's own cross-section of a field, its best explanation of what the company does, sits as a passive picture inside one service.

## 4. Where the emotional arc breaks

1. **There is no person.** The film goes from a vessel to machines. The only human figures on the whole page are two technicians in a thumbnail near the footer. The page argues that "below 300 m the work belongs to machines" without ever showing who works above 300 m.
2. **One climax, then a brochure.** After the film the page drops straight into figures and lists. There is no second scene.
3. **Too dark for too long.** In the dark theme the visitor spends the film and the company chapter, about eight viewports, in black before the first light surface.
4. **The best technology photograph is buried.** The Work Class ROV hanging from its launch system, with "Oceânica" on the hull, is item five of six on the asset stage, in a portrait slot.
5. **The deepest shot is the weakest picture.** The Work Class frame is a standard-definition video grab. V03 treated it; it is better, not sharp.

## 5. The three references

| Reference | Finding |
|---|---|
| **Diver** (`1.jpg`, 1280 × 854) | Byte-identical to `2021/09/shutterstock_721276657-1_Easy-Resize.com_.jpg` on oceanica.com.br. It **is** a stock photograph, which is why it reads as stock: midday flat light, no context, an unbranded helmet. It cannot be captioned as an Oceânica diver. It is usable as a picture of the profession if art-directed and never presented as a company operation. A real Oceânica diver photograph is the fix |
| **ROV** (`2.webp`, 1834 × 1798) | Work Class vehicle under its tether management system, on the launch crane, open sea. Markings on the hull: "PERRY XLX 142 · 3000M · 200 HP" and the Oceânica logo. The strongest technology photograph available. Clean subject mask from Apple Vision |
| **Quem somos** (`3.webp`) | Screenshot of the site's "O que fazemos" scene: 14 numbered hotspots over Oceânica's own 3D render of an offshore field. The source video (`render_1920-1.mp4`, 4500 × 2500, 10 s) has a **static camera** with living detail (turbines, birds, water), so it can loop under fixed hotspots. Hotspot positions were recovered by matching the screenshot to a frame of the video |

## 6. Candidates for transformation, in order

1. **Hero**: add the person, sharpen the headline into a claim only Oceânica can make.
2. **The system scene**: from picture to signature interactive chapter.
3. **The ROV**: from asset number five to a hero object.
4. **A human chapter**: the first daylight after the film, where the diver and training enter the story.
5. **Rhythm**: alternate dark and light by narrative, not by habit.

## 7. Constraints found

- Credits: Magnific 0 (free plan), Higgsfield 0.5 (free plan). No generation or AI upscale is possible now, approved or not. Everything in V04 is done with local, deterministic processing.
- No photograph is cleared for publication. Two are stock (diver) or possibly supplier footage (Work Class frame).
