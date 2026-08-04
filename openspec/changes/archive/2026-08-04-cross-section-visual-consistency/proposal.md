## Why

The site has 3 sections that each evolved their own visual language
(IdentityModule on `/`, `/now`, `/projects`), causing inconsistency:
- The IdentityModule renders the ASCII art + 5 detail rows + MOTD
  prompt + summary + `$ ls /contact/` block ALL inside the
  right-side info column. Visually it reads as "art block" vs
  "everything else block" instead of 3 distinct vertical sections.
- The Art ASCII is 18 lines tall; the 5 detail rows are ~6em tall.
  At `align-items: start` the art extends well below the data,
  looking unbalanced.
- `/now` and `/projects` use different card chrome (`.panel
  p-4 card-accent-top` vs `.project-card` with its own border,
  padding, top accent). Same concept, different tokens.
- The site footer in `BaseLayout.astro` is a simple copyright +
  github/linkedin links, but `/projects` has a page-specific
  terminal-style footer with build metadata. `/now` has no
  footer. Each section ships its own footer.
- The `/projects` grid has a tight `gap: var(--space-4)` mobile
  / `var(--space-5)` desktop between cards.

The user wants visual consistency across sections and a "single
OS feel" across the site.

## What Changes

- **`/projects` (refactor `src/pages/projects.astro`)**:
  - Replace the inline `<article class="project-card">` markup
    with the new shared `<Card variant="project">` component.
  - Bump `.projects-grid` gap from `var(--space-4)` (mobile) /
    `var(--space-5)` (desktop) to `var(--space-6)` (mobile) /
    `var(--space-8)` (desktop) for more breathing room between
    cards.
  - Remove the page-specific `<footer
    class="projects-terminal-footer">` block (the terminal-style
    footer is now in `BaseLayout.astro`).
  - The filter chips, status dots, meta row, multi-link row,
    case-study disclosure, scroll-reveal, and text scramble
    behavior (from the previous `projects-rich-showcase` change)
    are preserved unchanged.

- **`/now` (refactor `src/pages/now.astro`)**:
  - Replace the 3 `<div class="panel p-4 card-accent-top">`
    blocks (AWS DevOps Cert, English, Travel log cards) with
    the new shared `<Card variant="status">` component. The
    content (status indicator, progress bar, travel log) is
    preserved.

- **`src/components/modules/IdentityModule.astro` (refactor)**:
  - Restructure: remove the `$ cat /etc/motd` prompt, the
    summary paragraph, the `$ ls /contact/` prompt, and the
    contact tiles from the `.identity-info` div.
  - Place those elements as 2 new sibling blocks BELOW the
    `.identity-hero` grid: a `.identity-motd` block (the MOTD
    prompt + summary) and a `.identity-contact` block (the
    contact prompt + tiles).
  - The `.identity-info` block now contains only the 5 detail
    rows (Name, Role, Experience, Current, Location). The H1
    detail row (Name) is preserved.
  - Trim the Arch ASCII art from 18 lines to 8 lines,
    preserving the recognizable Arch shape at a tighter scale.
  - Change the hero grid `align-items: start` to `align-items:
    center` so the data column centers vertically against the
    art's height.

- **`src/layouts/BaseLayout.astro` (refactor)**:
  - Replace the simple copyright + github/linkedin footer
    markup (lines 174-200) with the terminal-style footer:
    `~/luisarg $ git rev-parse --short HEAD` prompt + commit +
    build date + uptime + cwd.
  - The footer reads `process.env.VITE_BUILD_COMMIT`,
    `VITE_BUILD_DATE`, `VITE_BUILD_UPTIME_DAYS` (injected by
    the existing `vite-plugin-buildinfo.js`).
  - The `hideFooter` flag (used to suppress the footer on the
    homepage where `ShutdownModule` replaces it) is preserved.
  - Remove the inline page-specific footer from `projects.astro`.

- **`src/components/ui/Card.astro` (new file)**:
  - A shared, slot-based card primitive with 2 visual variants:
    `variant="project"` (border, surface bg, padding `p-5`,
    top accent bar, hover lift, shadow) and `variant="status"`
    (border, surface bg, padding `p-4`, top accent bar, no
    hover).
  - Uses the existing `.panel` and `.card-accent-top` classes
    from `visual-system`'s "Panel border convention" requirement
    as the visual base.
  - Replaces the per-page card markup in `/now` and
    `/projects`.

## Capabilities

### Modified Capabilities
- `homepage-sections`: ADD requirements for the 3-block
  IdentityModule restructure (art+data hero, MOTD block,
  contact block) and for the ASCII art height alignment (data
  column centers vertically; art is trimmed to 8 lines).
- `project-showcase`: ADD requirement for the increased grid
  gap between cards.
- `visual-system`: ADD requirements for the shared `Card`
  component primitive and for the unified terminal-style site
  footer (replacing the simple copyright footer in
  `BaseLayout.astro`).

## Impact

- `src/components/ui/Card.astro` — new file (~60 lines).
- `src/components/modules/IdentityModule.astro` — restructure
  (3 blocks), art trim, alignment change.
- `src/layouts/BaseLayout.astro` — replace simple footer with
  terminal-style footer.
- `src/pages/now.astro` — refactor 3 card divs to use `<Card>`.
- `src/pages/projects.astro` — refactor card markup, bump gap,
  remove page-specific footer.
- 3 spec files modified: `openspec/specs/homepage-sections/`,
  `openspec/specs/project-showcase/`,
  `openspec/specs/visual-system/`.
- No new dependencies. No new components besides `Card.astro`.
