(function () {
  // Scroll velocity tracker for blueprint
  let lastScrollY = 0;
  let velocity = 0;
  const DECAY = 0.92;

  function onScroll() {
    const y = window.scrollY;
    velocity = Math.abs(y - lastScrollY);
    lastScrollY = y;
    // Clamp velocity to [0, 1] range
    const v = Math.min(velocity / 30, 1);
    document.documentElement.style.setProperty('--scroll-velocity', v.toFixed(3));
    requestAnimationFrame(offScroll);
  }

  let ticking = false;
  function offScroll() { ticking = false; }
  function throttledScroll() {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Decay velocity when not scrolling
  setInterval(() => {
    velocity *= DECAY;
    const v = Math.min(velocity / 30, 1);
    document.documentElement.style.setProperty('--scroll-velocity', v.toFixed(3));
  }, 50);
})();
