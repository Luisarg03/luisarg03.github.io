## 1. Remove Dead Files

- [x] 1.1 Delete `public/scripts/status-bar.js` (dead — old sticky bar removed)
- [x] 1.2 Delete `public/scripts/velocity-tracker.js` (dead — `--scroll-velocity` unused)
- [x] 1.3 Delete `scripts/qa-dual-accent-playwright.cjs` (duplicate of `.js` version)
- [x] 1.4 Delete `tools/playwright_toggle_test.py` (duplicates JS toggle tests)
- [x] 1.5 Remove empty `src/components/sections/` directory
- [x] 1.6 Remove stale `inputs/` directory (duplicate `cv.pdf` + unused `cv.typ`)
- [x] 1.7 Remove `.cortexkit/` tooling directory

## 2. Remove Dead Script References

- [x] 2.1 Remove `<script defer src="/scripts/status-bar.js">` from BaseLayout.astro (if present)
- [x] 2.2 Remove `<script defer src="/scripts/velocity-tracker.js">` from BaseLayout.astro

## 3. Deduplicate Terminal Helpers

- [x] 3.1 In `CommandParser.ts`: remove `normalizePath` method (lines 295-314), update `cd` handler to use `resolvePath` from FileSystem.ts for path normalization
- [x] 3.2 In `Shell.astro`: extract `typeMap` as a module-level constant, remove duplicate at line 234

## 4. Deduplicate Boot Frames

- [x] 4.1 In `BootModule.astro`: import `LUIS_BOOT_FRAMES` from boot.js, use it for static fallback instead of inlined frames

## 5. Remove Duplicate CSS

- [x] 5.1 In `SectionPanel.astro`: remove `.section-label::before` rule (keep the one in global.css)

## 6. Remove Clipboard Fallback

- [x] 6.1 In `copy-code.js`: remove `fallbackCopy` function and textarea hack, simplify `copyText` to use only `navigator.clipboard.writeText`

## 7. Clean Up Stale Artifacts

- [x] 7.1 In `BaseLayout.astro`: remove stale TODO comment at line 170 referencing Hero.astro

## 8. Verify

- [x] 8.1 Run `astro build` — confirm no build errors
- [x] 8.2 Run `astro check` — confirm no type errors
- [x] 8.3 Manual test: terminal page `cd` commands work correctly
- [x] 8.4 Manual test: copy-code button works on prose pages
