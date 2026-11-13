# Media sources

Official Oceânica media, taken from the public site on 2026-11-10 for this internal concept study only.
Not cleared for publication. Confirm rights and provenance with Oceânica before any public deploy.

| File | Source URL | Shown on |
|---|---|---|
| logo-oceanica.png | supplied earlier by Tiago (Saving project) | header |
| rov-work-class.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2021/10/HEADER-ROV-1.jpg | banner of /servicos/ativos/rov/ |
| oceanicasub-x.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2024/06/OCEANICASUB-27-scaled.jpg | /servicos/ativos/embarcacoes/ (OCEANICASUB X) |

## V02 film (added 2026-11-10)

All taken from the public site for this internal study. Not cleared. Full list with sizes in `MEDIA-INVENTORY.md`.

| File | Source URL |
|---|---|
| ../film/s1-vessel.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2024/06/SHIP-DIA-06-07-5-de-82.jpg |
| ../film/s2-deck.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2021/10/HEADER-pagina-Ativos-1-scaled.jpg |
| ../film/s3-rov.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2021/09/ROV-Lynx-Sinergia.MOV_snapshot_01.04.960.jpg |
| ../film/s4-workclass.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2021/10/HEADER-ROV-1.jpg |
| oceanicasub-vii.jpg | https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867/2024/06/OCEANICASUB-44.jpg |

## V03 (added 2026-11-10)

Same conditions: public site, internal study, not cleared. `{U}` = `https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867`

| File | Source URL |
|---|---|
| ../media/fleet-xi.webp | {U}/2024/06/MACLAREN-dia-07-10-27-de-28.jpg |
| ../media/fleet-x.webp | {U}/2024/06/OCEANICASUB-27.jpg |
| ../media/fleet-vi.webp, fleet-vii.webp, rov-lynx.webp | re-encoded from the V02 files above |
| ../media/svc-prevention.webp | {U}/2021/10/Apoio-em-FPSO-1.jpg |
| ../media/svc-contingency.webp | {U}/2021/09/Cutting-tool-fita2.jpg |
| ../media/svc-engineering.webp | https://cdn-sites-assets.mziq.com/wp-content/themes/mziq_oceanica_2021/img/assets/render_1920-1_103-scaled.jpeg |
| ../media/rov-workclass-launch.webp | {U}/2021/09/HOME-PREVENCAO-I_Easy-Resize.com_.jpg |
| ../media/people-training.webp | {U}/2021/09/centro-de-treinamento-2021.jpg |
| ../media/closing-vessel.webp | {U}/2021/10/SDSV1-2048x1152-1.jpg |
| ../film/s4-workclass.jpg | rov-work-class.jpg treated by scripts/enhance-workclass.py |

Files ending in `-m.webp` are 1100 px copies of the same pictures for small screens.

## V04 (added 2026-11-11)

Originals are kept in `media-src/`; every derived file is produced by `scripts/prepare-v04-media.py`.

| File | Source | Note |
|---|---|---|
| ../film/s2-diver.jpg, ../media/people-diver.webp | {U}/2021/09/shutterstock_721276657-1_Easy-Resize.com_.jpg, supplied again by the client | **Stock photograph.** Licence terms for this use unknown. Never captioned as an Oceânica diver |
| ../media/rov-hero.webp, rov-launch.webp | supplied by the client; same scene as {U}/2021/09/HOME-PREVENCAO-I_Easy-Resize.com_.jpg | Cut out with a local Apple Vision mask |
| ../media/system.mp4, system.webp | https://www.oceanica.com.br/wp-content/themes/mziq_oceanica_2021/img/assets/render_1920-1.mp4 | Oceânica's own render, re-encoded to 2560 and 1440 px, no audio |

## V05 hero (added 2026-11-13)

Same conditions: public site, internal study, not cleared. Every derived file is produced by `scripts/prepare-v05-hero.py`.

| File | Source | Note |
|---|---|---|
| ../media/hero-sea.webp, hero-sky.webp, hero-deck.webp, hero-deck-b.webp (and `-m`) | {U}/2021/10/HEADER-pagina-Ativos-1-scaled.jpg, kept as `media-src/deck-dawn.jpg` | Cut into depth planes with a local Apple Vision mask plus two hand-traced container outlines. Behind the deck the water is rebuilt by mirroring the sea on either side of it, row by row: no generative tool, no equipment added |
| ../media/svc-prevention.webp (reused as the arrival frame) | {U}/2021/10/Apoio-em-FPSO-1.jpg | Also used by the prevention card in Services |
| ../og.jpg | Rendered from the hero's first frame | |
