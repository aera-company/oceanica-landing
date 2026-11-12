/* V02 film shader. One full-screen quad, WebGL 1, no dependencies.
   It does not invent anything: every object on screen comes from a real
   photograph. The shader only supplies what a camera and the sea would add:
   framing, grade, moving water on the sea areas, the waterline, loss of
   daylight, the vehicle's own lamps, suspended particles. */

export const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform sampler2D uT;      // picture above the waterline
uniform sampler2D uU;      // picture below it (also the dissolve target)
uniform sampler2D uM;      // subject mask of the vessel picture
uniform sampler2D uN;      // subject mask of the diver picture
uniform float uTAsp, uUAsp;
uniform vec3  uTCam, uUCam;  // focus x, focus y (up), zoom
uniform float uTKind, uUKind; // 0 vessel, 1 diver, 2 rov, 3 work class
uniform float uDissolve, uFlare, uLine, uEmerge, uDark, uGlow, uReveal;
uniform float uDepth, uTravel, uVel, uSpeed, uVeil, uIntro;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++){ s += a * noise(p); p = p * 2.03 + vec2(11.7, 3.1); a *= 0.5; }
  return s;
}
float wave(float x, float t){
  return 0.011 * sin(x * 4.6 + t * 0.85)
       + 0.006 * sin(x * 10.3 - t * 1.30)
       + 0.003 * sin(x * 22.0 + t * 2.10);
}

/* ---------- camera on a photograph: cover fit, focus point, zoom ---------- */
vec2 coverK(float asp, float zoom){
  float sa = uRes.x / uRes.y;
  return vec2(min(1.0, sa / asp), min(1.0, asp / sa)) / zoom;
}
vec2 camCenter(float asp, vec3 cam){
  vec2 k = coverK(asp, cam.z);
  return clamp(cam.xy + uMouse * vec2(-0.004, 0.004) / cam.z, k * 0.5, 1.0 - k * 0.5);
}
vec2 imgUV(vec2 s, float asp, vec3 cam){
  return camCenter(asp, cam) + s * coverK(asp, cam.z);
}
/* where a point of the picture lands on screen, in height units */
vec2 toScreen(vec2 iu, float asp, vec3 cam){
  vec2 s = (iu - camCenter(asp, cam)) / coverK(asp, cam.z);
  return vec2(s.x * uRes.x / uRes.y, s.y);
}

/* ---------- grade: one look across four sources ---------- */
vec3 grade(vec3 c, float kind){
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  if (kind < 0.5) {            /* vessel at dusk: deepen the sea, keep the hull */
    c = mix(vec3(l), c, 1.10);
    c *= vec3(0.78, 0.86, 0.95) * 0.94;
    c = pow(max(c, 0.0), vec3(1.22));
  } else if (kind < 1.5) {     /* diver in daylight: deeper, cooler sea so the helmet carries the frame */
    float sea = smoothstep(0.08, 0.30, c.b - c.r);
    c = mix(c, c * vec3(0.62, 0.86, 1.0) * 0.86, sea);
    c = mix(vec3(l), c, 1.06);
    c = pow(max(c, 0.0), vec3(1.16)) * 0.96;
  } else if (kind < 2.5) {     /* shallow-water blue pulled toward deep teal */
    c = mix(vec3(l), c, 0.74);
    c *= vec3(0.60, 0.88, 0.90);
    c = pow(max(c, 0.0), vec3(1.22));
  } else {                     /* work class, lit by its own lamps */
    /* the grab's violet water goes to deep teal; yellows and steel keep their colour */
    float sh = 1.0 - smoothstep(0.04, 0.30, l);
    c = mix(c, vec3(l) * vec3(0.55, 0.95, 1.05), sh * 0.85);
    c = mix(vec3(l), c, 1.04);
    c *= vec3(0.96, 1.02, 1.03) * 1.10;
    c = pow(max(c, 0.0), vec3(1.14));
    c = c / (1.0 + max(l - 0.82, 0.0) * 0.9);   /* hold the lamp highlights */
  }
  return c;
}

/* where the sea is in a picture, so only the sea moves */
float seaMask(vec2 iu, float kind){
  float yd = 1.0 - iu.y;
  if (kind < 0.5) {
    float subject = texture2D(uM, iu).r;
    return (1.0 - smoothstep(0.12, 0.55, subject)) * smoothstep(0.235, 0.275, yd);
  }
  if (kind < 1.5) {
    return 1.0 - smoothstep(0.12, 0.55, texture2D(uN, iu).r);
  }
  return 0.0;
}

