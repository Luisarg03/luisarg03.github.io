## Why

The homepage uses a terminal shell as its primary UI — visitors must type commands (`ls`, `cat experience/interbank.md`) to discover content. This blocks recruiter engagement, breaks SEO, and frustrates mobile users. The `/now` page already has proper scrollable sections with the same terminal aesthetic. We unify the homepage into a scrollable page using components that already exist, while preserving the terminal as a keyboard-accessible easter egg.

## What Changes

- **BREAKING**: Homepage (`index.astro`) switches from terminal shell to `BaseLayout` + scrollable sections (Hero, Experience, Skills, Contact)
- New terminal page (`pages/terminal.astro`) hosts the interactive shell as an easter egg, accessible via `Ctrl+Shift+T` or a footer link
- `Shell.astro` decoupled from homepage data injection (`nowBody` no longer needed at shell level)
- Command palette gains an "Open Terminal" entry
- Footer shows terminal shortcut hint
- Remove `WorkspaceBar`, `BootSequence`, and helper chips from the main user flow (still used on terminal page)
- `/now` page optionally merges its status cards into the homepage as a section (or stays separate)

## Capabilities

### New Capabilities
- `homepage-sections`: Unified scrolling homepage with Hero, Experience Timeline, Skills, and Contact sections using existing components under `BaseLayout`
- `terminal-easter-egg`: Interactive terminal shell accessible via keyboard shortcut (`Ctrl+Shift+T`) or from command palette, hosted at `/terminal`

### Modified Capabilities
- `site-navigation`: Homepage navigation changes from terminal commands to scroll + section anchors; terminal becomes a secondary entry point; command palette gains terminal entry

## Impact

- `src/pages/index.astro`: full rewrite (remove Shell, add BaseLayout + sections)
- `src/pages/terminal.astro`: new page for standalone terminal
- `src/pages/now.astro`: unchanged (or minor merge of status cards to homepage)
- `src/layouts/BaseLayout.astro`: add terminal shortcut hint in footer
- `src/components/terminal/Shell.astro`: remove `nowBody` injection from shell script
- `src/components/ui/CommandPalette.astro`: add "Open Terminal" command
- `src/components/workspace/WorkspaceBar.astro`: unchanged (used on terminal page)
- `src/components/boot/BootSequence.astro`: unchanged (used on terminal page)
- `src/styles/global.css`: possible spacing adjustments for section rhythm
- `src/content/cv.ts`: no changes (data source unchanged)
