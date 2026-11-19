/* Oceânica · capítulo 06, Confiança. Textos nos dois idiomas e entrada dos blocos. Sem dependências. */
(() => {
  const T = {
    pt: {
      eyebrow: 'Confiança', kicker: 'Assinatura institucional', sign: 'Ativos mais seguros<br>para um mundo<br>mais limpo.',
      t1: 'Certificações', d1: 'ISO 9001, ISO 14001 e ISO 45001, obtidas há mais de dez anos. Organismo de inspeção conforme a ABNT NBR ISO/IEC 17020.', s1: 'oceanica.com.br · 18/11/2026',
      t2: 'Contratos', d2: 'Quarenta e seis contratos ativos e R$ 10,3 bilhões em receitas contratadas, que se estendem até 2030 e 2031.', s2: 'Release 3T26 · 12/11/2026',
      t3: 'Reconhecimento', d3: 'Reconhecida pela Petrobras, em 2026, por contribuir para a formação dos primeiros 50 supervisores IMCA do Brasil.', s3: 'Release 3T26 · 12/11/2026',
      t4: 'Prêmios', d4: 'Prêmio Petrobras Melhor Fornecedor em Serviços de Mergulho e Destaque de SMS, em 2018.', s4: 'oceanica.com.br · 18/11/2026',
      t5: 'Sustentabilidade', d5: 'Quarto Relatório de Sustentabilidade consecutivo. Projeto Praia Limpa, com colaboradores e comunidade em limpeza de praias e educação ambiental.', s5: 'Release 3T26 · 12/11/2026',
      t6: 'Ética e governança', d6: 'Código de Ética e Conduta, compliance, auditoria interna e canal de denúncia seguro e anônimo, 24 horas por dia.', s6: 'oceanica.com.br · 18/11/2026',
      vt: 'Princípios e valores', v1: 'Ética', v2: 'Excelência com senso de dono', v3: 'Segurança', v4: 'União', v5: 'Inovação', v6: 'Sustentabilidade',
      alt: 'Equipe da Oceânica reunida, de uniforme laranja e capacete',
      note: 'Evidências das fontes indicadas, sujeitas à validação da Oceânica. Imagem: quadro de vídeo ainda não liberado para publicação.',
    },
    en: {
      eyebrow: 'Trust', kicker: 'Corporate signature', sign: 'Safer assets<br>for a cleaner<br>world.',
      t1: 'Certifications', d1: 'ISO 9001, ISO 14001 and ISO 45001, held for more than ten years. Inspection body under ABNT NBR ISO/IEC 17020.', s1: 'oceanica.com.br · 18 Nov 2026',
      t2: 'Contracts', d2: 'Forty-six active contracts and R$ 10.3 billion in contracted revenue, extending to 2030 and 2031.', s2: '3Q26 earnings release · 12 Nov 2026',
      t3: 'Recognition', d3: 'Recognised by Petrobras in 2026 for contributing to the training of Brazil’s first 50 IMCA supervisors.', s3: '3Q26 earnings release · 12 Nov 2026',
      t4: 'Awards', d4: 'Petrobras Best Supplier award in Diving Services and HSE Highlight, in 2018.', s4: 'oceanica.com.br · 18 Nov 2026',
      t5: 'Sustainability', d5: 'Fourth consecutive Sustainability Report. Praia Limpa project, bringing employees and the community together for beach clean-ups and environmental education.', s5: '3Q26 earnings release · 12 Nov 2026',
      t6: 'Ethics and governance', d6: 'Code of Ethics and Conduct, compliance, internal audit and a secure, anonymous whistleblowing channel, 24 hours a day.', s6: 'oceanica.com.br · 18 Nov 2026',
      vt: 'Principles and values', v1: 'Ethics', v2: 'Excellence with ownership', v3: 'Safety', v4: 'Unity', v5: 'Innovation', v6: 'Sustainability',
      alt: 'The Oceânica crew gathered, in orange coveralls and hard hats',
      note: 'Evidence from the sources shown, subject to validation by Oceânica. Image: video frame not yet cleared for publication.',
    },
  };
  const root = document.documentElement, sec = document.getElementById('confianca');
  if (!sec) return;
  const $$ = s => [...sec.querySelectorAll(s)];

  function apply(l) {
    const t = T[l] || T.pt;
    $$('[data-s6]').forEach(el => { const v = t[el.dataset.s6]; if (v != null) el.textContent = v; });
    $$('[data-s6-html]').forEach(el => { const v = t[el.dataset.s6Html]; if (v != null) el.innerHTML = v; });
    $$('[data-s6-alt]').forEach(el => { const v = t[el.dataset.s6Alt]; if (v != null) el.alt = v; });
  }
  apply(root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
  document.addEventListener('oc:lang', e => apply(e.detail));

  const items = $$('.trust__sign, .ev, .trust__image, .trust__values');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('js-s6');
  $$('.ev').forEach((el, i) => el.style.setProperty('--i', i % 3));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => io.observe(el));
})();
