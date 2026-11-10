/* Water column. One full-screen quad, WebGL 1, no dependencies.
   The picture is a split shot: everything above uLine is the surface world
   (sky, horizon, sea), everything below is the water seen from inside.
   Scroll raises the line, then drives depth, light loss and particle travel.
   Nothing here depicts an Oceânica asset: it is water, light and atmosphere only. */

export const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uLine;    // waterline, screen y in [-0.5, 0.5] units of height
uniform float uDepth;   // camera depth in metres
uniform float uLamp;    // 0..1 work light
uniform float uTravel;  // distance travelled down, drives particle parallax
uniform float uReveal;  // 0..1 intro
uniform float uVel;     // 0..1 how fast the waterline is moving
uniform float uSpeed;   // 0..1 how fast the camera is sinking
uniform vec2  uMouse;

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
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float wave(float x, float t){
  return 0.011 * sin(x * 4.6 + t * 0.85)
       + 0.006 * sin(x * 10.3 - t * 1.30)
       + 0.003 * sin(x * 22.0 + t * 2.10);
}

/* on portrait screens the sun moves in so it stays inside the frame */
float sunK(){ return clamp(uRes.x / uRes.y / 1.6, 0.26, 1.0); }

/* ---------- sky by direction: first light, sun just under the horizon ---------- */
vec3 sky(vec3 d, float t, float clouds){
  vec3 sun = normalize(vec3(0.40 * sunK(), 0.030, 1.0));
  float el = max(d.y, 0.0);
  vec3 top = vec3(0.016, 0.031, 0.046);
  vec3 hz  = vec3(0.470, 0.560, 0.580);
  float g = exp(-el * 6.0);
  vec3 c = mix(top, hz, g);
  float sd = max(dot(normalize(d), sun), 0.0);
  c += vec3(0.74, 0.60, 0.42) * pow(sd, 26.0) * 0.50;
  c += vec3(1.00, 0.86, 0.66) * pow(sd, 520.0) * 0.55;
  if (clouds > 0.5) {
    vec2 cp = d.xz / (el + 0.13) * 0.50 + vec2(t * 0.004, 0.0);
    float cl = fbm(cp * vec2(1.0, 1.7) + 3.0);
    float m = smoothstep(0.44, 0.74, cl);
    c = mix(c, c * 0.40 + vec3(0.006, 0.010, 0.014), m * (1.0 - g * 0.72));
    /* cloud edges catch the low light */
    c += vec3(0.80, 0.62, 0.42) * smoothstep(0.40, 0.50, cl) * (1.0 - smoothstep(0.50, 0.64, cl)) * pow(sd, 5.0) * 0.20;
  }
  return c;
}

/* ---------- above the line: open sea, reflected sky, Fresnel ---------- */
vec3 surfaceWorld(vec2 uv, float t){
  float hzY = 0.115 - uMouse.y * 0.006;
  vec3 rd = normalize(vec3(uv.x, uv.y - hzY, 1.25));
  if (rd.y >= 0.0) return sky(rd, t, 1.0);

  float th = 0.16 / (-rd.y);
  vec2 P = rd.xz * th;
  float det = 1.0 / (1.0 + th * th * 0.022);

  vec2 q = rot(0.42) * (P * vec2(1.55, 2.9)) + vec2(t * 0.10, t * 0.30);
  float e = 0.07;
  float h  = fbm(q);
  float hx = fbm(q + vec2(e, 0.0)) - h;
  float hy = fbm(q + vec2(0.0, e)) - h;
  vec2 q2 = rot(-0.3) * P * 0.55 + vec2(-t * 0.05, t * 0.11);
  float s0 = noise(q2);
  float sx = noise(q2 + vec2(0.12, 0.0)) - s0;
  float sy = noise(q2 + vec2(0.0, 0.12)) - s0;

  vec3 n = normalize(vec3(-(hx * 6.5 + sx * 3.2) * det, 1.0, -(hy * 6.5 + sy * 3.2) * det));
  float F = 0.03 + 0.97 * pow(1.0 - max(dot(-rd, n), 0.0), 5.0);
  vec3 R = reflect(rd, n);
  R.y = abs(R.y) + 0.004;
  vec3 refl = sky(R, t, 0.0);
  vec3 body = vec3(0.005, 0.026, 0.038);
  vec3 c = mix(body, refl, F);
  /* far water dissolves into the horizon */
  c = mix(c, sky(vec3(rd.x, 0.002, rd.z), t, 0.0) * 0.82, smoothstep(5.0, 46.0, th) * 0.75);
  return c;
}

