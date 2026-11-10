// Chrome headless (GPU Metal) via CDP, sem dependências.
// node cdp.mjs shot <url> <out.webp> <w> <h>
// node cdp.mjs fps  <url> <w> <h> [mobile] [cpuThrottle]
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [mode, url, a, b, c, d] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const prof = mkdtempSync(join(process.env.SCRATCH || tmpdir(), "chrome-"));
const proc = spawn(CHROME, [
  "--headless=new", "--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist",
  `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
if (!target) { console.error("chrome não respondeu"); proc.kill(); process.exit(1); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id;
  pending.set(i, (msg) => (msg.error ? rej(new Error(method + ": " + msg.error.message)) : res(msg.result)));
  ws.send(JSON.stringify({ id: i, method, params }));
});
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

try {
  if (mode === "shot") {
    const [out, w, h] = [a, +b, +c];
    const mob = process.env.MOBILE === "1";
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
    if (mob) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await send("Page.navigate", { url });
    if (process.env.SCROLL !== undefined) {
      await sleep(3500);
      const target = process.env.SCROLL;
      // número = pixels; "#id" = topo da seção (+ deslocamento opcional "#id+200")
      const expr = target.startsWith("#")
        ? `(() => { const [sel, off] = ${JSON.stringify(target)}.split("+"); const el = document.querySelector(sel); return el.getBoundingClientRect().top + window.scrollY + Number(off || 0); })()`
        : target;
      await evaluate(`window.scrollTo(0, ${expr})`);
      if (process.env.CLICK) {
        for (const sel of process.env.CLICK.split("|")) {
          await sleep(400);
          await evaluate(`[...document.querySelectorAll("button")].find(b => b.textContent.trim().startsWith(${JSON.stringify(sel)}))?.click()`);
        }
      }
      await sleep(2500);
    } else {
      for (let i = 0; i < 60; i++) {
        await sleep(250);
        if (await evaluate("document.querySelector('canvas')?.dataset.ready === '1'")) break;
      }
    }
    await sleep(600);
    if (process.env.EVAL) console.log(JSON.stringify(await evaluate(process.env.EVAL)));
    const r = await send("Page.captureScreenshot", { format: "webp", quality: 80 });
    writeFileSync(out, Buffer.from(r.data, "base64"));
    console.log("ok", out);
  } else if (mode === "fps") {
    const [w, h, mobile, cpu] = [+a, +b, c === "mobile", +(d || 1)];
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 3 : 2, mobile });
    if (mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    if (cpu > 1) await send("Emulation.setCPUThrottlingRate", { rate: cpu });
    await send("Page.navigate", { url });
    await sleep(4500);
    const measure = (label, scrollY) => evaluate(`(async () => {
      window.scrollTo(0, ${scrollY});
      await new Promise(r => setTimeout(r, 800));
      return await new Promise(r => { let n = 0, worst = 0, last = performance.now(); const t0 = last;
        function f(now) { n++; worst = Math.max(worst, now - last); last = now;
          if (now - t0 < 3000) requestAnimationFrame(f);
          else { const c = document.querySelector('canvas');
            r({ at: '${label}', fps: +(n / ((now - t0) / 1000)).toFixed(1), worstMs: +worst.toFixed(1),
                canvas: c ? c.width + 'x' + c.height : 'no canvas (lite tier)', coarse: matchMedia('(pointer: coarse)').matches }); } }
        requestAnimationFrame(f); });
    })()`);
    const vh = h;
    const out = [];
    out.push(await measure("surface", 0));
    out.push(await measure("descent", Math.round(vh * 1.2)));
    out.push(await measure("work light", Math.round(vh * 3.0)));
    out.push(await measure("chapter 02", Math.round(vh * 4.4)));
    // continuous scroll through the whole page in 9 s: the number that matters
    out.push(await evaluate(`(async () => {
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 600));
      const max = document.documentElement.scrollHeight - innerHeight;
      return await new Promise(r => { let n = 0, worst = 0, over = 0, last = performance.now(); const t0 = last;
        function f(now) { const dt = now - last; n++; worst = Math.max(worst, dt); if (dt > 25) over++; last = now;
          const k = Math.min(1, (now - t0) / 9000); window.scrollTo(0, max * k);
          if (k < 1) requestAnimationFrame(f);
          else r({ at: 'continuous scroll', fps: +(n / 9).toFixed(1), worstMs: +worst.toFixed(1), framesOver25ms: over, pagePx: max }); }
        requestAnimationFrame(f); });
    })()`));
    out.push({ gl: await evaluate(`(() => { const g = document.createElement('canvas').getContext('webgl'); const x = g && g.getExtension('WEBGL_debug_renderer_info'); return x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : 'n/d'; })()`) });
    console.log(JSON.stringify(out, null, 1));
  }
} finally {
  ws.close();
  proc.kill();
}
