## 1. Update content collection schema

- [x] 1.1 Add optional `year` (z.number().int().min(2000).max(2100).optional()), `role` (z.string().optional()), `type` (z.enum(['personal', 'client', 'oss']).optional()), `stack` (z.array(z.string()).default([]).optional()), `codeSnippet` (z.object({ lang: z.string(), code: z.string() }).optional()), and `links` (z.object({ demo: z.string().url().optional(), docs: z.string().url().optional() }).optional()) to the projects collection schema in `src/content.config.ts`
- [x] 1.2 Add `year: 2025`, `role: cloud engineer`, `type: oss`, `stack: [bun, typescript, ai-agent, xdg, docker]`, `codeSnippet: { lang: 'bash', code: '# NexoCode — independent opencode fork\n$ git clone https://github.com/Luisarg03/NexoCode\n$ cd NexoCode && bun install\n$ bun test  # 47 passed in 3.2s' }`, and `links: { demo: 'https://github.com/Luisarg03/NexoCode/releases' }` to `src/content/projects/nexocode.mdx`
- [x] 1.3 Add `year: 2025`, `role: platform engineer`, `type: personal`, `stack: [python, obsidian, mcp, sqlite]`, and `codeSnippet: { lang: 'python', code: 'from mcp_obsidian import server\n\nserver.serve(\n    vault=os.path.expanduser("~/Documents/brain"),\n    readonly=False,\n    fts=sqlite_fts5,\n)' }` to `src/content/projects/obsidian-second-brain.mdx`
- [x] 1.4 Add `year: 2024`, `role: ml ops engineer`, `type: client`, `stack: [aws, sagemaker, github-actions, docker, python]`, `codeSnippet: { lang: 'yaml', code: 'name: sagemaker-cicd\non:\n  push:\n    branches: [model/*]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: docker build -t $IMAGE .' }`, and `links: { docs: 'https://github.com/Luisarg03/sagemaker-cicd-poc/blob/main/docs/design.md' }` to `src/content/projects/sagemaker-cicd-poc.mdx`

## 2. Build-time metadata plugin

- [x] 2.1 Create `vite-plugin-buildinfo.js` at the project root: a small Vite plugin that exposes `__BUILD_COMMIT__` (git short hash via `git rev-parse --short HEAD`), `__BUILD_DATE__` (ISO date via `new Date().toISOString().slice(0,10)`), and `__BUILD_UPTIME_DAYS__` (days since a hardcoded `DEPLOY_ZERO` constant, e.g., `'2025-01-15'`) via `define` in `configResolved`
- [x] 2.2 Register the plugin in `astro.config.mjs` in the `vite.plugins` array (import from `./vite-plugin-buildinfo.js`)
- [x] 2.3 Verify the dev server still works and `import.meta.env.__BUILD_COMMIT__` returns the current short hash (run a quick check with a console log in dev or just trust the Vite injection)

## 3. Restructure featured project hero

- [x] 3.1 In `src/pages/projects.astro`, change the featured (first) project card markup: wrap the existing text content (title, status dot, meta row, description, case study, links) in a `.project-card__hero-text` container, and add a `.project-card__hero-terminal` container for the terminal window
- [x] 3.2 Use a CSS Grid layout inside the featured card only: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` at viewport >= 1024px; single column below
- [x] 3.3 When the featured project has no `codeSnippet`, the terminal window container renders as an empty fragment (not as an empty box); the card falls back to a single-column layout
- [x] 3.4 Add `min-height: 12rem` to the terminal window container to prevent CLS while shiki loads

## 4. Add meta row, multi-link, status dot markup

- [x] 4.1 Replace the bracket-text status badge with a status dot: a `<span class="status-dot status-dot--{status}">●</span>` followed by the label text (`ONLINE` / `WIP` / `ARCHIVED`)
- [x] 4.2 Add a meta row below the header and above the description: when `data.year || data.role || data.type || data.stack` is truthy, render `// year: {year} - role: {role} - type: {type} - stack: {stack.join(', ')}` in monospace muted text (skip empty fields)
- [x] 4.3 Replace the single `github ↗` link in the card footer with a multi-link row: render `github ↗` always, plus `demo ↗` if `data.links?.demo` is defined, plus `docs ↗` if `data.links?.docs` is defined, separated by ` · ` (use middle-dot character)

## 5. Style the status dot and terminal window

