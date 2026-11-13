// Concept C · the drawn field. One original section drawing in a 1440 × 900 world, reused by every frame.
// Depth is compressed on a log scale: y = 380 + 177.5 · log10(1 + d / 10). Labelled as such on the page.
const SURF = 380;
const Y = (d) => SURF + 177.5 * Math.log10(1 + d / 10);

function seabed() {
  // shelf (about 120 m) on the left, continental slope, deep floor at 3000 m on the right
  const pts = [];
  for (let x = 0; x <= 1440; x += 12) {
    let d;
    if (x < 320) d = 120;
    else if (x < 760) { const t = (x - 320) / 440; d = 120 + (1500 - 120) * (t * t * (3 - 2 * t)); }
    else if (x < 1180) { const t = (x - 760) / 420; d = 1500 + 1500 * (t * t * (3 - 2 * t)); }
    else d = 3000;
    const n = Math.sin(x * 0.045) * 2.2 + Math.sin(x * 0.13 + 1) * 1.1;
    pts.push([x, Y(d) + n]);
  }
  return pts;
}
const bed = seabed();
const bedAt = (x) => { const i = Math.min(bed.length - 1, Math.max(0, Math.round(x / 12))); return bed[i][1]; };

function engraving() {
  // horizontal hairlines that get denser and darker with depth: the tone of the water, drawn
  let s = "";
  for (let y = SURF + 4, k = 0; y < 900; k++) {
    const t = (y - SURF) / (900 - SURF);
    const op = 0.05 + t * 0.32;
    s += `<line x1="0" x2="1440" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#13262e" stroke-opacity="${op.toFixed(3)}" stroke-width=".6"/>`;
    y += 9 - t * 5.2;
  }
  return s;
}

function hatch() {
  let s = "";
  for (let x = -900; x < 1440; x += 7) s += `<line x1="${x}" y1="900" x2="${x + 360}" y2="540" stroke="#13262e" stroke-opacity=".35" stroke-width=".6"/>`;
  return s;
}

const jacket = () => {
  const b = bedAt(210);
  const lv = [350, 420, 490, 545, b];
  const L = (y) => 168 - (y - 340) * 0.13, R = (y) => 252 + (y - 340) * 0.13;
  let s = `<g class="el el-jacket">`;
  s += `<line x1="${L(340)}" y1="340" x2="${L(b)}" y2="${b}"/><line x1="${R(340)}" y1="340" x2="${R(b)}" y2="${b}"/>`;
  s += `<line x1="196" y1="340" x2="${196 - (b - 340) * 0.04}" y2="${b}" stroke-opacity=".45"/><line x1="224" y1="340" x2="${224 + (b - 340) * 0.04}" y2="${b}" stroke-opacity=".45"/>`;
  for (let i = 0; i < lv.length - 1; i++) {
    const a = lv[i], c = lv[i + 1];
    s += `<line x1="${L(a)}" y1="${a}" x2="${R(a)}" y2="${a}"/>`;
    s += `<line x1="${L(a)}" y1="${a}" x2="${R(c)}" y2="${c}" stroke-opacity=".7"/><line x1="${R(a)}" y1="${a}" x2="${L(c)}" y2="${c}" stroke-opacity=".7"/>`;
  }
  // topsides
  s += `<rect x="142" y="326" width="138" height="14" fill="#efeee8"/><rect x="150" y="306" width="46" height="20" fill="#efeee8"/><rect x="200" y="296" width="40" height="30" fill="#efeee8"/><rect x="244" y="312" width="32" height="14" fill="#efeee8"/>`;
  s += `<path d="M206 296 L214 250 L222 296 M208 284 L220 284 M210 272 L218 272 M212 262 L216 262" fill="none"/>`;
  s += `<path d="M150 306 L128 302 L128 298 L154 298" fill="#efeee8"/><path d="M276 318 L318 270" /><path d="M314 266 q5 -10 2 -16 q8 6 3 18 z" fill="#13262e" stroke="none" opacity=".6"/>`;
  return s + `</g>`;
};

