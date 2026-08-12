## Context

Design audit 2026-08-10: global.css defines display-scale tokens with zero consumers; Card renders a double top accent bar; duplicate accent tokens; theme-color meta mismatch; no directional light; minimal micro-interactions. Benchmark synthesis: the 2026 SOTD formula is restraint (limited palette, accent discipline) + motion/interaction craft + film-graded light + 1% typography polish; the terminal/OS niche is saturated, so differentiation comes from a systemic metaphor, real substance, and flawless accessibility/performance.

## Goals / Non-Goals

**Goals:**
- Two-register typography (display scale on non-H1 surfaces, small mono OS chrome kept)
- A directional light system (one copper source, top-left, with falloff)
- Interaction craft: micro-interactions on interactive affordances only
- Token hygiene: one accent source, aligned meta theme-color, single Card accent bar
- Zero new dependencies; performance discipline (compositor-only animations)

**Non-Goals:**
- No concept change: boot, command palette, terminal navigation, blueprint grid stay
- No new routes, navigation entries, or content overhaul
- No WebGL / animation libraries
- No change to the H1-as-detail-row SEO decision

## Decisions

### D1 — Type register split (display scale on non-H1 surfaces)
`--text-display` / `--text-display-sm` are consumed by non-H1 surfaces only: featured project card title and stat/impact readouts. The H1 stays `.identity-detail-row` small mono (SEO/ATS crawlability, existing decision). Rationale: oversized fluid display type is the #1 2026 typography trend; the detail-row decision constrains only the H1, not every surface. Constraint: max 2 display-scale surfaces per viewport to preserve the OS/terminal density feel.

### D2 — Light system (directional, film-graded)
One light source: copper, top-left. Implemented as: a very-low-alpha radial-gradient overlay on the BlueprintGrid layer, accent glows biased toward the source, and direction-consistent gradients (top-left to bottom-right). Rationale: "lit like a film set" — one sun with falloff; flat uniform fills read average in dark themes.

### D3 — Micro-interaction discipline
Interactive affordances only (chips, links, cards, palette items, toggles): scale/shadow/underline-reveal/glow transitions, <=200ms, transform+opacity only (compositor-friendly). No decoration-only animation. All gated by prefers-reduced-motion. Rationale: micro-interaction density is the highest-weight motion category in current Dev Awards scoring.

### D4 — Animation fidelity
The boot sequence gains sequential module-loading lines (line-by-line, existing typed-frame timing), consistent with the current typed frames — real-sequential print authenticity, no fake-retro easing. Skip/quick-mode/reduced-motion behavior unchanged.

### D5 — Token consolidation
Single accent source: `--color-accent #f0b429` (teal identity accent untouched). Delete `--color-accent-warm` and `--color-info`. theme-color meta becomes `#0a0e14`. The Card renders exactly ONE top accent bar (keep `.card-accent-top`, drop the overlapping own `::before`).

### D6 — Variable font motion
JetBrains Mono Variable wght shift on hover (mono metrics are stable — no reflow); Inter optical sizing auto. `font-variant-numeric: tabular-nums` on numeric readouts (dates, percentages, uptime, host values).

### D7 — No new dependencies
All effects in CSS + vanilla JS (existing scroll-observer pattern). WebGL-class depth approximated with gradients, parallax, and transforms. Rationale: project dependency rules; performance discipline is a benchmark requirement for this niche.

## Risks / Trade-offs

- [Display type on the featured card clashes with grid density] -> cap at 2 display-scale surfaces per viewport; verify in screenshots.
- [Scroll choreography hurts content reachability] -> no scroll-jacking; view() is progressive enhancement with the IntersectionObserver fallback; content fully reachable without JS.
- [Hover-only interactions break on touch] -> focus-visible + tap states for mobile parity.
- [Grain/parallax performance] -> opacity/transform only, small tile sizes, reduced-motion gating.

## Migration Plan

Phase-commits: P0 polish -> P1 craft -> P2 depth -> spec sync + archive. Each phase independently verifiable (astro check + render + screenshots). Rollback: revert the phase commit; changes are additive except the explicit P0 deletions.
