// Motor do animatic. Um parâmetro p (0..1) governa câmera, cortes e tipografia.
// ?p=0.4 → quadro parado (keyframe) · ?f=m → estudo mobile · sem parâmetros → player com play e scrub.
(() => {
  const q = new URLSearchParams(location.search);
  const mobile = q.get('f') === 'm';
  const still = q.has('p') || mobile;
  const B = document.body, stage = document.querySelector('.stage');
  if (mobile) B.classList.add('m');
  if (still) B.classList.add('still');
  const W = mobile ? 390 : 1600, H = mobile ? 844 : 900;
  const dur = +B.dataset.dur || 12;
  const marks = (B.dataset.frames || '0,.35,.7,1').split(',').map(Number);
  const mobileP = +(B.dataset.mobileP || 0);

  const wrap = document.createElement('div'); wrap.className = 'wrap';
  stage.parentNode.insertBefore(wrap, stage); wrap.appendChild(stage);
  const g = document.createElement('div'); g.className = 'grain'; stage.appendChild(g);
  const st = document.createElement('div'); st.className = 'stamp';
  st.textContent = B.dataset.stamp || 'Estudo de direção · fotografia oficial do site, não liberada · movimento = simulação digital sobre foto, não é câmera física';
  const fid = document.createElement('div'); fid.className = 'fid';
  stage.append(st, fid);

  const sm = t => t * t * t * (t * (t * 6 - 15) + 10);           // smootherstep: parte devagar, chega devagar
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const parseCam = s => s.split('|').map(k => { const [t, r] = k.split(':'); const [x, y, z] = r.split(',').map(Number); return { t: +t, x, y, z }; });
  const shots = [...document.querySelectorAll('.shot')].map(el => ({ el, cam: parseCam((mobile && el.dataset.camM) || el.dataset.cam) }));
  const vis = [...document.querySelectorAll('[data-vis]')].map(el => ({
    el, fade: el.dataset.fade !== undefined ? +el.dataset.fade : .025,
    ranges: el.dataset.vis.split(',').map(r => r.split('-').map(Number))
  }));

  function camAt(cam, p) {
    if (p <= cam[0].t) return cam[0];
    for (let i = 0; i < cam.length - 1; i++) {
      const a = cam[i], b = cam[i + 1];
      if (p <= b.t) {
        const u = sm((p - a.t) / (b.t - a.t));
        const z = Math.exp(Math.log(a.z) + (Math.log(b.z) - Math.log(a.z)) * u);   // zoom em escala logarítmica: velocidade percebida constante
        // o centro acompanha o zoom para o assunto não "escorregar"
        const k = a.z === b.z ? u : (1 / z - 1 / a.z) / (1 / b.z - 1 / a.z);
        return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z };
      }
    }
    return cam[cam.length - 1];
  }
  function alpha(v, p) {
    let o = 0;
    for (const [a, b] of v.ranges) {
      if (p < a || p > b) continue;
      let x = 1;
      if (v.fade > 0) {
        if (a > 0) x = Math.min(x, (p - a) / v.fade);
        if (b < 1) x = Math.min(x, (b - p) / v.fade);
      }
      o = Math.max(o, cl(x, 0, 1));
    }
    return o;
  }
  let P = 0;
  function setP(p) {
    P = cl(p, 0, 1);
    for (const s of shots) {
      const w = s.el.naturalWidth, h = s.el.naturalHeight; if (!w) continue;
      const c = camAt(s.cam, P), sc = Math.max(W / w, H / h) * c.z;
      const x = cl(W / 2 - c.x * w * sc, W - w * sc, 0), y = cl(H / 2 - c.y * h * sc, H - h * sc, 0);
      s.el.style.transform = `translate(${x}px,${y}px) scale(${sc})`; s.el._t = { x, y, k: sc, w, h };
    }
    for (const v of vis) { const o = alpha(v, P); v.el.style.opacity = o; v.el.style.visibility = o > 0 ? 'visible' : 'hidden'; }
    if (window.tick) window.tick(P, { W, H, mobile, sm, cl });
    let n = 0; marks.forEach((m, i) => { if (P >= m - 1e-6) n = i; });
    fid.textContent = `${B.dataset.title} · ${mobile ? 'mobile' : 'p ' + P.toFixed(2)} · ${(P * dur).toFixed(1)} s de ${dur} s`;
    if (ui) { ui.range.value = P; ui.t.textContent = `${(P * dur).toFixed(1)} / ${dur}s`; ui.btns.forEach((b, i) => b.classList.toggle('on', i === n)); }
  }
  window.setP = setP;
  // projeta um ponto da imagem (0..1) para coordenadas do palco: é o que mantém as anotações presas ao objeto
  window.project = (el, nx, ny) => { const t = el._t; return t ? [t.x + nx * t.w * t.k, t.y + ny * t.h * t.k] : [0, 0]; };

  let ui = null, playing = false, last = 0;
  function fit() {
    if (still) { wrap.style.transform = 'none'; return; }
    const s = Math.min(innerWidth / W, (innerHeight - 54) / H);
    wrap.style.transform = `translate(${(innerWidth - W * s) / 2}px,${(innerHeight - 54 - H * s) / 2}px) scale(${s})`;
  }
  if (!still) {
    const bar = document.createElement('div'); bar.className = 'bar';
    const play = document.createElement('button'); play.textContent = 'Play';
    const range = Object.assign(document.createElement('input'), { type: 'range', min: 0, max: 1, step: .001, value: 0 });
    const t = document.createElement('span'); t.className = 't';
    const btns = marks.map((m, i) => { const b = document.createElement('button'); b.textContent = 'F0' + (i + 1); b.onclick = () => { playing = false; play.textContent = 'Play'; setP(m); }; return b; });
    bar.append(play, ...btns, range, t); B.appendChild(bar);
    ui = { range, t, btns };
    range.oninput = () => { playing = false; play.textContent = 'Play'; setP(+range.value); };
    play.onclick = () => { playing = !playing; play.textContent = playing ? 'Pausa' : 'Play'; if (playing && P >= 1) setP(0); last = performance.now(); };
    addEventListener('wheel', e => { playing = false; play.textContent = 'Play'; setP(P + e.deltaY / 6000); }, { passive: true });
    addEventListener('resize', fit);
    const loop = now => { if (playing) { setP(P + (now - last) / 1000 / dur); if (P >= 1) { playing = false; play.textContent = 'Play'; } } last = now; requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  const imgs = [...document.images];
  window.ready = Promise.all([document.fonts.ready, ...imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))]).then(() => {
    fit(); setP(mobile ? mobileP : +(q.get('p') || 0)); B.dataset.ready = '1';
  });
})();