const vessel = (x0, w, cls, opts = {}) => {
  // side profile of an offshore support vessel: sheer rising to the bow on the right, accommodation and bridge forward, open aft deck
  const x1 = x0 + w, wl = SURF, X = (t) => x0 + t * w;
  let s = `<g class="el ${cls}">`;
  s += `<path d="M${x0} ${wl - 13} L${X(0.76)} ${wl - 13} Q${X(0.92)} ${wl - 14} ${x1} ${wl - 25} L${X(0.985)} ${wl - 19} Q${X(0.95)} ${wl + 5} ${X(0.89)} ${wl + 8} L${X(0.03)} ${wl + 8} L${x0} ${wl - 1} Z" fill="#efeee8"/>`;
  s += `<path d="M${x0 + 2} ${wl - 7} L${X(0.93)} ${wl - 7}" stroke-opacity=".45"/>`;
  s += `<path d="M${X(0.03)} ${wl + 3} L${X(0.9)} ${wl + 3}" stroke-opacity=".25"/>`;
  // accommodation, three levels and the bridge
  s += `<path d="M${X(0.56)} ${wl - 13} L${X(0.56)} ${wl - 27} L${X(0.87)} ${wl - 27} L${X(0.89)} ${wl - 13}" fill="#efeee8"/>`;
  s += `<path d="M${X(0.6)} ${wl - 27} L${X(0.6)} ${wl - 39} L${X(0.85)} ${wl - 39} L${X(0.87)} ${wl - 27}" fill="#efeee8"/>`;
  s += `<path d="M${X(0.63)} ${wl - 39} L${X(0.63)} ${wl - 49} L${X(0.84)} ${wl - 49} L${X(0.87)} ${wl - 39}" fill="#efeee8"/>`;
  for (const [y, a, b] of [[wl - 20, 0.58, 0.86], [wl - 33, 0.62, 0.84], [wl - 44, 0.65, 0.84]]) s += `<line x1="${X(a)}" x2="${X(b)}" y1="${y}" y2="${y}" stroke-dasharray="2.2 1.6" stroke-opacity=".7"/>`;
  s += `<line x1="${X(0.72)}" y1="${wl - 49}" x2="${X(0.72)}" y2="${wl - 76}"/><line x1="${X(0.68)}" y1="${wl - 68}" x2="${X(0.76)}" y2="${wl - 68}"/><line x1="${X(0.7)}" y1="${wl - 60}" x2="${X(0.74)}" y2="${wl - 60}"/>`;
  s += `<rect x="${X(0.585)}" y="${wl - 36}" width="${w * 0.02 + 2}" height="9" fill="#efeee8"/>`;
  if (opts.heli) s += `<path d="M${X(0.8)} ${wl - 55} L${X(1.0)} ${wl - 55} M${X(0.84)} ${wl - 55} L${X(0.87)} ${wl - 39} M${X(0.96)} ${wl - 55} L${X(0.94)} ${wl - 26}" stroke-opacity=".9"/>`;
  // aft deck: containers, crane, A-frame
  for (let i = 0; i < 3; i++) s += `<rect x="${X(0.1 + i * 0.075)}" y="${wl - 20}" width="${w * 0.065}" height="7" fill="#efeee8" stroke-opacity=".7"/>`;
  if (opts.crane) s += `<path d="M${X(0.42)} ${wl - 13} L${X(0.42)} ${wl - 30} L${X(0.45)} ${wl - 30} L${X(0.45)} ${wl - 13}" fill="#efeee8"/><path d="M${X(0.435)} ${wl - 30} L${X(0.16)} ${wl - 70}"/><line x1="${X(0.16)}" y1="${wl - 70}" x2="${X(0.16)}" y2="${wl - 44}" stroke-opacity=".55"/>`;
  if (opts.aframe) s += `<path d="M${x0 + 8} ${wl - 13} L${x0 - 9} ${wl - 50} L${x0 + 1} ${wl - 52} L${x0 + 16} ${wl - 13}" fill="none"/>`;
  return s + `</g>`;
};

