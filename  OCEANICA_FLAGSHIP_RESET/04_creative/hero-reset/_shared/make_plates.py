"""Plates dos tres key visuals. Uso: python3 make_plates.py <pasta com kv1.png kv2.png kv3.png> <pasta hero-reset>

Origem dos quadros (copias do YouTube, NAO liberadas):
  kv1.png  V2 "47 anos"  0:58.9  plano 14  proa de frente
  kv2.png  V2 "47 anos"  1:30.3  plano 28  garra do manipulador
  kv3.png  V2 "47 anos"  1:15.6  plano 21  mergulhador de capacete
Tudo aqui e recorte, cor, nitidez e grao. Nenhuma geometria e inventada.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
W, H = 2880, 1620
rng = np.random.default_rng(7)


def load(name, box):
    im = Image.open(f"{src}/{name}").convert("RGB").crop(box)
    im = im.resize((W, H), Image.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=60, threshold=2))


def arr(im):
    return np.asarray(im).astype(np.float32) / 255.0


def luma(a):
    return a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722


def scurve(a, k):
    """Contraste em S em torno do cinza medio; k=0 nao altera."""
    return a + k * (a - 0.5) * (1 - np.abs(2 * a - 1))


def grain(a, amt):
    n = rng.normal(0, amt, a.shape[:2]).astype(np.float32)
    n = np.asarray(Image.fromarray(((n + 0.5).clip(0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255 - 0.5
    return a + n[..., None]


def save(a, path):
    Image.fromarray((a.clip(0, 1) * 255).astype(np.uint8)).save(path, quality=92, subsampling=0)
    print(path)


# KV1 · proa de frente. Cor natural, agua mais funda, verde e dourado preservados.
a = arr(load("kv1.png", (85, 0, 85 + 1799, 1012)))
a = scurve(a, 0.35)
L = luma(a)[..., None]
a = a * (0.80 + 0.20 * L ** 0.6)                 # desce as sombras da agua
a = L + (a - L) * 1.06
a[..., 2] *= 0.97                                 # um fio mais quente
save(grain(a, 0.035), f"{out}/kv1/plate.jpg")

# KV2 · garra em macro. High-key, quase monocromatico, aco frio.
a = arr(load("kv2.png", (470, 190, 470 + 1280, 190 + 720)))
L = luma(a)[..., None]
a = L + (a - L) * 0.22                            # tira quase toda a cor
a = a * np.array([0.985, 1.0, 1.03], dtype=np.float32)
a = scurve(a, 0.45)
a = 0.06 + a * 0.97                               # levanta os pretos: papel, nao tela
save(grain(a, 0.03), f"{out}/kv2/plate.jpg")

# KV3 · mergulhador. Azul profundo; o ciano estourado vira azul-marinho, a luz do capacete fica quente.
a = arr(load("kv3.png", (110, 0, 110 + 1799, 1012)))
L = luma(a)[..., None]
cyan = np.clip((a[..., 1] - a[..., 0]) * 2.2, 0, 1)
cyan = np.asarray(Image.fromarray((cyan * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))).astype(np.float32) / 255
a = a * (1 - 0.42 * cyan[..., None])              # escurece o ciano
a[..., 1] *= (1 - 0.45 * cyan)                    # e o leva para o azul-marinho
a = scurve(a, 0.30)
a = a * (0.72 + 0.28 * luma(a)[..., None] ** 0.5)
save(grain(a, 0.04), f"{out}/kv3/plate.jpg")
