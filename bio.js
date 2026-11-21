/* Renato Cariani · link da bio
Um único momento animado na abertura: o RK se monta no centro da tela
e desce pro lugar dele sobre a foto. Depois disso, só o que responde ao toque. */
(async function () {
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
await Promise.all($$('[data-logo]').map(async (el) => {
try { const r = await fetch(el.dataset.logo); if (r.ok) el.innerHTML = await r.text(); } catch (e) {}
}));
/* ---------- abertura ---------- */
const seen = (() => { try { return sessionStorage.getItem('rc-open'); } catch (e) { return 1; } })();
const logo = $('.cover__logo');
const content = $$('.who, .video, .tabs, .panels, .social, .site, .foot');
if (window.gsap && !reduce) {
if (!seen) {
try { sessionStorage.setItem('rc-open', 1); } catch (e) {}
const parts = $$('svg path', logo);
const box = logo.getBoundingClientRect();
const dx = innerWidth / 2 - (box.left + box.width / 2);
const dy = innerHeight / 2 - (box.top + box.height / 2);
const s = Math.min(1.7, (innerWidth * 0.62) / box.width);
const cut = $('.cover__cut'), back = $('.cover__back'), glow = $('.cover__glow');
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
gsap.set(logo, { x: dx, y: dy, scale: s });
gsap.set(cut, { opacity: 0, y: 50, scale: 1.05, filter: 'grayscale(1) contrast(1.12) blur(10px)' });
gsap.set([back, glow], { opacity: 0 });
gsap.set(content, { opacity: 0, y: 18 });
tl.from(parts, { opacity: 0, y: 26, scale: 0.92, duration: 1.1, stagger: 0.09 }, 0.15)
.to(logo, { scale: s * 1.03, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.1)
.to(logo, { x: 0, y: 0, scale: 1, duration: 1.3, ease: 'power2.inOut' }, 1.75)
.to(glow, { opacity: 1, duration: 1.4, ease: 'sine.out' }, 1.75)
.to(back, { opacity: 0.75, duration: 1.6, ease: 'sine.out' }, 1.9)
.to(cut, { opacity: 1, y: 0, scale: 1, filter: 'grayscale(1) contrast(1.12) blur(0px)', duration: 1.5, ease: 'power2.out' }, 1.9)
.to(content, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: 'power2.out' }, 2.6)
.add(() => logo.classList.add('is-shining'), 3.0);
} else {
gsap.from([$('.cover'), ...content], { opacity: 0, y: 12, duration: 0.9, stagger: 0.05, ease: 'power2.out' });
setTimeout(() => logo.classList.add('is-shining'), 500);
}
}
/* ---------- abas ---------- */
const tabs = $$('[role="tab"]');
const pill = $('.tabs__pill');
const panelsBox = $('.panels');
function choose(tab, focus) {
const i = tabs.indexOf(tab);
const current = $('.panel.is-on');
const next = document.getElementById(tab.getAttribute('aria-controls'));
tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
pill.style.transform = `translateX(${i * 100}%)`;
if (focus) tab.focus();
if (current === next) return;
const h0 = panelsBox.offsetHeight;
current.classList.remove('is-on'); current.hidden = true;
next.hidden = false; next.classList.add('is-on');
if (!window.gsap || reduce) return;
const h1 = panelsBox.offsetHeight;
gsap.fromTo(panelsBox, { height: h0 }, { height: h1, duration: 0.4, ease: 'power3.out', clearProps: 'height' });
gsap.from(next.children, { opacity: 0, y: 12, duration: 0.45, stagger: 0.04, ease: 'power3.out' });
const t = $('.tabs').getBoundingClientRect().top;
if (t < 0) scrollBy({ top: t - 8, behavior: 'smooth' });
}
tabs.forEach((t, i) => {
t.tabIndex = i ? -1 : 0;
t.addEventListener('click', () => choose(t));
t.addEventListener('keydown', (e) => {
if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
choose(tabs[n], true);
});
});
const hash = location.hash.slice(1);
const byHash = tabs.find((t) => t.id === 't-' + hash);
if (byHash) choose(byHash);
/* ---------- cupons ---------- */
const toast = $('.toast');
const say = (m) => { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(say.h); say.h = setTimeout(() => toast.classList.remove('is-on'), 2000); };
$$('[data-copy]').forEach((b) => b.addEventListener('click', () => {
const code = b.dataset.copy, tag = b.querySelector('.code') || b;
try { navigator.clipboard.writeText(code); } catch (e) {}
tag.classList.add('is-done'); tag.textContent = 'Copiado';
say(`Cupom ${code} copiado. Abrindo a loja`);
setTimeout(() => { tag.classList.remove('is-done'); tag.textContent = code; }, 1800);
}));
/* ---------- vídeo ---------- */
const sheet = $('.sheet'), slot = $('.sheet__video');
const close = () => { sheet.hidden = true; slot.innerHTML = ''; };
$$('[data-yt]').forEach((b) => b.addEventListener('click', () => {
slot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Vídeo do canal"></iframe>`;
sheet.hidden = false;
$('.sheet__close').focus();
}));
$('.sheet__close').addEventListener('click', close);
sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) close(); });
})();