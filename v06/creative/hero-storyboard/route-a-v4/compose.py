"""Compositor da HERO V4 · Rota A + A2.

Cada plano real aparece por uma JANELA (abertura) sobre fundo escuro. A janela cresce ao longo do filme.
Na grande revelação (final B), a janela se abre sobre o plano 74 parado no lugar: nada é deslocado nem
ampliado no desktop; só se descobre mais do mesmo quadro. Cortes secos, nenhuma fusão entre fontes.

uso: python3 compose.py <d|m> <A|B> <saída.mp4>
  d = 1920×1080 · m = 720×1280 (composição vertical própria)
  A = final autêntico (corte seco para o plano 74 inteiro) · B = grande revelação (a janela se abre)
"""
import math, subprocess, sys, json
import numpy as np
from PIL import Image

mode, ending, out = sys.argv[1], sys.argv[2], sys.argv[3]
M = mode == 'm'
W, H = (720, 1280) if M else (1920, 1080)
FPS = 24000 / 1001
BG = np.array([11, 13, 14], np.uint8)
R = '../../references/'
V1c, V2c = R + 'institutional-video/clips/', R + 'anniversary-47/clips/'

grade = {}
for line in open('grade.sh'):
    if '=' in line and not line.startswith('#'):
        k, v = line.strip().split('=', 1); grade[k] = v.strip('"').replace("'", "'")
COM = grade['COM'].replace("curves=all='", 'curves=all=').rstrip("'")

def ease(t):  # easeInOutCubic
    t = min(max(t, 0), 1); return 4 * t ** 3 if t < .5 else 1 - (-2 * t + 2) ** 3 / 2

def lerp(a, b, t): return [x + (y - x) * t for x, y in zip(a, b)]

# Plano: arquivo, fonte (V1/V2), início no clipe (s), duração na saída (s),
# chaves: lista de (t relativo 0..1, [cx, cy, s, w, h, X, Y]) = centro no quadro de origem, escala,
# tamanho da janela na tela, centro da janela na tela; ease aplicado entre chaves.
d = not M
S = []
if d:
    S += [
        dict(f=V2c + 'v2-28-claw-macro.mp4', g='V2', a=0, n='claw', k=[(0, [1090, 506, 1, 600, 820, 960, 540])]),
        dict(f=V2c + 'v2-26-manipulator-macro.mp4', g='V2', a=0, n='arm', k=[(0, [1000, 506, 1, 600, 820, 960, 540])]),
        dict(f=V2c + 'v2-27-pilot-manipulator.mp4', g='V2', a=0, n='pilot', k=[(0, [960, 520, 1, 900, 760, 960, 540]), (1, [960, 520, 1, 1000, 790, 960, 540])]),
        dict(f=V1c + 's60-rov-suspended-lars.mp4', g='V1', a=0, n='lars', k=[(0, [980, 560, 1, 1080, 800, 960, 540]), (1, [980, 560, 1, 1160, 830, 960, 540])]),
        dict(f=V1c + 's32-rov-entering-water.mp4', g='V1', a=.4, dur=3.8, n='water', k=[(0, [960, 560, 1, 1220, 850, 960, 540]), (1, [960, 560, 1, 1330, 890, 960, 540])]),
        dict(f=V1c + 's34-sub-v-alongside-fpso.mp4', g='V1', a=.2, dur=3.7, n='subv', k=[(0, [960, 540, 1, 1420, 900, 960, 540]), (1, [960, 540, 1, 1500, 920, 960, 540])]),
    ]
    if ending == 'B':
        S.append(dict(f=V1c + 's74-vessel-platform-wide-TEXT.mp4', g='V1', a=0, dur=7.6, n='reveal', k=[
            (0, [900, 440, 1, 520, 420, 900, 610]), (.13, [900, 440, 1, 520, 420, 900, 610]),
            (.55, [960, 370, 1, 1920, 740, 960, 540]), (1, [960, 370, 1, 1920, 740, 960, 540])], e=True))
    else:
        S.append(dict(f=V1c + 's74-vessel-platform-wide-TEXT.mp4', g='V1', a=0, dur=6.4, n='offshore', k=[(0, [960, 370, 1, 1920, 740, 960, 540])]))
else:
    S += [
        dict(f=V2c + 'v2-28-claw-macro.mp4', g='V2', a=0, n='claw', k=[(0, [1090, 506, .8, 420, 620, 360, 570])]),
        dict(f=V2c + 'v2-26-manipulator-macro.mp4', g='V2', a=0, n='arm', k=[(0, [1000, 506, .8, 420, 620, 360, 570])]),
        dict(f=V2c + 'v2-27-pilot-manipulator.mp4', g='V2', a=0, n='pilot', k=[(0, [760, 520, .62, 520, 640, 360, 600]), (1, [760, 520, .62, 560, 660, 360, 600])]),
        dict(f=V1c + 's60-rov-suspended-lars.mp4', g='V1', a=0, n='lars', k=[(0, [900, 580, .6, 580, 660, 360, 620]), (1, [900, 580, .6, 620, 680, 360, 620])]),
        dict(f=V1c + 's32-rov-entering-water.mp4', g='V1', a=.4, dur=3.8, n='water', k=[(0, [950, 560, .6, 620, 700, 360, 620]), (1, [950, 560, .6, 660, 740, 360, 620])]),
        dict(f=V1c + 's34-sub-v-alongside-fpso.mp4', g='V1', a=.2, dur=3.7, n='subv', k=[(0, [1000, 560, .6, 660, 760, 360, 620]), (1, [1000, 560, .6, 680, 780, 360, 620])]),
    ]
    if ending == 'B':
        S.append(dict(f=V1c + 's74-vessel-platform-wide-TEXT.mp4', g='V1', a=0, dur=7.6, n='reveal', k=[
            (0, [900, 450, .8, 400, 340, 360, 620]), (.13, [900, 450, .8, 400, 340, 360, 620]),
            (.6, [920, 370, .667, 720, 493, 360, 620]), (1, [920, 370, .667, 720, 493, 360, 620])], e=True))
    else:
        S.append(dict(f=V1c + 's74-vessel-platform-wide-TEXT.mp4', g='V1', a=0, dur=6.4, n='offshore', k=[(0, [920, 370, .667, 720, 493, 360, 620])]))

