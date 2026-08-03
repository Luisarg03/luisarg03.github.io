## 1. Skills as Code Presentation

- [x] 1.1 Create SkillCodeView component rendering `cv.ts` categories as a shiki-highlighted code block (typed structure, proficiency markers)
- [x] 1.2 Implement category hover/focus emphasis with the single accent color (amber `#f0b429`), neutral base for all categories
- [x] 1.3 Preserve mobile collapsible behavior (extract inline script from `SkillGroupList.astro` to the component `<script>` block)
- [x] 1.4 Replace `SkillGroupList` usage in `SkillMap.astro`; keep `SectionPanel` chrome and the "Skills" title
- [x] 1.5 Verify accessibility: code block is readable text, categories focusable, screen-reader content present

## 2. Skills Marquee Strip

- [x] 2.1 Create `SkillsMarquee.astro`: CSS-only infinite marquee of category chips
- [x] 2.2 Insert marquee in `src/pages/index.astro` between Hero and Experience sections
- [x] 2.3 Add pause-on-hover and `prefers-reduced-motion` static fallback
- [x] 2.4 Make chips anchor-scroll to `#skills`; semantic list for screen readers with decorative duplicates hidden

## 3. Dated Signal Cleanup

- [x] 3.1 Remove hero radial gradient blurs (`Hero.astro`)
- [x] 3.2 Remove `.glass-card` backdrop-filter; depth via existing border/shadow tokens (global.css and usage sites)
- [x] 3.3 Neutralize per-category accent colors in skills; single amber accent on hover/active
- [x] 3.4 Replace contact emoji icons with typographic glyphs or SVGs (`ContactSection.astro`)

## 4. Fluid Display Type

- [x] 4.1 Add `clamp()`-based display scale tokens to `global.css`
- [x] 4.2 Apply oversized hero heading; keep mono label tokens fixed

## 5. Verification

- [x] 5.1 `astro check` and `astro build` pass
- [x] 5.2 Visual QA on dev server: skills section, marquee, hero, contact, mobile breakpoint (mandatory visual verification)
- [x] 5.3 `openspec validate` passes for touched capabilities (skills-visualization, homepage-sections, visual-system)
