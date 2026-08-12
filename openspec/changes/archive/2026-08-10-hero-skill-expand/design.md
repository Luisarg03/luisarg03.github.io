# Hero skill expand — design

## Markup

- Each skill row COMMAND cell gets: chevron span (▸/▾, muted) before the category name + category name + evidence sub-line (existing, optional).
- Rows 001-008: `role="button"`, `tabindex="0"`, `aria-expanded="false"`, data attribute with category index (e.g. data-skill-index). Identity row 000: no button semantics, no chevron.
- Sub-row container rendered inside the row (or as sibling sub-rows) showing each skill: `<div class="htop-subrow">AWS</div>` etc., indented under COMMAND, mono, text-xs, muted, prefixed with a tree branch character (├─ or ·) — design picks the cleaner of the two.

## Interaction

- Document-level delegated listener (click + keydown Enter/Space) matching closest('[data-skill-index]'); toggles .htop-row--expanded on the row + aria-expanded + chevron glyph swap (CSS ::before or span swap). No per-row listeners (constraint #49).
- Independent toggles. No accordion.
- Expanded state shows the skills list; clicking again collapses. Focus stays on the row.

## CSS

- .htop-subrow: indent aligned with COMMAND text (padding-left ~2ch), mono text-xs muted, line-height 1.6, nowrap + ellipsis (mobile-safe), no overflow.
- .htop-row--expanded chevron rotation or glyph swap. Focus-visible ring on expandable rows (existing focus styles).
- prefers-reduced-motion: no transitions anywhere (toggle is instant anyway).
- No-JS: rows are plain (no button semantics? keep semantics but no handler — or render chevron only when JS? Simplest: semantics present, chevron present, no behavior without JS — acceptable static fallback).
