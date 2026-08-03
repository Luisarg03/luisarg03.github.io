## Why

The homepage reads as a 2021-era "hacker portfolio": static stacked section panels inside a plain container. Astro's modern capabilities (view transitions, prefetch, scroll-driven animation utilities) are imported but unused, and the terminal/OS personality barely shows on the landing page. The owner wants the layout concept itself reimagined — maximum creativity while keeping the OS soul (dark theme, copper accent, JetBrains Mono, monogram, command palette). The chosen concept is "Boot Into Content": the homepage scroll IS the boot process, and every content module loads like a system module.

## What Changes

- Homepage `/` becomes a scroll-driven "boot into content" experience: viewport 1 is a full-screen terminal boot sequence; scrolling past it loads each content module with a drawing divider and staggered line reveal
- Content modules map to terminal commands: `whoami` (identity + summary + `ls /contact/` contact actions), `htop` (skills as process list), `journalctl` (experience as timestamped log), `shutdown` (footer)
- The boot screen collapses into a persistent sticky status bar once scrolled past
- Typography becomes mono-only (JetBrains Mono everywhere; the name keeps the fluid display scale)
- Command palette gains module-jump commands (`cd /identity`, `cd /skills`, `cd /experience`, `cd /contact`, `shutdown`)
- **BREAKING**: first-viewport identity ("10-second comprehension") is removed — the pure boot screen precedes identity; identity requires at most one scroll
- **BREAKING**: the neofetch hero card and the skills marquee strip are removed
- **BREAKING**: the skills code-block presentation is replaced by an htop-style process list; the experience timeline is replaced by a journalctl-style log
- Cross-page view transitions and prefetch are activated (persistent header, terminal-wipe feel)
- No new dependencies

## Capabilities

### New Capabilities
- `boot-into-content`: scroll-driven homepage module system — boot screen, scroll-driven module loading reveals, boot collapse to status bar, command-palette module navigation, mono-only typography, motion budget and reduced-motion fallbacks

### Modified Capabilities
- `home-hero`: hero replaced by the whoami identity module behind the boot screen; 10-second comprehension scenario removed; plain-language identity labels preserved
- `homepage-sections`: stacked section composition replaced by boot + module composition; neofetch card and skills marquee removed; scroll anchors map to modules
- `skills-visualization`: code-presented skill categories replaced by an htop process-list presentation
- `experience-timeline`: drawn timeline spine replaced by a journalctl log presentation

## Impact

- `src/pages/index.astro` — new module composition
- `src/components/` — new module components (boot, identity, skills, experience, contact, shutdown); boot typing logic extracted to a shared script; CommandPalette extended with module jumps
- `src/layouts/BaseLayout.astro` — status bar integration, persistent header, view transitions
- `src/styles/global.css` — mono-only typography, module divider and module content reveal utilities
- `src/scripts/` — boot engine script, scroll observer extension for new reveal classes
- Specs: new `boot-into-content`; delta specs for `home-hero`, `homepage-sections`, `skills-visualization`, `experience-timeline`
- No dependency, API, or data-model changes
