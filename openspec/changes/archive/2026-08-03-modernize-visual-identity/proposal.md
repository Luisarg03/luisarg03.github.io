## Why

The Skills section sits third on the homepage as a flat, collapsible tag list — visually hidden and without a hook — while the overall page mixes strong terminal identity with dated 2020-era visual signals (glass-blur cards, radial gradient glows, ten rainbow category accents, emoji icons) that read as outdated to recruiters. Research across current portfolios (Refero, Bald Bearded Builder, Artemii Lebedev, Joffrey Spitzer) shows the winning balance: terminal as identity accent, modern editorial execution. This change modernizes the visual execution while preserving the terminal DNA.

## What Changes

- **Skills as code**: replace the flat tag list with a syntax-highlighted code presentation (typed structure rendered with the already-installed shiki) — keeps grouping, mobile collapsibility, and recruiter keyword scanning, adds technical credibility.
- **Skills marquee strip**: CSS-only infinite marquee of category chips directly under the hero, making skills visible within the first screen (no JS, GPU-accelerated, respects reduced motion).
- **Radar chart requirement removed** — **BREAKING**: the `skills-visualization` spec mandates a radar chart that was never implemented; with 10 categories it exceeds the readable axis limit (research consensus: >8 axes unreadable). Replaced by the code presentation above.
- **Dated signal cleanup**: remove hero radial gradient blurs and glass-card backdrop blur (depth via borders instead); category accents go neutral with a single amber accent on hover; contact icons switch from emoji to typographic glyphs.
- **Fluid display type**: clamp()-based type scale with oversized hero heading.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `skills-visualization`: radar chart requirement replaced by syntax-highlighted code presentation; color-per-category redefined as neutral base + single accent emphasis
- `homepage-sections`: skills marquee strip added to homepage composition; Skills and Contact section rendering requirements updated (code presentation; glyph icons instead of emoji)
- `visual-system`: new fluid display type scale requirement; depth conventions updated (no backdrop blur, restrained glow)

## Impact

- `src/components/sections/SkillMap.astro`, `src/components/charts/SkillGroupList.astro` → replaced by code-presentation component
- `src/pages/index.astro` → marquee strip insertion
- `src/styles/global.css` → token changes (type scale, depth, accent discipline)
- `src/components/sections/Hero.astro`, `src/components/sections/ContactSection.astro` → blur removal, glyph icons
- `src/content/cv.ts` → unchanged (data reused; proficiency now displayed in code presentation)
- Dependencies: none new (shiki already installed)
