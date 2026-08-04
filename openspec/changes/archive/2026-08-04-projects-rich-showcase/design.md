## Context

The `/projects` page is currently post-`redesign-projects-page`
(commit b3c7fe6, archived 2026-08-04): CSS Grid with featured
project, card chrome, hover lift, status badges, progressive
disclosure, scroll-reveal, reduced-motion compliance. The page
reads as a polished, functional, text-only terminal-themed list.

Research (librarian task lib-1, 2026-08-04) identified the gap:
the page is missing (1) media in cards (terminal windows, code
snippets, screenshots), (2) rich meta (year, role, type, stack
beyond just tags), (3) status as "proof of life" (pulse dots,
build-time data), (4) interactivity (filter), (5) "wow" moments
(text scramble, terminal footer). The user wants to push from
6/10 to 8-9/10 via a "big swing" of all 5 elements.

## Goals / Non-Goals

**Goals:**
- Add a terminal window (shiki-rendered code snippet) in the
  featured project card hero.
- Add a `// year · role · type · stack` meta row to every
  project card.
- Replace the bracket-text status badge with a pulse-dot
  status indicator.
- Add multi-link support per project (`github` always, `demo`
  and `docs` optional).
- Add tag filter chips above the grid.
- Add a terminal-style footer with build metadata (commit
  hash, build date, uptime, cwd).
- Add a text-scramble intro effect on the featured project
  title.
- Respect `prefers-reduced-motion: reduce` on all new
  animations.

**Non-Goals:**
- Add separate `/projects/[slug]` case-study pages (deferred;
  out of scope for this change).
- Integrate projects into the global command palette
  (deferred; the existing `CommandPalette.astro` is a
  navigation tool, not a content index; integrating would be
  a separate change).
- Add Mermaid diagrams or any new runtime dependency.
- Add screenshots/GIFs as static assets (the terminal window
  uses shiki + text snippets from MDX; no image upload
  pipeline).
- Re-design the homepage or other sections.
- Add a per-project detail modal/lightbox.
- Persist filter state in URL (deferred; reset on view
  transition is acceptable for this scope).

## Decisions

### D1 — Manual `codeSnippet` field per project (no auto-fetch)

The terminal window in the featured hero shows a code snippet
from a new `codeSnippet: { lang, code }` field in each
project's MDX frontmatter. The snippet is curated manually
(3-10 lines of meaningful code from the project).

**Why not auto-fetch from GitHub:** would require a build-time
HTTP fetch, rate limits, and an API key or token. Manual
snippets are stable, fast, and intentional.

**Why not just a fake terminal output:** real code is more
"wow" and shows actual work. Fake output reads as decoration.

### D2 — Status dot pulse, bracket badge removed

Replace the existing `[ONLINE]` / `[WIP]` / `[ARCHIVED]`
bracket-text badges with a `●` colored dot:
- `online` -> teal `var(--color-accent-identity)` with pulse
  keyframe
- `wip` -> copper `var(--color-accent)` static
- `archived` -> muted `var(--color-text-muted)` static

The bracket badge is removed entirely (replaced by the dot +
label text).

**Why replace, not add:** the dot is more compact and more
"proof of life" (pulsing is animated). Two indicators would
compete.

