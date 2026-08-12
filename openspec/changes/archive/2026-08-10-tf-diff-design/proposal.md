# Terraform diff as signature visual language

## Why

The current site (LuisOS, "portfolio as OS" terminal aesthetic) is solid but the terminal genre is saturated (HN, ~2013). The owner is a Cloud Platform Engineer (AWS, Terraform, CDK, CI/CD, ECS, internal platforms, AI for dev workflows). The work is not building static things — it is managing continuous infrastructure change. `terraform plan` diff syntax (`+` add / `-` remove / `~` change / `=` unchanged) is the everyday artifact of that job and instantly recognizable to the target audience (technical recruiters, platform engineers). It becomes the signature visual language of the site.

## What

1. Semantic color tokens `--color-tf-*` aliasing the EXISTING palette (zero hex changes):
   - `--color-tf-add` -> #3fb950 (existing --color-success) — things created
   - `--color-tf-remove` -> #f85149 (existing --color-danger) — things destroyed
   - `--color-tf-change` -> #f0b429 (existing --color-accent) — things modified (the accent: change IS the job)
   - `--color-tf-unchanged` -> #7d8794 (existing muted) — stable, no attention needed
   - `--color-tf-unknown` -> #2AD4C9 (existing --color-accent-identity) — "known after apply": the human part (profile, decisions, judgment)
2. Clash Display (Fontshare, free commercial license) as display typeface, self-hosted (woff2 400/500/600/700 into public/fonts/clash-display/, @font-face in global.css, `--font-display` token). Used WITH MODERATION: section/module titles only, never for body or chrome. Breaks the mono-everything monotony without losing OS identity. JetBrains Mono (chrome/data) and Inter (body) unchanged.
3. Diff prefix glyphs as card/entry decorators: `+` `-` `~` `=` prefixes on project cards, experience entries, and skill category headers, colored by semantic token. They narrate change: `+ ECS Fargate migration`, `~ CI/CD pipeline v2`, `- legacy EC2 deploy`, `= stable fundamentals`.
4. Projects page: optional `planSummary` frontmatter field rendering a terraform-plan-style summary line (`+342 ~12 -89 =1247`) on project cards; absent field renders nothing.

## Non-goals (explicit)

- No matrix rain, no blinking cursors everywhere, no `root@server:~#` headers, no ASCII borders around every section, no numbered 01/02/03 markers, no dispersed micro-interactions (boot sequence stays the single orchestrated animation moment).
- No hex palette changes. No layout restructure. No new runtime CDN dependencies (font self-hosted).
- The boot sequence, film-graded light, grain overlay, blueprint grid, htop skills, journalctl experience stay as-is.
