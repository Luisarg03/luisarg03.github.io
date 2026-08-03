## 1. Design System Foundation

- [x] 1.1 Swap body typography to the mono-only stack in `global.css`; remove the Inter import only if nothing references `--font-sans`
- [x] 1.2 Add `.module-divider` and `.module-content` reveal utilities to `global.css` (scroll-driven with fallback)
- [x] 1.3 Extend `scroll-observer.js` fallback to cover the new module classes without creating duplicate observers
- [x] 1.4 Verify prose readability tokens (base ≥16px, line-height ≥1.6)

## 2. Boot Engine + Boot Module

- [x] 2.1 Extract boot typing logic to `src/scripts/boot.js` (typed lines, `boot-complete` event, skip-on-interaction, sessionStorage quick mode, reduced-motion static)
- [x] 2.2 Create `BootModule` component: 100svh boot screen, scroll hint, collapse-to-status-bar behavior
- [x] 2.3 Point the `/terminal` page Shell at the shared boot engine and remove duplicated typing logic

## 3. Content Modules

- [x] 3.1 Create `IdentityModule` (whoami): name as single h1, role/years/location plain labels, summary, `ls /contact/` actions
- [x] 3.2 Create `SkillsModule` (htop): process-list rows with proficiency bars + shimmer, collapsible on mobile
- [x] 3.3 Create `ExperienceModule` (journalctl): timestamped log lines, ACTIVE badge + pulse, year separators, collapsible details
- [x] 3.4 Create `ShutdownModule` (footer): copyright + social links
- [x] 3.5 Wire module hash anchors (`#identity`, `#skills`, `#experience`, `#contact`)

## 4. Homepage Composition + Layout

- [x] 4.1 Rebuild `index.astro` with module order: Boot → Identity → Skills → Experience → Shutdown
- [x] 4.2 Integrate the status bar and persistent header in `BaseLayout` (blueprint keeps `transition:animate="none"`)
- [x] 4.3 Verify single H1 semantics and structured data are unchanged

## 5. Cross-Page Astro Features

- [x] 5.1 Enable prefetch for internal navigation
- [x] 5.2 Add view transitions (`transition:name` on header/main; terminal-wipe style)
- [x] 5.3 QA transitions across index/projects/now/terminal

## 6. Command Palette

- [x] 6.1 Add `cd /identity`, `cd /skills`, `cd /experience`, `cd /contact`, and `shutdown` commands

## 7. Verification

- [x] 7.1 `astro check` passes
- [x] 7.2 Production build passes
- [x] 7.3 Visual QA per module on desktop and mobile via dev server (boot, reveals, status bar)
- [x] 7.4 Reduced-motion QA: fully static page, no typing
- [x] 7.5 No-JS QA: all content readable without scripts
- [x] 7.6 Lighthouse pass (performance + accessibility)
- [x] 7.7 Remove unreferenced old homepage components (check references first)
- [x] 7.8 Archive the change and update main specs
