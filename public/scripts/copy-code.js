// @ts-nocheck
(function () {
  var STYLE_ID = 'copy-code-styles';
  var WRAP_CLASS = 'code-block-wrap';
  var BTN_CLASS = 'copy-code-btn';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.' + WRAP_CLASS + ' { position: relative; }',
      '.' + BTN_CLASS + ' {',
      '  position: absolute;',
      '  top: 0.5rem;',
      '  right: 0.5rem;',
      '  z-index: 1;',
      '  font-family: var(--font-mono);',
      '  font-size: var(--text-xs);',
      '  color: var(--color-text-muted);',
      '  background: var(--color-surface-alt);',
      '  border: 1px solid var(--color-border);',
      '  border-radius: 4px;',
      '  padding: 0.25rem 0.5rem;',
      '  cursor: pointer;',
      '  opacity: 0;',
      '  transition: opacity 0.2s ease, color 0.2s ease, border-color 0.2s ease;',
      '}',
      '.' + WRAP_CLASS + ':hover .' + BTN_CLASS + ',',
      '.' + BTN_CLASS + ':focus-visible { opacity: 1; }',
      '.' + BTN_CLASS + ':hover { color: var(--color-accent); border-color: var(--color-border-active); }',
      '.' + BTN_CLASS + '--copied { color: var(--color-success); border-color: var(--color-success); }',
    ].join('\n');
    document.head.appendChild(style);
  }

  function showFeedback(button) {
    button.textContent = 'copied';
    button.classList.add(BTN_CLASS + '--copied');
    setTimeout(function () {
      button.textContent = 'copy';
      button.classList.remove(BTN_CLASS + '--copied');
    }, 1500);
  }

  function copyText(text, button) {
    navigator.clipboard.writeText(text).then(
      function () { showFeedback(button); }
    );
  }

  function init() {
    injectStyles();
    var pres = document.querySelectorAll('.prose-content pre');
    for (let i = 0; i < pres.length; i++) {
      const pre = pres[i];
      // Skip if already wrapped (astro:page-load re-runs after client navigation)
      if (pre.parentElement && pre.parentElement.classList.contains(WRAP_CLASS)) continue;

      var wrap = document.createElement('div');
      wrap.className = WRAP_CLASS;
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = BTN_CLASS;
      button.textContent = 'copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.addEventListener('click', function () {
        copyText(pre.textContent, button);
      });
      wrap.appendChild(button);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('astro:page-load', init);
})();
