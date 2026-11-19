/* Oceânica · capítulo 05, Soluções. Textos nos dois idiomas, listas e ligação com o corte do Universe. Sem dependências. */
(() => {
  const T = {
    pt: {
      eyebrow: 'Soluções', title: 'Três frentes<br>de atuação.',
      lead: 'Serviços para a integridade de ativos de óleo e gás, da inspeção de rotina às obras subaquáticas.',
      n1: 'Prevenção', l1: 'Inspeção, manutenção e reparo (IRM) em águas rasas e profundas, com mergulhadores e ROVs.', count1: '9 serviços',
      a1: 'Ensaios não destrutivos por inspeção submarina (END)', a2: 'Apoio em operações nos FPSOs', a3: 'Pull-in e pull-out',
      a4: 'Prevenção com mergulhadores e ROVs a partir de SDSVs', a5: 'Afretamento de SDSV para prevenção', a6: 'Inspeção em mangotes de terminais oceânicos',
      a7: 'Embarcações Pai e Filho', a8: 'Operações diverless', a9: 'UWILD, inspeção subaquática em substituição da docagem',
      n2: 'Contingenciamento', l2: 'Intervenção submarina e reparo de dutos para a indústria de óleo e gás.', count2: '4 serviços',
      b1: 'Intervenção submarina e serviços customizados', b2: 'Reparo de dutos rígidos e contingência',
      b3: 'Ferramentas de contenção e resposta em cenários de blow out', b4: 'Operações especiais de manutenção, intervenção e instalação submarinas',
      n3: 'Engenharia', l3: 'Serviços especializados de engenharia subaquática: construção e montagem, novas instalações e obras EPCistas.', count3: '8 serviços',
      c1: 'Instalação de estruturas como PLEM e PLAT', c2: 'Comissionamento e descomissionamento de dutos', c3: 'Teste hidrostático',
      c4: 'Instalação de risers e manifolds', c5: 'Reparo de dutos submarinos com conectores mecânicos', c6: 'Lançamento de cabos e dutos submarinos',
      c7: 'Operações em áreas classificadas de instalação offshore', c8: 'Pull-in e pull-out',
      n4: 'Ativos', l4: 'As três frentes são atendidas pela mesma base de ativos.',
      d1: 'Embarcações', d2: 'ROVs de inspeção e de intervenção', d3: 'Ferramentas e acessórios desenvolvidos pela Oceânica',
      go: 'Ver no corte', note: 'Lista de serviços conforme o site oficial em 18/11/2026, sujeita à validação da Oceânica.',
    },
    en: {
      eyebrow: 'Solutions', title: 'Three lines<br>of work.',
      lead: 'Services for the integrity of oil and gas assets, from routine inspection to subsea construction.',
      n1: 'Prevention', l1: 'Inspection, maintenance and repair (IMR) in shallow and deep water, with divers and ROVs.', count1: '9 services',
      a1: 'Non-destructive testing by subsea inspection (NDT)', a2: 'Support to FPSO operations', a3: 'Pull-in and pull-out',
      a4: 'Prevention with divers and ROVs from SDSVs', a5: 'SDSV chartering for prevention', a6: 'Hose inspection at offshore terminals',
      a7: 'Mother and daughter craft operations', a8: 'Diverless operations', a9: 'UWILD, underwater inspection in lieu of dry-docking',
      n2: 'Contingency', l2: 'Subsea intervention and pipeline repair for the oil and gas industry.', count2: '4 services',
      b1: 'Subsea intervention and customised services', b2: 'Rigid pipeline repair and contingency',
      b3: 'Containment and response tooling for blow-out scenarios', b4: 'Special subsea maintenance, intervention and installation operations',
      n3: 'Engineering', l3: 'Specialised subsea engineering services: construction and assembly, new installations and EPC works.', count3: '8 services',
      c1: 'Installation of structures such as PLEMs and PLATs', c2: 'Pipeline commissioning and decommissioning', c3: 'Hydrostatic testing',
      c4: 'Installation of risers and manifolds', c5: 'Subsea pipeline repair with mechanical connectors', c6: 'Laying of subsea cables and pipelines',
      c7: 'Operations in classified areas of offshore installations', c8: 'Pull-in and pull-out',
      n4: 'Assets', l4: 'All three lines of work are served by the same asset base.',
      d1: 'Vessels', d2: 'Inspection and intervention ROVs', d3: 'Tools and accessories developed by Oceânica',
      go: 'See it in the section', note: 'List of services as shown on the official website on 18 Nov 2026, subject to validation by Oceânica.',
    },
  };
  const root = document.documentElement, sec = document.getElementById('solucoes');
  if (!sec) return;
  const $$ = s => [...sec.querySelectorAll(s)];
  const qs = new URLSearchParams(location.search);

  function apply(l) {
    const t = T[l] || T.pt;
    $$('[data-s5]').forEach(el => { const v = t[el.dataset.s5]; if (v != null) el.textContent = v; });
    $$('[data-s5-html]').forEach(el => { const v = t[el.dataset.s5Html]; if (v != null) el.innerHTML = v; });
  }
  apply(root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
  document.addEventListener('oc:lang', e => apply(e.detail));

  /* Em telas largas as listas ficam sempre abertas; em telas estreitas viram sanfona, fechada por padrão */
  const narrow = matchMedia('(max-width: 900px)');
  const details = $$('details');
  const sync = () => details.forEach(d => { d.open = !narrow.matches; });
  sync(); narrow.addEventListener && narrow.addEventListener('change', sync);
  details.forEach(d => d.querySelector('summary').addEventListener('click', e => { if (!narrow.matches) e.preventDefault(); }));

  /* "Ver no corte": volta ao Universe com a frente escolhida */
  $$('.front__go').forEach(b => b.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('oc:front', { detail: b.dataset.go }));
    const scene = document.getElementById('uni-scene'); if (!scene) return;
    const y = scene.getBoundingClientRect().top + scrollY - 90;
    if (window.__lenis) window.__lenis.scrollTo(y); else scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));

  /* Entrada */
  const items = $$('.front, .sol__assets');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-s5');
    items.forEach((el, i) => el.style.setProperty('--i', el.classList.contains('front') ? i : 0));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    items.forEach(el => io.observe(el));
  }

  /* Modo de teste genérico: ?goto=solucoes&off=400 rola até a seção (mais um deslocamento), sem transições. &open=1 abre as sanfonas. */
  if (qs.has('goto')) {
    root.classList.add('freeze');
    addEventListener('load', () => {
      const el = document.getElementById(qs.get('goto'));
      if (qs.has('open')) details.forEach(d => { d.open = true; });
      if (el) scrollTo(0, el.getBoundingClientRect().top + scrollY - 60 + Number(qs.get('off') || 0));
      requestAnimationFrame(() => requestAnimationFrame(() => { root.dataset.ready = '1'; }));
    });
  }
})();
