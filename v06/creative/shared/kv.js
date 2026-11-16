// Liga o quadro pedido em ?f=1|2|3|m e acrescenta os selos de estudo.
const f = new URLSearchParams(location.search).get('f') || '1';
document.querySelectorAll('.stage').forEach(s => {
  if (s.dataset.f === f) {
    s.classList.add('on');
    const id = document.createElement('div');
    id.className = 'frameid';
    id.textContent = `${document.body.dataset.route} · quadro ${f === 'm' ? 'mobile' : '0' + f} · ${s.dataset.note || ''}`;
    const st = document.createElement('div');
    st.className = 'stamp';
    st.textContent = s.dataset.stamp || 'Estudo de composição · fotografia oficial do site, não liberada · não é registro de uma operação específica';
    s.append(id, st);
  }
});
