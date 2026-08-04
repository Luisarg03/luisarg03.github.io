## 1. Create Card component

- [x] 1.1 Create `src/components/ui/Card.astro` with a `variant`
  prop (`'project' | 'status'`), default slot, and a thin
  wrapper over `.panel .card-accent-top` + the variant class
- [x] 1.2 Add `<style>` for `.card--project` (padding
  `var(--space-5)`, top accent bar hover, lift + shadow on
  hover) and `.card--status` (padding `var(--space-4)`,
  always-visible top accent bar, no hover)

## 2. Refactor /now to use Card

- [x] 2.1 In `src/pages/now.astro`, replace the 3 `<div
  class="panel p-4 card-accent-top">` blocks (AWS DevOps
  Cert, English, Travel log) with `<Card variant="status">`
- [x] 2.2 Import `Card` from `../components/ui/Card.astro`

## 3. Refactor /projects to use Card + bump gap

- [x] 3.1 In `src/pages/projects.astro`, replace the `<article
  class="project-card">` wrapper in the loop with `<Card
  variant="project">`
- [x] 3.2 Move the `.project-card__accent` div to inside the
  Card slot (or render it from Card's variant class for
  `project` — whichever is cleaner)
- [x] 3.3 Update the CSS in `projects.astro`: replace
  `.project-card` and `.project-card__accent` rules with
  Card-style equivalents; keep the existing per-element
  styling (header, meta, status dot, multi-link, details,
  impact) intact
- [x] 3.4 Bump `.projects-grid` gap from `var(--space-4)` /
  `var(--space-5)` to `var(--space-6)` / `var(--space-8)` in
  both the mobile and desktop media queries
- [x] 3.5 Remove the page-specific `<footer
  class="projects-terminal-footer">` block (the footer is
  now in `BaseLayout.astro`)

## 4. Restructure IdentityModule to 3 blocks

- [x] 4.1 In `src/components/modules/IdentityModule.astro`,
  remove the `$ cat /etc/motd` prompt, the summary paragraph,
  the `$ ls /contact/` prompt, and the contact tiles from
  inside the `.identity-info` div
- [x] 4.2 After the `.identity-hero` div (still inside
  `.identity-content`), add a new `.identity-motd` div
  containing the MOTD prompt and the summary
- [x] 4.3 After the `.identity-motd` div, add a new
  `.identity-contact` div containing the contact prompt and
  the contact tiles
- [x] 4.4 Trim the Arch ASCII art from 18 lines to 8 lines,
  keeping the recognizable shape
- [x] 4.5 In the existing `<style>` block, change
  `.identity-hero` `align-items: start` to `align-items:
  center` (at the >= 640px media query)
- [x] 4.6 Add minimal CSS for `.identity-motd` and
  `.identity-contact` (margin-top, full-width within
  `.identity-content`)

## 5. Replace site footer in BaseLayout

- [x] 5.1 In `src/layouts/BaseLayout.astro`, read
  `process.env.VITE_BUILD_COMMIT`, `VITE_BUILD_DATE`,
  `VITE_BUILD_UPTIME_DAYS` in the frontmatter (with
  `'unknown'` / `'unknown'` / `'?d'` fallbacks)
- [x] 5.2 Replace the existing simple footer markup (lines
  174-200) with a new terminal-style footer: prompt
  `~/luisarg $ git rev-parse --short HEAD` + commit + date +
  uptime + cwd
- [x] 5.3 Preserve the `hideFooter` flag (used to suppress
  the footer on the homepage where `ShutdownModule`
  renders)
- [x] 5.4 Add `<style>` for `.site-terminal-footer`
  (monospace, muted text, padding, top border)

## 6. Visual verification

- [x] 6.1 Start the dev server (`./node_modules/.bin/astro
  dev --background`) and capture 3 desktop screenshots
  (1440x900) of `/`, `/now`, `/projects` to
  `/tmp/opencode/qa-homepage/csvc-{home,now,projects}-
  desktop-1440x900.png`
- [x] 6.2 Capture 3 mobile screenshots (390x844) to
  `/tmp/opencode/qa-homepage/csvc-{home,now,projects}-
  mobile-390x844.png`
- [x] 6.3 Visually verify (designer lane): IdentityModule
  shows 3 blocks; ASCII art is 8 lines; data centers
  vertically; /now and /projects use the same Card chrome;
  /projects grid has more gap; site footer is terminal-style
  on /now and /projects; no regressions on existing
  features
- [x] 6.4 Run `astro check` to confirm no TypeScript or
  template errors
- [x] 6.5 Stop the dev server

## 7. Spec sync

- [x] 7.1 Append the 2 ADDED requirements from
  `specs/homepage-sections/spec.md` to
  `openspec/specs/homepage-sections/spec.md`
- [x] 7.2 Append the 1 ADDED requirement from
  `specs/project-showcase/spec.md` to
  `openspec/specs/project-showcase/spec.md`
- [x] 7.3 Append the 2 ADDED requirements from
  `specs/visual-system/spec.md` to
  `openspec/specs/visual-system/spec.md`
