// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: fondo al hacer scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú móvil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('is-open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));

// Reveal al hacer scroll
const revealEls = document.querySelectorAll('.section');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Lightbox de galería
const items = [...document.querySelectorAll('.gallery__item')];
const sources = items.map(b => b.dataset.src);
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let current = 0;

function openLb(i) {
  current = i;
  lbImg.src = sources[current];
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function step(n) {
  current = (current + n + sources.length) % sources.length;
  lbImg.src = sources[current];
}

items.forEach((b, i) => b.addEventListener('click', () => openLb(i)));
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => step(-1));
document.getElementById('lbNext').addEventListener('click', () => step(1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});
