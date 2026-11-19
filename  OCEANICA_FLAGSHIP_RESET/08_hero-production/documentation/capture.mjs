// Capturas da versão COM AUTOPLAY (autoplay.html) em vários tamanhos e instantes do filme, com Chrome sem janela controlado por CDP.
// Sem dependências (Node 22+). Exige o servidor local: node ../web/server.mjs
// Uso: node capture.mjs
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'http://localhost:4173/autoplay.html';
const out = fileURLToPath(new URL('./screens/', import.meta.url));
mkdirSync(out, { recursive: true });
const profile = join(tmpdir(), 'oc-capture-' + process.pid);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--remote-debugging-port=9377', `--user-data-dir=${profile}`, '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 50; i++) {
    try { const l = await (await fetch('http://127.0.0.1:9377/json')).json(); const p = l.find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch {}
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

const T = [1.5, 3.6, 7.4, 11.0, 13.8, 17.5];
const shots = [
  ...T.map(t => [`desktop-1440x900_t${t.toFixed(1)}`, 1440, 900, 1, false, `t=${t}`]),
  ...T.map(t => [`mobile-390x844_t${t.toFixed(1)}`, 390, 844, 3, true, `t=${t}`]),
  ['desktop-1920x1080_t1.5', 1920, 1080, 1, false, 't=1.5'], ['desktop-1920x1080_t17.5', 1920, 1080, 1, false, 't=17.5'],
  ['laptop-1280x720_t1.5', 1280, 720, 1, false, 't=1.5'], ['ultrawide-2560x1080_t1.5', 2560, 1080, 1, false, 't=1.5'],
  ['tablet-paisagem-1024x768_t1.5', 1024, 768, 2, true, 't=1.5'], ['tablet-retrato-768x1024_t1.5', 768, 1024, 2, true, 't=1.5'],
  ['mobile-pequeno-360x640_t1.5', 360, 640, 3, true, 't=1.5'], ['mobile-grande-430x932_t17.5', 430, 932, 3, true, 't=17.5'],
  ['desktop-1440x900_en_t1.5', 1440, 900, 1, false, 't=1.5&lang=en'], ['desktop-1440x900_en_t11.0', 1440, 900, 1, false, 't=11&lang=en'], ['desktop-1440x900_en_t17.5', 1440, 900, 1, false, 't=17.5&lang=en'],
  ['mobile-390x844_en_t17.5', 390, 844, 3, true, 't=17.5&lang=en'],
  ['desktop-1440x900_estatico', 1440, 900, 1, false, 'static'], ['mobile-390x844_estatico', 390, 844, 3, true, 'static'],
  ['desktop-1440x900_transicao-040', 1440, 900, 1, false, 't=17.5&scroll=0.4'], ['desktop-1440x900_transicao-100', 1440, 900, 1, false, 't=17.5&scroll=1'],
  ['desktop-1440x900_secao02-numeros', 1440, 900, 1, false, 't=17.5&scroll=1.55'], ['desktop-1440x900_secao02-imagem', 1440, 900, 1, false, 't=17.5&scroll=2.3'],
  ['mobile-390x844_transicao-050', 390, 844, 3, true, 't=17.5&scroll=0.5'], ['mobile-390x844_secao02', 390, 844, 3, true, 't=17.5&scroll=1.25'],
];
await send('Page.enable');
for (const [name, w, h, dpr, mobile, q] of shots) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile });
  await send('Page.navigate', { url: BASE + '?' + q + (q.includes('lang=') ? '' : '&lang=pt') });   // idioma explícito: não herda o da captura anterior
  let ok = false;
  for (let i = 0; i < 60 && !ok; i++) { await sleep(150); ok = q === 'static' ? i > 10 : (await evaluate("document.documentElement.dataset.ready")) === '1'; }
  await sleep(450);
  const info = await evaluate("(()=>{const f=document.getElementById('film');return JSON.stringify({src:(f.currentSrc||'').split('/').pop(),t:+f.currentTime.toFixed(2),phase:document.getElementById('hero').dataset.phase,overflowX:document.documentElement.scrollWidth>innerWidth})})()");
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86 });
  writeFileSync(join(out, name + '.jpg'), Buffer.from(shot.result.data, 'base64'));
  console.log((ok ? 'ok ' : 'SEM READY ') + name, info);
}
ws.close(); chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true });
