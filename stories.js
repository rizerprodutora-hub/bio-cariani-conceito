/* Renato Cariani · destaques em stories
Cada destaque tem telas de 5 s com barra de tempo. Toque à direita avança,
à esquerda volta, segurar pausa. O botão de cupom copia e abre a loja. */
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
podcast: { name: 'IRONCAST', avatar: 'https://i.ytimg.com/vi/0RBhEwB3_vg/mqdefault.jpg', slides: [
{ img: yt('0RBhEwB3_vg'), kicker: 'Podcast ao vivo', title: 'Os donos da Growth abrem o jogo', text: 'IRONCAST #423 · 473 mil visualizações.', video: '0RBhEwB3_vg', cta: { label: 'Assistir' } },
{ img: yt('M5Sa-yBVgZ4'), kicker: 'Podcast ao vivo', title: 'O grande encontro', text: 'Com Muzy, Balestrin, Eduardo Correa e Jorlan. IRONCAST #122.', video: 'M5Sa-yBVgZ4', cta: { label: 'Assistir' } },
] },
gfarma: { name: 'GFarma', avatar: 'https://www.gfarma.com/cdn/shop/files/gfarma_favicon.svg', slides: [
{ logo: 'https://www.gfarma.com/cdn/shop/files/gfarma_favicon.svg', kicker: 'Cupom de desconto', title: 'GFarma', text: 'Manipulados. Use o cupom CTRC.', coupon: 'CTRC', cta: { label: 'Copiar CTRC e ir à loja', href: 'https://www.gfarma.com' } },
] },
alpha: { name: 'Alpha Co', avatar: 'https://usealphaco.com.br/cdn/shop/files/pack_rgb_logo_alpha_co_avatar_positivo-16.png?width=300', slides: [
{ logo: 'https://usealphaco.com.br/cdn/shop/files/pack_rgb_logo_alpha_co_avatar_positivo-16.png?width=300', logoDark: true, kicker: 'Cupom de desconto', title: 'Alpha Co', text: 'Roupas fitness. Use o cupom CARIANI.', coupon: 'CARIANI', cta: { label: 'Copiar CARIANI e ir à loja', href: 'https://www.usealphaco.com.br' } },
] },
};
window.CARIANI_STORIES = STORIES;
const DUR = 5000;
const $ = (s, c = document) => c.querySelector(s);
const box = $('.story');
if (!box) return;
const bars = $('.story__bars', box), media = $('.story__media', box);
const tKick = $('.story__text small', box), tTitle = $('.story__text b', box), tText = $('.story__text p', box), cta = $('.story__cta', box);
let cur = null, i = 0, t0 = 0, elapsed = 0, paused = false, raf = 0;
const order = Object.keys(STORIES);
function render() {
const st = STORIES[cur], s = st.slides[i];
$('.story__avatar img', box).src = st.avatar;
$('.story__name', box).textContent = st.name;
bars.innerHTML = st.slides.map((_, k) => `<i><b style="transform:scaleX(${k < i ? 1 : 0})"></b></i>`).join('');
media.innerHTML = s.logo
? `<div class="story__logo${s.logoDark ? ' is-dark' : ''}"><img src="${s.logo}" alt=""></div>`
: `<img class="${s.cut ? 'is-cut' : ''}" src="${s.img}" alt="" onerror="this.onerror=null;this.src=this.src.replace('maxresdefault','hqdefault')">`;
tKick.textContent = s.kicker || '';
tTitle.textContent = s.title || '';
tText.textContent = s.text || '';
cta.textContent = s.cta ? s.cta.label : '';
cta.hidden = !s.cta;
cta.removeAttribute('data-copy'); cta.removeAttribute('data-video');
if (s.cta && s.cta.href) { cta.href = s.cta.href; } else { cta.removeAttribute('href'); }
if (s.coupon) cta.dataset.copy = s.coupon;
if (s.video) cta.dataset.video = s.video;
if (window.gsap) gsap.fromTo([media.firstChild, tKick, tTitle, tText, cta], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
elapsed = 0; t0 = performance.now();
}
function tick(now) {
if (!paused) elapsed += now - t0;
t0 = now;
const bar = bars.children[i] && bars.children[i].firstChild;
if (bar) bar.style.transform = `scaleX(${Math.min(elapsed / DUR, 1)})`;
if (elapsed >= DUR) return next();
raf = requestAnimationFrame(tick);
}
function go() { cancelAnimationFrame(raf); render(); raf = requestAnimationFrame(tick); }
function next() {
const st = STORIES[cur];
if (i < st.slides.length - 1) { i++; return go(); }
const n = order.indexOf(cur) + 1;
if (n < order.length) { cur = order[n]; i = 0; markSeen(cur); return go(); }
close();
}
function prev() {
if (i > 0) { i--; return go(); }
const p = order.indexOf(cur) - 1;
if (p >= 0) { cur = order[p]; i = STORIES[cur].slides.length - 1; return go(); }
go();
}
function markSeen(id) { const b = document.querySelector(`[data-story="${id}"]`); if (b) b.classList.add('is-seen'); }
function open(id) {
cur = id; i = 0; paused = false; markSeen(id);
box.hidden = false; document.documentElement.style.overflow = 'hidden';
if (window.gsap) gsap.fromTo($('.story__box', box), { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
window.dispatchEvent(new Event('rc:pause'));
go();
}
function close() {
cancelAnimationFrame(raf); box.hidden = true; document.documentElement.style.overflow = '';
window.dispatchEvent(new Event('rc:resume'));
}
document.querySelectorAll('[data-story]').forEach((b) => b.addEventListener('click', () => open(b.dataset.story)));
$('.story__next', box).addEventListener('click', next);
$('.story__prev', box).addEventListener('click', prev);
$('.story__close', box).addEventListener('click', close);
addEventListener('keydown', (e) => {
if (box.hidden) return;
if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev();
});
const media2 = $('.story__box', box);
media2.addEventListener('pointerdown', (e) => { if (!e.target.closest('.story__cta,.story__close')) paused = true; });
addEventListener('pointerup', () => { paused = false; });
cta.addEventListener('click', (e) => {
if (cta.dataset.copy) { try { navigator.clipboard.writeText(cta.dataset.copy); } catch (_) {} window.dispatchEvent(new CustomEvent('rc:toast', { detail: `Cupom ${cta.dataset.copy} copiado. Abrindo a loja` })); }
if (cta.dataset.video) { e.preventDefault(); const v = cta.dataset.video; close(); window.dispatchEvent(new CustomEvent('rc:video', { detail: v })); }
});
})();