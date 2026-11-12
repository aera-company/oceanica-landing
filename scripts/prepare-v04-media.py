"""V04 media, derived locally from the originals in media-src/. Nothing is generated.

  media-src/diver-reference.jpg       stock photograph published on oceanica.com.br (Shutterstock 721276657)
  media-src/rov-launch.webp           Work Class ROV on its launch system (supplied by the client, same photo as the site's HOME-PREVENCAO-I)
  media-src/*-mask.png                subject masks from scripts/subject-mask.swift (Apple Vision, local)

Run: python3 scripts/prepare-v04-media.py
"""
import os
from PIL import Image, ImageFilter, ImageChops

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = lambda p: os.path.join(R, "media-src", p)
out = lambda p: os.path.join(R, "public", p)

def upscale(im, k):
    """Lanczos resample plus two-radius unsharp mask: a clean DSLR source tolerates 2x."""
    im = im.resize((im.width * k, im.height * k), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=4, percent=30, threshold=2))
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=2))

def webp(im, path, q=82, w_small=None):
    im.save(out(path), "WEBP", quality=q, method=6)
    if w_small and im.width > w_small:
        s = im.resize((w_small, round(im.height * w_small / im.width)), Image.LANCZOS)
        s.save(out(path.replace(".webp", "-m.webp")), "WEBP", quality=q - 4, method=6)

# --- diver: film texture, its sea mask, and the editorial picture
diver = upscale(Image.open(src("diver-reference.jpg")).convert("RGB"), 2)            # 2560 x 1708
diver.save(out("film/s2-diver.jpg"), quality=86, progressive=True, optimize=True)
dm = Image.open(src("diver-reference-mask.png")).convert("L").resize((1280, 854), Image.LANCZOS)
dm.filter(ImageFilter.GaussianBlur(2.5)).save(out("film/s2-diver-mask.jpg"), quality=86)
webp(diver, "media/people-diver.webp", 82, 1100)

# --- ROV: cut out, the crane fading into the dark above the vehicle
rov = Image.open(src("rov-launch.webp")).convert("RGB")
m = Image.open(src("rov-launch-mask.png")).convert("L").resize(rov.size, Image.LANCZOS)
m = m.filter(ImageFilter.GaussianBlur(1.2))
fade = Image.linear_gradient("L").resize(rov.size)                                    # 0 at top -> 255 at bottom
fade = fade.point(lambda v: max(0, min(255, int((v - 18) * 255 / 120))))             # dark above ~27 %
alpha = ImageChops.multiply(m, fade)
cut = rov.copy()
cut.putalpha(alpha)
cut.save(out("media/rov-hero.webp"), "WEBP", quality=84, method=6)
small = cut.resize((1000, round(cut.height * 1000 / cut.width)), Image.LANCZOS)
small.save(out("media/rov-hero-m.webp"), "WEBP", quality=80, method=6)
webp(rov, "media/rov-launch.webp", 82, 1100)
print("ok")
