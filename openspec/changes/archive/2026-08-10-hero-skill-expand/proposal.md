# Hero skill expand — htop tree view

## Why

The htop hero renders 8 skill category rows with proficiency bars but the actual skills per category (cv.ts skillCategories[].skills arrays, e.g. Cloud & IaC → AWS, Terraform, AWS CDK, CloudFormation) are not displayed anywhere in the hero. Client feedback (2026-08-10): clicking a skill row does nothing and was expected to expand revealing the skills. This restores the htop tree-view grammar (expandable processes) and surfaces real existing data with zero new fields.

## What

1. Skill rows (001-008) in HtopWindow become expandable: click/tap or Enter/Space toggles expanded state revealing the category's `skills[]` as indented sub-rows under the COMMAND column (htop tree style).
2. Chevron indicator (▸ collapsed / ▾ expanded) on expandable rows; identity row (000) is not expandable (no chevron).
3. Document-level delegated listener (survives Astro view transitions — constraint #49). Rows keyboard-accessible (role=button/tabindex, Enter/Space, aria-expanded). prefers-reduced-motion: instant toggle, no animation. No-JS: rows render static, non-expandable.
4. Mobile-safe: indent + ellipsis, no horizontal overflow. Independent toggles (each row opens/closes on its own).
5. Interaction pattern mirrors the existing ExperienceModule expand (same delegated-listener + aria-expanded pattern already in the codebase).

## Non-goals (explicit)

- No new data fields. No animation budget (instant class toggle; no transition). No changes to experience expand, /now, /terminal, /projects. No changes to the evidence/scaleMetric data-layer wiring (invisible, stays).
