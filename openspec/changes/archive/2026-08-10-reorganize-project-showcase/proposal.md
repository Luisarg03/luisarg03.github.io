## Why

A sixth project (OpenDashboard) is being added to the showcase, and the page's
ordering and filtering machinery does not scale down to a hand-curated list of
that size. Project order is currently decided by `impactScore()`, a heuristic
that ranks entries by *how many* impact bullets were written
(`impact.length * 100`), which rewards padding rather than substance and takes
curation control away from the author. The tag filter renders one chip per
unique tag across all projects (~22 chips today) to filter a list of six cards
that fits in two scrolls — the control costs more attention than the content it
filters.

Separately, OpenDashboard is the first project with a meaningful product
screenshot, and the collection schema has no way to show an image.

## What Changes

- **BREAKING** Remove the `impactScore()` heuristic. Projects sort by the
  existing `order` frontmatter field, ascending. Ordering becomes explicit and
  author-controlled.
- **BREAKING** Remove the tag filter chip row from `/projects`, along with its
  client-side filter script and chip styles. Tags remain visible on each card
  as metadata; they are no longer an interactive control.
- The featured project becomes "the entry with the lowest `order`" instead of
  "the entry with the highest impact score". No new frontmatter flag is
  introduced.
- Add optional `cover` (Astro `image()`) and `coverAlt` (string) fields to the
  `projects` collection schema.
- The featured hero's terminal window renders `cover` when present, falling
  back to `codeSnippet`. A screenshot displayed inside the existing terminal
  chrome (titlebar + frame) reuses the established visual treatment rather than
  introducing a new one.
- Add `opendashboard.mdx` to the projects collection at `order: 0`, making it
  the featured project, with `docs/images/dashboard.png` from the upstream repo
  committed to `src/assets/projects/`.
- Reassign `order` across all existing entries so the curated sequence is
  explicit: OpenDashboard (0), NexoCode (1), Obsidian Second Brain (2),
  SageMaker CI/CD PoC (3).
- Remove the unrendered MDX body from `obsidian-second-brain.mdx`. Its content
  duplicates the entry's `solution` field and is not rendered anywhere.
- Project prose fields (`description`, `problem`, `solution`, `impact`) are
  authored in Spanish. `nexocode.mdx` is translated from English for
  consistency. Tags, `stack`, `role`, and code remain in English.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `project-showcase`: featured-project selection changes from impact-score
  ranking to explicit `order`; the tag filter chip requirement is removed
  entirely; the featured hero terminal window gains a cover-image mode; the
  collection schema gains optional `cover` and `coverAlt` fields.

## Impact

**Code**
- `src/content.config.ts` — projects schema signature changes from
  `z.object({...})` to `({ image }) => z.object({...})` to access the `image()`
  helper (same pattern as the existing `travel` collection); adds `cover` and
  `coverAlt`.
- `src/pages/projects.astro` — removes `impactScore()` and the sort expression
  that uses it, removes the `allTags` computation, the filter chip markup, the
  filter client script, and the associated styles; adds cover-image rendering
  inside the existing hero terminal frame.
- `src/content/projects/*.mdx` — one new entry, `order` reassigned on all
  entries, `nexocode.mdx` prose translated, `obsidian-second-brain.mdx` body
  removed.
- `src/assets/projects/` — new directory, one committed PNG.

**Superseded decision**
- `decisions/2026-08-03-dual-accent-and-structural-redesign.md` states that
  `/projects` orders cards strongest-quantified-impact-first. That rule is
  replaced by explicit author curation. The rationale is recorded in this
  change's `design.md`.

**Not affected**
- `src/components/terminal/FileSystem.ts` has no `/projects` virtual paths, so
  the sync constraint that applies to `cv.ts` and the travel collection does
  not apply here.
- Card chrome, hover lift, status dots, case-study disclosure, scroll reveal,
  the terminal-style page footer, and the featured-title scramble are all
  unchanged.