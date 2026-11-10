"""Non-destructive treatment of the Work Class ROV frame (shots 04 and 05).

Source: public/oceanica/rov-work-class.jpg (1900x811, official site banner,
an upscaled standard-definition video grab with chroma bleeding).
Output: public/film/s4-workclass.jpg. The source file is never modified.

Nothing is generated: no geometry is added or redrawn. Steps:
  1. chroma clean-up: blur Cb/Cr only (removes colour fringing of the SD source)
  2. luma: vertical 1-2-1 blend (the source is interlaced: this removes the
     comb on diagonals), then a light median against blocking
  3. 2x Lanczos resample
  4. two-radius unsharp mask on luma (structure, then edge)
  5. gentle tone curve: deeper water, protected highlights
Run: python3 scripts/enhance-workclass.py
"""
from PIL import Image, ImageFilter
import os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = Image.open(os.path.join(root, "public/oceanica/rov-work-class.jpg")).convert("YCbCr")
y, cb, cr = src.split()
cb = cb.filter(ImageFilter.GaussianBlur(3.2))
cr = cr.filter(ImageFilter.GaussianBlur(3.2))
y = y.filter(ImageFilter.Kernel((3, 3), [0, 1, 0, 0, 2, 0, 0, 1, 0], scale=4))
y = y.filter(ImageFilter.MedianFilter(3))
W, H = src.size[0] * 2, src.size[1] * 2
y, cb, cr = (c.resize((W, H), Image.LANCZOS) for c in (y, cb, cr))
y = y.filter(ImageFilter.UnsharpMask(radius=6, percent=38, threshold=2))
y = y.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=3))
def curve(v):
    x = v / 255.0
    x = x * x * (3 - 2 * x) * 0.55 + x * 0.45      # soft S
    x = max(0.0, x - 0.012) / 0.988                # sink the water floor
    return int(round(min(1.0, x) * 255))
y = y.point([curve(i) for i in range(256)])
out = Image.merge("YCbCr", (y, cb, cr)).convert("RGB")
out.save(os.path.join(root, "public/film/s4-workclass.jpg"), quality=84, progressive=True, optimize=True)
print(out.size)