vec3 photo(sampler2D tex, vec2 iu, float kind){
  float m = seaMask(iu, kind);
  float yd = 1.0 - iu.y;
  float persp = 1.0 / max(yd - 0.20, 0.05);
  vec2 q = vec2(iu.x * persp * 5.0, persp * 8.0 + uTime * 0.32);
  float amp = 0.0032;
  if (kind > 0.5 && kind < 1.5) {
    /* close-up sea with no horizon: a flat, slow swell */
    q = vec2(iu.x * 11.0 + uTime * 0.05, iu.y * 17.0 + uTime * 0.38);
    amp = 0.0042;
  }
  vec2 d = vec2(noise(q) - 0.5, noise(q + 17.3) - 0.5) * amp * m;
  vec3 c = texture2D(tex, iu + d).rgb;
  if (kind > 2.5) {
    /* soft source: recover edge contrast against a small cross blur */
    vec2 px = vec2(1.6 / 3800.0, 1.6 / 1622.0);
    vec3 b = (texture2D(tex, iu + vec2(px.x, 0.0)).rgb + texture2D(tex, iu - vec2(px.x, 0.0)).rgb
            + texture2D(tex, iu + vec2(0.0, px.y)).rgb + texture2D(tex, iu - vec2(0.0, px.y)).rgb) * 0.25;
    c += (c - b) * 0.55;
  }
  c *= 1.0 + (noise(q * 1.7 + uTime * 0.2) - 0.5) * 0.12 * m;
  return grade(c, kind);
}

/* ---------- suspended particles, parallax tied to travel ---------- */
float snow(vec2 uv, float scale, float speed, float seed, float soft){
  vec2 p = uv * scale;
  p.y += uTravel * speed + uTime * 0.018 * speed;
  p.x += uMouse.x * 0.03 * speed + sin(uTime * 0.07 + seed) * 0.06;
  vec2 i = floor(p), f = fract(p) - 0.5;
  float h = hash(i + seed);
  vec2 o = (vec2(hash(i + seed + 1.3), hash(i + seed + 2.7)) - 0.5) * 0.6;
  float sz = mix(0.02, 0.07, hash(i + seed + 5.1)) * soft;
  vec2 dd = f - o;
  float stretch = 1.0 + uSpeed * speed * 5.0;
  dd.y /= stretch;
  return step(0.70, h) * smoothstep(sz, sz * 0.15, length(dd)) * (0.35 + 0.65 * hash(i + seed + 9.0)) / sqrt(stretch);
}
float bubbles(vec2 uv, float scale, float rise, float seed){
  vec2 p = uv * scale;
  p.y -= uTime * rise;
  p.x += sin(uTime * 1.7 + floor(p.y) * 2.1 + seed) * 0.12;
  vec2 i = floor(p), f = fract(p) - 0.5;
  float h = hash(i + seed);
  vec2 o = (vec2(hash(i + seed + 3.1), hash(i + seed + 6.4)) - 0.5) * 0.6;
  float sz = mix(0.05, 0.16, hash(i + seed + 8.8));
  float d = length(f - o);
  return step(0.55, h) * smoothstep(sz, sz * 0.86, d) * (0.25 + 0.75 * smoothstep(sz * 0.45, sz * 0.95, d));
}

