## Context

Personal Astro portfolio with a terminal/control-panel visual identity ("Control Panel v2"). Audience: recruiters and engineering team leads landing cold. A designer review grounded in `src/components/sections/Hero.astro`, `src/layouts/BaseLayout.astro`, `src/components/sections/SkillMap.astro`, `src/components/sections/ExperienceTimeline.astro`, and `src/content/cv.ts` identified hierarchy failures, not aesthetic failures.

## Goals / Non-Goals

**Goals**
- A recruiter answers "who / role / seniority / current company" within 10 seconds, no scrolling.
- Keep the terminal aesthetic as brand texture, not as the carrier of primary information.
- Preserve existing SEO invariants (single H1 = full name, structured data, sitemap).
- Preserve zero-click contact access (email, LinkedIn, GitHub, CV in the hero).

**Non-Goals**
- No redesign of the visual system, color tokens, or typography scale.
- No changes to /blog, /now, /terminal pages.
- No new JavaScript framework or dependencies.

## Decisions

### D1: Keep motif, demote it
The terminal identity survives as decoration (prompt line, mono font, accent colors). The Arch ASCII art is removed from the hero — it is ~600px of non-information at the top of the funnel. A single compact prompt line (e.g. `luis@interbank:~$ whoami` → name output) preserves the motif at ~5% of the visual cost.
Rationale: brand continuity (personal-brand spec) without sacrificing recruiter comprehension.

### D2: Plain-language labels, neofetch as garnish only
`OS: Cloud Engineer` → `Role: Cloud Engineer`; `Host:` → `Location:`; `Kernel: 7+ years…` → `Experience:`; `Uptime: Interbank` → `Current: Interbank`. If the neofetch styling is kept visually, labels must still be plain words.
Rationale: metaphors require decoding; recruiters skim.

### D3: Visual tiers via existing type scale
Use the existing `var(--text-*)` tokens — name gets the largest tier (2-3x body), role+years a mid tier, location/contact small. No new tokens.
Rationale: visual-system spec defines the scale; use it, don't extend it.

### D4: Summary placement above CTAs
`siteConfig.summary` moves directly under name/role, above the contact toolbar. It is the strongest copy on the page.
Rationale: reading order must be identity → pitch → actions.

### D5: Native `<details>` for timeline disclosure
Recent 3-4 roles render expanded; earlier roles inside a native `<details>`/`<summary>` element. No client-side JS framework, no state.
Rationale: zero-JS, accessible by default, matches Astro's static output.

### D6: Contact affordances as text
Buttons become text labels ("Email", "LinkedIn", "GitHub", "CV ↓") in the existing mono style. Cryptic glyphs (`✉`, `⊞`, `⌥`) are dropped.
Rationale: text is unambiguous and stays on-aesthetic.

## Risks / Trade-offs

- Risk: shrinking terminal flavor dilutes personal brand. Mitigation: motif retained via prompt line + mono styling; only the non-informative 600px art is removed.
- Risk: H1 semantics regress during restructure. Mitigation: task includes explicit check that exactly one H1 with the full name remains.
