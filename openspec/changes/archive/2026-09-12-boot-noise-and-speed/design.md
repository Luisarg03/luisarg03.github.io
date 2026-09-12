## Context

The homepage renders a full-viewport boot overlay (`BootModule.astro`) before the htop hero. Current state:

- `boot-frames.js` exports `LUIS_BOOT_FRAMES`: 22 frames, first three are hardware boot lines, eleven carry `[ OK ]` spans, last three are the network/htop handoff lines ending in `[ OK ] htop --sort=cpu`.
- `boot.js` types one frame per `setTimeout` at `FRAME_DELAY = 250` (default; BootModule passes 250 explicitly). 22 × 250ms = 5.5s typing — the archived `boot-into-content` spec requires ≤ 2.5s, so the implementation violates its own spec.
- BootModule keeps a 4000ms safety fallback (`fadeAndRemove`); with 5.5s typing the fallback fires before the sequence ends, fades the overlay mid-sequence, and `boot-complete`/`boot-overlay-hidden` never dispatch — the htop bars never fill on a fresh visit.
- The overlay already carries CRT scanlines (`.boot-overlay::before`, repeating-linear-gradient) and a prelude glitch (`boot-prelude-glitch`, RGB-split text-shadow 0.5s).
- A site-wide grain texture exists in `global.css:666` (`.noise-overlay`, feTurbulence baseFrequency 0.9 / numOctaves 4, 8s steps(10)) but is used only on /now and /projects — not on the home or boot.
- Research verdict: Astro has no built-in or community noise/glitch effect; npm libraries are dead/heavy; the canonical technique is a CSS-only feTurbulence data-URI + `steps()` background-position jitter (~300 bytes, 96.7% support, zero JS).
- View transitions are NOT configured (prefetch only) — noise is scoped to the boot overlay, no page-transition treatment.

## Goals / Non-Goals

**Goals:**
- Full boot sequence (all frames typed) within ~2.4s; total overlay lifetime ≈ 2.9s including fade — under the 4s fallback, satisfying the archived ≤ 2.5s typing budget.
- Subtle grain-jitter "live signal" texture over the boot overlay, reusing the existing feTurbulence technique.
- Brief static burst (≤ 0.3s) when the final `[ OK ] htop --sort=cpu` frame renders, framing the handoff.
- Zero new dependencies; no canvas; no JS animation libraries.
- No layout shift, no LCP/CLS impact, no residue after overlay removal, handoff events intact.

**Non-Goals:**
- View-transition noise effects (ClientRouter not configured; out of scope).
- Canvas/per-frame JS noise (JS on the critical path; overkill for a ~2.5s window).
- Persistent site-wide noise (home stays clean after the boot, as today).
- Reduced-motion static-texture fallback (the overlay never renders under reduced motion, so the noise never appears — no special case needed).
- Changes to fade duration (0.5s), handoff events, or htop bar-fill cascade.

## Decisions

### 1. Frame cadence 150ms + frame list trimmed 22 → ~16
Full sequence ≈ 16 × 150ms = 2.4s typing; + 0.5s fade = 2.9s total < 4s fallback.
- Trim redundant `Starting <service>…` boilerplate and duplicate `[ OK ]` lines; keep the first three hardware lines, the service `[ OK ]` cadence, and the final three handoff lines (`[ OK ] Network connectivity established`, `Starting htop...`, `[ OK ] htop --sort=cpu`).
- Alternatives rejected: keep 22 frames at 170ms (3.7s — still over the 2.5s budget); keep 22 at 150ms (3.3s — over budget); trim frames but keep 250ms (staccato pacing, feels slow).

### 2. CSS feTurbulence grain, reusing the existing technique
A `.boot-noise` div inside the boot overlay (`aria-hidden`, `pointer-events: none`), with an inline SVG feTurbulence data-URI (~300 bytes) as background-image, 128px tile, `background-size: 128px`. Jitter via `@keyframes` animating `background-position` by integer multiples of the tile size with `steps(8)` over ~0.5s — seamless (shifts are whole tiles), GPU-cheap, zero JS.
- Params (baseFrequency 0.9, numOctaves 4) match the existing `.noise-overlay` grain in global.css for visual consistency.
- Alternatives rejected: canvas per-frame (JS on critical path, overkill), SMIL `baseFrequency` animation (engine-inconsistent), animated GIF/WebP (extra asset on the critical path, hard-edged loops), npm libs (all unmaintained or heavy).

### 3. Seat the grain in the color space
`mix-blend-mode: overlay` + base opacity ≤ 0.12 so the grain reads as signal texture over the teal/copper terminal rather than grey film. Stacking: below the text (the noise layer sits under `.boot-content` text but above the scanlines' z-index, or at a z-index above content with blend — final layering confirmed visually in QA).

### 4. Burst hook in boot.js, not CSS timing
`boot.js` toggles `is-burst` on the noise element when the final frame renders — in both the normal `showNextFrame` path and the skip/instant-render path. CSS: `.boot-noise.is-burst` runs a ≤ 0.3s burst keyframe (opacity 0 → 0.3 → 0).
- Alternative rejected: pure-CSS `animation-delay: (N−1) × frameDelay` — brittle to frame edits and wrong under skip.

### 5. Reduced motion: no special case
The existing guard never renders the overlay under `prefers-reduced-motion: reduce`, so the noise never appears. Under skip/quick-mode the burst may flash during the 0.5s fade — acceptable (decorative, ≤ 0.3s).

### 6. Fallback race fixed by pacing, not by new code
With 2.4s typing + 0.5s fade = 2.9s < 4s fallback, the 4000ms safety net no longer fires mid-sequence. Only the comment at BootModule:125 is updated; QA asserts the margin.

## Risks / Trade-offs

- [Burst too aggressive] → Cap opacity at 0.3 and duration at 0.3s; designer validates screenshots.
- [Grain hurts text legibility] → Keep opacity ≤ 0.12 + blend mode; designer validates.
- [Jitter seams at tile edges] → Shifts are integer multiples of the 128px tile; QA screenshot check.
- [Pacing drift breaks the 2.5s budget] → QA measures sequence duration numerically; task includes a re-measure step.
- [Frame trim alters the boot narrative] → Keep the canonical first-3 (hardware) and last-3 (handoff) lines; reviewer checks the diff against the original narrative.

## Migration Plan

Single-commit feature change; rollback = revert the commit. The `boot-into-content` spec delta is archived after QA passes (OpenSpec archive merges deltas into `openspec/specs/`).

## Open Questions

- Exact burst intensity/opacity is tuned from the designer PNG review — designer has final call on the feel.
- Whether the noise layer sits above or below the typed text in stacking order — resolved during visual QA.
