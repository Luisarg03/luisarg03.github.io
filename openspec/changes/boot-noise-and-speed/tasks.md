## 1. Speed up boot sequence

- [ ] 1.1 Trim `boot-frames.js` from 22 to ~16 frames: drop redundant `Starting <service>…` boilerplate and duplicate `[ OK ]` lines; keep the first three hardware lines, the service `[ OK ]` cadence, and the final three handoff lines (`[ OK ] Network connectivity established`, `Starting htop...`, `[ OK ] htop --sort=cpu`). Keep the `LUIS_BOOT_FRAMES` export shape unchanged (array of HTML strings).
- [ ] 1.2 Set frame cadence 250 → 150ms: `frameDelay` in BootModule.astro initBootSequence call AND `FRAME_DELAY` default in boot.js (keep both in sync).
- [ ] 1.3 Verify timing math: 16 × 150ms = 2.4s typing + 0.5s fade = 2.9s total < 4000ms fallback (BootModule:125). Update the fallback comment; assert no early-trigger race.

## 2. Noise/interference layer

- [ ] 2.1 Add decorative `.boot-noise` div inside the boot overlay in BootModule.astro (`aria-hidden="true"`, `pointer-events: none`), removed with the overlay.
- [ ] 2.2 Add scoped CSS in BootModule.astro: feTurbulence data-URI grain (baseFrequency 0.9, numOctaves 4 — matching global.css `.noise-overlay`), 128px tile, `background-size: 128px`, base opacity ≤ 0.12, `mix-blend-mode: overlay`, `@keyframes boot-noise-jitter` shifting background-position by integer tile multiples with `steps(8)` over ~0.5s; `prefers-reduced-motion: reduce` → `animation: none`.
- [ ] 2.3 Add handoff burst: boot.js toggles `is-burst` on the noise element when the final frame renders (both normal `showNextFrame` path and skip instant-render path); CSS `.boot-noise.is-burst` runs a ≤ 0.3s burst keyframe (opacity 0 → 0.3 → 0).

## 3. QA and visual validation

- [ ] 3.1 Run `astro build` and `astro dev` (background); verify no console errors on `/`.
- [ ] 3.2 Measure the real sequence duration numerically (typing + fade) and assert it is ≤ 3.0s and under the 4000ms fallback.
- [ ] 3.3 Playwright screenshots to /tmp/opencode/qa-homepage/: desktop 1440×900 + mobile 390×844 — mid-sequence noise frame, handoff burst frame, post-fade clean state (no residue), reduced-motion (no overlay), quick-mode revisit (no overlay).
- [ ] 3.4 Designer PNG review of the screenshots (designer has final call on burst intensity, grain opacity, and stacking order); fix any issues reported.
- [ ] 3.5 Verify handoff intact: `boot-overlay-hidden` still triggers the htop bar-fill cascade; `boot-complete` still initializes the terminal shell (numeric/behavioral check).

## 4. Spec and memory

- [ ] 4.1 Archive the change (OpenSpec archive merges the delta into `openspec/specs/boot-into-content/spec.md`).
- [ ] 4.2 Update project memory: new frame cadence (150ms), frame count (~16), noise layer + burst behavior, fallback margin.
