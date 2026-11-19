// Capturas da hero POR SCROLL (index.html) em vários tamanhos e pontos da rolagem, com Chrome sem janela controlado por CDP.
// Sem dependências (Node 22+). Exige o servidor local: node ../web/server.mjs
// Uso: node capture-scroll.mjs [filtro]   ex.: node capture-scroll.mjs secao02
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'http://localhost:4173/';
const out = fileURLToPath(new URL('./screens-scroll/', import.meta.url));
mkdirSync(out, { recursive: true });
const profile = join(tmpdir(), 'oc-capture-scroll-' + process.pid);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--remote-debugging-port=9378', `--user-data-dir=${profile}`, '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 50; i++) {
    try { const l = await (await fetch('http://127.0.0.1:9378/json')).json(); const p = l.find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch {}
    await sleep(200);
  }
  chrome.kill(); throw new Error('Chrome não respondeu');
}
const ws = new WebSocket(await target());
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result?.result?.value;

const P = [0, 0.12, 0.37, 0.56, 0.70, 0.95];
const shots = [
  ...P.map(p => [`desktop-1440x900_p${p.toFixed(2)}`, 1440, 900, 1, false, `p=${p}`]),
  ...P.map(p => [`mobile-390x844_p${p.toFixed(2)}`, 390, 844, 3, true, `p=${p}`]),
  ['desktop-1920x1080_p0.00', 1920, 1080, 1, false, 'p=0'], ['desktop-1920x1080_p0.95', 1920, 1080, 1, false, 'p=0.95'],
  ['ultrawide-2560x1080_p0.37', 2560, 1080, 1, false, 'p=0.37'], ['laptop-1280x720_p0.56', 1280, 720, 1, false, 'p=0.56'],
  ['tablet-paisagem-1024x768_p0.37', 1024, 768, 2, true, 'p=0.37'], ['tablet-retrato-768x1024_p0.70', 768, 1024, 2, true, 'p=0.7'],
  ['mobile-pequeno-360x640_p0.00', 360, 640, 3, true, 'p=0'], ['mobile-grande-430x932_p0.70', 430, 932, 3, true, 'p=0.7'],
  ['desktop-1440x900_en_p0.56', 1440, 900, 1, false, 'p=0.56&lang=en'], ['desktop-1440x900_en_p0.95', 1440, 900, 1, false, 'p=0.95&lang=en'],
  ['desktop-1440x900_estatico', 1440, 900, 1, false, 'static'], ['mobile-390x844_estatico', 390, 844, 3, true, 'static'],
  ['desktop-1440x900_transicao-040', 1440, 900, 1, false, 'scroll=0.4'], ['mobile-390x844_transicao-050', 390, 844, 3, true, 'scroll=0.5'],
  // seção 02: posições em alturas de tela depois do fim do filme
  ...[1.0, 1.7, 2.4, 3.1, 3.8, 4.5].map(v => [`secao02-desktop-1440x900_${v.toFixed(1)}`, 1440, 900, 1, false, `scroll=${v}`]),
  ...[1.0, 1.75, 2.5, 3.25, 4.0, 4.75, 5.5].map(v => [`secao02-mobile-390x844_${v.toFixed(2)}`, 390, 844, 3, true, `scroll=${v}`]),
  ['secao02-desktop-1920x1080_1.7', 1920, 1080, 1, false, 'scroll=1.7'], ['secao02-desktop-1440x900_en_1.7', 1440, 900, 1, false, 'scroll=1.7&lang=en'],
  ['secao02-tablet-768x1024_1.6', 768, 1024, 2, true, 'scroll=1.6'], ['secao02-mobile-360x640_2.0', 360, 640, 3, true, 'scroll=2.0'],
  // capítulo 03: abertura e cada uma das cinco capacidades
  ['secao03-desktop-1440x900_topo', 1440, 900, 1, false, 'cap=top'],
  ...[1, 2, 3, 4, 5].map(v => [`secao03-desktop-1440x900_cap${v}`, 1440, 900, 1, false, `cap=${v}`]),
  ['secao03-mobile-390x844_topo', 390, 844, 3, true, 'cap=top'],
  ...[1, 2, 3, 4, 5].map(v => [`secao03-mobile-390x844_cap${v}`, 390, 844, 3, true, `cap=${v}`]),
  ['secao03-desktop-1920x1080_cap3', 1920, 1080, 1, false, 'cap=3'], ['secao03-laptop-1280x720_cap4', 1280, 720, 1, false, 'cap=4'],
  ['secao03-desktop-1440x900_en_cap5', 1440, 900, 1, false, 'cap=5&lang=en'], ['secao03-tablet-768x1024_cap2', 768, 1024, 2, true, 'cap=2'], ['secao03-mobile-360x640_cap3', 360, 640, 3, true, 'cap=3'],
  // capítulo 04: abertura, pontos e frentes
  ['secao04-desktop-1440x900_topo', 1440, 900, 1, false, 'uni=top'],
  ...[1, 4, 5, 6, 7, 9].map(v => [`secao04-desktop-1440x900_ponto${v}`, 1440, 900, 1, false, `uni=${v}`]),
  ['secao04-desktop-1440x900_frente-cont_ponto7', 1440, 900, 1, false, 'uni=7&unif=cont'], ['secao04-desktop-1440x900_frente-eng_ponto6', 1440, 900, 1, false, 'uni=6&unif=eng'],
  ['secao04-mobile-390x844_topo', 390, 844, 3, true, 'uni=top'],
  ...[2, 4, 5, 7, 9].map(v => [`secao04-mobile-390x844_ponto${v}`, 390, 844, 3, true, `uni=${v}`]),
  ['secao04-mobile-390x844_frente-prev_ponto4', 390, 844, 3, true, 'uni=4&unif=prev'],
  ['secao04-desktop-1920x1080_ponto3', 1920, 1080, 1, false, 'uni=3'], ['secao04-desktop-1440x900_en_ponto5', 1440, 900, 1, false, 'uni=5&lang=en'],
  ['secao04-tablet-768x1024_ponto4', 768, 1024, 2, true, 'uni=4'], ['secao04-mobile-360x640_ponto7', 360, 640, 3, true, 'uni=7'],
  ['secao04-cena-inteira_1000x2500', 1300, 2700, 1, false, 'uni=1'],
  // capítulo 05
  ['secao05-desktop-1440x900_topo', 1440, 900, 1, false, 'goto=solucoes'], ['secao05-desktop-1440x900_colunas', 1440, 900, 1, false, 'goto=solucoes&off=520'], ['secao05-desktop-1440x900_fim', 1440, 900, 1, false, 'goto=solucoes&off=1100'],
  ['secao05-desktop-1920x1080_colunas', 1920, 1080, 1, false, 'goto=solucoes&off=600'], ['secao05-desktop-1440x900_en_colunas', 1440, 900, 1, false, 'goto=solucoes&off=520&lang=en'], ['secao05-laptop-1280x720_colunas', 1280, 720, 1, false, 'goto=solucoes&off=480'],
  ['secao05-mobile-390x844_topo', 390, 844, 3, true, 'goto=solucoes'], ['secao05-mobile-390x844_fechado', 390, 844, 3, true, 'goto=solucoes&off=560'], ['secao05-mobile-390x844_aberto', 390, 844, 3, true, 'goto=solucoes&off=560&open=1'], ['secao05-mobile-390x844_fim', 390, 844, 3, true, 'goto=solucoes&off=1500'],
  ['secao05-tablet-768x1024_topo', 768, 1024, 2, true, 'goto=solucoes&off=300'], ['secao05-mobile-360x640_aberto', 360, 640, 3, true, 'goto=solucoes&off=500&open=1'],
  // capítulo 06
  ['secao06-desktop-1440x900_topo', 1440, 900, 1, false, 'goto=confianca'], ['secao06-desktop-1440x900_evidencias', 1440, 900, 1, false, 'goto=confianca&off=640'], ['secao06-desktop-1440x900_imagem', 1440, 900, 1, false, 'goto=confianca&off=1400'],
  ['secao06-desktop-1920x1080_evidencias', 1920, 1080, 1, false, 'goto=confianca&off=760'], ['secao06-desktop-1440x900_en_topo', 1440, 900, 1, false, 'goto=confianca&lang=en'], ['secao06-desktop-1440x900_en_evidencias', 1440, 900, 1, false, 'goto=confianca&off=640&lang=en'],
  ['secao06-mobile-390x844_topo', 390, 844, 3, true, 'goto=confianca'], ['secao06-mobile-390x844_evidencias', 390, 844, 3, true, 'goto=confianca&off=620'], ['secao06-mobile-390x844_evidencias2', 390, 844, 3, true, 'goto=confianca&off=1300'], ['secao06-mobile-390x844_fim', 390, 844, 3, true, 'goto=confianca&off=1900'],
  ['secao06-tablet-768x1024_topo', 768, 1024, 2, true, 'goto=confianca&off=200'], ['secao06-mobile-360x640_topo', 360, 640, 3, true, 'goto=confianca'],
  ['secao02-desktop-1440x900_pessoas', 1440, 900, 1, false, 'goto=escala&off=1250'],
  // capítulo 07 e rodapé
  ['secao07-desktop-1440x900_topo', 1440, 900, 1, false, 'goto=conexao'], ['secao07-desktop-1440x900_caminhos', 1440, 900, 1, false, 'goto=conexao&off=420'], ['secao07-desktop-1440x900_rodape', 1440, 900, 1, false, 'goto=rodape&off=-260'],
  ['secao07-desktop-1920x1080_topo', 1920, 1080, 1, false, 'goto=conexao'], ['secao07-desktop-1440x900_en_caminhos', 1440, 900, 1, false, 'goto=conexao&off=420&lang=en'], ['secao07-laptop-1280x720_rodape', 1280, 720, 1, false, 'goto=rodape&off=-120'],
  ['secao07-mobile-390x844_topo', 390, 844, 3, true, 'goto=conexao'], ['secao07-mobile-390x844_caminhos', 390, 844, 3, true, 'goto=conexao&off=420'], ['secao07-mobile-390x844_rodape', 390, 844, 3, true, 'goto=rodape'], ['secao07-mobile-390x844_rodape2', 390, 844, 3, true, 'goto=rodape&off=700'],
  ['secao07-tablet-768x1024_caminhos', 768, 1024, 2, true, 'goto=conexao&off=300'], ['secao07-mobile-360x640_topo', 360, 640, 3, true, 'goto=conexao'],
].filter(s => !process.argv[2] || s[0].includes(process.argv[2]));
await send('Page.enable');
for (const [name, w, h, dpr, mobile, q] of shots) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile });
  await send('Page.navigate', { url: BASE + '?' + q + (q.includes('lang=') ? '' : '&lang=pt') });   // idioma explícito: não herda o da captura anterior
  let ok = false;
  for (let i = 0; i < 60 && !ok; i++) { await sleep(150); ok = q === 'static' ? i > 10 : (await evaluate("document.documentElement.dataset.ready")) === '1'; }
  await sleep(450);
  const info = await evaluate("(()=>{const f=performance.getEntriesByType('resource').filter(e=>e.name.includes('/seq/'));return JSON.stringify({seq:f.length?f[0].name.split('/seq/')[1].split('/')[0]:'',frames:f.length,y:Math.round(scrollY),ih:innerHeight,doc:document.documentElement.scrollHeight,card:(c=>c?Math.round(c.getBoundingClientRect().top):null)(document.getElementById('uni-card')),phase:document.getElementById('hero').dataset.phase,overflowX:document.documentElement.scrollWidth>innerWidth})})()");
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86 });
  writeFileSync(join(out, name + '.jpg'), Buffer.from(shot.result.data, 'base64'));
  console.log((ok ? 'ok ' : 'SEM READY ') + name, info);
}
ws.close(); chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true });
