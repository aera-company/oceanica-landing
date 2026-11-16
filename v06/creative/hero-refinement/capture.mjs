// Captura keyframes e animatic com um Chrome headless único (CDP). Sem dependências.
// uso: node capture.mjs A1 [--frames] [--video] [--fps 15]
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2), id = args[0];
const want = f => args.includes(f) || (!args.includes('--frames') && !args.includes('--video'));
const fps = args.includes('--fps') ? +args[args.indexOf('--fps') + 1] : 15;
const page = `file://${join(here, id, 'index.html')}`;
const html = readFileSync(join(here, id, 'index.html'), 'utf8');
const attr = n => (html.match(new RegExp(`data-${n}="([^"]+)"`)) || [])[1];
const marks = attr('frames').split(',').map(Number), dur = +attr('dur');

const port = 9300 + Math.floor(Math.random() * 500), prof = join(tmpdir(), 'oc-cap-' + port);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) { await sleep(200); try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let n = 0; const pend = new Map();
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++n; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = expression => send('Runtime.evaluate', { expression, awaitPromise: true });
async function open(url, w, h, scale = 1) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: false });
  await send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { await sleep(150); const r = await ev('document.body && document.body.dataset.ready'); if (r?.result?.value === '1') break; }
  await sleep(300);
}
const shot = async (file, q = 90) => { const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: q }); writeFileSync(file, Buffer.from(r.data, 'base64')); };
await send('Page.enable');

if (want('--frames')) {
  await open(page + '?p=0', 1600, 900);
  for (let i = 0; i < marks.length; i++) { await ev(`setP(${marks[i]})`); await sleep(120); await shot(join(here, id, 'frames', `${i + 1}.jpg`)); }
  await open(page + '?f=m', 390, 844, 2);
  await shot(join(here, id, 'frames', 'm.jpg'));
  for (let i = 0; i < marks.length; i++) { await ev(`setP(${marks[i]})`); await sleep(120); await shot(join(here, id, 'frames', `m${i + 1}.jpg`)); }
  console.log(id, 'keyframes ok');
}
if (want('--video')) {
  const tmp = join(tmpdir(), `oc-${id}-${port}`); mkdirSync(tmp, { recursive: true });
  await open(page + '?p=0', 1600, 900, .8);            // 1280×720
  const total = Math.round(dur * fps);
  for (let i = 0; i <= total; i++) { await ev(`setP(${i / total})`); await shot(join(tmp, String(i).padStart(4, '0') + '.jpg'), 86); }
  const hold = Math.round(fps * 1.2);                   // segura o último quadro
  for (let i = 1; i <= hold; i++) await shot(join(tmp, String(total + i).padStart(4, '0') + '.jpg'), 86);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(tmp, '%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '21', '-movflags', '+faststart', join(here, id, 'animatic.mp4')]);
  rmSync(tmp, { recursive: true, force: true });
  console.log(id, 'animatic ok', total + hold, 'quadros');
}
ws.close(); chrome.kill(); await sleep(300); rmSync(prof, { recursive: true, force: true });