const fpso = () => {
  const x0 = 990, x1 = 1330, wl = SURF;
  let s = `<g class="el el-fpso">`;
  s += `<path d="M${x0} ${wl - 18} L${x1} ${wl - 18} L${x1 + 8} ${wl - 10} L${x1} ${wl + 14} L${x0 + 6} ${wl + 14} Z" fill="#efeee8"/>`;
  for (let i = 0; i < 9; i++) { const x = 1040 + i * 27, h = 14 + ((i * 7) % 3) * 6; s += `<rect x="${x}" y="${wl - 18 - h}" width="24" height="${h}" fill="#efeee8"/>`; }
  s += `<rect x="996" y="${wl - 62}" width="34" height="44" fill="#efeee8"/><line x1="1000" x2="1026" y1="${wl - 54}" y2="${wl - 54}" stroke-dasharray="2.2 1.6" stroke-opacity=".7"/><line x1="1000" x2="1026" y1="${wl - 44}" y2="${wl - 44}" stroke-dasharray="2.2 1.6" stroke-opacity=".7"/><line x1="1000" x2="1026" y1="${wl - 34}" y2="${wl - 34}" stroke-dasharray="2.2 1.6" stroke-opacity=".7"/><line x1="1034" x2="1290" y1="${wl - 24}" y2="${wl - 24}" stroke-opacity=".5"/>`;
  s += `<path d="M1302 ${wl - 18} L1308 ${wl - 120} L1314 ${wl - 18} M1304 ${wl - 70} L1312 ${wl - 70} M1306 ${wl - 96} L1310 ${wl - 96}"/>`;
  s += `<path d="M1311 ${wl - 124} q6 -12 1 -20 q10 8 3 22 z" fill="#13262e" stroke="none" opacity=".55"/>`;
  s += `<circle cx="1290" cy="${wl + 4}" r="7" fill="#efeee8"/>`;
  return s + `</g>`;
};

const risers = () => {
  const by = bedAt(1150);
  let s = `<g class="el el-risers">`;
  for (const [ex, k] of [[1150, 0], [1196, 1], [1236, 2]]) {
    s += `<path d="M${1288 - k * 4} ${SURF + 12} C ${1280 - k * 10} ${SURF + 140}, ${1180 + k * 30} ${SURF + 150 + k * 10}, ${1200 + k * 16} ${SURF + 250 + k * 8} S ${ex - 10} ${by - 40}, ${ex} ${bedAt(ex)}" fill="none"/>`;
    s += `<rect x="${ex - 5}" y="${bedAt(ex) - 12}" width="10" height="12" fill="#efeee8"/>`;
  }
  // mooring lines
  s += `<path d="M1294 ${SURF + 10} C 1350 ${SURF + 200}, 1400 ${SURF + 380}, 1440 ${bedAt(1430) - 6}" fill="none" stroke-dasharray="3 4" stroke-opacity=".6"/>`;
  s += `<path d="M1286 ${SURF + 10} C 1240 ${SURF + 220}, 1120 ${SURF + 360}, 1060 ${bedAt(1060)}" fill="none" stroke-dasharray="3 4" stroke-opacity=".6"/>`;
  return s + `</g>`;
};

const pipeline = () => {
  let d = "", d2 = "";
  for (let x = 228; x <= 640; x += 12) { d += (x === 228 ? "M" : "L") + x + " " + (bedAt(x) - 3).toFixed(1); d2 += (x === 228 ? "M" : "L") + x + " " + (bedAt(x) - 6).toFixed(1); }
  for (let x = 652; x <= 1150; x += 12) { d += "L" + x + " " + (bedAt(x) - 3).toFixed(1); d2 += "L" + x + " " + (bedAt(x) - 6).toFixed(1); }
  const my = bedAt(650);
  return `<g class="el el-pipe"><path d="${d}" fill="none"/><path d="${d2}" fill="none" stroke-opacity=".55"/><rect x="636" y="${my - 18}" width="28" height="14" fill="#efeee8"/><line x1="642" x2="658" y1="${my - 11}" y2="${my - 11}" stroke-opacity=".6"/></g>`;
};

