// Shared boot sequence engine for the LuisOS terminal boot.
// Canonical frame source: boot-frames.js (imported, assigned to window).
// Consumers load this file as a side-effect import
// (e.g. import '../../scripts/boot') so it runs before their own code;
// src/scripts files cannot be referenced from a plain <script src> tag.

import { LUIS_BOOT_FRAMES } from './boot-frames.js';

(function () {
  'use strict';

  var FRAME_DELAY = 250;
  var QUICK_MODE_KEY = 'luisos-booted';
  var SKIP_EVENTS = ['keydown', 'click', 'touchstart'];

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
