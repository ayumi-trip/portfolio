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

/* ===== Works tabs ===== */
(function () {
  const tabs = document.querySelectorAll('.works-tab');
  const panels = document.querySelectorAll('.works-panel');
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.dataset.tab;
      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.dataset.panel === target);
      });
    });
  });
})();

/* ===== Works carousel arrows ===== */
(function () {
  document.querySelectorAll('.works-carousel-wrap').forEach(function (wrap) {
    const track = wrap.querySelector('.works-carousel');
    const prev = wrap.querySelector('.carousel-btn.prev');
    const next = wrap.querySelector('.carousel-btn.next');
    if (!track || !prev || !next) return;

    function scrollAmount() {
      const card = track.querySelector('.work-card');
      const gap = parseInt(getComputedStyle(track).gap) || 24;
      return card ? card.offsetWidth + gap : 320;
    }

    function update() {
      const max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= max;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
    track.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
  });
})();

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
