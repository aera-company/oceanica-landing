"use client";

import { useEffect, useRef, useState } from "react";
import { FRAG, VERT } from "./shader";
import { depthAt, lampAt, scene, waterline } from "@/lib/depth";

/* Fixed background for the whole page, in three tiers:
   full   : the shader, reduced render scale, paused when the tab is hidden,
            30 fps cap on touch, fps watchdog that steps itself down;
   lite   : two stills rendered from the same shader, cross-faded by depth;
   static : the same stills without motion (reduced motion, or no WebGL).
   Force one with ?tier=full|lite|static. ?still=<0..1> freezes the shader at
   that point of the hero timeline (used to render the stills). */

export type Tier = "full" | "lite" | "static";

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
    console.warn("[WaterColumn] shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function WaterColumn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deepRef = useRef<HTMLImageElement>(null);
  const [tier, setTier] = useState<Tier | "pending">("pending");
  const [glOn, setGlOn] = useState(false);

  useEffect(() => {
    const announce = (t: Tier) =>
      requestAnimationFrame(() => {
        setTier(t);
        setGlOn(t === "full");
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

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      line: gl.getUniformLocation(prog, "uLine"),
      depth: gl.getUniformLocation(prog, "uDepth"),
      lamp: gl.getUniformLocation(prog, "uLamp"),
      travel: gl.getUniformLocation(prog, "uTravel"),
      reveal: gl.getUniformLocation(prog, "uReveal"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      vel: gl.getUniformLocation(prog, "uVel"),
      speed: gl.getUniformLocation(prog, "uSpeed"),
    };

    const touch = window.matchMedia("(pointer: coarse)").matches;
    const minDt = touch ? 1000 / 30 - 2 : 0;
    const dprCap = touch ? 1.5 : 2;
    let scale = touch ? 0.6 : 0.75;

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
    const draw = (t: number, line: number, depth: number, lamp: number, travel: number, reveal: number, vel = 0, speed = 0) => {
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.line, line);
      gl.uniform1f(u.depth, depth);
      gl.uniform1f(u.lamp, lamp);
      gl.uniform1f(u.travel, travel);
      gl.uniform1f(u.reveal, reveal);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform1f(u.vel, vel);
      gl.uniform1f(u.speed, speed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const drawStill = () => {
      const p = Math.min(1, Math.max(0, parseFloat(stillParam || "0") || 0));
      const crossing = p > 0.03 && p < 0.19 ? 0.8 : 0;
      const sinking = p > 0.2 && p < 0.7 ? 0.5 : 0;
      draw(21, waterline(p), depthAt(p), lampAt(p), p * 9, 1, crossing, sinking);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (still) drawStill();
    });
    ro.observe(canvas);
    resize();

    if (still) {
      document.documentElement.dataset.still = "1";
      drawStill();
      canvas.dataset.ready = "1";
      announce("full");
      return () => {
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

    const start = performance.now();
    /* eased copies: the water has mass, it never snaps to the scroll position */
    let line = scene.line;
    let depth = scene.depth;
    let lamp = scene.lamp;
    let travel = scene.travel;
    /* motion energy: how fast the line and the camera are moving, smoothed */
    let vel = 0;
    let speed = 0;

    function frame(now: number) {
      raf = 0;
      if (!running) return;
      if (now - lastDraw >= minDt) {
        const t = (now - start) / 1000;
        const dLine = (scene.line - line) * 0.11;
        const dTravel = (scene.travel - travel) * 0.09;
        line += dLine;
        depth += (scene.depth - depth) * 0.11;
        lamp += (scene.lamp - lamp) * 0.08;
        travel += dTravel;
        vel += (Math.min(1, Math.abs(dLine) * 90) - vel) * 0.06;
        speed += (Math.min(1, Math.abs(dTravel) * 22) - speed) * 0.1;
        mouse.x += (mouse.tx - mouse.x) * 0.03;
        mouse.y += (mouse.ty - mouse.y) * 0.03;
        const r = Math.min(1, t / 2.4);
        draw(t, line, depth, lamp, travel, 1 - Math.pow(1 - r, 3), vel, speed);
        scene.onLine?.(line, t);
        lastDraw = now;

        if (t > 1.2 && !settled) {
          if (samples === 0) sampleStart = now;
          samples++;
          if (samples === 61) {
            const avg = (now - sampleStart) / 60;
            if (avg > target * 1.6) {
              if (scale > 0.5) {
                scale = 0.5;
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
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  /* lite: cross-fade surface still into deep still as the camera goes down */
  useEffect(() => {
    if (tier !== "lite") return;
    let raf = 0;
    const tick = () => {
      if (deepRef.current) deepRef.current.style.opacity = String(Math.min(1, scene.depth / 260 + Math.max(0, scene.line) * 0.6));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tier]);

  const images = tier === "lite" || tier === "static";

  return (
    <div className="water" aria-hidden="true">
      {!images && <canvas ref={canvasRef} className="water-layer" style={{ opacity: glOn ? 1 : 0 }} />}
      {images && (
        <>
          <picture>
            <source media="(max-aspect-ratio: 3/4)" srcSet="/depth/still-surface-portrait.webp" />
            <img src="/depth/still-surface.webp" alt="" decoding="async" className="water-layer water-img" />
          </picture>
          {tier === "lite" && (
            <picture>
              <source media="(max-aspect-ratio: 3/4)" srcSet="/depth/still-deep-portrait.webp" />
              <img ref={deepRef} src="/depth/still-deep.webp" alt="" decoding="async" className="water-layer water-img" style={{ opacity: 0 }} />
            </picture>
          )}
        </>
      )}
    </div>
  );
}
