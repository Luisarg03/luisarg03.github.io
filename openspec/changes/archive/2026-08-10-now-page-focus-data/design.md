## Context

/now currently hardcodes AWS DevOps Cert (40%) and English (30%) progress in page markup while the MDX body repeats the same content as prose, and the Travel log card renders a permanent empty state (travel collection has zero entries, no assets). The established codebase pattern for data-driven rendering is the projects collection (frontmatter as single source, page renders from data) — this design reuses that pattern.

## Goals / Non-Goals

**Goals:**
- Single source of truth for /now status data (frontmatter, not page markup)
- Travel log section hidden when the travel collection is empty
- Keep the existing /now visual language (Card, StatusIndicator, progress bar)

**Non-Goals:**
- No new navigation entries or routes
- No changes to the travel collection schema, photo pipeline, or assets
- No changes to the terminal FS or other pages

## Decisions

### Focus data model

The `now` collection schema (src/content.config.ts) gains:

```ts
focus: z.array(
  z.object({
    label: z.string(),
    status: z.enum(['in-progress', 'planned', 'paused', 'completed']),
    progress: z.number().int().min(0).max(100).optional(),
    note: z.string().optional(),
  })
).default([]),
```

- `label`: required string, card title.
- `status`: required enum, maps 1:1 to existing StatusIndicator statuses.
- `progress`: optional 0-100, renders the progress bar when present.
- `note`: optional string, renders as the card's sub-line.

now.mdx frontmatter initial values (transferred as-is from the current page):

```yaml
focus:
  - label: AWS DevOps Cert
    status: in-progress
    progress: 40
    note: Target: Q4 2026
  - label: English
    status: in-progress
    progress: 30
    note: Daily practice
  - label: Japan trip
    status: planned
    note: Multi-month stay, remote work
```

The previous third card "Travel log [planned]" is replaced by the Japan trip focus item (the plan is a focus item; the photo log is a separate travel-log capability). `updated` frontmatter stays the freshness contract, displayed as "Last updated:".

### Single-source rule

Anything expressible as label+status+progress+note lives in frontmatter. Narrative needing markdown (links, lists, emphasis) lives in the MDX body. No content appears in both places. The body drops the Studying and Travel sections (now in cards) and keeps the intro line and the Work section.

### Card rendering

src/pages/now.astro maps `entry.data.focus` to the existing Card variant="status" components (label header + StatusIndicator + progress bar if progress present + note line). The hardcoded AWS/English/Travel cards are deleted. Cards render only when focus has items; an empty focus array renders no cards.

### Travel log conditionality

`travelSorted.length > 0` gates the travel card. Empty collection → no travel section rendered. When entries exist, the existing journalctl rows + photo toggle render unchanged (the document-level delegated listener already survives view transitions).

### Terminal FS

Unchanged. /home/luis/now/now.md keeps its "Use workspace 2 to view /now content" placeholder — a static duplicate of frontmatter would recreate the double-source problem.

## Risks / Trade-offs

- [Focus enum does not cover a future status value] → schema validation fails loudly at build time; extend the enum when a new status appears
- [Cards disappear entirely if focus array is emptied accidentally] → intended behavior (empty array renders no cards), matches the "show only when there is content" principle
- [Travel section hidden means /now looks sparse] → temporary until travel entries are added; preferable to a permanent empty state

## Migration Plan

Single commit: schema + frontmatter + page render in one change. Rollback: revert the change; card values were only in markup before, so no data migration is needed.

## Open Questions

None.
