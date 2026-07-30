// @ts-nocheck
(function () {
  var sectionEl = document.getElementById('status-section');
  var scrollEl = document.getElementById('status-scroll');
  var timeEl = document.getElementById('status-time');
  if (!sectionEl && !scrollEl && !timeEl) return;

  var sections = [
    { id: 'experience', label: 'experience' },
    { id: 'skills', label: 'infrastructure' },
  ];
  var currentSection = 'hero';
  var io = null;

  function updateSection(id) {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].id === id) { currentSection = sections[i].label; return; }
    }
    currentSection = '—';
  }

  function initObserver() {
    // Re-acquire DOM refs — Astro ClientRouter morphs replaces nodes on navigation
    sectionEl = document.getElementById('status-section');
    scrollEl = document.getElementById('status-scroll');
    timeEl = document.getElementById('status-time');
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(
      function (entries) {
        var best = null, bestRatio = 0;
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting && entries[i].intersectionRatio > bestRatio) {
            best = entries[i].target.id;
            bestRatio = entries[i].intersectionRatio;
          }
        }
        currentSection = window.scrollY < 300 ? 'hero' : best ? (updateSection(best), currentSection) : currentSection;
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75] }
    );
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i].id);
      if (el) io.observe(el);
    }
  }

  initObserver();
  document.addEventListener('astro:page-load', initObserver);

  function tick() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min(Math.round((scrollTop / docHeight) * 100), 100) : 0;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');

    if (sectionEl) sectionEl.textContent = 'section: ' + currentSection;
    if (scrollEl) scrollEl.textContent = pct + '%';
    if (timeEl) timeEl.textContent = hh + ':' + mm;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
