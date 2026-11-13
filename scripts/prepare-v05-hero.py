"""V05 hero (concept A) media: three depth planes cut from one real photograph.

Source: media-src/deck-dawn.jpg (Oceânica, aft deck at dawn, FPSO and tanker on the horizon)
Mask:   media-src/deck-dawn-mask.png (Apple Vision subject mask, scripts/subject-mask.swift)

Outputs in public/media/ (desktop 2200 px wide, mobile "-m" 1400 px):
  hero-sea      the whole picture with the deck removed. Behind the deck the sea is
                rebuilt row by row by mirroring the water on either side of it (no
                generative tool, no equipment invented). Only revealed at the deck's
                edges while the deck slides out of frame, under blur and grade.
  hero-sky      the sky above the horizon band, alpha-feathered, so it can move slower
  hero-deck     the deck, alpha, cropped to its bounding box
  hero-deck-b   the same deck pre-blurred (out of focus), crossfaded instead of a live blur

Run: python3 scripts/prepare-v05-hero.py
"""

import json
import numpy as np
from PIL import Image, ImageFilter

SRC = "media-src/deck-dawn.jpg"
MASK = "media-src/deck-dawn-mask.png"
OUT = "public/media/"

from PIL import ImageEnhance
im = Image.open(SRC).convert("RGB")
# the grade is baked in, so no CSS filter runs on the moving layers: a little more contrast,
# a little less saturation and exposure, toward steel blue
im = ImageEnhance.Brightness(ImageEnhance.Color(ImageEnhance.Contrast(im).enhance(1.08)).enhance(0.86)).enhance(0.92)
W, H = im.size
rgb = np.asarray(im).astype(np.float32)
m = np.asarray(Image.open(MASK).convert("L").resize((W, H))).astype(np.float32) / 255.0
# Vision misses the two outer containers at the bottom corners; add their footprint by hand
# (polygons traced on a 1100 x 825 preview of the photograph, scaled to full size)
from PIL import ImageDraw
extra = Image.new("L", (W, H), 0)
dr_ = ImageDraw.Draw(extra)
k_ = W / 1100
for poly in ([(744, 584), (812, 580), (1072, 806), (1072, 825), (898, 825)],
             [(250, 570), (352, 570), (252, 825), (12, 825), (12, 780)]):
    dr_.polygon([(x * k_, y * k_) for x, y in poly], fill=255)