/* ---------- marine snow: hashed cells, parallax tied to travel, streak with speed ---------- */
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
  float d = length(dd);
  return step(0.70, h) * smoothstep(sz, sz * 0.15, d) * (0.35 + 0.65 * hash(i + seed + 9.0)) / sqrt(stretch);
}

/* ---------- air carried under when the lens goes through the surface ---------- */
float bubbles(vec2 uv, float scale, float rise, float seed){
  vec2 p = uv * scale;
  p.y -= uTime * rise;
  p.x += sin(uTime * 1.7 + floor(p.y) * 2.1 + seed) * 0.12;
  vec2 i = floor(p), f = fract(p) - 0.5;
  float h = hash(i + seed);
  vec2 o = (vec2(hash(i + seed + 3.1), hash(i + seed + 6.4)) - 0.5) * 0.6;
  float sz = mix(0.05, 0.16, hash(i + seed + 8.8));
  float d = length(f - o);
  float ring = smoothstep(sz, sz * 0.86, d) * (0.25 + 0.75 * smoothstep(sz * 0.45, sz * 0.95, d));
  return step(0.55, h) * ring;
}

/* ---------- one work-light beam: gaussian across, inverse-square along ---------- */
float beam(vec2 uv, vec2 src, vec2 dir, float spread){
  vec2 v = uv - src;
  float along = dot(v, dir);
  float perp = dot(v, vec2(-dir.y, dir.x));
  float w = 0.018 + max(along, 0.0) * spread;
  float core = exp(-(perp * perp) / (w * w * 0.55));
  float fall = 1.0 / (1.0 + along * along * 1.25);
  return core * fall * smoothstep(-0.02, 0.07, along);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float asp = uRes.x / uRes.y;
  float t = uTime;

  float wl = uLine + wave(uv.x, t);
  float above = smoothstep(-0.0012, 0.0012, uv.y - wl);
  vec3 outc = vec3(0.0);

  if (above < 1.0) {
    /* ----- underwater ----- */
    float dep = max(uDepth, 0.0);
    float L = exp(-dep / 210.0);
    float up = clamp(uv.y + 0.5, 0.0, 1.0);
    float dist = max(wl - uv.y, 0.0);

    vec3 shallow = vec3(0.014, 0.185, 0.245);
    vec3 mid     = vec3(0.004, 0.066, 0.108);
    vec3 abyss   = vec3(0.004, 0.015, 0.024);
    vec3 col = mix(mid, shallow, exp(-dist * 2.1)) * L;
    col += abyss * (0.60 + 1.25 * up);

    /* underside of the surface: ripples compressed toward the line */
    float nearS = exp(-dep / 16.0);
    float pd = 1.0 / (dist * 8.0 + 0.11);
    float rip = fbm(vec2(uv.x * pd * 1.5 + t * 0.05, pd * 2.4 - t * 0.28));
    col += vec3(0.36, 0.84, 0.80) * pow(rip, 3.4) * exp(-dist * 7.5) * nearS * 1.5;

    /* light shafts fanning out from the sun above the surface */
    vec2 sp = vec2(0.34 * sunK(), wl + 0.80);
    vec2 dv = uv - sp;
    float ang = atan(dv.x, -dv.y);
    float ry = noise(vec2(ang * 13.0 + t * 0.05, 1.3)) * noise(vec2(ang * 31.0 - t * 0.08, 7.7));
    ry = pow(ry, 1.25) * 3.4;
    col += vec3(0.20, 0.74, 0.68) * ry * exp(-dist * 1.5) * exp(-dep / 70.0) * (0.35 + L) * 0.26;

    /* particles */
    float s1 = snow(uv, 26.0, 0.35, 3.0, 1.0);
    float s2 = snow(uv, 15.0, 0.62, 17.0, 1.0);
    float s3 = snow(uv, 8.0, 1.05, 41.0, 1.0);
    float s4 = snow(uv, 3.2, 2.20, 77.0, 2.6);
    float sn = s1 * 0.45 + s2 * 0.7 + s3 * 0.95;

    /* work light: two beams and a halo from just outside the frame */
    vec2 src = vec2(asp * 0.5 + 0.06, -0.36);
    vec2 dir = normalize(vec2(-1.0, 0.34) + uMouse * vec2(0.03, -0.03));
    vec2 v0 = uv - src;
    float al = dot(v0, dir);
    float dust = 0.66 + 0.34 * noise(vec2(al * 5.0 - t * 0.22, dot(v0, vec2(-dir.y, dir.x)) * 26.0 + t * 0.05));
    float bA = beam(uv, src, dir, 0.165);
    float bB = beam(uv, src + vec2(0.02, 0.07), normalize(dir + vec2(0.0, 0.20)), 0.115);
    float halo = exp(-length(v0) * 1.9);
    float lampI = (bA + bB * 0.8) * dust * uLamp;
    vec3 lampCol = mix(vec3(0.42, 0.80, 0.76), vec3(0.90, 0.98, 0.95), clamp(lampI * 1.4, 0.0, 1.0));

    float ambient = L * 0.55 + 0.085;
    col += vec3(0.75, 0.95, 0.92) * sn * ambient;
    col += vec3(0.55, 0.80, 0.78) * s4 * (ambient * 0.20);
    col += lampCol * lampI * 0.78;
    col += vec3(0.50, 0.86, 0.80) * halo * uLamp * 0.24;
    col += vec3(0.92, 1.00, 0.97) * (sn * 2.2 + s4 * 0.45) * (lampI + halo * uLamp * 0.25);

    /* crossing: bubbles and a short bloom under the line, only while it moves */
    float bub = bubbles(uv, 15.0, 1.6, 5.0) + bubbles(uv, 27.0, 2.3, 23.0) * 0.7;
    float band = exp(-dist * 5.5) * uVel;
    col += vec3(0.62, 0.92, 0.90) * bub * band * (0.25 + L) * 0.65;
    col += vec3(0.30, 0.70, 0.68) * exp(-dist * 16.0) * uVel * L * 0.35;

    outc = col;
    /* bright meniscus seen from below */
    outc += vec3(0.62, 0.86, 0.84) * exp(-dist * 620.0) * 0.36 * (0.4 + L);
  }

  if (above > 0.0) {
    vec3 top = surfaceWorld(uv, t);
    /* dark lip of water climbing the lens, thin bright edge on top of it */
    top *= 1.0 - 0.50 * exp(-max(uv.y - wl, 0.0) * 64.0);
    top += vec3(0.62, 0.86, 0.84) * exp(-abs(uv.y - wl) * 620.0) * 0.30;
    outc = mix(outc, top, above);
  }

  /* vignette, intro, dither against banding */
  vec2 vv = uv * vec2(0.9 / max(asp, 0.6), 1.0);
  outc *= clamp(1.0 - 0.68 * dot(vv, vv), 0.0, 1.0);
  outc *= uReveal;
  outc += (hash(gl_FragCoord.xy + fract(t) * 91.7) - 0.5) / 128.0;
  gl_FragColor = vec4(max(outc, 0.0), 1.0);
}
`;
