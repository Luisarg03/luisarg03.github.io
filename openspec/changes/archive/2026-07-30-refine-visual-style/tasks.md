## 1. Color & Typography (Phase 1)

- [x] 1.1 Change accent color from blue `#58a6ff` to warm copper `#f0b429` in `src/styles/global.css` @theme block
- [x] 1.2 Update `--color-accent-glow` to use copper instead of blue
- [x] 1.3 Add `--color-accent-warm` as primary accent (rename from copper emphasis to primary)
- [x] 1.4 Update prompt colors in `Shell.astro` to use warm copper accent
- [x] 1.5 Update workspace tag active styles in `WorkspaceBar.astro` to use warm copper
- [x] 1.6 Update `Prompt.astro` to use warm copper accent for user/host/dollar segments
- [x] 1.7 Verify all accent references (borders, links, highlights) use warm copper

## 2. Layout & Spacing (Phase 2)

- [x] 2.1 Add max-width container (960px) with centered layout in `index.astro` body styles
- [x] 2.2 Update `Shell.astro` to not force 100vh — let the container control height
- [x] 2.3 Add `min-height: 100vh` to the container for full-height feel
- [x] 2.4 Ensure mobile (<768px) uses full width with reduced padding
- [x] 2.5 Add subtle rounded corners (8px) to the shell container on desktop
- [x] 2.6 Verify the layout on desktop (1440px), tablet (768px), and mobile (375px) viewports

## 3. Glass Cards & Polish (Phase 3)

- [x] 3.1 Create CSS class `.glass-card` in `global.css` with backdrop-blur, subtle border, rounded corners
- [x] 3.2 Update `Shell.astro` output rendering to wrap rich content in glass cards
- [x] 3.3 Add smooth 200ms fade-in transition for new command output
- [x] 3.4 Redesign workspace tags as pill-shaped buttons with smoother hover/active transitions (150ms)
- [x] 3.5 Add subtle gradient accent line at top of shell container
- [x] 3.6 Verify glass morphism renders correctly in Chrome, Firefox, Safari
- [x] 3.7 Verify solid fallback for browsers without backdrop-filter support
- [x] 3.8 Run `astro check` and `astro build` — must pass
