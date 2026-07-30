## 1. Homepage rewrite

- [x] 1.1 Rewrite `src/pages/index.astro` to use `BaseLayout` instead of standalone shell
- [x] 1.2 Import and render `Hero` section at top of homepage
- [x] 1.3 Import and render `ExperienceTimeline` section after Hero
- [x] 1.4 Import and render `SkillMap` section after Experience
- [x] 1.5 Import and render `ContactSection` section after Skills
- [x] 1.6 Remove `Shell` import and all shell-related code from `index.astro` (shell-data JSON, noscript fallback, shell-specific styles)
- [x] 1.7 Remove `nowBody` injection logic from `src/components/terminal/Shell.astro` script section (the `shell-data` element parsing, filesystem override)
- [x] 1.8 Verify homepage renders all sections correctly at `localhost:4321`

## 2. Terminal easter egg page

- [x] 2.1 Create `src/pages/terminal.astro` with standalone `Shell` component
- [x] 2.2 Add a minimal "Back to site" link (styled as subtle monospace text, positioned top-left or bottom)
- [x] 2.3 Add `Escape` key handler: if input is focused and empty, navigate to `/`; if input has text, clear it first
- [x] 2.4 Ensure boot sequence, workspace bar, and all commands work correctly on the terminal page
- [x] 2.5 Verify terminal page at `localhost:4321/terminal`

## 3. Keyboard shortcuts and command palette

- [x] 3.1 Add `Ctrl+Shift+T` global keyboard listener to `BaseLayout.astro` (inline `<script>`, prevents default browser behavior)
- [x] 3.2 Add "Open Terminal" command entry to `CommandPalette.astro` commands array (`{ id: 'terminal', label: 'Open Terminal', section: 'Actions', action: 'navigate', value: '/terminal' }`)
- [x] 3.3 Verify `Ctrl+K` → "Open Terminal" navigates to `/terminal`
- [x] 3.4 Verify `Ctrl+Shift+T` works from homepage and `/now`

## 4. Footer terminal hint

- [x] 4.1 Add terminal shortcut hint to `BaseLayout.astro` footer (e.g., `<span>Ctrl+Shift+T → terminal</span>`) using existing muted/monospace styling
- [x] 4.2 Verify hint is visible in footer on homepage and `/now`

## 5. Verification and cleanup

- [x] 5.1 Run `astro check` to verify no TypeScript errors
- [x] 5.2 Run `astro build` to verify production build succeeds
- [x] 5.3 Test homepage: Hero, Experience, Skills, Contact all render and scroll correctly
- [x] 5.4 Test terminal easter egg: all commands work, workspaces switch, escape returns to homepage
- [x] 5.5 Test keyboard shortcuts: `Ctrl+K` palette includes terminal, `Ctrl+Shift+T` opens terminal
- [x] 5.6 Test mobile: homepage scrolls, sections are readable, terminal helper chips work
- [x] 5.7 Test `prefers-reduced-motion`: no boot sequence, no scroll animations, instant anchors
