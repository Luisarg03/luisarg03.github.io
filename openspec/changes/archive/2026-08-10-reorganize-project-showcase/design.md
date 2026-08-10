## Context

The `/projects` page (`src/pages/projects.astro`, 668 lines) is the single
consumer of the `projects` content collection. It currently holds three
entries. Two mechanisms were built when the page was designed for an unknown
future project count:

- `impactScore()` (lines 7-19) ranks entries by `impact.length * 100`, falling
  back to `order`. It also contains an unreachable branch: the regex that
  extracts a number from `impact[0]` can never run, because any non-empty
  `impact` array returns from the preceding line.
- A tag filter chip row built from the union of every entry's `tags`, with a
  client-side show/hide script.

The author has confirmed the target is approximately six projects. At that
size both mechanisms cost more than they return: the score rewards writing
more bullets rather than stronger ones, and ~22 chips are a heavier control
surface than the six cards they filter.

The fourth entry, OpenDashboard, is the first project with a product
screenshot. The collection schema has no image field. The `travel` collection
already establishes the Astro `image()` pattern in the same config file.

## Goals / Non-Goals

**Goals:**
- Ordering is explicit, author-controlled, and readable from frontmatter alone.
- Delete the ordering heuristic and the tag filter, including their styles and
  client scripts.
- Support a cover image on a project entry without introducing a second visual
  treatment for media.
- Add OpenDashboard as the featured entry.

**Non-Goals:**
- No grouping of projects into sections by `type` or `status`. With six
  entries a flat curated list is legible; grouping is a change to make when the
  list stops being scannable.
- No filtering on a coarser axis (`type`, `status`). Removing the filter is not
  a step toward replacing it.
- No rendering of MDX bodies. The page reads frontmatter only, and that stays
  true.
- No `featured: true` flag. `order: 0` already expresses it.
- No change to card chrome, hover lift, status dots, case-study disclosure,
  scroll reveal, the terminal page footer, or the title scramble.

## Decisions

### Sort by `order`, delete `impactScore()`

Alternatives considered:

1. **Keep the score, fix the dead branch.** Rejected. Fixing the unreachable
   regex would make the heuristic behave as originally intended — parse a
   number out of the first impact line — but that only sharpens a mechanism
   that should not be deciding anything. The failure is not the bug; it is that
   an automated ranker is inferring editorial intent from bullet counts.
2. **Add an explicit `featured: true` flag on top of the score.** Rejected.
   Two ordering mechanisms where one suffices. `order` already exists, is
   already in the schema, and is already the tiebreaker.
3. **Sort by `order`, delete the score.** Chosen. One field, one meaning,
   visible in the frontmatter of every entry.

This supersedes the `/projects` ordering rule recorded in
`decisions/2026-08-03-dual-accent-and-structural-redesign.md`
("strongest-quantified-impact-first"). That rule was written when the ranking
was automated; it assumed quantified impact would be present and comparable
across entries. In practice two of four entries have no quantified metrics at
all, and the score was ranking them by bullet count. The replacement rule is:
**the author orders the list, strongest artifact first.** A new decision record
under `decisions/` captures this so the earlier document is not read as still
authoritative.

### Featured is `order: 0`, not a separate flag

The featured hero is currently `idx === 0` after sorting. That expression is
kept as-is; only the sort feeding it changes. No new frontmatter, no new
branch. The featured slot becomes a consequence of curation rather than of a
computed rank.

### Remove the tag filter rather than re-scoping it

Alternatives considered:

1. **Filter by `type` (oss / client / personal) instead of tags.** Three chips
   instead of twenty-two. Rejected for now: six cards on one page do not need
   to be narrowed. Building a smaller version of an unneeded control is still
   building an unneeded control.
2. **Group cards under `type` headings, no JS.** Genuinely attractive and fits
   the terminal/OS identity, but it restructures the page layout for a list
   that currently reads fine top to bottom. Deferred; recorded as a non-goal
   with a trigger (when the list stops being scannable).
3. **Remove it.** Chosen. Tags stay on the cards as metadata, where they still
   communicate stack at a glance without asking for a click.

### Cover image reuses the hero terminal frame

The featured hero already renders a terminal window: titlebar with `▢ ◯ ●`
dots, surface-colored chrome, and a code area holding the Shiki-highlighted
`codeSnippet`. A screenshot is placed in that same frame, replacing the code
area's contents.

Alternatives considered:

1. **A separate image treatment (bordered figure, lightbox, aspect-ratio
   card).** Rejected. It introduces a second media language on a site whose
   entire visual identity is terminal chrome, and a screenshot of a web
   dashboard framed as an application window is more coherent than one framed
   as a photograph.
