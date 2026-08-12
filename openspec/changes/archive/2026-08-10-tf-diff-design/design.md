# Terraform diff visual language — design

## Tokens (src/styles/global.css :root)

Add alias tokens next to existing palette (values unchanged, reference existing vars where possible or repeat hex with comment mapping to the tf-plan meaning):
- `--color-tf-add: #3fb950;` // tf-plan `+` created (alias of --color-success)
- `--color-tf-remove: #f85149;` // tf-plan `-` destroyed (alias of --color-danger)
- `--color-tf-change: #f0b429;` // tf-plan `~` modified (alias of --color-accent)
- `--color-tf-unchanged: #7d8794;` // tf-plan `=` unchanged (alias of muted text)
- `--color-tf-unknown: #2AD4C9;` // tf-plan known-after-apply (alias of --color-accent-identity)
Add `--font-display: 'Clash Display', 'Inter Variable', sans-serif;`

## Type (Clash Display)

- @font-face x4 (400/500/600/700) pointing to /fonts/clash-display/clash-display-{400,500,600,700}.woff2, font-display: swap.
- Consumers (moderate): module/section titles (.section-label if used as display, IdentityModule heading area, projects featured title, experience section headers). NOT body, NOT mono chrome, NOT boot frames.
- Keep tabular-nums and JetBrains Mono for all data/chrome.

## Signature (diff prefix)

- Project cards: prefix glyph in meta line before title, color by semantics (featured/new -> `+`, evolved -> `~`, archived -> `-`; default `~` when unknown).
- Experience entries: `+`/`~`/`-` prefix on impact/role lines, color-coded, rendered in copper/teal family per token.
- Skills: category header prefix `~` or `=` semantics (evolving vs stable).
- Implementation note: keep it a small utility (.tf-diff-prefix class or similar) — no per-component duplicated CSS.

## Projects planSummary (optional frontmatter)

- content.config.ts projects schema: add optional `planSummary: z.object({ add: z.number().optional(), change: z.number().optional(), remove: z.number().optional(), unchanged: z.number().optional() }).optional()`.
- Card renders one mono line when present, e.g. `plan: +342 ~12 -89 =1247` with per-char token colors. Absent -> no line.

## Layout / motion / a11y

- No structural layout change. "Infrastructure dashboard" feel emerges from tokens + prefixes + existing film-graded light.
- No new animation. prefers-reduced-motion and focus-visible untouched. No new runtime dependencies.
