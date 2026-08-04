# Design: add-dual-accent-and-structural-polish

## Context

Decision of record: `decisions/2026-08-03-dual-accent-and-structural-redesign.md` (accepted). New identity accent token `#2AD4C9` is chosen for wayfinding/brand-only uses. Copper `#f0b429` remains unchanged for emphasis/impact. ExperienceModule is journalctl-style; small internal reorder requested.

This change is surgical: add tokens, apply them to four identity locations, flip render order inside ExperienceModule, and order /projects cards by impact. No boot-first or /now changes.

## Goals / Non-Goals

Goals:
- Add `--color-accent-identity: #2AD4C9` and `--color-accent-identity-glow: rgba(42,212,201,0.12)` tokens.
- Apply identity accent to nav brand link, nav active-tab indicator, IdentityModule.identity-name + glow, and `.section-label::before` in both `global.css` and `SectionPanel.astro`.
- Flip impact/responsibility order in ExperienceModule.astro detail block so impact lines render before responsibility bullets.
- Provide tasks and verification steps for /projects card ordering (strongest impact first).

Non-Goals:
- Re-skin existing copper accents. Copper usages remain untouched.
- Change home boot order or /now behavior.

## Decisions

1. Token naming
- `--color-accent-identity: #2AD4C9`
- `--color-accent-identity-glow: rgba(42,212,201,0.12)`

Rationale: Matches decision doc; glow alpha mirrors existing `--color-accent-glow` convention.

2. Dual-change for Section tick
- `.section-label::before` defined in both `src/styles/global.css` and `src/components/layout/SectionPanel.astro`. Both files must be edited to reference `--color-accent-identity` to avoid inconsistent chrome across pages.

3. Experience entry ordering
- Implement render-order flip inside `ExperienceModule.astro` detail block: render impact (if present) before rendering responsibilities list. This is purely presentational and minimal risk.

4. /projects card ordering scope
- The project-showcase capability is currently part of the in-progress `add-portfolio-evidence-travel-log` change. To avoid conflicting spec churn, this change will not create a new spec file for project-showcase. Instead:
  - tasks.md will include an implementation task to sort project cards by quantified impact (descending).
  - design.md records the decision and notes the simplification. If a formal spec delta is later required, it should be added by the owner of the project-showcase capability.

## Risks / Trade-offs

[Risk] Incomplete token replacement causing inconsistent section ticks across pages. → [Mitigation] Update both `global.css` and `SectionPanel.astro`; add verification step to visually inspect both home and /projects pages.

[Risk] Accidentally changing copper usages. → [Mitigation] grep for `--color-accent` occurrences and confirm only the four identity locations reference identity token; include grep step in tasks.

[Risk] DOM change in ExperienceModule breaks delegated toggle behavior. → [Mitigation] Keep delegation listener and IDs unchanged; only reorder the markup within the details container; run dev server and verify toggle behavior after change.

## Migration Plan

1. Add tokens to `src/styles/global.css` only (design-time token definitions).
2. Update `SectionPanel.astro` to use identity token in `.section-label::before`.
3. Update `IdentityModule.astro` (not implemented here) — Tasks will instruct the implementer where to change `.identity-name` and glow.
4. Update nav markup/styles (BaseLayout or nav component) to apply identity accent to brand link and active-tab indicator.
5. Flip render order in `ExperienceModule.astro` and run dev server checks.

Rollback: revert files changed in the single commit. No DB or runtime migration required.

## Open Questions

- Should active-tab indicator be an underline, left tick, or small colored bar? Decision left to implementer; tasks recommend underline/left-tick variant matching `section-label::before` thickness.
- Does IdentityModule.astro already provide a `--color-accent-glow` usage pattern to replicate? Decision doc names `--color-accent-identity-glow` with same alpha; implementer to mirror existing glow token style.
- Project-showcase spec: owner to decide whether to formalize ordering rule into a spec. This change documents it as an implementation task only.
