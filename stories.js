/* Renato Cariani · destaques em stories
Cada destaque tem telas de 5 s com barra de tempo. Toque à direita avança,
à esquerda volta, segurar pausa, arrastar pra baixo fecha.
Destaque visto fica cinza e vai pro fim da fileira (vale por 24 h). */
(function () {
const HOT = {
nacao: 'https://hotmart.com/pt-br/marketplace/produtos/conexao-transformadora-b8912/S84083408L',
vshape: 'https://hotmart.com/pt-br/marketplace/produtos/v-shape/F105433235L',
p8020: 'https://hotmart.com/pt-br/marketplace/produtos/protocolo-80-20/Q97444502K',
};
const yt = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const STORIES = {
cursos: { name: 'Cursos', avatar: 'assets/cariani-recorte.webp', slides: [
{ img: 'assets/cariani-recorte.webp', cut: true, kicker: 'Seja aluno', title: 'Nação Renato Cariani', text: 'Comunidade de apoio, conhecimento e motivação pra transformar físico, mente e estilo de vida.', cta: { label: 'Quero entrar', href: HOT.nacao } },
{ img: 'https://redectrc.com.br/cdn/shop/files/CTRC_GOOGLE-13.jpg?width=900', kicker: 'Programa de 90 dias', title: 'V-Shape', text: 'Pra homens que querem perder gordura e ganhar músculo ao mesmo tempo.', cta: { label: 'Ver o programa', href: HOT.vshape } },
{ img: 'https://redectrc.com.br/cdn/shop/files/CTRC_GOOGLE-18.jpg?width=900', kicker: 'Estilo de vida', title: 'Protocolo 80/20', text: '80% disciplina, 20% flexibilidade: manter o físico sem dieta restritiva.', cta: { label: 'Ver o protocolo', href: HOT.p8020 } },
] },
growth: { name: 'Growth', avatar: 'https://i.ytimg.com/vi/t7cpnkfpiNw/mqdefault.jpg', slides: [
{ img: yt('t7cpnkfpiNw'), kicker: 'Cupom de desconto', title: 'Growth Supplements', text: 'Use o cupom CARIANI na loja oficial.', coupon: 'CARIANI', cta: { label: 'Copiar CARIANI e ir à loja', href: 'https://www.gsuplementos.com.br/' } },
{ img: yt('z22dv7-R0nw'), kicker: 'No canal', title: 'Ele provou todas as barrinhas', text: '174 mil visualizações.', video: 'z22dv7-R0nw', cta: { label: 'Assistir' } },
] },
ctrc: { name: 'CTRC', avatar: 'https://redectrc.com.br/cdn/shop/files/IMG_7287.jpg?width=1200', slides: [
{ img: 'https://redectrc.com.br/cdn/shop/files/IMG_7287.jpg?width=1200', kicker: 'Rede CTRC', title: 'Treine onde ele treina', text: 'Uberlândia, São Bernardo do Campo e Joinville. Em breve: Criciúma, Curitiba e Santo André.', cta: { label: 'Ver unidades', href: 'https://redectrc.com.br/collections/unidades' } },
{ img: 'https://redectrc.com.br/cdn/shop/files/CTRC_GOOGLE-18.jpg?width=900', kicker: 'Franquia', title: 'Leve o CTRC pra sua cidade', text: 'Modelo de negócio completo, com marca e metodologia.', cta: { label: 'Quero ser franqueado', href: 'https://inlead.digital/ctrc-investidores' } },
] },
podcast: { name: 'Podcast', avatar: 'https://i.ytimg.com/vi/0RBhEwB3_vg/mqdefault.jpg', slides: [
{ img: yt('0RBhEwB3_vg'), kicker: 'Podcast ao vivo', title: 'Os donos da Growth abrem o jogo', text: 'Episódio #423 · 473 mil visualizações.', video: '0RBhEwB3_vg', cta: { label: 'Assistir' } },
{ img: yt('M5Sa-yBVgZ4'), kicker: 'Podcast ao vivo', title: 'O grande encontro', text: 'Com Muzy, Balestrin, Eduardo Correa e Jorlan. Episódio #122.', video: 'M5Sa-yBVgZ4', cta: { label: 'Assistir' } },
] },
gfarma: { name: 'GFarma', avatar: 'https://www.gfarma.com/cdn/shop/files/gfarma_favicon.svg', slides: [
{ logo: 'https://www.gfarma.com/cdn/shop/files/gfarma_favicon.svg', kicker: 'Cupom de desconto', title: 'GFarma', text: 'Manipulados. Use o cupom CTRC.', coupon: 'CTRC', cta: { label: 'Copiar CTRC e ir à loja', href: 'https://www.gfarma.com' } },
] },
alpha: { name: 'Alpha Co', avatar: 'assets/parceiros/alphaco-escuro.png', slides: [
{ logo: 'assets/parceiros/alphaco-escuro.png', kicker: 'Cupom de desconto', title: 'Alpha Co', text: 'Roupas fitness. Use o cupom CARIANI.', coupon: 'CARIANI', cta: { label: 'Copiar CARIANI e ir à loja', href: 'https://www.usealphaco.com.br' } },
] },
};
window.CARIANI_STORIES = STORIES;
const DUR = 5000, TTL = 24 * 3600 * 1000;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = () => (window.gsap && !reduce ? window.gsap : null);
const $ = (s, c = document) => c.querySelector(s);
const box = $('.story');
if (!box) return;
const boxEl = $('.story__box', box);
const rail = $('.hl');
const bars = $('.story__bars', box), media = $('.story__media', box);
const tKick = $('.story__text small', box), tTitle = $('.story__text b', box), tText = $('.story__text p', box), cta = $('.story__cta', box);
let cur = null, i = 0, t0 = 0, elapsed = 0, paused = false, raf = 0, queue = [], closing = false;
/* ---------- vistos: cinza e pro fim da fileira ---------- */
const items = rail ? [...rail.querySelectorAll('[data-story]')] : [];
items.forEach((b, k) => { b.dataset.i = k; });
let seen = {};
try { seen = JSON.parse(localStorage.getItem('rc-seen') || '{}'); } catch (e) { seen = {}; }
const now0 = Date.now();
Object.keys(seen).forEach((k) => { if (now0 - seen[k] > TTL) delete seen[k]; });
const save = () => { try { localStorage.setItem('rc-seen', JSON.stringify(seen)); } catch (e) {} };
function arrange(animate) {
if (!rail) return;
const before = new Map(items.map((b) => [b, b.getBoundingClientRect().left]));
const sorted = items.slice().sort((a, b) => (!!seen[a.dataset.story] - !!seen[b.dataset.story]) || (a.dataset.i - b.dataset.i));
items.forEach((b) => b.classList.toggle('is-seen', !!seen[b.dataset.story]));
sorted.forEach((b) => rail.appendChild(b));
const g = G();
if (animate && g) {
rail.scrollTo({ left: 0, behavior: 'smooth' });
sorted.forEach((b) => {
const dx = before.get(b) - b.getBoundingClientRect().left;
if (Math.abs(dx) > 1) g.fromTo(b, { x: dx }, { x: 0, duration: 0.6, ease: 'power3.inOut', clearProps: 'transform' });
});
}
}
arrange(false);
function markSeen(id) { seen[id] = Date.now(); save(); }
/* ---------- telas ---------- */
function render() {
const st = STORIES[cur], s = st.slides[i];
$('.story__avatar img', box).src = st.avatar;
const T = window.rcT || ((x) => x);
$('.story__name', box).textContent = T(st.name);
bars.innerHTML = st.slides.map((_, k) => `<i><b style="transform:scaleX(${k < i ? 1 : 0})"></b></i>`).join('');
media.innerHTML = s.logo
? `<div class="story__logo${s.logoDark ? ' is-dark' : ''}"><img src="${s.logo}" alt="" draggable="false"></div>`
: `<img class="${s.cut ? 'is-cut' : ''}" src="${s.img}" alt="" draggable="false" onerror="this.onerror=null;this.src=this.src.replace('maxresdefault','hqdefault')">`;
tKick.textContent = T(s.kicker || '');
tTitle.textContent = T(s.title || '');
tText.textContent = T(s.text || '');
cta.textContent = s.cta ? T(s.cta.label) : '';
cta.hidden = !s.cta;
cta.removeAttribute('data-copy'); cta.removeAttribute('data-video');
if (s.cta && s.cta.href) { cta.href = s.cta.href; } else { cta.removeAttribute('href'); }
if (s.coupon) cta.dataset.copy = s.coupon;
if (s.video) cta.dataset.video = s.video;
const g = G();
if (g) g.fromTo([media.firstChild, tKick, tTitle, tText, cta], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
elapsed = 0; t0 = performance.now();
}
function tick(now) {
const dt = Math.min(now - t0, 100); // volta de outra aba sem pular tela
if (!paused) elapsed += dt;
t0 = now;
const bar = bars.children[i] && bars.children[i].firstChild;
if (bar) bar.style.transform = `scaleX(${Math.min(elapsed / DUR, 1)})`;
if (elapsed >= DUR) return next();
raf = requestAnimationFrame(tick);
}
function go() { cancelAnimationFrame(raf); render(); raf = requestAnimationFrame(tick); }
function next() {
if (closing) return;
const st = STORIES[cur];
if (i < st.slides.length - 1) { i++; return go(); }
const n = queue.indexOf(cur) + 1;
if (n > 0 && n < queue.length) { cur = queue[n]; i = 0; markSeen(cur); return go(); }
close();
}
function prev() {
if (closing) return;
if (i > 0) { i--; return go(); }
const p = queue.indexOf(cur) - 1;
if (p >= 0) { cur = queue[p]; i = STORIES[cur].slides.length - 1; return go(); }
go();
}
function open(id) {
const g = G();
queue = rail ? [...rail.querySelectorAll('[data-story]')].map((b) => b.dataset.story) : Object.keys(STORIES);
cur = id; i = 0; paused = false; closing = false; markSeen(id);
if (g) { g.killTweensOf([boxEl, box]); g.set(boxEl, { y: 0, scale: 1, opacity: 1 }); }
box.style.backgroundColor = '';
box.hidden = false; document.documentElement.style.overflow = 'hidden';
if (g) g.fromTo(boxEl, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
window.dispatchEvent(new Event('rc:pause'));
go();
}
function close(how) {
if (closing || box.hidden) return;
closing = true; cancelAnimationFrame(raf);
const done = () => {
box.hidden = true; closing = false;
const g2 = G(); if (g2) g2.set(boxEl, { clearProps: 'transform,opacity' });
box.style.backgroundColor = '';
document.documentElement.style.overflow = '';
window.dispatchEvent(new Event('rc:resume'));
arrange(true);
};
const g = G();
if (!g || how === 'now') return done();
const swipe = how === 'swipe';
g.to(boxEl, { y: swipe ? innerHeight : 30, scale: swipe ? 0.85 : 0.96, opacity: swipe ? 1 : 0, duration: 0.3, ease: 'power2.in', onComplete: done });
g.to(box, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.3 });
}
document.querySelectorAll('[data-story]').forEach((b) => b.addEventListener('click', () => open(b.dataset.story)));
$('.story__next', box).addEventListener('click', next);
$('.story__prev', box).addEventListener('click', prev);
$('.story__close', box).addEventListener('click', () => close());
addEventListener('keydown', (e) => {
if (box.hidden) return;
if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev();
});
/* ---------- gestos: segurar pausa, arrastar pra baixo fecha ---------- */
let down = false, drag = false, sx = 0, sy = 0, dy = 0, downAt = 0, swallow = false;
boxEl.addEventListener('pointerdown', (e) => {
if (e.button > 0 || closing) return;
down = true; drag = false; swallow = false; dy = 0;
sx = e.clientX; sy = e.clientY; downAt = performance.now();
if (!e.target.closest('.story__close')) paused = true;
});
addEventListener('pointermove', (e) => {
if (!down || box.hidden) return;
const mx = e.clientX - sx, my = e.clientY - sy;
if (!drag && my > 12 && my > Math.abs(mx)) drag = true;
if (!drag) return;
dy = Math.max(0, my);
const g = G();
if (g) g.set(boxEl, { y: dy, scale: 1 - Math.min(dy / innerHeight, 1) * 0.15 });
box.style.backgroundColor = `rgba(0,0,0,${(0.92 * (1 - Math.min(dy / 420, 1))).toFixed(3)})`;
}, { passive: true });
const up = () => {
if (!down) return;
down = false; paused = false;
if (drag || performance.now() - downAt > 250) swallow = true; // não conta como toque
if (!drag) return;
drag = false;
if (dy > 110) return close('swipe');
const g = G();
if (g) g.to(boxEl, { y: 0, scale: 1, duration: 0.35, ease: 'power3.out' });
box.style.backgroundColor = '';
};
addEventListener('pointerup', up);
addEventListener('pointercancel', up);
boxEl.addEventListener('click', (e) => { if (swallow) { e.preventDefault(); e.stopPropagation(); swallow = false; } }, true);
boxEl.addEventListener('dragstart', (e) => e.preventDefault());
cta.addEventListener('click', (e) => {
if (cta.dataset.copy) { try { navigator.clipboard.writeText(cta.dataset.copy); } catch (_) {} window.dispatchEvent(new CustomEvent('rc:toast', { detail: `Cupom ${cta.dataset.copy} copiado. Abrindo a loja` })); }
if (cta.dataset.video) { e.preventDefault(); const v = cta.dataset.video; close('now'); window.dispatchEvent(new CustomEvent('rc:video', { detail: v })); }
});
})();