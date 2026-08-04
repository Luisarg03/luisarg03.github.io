(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollRevealSelectors = '.reveal, .reveal-on-view, .reveal-on-view-delay-1, .reveal-on-view-delay-2, .reveal-on-view-delay-3, .reveal-on-view-delay-4, .draw-on-scroll, .module-divider, .module-content, .project-card';

  function initReveals() {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll(scrollRevealSelectors).forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      // 1% threshold: after scroll restoration a module may be only
      // partially in the viewport; 10% would leave it hidden until scroll
      // (rootMargin -80px still sets the reveal distance while scrolling).
      { threshold: 0.01, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll(scrollRevealSelectors).forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  initReveals();
  // Re-observe after Astro client-side navigation (elements already in viewport get missed)
  document.addEventListener('astro:page-load', initReveals);
})();
