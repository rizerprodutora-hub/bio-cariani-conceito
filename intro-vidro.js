/* Abertura de vidro · Renato Cariani
O RK é quebrado em cacos de vidro (triângulos irregulares recortados no formato
do logo). Os cacos voam de fora da tela girando e se encaixam; partículas de luz
são puxadas pro centro; o vidro vira logo sólido, um brilho passa, e a câmera
atravessa o logo (zoom) enquanto as partículas explodem pra fora e a página aparece.
Sem sombras. Tocar na tela pula.
Uso: introVidro({ d: '<path do logo>', onReveal: () => {...} }) -> Promise (fim). */
(function () {
const VB_W = 2185.1, VB_H = 1219.9;
const parsePolys = (d) => d.split(/M/i).map((s) => s.trim()).filter(Boolean).map((s) => {
const n = s.replace(/[LZ]/gi, ' ').trim().split(/[\s,]+/).map(Number);
const pts = []; for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
return pts;
});
const area = (p) => { let a = 0; for (let i = 0; i < p.length; i++) { const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]; a += x1 * y2 - x2 * y1; } return a / 2; };
function clipPoly(subject, tri) {
const sign = area(tri) > 0 ? 1 : -1;
let out = subject;
for (let i = 0; i < 3 && out.length; i++) {
const a = tri[i], b = tri[(i + 1) % 3];
const inside = (p) => sign * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= 0;
const cross = (p, q) => {
const x1 = p[0], y1 = p[1], x2 = q[0], y2 = q[1], x3 = a[0], y3 = a[1], x4 = b[0], y4 = b[1];
const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4) || 1e-9;
const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
};
const inp = out; out = [];
for (let j = 0; j < inp.length; j++) {
const cur = inp[j], prev = inp[(j + inp.length - 1) % inp.length];
const ci = inside(cur), pi = inside(prev);
if (ci) { if (!pi) out.push(cross(prev, cur)); out.push(cur); }
else if (pi) out.push(cross(prev, cur));
}
}
return out;
}
function shards(polys, cols, rows) {
const cw = VB_W / cols, ch = VB_H / rows, rnd = (a) => (Math.random() * 2 - 1) * a;
const V = [];
for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
const edgeX = c === 0 || c === cols, edgeY = r === 0 || r === rows;
V.push([c * cw + (edgeX ? 0 : rnd(cw * 0.32)), r * ch + (edgeY ? 0 : rnd(ch * 0.32))]);
}
const at = (c, r) => V[r * (cols + 1) + c];
const tris = [];
for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
const a = at(c, r), b = at(c + 1, r), cc = at(c + 1, r + 1), d = at(c, r + 1);
if (Math.random() < 0.5) tris.push([a, b, cc], [a, cc, d]); else tris.push([a, b, d], [b, cc, d]);
}
const out = [];
tris.forEach((t) => polys.forEach((p) => {
const q = clipPoly(p, t);
if (q.length >= 3 && Math.abs(area(q)) > 900) {
const cx = q.reduce((s, v) => s + v[0], 0) / q.length, cy = q.reduce((s, v) => s + v[1], 0) / q.length;
out.push({ d: 'M' + q.map((v) => v[0].toFixed(1) + ' ' + v[1].toFixed(1)).join('L') + 'Z', cx, cy });
}
}));
return out;
}
window.introVidro = function ({ d, onReveal } = {}) {
return new Promise((done) => {
const G = window.gsap;
if (!G || !d) { onReveal && onReveal(); return done(); }
const small = innerWidth < 700;
const parts = shards(parsePolys(d), small ? 8 : 10, small ? 5 : 6);
const ov = document.createElement('div');
ov.className = 'iv';
ov.setAttribute('aria-hidden', 'true');
ov.innerHTML = `<div class="iv__bg"></div><canvas class="iv__p"></canvas>
<svg class="iv__logo" viewBox="0 0 ${VB_W} ${VB_H}">
<defs>
<linearGradient id="ivGlass" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#fff" stop-opacity=".62"/>
<stop offset=".45" stop-color="#fff" stop-opacity=".16"/>
<stop offset="1" stop-color="#ffd6d8" stop-opacity=".34"/>
</linearGradient>
<linearGradient id="ivShine" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="#fff" stop-opacity="0"/>
<stop offset=".5" stop-color="#fff" stop-opacity=".95"/>
<stop offset="1" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<clipPath id="ivClip"><path d="${d}"/></clipPath>
</defs>
<g class="iv__shards">${parts.map((p) => `<g><path d="${p.d}" fill="url(#ivGlass)" fill-opacity="${(0.55 + Math.random() * 0.45).toFixed(2)}" stroke="#fff" stroke-opacity=".85" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></g>`).join('')}</g>
<path class="iv__solid" d="${d}" fill="#fff" opacity="0"/>
<g clip-path="url(#ivClip)"><rect class="iv__shine" x="-700" y="-100" width="620" height="${VB_H + 200}" fill="url(#ivShine)" transform="skewX(-18)" opacity="0"/></g>
</svg>`;
document.body.appendChild(ov);
const svg = ov.querySelector('.iv__logo');
const gs = [...ov.querySelectorAll('.iv__shards > g')];
const cv = ov.querySelector('canvas'), ctx = cv.getContext('2d');
const dpr = Math.min(devicePixelRatio || 1, 2);
const W = innerWidth, H = innerHeight;
cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
const lb = () => svg.getBoundingClientRect();
const N = small ? 70 : 120;
const ps = Array.from({ length: N }, () => {
const ang = Math.random() * Math.PI * 2, far = Math.max(W, H) * (0.55 + Math.random() * 0.5);
return { ang, far, u: Math.random(), v: Math.random(), r: 0.6 + Math.random() * 1.9, tw: Math.random() * Math.PI * 2, pink: Math.random() < 0.35, delay: Math.random() * 0.5, spd: 0.6 + Math.random() * 1.2 };
});
const st = { t: 0 };
let run = true;
const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
function draw() {
if (!run) return;
const b = lb(), cx = W / 2, cy = H / 2;
ctx.clearRect(0, 0, W, H);
ctx.globalCompositeOperation = 'lighter';
for (const p of ps) {
const tx = b.left + p.u * b.width, ty = b.top + p.v * b.height;
const sx = cx + Math.cos(p.ang) * p.far, sy = cy + Math.sin(p.ang) * p.far;
let x, y, a;
if (st.t < 2.15) { // puxadas pro logo
const k = ease((st.t - p.delay) / 1.6);
x = sx + (tx - sx) * k; y = sy + (ty - sy) * k;
a = Math.min(1, (st.t - p.delay) * 2) * (0.55 + 0.45 * Math.sin(p.tw + st.t * 9));
} else { // explodem pra fora no zoom
const k = (st.t - 2.15) * p.spd;
const dx = tx - cx, dy = ty - cy, len = Math.hypot(dx, dy) || 1;
x = tx + (dx / len) * k * k * 900; y = ty + (dy / len) * k * k * 900;
a = Math.max(0, 1 - k * 1.25);
}
if (a <= 0) continue;
const rad = p.r * (st.t > 2.15 ? 1 + (st.t - 2.15) * 3 : 1);
ctx.fillStyle = p.pink ? `rgba(255,170,175,${a})` : `rgba(255,255,255,${a})`;
ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
ctx.fillStyle = `rgba(255,120,128,${a * 0.18})`;
ctx.beginPath(); ctx.arc(x, y, rad * 4, 0, Math.PI * 2); ctx.fill();
}
requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
const LX = 1500, LY = 610; // ponto dentro do K: a câmera atravessa por ali
const tl = G.timeline({ onComplete: finish });
tl.to(st, { t: 3.4, duration: 3.4, ease: 'none' }, 0);
tl.fromTo(svg, { scale: 0.82 }, { scale: 1, duration: 2.1, ease: 'power2.out', transformOrigin: '50% 50%' }, 0);
gs.forEach((g, i) => {
const p = parts[i];
const ox = p.cx - VB_W / 2, oy = p.cy - VB_H / 2, len = Math.hypot(ox, oy) || 1;
const dist = 1400 + Math.random() * 1600;
tl.from(g, {
x: (ox / len) * dist + (Math.random() * 2 - 1) * 500,
y: (oy / len) * dist + (Math.random() * 2 - 1) * 500,
rotation: (Math.random() * 2 - 1) * 200,
scale: 0.25 + Math.random() * 1.3,
opacity: 0,
svgOrigin: `${p.cx} ${p.cy}`,
duration: 1.25 + Math.random() * 0.35,
ease: 'expo.out',
}, 0.05 + Math.random() * 0.45);
});
tl.to('.iv__solid', { opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 1.7)
.to('.iv__shards', { opacity: 0, duration: 0.5, ease: 'power2.in' }, 1.8)
.fromTo('.iv__shine', { x: 0, opacity: 1 }, { x: VB_W + 1300, duration: 0.75, ease: 'power2.inOut' }, 1.75)
.to(svg, { scale: 14, duration: 0.8, ease: 'power3.in', transformOrigin: `${(LX / VB_W) * 100}% ${(LY / VB_H) * 100}%` }, 2.2)
.to(svg, { opacity: 0, duration: 0.32, ease: 'power1.in' }, 2.62) // some antes de cobrir o perfil
.add(() => { onReveal && onReveal(); }, 2.72)
.to(ov.querySelector('.iv__bg'), { opacity: 0, duration: 0.65, ease: 'power2.out' }, 2.8)
.set(ov, { pointerEvents: 'none' }, 2.85);
function finish() { run = false; ov.remove(); done(); }
ov.addEventListener('pointerdown', () => { if (tl.time() < 2.2) tl.time(2.2); }, { once: true });
});
};
})();