- [x] 5.1 Add `.status-dot` CSS: 8px diameter, border-radius 50%, inline-block, vertical-align middle
- [x] 5.2 Add `.status-dot--online` color (`var(--color-accent-identity)`) and a `pulse` keyframe animation (scale 1.0 -> 1.15 -> 1.0 over 2s, infinite, ease-in-out)
- [x] 5.3 Add `.status-dot--wip` color (`var(--color-accent)`), static
- [x] 5.4 Add `.status-dot--archived` color (`var(--color-text-muted)`), static
- [x] 5.5 Add a `::after` pseudo-element on `.status-dot--online` for the outer pulse ring (16px diameter, opacity 0.4, animates alongside)
- [x] 5.6 Add `.project-card__hero-terminal` CSS: border, surface background, padding, rounded corners, monospace, overflow-x auto, min-height 12rem
- [x] 5.7 Add `.project-card__terminal-titlebar` CSS: surface background, padding, border-bottom, monospace small text with the project title
- [x] 5.8 Add `.project-card__terminal-code` CSS: shiki default theme overrides for the project's palette (target the surface and text colors to match the rest of the site)
- [x] 5.9 Add `@media (prefers-reduced-motion: reduce)` overrides: disable pulse keyframe on `.status-dot--online` and hide the `::after` ring

## 6. Add tag filter chips

- [x] 6.1 In `src/pages/projects.astro`, ABOVE the `.projects-grid` container, render a `.filter-chips` div with one chip per unique tag (sorted alphabetically) plus an `[all]` chip as the first
- [x] 6.2 Each chip is a `<button type="button" class="filter-chip" data-filter="<tag>">{tag}</button>` with the tag name as the label
- [x] 6.3 Add `data-tags="<comma-joined tags>"` to each `.project-card` element (server-side render in the loop)
- [x] 6.4 Add `.filter-chips` CSS: flex row, gap, wrap, padding-bottom
- [x] 6.5 Add `.filter-chip` CSS: monospace, border, rounded, padding, surface background, muted text color, hover to copper
- [x] 6.6 Add `.filter-chip--active` CSS: copper background, copper text, copper border
- [x] 6.7 Add a `<script>` block in projects.astro with vanilla JS: on chip click, set the chip's `data-filter` as the active filter on `.projects-grid` (via a `data-active-filter` attribute), toggle `display: none` on cards whose `data-tags` does not include the filter; the `[all]` chip clears the filter
- [x] 6.8 Ensure chip clicks work via keyboard (Enter/Space activate the button) — native button behavior suffices

## 7. Add terminal-style page footer

- [x] 7.1 In `src/pages/projects.astro`, BELOW the `.projects-grid` container, render a `<footer class="projects-terminal-footer">` with: a shell prompt prefix `~/luisarg $ git rev-parse --short HEAD` line + the injected commit hash + the build date + the uptime in days + the cwd hint
- [x] 7.2 Add `.projects-terminal-footer` CSS: monospace, muted text, padding, top border (subtle), margin-top
- [x] 7.3 Read the build-time values from `import.meta.env.__BUILD_COMMIT__`, `__BUILD_DATE__`, `__BUILD_UPTIME_DAYS__` and render them in the footer (handle undefined with a fallback like `unknown` for commit, today's date for date, `?d` for uptime)
- [x] 7.4 The `cwd` is hardcoded as `~/luisarg` in the markup (or in a CSS var / const)

## 8. Add text scramble intro effect

- [x] 8.1 In `src/pages/projects.astro`, add a `<script>` block at the end of the file with vanilla JS that finds the featured project title (e.g., the first `.project-card__title` inside `.project-card--featured`) and runs a scramble effect on it
- [x] 8.2 The scramble effect: capture the real text; replace it with random chars of the same length (a-z, A-Z, 0-9); every 50ms, replace one more char with the real char (left-to-right); total duration ~800ms
- [x] 8.3 Detect `prefers-reduced-motion: reduce` and skip the effect if set (render real text immediately)
- [x] 8.4 Guard against re-runs: use a `data-scrambled="true"` attribute on the title element to prevent the effect from re-running on view transitions or filter changes

## 9. Visual verification

- [x] 9.1 Start the dev server (`./node_modules/.bin/astro dev --background`) and capture a desktop screenshot at 1440x900 of `/projects` to `/tmp/opencode/qa-homepage/projects-v2-desktop-1440x900.png` (post-scramble, so wait 1.5s after navigation)
- [x] 9.2 Capture a tablet screenshot at 800x1100 to `/tmp/opencode/qa-homepage/projects-v2-tablet-800x1100.png`
- [x] 9.3 Capture a mobile screenshot at 390x844 to `/tmp/opencode/qa-homepage/projects-v2-mobile-390x844.png`
- [x] 9.4 Visually verify (designer lane): featured hero shows 2-col with terminal window on desktop and stacked below; status dots pulse for online, static for wip/archived; meta row visible on all 3 cards; multi-link row shows correct links per project; filter chips render above grid and clicking filters; terminal footer shows commit hash + date + uptime; text scramble runs on page load
- [x] 9.5 Run `astro check` to confirm no TypeScript or template errors
- [x] 9.6 Run `git rev-parse --short HEAD` to confirm the build plugin injects the current commit
- [x] 9.7 Stop the dev server
