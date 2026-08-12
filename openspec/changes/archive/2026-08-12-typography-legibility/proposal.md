# Typography legibility — prose out of small mono

## Why

Client report (2026-08-11): "Se complica leer, es un poco molesto, no sé si es el size o la combinación de colores." Design audit found: ALL colors already pass WCAG AA (muted #7d8794 = 5.31:1, text #d7dde5 = 14.01:1, copper/teal ~10:1) — the problem is PROSE set in small mono: experience responsibilities (~25 lines of real prose in JetBrains Mono 12px muted, line-height 1.6), project card descriptions (mono 14px muted, no declared line-height), --text-xs 12px across ~30 rules, and a now.astro note at 10px. Approved by client gate: 5 fixes.

## What

1. `.experience-resp` (ExperienceModule responsibilities): mono → Inter (--font-sans), text-xs → text-sm (14px), line-height 1.7.
2. `.project-card__description` (projects.astro): mono → Inter, keep text-sm, line-height 1.6.
3. `--text-xs` token: 0.75rem → 0.8125rem (12px → 13px), global (~30 consumers; htop grid must absorb it — verify at 390px mobile).
4. `.experience-impact-line` and remaining prose mono: line-height 1.6 → 1.7.
5. now.astro note: 10px → var(--text-xs), line-height 1.6.

## Non-goals (explicit)

- No color changes (all pairs already AA). No hex changes.
- No changes to htop window chrome (title bar, column headers, rows 000-008, status bar, sub-rows, evidence), H1 identity row (mono, SEO/ATS), boot prelude/frames, shell/terminal, CommandPalette, section labels (Clash Display).
- No layout restructure, no new fonts, no motion changes.
