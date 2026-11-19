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

  /* Rolagem: a seção 02 sobe por cima da hero, que escurece um pouco. Nada é sequestrado. */
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = hero.offsetHeight, p = Math.min(1, Math.max(0, scrollY / h));
      hero.style.setProperty('--p', p.toFixed(3));
      document.body.classList.toggle('past-hero', scrollY > h - 72);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (qs.has('scroll')) { document.documentElement.classList.add('freeze'); addEventListener('load', () => { scrollTo(0, hero.offsetHeight * Number(qs.get('scroll'))); onScroll(); }); }

  /* Entrada dos blocos da seção 02 */
  const rv = $$('.scale__head, .scale__title, .fig, .scale__image');
  if (!qs.has('scroll')) rv.forEach((el, i) => { el.classList.add('reveal'); if (el.classList.contains('fig')) el.style.setProperty('--i', i - 2); });
  if ('IntersectionObserver' in window && !qs.has('scroll')) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* Vídeo */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const conn = navigator.connection || {};
  const slow = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  const forceStatic = qs.has('static');
  function goStatic() { hero.classList.add('is-static'); hero.classList.remove('is-playing', 'is-looping'); hero.dataset.phase = 'open'; }
  if (reduce.matches || slow || forceStatic) { goStatic(); return; }
  reduce.addEventListener && reduce.addEventListener('change', e => { if (e.matches) { film.pause(); goStatic(); } });

  const portrait = matchMedia('(max-aspect-ratio: 4/5)');
  function pickSource() {
    if (portrait.matches) return 'media/hero-mobile.mp4';
    const px = innerWidth * Math.min(devicePixelRatio || 1, 2);
    return px > 1500 && !/3g/.test(conn.effectiveType || '') ? 'media/hero-1080.mp4' : 'media/hero-720.mp4';
  }
  let current = '';
  // Modo de teste: ?t=12.2 congela o filme nesse instante, sem transições (para capturas). ?scroll=0.5 rola a página.
  const freeze = qs.has('t') ? Number(qs.get('t')) : null;
  function load() {
    const src = pickSource(); if (src === current) return;
    current = src; hero.classList.remove('is-playing'); film.src = src; film.load();
    if (freeze === null) { play(); return; }
    document.documentElement.classList.add('freeze');
    film.addEventListener('loadeddata', () => { film.currentTime = freeze; }, { once: true });
    film.addEventListener('seeked', () => { hero.classList.add('is-playing'); setPhase(freeze); document.documentElement.dataset.ready = '1'; });
  }
  function play() { const p = film.play(); if (p && p.catch) p.catch(() => { /* autoplay bloqueado: o poster e o título ficam */ }); }

  function setPhase(t) {
    let ph = 'none';
    for (const [name, a, b] of PHASES) if (t >= a && t < b) ph = name;
    if (hero.dataset.phase !== ph) hero.dataset.phase = ph;
    for (let i = 0; i < 4; i++) {
      const a = SCENES[i], b = i < 3 ? SCENES[i + 1] : DURATION;
      ticks[i].style.setProperty('--f', Math.min(1, Math.max(0, (t - a) / (b - a))).toFixed(3));
    }
  }
  let raf = 0;
  function frame() { if (!film.paused && !film.ended) { setPhase(film.currentTime); raf = requestAnimationFrame(frame); } }
  film.addEventListener('playing', () => { hero.classList.add('is-playing'); hero.classList.remove('is-looping'); cancelAnimationFrame(raf); frame(); });
  // rAF para em aba em segundo plano; timeupdate e seeked mantêm as frases certas mesmo assim
  ['timeupdate', 'seeked'].forEach(ev => film.addEventListener(ev, () => { if (!hero.classList.contains('is-looping')) setPhase(film.currentTime); }));
  film.addEventListener('error', goStatic);

  /* Loop: o último quadro dissolve no poster, que é o primeiro quadro exato do filme; então o filme recomeça por baixo. */
  film.addEventListener('ended', () => {
    hero.classList.add('is-looping');
    setTimeout(() => { hero.dataset.phase = 'none'; }, 250);
    setTimeout(() => { film.currentTime = 0; play(); }, 950);
  });

  /* Pausa fora da tela ou com a aba oculta */
  let visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => {
    visible = e.intersectionRatio > 0.05;
    if (!current) return;
    if (visible && !document.hidden) { if (film.paused && !film.ended) play(); } else film.pause();
  }, { threshold: [0, 0.05, 0.2] }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (!current) return; if (document.hidden) film.pause(); else if (visible && !film.ended) play(); });

  /* Carrega depois do poster, sem bloquear a página */
  const start = () => (window.requestIdleCallback ? requestIdleCallback(load, { timeout: 1200 }) : setTimeout(load, 200));
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
  portrait.addEventListener && portrait.addEventListener('change', load);
})();
