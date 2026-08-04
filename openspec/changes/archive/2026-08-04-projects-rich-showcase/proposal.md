## Why

The current `/projects` page (post the `redesign-projects-page` change,
archived 2026-08-04) is a flat text dump in styled cards: chrome, hover
lift, status badges, scroll-reveal, progressive disclosure. Functional
and on-brand, but the user rated it 6/10 and wants 8-9/10. The page is
text-only, has no media, no real interactivity beyond hover, and the
status indicators are static labels. Research into reference sites
(brittanychiang.com, maximeheckel.com, terminal.satnaing.dev,
starship.rs) confirmed the gap: the biggest visual jump comes from
media in cards (terminal windows, code snippets), real-time-feeling
status indicators (pulse dots, last-commit data), and rich
interactivity (filter, command-palette integration).

## What Changes

- **`/projects` page (`src/pages/projects.astro`)**:
  - Featured project: 2-column hero layout on desktop (>= 1024px)
    with a terminal window on the right showing a shiki-rendered
    code snippet from the project's MDX `codeSnippet` field. Stacks
    to single column on tablet and mobile.
  - Each card: meta row `// year · role · type · stack` between
    the header and the description.
  - Each card: multi-link row in the footer — `github ↗` always
    (from `repo`), plus `demo ↗` and `docs ↗` when defined in a
    new `links` object.
  - Each card: status dot pulse (`● ONLINE` teal pulsing, `● WIP`
    copper static, `● ARCHIVED` muted static) replacing the
    bracket-text status badge.
  - Filter chip row above the grid: `[all] [tag1] [tag2] ...` —
    click to filter the grid; `[all]` resets. Client-side vanilla
    JS, no framework island.
  - Terminal-style page footer below the grid:
    `~/luisarg $ git rev-parse --short HEAD` line + commit hash +
    build date + uptime in days + cwd hint.
  - On first paint, the featured project title runs a text
    scramble effect (random chars -> real title) over 800ms.
    Disabled under `prefers-reduced-motion: reduce`.

- **`src/content.config.ts` (projects collection schema)**:
  - Add optional fields: `year` (number 2000-2100), `role`
    (string), `type` (enum: `'personal' | 'client' | 'oss'`),
    `stack` (array of strings), `codeSnippet` (object: `{lang,
    code}`), `links` (object: `{demo?: url, docs?: url}`).

- **3 MDX project files** (`src/content/projects/*.mdx`):
  - Add the new fields with project-specific data:
    - `nexocode.mdx`: year=2025, role=cloud engineer, type=oss,
      stack=[bun, typescript, ai-agent, xdg, docker], codeSnippet
      for the README intro (bash), links.demo pointing to GitHub
      releases.
    - `obsidian-second-brain.mdx`: year=2025, role=platform
      engineer, type=personal, stack=[python, obsidian, mcp,
      sqlite], codeSnippet for the MCP server entry (python).
    - `sagemaker-cicd-poc.mdx`: year=2024, role=ml ops engineer,
      type=client, stack=[aws, sagemaker, github-actions, docker,
      python], codeSnippet for the GitHub Actions workflow
      (yaml), links.docs pointing to the design doc.

- **New file: `vite-plugin-buildinfo.js`** (project root):
  - A small Vite plugin that exposes `__BUILD_COMMIT__` (git
    short hash), `__BUILD_DATE__` (ISO date), and
    `__BUILD_UPTIME_DAYS__` (days since a hardcoded `DEPLOY_ZERO`
    constant) via `define`. Reusable for any future build-time
    metadata injection.

- **`astro.config.mjs`**:
  - Register the new plugin in `vite.plugins`.

## Capabilities

### Modified Capabilities
- `project-showcase`: ADDED 7 requirements (project meta fields,
  status dot pulse indicator, featured hero with terminal
  window, multi-link per card, tag filter chips, terminal-style
  page footer with build metadata, featured title text scramble
  effect). Existing 9 requirements remain (3 original + 6 from
  the prior `redesign-projects-page` change).

## Impact

- `src/pages/projects.astro` — major markup + style + JS refactor
  (additive on top of the previous `redesign-projects-page`
  refactor; no rewrite).
- `src/content.config.ts` — schema change (add 6 new fields).
- 3 MDX project files — add new frontmatter fields with content.
- New file: `vite-plugin-buildinfo.js` (~20 lines).
- `astro.config.mjs` — register 1 plugin.
- 1 spec file modified: `openspec/specs/project-showcase/spec.md`
  (delta with 7 ADDED requirements; archive merges into main).
- No new runtime dependencies. Shiki is already in Astro. No
  new framework components.
