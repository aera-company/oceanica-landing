/* Oceânica · capítulo 04, Oceânica Universe. Corte esquemático com nove pontos e três frentes. Sem dependências. */
(() => {
  const SRC = { pt: 'oceanica.com.br · 18/11/2026', en: 'oceanica.com.br · 18 Nov 2026' };
  const FRONT = {
    pt: { prev: 'Prevenção', cont: 'Contingenciamento', eng: 'Engenharia' },
    en: { prev: 'Prevention', cont: 'Contingency', eng: 'Engineering' },
  };
  const PTS = [
    { f: ['cont'], pt: ['RSV', 'Embarcação de apoio a ROV. O primeiro contrato de ROV Work Class da Oceânica, em 2020, foi em uma RSV.'],
      en: ['RSV', 'ROV support vessel. Oceânica’s first Work Class ROV contract, in 2020, was on an RSV.'] },
    { f: ['prev'], pt: ['SDSV', 'Shallow Dive Support Vessel, com posicionamento dinâmico DP2. Usada em inspeção e manutenção submarina com mergulho e ROVs.'],
      en: ['SDSV', 'Shallow Dive Support Vessel with DP2 dynamic positioning. Used for subsea inspection and maintenance with divers and ROVs.'] },
    { f: ['prev'], pt: ['FPSO', 'Unidade de produção do cliente. A Oceânica realiza inspeções e manutenções submarinas em FPSOs desde 1998, incluindo inspeção de classe (UWILD).'],
      en: ['FPSO', 'The client’s production unit. Oceânica has carried out subsea inspection and maintenance on FPSOs since 1998, including class inspection (UWILD).'] },
    { f: ['prev'], pt: ['Mergulhador', 'Inspeção, manutenção e reparo com mergulhadores. Apoio a operações de pull-in e pull-out de dutos flexíveis e rígidos.'],
      en: ['Diver', 'Inspection, maintenance and repair by divers. Support to pull-in and pull-out operations on flexible and rigid lines.'] },
    { f: ['prev'], pt: ['ROV de observação', 'Operações diverless: inspeção visual, potencial eletroquímico, medição de espessura, limpeza e inspeção de amarras.'],
      en: ['Observation ROV', 'Diverless operations: visual inspection, cathodic potential, thickness measurement, cleaning and mooring inspection.'] },
    { f: ['eng'], pt: ['Risers', 'Instalação de risers e manifolds, entre as soluções de engenharia subaquática.'],
      en: ['Risers', 'Installation of risers and manifolds, among the subsea engineering solutions.'] },
    { f: ['cont'], pt: ['ROV Work Class', 'Intervenção submarina e serviços customizados. Operação de ferramentas de contenção e resposta em cenários de blow out em equipamentos submarinos.'],
      en: ['Work Class ROV', 'Subsea intervention and customised services. Operation of containment and response tools in blow-out scenarios on subsea equipment.'] },
    { f: ['eng'], pt: ['Estruturas submarinas', 'Instalação de estruturas como PLEM e PLAT, e de manifolds.'],
      en: ['Subsea structures', 'Installation of structures such as PLEMs and PLATs, and of manifolds.'] },
    { f: ['cont', 'eng'], pt: ['Dutos', 'Reparo de dutos rígidos e contingência. Reparo com conectores mecânicos, comissionamento e descomissionamento de dutos.'],
      en: ['Pipelines', 'Rigid pipeline repair and contingency. Repair with mechanical connectors, pipeline commissioning and decommissioning.'] },
  ];
  const T = {
    pt: { title: 'Da superfície<br>às grandes<br>profundidades.',
      lead: 'Uma operação offshore vista em corte: o que a Oceânica faz em cada profundidade, e em qual frente. Desenho esquemático, fora de escala.',
      svgtitle: 'Corte esquemático de uma operação offshore: embarcações e unidade de produção na superfície, mergulhador em águas rasas, ROVs, risers, estruturas e dutos no leito marinho.',
      z1: 'Superfície', z2: 'Leito marinho', p4: 'Mergulhador', p5: 'ROV de observação', p8: 'Estruturas submarinas', p9: 'Dutos',
      fall: 'Todas as frentes', fprev: 'Prevenção', fcont: 'Contingenciamento', feng: 'Engenharia',
      note: 'Desenho esquemático, fora de escala, feito para este estudo. Atividades descritas a partir do site oficial, sujeitas à validação da Oceânica.',
      panel: 'Frentes e detalhe do ponto selecionado', fronts: 'Frentes', prevpt: 'Ponto anterior', nextpt: 'Próximo ponto' },
    en: { title: 'From surface<br>to subsea.',
      lead: 'An offshore operation seen in section: what Oceânica does at each depth, and under which line of work. Schematic drawing, not to scale.',
      svgtitle: 'Schematic section of an offshore operation: vessels and a production unit at the surface, a diver in shallow water, ROVs, risers, structures and pipelines on the seabed.',
      z1: 'Surface', z2: 'Seabed', p4: 'Diver', p5: 'Observation ROV', p8: 'Subsea structures', p9: 'Pipelines',
      fall: 'All lines of work', fprev: 'Prevention', fcont: 'Contingency', feng: 'Engineering',
      note: 'Schematic drawing, not to scale, made for this study. Activities described from the official website, subject to validation by Oceânica.',
      panel: 'Lines of work and detail of the selected point', fronts: 'Lines of work', prevpt: 'Previous point', nextpt: 'Next point' },
  };

  const root = document.documentElement, sec = document.getElementById('universe');
  if (!sec) return;
  const $ = s => sec.querySelector(s), $$ = s => [...sec.querySelectorAll(s)];
  const qs = new URLSearchParams(location.search);
  const scene = $('#uni-scene'), card = $('#uni-card'), pts = $$('.pt'), filters = $$('.uni__filter button');
  let lang = root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt', on = -1, front = 'all';

  function render() {
    const p = PTS[on], [name, desc] = p[lang];
    card.querySelector('.uni__idx b').textContent = String(on + 1);
    card.querySelector('.uni__idx em').textContent = p.f.map(k => FRONT[lang][k]).join(' · ');
    card.querySelector('h3').textContent = name;
    card.querySelector('.uni__desc').textContent = desc;
    card.querySelector('small').textContent = SRC[lang];
  }
  function select(i) {
    i = (i + PTS.length) % PTS.length; if (i === on) return; on = i;
    pts.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    render();
  }
  function setFront(f) {
    front = f; scene.dataset.f = f;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
    if (f !== 'all' && !PTS[on].f.includes(f)) { lock(); select(PTS.findIndex(p => p.f.includes(f))); }
  }
  function apply(l) {
    lang = l; const t = T[l] || T.pt;
    $$('[data-s4]').forEach(el => { const v = t[el.dataset.s4]; if (v != null) el.textContent = v; });
    $$('[data-s4-html]').forEach(el => { const v = t[el.dataset.s4Html]; if (v != null) el.innerHTML = v; });
    $$('[data-s4-aria]').forEach(el => { const v = t[el.dataset.s4Aria]; if (v != null) el.setAttribute('aria-label', v); });
    $$('.uni__depth').forEach(el => { el.textContent = l === 'en' ? el.textContent.replace('.', ',') : el.textContent.replace(',', '.'); });
    if (on >= 0) render();
  }

  /* Ao rolar, o ponto mais próximo do meio da tela fica ativo. Um clique segura a escolha até a rolagem andar. */
  let lockY = null;
  const lock = () => { lockY = scrollY; };
  let ticking = false;
  function auto() {
    ticking = false;
    if (lockY !== null) { if (Math.abs(scrollY - lockY) < 160) return; lockY = null; }
    const r = scene.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const mid = innerHeight * 0.45; let best = -1, d = Infinity;
    pts.forEach((b, k) => {
      if (front !== 'all' && !PTS[k].f.includes(front)) return;
      const y = b.getBoundingClientRect().top + 16, dd = Math.abs(y - mid);
      if (dd < d) { d = dd; best = k; }
    });
    if (best >= 0) select(best);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(auto); } }, { passive: true });

  pts.forEach((b, k) => b.addEventListener('click', () => { lock(); select(k); }));
  filters.forEach(b => b.addEventListener('click', () => setFront(b.dataset.f)));
  $$('.uni__nav button').forEach(b => b.addEventListener('click', () => {
    lock(); let i = on; const step = Number(b.dataset.step);
    do { i = (i + step + PTS.length) % PTS.length; } while (front !== 'all' && !PTS[i].f.includes(front));
    select(i);
    const el = pts[i], y = el.getBoundingClientRect().top + scrollY - innerHeight * 0.45;
    if (window.__lenis) window.__lenis.scrollTo(y); else scrollTo({ top: y, behavior: 'smooth' });
    lockY = null; setTimeout(lock, 900);
  }));

  apply(lang); select(0);
  document.addEventListener('oc:lang', e => apply(e.detail));
  document.addEventListener('oc:front', e => { setFront(e.detail); lock(); });   // pedido vindo do capítulo 05

  /* Modo de teste: ?uni=5 abre no ponto 5; ?uni=top abre na abertura; &unif=cont escolhe a frente. Sem transições. */
  if (qs.has('uni')) {
    root.classList.add('freeze');
    addEventListener('load', () => {
      const v = qs.get('uni');
      if (qs.has('unif')) setFront(qs.get('unif'));
      if (v === 'top') scrollTo(0, sec.getBoundingClientRect().top + scrollY - 60);
      else { const k = Number(v) - 1; scrollTo(0, pts[k].getBoundingClientRect().top + scrollY - innerHeight * 0.45); lock(); select(k); }
      requestAnimationFrame(() => requestAnimationFrame(() => { root.dataset.ready = '1'; }));
    });
  }
})();
