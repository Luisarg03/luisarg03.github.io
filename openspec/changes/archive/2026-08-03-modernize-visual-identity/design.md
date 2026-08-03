## Context

Current skills section: `SkillMap.astro` → `SkillGroupList.astro`, flat `<details>`-collapsible tag lists, 10 categories with distinct accent colors, positioned third on the homepage below the experience timeline. Site identity: terminal (prompt headers, mono technical voice, noise texture, blue-black palette, amber `#f0b429` accent). Dated signals inventoried in code: hero radial gradient blurs (blur 120-150px, `Hero.astro`), `.glass-card` backdrop-filter blur(12px), 10-color category rainbow, emoji in contact toolbar, type ceiling 56px, decorative pulse/scanline animations.

Research (2026; sources: createtoday.io, astro.build/showcase, Refero, Joffrey Spitzer, Bald Bearded Builder, Artemii Lebedev): modern execution = variable fonts, fluid `clamp()` type, one bold accent, mono as system voice (not everything), grain texture, restrained motion, border-based depth. Dated = glassmorphism, glow-heavy, multi-color accents, emoji, gradient hero blooms.

## Goals / Non-Goals

**Goals:**
- Skills visible within the first screen and presented with identity (code aesthetic)
- Remove inventoried dated signals
- Keep terminal DNA: prompt headers, mono voice, noise, blue-black palette, amber accent
- Zero new dependencies (shiki already present), vanilla JS only, low CPU, reduced-motion compliant

**Non-Goals:**
- Full redesign or new page structure
- New sections (projects grid, sidebar nav)
- Changing the content/data model (`cv.ts`)
- Changing the terminal easter egg

## Decisions

**D1 — Skills as syntax-highlighted code (shiki).** The data is already a typed structure in `cv.ts`; shiki is installed; the presentation is mono-native (identity) and signals technical credibility to recruiters. Alternatives: radar chart (spec'd but never built; 10 axes exceeds the readable limit), marquee-only (loses detail), animated tag cloud (~90 tags = noise).

**D2 — CSS-only marquee strip under the hero.** Zero JS, GPU-accelerated, non-invasive. Chips at category level (10), not individual skills (~90). Reduced-motion disables the animation (static row); hover pauses. Chips anchor-scroll to `#skills`.

**D3 — Single accent discipline.** Categories render neutral (border/muted tones); amber `#f0b429` on hover/active. Proficiency shown via code-level markers (e.g., inline bar/comment in the code block), not colored tags. Tradeoff: loses at-a-glance color coding; mitigation: hover emphasis + code structure preserve scannability.

**D4 — Depth without blur.** Remove backdrop-filter glass-card and hero radial gradient blurs; depth via existing 1px borders + subtle shadow tokens. Matches the anti-blur 2026 direction and is cheaper to render.

**D5 — Fluid type scale.** `clamp()`-based scale replacing fixed steps; oversized hero display heading. Mono labels keep fixed small tokens so the technical voice stays crisp.

**D6 — Radar requirement removed via spec change, not just skipped.** The requirement is dead (unimplemented, >8 axes unreadable) — removing it from the spec keeps `openspec validate` honest and prevents future confusion.

## Risks / Trade-offs

- Recruiters lose color-coded scanning → hover accent + code structure preserve hierarchy; verify with visual QA
- Shiki bundle weight → bundle only the languages the skills block needs
- Marquee motion could annoy → reduced-motion disables, pause on hover, slow drift (20-30s loop)
- Removing glass/glow may flatten the hero → compensate with type scale and spacing, not effects
- Delta touches 3 capabilities → sync before archive, validate after

## Migration Plan

1. Skills code presentation (component + styles) — isolated section
2. Marquee strip in `index.astro` — additive
3. Token cleanup: type scale → glass/blur/emoji → accent discipline (each reversible, small diffs)
4. Visual verification on dev server at each step (mandatory visual check per project rule)
5. Sync delta specs to main specs; validate

## Open Questions

- Exact code structure shown in the skills block (TS interface vs JSON vs annotated object)? Default: typed interface with proficiency markers; resolve during implementation with visual review.
- Hero heading: name-only oversized, or include role? Default: name oversized, role in mono label.