extra = np.asarray(extra.filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255.0
m = np.maximum(m, extra)
hard = m > 0.35
# grow the hole slightly so no deck edge survives in the sea plate
grown = np.asarray(Image.fromarray((hard * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(15))) > 0
# fill each row between its outermost deck pixels, so the sea seen through the A-frame and
# between the masts is rebuilt too (otherwise the mirror copies fragments of structure)
grown = grown.copy()
for y in range(H):
    xs = np.flatnonzero(grown[y])
    if xs.size:
        grown[y, xs[0]:xs[-1] + 1] = True

# ---- sea plate: mirror-fill each row of the hole from the water beside it
sea = rgb.copy()
for y in range(H):
    row = grown[y]
    if not row.any():
        continue
    xs = np.flatnonzero(row)
    # split into runs
    breaks = np.flatnonzero(np.diff(xs) > 1)
    starts = np.r_[xs[0], xs[breaks + 1]]
    ends = np.r_[xs[breaks], xs[-1]] + 1
    for a, b in zip(starts, ends):
        x = np.arange(a, b)
        dl = x - a
        dr = (b - 1) - x
        xl = a - 1 - dl
        xr = b + dr
        okl = (xl >= 0) & (xl < W)
        okr = (xr >= 0) & (xr < W)
        xl_c = np.clip(xl, 0, W - 1)
        xr_c = np.clip(xr, 0, W - 1)
        okl &= ~grown[y, xl_c]
        okr &= ~grown[y, xr_c]
        wl = np.where(okl, (dr + 1.0), 0.0)
        wr = np.where(okr, (dl + 1.0), 0.0)
        tot = wl + wr
        fill = np.where(tot[:, None] > 0,
                        (rgb[y, xl_c] * wl[:, None] + rgb[y, xr_c] * wr[:, None]) / np.maximum(tot, 1e-6)[:, None],
                        sea[max(0, y - 260), x])
        sea[y, x] = fill
# soften the rebuilt water vertically so mirrored rows read as waves, not stripes
filled = Image.fromarray(np.clip(sea, 0, 255).astype(np.uint8))
soft = np.asarray(filled.filter(ImageFilter.GaussianBlur(2.2))).astype(np.float32)
feather = np.asarray(Image.fromarray((grown * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))).astype(np.float32)[..., None] / 255.0
sea = rgb * (1 - feather) + soft * feather
# a touch darker where the deck was, it sits in the deck's own shadow side of the frame
sea = sea * (1 - 0.12 * feather)
sea_img = Image.fromarray(np.clip(sea, 0, 255).astype(np.uint8))

# ---- sky: everything above the horizon band, feathered out just above the FPSO's flare tower
y0, y1 = int(0.255 * H), int(0.305 * H)
a = np.ones((H,), np.float32)
a[y0:y1] = np.linspace(1, 0, y1 - y0)
a[y1:] = 0
sky = Image.fromarray(rgb.astype(np.uint8)).convert("RGBA")
sky.putalpha(Image.fromarray((np.repeat(a[:, None], W, 1) * 255).astype(np.uint8)))
sky = sky.crop((0, 0, W, y1))

# ---- deck: alpha cut-out cropped to its box, plus an out-of-focus copy
alpha = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.4))
deck = Image.fromarray(rgb.astype(np.uint8)).convert("RGBA")
deck.putalpha(alpha)
bx = Image.fromarray((hard * 255).astype(np.uint8)).getbbox()
pad = 24
box = (max(0, bx[0] - pad), max(0, bx[1] - pad), min(W, bx[2] + pad), H)
deck_c = deck.crop(box)


def blur_rgba(img, r):
    # premultiplied blur, so transparent pixels do not bleed black into the edge
    arr = np.asarray(img).astype(np.float32)
    al = arr[..., 3:4] / 255.0
    pm = Image.fromarray(np.clip(arr[..., :3] * al, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    ab = Image.fromarray((al[..., 0] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    pmn = np.asarray(pm).astype(np.float32)
    abn = np.asarray(ab).astype(np.float32)[..., None] / 255.0
    col = np.where(abn > 0.003, pmn / np.maximum(abn, 0.003), 0)
    out = np.concatenate([np.clip(col, 0, 255), abn * 255], -1).astype(np.uint8)
    return Image.fromarray(out)


deck_b = blur_rgba(deck_c, 9)


def save(img, name, w, q=80):
    if img.width > w:
        img = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
    img.save(OUT + name, quality=q, method=6)
    return img.size


sizes = {}
for suf, w in (("", 2200), ("-m", 1400)):
    k = w / W
    sizes["sea" + suf] = save(sea_img, f"hero-sea{suf}.webp", w, 82)
    sizes["sky" + suf] = save(sky, f"hero-sky{suf}.webp", w, 80)
    sizes["deck" + suf] = save(deck_c, f"hero-deck{suf}.webp", round(deck_c.width * k), 82)
    sizes["deckb" + suf] = save(deck_b, f"hero-deck-b{suf}.webp", round(deck_c.width * k / 2), 70)

# where the layers sit on the plate, in percent of the full picture (used in globals.css)
geo = {
    "sky_h": round(100 * y1 / H, 3),
    "deck": {"left": round(100 * box[0] / W, 3), "top": round(100 * box[1] / H, 3),
             "width": round(100 * (box[2] - box[0]) / W, 3), "height": round(100 * (box[3] - box[1]) / H, 3)},
}
print(json.dumps({"sizes": sizes, "geo": geo}, indent=1))
