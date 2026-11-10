"use client";

import { useEffect, useRef, useState } from "react";
import { FRAG, VERT } from "./shader";
import { IMAGES, filmAt, scene, type Img } from "@/lib/film";

/* Fixed picture layer for the whole page, in three tiers:
   full   : the shot player (WebGL), reduced render scale, paused when hidden,
            30 fps cap on touch, fps watchdog that steps itself down;
   lite   : five stills rendered from the same player, cross-faded by scroll;
   static : the first still only (reduced motion, or no WebGL).
   Force one with ?tier=full|lite|static. ?still=<0..1> freezes the player at
   that point of the timeline and hides the HTML (used to render the stills). */

export type Tier = "full" | "lite" | "static";
export const STILL_POINTS = [0.06, 0.34, 0.62, 0.82, 0.97];
const KIND: Record<Img, number> = { vessel: 0, deck: 1, rov: 2, work: 3 };
const ORDER: Img[] = ["vessel", "deck", "rov", "work"];

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function detectTier(): Tier {
  const forced = new URLSearchParams(window.location.search).get("tier");
  if (forced === "full" || forced === "lite" || forced === "static") return forced;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return "lite";
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return "lite";
  return "full";
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[Film] shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function Film() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [tier, setTier] = useState<Tier | "pending">("pending");
  const [glOn, setGlOn] = useState(false);

  useEffect(() => {
    const announce = (t: Tier) =>
      requestAnimationFrame(() => {
        setTier(t);
        document.documentElement.dataset.tier = t;
      });

    const t0 = detectTier();
    if (t0 !== "full") {
      announce(t0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const stillParam = new URLSearchParams(window.location.search).get("still");
    const still = stillParam !== null;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: still,
    }) as WebGLRenderingContext | null;

    const fail = () => void announce("static");
    if (!gl) return fail();
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return fail();
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fail();
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const names = [
      "uRes", "uTime", "uMouse", "uT", "uU", "uM", "uTAsp", "uUAsp", "uTCam", "uUCam", "uTKind", "uUKind",
      "uDissolve", "uFlare", "uLine", "uEmerge", "uDark", "uGlow", "uReveal", "uDepth", "uTravel", "uVel", "uSpeed", "uVeil", "uIntro",
    ] as const;
    const u = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)])) as Record<(typeof names)[number], WebGLUniformLocation | null>;
    gl.uniform1i(u.uT, 0);
    gl.uniform1i(u.uU, 1);
    gl.uniform1i(u.uM, 2);

    /* textures: a 1px dark placeholder until the photograph arrives */
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    const makeTex = () => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([3, 9, 14, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    };
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    const tex = {} as Record<Img | "mask", WebGLTexture>;
    const ready = {} as Record<Img | "mask", boolean>;
    let alive = true;
    let pendingLoads = 0;

    const load = (key: Img | "mask", src: string) =>
      new Promise<void>((resolve) => {
        pendingLoads++;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!alive) return resolve();
          let source: TexImageSource = img;
          const big = Math.max(img.naturalWidth, img.naturalHeight);
          if (big > maxTex) {
            const k = maxTex / big;
            const c = document.createElement("canvas");
            c.width = Math.round(img.naturalWidth * k);
            c.height = Math.round(img.naturalHeight * k);
            c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
            source = c;
          }
          gl.bindTexture(gl.TEXTURE_2D, tex[key]);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
          ready[key] = true;
          pendingLoads--;
          resolve();
        };
        img.onerror = () => {
          pendingLoads--;
          resolve();
        };
        img.src = src;
      });

    for (const k of [...ORDER, "mask"] as (Img | "mask")[]) tex[k] = makeTex();
    /* the first shot loads first; the rest follow while the visitor reads the headline */
    const first = Promise.all([load("vessel", IMAGES.vessel.src), load("mask", IMAGES.vessel.mask!)]);
    const rest = first.then(() => Promise.all([load("deck", IMAGES.deck.src), load("rov", IMAGES.rov.src), load("work", IMAGES.work.src)]));

    const touch = window.matchMedia("(pointer: coarse)").matches;
    const minDt = touch ? 1000 / 30 - 2 : 0;
    const dprCap = touch ? 1.75 : 2;
    let scale = touch ? 0.8 : 1; /* photographs need real pixels; the watchdog lowers this if needed */

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap) * scale;
      const w = Math.max(2, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(2, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const draw = (t: number, p: number, past: number, intro: number, vel: number, speed: number) => {
      const tall = canvas.width / canvas.height < 0.8;
      const f = filmAt(p, tall, past);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex[f.top]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, tex[f.under]);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, tex.mask);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, t);
      gl.uniform2f(u.uMouse, mouse.x, mouse.y);
      gl.uniform1f(u.uTAsp, IMAGES[f.top].asp);
      gl.uniform1f(u.uUAsp, IMAGES[f.under].asp);
      gl.uniform3f(u.uTCam, f.topCam[0], 1 - f.topCam[1], f.topCam[2]);
      gl.uniform3f(u.uUCam, f.underCam[0], 1 - f.underCam[1], f.underCam[2]);
      gl.uniform1f(u.uTKind, KIND[f.top]);
      gl.uniform1f(u.uUKind, KIND[f.under]);
      /* never dissolve or surface a picture that has not arrived yet */
      const ok = ready[f.under] ? 1 : 0;
      gl.uniform1f(u.uDissolve, f.dissolve * ok);
      gl.uniform1f(u.uFlare, f.flare);
      gl.uniform1f(u.uLine, f.line);
      gl.uniform1f(u.uEmerge, f.emerge * ok);
      gl.uniform1f(u.uDark, f.dark);
      gl.uniform1f(u.uGlow, f.glow);
      gl.uniform1f(u.uReveal, f.reveal);
      gl.uniform1f(u.uDepth, f.depth);
      gl.uniform1f(u.uTravel, f.travel);
      gl.uniform1f(u.uVel, vel);
      gl.uniform1f(u.uSpeed, speed);
      gl.uniform1f(u.uVeil, f.veil);
      gl.uniform1f(u.uIntro, intro);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return f;
    };

    const stillP = Math.min(1, Math.max(0, parseFloat(stillParam || "0") || 0));
    const drawStill = () => draw(21, stillP, 0, 1, stillP > 0.4 && stillP < 0.52 ? 0.8 : 0, 0);

    const ro = new ResizeObserver(() => {
      resize();
      if (still) drawStill();
    });
    ro.observe(canvas);
    resize();

    if (still) {
      document.documentElement.dataset.still = "1";
      rest.then(() => {
        if (!alive) return;
        drawStill();
        canvas.dataset.ready = "1";
      });
      announce("full");
      requestAnimationFrame(() => setGlOn(true));
      return () => {
        alive = false;
        ro.disconnect();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!touch) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    const target = touch ? 1000 / 30 : 1000 / 60;
    let sampleStart = 0;
    let samples = 0;
    let lastDraw = 0;
    let settled = false;
    let start = 0;
    let shown = false;

    /* the camera has mass: it follows scroll through a short lag */
    let p = scene.p;
    let past = scene.past;
    let vel = 0;
    let speed = 0;
    let lastLine = -0.9;

    function frame(now: number) {
      raf = 0;
      if (!running) return;
      if (now - lastDraw >= minDt) {
        if (!start) start = now;
        const t = (now - start) / 1000;
        const dp = (scene.p - p) * 0.1;
        p += dp;
        past += (scene.past - past) * 0.1;
        mouse.x += (mouse.tx - mouse.x) * 0.03;
        mouse.y += (mouse.ty - mouse.y) * 0.03;
        speed += (Math.min(1, Math.abs(dp) * 260) - speed) * 0.1;
        const intro = ready.vessel ? Math.min(1, t / 1.8) : 0;
        const f = draw(t, p, past, 1 - Math.pow(1 - intro, 3), vel, speed);
        vel += (Math.min(1, Math.abs(f.line - lastLine) * 90) - vel) * 0.06;
        lastLine = f.line;
        scene.onLine?.(f.line, t);
        lastDraw = now;
        if (!shown && ready.vessel) {
          shown = true;
          start = now; /* the intro fade starts when the first picture is in */
          setGlOn(true);
        }

        if (shown && t > 1.6 && !settled && pendingLoads === 0) {
          if (samples === 0) sampleStart = now;
          samples++;
          if (samples === 61) {
            const avg = (now - sampleStart) / 60;
            if (avg > target * 1.6) {
              if (scale > 0.6) {
                scale = Math.max(0.6, scale - 0.2);
                resize();
                samples = 0;
              } else {
                settled = true;
                gl!.getExtension("WEBGL_lose_context")?.loseContext();
                announce("lite");
                return;
              }
            } else {
              settled = true;
            }
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    announce("full");

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  /* lite: the five stills, cross-faded by scroll position */
  useEffect(() => {
    if (tier !== "lite") return;
    let raf = 0;
    const tick = () => {
      const p = scene.p;
      STILL_POINTS.forEach((sp, i) => {
        const el = stillRefs.current[i];
        if (!el || i === 0) return;
        const prev = STILL_POINTS[i - 1];
        const mid = (prev + sp) / 2;
        el.style.opacity = String(Math.min(1, Math.max(0, (p - mid + 0.03) / 0.06)) * (1 - Math.min(1, scene.past * 1.3) * 0.93));
      });
      const first = stillRefs.current[0];
      if (first) first.style.opacity = "1";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tier]);

  const images = tier === "lite" || tier === "static";
  const count = tier === "lite" ? STILL_POINTS.length : 1;

  return (
    <div className="film" aria-hidden="true">
      {!images && <canvas ref={canvasRef} className="film-layer" style={{ opacity: glOn ? 1 : 0 }} />}
      {images &&
        Array.from({ length: count }, (_, i) => (
          <picture key={i}>
            <source media="(max-aspect-ratio: 3/4)" srcSet={`/film/still-${i + 1}-portrait.webp`} />
            <img
              ref={(el) => {
                stillRefs.current[i] = el;
              }}
              src={`/film/still-${i + 1}.webp`}
              alt=""
              decoding="async"
              className="film-layer film-img"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          </picture>
        ))}
    </div>
  );
}
