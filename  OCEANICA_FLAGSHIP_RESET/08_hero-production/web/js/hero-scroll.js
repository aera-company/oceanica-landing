/* Oceânica · hero. Sem dependências. */
(() => {
  // Tempos do filme (s). Gerados por source/build-film.sh em source/timeline.json.
  const SCENES = [0, 5.297, 9.509, 15.057];
  const DURATION = 19.728;
  const PHASES = [                       // janela em que cada frase fica na tela
    ['open', 0.0, SCENES[1] - 0.75],
    ['mid', SCENES[2] + 0.35, SCENES[3] - 0.6],
    ['close', SCENES[3] + 0.35, DURATION + 1],
  ];
  const I18N = {
    pt: { skip: 'Pular para o conteúdo', nav1: 'A Oceânica', nav2: 'Capacidades', nav3: 'Operação', nav4: 'Soluções', nav5: 'Contato', menu: 'Menu', menuClose: 'Fechar',
      open: 'Engenharia<br>para o futuro<br>offshore.', mid: 'Expertise humana. <br>Tecnologia avançada.', close: 'Da superfície às grandes profundidades.', cue: 'Role',
      s2eyebrow: 'Escala operacional', study: 'Estudo visual · números a validar', s2title: 'A dimensão<br>da Oceânica.',
      f1l: 'Experiência', f1u: 'anos de atuação', f2l: 'Pessoas', f2u: 'colaboradores', f3l: 'ROVs', f3u: 'veículos em 2026',
      f4l: 'Capacidade operacional', f4u: 'de 0 a 3.000 metros', f5l: 'Frota', f5u: 'embarcações', f5s: 'Release 1T26 · o site não informa · validar',
      cap: 'Quadro do vídeo de 47 anos. Material não liberado para publicação.',
      title: 'Oceânica · Engenharia para o futuro offshore', htmlLang: 'pt-BR' },
    en: { skip: 'Skip to content', nav1: 'About', nav2: 'Capabilities', nav3: 'Operation', nav4: 'Solutions', nav5: 'Contact', menu: 'Menu', menuClose: 'Close',
      open: 'Engineering<br>the offshore<br>future.', mid: 'Human expertise. <br>Advanced technology.', close: 'From surface to subsea.', cue: 'Scroll',
      s2eyebrow: 'Operational scale', study: 'Visual study · figures to be validated', s2title: 'The scale<br>of Oceânica.',
      f1l: 'Experience', f1u: 'years in operation', f2l: 'People', f2u: 'employees', f3l: 'ROVs', f3u: 'vehicles in 2026',
      f4l: 'Operating capability', f4u: 'from 0 to 3,000 metres', f5l: 'Fleet', f5u: 'vessels', f5s: '1Q26 release · not stated on the website · to be validated',
      cap: 'Frame from the 47th anniversary film. Not cleared for publication.',
      title: 'Oceânica · Engineering the offshore future', htmlLang: 'en' },
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hero = $('#hero'), film = $('#film'), ticks = $$('.ticks i');
  const qs = new URLSearchParams(location.search);

  /* Idioma */
  let lang = qs.get('lang') || 'pt';
  try { lang = qs.get('lang') || localStorage.getItem('oc-lang') || 'pt'; } catch (e) {}
  if (!I18N[lang]) lang = 'pt';
  function setLang(l) {
    lang = l; const t = I18N[l];
    document.documentElement.lang = t.htmlLang; document.title = t.title;
    $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (t[k] != null) el.textContent = t[k]; });
    $$('[data-i18n-html]').forEach(el => { const k = el.dataset.i18nHtml; if (t[k] != null) el.innerHTML = t[k]; });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    syncMenuLabel();
    document.dispatchEvent(new CustomEvent('oc:lang', { detail: l }));
    try { localStorage.setItem('oc-lang', l); } catch (e) {}
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* Menu (telas estreitas) */
  const menu = $('#menu'), menuBtn = $('.nav__menu');
  function syncMenuLabel() { menuBtn.textContent = I18N[lang][menu.hidden ? 'menu' : 'menuClose']; }
  function toggleMenu(open) {
    menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open); syncMenuLabel();
  }
  menuBtn.addEventListener('click', () => toggleMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { toggleMenu(false); menuBtn.focus(); } });
  setLang(lang);

  /* ------------------------------------------------------------------
     Hero conduzida por scroll.
     Método da new-3d-landbase (sequência de quadros em <canvas>, seção alta com palco fixo,
     progresso por rAF, tudo escrito por ref, DPR <= 2, scroll passivo, Lenis lerp 0.1),
     com as lacunas daquele motor fechadas:
       1. o poster aparece na hora; nada bloqueia a página enquanto os quadros chegam;
       2. os quadros carregam do grosso para o fino, então dá para rolar logo;
       3. decodificação antecipada só da vizinhança do quadro atual (memória);
       4. sequência própria para retrato, em vez de recorte com zoom;
       5. quadro que falha é tentado de novo e, se não vier, o vizinho assume;
       6. movimento reduzido e conexão lenta ficam no poster com o texto inteiro;
       7. o canvas não é realocado quando a barra de endereço do iOS sobe e desce;
       8. quadro N <-> progresso (N-1)/(TOTAL-1).
     ------------------------------------------------------------------ */
  const track = $('#track'), canvas = $('#seq'), ctx = canvas.getContext('2d', { alpha: false });
  const SEQ = {
    d1600: { dir: 'media/seq/d1600/', count: 168 },
    d1280: { dir: 'media/seq/d1280/', count: 168 },
    m720: { dir: 'media/seq/m720/', count: 144 },
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const portrait = matchMedia('(max-aspect-ratio: 4/5)');
  const conn = navigator.connection || {};
  const slow = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  const testP = qs.has('p') ? Number(qs.get('p')) : null;          // ?p=0.5 fixa o progresso (capturas)
  if (testP !== null || qs.has('scroll')) document.documentElement.classList.add('freeze');

  /* Entrada dos blocos da seção 02 */
  const rv = $$('.scale__head, .scale__title, .fig, .scale__image');
  if ('IntersectionObserver' in window && !qs.has('scroll')) {
    rv.forEach((el, i) => { el.classList.add('reveal'); if (el.classList.contains('fig')) el.style.setProperty('--i', i - 2); });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    rv.forEach(el => io.observe(el));
  }

  const isStatic = reduce.matches || slow || qs.has('static');
  if (isStatic) { hero.classList.add('is-static'); document.documentElement.classList.add('no-film'); }

  /* Sequência */
  let seq = null, frames = [], state = [], drawn = -1, cur = 0, target = 0, gen = 0;
  function pickSeq() {
    if (portrait.matches) return 'm720';
    return innerWidth * Math.min(devicePixelRatio || 1, 2) > 1500 && !/3g/.test(conn.effectiveType || '') ? 'd1600' : 'd1280';
  }
  const src = i => seq.dir + 'f_' + String(i + 1).padStart(4, '0') + '.webp';
  function order(n) {                 // do grosso para o fino: 0, fim, depois passos 16, 8, 4, 2, 1
    const seen = new Set(), out = [];
    const add = i => { if (i >= 0 && i < n && !seen.has(i)) { seen.add(i); out.push(i); } };
    add(0); add(n - 1);
    for (let step = 16; step >= 1; step >>= 1) for (let i = 0; i < n; i += step) add(i);
    return out;
  }
  function loadSeq() {
    const name = pickSeq(); if (seq && seq.name === name) return;
    const my = ++gen; seq = { name, ...SEQ[name] };
    frames = new Array(seq.count); state = new Array(seq.count).fill(0); drawn = -1;    // 0 pendente · 1 pronto · 2 falhou
    hero.classList.remove('is-drawn');                                                 // troca de sequência: mostra o poster até o primeiro quadro novo
    const queue = order(seq.count); let active = 0;
    const next = () => {
      if (my !== gen) return;
      while (active < 6 && queue.length) {
        const i = queue.shift(); active++;
        const img = new Image(); img.decoding = 'async'; let tries = 0;
        const done = ok => {
          if (my !== gen) return;
          active--; state[i] = ok ? 1 : 2; if (ok) frames[i] = img;
          if (ok && (drawn < 0 || Math.abs(i - Math.round(cur)) <= 8)) { drawn = -1; schedule(); }
          next();
        };
        img.onload = () => done(true);
        img.onerror = () => { if (tries++ < 1) img.src = src(i) + '?r=1'; else done(false); };
        img.src = src(i);
      }
    };
    next();
  }
  function nearest(i) {               // quadro pronto mais próximo de i
    if (state[i] === 1) return i;
    for (let d = 1; d < seq.count; d++) { if (state[i - d] === 1) return i - d; if (state[i + d] === 1) return i + d; }
    return -1;
  }
  function draw(i) {
    const k = nearest(i);
    if (k < 0) { hero.classList.remove('is-drawn'); return k; }   // nada pronto: o poster volta a aparecer, em vez de um canvas preto
    if (k === drawn) return k;
    const img = frames[k], cw = canvas.width, ch = canvas.height, ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let w, h; if (cr > ir) { w = cw; h = cw / ir; } else { h = ch; w = ch * ir; }        // cover-fit
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    drawn = k; hero.classList.add('is-drawn');
    for (let d = 1; d <= 6; d++) { const f = frames[k + d]; if (f && f.decode) f.decode().catch(() => {}); }   // aquece os próximos
    return k;
  }

  /* Canvas: só realoca quando a largura muda ou a altura muda de verdade (não na barra do iOS) */
  let cwCss = 0, chCss = 0;
  function sizeCanvas(force) {
    const r = canvas.getBoundingClientRect(); if (!r.width) return;
    if (!force && Math.abs(r.width - cwCss) < 1 && Math.abs(r.height - chCss) < 120) return;
    cwCss = r.width; chCss = r.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr); drawn = -1;
  }

  /* Progresso */
  function progress() {
    const len = track.offsetHeight; return len > 0 ? Math.min(1, Math.max(0, scrollY / len)) : 0;
  }
  function setPhase(t) {
    let ph = 'none';
    for (const [name, a, b] of PHASES) if (t >= a && t < b) ph = name;
    if (hero.dataset.phase !== ph) hero.dataset.phase = ph;
    for (let i = 0; i < 4; i++) {
      const a = SCENES[i], b = i < 3 ? SCENES[i + 1] : DURATION;
      ticks[i].style.setProperty('--f', Math.min(1, Math.max(0, (t - a) / (b - a))).toFixed(3));
    }
  }
  let rafId = 0, lenisOn = false;
  function schedule() { if (!rafId) rafId = requestAnimationFrame(tick); }
  function tick() {
    rafId = 0;
    const len = track.offsetHeight, h = hero.offsetHeight, p = progress();
    // depois do filme, a seção 02 sobe por cima e a hero escurece de leve
    hero.style.setProperty('--p', Math.min(1, Math.max(0, (scrollY - len) / h)).toFixed(3));
    document.body.classList.toggle('past-hero', scrollY > len + h - 72);
    document.body.classList.toggle('scrolled', scrollY > 24);
    if (isStatic || !seq) return;
    target = p * (seq.count - 1);
    // sem Lenis (toque, ou biblioteca ausente) o quadro persegue o alvo, para a roda do mouse não dar saltos
    cur = lenisOn || testP !== null ? target : cur + (target - cur) * 0.22;
    if (Math.abs(target - cur) < 0.02) cur = target;
    const i = Math.round(cur);
    draw(i);
    setPhase((cur / (seq.count - 1)) * DURATION);
    if ((testP !== null || qs.has('scroll')) && state[i] === 1 && drawn === i) document.documentElement.dataset.ready = '1';
    if (cur !== target) schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { sizeCanvas(false); if (!isStatic) loadSeq(); schedule(); });

  if (qs.has('scroll')) addEventListener('load', () => { scrollTo(0, track.offsetHeight + hero.offsetHeight * Number(qs.get('scroll'))); schedule(); });
  if (isStatic) { schedule(); return; }

  /* Scroll suave: mesmos valores da new-3d-landbase. No toque, o scroll é o nativo. */
  if (window.Lenis && !('ontouchstart' in window) && testP === null && !qs.has('scroll') && !qs.has('nolenis')) {
    const lenis = new window.Lenis({ lerp: 0.1, syncTouch: false });
    window.__lenis = lenis;
    lenisOn = true;
    const loop = t => { lenis.raf(t); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const el = $(a.getAttribute('href')); if (el) { e.preventDefault(); lenis.scrollTo(el); } }));
  }

  /* Começa depois do poster, sem bloquear a página */
  const start = () => {
    sizeCanvas(true); loadSeq();
    if (testP !== null && !qs.has('scroll')) scrollTo(0, track.offsetHeight * testP);
    schedule();
  };
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
})();
