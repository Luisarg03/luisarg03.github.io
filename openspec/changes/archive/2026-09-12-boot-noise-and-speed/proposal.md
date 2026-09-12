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

## Outcome (closed 2026-09-12)

**Closed as partially delivered and partially superseded. No spec delta was applied.**

This change assumed the homepage renders a full-viewport boot overlay (`BootModule.astro`) before the htop hero. That assumption no longer holds. The work was implemented in `c46e87d` (2026-08-17) and then the *host it was written for* was removed by `c865afe` (2026-08-24, "port prototype 'portfolio as OS' sessions to Astro"), which replaced the homepage with a static hero + neofetch and left `BootModule.astro` orphaned.

### Delivered and still in force

- **Frame cadence 150ms** — `boot.js` owns `FRAME_DELAY = 150`, and the frame list landed at **9 frames**, more aggressive than the ~16 planned. This survives because `boot.js` is a shared engine: `/terminal` consumes it via `Shell.astro`, so the terminal boot types 9 × 150ms ≈ 1.35s.
- **Fallback margin** — the 4000ms safety net was independently lowered to 3000ms in the same commit; 1.35s typing + 0.5s fade ≈ 1.85s leaves ≈ 1.15s of margin. The latent fallback race described in "Why" is gone.

### Built, then superseded, then deleted

- **Noise/interference layer** (`.boot-noise` grain + `steps(8)` jitter + `is-burst` handoff burst) was fully implemented inside `BootModule.astro`. Because it lived in a component the sessions port stopped importing, **it never shipped to production** — the shipped CSS never contained `.boot-ok` or `.boot-noise` rules. The change was deleted on 2026-09-12 together with the other orphaned module components.

### Why no spec sync

Every delta in this change described the homepage boot overlay: its pacing, its noise layer, and its motion budget. None of it describes the shipped system, so merging the delta would write requirements into `openspec/specs/boot-into-content/spec.md` for an overlay that no longer exists — including an ADDED "Boot noise/interference layer" requirement for deleted code. The change was therefore archived with `--skip-specs`: the delta is preserved in the archive as a record of intent, but it is **not** merged into the main specs. The surviving 150ms cadence was left where it actually lives (the shared engine consumed by `/terminal`).

### Follow-up not covered here

`openspec/specs/boot-into-content/spec.md` still specifies the homepage as a boot-and-scroll experience (boot overlay, scroll-driven module loading, module content mapping, status-bar collapse). The sessions redesign invalidated the whole capability, and the spec is stale independently of this change. Retiring or rewriting that capability is a separate decision and was deliberately not taken here.

### Lesson

A change whose host component can be orphaned by a later redesign should have its spec delta target the durable unit (the shared engine), not the component that happens to consume it today.

