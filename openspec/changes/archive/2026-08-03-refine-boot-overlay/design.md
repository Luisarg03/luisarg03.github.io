## Context

The archived boot-into-content design made the boot a 100svh scroll section. Live feedback showed it reads as a static, misaligned text block at the top: the section starts below the sticky header + main padding, so its box is taller than the viewport; the quick mode renders it instantly on revisits (no animation); and identity requires a scroll. The owner's mental model: "an animation that plays when you enter my page" — transient, then content.

## Goals

- Boot as a moment: transient overlay on entry, then content
- Identity visible in the first viewport without scrolling (restores 10-second comprehension)
- Zero layout shift from the boot (overlay is `position: fixed` — takes no space)
- Keep scroll-driven module loading (whoami / htop / journalctl / shutdown)
- Systemd-authentic `[  OK  ]` column alignment; unified hostname
- No new dependencies; reduced motion and no-JS skip the overlay entirely

## Non-Goals

- No change to the terminal page's boot (it stays a content section there — the boot IS the terminal page's content)
- No redesign of the other modules (only boot + order + header chip)
- No blog, no light mode

## Decisions

### D1 — Overlay mechanics
`position: fixed; inset: 0; z-index: 40` (above the header, below the command palette at 9999), opaque page background. Markup starts `hidden` (no-JS: never shown). JS removes `hidden`, adds a reveal class, runs the typing engine, then fades (CSS opacity transition ≤ 0.5s) and removes the overlay from the DOM entirely. Scroll is locked during the overlay (`html { overflow: hidden }`) and released on completion or skip. The header sits behind the opaque overlay during play and is revealed by the fade — no separate header transition needed.

### D2 — Skip semantics
Any interaction (click, keydown, touchstart from the engine; wheel/scroll added at the component level) completes typing instantly and starts the fade. Scroll-as-skip also releases the scroll lock naturally.

### D3 — Quick mode
sessionStorage `luisos-booted` → overlay skipped entirely (no animation, no fade); the page is content from the start. Same key the engine already sets.

### D4 — Entry detection
Overlay plays only on full page loads of `/`. Guards: skip when `performance.getEntriesByType('navigation')[0].type` is `back_forward`; skip when the page was reached via client-side navigation (Astro view transition — set a flag on `astro:page-load`); skip when the URL carries a module hash (direct jump to `#skills` etc.). Session quick mode covers the common revisit case.

### D5 — Status bar removal
The sticky status bar, its IntersectionObserver, and the collapse CSS are deleted from BootModule. The persistent BaseLayout header gains an optional `[LOADED]` indicator chip, enabled on the homepage via a `showBootChip` prop (default false), shown when boot completes and statically when the boot is skipped (reduced motion / no-JS / quick mode). Rationale: with identity at the top, the header already persists — a second sticky bar was redundant.

### D6 — OK column alignment
Frames switch to the systemd-authentic column layout: `[  OK  ]` replaces the timestamp on those lines, padded to the 14-char timestamp column width (`[` + 5 spaces + `OK` + 5 spaces + `]`), so all boot message text starts at the same column. Timestamps remain only on info lines.

### D7 — Hostname unification
Canonical `LUIS_BOOT_FRAMES` in `boot.js` switches `luis@arch` → `luis@cloud`, matching the homepage frames. The terminal page consumes the canonical frames, so both pages show `luis@cloud`.

### D8 — Reduced motion / no-JS
No overlay at all: `hidden` is never removed, content is immediately visible, no scroll lock, no listeners. The `[LOADED]` chip renders statically on the homepage.

### D9 — Performance
Removing the 100svh collapse animation eliminates the CLS source (Lighthouse CLS 0.131 → ~0). LCP remains the first painted content (boot lines while typing, or identity text under quick/reduced motion). No `content-visibility` work in this change.

## Risks / Trade-offs

- Overlay covers content for ≤ 2.5s on first visit → mitigation: skippable, transient, decorative-only; content is painted behind it (no layout shift); quick mode skips on revisits
- Scroll lock during the overlay could trap the user if the fade fails → mitigation: CSS transition with a fallback timeout (≈ 800ms) that always removes the overlay and unlocks scroll
- View transitions: overlay z-40 sits below view-transition pseudo-elements (root level) → navigation away during play is not possible (overlay intercepts); after the fade the overlay is gone — no conflict
- Two boot modes (homepage overlay vs terminal page section) could drift → mitigation: single engine (`boot.js`) and shared canonical frames; only presentation differs

## Migration

- BootModule: section → overlay; delete the status bar markup, its observer, and the scroll hint (no longer needed — the overlay fades itself)
- index.astro: module order Identity → Skills → Experience → Shutdown; BootModule stays first in DOM as the overlay (`position: fixed` takes it out of flow, so the identity module is the first actual content for a11y/crawlers)
- Header: chip markup + `showBootChip` prop; BaseLayout default false
- Rollback: restore the BootModule section version from git + revert the index order (single-file diffs)

## Open Questions

- None blocking. (Chip label `[LOADED] LuisOS v7.0.0` inherited from the removed status bar.)
