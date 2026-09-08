const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const progressBar = document.querySelector('.scroll-progress span');

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('zaid-theme', theme);
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeMeta.setAttribute('content', theme === 'dark' ? '#07110f' : '#f2f0e9');
};

setTheme(document.documentElement.dataset.theme);
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

let scrollTicking = false;
const updateScrollEffects = () => {
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
  if (innerWidth > 900 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const portrait = document.querySelector('.portrait-frame');
    const offset = Math.min(scrollY * 0.045, 24);
    portrait.style.transform = `translateY(${offset}px)`;
  }
  scrollTicking = false;
};

addEventListener('scroll', () => {
  if (!scrollTicking) requestAnimationFrame(updateScrollEffects);
  scrollTicking = true;
}, { passive: true });
updateScrollEffects();
