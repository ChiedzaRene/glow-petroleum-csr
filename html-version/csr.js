/* Glow Petroleum – CSR page interactions (no libraries needed) */
(function () {
  function init() {
    var root = document.querySelector('.glow-csr');
    if (!root) return;

    /* ---------- Hero slideshow ---------- */
    var slides = root.querySelectorAll('.gc-slide');
    var dotsBox = root.querySelector('.gc-dots');
    var caption = root.querySelector('.gc-hero__caption');
    var current = 0, timer = null, DELAY = 6000;

    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'gc-dot';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsBox.appendChild(b);
    });
    var dots = dotsBox.querySelectorAll('.gc-dot');

    function go(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      // re-trigger the progress bar animation
      void dots[current].offsetWidth;
      dots[current].classList.add('is-active');
      if (caption) caption.innerHTML = slides[current].getAttribute('data-caption') || '';
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(current + 1); }, DELAY); }

    var prev = root.querySelector('.gc-arrow--prev'), next = root.querySelector('.gc-arrow--next');
    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(current + 1); restart(); });

    // swipe on phones
    var hero = root.querySelector('.gc-hero'), startX = null;
    hero.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); restart(); }
      startX = null;
    });

    if (slides.length) { go(0); restart(); }

    /* ---------- Scroll reveal ---------- */
    var reveals = root.querySelectorAll('.gc-reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.15 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Animated counters ---------- */
    root.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10), done = false;
      var run = function () {
        if (done) return; done = true;
        var t0 = null;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (el.getAttribute('data-suffix') || '');
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      };
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en, obs) { if (en[0].isIntersecting) { run(); obs.disconnect(); } }).observe(el);
      } else { run(); }
    });

    /* ---------- Sticky pillar tabs: highlight current section ---------- */
    var links = root.querySelectorAll('.gc-pillars a');
    var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
    window.addEventListener('scroll', function () {
      var y = window.scrollY + 140, active = -1;
      sections.forEach(function (s, i) { if (s && s.offsetTop <= y) active = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-active', i === active); });
    }, { passive: true });

    /* ---------- Gallery lightbox ---------- */
    var lb = document.createElement('div');
    lb.className = 'glow-csr-lightbox';
    lb.innerHTML = '<button aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    root.querySelectorAll('.gc-gallery figure').forEach(function (f) {
      f.addEventListener('click', function () {
        var img = f.querySelector('img');
        lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
        lb.classList.add('is-open');
      });
    });
    lb.addEventListener('click', function (e) { if (e.target !== lbImg) lb.classList.remove('is-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('is-open'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
