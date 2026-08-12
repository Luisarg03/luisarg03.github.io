# Data transmission layer — design

## Hero evidence (HtopWindow.astro)

- cv.ts SkillCategory gains `evidence?: string`.
- Row COMMAND cell renders category name on line 1; when evidence present, line 2: mono, text-xs, color muted, prefixed with 2 spaces indent, tabular-nums where digits appear. No icon, no border.
- Absent evidence → no second line, row height unchanged (line-height of sub-line ~16px; row must not jump when evidence is added — use a fixed line-height container or render the sub-line inside the same cell with the same spacing either way).
- Mobile <768px: sub-line stacks under the category name in the condensed layout, single line, no wrap (truncate with ellipsis if needed), no horizontal scroll.
- No interaction added.

## Project scaleMetric (projects.astro)

- content.config.ts projects schema: `scaleMetric: z.string().optional()`.
- projects.astro metaParts array gains `data.scaleMetric ? '// ' + data.scaleMetric : ''` (filtered with the others).
- Rendered in the mono meta line like the rest (`// year: ... · role: ... · type: ... · stack: ... · <scaleMetric>`), muted, tabular-nums.
- Absent → meta line exactly as today.

## Absence rules (all surfaces)

| Field absent | Renders |
|---|---|
| evidence | row as today (1 COMMAND line) |
| scaleMetric | meta row as today |
| impact[] (already existing) | entry as today |
| planSummary (already existing) | card as today |

Principle: optional fields are ENHANCEMENT, not requirement. Site works fully without any new field populated.

## Content format guidance (documented, not enforced)

- evidence/scaleMetric: `[number] [unit] [context]` e.g. `1.2k resources under IaC`, `300+ deploys/mo`, `2.1M records/day processed`.
- impact lines: `[verb] [quantified result] ([context])` e.g. `Reduced cloud bill 32% (~$18k/yr)`; max 3-4 per role.
