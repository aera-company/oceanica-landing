/* Oceânica · capítulo 07, Conexão, e rodapé. Textos e destinos nos dois idiomas. Sem dependências. */
(() => {
  const T = {
    pt: {
      eyebrow: 'Conexão', title: 'Fale com<br>a Oceânica.',
      p1: 'Comercial', d1: 'Contratação de serviços de prevenção, contingenciamento e engenharia.',
      p2: 'Investidores', d2: 'Relações com investidores, resultados e documentos.',
      p3: 'Carreiras', d3: 'Vagas e cadastro de currículo.',
      p4: 'Fornecedores', d4: 'Portal do Fornecedor.',
      h1: 'https://www.oceanica.com.br/contato/contatos-comerciais/',
      h2: 'https://www.oceanica.com.br/investidores/servicos-aos-investidores/fale-com-ri/',
      sign: 'Ativos mais seguros para um mundo mais limpo.', up: 'Voltar ao início',
      fo: 'Onde estamos', o1: 'Rio de Janeiro · Matriz', fn: 'Nesta página', n1: 'Escala operacional', n2: 'Capacidades', n4: 'Soluções', n5: 'Confiança',
      fe: 'Ética', e1: 'Canal de denúncia', e2: 'Política de privacidade', fs: 'Redes',
      proto: 'Protótipo interno. Imagens e textos ainda não liberados para publicação.',
    },
    en: {
      eyebrow: 'Connect', title: 'Talk to<br>Oceânica.',
      p1: 'Commercial', d1: 'Contracting prevention, contingency and engineering services.',
      p2: 'Investors', d2: 'Investor relations, results and documents.',
      p3: 'Careers', d3: 'Openings and CV registration.',
      p4: 'Suppliers', d4: 'Supplier Portal.',
      h1: 'https://www.oceanica.com.br/en/contacts/',
      h2: 'https://www.oceanica.com.br/en/investors/investor-services/contact-ir/',
      sign: 'Safer assets for a cleaner world.', up: 'Back to top',
      fo: 'Where we are', o1: 'Rio de Janeiro · Headquarters', fn: 'On this page', n1: 'Operational scale', n2: 'Capabilities', n4: 'Solutions', n5: 'Trust',
      fe: 'Ethics', e1: 'Whistleblowing channel', e2: 'Privacy policy', fs: 'Social',
      proto: 'Internal prototype. Images and copy not yet cleared for publication.',
    },
  };
  const root = document.documentElement;
  const scope = [document.getElementById('conexao'), document.getElementById('rodape')].filter(Boolean);
  if (!scope.length) return;
  const $$ = s => scope.flatMap(n => [...n.querySelectorAll(s)]);

  function apply(l) {
    const t = T[l] || T.pt;
    $$('[data-s7]').forEach(el => { const v = t[el.dataset.s7]; if (v != null) el.textContent = v; });
    $$('[data-s7-html]').forEach(el => { const v = t[el.dataset.s7Html]; if (v != null) el.innerHTML = v; });
    $$('[data-s7-href]').forEach(el => { const v = t[el.dataset.s7Href]; if (v != null) el.href = v; });
  }
  apply(root.lang.toLowerCase().startsWith('en') ? 'en' : 'pt');
  document.addEventListener('oc:lang', e => apply(e.detail));
})();
