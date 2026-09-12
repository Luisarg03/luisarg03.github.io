## 1. Speed up boot sequence — DELIVERED

- [x] 1.1 Trim `boot-frames.js` — delivered in `c46e87d`, further than planned: the list landed at **9 frames**, not ~16. Kept the three hardware lines, the service `[ OK ]` cadence, and the network/htop handoff. Export shape unchanged (array of HTML strings).
- [x] 1.2 Frame cadence 250 → 150ms — `FRAME_DELAY = 150` in `boot.js`. Because this lives in the shared engine and not in the caller, it survived the removal of the homepage overlay and is what `/terminal` uses today.
- [x] 1.3 Verify timing math — 9 × 150ms ≈ 1.35s typing + 0.5s fade ≈ **1.85s**. The fallback was independently lowered from 4000ms to 3000ms in the same commit, so the margin is ≈ 1.15s and the early-trigger race described in the proposal is gone.

## 2. Noise/interference layer — BUILT, NEVER SHIPPED, NOW DELETED

- [x] 2.1 `.boot-noise` decorative div in `BootModule.astro` — built in `c46e87d`.
- [x] 2.2 Scoped feTurbulence grain CSS + `steps(8)` jitter + reduced-motion guard — built in `c46e87d`.
- [x] 2.3 `is-burst` handoff hook in `boot.js` (both the normal and the skip render path) — built in `c46e87d`.
- [ ] 2.4 **Superseded before it ever shipped.** `c865afe` (2026-08-24) replaced the homepage with the sessions layout and stopped importing `BootModule.astro`; the shipped CSS never contained `.boot-ok` or `.boot-noise`. The layer, its host component, and its `boot.js` hook were deleted on 2026-09-12 as dead code.

## 3. QA and visual validation

- [x] 3.1 Build green — verified at the time and re-verified 2026-09-12 after the dead-code removal: `astro check` 0 errors / 0 warnings, `astro build` 7 pages.
- [x] 3.2 Sequence duration measured — 1.85s total, under the 2.5s typing budget in the spec delta.
- [x] 3.3 Playwright screenshots under `/tmp/opencode/qa-homepage/` — captured during the original work and deliberately not committed; they depict an overlay that no longer exists.
- [ ] 3.4 Designer PNG review — **not completed**. The review target (homepage boot overlay) was removed before sign-off, and burst intensity / grain opacity became moot.
- [ ] 3.5 Handoff verification — **partially obsolete**. `boot-overlay-hidden` and the htop bar-fill cascade belonged to the removed homepage modules. The surviving handoff is `boot-complete` → `initShell` on `/terminal`, verified working 2026-09-12.

## 4. Spec and memory

- [x] 4.1 Archive the change — archived with `--skip-specs`, so the delta is preserved in the archive as a record of intent but **not merged**. Every delta described the removed homepage overlay; applying it would have written a false "Boot noise/interference layer" requirement into `openspec/specs/boot-into-content/spec.md`. Rationale recorded in the proposal's Outcome section.
- [x] 4.2 Update project memory — done 2026-09-12: cadence 150ms, 9 frames, boot lives on `/terminal`, noise layer never shipped, homepage overlay removed.

## 5. Follow-up (not part of this change)

- [ ] 5.1 `openspec/specs/boot-into-content/spec.md` still specifies the homepage as a boot-and-scroll experience and is stale independently of this change. Retire or rewrite the capability — separate decision, deliberately not taken here.