2. **Cover *and* code snippet, both rendered.** Rejected. The hero has one
   right-hand column. Two artifacts in it halves each.
3. **`cover ?? codeSnippet` in the existing frame.** Chosen. One slot, two
   possible contents, zero new chrome. Entries without a cover render exactly
   as they do today.

`cover` uses Astro's `image()` helper, which requires changing the projects
schema signature from `z.object({...})` to `({ image }) => z.object({...})`.
The `travel` collection in the same file already uses that form, so the pattern
is copied rather than invented. `coverAlt` is required alongside any cover for
accessibility; an image inside decorative chrome is still content.

Only `dashboard.png` is used. The upstream repo also has `session.png`, but the
hero has one slot and a second image would need a rendering surface that does
not exist.

### OpenDashboard is featured despite having no quantified metrics

OpenDashboard has fourteen commits, zero stars, no release, and no public demo.
NexoCode, the incumbent first card, demonstrates more raw engineering surface
(thirteen-package monorepo, plugin isolation, XDG compliance).

OpenDashboard is placed first anyway, for three reasons:

- It is original work rather than a maintained fork. The first card is where a
  reader decides whether to keep scrolling.
- It is the only entry with a screenshot, and the hero's two-column layout
  gives an image far more return than a five-line code snippet. NexoCode's bash
  snippet fills a standard card well; it does not need the hero.
- Cost and delegation-chain observability for multi-agent workflows is a
  narrower, more current problem than a CLI fork.

The trade-off is real and accepted: a reader who opens the repo sees an
early-stage project. The card sells the problem and the architecture, not the
commit count. No metrics are invented to compensate — inventing them is exactly
the behaviour the deleted heuristic encouraged.

`status: wip` is used. `online` implies something visitable, and there is no
public deployment.

### Spanish prose, English identifiers

`description`, `problem`, `solution`, and `impact` are authored in Spanish
across all entries. Today `nexocode.mdx` is in English and the other two are in
Spanish. `nexocode.mdx` is translated. `tags`, `stack`, `role`, `type`,
`status`, and all code remain English, consistent with the repository-wide
convention that identifiers and code are English.

### The `obsidian-second-brain.mdx` body is deleted, not rendered

The entry has a one-paragraph MDX body that no template renders. Its content
("el vault ES el bundle OKF... sin RAG ni bases vectoriales") restates the
entry's `solution` field. Adding a `<slot />` renderer to the page for one
duplicated paragraph on one of four entries is infrastructure without a
demand. Deleted; a body renderer can be added when an entry has a case study
long enough to justify one.

## Risks / Trade-offs

- **The delta is BREAKING against the archived `project-showcase` spec.** Two
  published requirements are contradicted: "Project tag filter chips" (removed
  outright) and "Project grid with featured project", whose scenarios state the
  first card is chosen "ordered by impact score". → The spec delta uses an
  explicit `REMOVED` block for the filter requirement and a `MODIFIED` block
  for the grid requirement, so the archived text is not silently orphaned.

- **Removing the filter is user-visible functionality loss.** Anyone who used
  the chips loses them. → The list is six items on one page; scanning replaces
  filtering. Reversible: the requirement text is preserved in the archived
  spec history if it needs to come back at a larger project count.

- **Reassigning `order` on every entry makes the diff touch all four MDX
  files.** → Unavoidable and desirable: after this change `order` is the only
  thing deciding sequence, so every entry needs a deliberate value rather than
  an inherited one. Current values (`1`, `1`, `0`) are not a sequence.

- **The schema signature change affects the whole projects collection.**
  Switching to `({ image }) => z.object({...})` is a config-level edit; a
  mistake breaks the build for every project entry, not just the new one. →
  The `travel` collection is a working reference in the same file, and
  `astro check` plus a build catch it immediately.

- **A committed PNG adds repository weight and can go stale.** The screenshot
  is a copy of upstream `docs/images/dashboard.png` and will not track changes
  to that repo. → Astro's image pipeline optimizes it at build time; staleness
  is accepted for a portfolio screenshot, which documents a point in time.

- **Superseding a decision record risks leaving two contradictory documents.**
  → The new record explicitly names and supersedes the ordering rule from
  `decisions/2026-08-03-dual-accent-and-structural-redesign.md`, rather than
  quietly diverging from it.

## Migration Plan

Not applicable. Static site, no persisted state, no consumers outside the
repository. Rollback is `git revert`.

## Open Questions

None. Scope, ordering, cover handling, language, and body deletion are all
settled.
