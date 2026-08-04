## Context

The codebase has accumulated dead code, duplicated helpers, and stale artifacts from prior iterations. The audit found ~350 lines of removable code across 4 dead files, 5 files with duplicate logic, and several stale artifacts. All removals are verified dead or duplicate — no behavioral changes.

Current state: working portfolio site with 5 modules, terminal engine, command palette, boot sequence. The bloat is peripheral (QA scripts, public scripts, terminal helpers) not core.

## Goals / Non-Goals

**Goals:**
- Remove all verified dead code and files
- Deduplicate terminal helpers (normalizePathString, typeMap)
- Remove stale artifacts (empty dirs, stale TODOs, duplicate CSS)
- Remove redundant clipboard fallback
- Clean up workflow artifacts (inputs/, .cortexkit/)

**Non-Goals:**
- Refactoring working code for style/preference
- Changing any user-visible behavior
- Restructuring the terminal engine architecture
- Cleaning up openspec specs (workflow concern, not code)

## Decisions

### 1. Remove `normalizePathString` duplication

**Decision**: Keep the version in `FileSystem.ts` (returns `string[]`), remove the one in `CommandParser.ts` (returns `string`). CommandParser's `cd` handler calls its own `normalizePath` which is only used for the `cd` path normalization — inline the FileSystem version.

**Rationale**: FileSystem.ts is the canonical path resolution module. CommandParser should depend on it, not reimplement it.

**Alternative considered**: Merge into a shared util — rejected because FileSystem.ts already exports `resolvePath` which handles the full resolution. The `cd` handler just needs the normalized string form.

### 2. Remove duplicate `typeMap` in Shell.astro

**Decision**: Extract `typeMap` as a module-level constant at the top of the `<script>` block, reference it in both `switchWorkspace` and `execute`.

**Rationale**: Same object defined identically at lines 88-90 and 234-241. Single definition, zero risk.

### 3. Deduplicate boot frames in BootModule.astro

**Decision**: Import `LUIS_BOOT_FRAMES` from `boot.js` (already imported as side-effect) and use it for the static fallback content.

**Rationale**: The static fallback duplicates the canonical frames. Using the constant keeps them in sync. The static HTML fallback is only for no-JS — the `boot.js` engine clears it on load anyway.

**Alternative considered**: Remove the static fallback entirely — rejected because it provides graceful degradation if boot.js fails to load.

### 4. Remove `section-label::before` duplication

**Decision**: Keep the definition in `global.css` (canonical), remove the one in `SectionPanel.astro`.

**Rationale**: `global.css` is the design token source. SectionPanel.astro's copy is a maintenance risk — it will drift.

### 5. Remove clipboard fallback

**Decision**: Remove the `fallbackCopy` function and textarea hack in `copy-code.js`. Keep only `navigator.clipboard.writeText`.

**Rationale**: `navigator.clipboard.writeText` has 96%+ browser support. The fallback uses `document.execCommand('copy')` which is deprecated. The remaining 4% is negligible for a portfolio site.

### 6. Keep QA scripts consolidated

**Decision**: Keep `scripts/qa-dual-accent-playwright.js` (the more complete version), delete the `.cjs` duplicate and `tools/playwright_toggle_test.py`.

**Rationale**: The `.js` version has better selector handling and covers the same test cases. The Python script is redundant.

## Risks / Trade-offs

- **[Risk] Removing clipboard fallback breaks old browsers** → Mitigation: 96%+ support; portfolio site audience uses modern browsers. Can re-add if needed.
- **[Risk] Deduplicating normalizePathString breaks terminal cd** → Mitigation: The FileSystem version handles all cases (absolute, relative, `~`, `..`). Test `cd` commands after change.
- **[Risk] Removing velocity-tracker.js breaks something** → Mitigation: Grepped for `--scroll-velocity` — no CSS or JS reads it. Safe to remove.
