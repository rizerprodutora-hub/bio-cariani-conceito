/* Botões magnéticos
Computador: o botão "puxa" na direção do mouse quando ele chega perto.
Celular: ao tocar, o botão vai um pouco na direção do dedo e volta com mola.
Os botões vêm do atributo data-sel do próprio <script>. */
(function () {
if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
const sel = (document.currentScript && document.currentScript.dataset.sel) || '[data-magnet]';
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const els = [...document.querySelectorAll(sel)];
els.forEach((el) => el.classList.add('magnet'));
const set = (el, x, y) => { el._mx = x; el._my = y; el.style.translate = x || y ? `${x.toFixed(1)}px ${y.toFixed(1)}px` : ''; };
if (fine) {
let px = -1e4, py = -1e4, raf = 0;
const tick = () => {
raf = 0;
for (const el of els) {
if (!el.offsetParent) continue;
const r = el.getBoundingClientRect();
const cx = r.left + r.width / 2 - (el._mx || 0), cy = r.top + r.height / 2 - (el._my || 0);
const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy);
const reach = Math.max(r.width, r.height) / 2 + 50;
let x = 0, y = 0;
if (d < reach) { const k = 1 - d / reach; x = dx * 0.32 * k; y = dy * 0.32 * k; }
if (Math.abs(x - (el._mx || 0)) > 0.3 || Math.abs(y - (el._my || 0)) > 0.3) set(el, x, y);
}
};
addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
document.addEventListener('pointerleave', () => { px = py = -1e4; if (!raf) raf = requestAnimationFrame(tick); });
}
els.forEach((el) => {
el.addEventListener('pointerdown', (e) => {
if (e.pointerType === 'mouse') return;
const r = el.getBoundingClientRect();
set(el, (e.clientX - r.left - r.width / 2) * 0.12, (e.clientY - r.top - r.height / 2) * 0.18);
el.classList.add('is-press');
});
const rel = () => { if (el.classList.contains('is-press')) { el.classList.remove('is-press'); set(el, 0, 0); } };
el.addEventListener('pointerup', rel); el.addEventListener('pointercancel', rel); el.addEventListener('pointerleave', rel);
});
})();