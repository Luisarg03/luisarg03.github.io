## Why

Full-repository audit identified dead code, duplicated logic, and speculative abstractions accumulating from prior iterations. The bloat is small per item but collectively adds ~350 lines of unused/duplicate code, 2 dead JS scripts loaded by no page, 1 redundant QA tool, and stale artifacts from removed features. Cleaning now prevents confusion during future work and keeps the codebase honest.

## What Changes

- **Remove dead public scripts**: `status-bar.js` (sticky bar was removed), `velocity-tracker.js` (sets `--scroll-velocity` which nothing reads)
- **Remove duplicate QA tooling**: `scripts/qa-dual-accent-playwright.cjs` (near-identical to `.js` version), `tools/playwright_toggle_test.py` (duplicates JS toggle tests)
- **Deduplicate terminal helpers**: `normalizePathString` exists in both `FileSystem.ts` and `CommandParser.ts` with near-identical logic; `typeMap` defined twice in `Shell.astro`
- **Remove stale artifacts**: empty `src/components/sections/` dir, stale TODO in `BaseLayout.astro` referencing removed Hero.astro, duplicate `section-label::before` in both `global.css` and `SectionPanel.astro`
- **Remove redundant clipboard fallback**: `document.execCommand('copy')` textarea fallback in `copy-code.js` (navigator.clipboard has 96%+ support)
- **Deduplicate boot frames**: `BootModule.astro` inlines boot frames that already exist in `boot.js`
- **Clean up workflow artifacts**: remove stale `inputs/` directory (duplicate `cv.pdf` + unused `cv.typ`), remove `.cortexkit/` tooling dir

## Capabilities

### New Capabilities

None — this is a pure cleanup change.

### Modified Capabilities

None — no spec-level behavior changes. All removals are dead code or duplicates of existing behavior.

## Impact

- **Files removed**: 4 files (`status-bar.js`, `velocity-tracker.js`, `qa-dual-accent-playwright.cjs`, `playwright_toggle_test.py`), 1 empty directory, 1 tooling directory
- **Files modified**: 5 files (FileSystem.ts, CommandParser.ts, Shell.astro, BootModule.astro, copy-code.js, BaseLayout.astro, SectionPanel.astro, global.css)
- **Dependencies**: none added or removed
- **Risk**: low — all removals are verified dead or duplicate; no behavioral changes
