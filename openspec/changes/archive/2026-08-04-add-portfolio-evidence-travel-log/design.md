```markdown
## Context

Current state (verified in code):
- `src/pages/projects.astro` renders the `projects` content collection (`src/content.config.ts`) with schema `{ title, description, repo, tags, order }` — no problem/solution/impact fields exist yet. Only one entry (`obsidian-second-brain.mdx`) exists in `src/content/projects/`.
- `src/content/cv.ts` defines `Experience { company, role, location, startDate, endDate, responsibilities: string[] }` — no metrics/impact field. Rendered by an `ExperienceModule.astro` component (journalctl-style, per project memory).
- `src/pages/now.astro` already has a "Japan Trip" status card (progress bar, `status="planned"`) in its dashboard grid — a natural anchor point for the travel log addition, not a new concept.
- No `travel` content collection exists in `src/content.config.ts`.
- Astro view transitions fully swap `<main>` on client-side nav, destroying per-element listeners (project memory #49) — any expand/collapse interaction must use document-level delegated listeners (`closest()` pattern), not per-element `addEventListener`.
- Home hero (`index.astro`, boot sequence) is an explicit BREAKING-change decision already accepted (`boot-into-content` spec) trading instant scannability for identity. This change does not reopen that decision.

## Goals / Non-Goals

**Goals:**
- Extend the `projects` collection schema with `problem`, `solution`, and `impact` (metrics) fields; re-render `/projects` cards in a config/code-listing visual style (monospace `key: value` metadata, copper tech tags, comment-style problem/solution framing) per the designer research (Pattern 1: Evidence-Led Cards with Monospace Metadata).
- Extend `Experience` with an optional `impact?: string[]` field for quantified metrics, rendered as a distinct "impact" line per entry in `ExperienceModule`, additive to existing `responsibilities`.
- Add a `travel` content collection and a journalctl-style expandable log UI, nested inside `/now` (reusing/extending the existing "Japan Trip" card area), not as a top-level nav item.

**Non-Goals:**
- No changes to `index.astro`, the boot sequence, or home hero layout.
- No top-level nav entry for travel content.
- No fabrication of metrics or travel captions — real figures/content must come from the user; this change defines schema and UI only, content population is a separate data-entry task.
- No CMS or admin UI — content stays as MDX files, consistent with `now`/`projects` collections.

## Decisions

1. **Projects schema extension over new collection**: Add `problem: z.string().optional()`, `solution: z.string().optional()`, `impact: z.array(z.string()).default([])` to the existing `projects` collection in `content.config.ts`, instead of creating a parallel "case-studies" collection. Rationale: same content shape (title/description/tags/repo already fit), avoids duplicating collection logic; optional fields keep the existing `obsidian-second-brain.mdx` entry valid without edits.
2. **Experience impact as separate optional array, not folded into `responsibilities`**: Keeps quantified metrics visually distinct (a dedicated "impact" line with copper accents) instead of mixing measurable results into ordinary responsibility bullets. Alternative considered: append inline to responsibility strings — rejected, loses the ability to style/highlight metrics distinctly.
3. **Travel as its own content collection (`src/content/travel/`), image-based via Astro's `image()` schema helper**: Each entry: `date: z.date()`, `location: z.string()`, `caption: z.string()`, `photos: z.array(image())`. Photos stored under `src/assets/travel/` so Astro's build-time image optimization applies (matches static GitHub Pages hosting constraint — no server-side image processing available). Alternative considered: plain string paths to `public/images/travel/` — rejected, loses automatic responsive/optimized output.
4. **Travel log lives inside `/now`, replacing/extending the existing "Japan Trip" dashboard card** rather than a new page or new nav item — keeps the "personal, not primary nav" placement decided earlier in this change's proposal, and reuses an anchor point that already exists in the current `now.astro` dashboard grid.
5. **Expand/collapse interaction via document-level delegated listener** (`document.addEventListener('click', ...)` + `.closest('[data-travel-entry]')`), consistent with the established pattern for skills-expand and experience show-details (project memory #49), since Astro view transitions destroy per-element listeners on `<main>` swap.
6. **Visual pattern: config-style monospace cards for projects, `journalctl`-format expandable entries for travel** — both drawn directly from the designer research report already produced for this change (Pattern 1 for each section), not introducing a third new visual language.

## Risks / Trade-offs

- [Metrics could read as inflated/unverifiable if not backed by real data] → Impact fields are optional and populated only with figures the user explicitly supplies during content authoring; this design does not invent numbers.
- [Adding real travel photos increases repo/build size] → Rely on Astro's built-in image optimization (`image()` schema helper) and keep photo count per entry modest (a handful per trip, not a full album dump).
- [Config-style project cards could look cluttered with 3 fields (problem/solution/impact) per card on mobile] → All three fields are optional in schema; layout must degrade to stacked single-column on narrow viewports (verify visually per project memory #35).
- [Two new/changed content shapes (projects, experience, travel) touched in one change] → Kept additive/optional everywhere so existing content (`obsidian-second-brain.mdx`, current experience entries, current now.mdx) continues to render unchanged if new fields are omitted.

## Migration Plan

Purely additive — no existing data must change to keep building:
1. Extend `content.config.ts` schemas (projects: new optional fields; new `travel` collection).
2. Extend `Experience` interface in `cv.ts` with optional `impact` field.
3. Update `ExperienceModule.astro` and `projects.astro` rendering to display new fields when present, unchanged when absent.
4. Add travel log UI + delegated interaction script inside `now.astro`.
5. Populate real content (project problem/solution/impact text, experience metrics, travel entries + photos) as a content task, reviewed by the user before publish.
No rollback complexity: reverting is deleting the added fields/content and restored rendering branches.

## Open Questions

- Which experience entries have real, disclosable metrics (and what are the actual figures)? Must come from the user, not invented.
- Exact photo set and captions for the 2024 Japan trip (and whether to stub a placeholder "planning" entry for 2027 now, or add it when the trip is confirmed).
```
