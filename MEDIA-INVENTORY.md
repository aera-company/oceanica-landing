# Media inventory

Official Oceânica media found on oceanica.com.br, inspected 2026-11-10. Files were opened to check content and resolution. Nothing here is cleared for publication: this is an internal study.

CDN base `{U}` = `https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/867`

Finding that changed the project: WordPress keeps the camera originals next to the `-scaled` versions. Removing `-scaled` from the URL returns the full-resolution file.

## A. Verified and usable for the film

| # | Asset | Source | Size | What it shows | Used in V02 |
|---|---|---|---|---|---|
| A1 | OCEANICASUB VI | `{U}/2024/06/SHIP-DIA-06-07-5-de-82.jpg` | 2048×1526 | MPSV under way at dusk, helideck, Rio skyline. Name legible on the hull. Best single image on the site | **Shot 01** |
| A2 | Back deck at first light | `{U}/2021/10/HEADER-pagina-Ativos-1-scaled.jpg` | 2560×1920 | Deck from the bridge at sunrise, FPSO and tanker on the horizon, launch frame and yellow ROV cage, containers. Banner of the Assets page | **Shot 02** |
| A3 | Lynx ROV in the water | `{U}/2021/09/ROV-Lynx-Sinergia.MOV_snapshot_01.04.960.jpg` | 1920×1080 | Seaeye Lynx, green, both lamps on, tether visible, number 1154. A frame grab: the source video exists somewhere | **Shot 03** |
| A4 | Work Class ROV on a structure | `{U}/2021/10/HEADER-ROV-1.jpg` | 1900×811 | Work Class vehicle with manipulators on subsea equipment, lit by its own lamps. Video-grab quality | **Shots 04 and 05** |
| A5 | OCEANICASUB VII | `{U}/2024/06/OCEANICASUB-44.jpg` (original) | 3583×2013 | AHTS head-on with wake, Sugarloaf behind | Chapter 02 |
| A6 | OCEANICASUB X | `{U}/2024/06/OCEANICASUB-27.jpg` (original) | 3583×2012 | AHTS three-quarter view, under way | Spare |
| A7 | OCEANICASUB XI | `{U}/2024/06/MACLAREN-dia-07-10-27-de-28.jpg` (original) | 5374×4028 | Alongside at a terminal, crane working. Highest resolution on the site | Spare, good for macro crops |

## B. Verified, limited use

| Asset | Source | Size | Note |
|---|---|---|---|
| ROV under a hull (UWILD) | `{U}/2021/12/UWILD-ROV.png` | 1000×1000 | Observation ROV with tether below a vessel. Square, low resolution |
| Subsea inspection close-up | `{U}/2021/10/Inspecao-1h-2h-03-1.jpg` | 1443×1080 | Tool on a structure, strong orange cast |
| OCEANICASUB VIII | `{U}/2024/05/imagem-1-1.jpeg` | 1209×727 | Good overcast light, too small for a full-bleed shot |
| OCEANICASUB IX | `{U}/2024/06/WhatsApp-Image-2023-08-20-at-16.17.47-11.jpeg` | 1024×768 | Phone picture |
| Offshore field render | `…/themes/mziq_oceanica_2021/img/assets/render_1920-1.mp4` | 4500×2500, 10 s, 30 fps | The company's own 3D cross-section of a field: platform, FPSO, vessels, ROVs, pipelines, seabed. Bright illustrative style, wrong look for the hero. **Right raw material for the "Oceânica system" chapter** |

## C. Not usable

| Asset | Why |
|---|---|
| ROV model photos (9 models) | 362×280 thumbnails |
| Diverless, risers, contingency service images | Under 500 px |
| Home hero banner | 1432×796, 8-bit palette PNG |
| 2021 imagery in general | Small, several are stock (iStock and Shutterstock in the filenames) |

## D. Identity

| Item | Status |
|---|---|
| Green `#009c48` | Verified from the site CSS |
| Logo | Small PNG only (211×41 from an earlier project, 2.3 KB on the site). **No SVG** |
| Typeface | Barlow on the current site. Not adopted |

## E. Missing media

What the film needs and the site does not have. This is the request list for Oceânica.

| Need | For | Why it matters |
|---|---|---|
| **ROV dive footage**, any Work Class vehicle, launch to seabed | Shots 03 to 05 | The Lynx frame is a grab from a video, so footage exists. Real moving frames replace every generated option |
| **Launch and recovery footage**: cage going over the side | The waterline transition | Would make the cut between deck and water a real event |
| **High-resolution stills from the ROV camera feed** during an intervention | Shots 04 and 05 | Current frame is 1900×811 with visible compression |
| **Vessel footage** from the June 2024 drone shoot | Shot 01 | A drone took those stills; the same flight almost certainly recorded video |
| **Night or low-light vessel photography** | Shot 01 | The current frame is graded down from dusk |
| **Identification of the deck photograph**: which vessel, which system | Shot 02 caption | So the caption can name the asset |
| **Provenance of the Work Class frame** | Rights | It may be supplier footage |
| **SVG logo and brand guide** | Whole site | |
| **Written clearance** for every image | Publication | Nothing is cleared today |

## F. Derived files in this repository

| File | From | Process |
|---|---|---|
| `public/film/s1-vessel.jpg` | A1 | Re-encoded |
| `public/film/s1-vessel-mask.jpg` | A1 | Subject mask from the macOS Vision framework, run locally, blurred 2.5 px |
| `public/film/s2-deck.jpg` | A2 | Resized to 2200 px |
| `public/film/s3-rov.jpg` | A3 | Re-encoded |
| `public/film/s4-workclass.jpg` | A4 | Re-encoded |
| `public/film/still-*.webp` | The player | Five stills (and five portrait) rendered from the shader for the lite and static tiers |
| `public/oceanica/oceanicasub-vii.jpg` | A5 | Resized to 2200 px |

No generated imagery is in the repository. No paid tool was used.