const workclass = () => {
  // umbilical from the MPSV's A-frame to the cage (TMS), tether to the vehicle beside the manifold
  const my = bedAt(650), tx = 566, ty = my - 120;
  let s = `<g class="el el-wc">`;
  s += `<path d="M${tx - 22} ${SURF - 51} L${tx - 22} ${ty - 6} L${tx} ${ty}" fill="none"/>`;
  s += `<rect x="${tx - 9}" y="${ty}" width="18" height="22" fill="#efeee8"/>`;
  s += `<path d="M${tx} ${ty + 22} C ${tx + 4} ${ty + 70}, ${tx + 40} ${ty + 60}, ${tx + 44} ${my - 34}" fill="none" stroke-opacity=".7"/>`;
  { const rx = tx + 34, ry = my - 38;
    s += `<rect x="${rx}" y="${ry}" width="28" height="9" fill="#f2c200" stroke="#13262e"/>`;
    s += `<rect x="${rx + 1}" y="${ry + 9}" width="26" height="11" fill="#efeee8" stroke="#13262e"/>`;
    s += `<path d="M${rx + 1} ${ry + 14.5} L${rx + 27} ${ry + 14.5} M${rx + 9} ${ry + 9} L${rx + 9} ${ry + 20} M${rx + 19} ${ry + 9} L${rx + 19} ${ry + 20}" stroke-opacity=".55"/>`;
    s += `<circle cx="${rx + 5}" cy="${ry + 4.5}" r="1.6" fill="#13262e" stroke="none"/><circle cx="${rx + 23}" cy="${ry + 4.5}" r="1.6" fill="#13262e" stroke="none"/>`;
    s += `<path d="M${rx + 27} ${ry + 13} L${rx + 34} ${ry + 10} L${rx + 39} ${ry + 17} M${rx + 39} ${ry + 17} l3 -1.5 M${rx + 39} ${ry + 17} l1.5 3" fill="none"/>`;
    s += `<path d="M${rx + 1} ${ry + 13} L${rx - 5} ${ry + 16} L${rx - 7} ${ry + 21}" fill="none" stroke-opacity=".8"/>`; }
  return s + `</g>`;
};

const diving = () => {
  // shallow-water support: dive basket on a wire from the small vessel, diver at the jacket leg
  const dy = Y(40);
  let s = `<g class="el el-dive">`;
  s += `<line x1="364" y1="${SURF - 16}" x2="350" y2="${dy - 16}"/><rect x="340" y="${dy - 16}" width="20" height="16" fill="#efeee8"/>`;
  s += `<path d="M350 ${dy} C 334 ${dy + 18}, 312 ${dy + 6}, 300 ${dy + 14}" fill="none" stroke-opacity=".7"/>`;
  s += `<circle cx="296" cy="${dy + 12}" r="3.4" fill="#f2c200"/><path d="M294 ${dy + 15} l-6 12 m6 -12 l2 13 m-4 -8 l-7 -2" fill="none"/>`;
  return s + `</g>`;
};

const lynx = () => {
  const y = Y(14);
  return `<g class="el el-lynx"><path d="M842 ${SURF - 12} C 846 ${SURF + 40}, 990 ${y - 30}, 1010 ${y}" fill="none" stroke-opacity=".7"/><rect x="1004" y="${y - 4}" width="16" height="10" fill="#19a35a" stroke="#13262e"/></g>`;
};

function world() {
  const bedPath = "M0 900 " + bed.map(([x, y]) => `L${x} ${y.toFixed(1)}`).join(" ") + " L1440 900 Z";
  const bedLine = bed.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y.toFixed(1)}`).join(" ");
  let s = `<svg class="world" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e8e5"/><stop offset=".55" stop-color="#cdd6d4"/><stop offset="1" stop-color="#9fb0b0"/></linearGradient>
    <clipPath id="ground"><path d="${bedPath}"/></clipPath>
  </defs>
  <rect x="0" y="${SURF}" width="1440" height="${900 - SURF}" fill="url(#sea)"/>
  <g>${engraving()}</g>
  <path d="${bedPath}" fill="#e7e3d8"/>
  <g clip-path="url(#ground)">${hatch()}</g>
  <path d="${bedLine}" fill="none" stroke="#13262e" stroke-width="1.1"/>
  <path d="M0 ${SURF} ${Array.from({ length: 145 }, (_, i) => `L${i * 10} ${SURF + Math.sin(i * 0.9) * 0.9}`).join(" ")}" fill="none" stroke="#13262e" stroke-width="1.2"/>
  <g fill="none" stroke="#13262e" stroke-width=".9" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    ${pipeline()}${risers()}${jacket()}${diving()}${workclass()}${lynx()}
    ${vessel(326, 110, "el-sdsv", { crane: true })}
    ${vessel(552, 230, "el-mpsv", { crane: true, aframe: true, heli: true })}
    ${vessel(838, 120, "el-ahts")}
    ${fpso()}
  </g>
</svg>`;
  return s;
}
window.WORLD = { svg: world, Y, bedAt, SURF };
