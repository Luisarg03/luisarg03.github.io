# Data transmission layer — real metrics where the design already waits

## Why

Content audit found ZERO business metrics in the site: the `impact` field in cv.ts exists and ExperienceModule already renders it but is empty in all 7 roles; `planSummary` exists in the projects schema but no project uses it; the htop hero generates numbers that look like metrics (CPU% = self-assessed proficiency, MEM% = derived) but convey no real scale. A cloud/platform recruiter screens for scale (cloud bill managed, resources under IaC, deploys/mo, uptime, accounts/regions, cost reduction, team size). Approved design (client gate, 2026-08-10): the site already has the surfaces — it lacks the data fields and the wiring is minimal. Elegant absence is mandatory: every optional field absent renders exactly today's site.

## What

1. `evidence?: string` on SkillCategory (cv.ts) — one-line quantified proof per skill category, rendered as a sub-line under COMMAND in the htop hero row (mono, text-xs, muted, max ~40 chars). Example: `1.2k resources under IaC`. Absent → row exactly as today (single COMMAND line).
2. `scaleMetric?: string` on project frontmatter (content.config.ts projects schema) — one scale metric per project card, rendered as an extra meta-line part (`// <metric>`) in the card meta row. Example: `monorepo 13 pkgs · 47 tests / 3.2s`. Absent → meta row exactly as today.
3. No changes to the status bar (already derived from real data: Tasks = 1 identity + 8 categories, Mem = count of proficiency >= 4, uptime = real career years).
4. `impact[]` (Experience) and `planSummary` (projects) already render — no code change; content to be filled by the owner later.

## Non-goals (explicit)

- No KPI dashboard, no metric vomit (one datum per line, max ~40 chars), no count-up animations, no tooltips, no sparklines (htop bars already are the visualization), no new colors (existing tokens only), no new runtime dependencies, no changes to motion/reduced-motion/focus-visible, no changes to /now, /terminal.
- No sample/placeholder values shipped to production. Evidence must render only when real data exists.