void main(){
  vec2 s = gl_FragCoord.xy / uRes - 0.5;
  float asp = uRes.x / uRes.y;
  vec2 uv = vec2(s.x * asp, s.y);
  float t = uTime;

  float wl = uLine + wave(uv.x, t);
  float above = smoothstep(-0.0012, 0.0012, uv.y - wl);
  vec2 iuU = imgUV(s, uUAsp, uUCam);
  vec3 outc = vec3(0.0);

  if (above < 1.0) {
    /* ----- under the surface ----- */
    float dep = max(uDepth, 0.0);
    float L = exp(-dep / 210.0);
    float up = clamp(uv.y + 0.5, 0.0, 1.0);
    float dist = max(wl - uv.y, 0.0);

    vec3 shallow = vec3(0.014, 0.185, 0.245);
    vec3 mid     = vec3(0.004, 0.066, 0.108);
    vec3 abyss   = vec3(0.004, 0.015, 0.024);
    vec3 col = mix(mid, shallow, exp(-dist * 2.1)) * L;
    col += abyss * (0.60 + 1.25 * up);

    float nearS = exp(-dep / 16.0);
    float pd = 1.0 / (dist * 8.0 + 0.11);
    float rip = fbm(vec2(uv.x * pd * 1.5 + t * 0.05, pd * 2.4 - t * 0.28));
    col += vec3(0.36, 0.84, 0.80) * pow(rip, 3.4) * exp(-dist * 7.5) * nearS * 1.5;

    vec2 dv = uv - vec2(0.22, wl + 0.80);
    float ang = atan(dv.x, -dv.y);
    float ry = noise(vec2(ang * 13.0 + t * 0.05, 1.3)) * noise(vec2(ang * 31.0 - t * 0.08, 7.7));
    float shafts = pow(ry, 1.25) * 3.4 * exp(-dist * 1.5) * exp(-dep / 70.0) * (0.35 + L);
    col += vec3(0.20, 0.74, 0.68) * shafts * 0.26;

    /* the real picture, seen through that water */
    vec3 ph = photo(uU, iuU, uUKind);
    float lit = 1.0;      /* how much light reaches the particles here */
    if (uUKind > 1.5 && uUKind < 2.5) {
      /* the Lynx carries two lamps: as daylight goes, they are all that is left */
      vec2 a = toScreen(vec2(0.410, 0.352), uUAsp, uUCam);
      vec2 b = toScreen(vec2(0.645, 0.358), uUAsp, uUCam);
      float da = length(uv - a), db = length(uv - b);
      float z = uUCam.z;
      float area = exp(-da * da * 7.0 / (z * z)) + exp(-db * db * 7.0 / (z * z));
      float core = exp(-da * da * 110.0 / (z * z)) + exp(-db * db * 110.0 / (z * z));
      float keep = mix(1.0, clamp(area, 0.0, 1.0) * 0.85, uDark);
      ph *= keep * mix(1.0, uGlow, uDark);
      ph += vec3(0.78, 0.96, 1.00) * core * uGlow * (0.20 + 0.80 * uDark) * (0.92 + 0.08 * sin(t * 7.0));
      lit = mix(1.0, area * uGlow, uDark);
      /* shafts still fall across the vehicle while it is shallow */
      ph += vec3(0.20, 0.74, 0.68) * shafts * 0.10 * (1.0 - uDark);
    } else if (uUKind > 2.5) {
      /* the work light arrives: the frame is uncovered from the lamp outward */
      vec2 lp = toScreen(vec2(0.235, 0.52), uUAsp, uUCam);
      float rad = 0.10 + uReveal * 2.4;
      float lm = smoothstep(rad, rad * 0.30, length(uv - lp));
      ph *= lm;
      /* water between the lens and the subject: backscatter that drifts, thicker away from the lamp */
      float hz = fbm(uv * 1.7 + vec2(t * 0.022, -t * 0.016));
      float far = smoothstep(0.15, 1.3, length(uv - lp));
      ph += vec3(0.030, 0.085, 0.100) * hz * lm * (0.35 + far);
      ph *= 1.0 - 0.34 * far * far;
      /* fine grain reads as sensor, and hides what compression is left */
      ph += (hash(gl_FragCoord.xy * 0.71 + fract(t * 7.3) * 53.0) - 0.5) * 0.045 * lm * (0.4 + dot(ph, vec3(0.33)));
      ph += vec3(0.55, 0.90, 0.86) * exp(-pow(length(uv - lp) - rad * 0.62, 2.0) * 60.0) * 0.05 * (1.0 - uReveal) * uReveal * 4.0;
      lit = lm;
    }
    ph *= 1.0 - uVeil * 0.93;
    col = mix(col, ph, uEmerge);

    float s1 = snow(uv, 26.0, 0.35, 3.0, 1.0);
    float s2 = snow(uv, 15.0, 0.62, 17.0, 1.0);
    float s3 = snow(uv, 8.0, 1.05, 41.0, 1.0);
    float s4 = snow(uv, 3.2, 2.20, 77.0, 2.6);
    float sn = s1 * 0.45 + s2 * 0.7 + s3 * 0.95;
    float ambient = (L * 0.55 + 0.07) * mix(1.0, 0.25 + lit, uEmerge) * (1.0 - uVeil * 0.5);
    col += vec3(0.75, 0.95, 0.92) * sn * ambient;
    col += vec3(0.55, 0.80, 0.78) * s4 * ambient * 0.22;

    float bub = bubbles(uv, 15.0, 1.6, 5.0) + bubbles(uv, 27.0, 2.3, 23.0) * 0.7;
    col += vec3(0.62, 0.92, 0.90) * bub * exp(-dist * 5.5) * uVel * (0.25 + L) * 0.65;
    col += vec3(0.30, 0.70, 0.68) * exp(-dist * 16.0) * uVel * L * 0.35;

    outc = col + vec3(0.62, 0.86, 0.84) * exp(-dist * 620.0) * 0.36 * (0.4 + L);
  }

  if (above > 0.0) {
    /* ----- above the surface: the photograph ----- */
    vec3 top = photo(uT, imgUV(s, uTAsp, uTCam), uTKind);
    if (uDissolve > 0.0) top = mix(top, photo(uU, iuU, uUKind), uDissolve);
    vec2 fc = uv - vec2(0.10, 0.10);
    /* night falls on the vessel, daylight comes up on the diver */
    float ember = exp(-dot(fc, fc) * 5.0);
    top = top * (1.0 - 0.94 * uFlare) + vec3(0.90, 0.46, 0.16) * uFlare * ember * 0.10;
    top *= 1.0 - 0.50 * exp(-max(uv.y - wl, 0.0) * 64.0);
    top += vec3(0.62, 0.86, 0.84) * exp(-abs(uv.y - wl) * 620.0) * 0.30;
    outc = mix(outc, top, above);
  }

  vec2 vv = uv * vec2(0.9 / max(asp, 0.6), 1.0);
  outc *= clamp(1.0 - 0.62 * dot(vv, vv), 0.0, 1.0);
  outc *= uIntro;
  outc += (hash(gl_FragCoord.xy + fract(t) * 91.7) - 0.5) / 128.0;
  gl_FragColor = vec4(max(outc, 0.0), 1.0);
}
`;