**Why teal for online:** teal is the brand/wayfinding accent
(per memory #52). Online = the project IS the brand, live.
This is the one place teal appears on a status indicator (an
intentional exception to the design.md R5 caveat from the
previous change; the caveat still holds for `wip` and
`archived`).

### D3 — Multi-links as object, `github` always present

Schema: `links: { demo?: string, docs?: string }` (optional
object). The `github` link is always rendered from the
existing `repo` field.

Render: `github ↗ · demo ↗ · docs ↗` as a horizontal row of
links, only showing defined links. If `links` is undefined or
empty, only `github ↗` shows.

**Why not a single `links: string[]`:** typing a list of URLs
loses the semantic of which is which (demo vs docs vs blog).
The object preserves the role.

**Why optional per link:** not all projects have a demo or
docs URL. The optional per-field typing keeps MDX clean.

### D4 — Filter chips as client-side vanilla JS

The filter UI is a row of chips: `[all] [tag1] [tag2] ...`
(one per unique tag across all projects, plus `all`). Click
a chip -> filter the grid to only show projects whose tags
include the chip's tag. Click `[all]` -> show all.

Implementation: a small `<script>` block in projects.astro
with vanilla JS. CSS rule:
`.projects-grid[data-filter="aws"] .project-card:not([data-tags~="aws"]) { display: none; }`.
Each card gets a `data-tags` attribute with the
comma-joined tags.

**Why not an Astro client island (React/Vue):** adds runtime
cost, increases bundle, and the filter is a 1-2 line
interaction. Vanilla JS in a `<script>` is enough.

**Why data-attribute filtering over querySelector:** the
data-attribute approach scales to many cards without needing
per-card event listeners.

### D5 — Terminal footer with build-time env

The footer renders monospace text like:
```
~/luisarg $ git rev-parse --short HEAD
commit b3c7fe6 - 2026-08-04 - uptime 12d - /home/luisarg
```

Build-time data:
- `commit`: `git rev-parse --short HEAD` via a Vite plugin
- `date`: `new Date().toISOString().slice(0, 10)` at build
  time
- `uptime`: days since a hardcoded `DEPLOY_ZERO` constant in
  the plugin
- `cwd`: hardcoded `~/luisarg` (the user's shell prefix)

**Why Vite plugin vs shell script:** keeps everything inside
Astro's build pipeline, no extra build step. The plugin
runs `git rev-parse` in `configResolved` and exposes the
value via `define`.

**Why hardcode `cwd`:** it's a string, no build-time data.
Future sessions can change it if the user moves their shell
prefix.

### D6 — Text scramble via vanilla JS

On first paint, the featured project title runs a scramble
effect:
1. Capture the real text.
2. Replace it with random chars (a-z, A-Z, 0-9, mixed) of
   the same length.
3. Every 50ms, replace one more character with the real char
   (left-to-right).
4. After 800ms total, the title is fully resolved.

Implementation: ~15 lines of vanilla JS in a `<script>` block
in projects.astro, attached to the featured title's element.
Respects `prefers-reduced-motion: reduce` (skips effect,
renders real text immediately). Guarded by a
`data-scrambled` attribute so it only runs once per page load.

**Why vanilla JS:** the effect is one-shot per page load. No
state, no events, no DOM updates. A 15-line inline script is
the right scope.

**Why left-to-right resolve (not random-position):**
predictable, terminal-feel. Random-position scramble is more
chaotic; left-to-right is more "typewriter decoding".

### D7 — Featured hero layout: 2-col on desktop, stacked below

The featured (first) project card changes from a 1-col
full-width card to:
- Desktop (>= 1024px): 2-col grid inside the card, `text |
  terminal window`
- Tablet (640-1023px): 1-col stack, terminal window below
  text
- Mobile (< 640px): 1-col stack, terminal window shown only
  if `codeSnippet` is defined (otherwise hidden)

The breakpoint 1024px (instead of 640px) is used because the
terminal window needs horizontal space to read code lines.

**Why breakpoint 1024:** code lines are typically 60-80 chars
wide. Below 1024px viewport, the available space for the
terminal window is < 30rem, which makes code wrap awkwardly.

**Why hide the terminal window on mobile when no codeSnippet:**
if a project has no code snippet, the layout collapses
cleanly (no empty column).

## Risks / Trade-offs

- **R1 — Filter state lost on Astro view-transition back-nav**:
  if a user filters the grid, navigates away, then comes back,
  the filter resets. **Mitigation:** the filter is a 1-shot
  interaction; the next visit re-renders fresh. Not worth
  URL-persisting for this scope.
- **R2 — Shiki adds ~50-200ms build time per snippet**: shiki
  is already loaded by Astro (used elsewhere on the site).
  Adding 1-3 more snippets per project is negligible.
  **Mitigation:** measure build time, switch to
  `shiki/bundle/web` (lighter) if needed.
- **R3 — `__BUILD_COMMIT__` requires Vite plugin to read git**:
  adds a small `vite-plugin-buildinfo.js` to the repo.
  **Mitigation:** keep it tiny (~20 lines); commit is generic
  and reusable for any other build-time injection.
- **R4 — Text scramble skipped by `prefers-reduced-motion`
  users**: users with the OS setting see the real title
  immediately. **Mitigation:** the effect is a one-shot
  polish, not core functionality. No information loss.
- **R5 — MDX `codeSnippet` field is opaque to validation**:
  a malformed snippet (unclosed backticks, mixed indent)
  renders as code but looks ugly. **Mitigation:** the schema
  is `{lang: string, code: string}`; `code` is a string,
  shiki handles highlighting; the snippet is rendered as-is.
  Authors should test before commit.
- **R6 — Featured project first/long-snippet could cause
  CLS**: if the terminal window is 30rem tall and the snippet
  is 50 lines, the layout jumps when shiki finishes rendering.
  **Mitigation:** set an explicit `min-height: 12rem` on the
  terminal window container and let it grow naturally; the
  curated MDX snippets are capped at ~10 lines.

## Migration Plan

No data migration. No new runtime dependencies. The schema
additions are all optional (existing MDX without them still
renders; new fields gracefully fall through to `undefined`
and the markup omits them).

Rollback: `git revert` of the change commit restores prior
state. No state lives in a database or external service.

## Open Questions

None.
