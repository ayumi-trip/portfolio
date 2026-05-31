/* ===== Active nav link ===== */
(function () {
  const path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    const href = link.getAttribute('href').replace(/\/index\.html$/, '/');
    if (path.endsWith(href) || (href !== '/' && href !== '/index.html' && path.includes(href))) {
      link.classList.add('active');
    }
  });
})();

/* ===== Smooth scroll for in-page anchors ===== */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== Fade-up on scroll ===== */
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
