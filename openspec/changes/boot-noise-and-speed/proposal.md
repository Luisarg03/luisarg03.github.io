## Why

The homepage boot sequence types 22 frames at 250ms each — 5.5 seconds of typing, roughly twice the 2.5s budget the `boot-into-content` spec already mandates. The sequence also outlasts BootModule's 4s safety fallback, which can fade the overlay mid-sequence and starve the htop bars of their `boot-overlay-hidden` handoff. Separately, the boot's CRT identity (scanlines, prelude glitch) lacks a "live signal" texture: research confirmed Astro ships no native noise/interference effect and no maintained package is worth adding — the right move is a ~300-byte CSS/SVG grain layer, reusing the feTurbulence technique already present in global.css.

## What Changes

- **Faster boot**: trim the frame list from 22 to ~16 lines (drop redundant `Starting <service>…` boilerplate, keep the canonical hardware → services → htop narrative) and lower the frame cadence from 250ms to 150ms → full sequence ≈ 2.4s typing + 0.5s fade ≈ 2.9s total (well under the 4s fallback; also removes the latent fallback race).
- **Noise/interference layer**: new decorative `.boot-noise` overlay inside the boot overlay — SVG feTurbulence grain (same params as the existing `.noise-overlay` in global.css), `steps()` jitter animation, opacity ≤ 0.12, `pointer-events: none`, `mix-blend-mode: overlay`; removed from the DOM with the overlay (no residue on the page).
- **Handoff burst**: brief ≤ 0.3s static burst timed with the final `[ OK ] htop --sort=cpu` frame, framing the boot → content transition.
- **Reduced motion**: unchanged behavior — overlay (and thus noise) never renders.
- **No new dependencies, no canvas, no JS animation libraries** (respects the existing motion-budget constraints).
- **BREAKING**: none. Handoff events (`boot-complete`, `boot-overlay-hidden`) and their consumers (htop bar fill, Shell init) are untouched.

## Capabilities

### New Capabilities
- none — fits entirely within the existing `boot-into-content` capability.

### Modified Capabilities
- `boot-into-content`: pacing requirement updated to the real ≤ 2.5s behavior with explicit 150ms frame cadence; motion budget extended to include the boot noise jitter and handoff burst; new ADDED requirement "Boot noise/interference layer" with skip/fade/no-residue scenarios.

## Impact

- `src/components/modules/BootModule.astro` — noise layer markup + scoped CSS; `frameDelay` 250 → 150.
- `src/scripts/boot.js` — `FRAME_DELAY` default 250 → 150; last-frame hook toggling the burst class.
- `src/scripts/boot-frames.js` — frame list trimmed 22 → ~16.
- `openspec/specs/boot-into-content/spec.md` — archived delta (pacing + motion budget + noise requirement).
- No dependency changes, no API changes, no other pages affected.
