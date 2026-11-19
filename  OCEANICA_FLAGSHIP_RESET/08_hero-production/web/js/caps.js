/* Oceânica · capítulo 03, Capacidades. Palco fixo com cinco estados conduzidos pela rolagem. Sem dependências. */
(() => {
  const T = {
    pt: {
      eyebrow: 'Capacidades', title: 'Uma operação<br>integrada.',
      lead: 'Atuamos nas frentes de prevenção, contingência e engenharia, mitigando os riscos ambientais das atividades de nossos clientes e contribuindo para a extensão da vida útil de seus ativos.',
      n1: 'Embarcações', d1: 'Dezoito embarcações em operação, entre unidades de apoio a mergulho, de apoio a ROV e de manuseio de âncoras.', f1a: 'SDSV, RSV e AHTS', f1b: 'SDSV com posicionamento dinâmico DP2', s1: 'Release 3T26 · oceanica.com.br',
      n2: 'Mergulhadores', d2: 'Inspeção, manutenção e reparo de ativos submarinos em operações com mergulhadores.', f2a: 'Centro de Treinamento em Rio das Ostras desde 2012', s2: 'oceanica.com.br · 18/11/2026',
      d3: 'Cinquenta e seis ROVs para inspeção e intervenção. Dezenove são Work Class, capazes de operar a até 3.000 metros.', f3a: 'Primeiro contrato Work Class em 2020', s3: 'Release 3T26 · oceanica.com.br',
      n4: 'Engenharia', d4: 'Serviços especializados de engenharia subaquática e um departamento que projeta, desenvolve e implementa ferramentas e acessórios para ROVs.', f4a: 'Prevenção, contingenciamento e engenharia', s4: 'oceanica.com.br · 18/11/2026',
      n5: 'Tecnologia', d5: 'Centro de Treinamento para ROVs Work Class em Maricá, criado em 2021, e programas de formação de pilotos.', f5a: 'Projeto Mergulhador do Futuro', f5b: 'Programa Trainee de ROV', s5: 'oceanica.com.br · 18/11/2026',
      note: 'Imagens: quadros dos vídeos institucionais, ainda não liberados para publicação. Informações das fontes indicadas, sujeitas à validação da Oceânica.',
      a1: 'Embarcação Oceanicasub IX, de casco verde, navegando em luz baixa', a2: 'Mergulhador de capacete com a luz acesa, sob uma estrutura',
      a3: 'ROV Work Class com a marca Oceânica, suspenso no sistema de lançamento contra o céu', a4: 'Ferramenta de intervenção no convés de uma embarcação, com o mar ao fundo',
      a5: 'Piloto com o controle do manipulador nas mãos, diante de um ROV',
    },
    en: {
      eyebrow: 'Capabilities', title: 'One integrated<br>operation.',
      lead: 'We work across prevention, contingency and engineering, mitigating the environmental risks of our clients’ activities and helping extend the service life of their assets.',
      n1: 'Vessels', d1: 'Eighteen vessels in operation, including dive support, ROV support and anchor handling units.', f1a: 'SDSV, RSV and AHTS', f1b: 'SDSVs with DP2 dynamic positioning', s1: '3Q26 earnings release · oceanica.com.br',
      n2: 'Divers', d2: 'Inspection, maintenance and repair of subsea assets in diver operations.', f2a: 'Training centre in Rio das Ostras since 2012', s2: 'oceanica.com.br · 18 Nov 2026',
      d3: 'Fifty-six ROVs for inspection and intervention. Nineteen are Work Class, able to operate at up to 3,000 metres.', f3a: 'First Work Class contract in 2020', s3: '3Q26 earnings release · oceanica.com.br',
      n4: 'Engineering', d4: 'Specialised subsea engineering services and a department that designs, develops and deploys tools and accessories for ROVs.', f4a: 'Prevention, contingency and engineering', s4: 'oceanica.com.br · 18 Nov 2026',
      n5: 'Technology', d5: 'A training centre for Work Class ROVs in Maricá, created in 2021, and pilot training programmes.', f5a: 'Mergulhador do Futuro project', f5b: 'ROV Trainee programme', s5: 'oceanica.com.br · 18 Nov 2026',
      note: 'Images: frames from the corporate films, not yet cleared for publication. Information from the sources shown, subject to validation by Oceânica.',
      a1: 'The green-hulled vessel Oceanicasub IX under way in low light', a2: 'A helmeted diver with the lamp on, beneath a structure',
      a3: 'A Work Class ROV with the Oceânica brand, suspended on its launch system against the sky', a4: 'An intervention tool on the deck of a vessel, with the sea behind',
      a5: 'A pilot holding the manipulator controller, in front of an ROV',
    },
  };
  const root = document.documentElement, sec = document.getElementById('capacidades');
  if (!sec) return;
  const $$ = s => [...sec.querySelectorAll(s)];
  const qs = new URLSearchParams(location.search);

  function apply(l) {
    const t = T[l] || T.pt;
    $$('[data-s3]').forEach(el => { const v = t[el.dataset.s3]; if (v != null) el.textContent = v; });
    $$('[data-s3-html]').forEach(el => { const v = t[el.dataset.s3Html]; if (v != null) el.innerHTML = v; });
    $$('[data-s3-alt]').forEach(el => { const v = t[el.dataset.s3Alt]; if (v != null) el.alt = v; });
  }
  apply(root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
  document.addEventListener('oc:lang', e => apply(e.detail));

  /* Palco */
  const track = document.getElementById('caps-track'), caps = $$('.cap'), rail = sec.querySelector('.caps__rail'), count = sec.querySelector('.caps__count b');
  const narrow = matchMedia('(max-width: 900px)');
  const N = caps.length;
  let on = 0;
  function set(i) {
    if (i === on) return; on = i;
    caps.forEach((c, k) => c.classList.toggle('is-on', k === i));
    count.textContent = String(i + 1).padStart(2, '0');
  }
  const span = () => track.offsetHeight - innerHeight;                           // rolagem útil do palco
  const top = () => track.getBoundingClientRect().top + scrollY;
  let ticking = false;
  function update() {
    ticking = false;
    if (narrow.matches) return;
    const p = Math.min(1, Math.max(0, (scrollY - top()) / span()));
    rail.style.setProperty('--cp', p.toFixed(3));
    set(Math.min(N - 1, Math.floor(p * N)));
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  narrow.addEventListener && narrow.addEventListener('change', onScroll);

  /* O nome de cada capacidade leva ao seu ponto da rolagem */
  const go = (i, smooth) => {
    const y = top() + span() * ((i + 0.5) / N);
    if (window.__lenis && smooth) window.__lenis.scrollTo(y); else scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
  };
  caps.forEach((c, i) => c.querySelector('.cap__name').addEventListener('click', () => { if (!narrow.matches) go(i, true); }));

  /* Modo de teste: ?cap=3 abre na terceira capacidade, sem transições (capturas) */
  if (qs.has('cap')) {
    root.classList.add('freeze');
    addEventListener('load', () => {
      const v = qs.get('cap');
      if (v === 'top') scrollTo(0, sec.getBoundingClientRect().top + scrollY - 60);
      else if (narrow.matches) scrollTo(0, caps[Number(v) - 1].getBoundingClientRect().top + scrollY - 70);
      else go(Number(v) - 1, false);
      requestAnimationFrame(() => { update(); requestAnimationFrame(() => { root.dataset.ready = '1'; }); });
    });
  }
  update();
})();
