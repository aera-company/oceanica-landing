/* Oceânica · seção 02, Escala operacional. Textos nos dois idiomas e entrada dos blocos. Sem dependências. */
(() => {
  const T = {
    pt: {
      eyebrow: 'Escala operacional', title: 'A dimensão<br>da Oceânica.',
      lead: 'Há 48 anos desenvolvemos soluções submarinas para o mercado de óleo e gás, nas frentes de prevenção, contingência e engenharia.',
      l1: 'Experiência', u1: 'anos', d1: 'Empresa brasileira, em atividade desde 1978.', s1: 'Release 3T26 · 12/11/2026',
      l2: 'Frota', u2: 'embarcações', d2: 'Frota operacional de SDSV, RSV e AHTS.', s2: 'Release 3T26 · 12/11/2026',
      l3: 'Pessoas', u3: 'colaboradores', d3: 'Mergulhadores, pilotos de ROV, tripulações e engenharia.', s3: 'Release 3T26 · 12/11/2026',
      u4: 'veículos', d4: 'Dezenove são Work Class.', s4: 'oceanica.com.br · Release 3T26',
      l5: 'Capacidade operacional', u5: 'de profundidade', d5: 'ROVs Work Class capazes de operar a até 3.000 metros.', s5: 'Release 3T26 · 12/11/2026',
      note: 'Imagens: quadros dos vídeos institucionais, ainda não liberados para publicação. Números das fontes indicadas, sujeitos à validação da Oceânica.',
      a1: 'Profissional de costas, com a marca Oceânica no uniforme laranja', a2: 'Embarcação de casco verde navegando, vista de trás',
      a3: 'Equipe reunida em um galpão, de uniforme laranja, vista de cima', a4: 'ROV Work Class amarelo com a marca Oceânica, no convés',
      a5: "ROV na coluna d'água, com os faróis acesos",
    },
    en: {
      eyebrow: 'Operational scale', title: 'The scale<br>of Oceânica.',
      lead: 'For 48 years we have developed subsea solutions for the oil and gas market, across prevention, contingency and engineering.',
      l1: 'Experience', u1: 'years', d1: 'A Brazilian company, operating since 1978.', s1: '3Q26 earnings release · 12 Nov 2026',
      l2: 'Fleet', u2: 'vessels', d2: 'Operational fleet of SDSVs, RSVs and AHTS vessels.', s2: '3Q26 earnings release · 12 Nov 2026',
      l3: 'People', u3: 'employees', d3: 'Divers, ROV pilots, crews and engineering.', s3: '3Q26 earnings release · 12 Nov 2026',
      u4: 'vehicles', d4: 'Nineteen are Work Class.', s4: 'oceanica.com.br · 3Q26 earnings release',
      l5: 'Operating capability', u5: 'water depth', d5: 'Work Class ROVs able to operate at up to 3,000 metres.', s5: '3Q26 earnings release · 12 Nov 2026',
      note: 'Images: frames from the corporate films, not yet cleared for publication. Figures from the sources shown, subject to validation by Oceânica.',
      a1: 'A professional seen from behind, with the Oceânica brand on an orange coverall', a2: 'A green-hulled vessel under way, seen from astern',
      a3: 'A crew gathered in a warehouse, in orange coveralls, seen from above', a4: 'A yellow Work Class ROV with the Oceânica brand, on deck',
      a5: 'An ROV in the water column, lights on',
    },
  };
  const root = document.documentElement, sec = document.getElementById('escala');
  if (!sec) return;
  const $$ = s => [...sec.querySelectorAll(s)];

  function apply(l) {
    const t = T[l] || T.pt;
    $$('[data-s2]').forEach(el => { const v = t[el.dataset.s2]; if (v != null) el.textContent = v; });
    $$('[data-s2-html]').forEach(el => { const v = t[el.dataset.s2Html]; if (v != null) el.innerHTML = v; });
    $$('[data-s2-alt]').forEach(el => { const v = t[el.dataset.s2Alt]; if (v != null) el.alt = v; });
    // 3.000 em português, 3,000 em inglês
    $$('.row__num b').forEach(b => { const n = b.firstChild; if (n && n.nodeType === 3) n.nodeValue = l === 'en' ? n.nodeValue.replace('.', ',') : n.nodeValue.replace(',', '.'); });
  }
  apply(root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
  document.addEventListener('oc:lang', e => apply(e.detail));

  /* Entrada dos blocos: uma vez por linha, ao entrar na tela */
  const items = $$('.row, .scale__lead');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('js-s2');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -14% 0px' });
  items.forEach(el => io.observe(el));
})();
