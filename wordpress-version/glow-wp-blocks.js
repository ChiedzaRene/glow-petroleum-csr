/* Glow Petroleum CSR – turns the hero Gallery block into a slideshow + scroll reveal */
(function () {
  function init() {
    document.documentElement.classList.add('glow-js');
    var hero = document.querySelector('.glow-hero');
    var gal = hero && hero.querySelector('.glow-hero-slides');
    if (gal) {
      var slides = gal.querySelectorAll('.wp-block-image'), cur = 0, timer;
      var dots = document.createElement('div'); dots.className = 'glow-dots'; hero.appendChild(dots);
      slides.forEach(function (s, i) {
        var b = document.createElement('button'); b.setAttribute('aria-label', 'Slide ' + (i + 1));
        b.onclick = function () { go(i); restart(); }; dots.appendChild(b);
      });
      var go = function (i) {
        slides[cur].classList.remove('is-active'); dots.children[cur].classList.remove('is-active');
        cur = (i + slides.length) % slides.length;
        slides[cur].classList.add('is-active'); dots.children[cur].classList.add('is-active');
      };
      var restart = function () { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6000); };
      if (slides.length) { go(0); restart(); }
    }
    var els = document.querySelectorAll('.glow-reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
