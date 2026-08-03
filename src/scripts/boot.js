// Shared boot sequence engine for the LuisOS terminal boot.
// Canonical frame source: window.LUIS_BOOT_FRAMES.
// Consumers load this file as a side-effect import
// (e.g. import '../../scripts/boot') so it runs before their own code;
// src/scripts files cannot be referenced from a plain <script src> tag.

(function () {
  'use strict';

  var FRAME_DELAY = 250;
  var QUICK_MODE_KEY = 'luisos-booted';
  var SKIP_EVENTS = ['keydown', 'click', 'touchstart'];

  // Canonical frames. OK lines carry the marker in the 14-char timestamp
  // column ([ + 5 spaces + OK + 5 spaces + ]), no timestamp, so all boot
  // message text starts at the same column (systemd-authentic alignment).
  // The copper span is baked in so the accent survives static/no-JS output.
  var LUIS_BOOT_FRAMES = [
    '[    0.000000] Booting LuisOS v7.0.0 — luis@cloud',
    '[    0.154200] CPU: Arch x86_64 (4 cores @ 3.4GHz)',
    '[    0.423100] Memory: 64GB RAM detected — swap: 8GB',
    '[    0.891300] Kernel: linux-arch 6.6.0 loaded',
    '[    1.245000] Starting system services...',
    '<span class="boot-ok">[     OK     ]</span> Started OpenSSH Daemon',
    '<span class="boot-ok">[     OK     ]</span> Started Hyprland Compositor',
    '<span class="boot-ok">[     OK     ]</span> Reached target Multi-User System.',
  ];

  window.LUIS_BOOT_FRAMES = LUIS_BOOT_FRAMES;

  function isQuickMode() {
    try {
      return sessionStorage.getItem(QUICK_MODE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function setQuickMode() {
    try {
      sessionStorage.setItem(QUICK_MODE_KEY, '1');
    } catch (e) {
      // Ignore storage errors
    }
  }

  window.initBootSequence = function (containerEl, options) {
    if (!containerEl) return;
    options = options || {};

    var frames = options.frames || LUIS_BOOT_FRAMES;
    var frameDelay = options.frameDelay || FRAME_DELAY;
    var onComplete = options.onComplete;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var frameIndex = 0;
    var skipped = false;
    var completed = false;
    var timer = null;

    function renderLine(text) {
      var line = document.createElement('div');
      line.className = 'boot-line';
      // Frames may carry baked markup (<span class="boot-ok">) so the copper
      // accent renders even in static/no-JS output. Frames are project
      // constants, not user input.
      line.innerHTML = text;
      containerEl.appendChild(line);
      containerEl.scrollTop = containerEl.scrollHeight;
    }

    function renderAll() {
      for (var i = 0; i < frames.length; i++) {
        renderLine(frames[i]);
      }
    }

    function finish() {
      if (completed) return;
      completed = true;
      if (timer) clearTimeout(timer);
      setQuickMode();
      // Notify the container's listeners (e.g. the homepage overlay).
      containerEl.dispatchEvent(new CustomEvent('boot-complete', { bubbles: true }));
      if (onComplete) onComplete();
    }

    function showNextFrame() {
      if (skipped) return;
      if (frameIndex >= frames.length) {
        finish();
        return;
      }
      renderLine(frames[frameIndex]);
      frameIndex++;
      timer = setTimeout(showNextFrame, frameDelay);
    }

    function skip() {
      if (skipped || completed) return;
      skipped = true;
      if (timer) clearTimeout(timer);
      // Render only the frames that have not been shown yet.
      while (frameIndex < frames.length) {
        renderLine(frames[frameIndex]);
        frameIndex++;
      }
      finish();
    }

    // First interaction (once per boot) renders all remaining lines instantly.
    SKIP_EVENTS.forEach(function (type) {
      document.addEventListener(type, skip, { once: true });
    });

    if (reduceMotion || isQuickMode()) {
      renderAll();
      finish();
      return null;
    }

    showNextFrame();

    // Controller for hosts that need to trigger skip from other events
    // (e.g. the homepage overlay skips on wheel/scroll).
    return { skip: skip };
  };
})();