def nframes(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', f], capture_output=True, text=True)
    return int(r.stdout.strip())

# tempos
t = 0
for s in S:
    n = nframes(s['f'])
    full = n / FPS  # V2 (25 qps) passa a 23,976 sem misturar quadros: 4% mais lento
    s['dur'] = min(s.get('dur', full - s['a']), full - s['a'])
    s['t0'] = t; t += s['dur']
TOT = t
NF = int(round(TOT * FPS))

# texto: (camada, entra, sai, fade) em segundos; 'under' = atrás da janela
cut = [s['t0'] for s in S]
L = [
    ('logo', 0, TOT + 1, 0, False),
    ('note', 0, TOT + 1, 0, False),
    ('scroll', 0, 2.2, .5, False),
    ('esta', 1.2, cut[1], .6, True),
    ('parte', cut[1], cut[2], 0, True),
    ('visivel', cut[1] + .35, cut[2], .0, True),
    ('sig', S[-1]['t0'] + (4.6 if ending == 'B' else 2.4), TOT + 1, .8, False),
]
lay = {}
for name, *_ in L:
    im = np.asarray(Image.open(f'layers/{mode}-{name}.png').convert('RGBA')).astype(np.float32) / 255
    lay[name] = im

def alpha_at(t, a, b, f):
    if t < a or t >= b: return 0.
    if f == 0: return 1.
    return min(1, (t - a) / f, (b - t) / f if b < TOT else 1)

def over(frame, rgba, k):
    if k <= 0: return frame
    a = rgba[..., 3:4] * k
    return frame * (1 - a) + rgba[..., :3] * 255 * a

enc = subprocess.Popen(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '24000/1001', '-i', '-',
                        '-an', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
log = []
fi = 0
for s in S:
    sw, sh = (1920, 1012) if s['g'] == 'V2' else (1920, 1080)
    pre = 'setpts=N/(24000/1001)/TB,' if s['g'] == 'V2' else ''
    vf = f"{pre}{grade[s['g']]},{grade['COM']}"
    vf = vf.replace("curves=all='", "curves=all='")
    dec = subprocess.Popen(['ffmpeg', '-nostdin', '-loglevel', 'error', '-i', s['f'], '-vf', f"{pre}trim=start={s['a']},setpts=PTS-STARTPTS,{grade[s['g']]},{grade['COM']}",
                            '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    nf = int(round((s['t0'] + s['dur']) * FPS)) - fi
    last = None
    for j in range(nf):
        buf = dec.stdout.read(sw * sh * 3)
        if len(buf) == sw * sh * 3: last = np.frombuffer(buf, np.uint8).reshape(sh, sw, 3)
        src = last
        tt = j / max(nf - 1, 1)
        ks = s['k']; v = ks[-1][1]
        for (ta, va), (tb, vb) in zip(ks, ks[1:]):
            if ta <= tt <= tb: v = lerp(va, vb, ease((tt - ta) / (tb - ta)) if tb > ta else 1); break
        cx, cy, sc, w, h, X, Y = v
        w, h = int(round(w)), int(round(h))
        lim = 740 if s['n'] in ('reveal', 'offshore') else sh
        sc = max(sc, h / lim, w / sw)  # a janela nunca pede mais do que o quadro tem: sem bordas pretas
        cw, ch = w / sc, h / sc
        x0, y0 = cx - cw / 2, cy - ch / 2
        x0 = min(max(x0, 0), sw - cw); y0 = min(max(y0, 0), (740 if s['n'] in ('reveal', 'offshore') else sh) - ch)
        crop = Image.fromarray(src).crop((int(x0), int(y0), int(x0 + cw), int(y0 + ch)))
        if crop.size != (w, h): crop = crop.resize((w, h), Image.LANCZOS)
        T = fi / FPS
        frame = np.empty((H, W, 3), np.float32); frame[:] = BG
        for name, a, b, f, under in L:
            if under: frame = over(frame, lay[name], alpha_at(T, a, b, f))
        X0, Y0 = int(round(X - w / 2)), int(round(Y - h / 2))
        frame[Y0:Y0 + h, X0:X0 + w] = np.asarray(crop, np.float32)
        for name, a, b, f, under in L:
            if not under: frame = over(frame, lay[name], alpha_at(T, a, b, f))
        enc.stdin.write(np.clip(frame, 0, 255).astype(np.uint8).tobytes())
        fi += 1
    dec.stdout.close(); dec.wait()
    log.append(dict(plano=s['n'], arquivo=s['f'].split('/')[-1], inicio_no_clipe=s['a'], entra=round(s['t0'], 2), dur=round(s['dur'], 2)))
enc.stdin.close(); enc.wait()
json.dump(dict(saida=out, total=round(TOT, 2), planos=log), open(out.replace('.mp4', '.json'), 'w'), ensure_ascii=False, indent=1)
print(out, round(TOT, 2), 's')
