/* Renato Cariani · site completo
Abertura (RK se monta + brilho), rolagem suave, títulos com máscara,
números contando, luz nos cartões, foto do CTRC em parallax,
RK do rodapé se enchendo. Tudo desliga com "reduzir movimento". */
(async function () {
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = window.gsap, ST = window.ScrollTrigger;
await Promise.all($$('[data-logo]').map(async (el) => {
try { const r = await fetch(el.dataset.logo); if (r.ok) el.innerHTML = await r.text(); } catch (e) {}
}));
const fl = $('[data-fill]');
if (fl) { const f = document.createElement('span'); f.className = 'fill'; f.innerHTML = fl.innerHTML; fl.appendChild(f); }
document.documentElement.classList.remove('rc-opening');
const motion = G && ST && !reduce;
if (motion) G.registerPlugin(ST);
let lenis = null;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (motion && window.Lenis && fine) {
lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
lenis.on('scroll', ST.update);
G.ticker.add((t) => lenis.raf(t * 1000)); G.ticker.lagSmoothing(0);
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
const id = a.getAttribute('href'); if (id.length < 2) return;
e.preventDefault(); lenis.scrollTo(id, { offset: -64 });
}));
}
if (motion) {
const parts = $$('.hero__logo svg path');
const heroIn = () => G.timeline({ defaults: { ease: 'power3.out' } })
.from('.hero__glow', { opacity: 0, duration: 1.4, ease: 'sine.out' }, 0)
.from('.hero__back', { opacity: 0, duration: 1.6, ease: 'sine.out' }, 0.1)
.from('.hero__cut', { opacity: 0, y: 50, scale: 1.05, duration: 1.5, ease: 'power2.out' }, 0.15)
.from(parts, { opacity: 0, y: 26, scale: 0.92, duration: 1.1, stagger: 0.09 }, 0.7)
.add(() => $('.hero__logo').classList.add('is-shining'), 1.7)
.from('.hero h1, .hero p, .hero__cta', { opacity: 0, y: 18, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 1.0);
const firstSite = (() => { try { return !sessionStorage.getItem('rc-open-site'); } catch (e) { return false; } })();
const hb = $('.hero__back path');
if (firstSite && window.introVidro && hb) {
try { sessionStorage.setItem('rc-open-site', 1); } catch (e) {}
window.introVidro({ d: hb.getAttribute('d'), onReveal: heroIn });
} else heroIn();
if (fine) G.to('.hero__cut', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
if (fine) G.to('.hero__text', { y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
G.to('.nav__progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
$$('.title').forEach((t) => {
t.innerHTML = `<span class="ln">${t.innerHTML}</span>`;
G.from(t.firstChild, { yPercent: 105, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%' } });
const lead = t.nextElementSibling;
if (lead && lead.classList.contains('lead')) G.from(lead, { opacity: 0, y: 14, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: t, start: 'top 88%' } });
});
$$('[data-count]').forEach((b) => {
const end = parseFloat(b.dataset.count.replace(',', '.'));
const dec = (b.dataset.count.split(',')[1] || '').length;
const suf = b.textContent.replace(b.dataset.count, '');
const o = { v: 0 };
G.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 92%' },
onUpdate: () => (b.textContent = o.v.toFixed(dec).replace('.', ',') + suf) });
});
[['.courses', '.course'], ['.videos', '.vid'], ['.partners', '.partner']].forEach(([box, item]) => {
G.from($$(item, $(box)), { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: box, start: 'top 85%', once: true } });
});
G.from('.unit, .biz', { x: -16, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.ctrc', start: 'top 75%', once: true } });
if (fine) G.fromTo('.ctrc__photo img', { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.ctrc__photo', start: 'top bottom', end: 'bottom top', scrub: true } });
G.to('.foot__logo .fill', { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top 95%', end: 'bottom bottom', scrub: true } });
}
const follow = (el, target = el) => {
const move = (x, y) => { const r = el.getBoundingClientRect(); target.style.setProperty('--mx', ((x - r.left) / r.width) * 100 + '%'); target.style.setProperty('--my', ((y - r.top) / r.height) * 100 + '%'); };
el.addEventListener('pointermove', (e) => move(e.clientX, e.clientY));
el.addEventListener('touchstart', (e) => { el.classList.add('is-touch'); move(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
el.addEventListener('touchend', () => setTimeout(() => el.classList.remove('is-touch'), 400));
};
$$('.course').forEach((c) => follow(c));
const hlg = $('.hero__logo');
hlg && hlg.addEventListener('pointerenter', () => { hlg.classList.remove('is-shining'); void hlg.offsetWidth; hlg.classList.add('is-shining'); });
const nav = $('.nav');
let navOn = false; addEventListener('scroll', () => { const v = scrollY > 10; if (v !== navOn) { navOn = v; nav.classList.toggle('is-scrolled', v); } }, { passive: true });
const links = $$('.nav__links a');
const io = new IntersectionObserver((ents) => ents.forEach((e) => {
if (!e.isIntersecting) return;
links.forEach((a) => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-on', on); if (on) { const box = a.parentElement; box.scrollTo({ left: a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' }); } });
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach((s) => io.observe(s));
const toast = $('.toast');
const say = (m) => { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(say.h); say.h = setTimeout(() => toast.classList.remove('is-on'), 2000); };
$$('[data-copy]').forEach((b) => b.addEventListener('click', () => {
const code = b.dataset.copy, tag = b.querySelector('.code') || b;
try { navigator.clipboard.writeText(code); } catch (e) {}
tag.classList.add('is-done'); tag.textContent = 'Copiado';
say(`Cupom ${code} copiado. Abrindo a loja`);
setTimeout(() => { tag.classList.remove('is-done'); tag.textContent = code; }, 1800);
}));
const sheet = $('.sheet'), slot = $('.sheet__video');
const close = () => { sheet.hidden = true; slot.innerHTML = ''; lenis && lenis.start(); };
$$('[data-yt]').forEach((b) => b.addEventListener('click', () => {
slot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Vídeo do canal"></iframe>`;
sheet.hidden = false; lenis && lenis.stop(); $('.sheet__close').focus();
}));
$('.sheet__close').addEventListener('click', close);
sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) close(); });
if (motion) ST.refresh();
})();