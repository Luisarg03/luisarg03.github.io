## Context

The homepage currently renders Hero → SkillsMarquee → ExperienceTimeline → SkillMap stacked inside `BaseLayout`, reading as a static 2021-era "hacker portfolio". The portfolio-as-OS identity (JetBrains Mono labels, copper `#f0b429` accent, blueprint grid, command palette) is strong but underused on the landing page: the `BootSequence` lives only on the `/terminal` page, `ClientRouter` is imported but view transitions are disabled (`transition:animate="none"`), and prefetch is off.

Three reference sites were analyzed (csa.ba, iabhi.dev, daveholloway.uk). The owner chose the "Boot Into Content" concept: the homepage scroll IS the boot process, each content module loads like a system module. Decisions: pure boot screen as first viewport (accepting the loss of "10-second comprehension", a deliberate BREAKING change to `home-hero`), dark-only, homepage-first scope, maximum creativity.

Existing infrastructure to reuse: `.reveal-on-view*` / `.draw-on-scroll` utilities with `animation-timeline: view()` + single IntersectionObserver fallback (`src/scripts/scroll-observer.js`), `--scroll-velocity` tracker, `BootSequence.astro` typing logic, `CommandPalette`, `.panel` conventions, `cv.ts` / `siteConfig` data sources.

## Goals / Non-Goals

**Goals:**
- Homepage whose layout IS the boot metaphor: scroll = module loading
- Preserve the OS identity: mono, copper, monogram, command palette
- Exploit Astro-native features: scroll-driven CSS utilities, view transitions, prefetch, static-first rendering
- No new dependencies; graceful degradation for no-JS and `prefers-reduced-motion`
- Keep SEO artifacts working: single semantic H1, structured data, sitemap, OG

**Non-Goals:**
- No light mode
- No blog section in this change
- No layout redesign of `/projects`, `/now`, `/terminal` (they inherit tokens and transitions)
- No canvas effects or JS animation libraries
- No content-model changes to `cv.ts` / `siteConfig`

## Decisions

### D1 — Module composition
New components under `src/components/modules/`: `BootModule`, `IdentityModule` (whoami), `SkillsModule` (htop), `ExperienceModule` (journalctl), `ShutdownModule` (footer). `index.astro` becomes a thin composition of modules.
Rationale: modules map 1:1 to commands, are independently testable, and keep `index.astro` maintainable.
Alternative rejected: rewriting the layout inline in `index.astro` — would create an unmaintainable monolith.

### D2 — Scroll-driven reveal
Reuse the existing `.reveal-on-view*` / `.draw-on-scroll` utilities and their single IntersectionObserver fallback. Add two classes to `global.css`: `.module-divider` (draws the divider line via `animation-timeline: view()`, fallback = fully drawn) and `.module-content` (staggered line reveal). Extend the existing observer in `scroll-observer.js` to cover the new classes — no duplicate observers.
Rationale: the fallback infra already exists and the `visual-system` spec forbids duplicate observers.

### D3 — Boot engine as shared script
Extract the typing logic from `BootSequence.astro` into `src/scripts/boot.js`: typed lines, `boot-complete` event, skip-on-interaction, sessionStorage "booted" quick mode (full sequence first visit, condensed after), reduced-motion static render. `BootModule` and the `/terminal` page both consume it.
Rationale: the terminal page needs the same engine; duplicating logic across components is the kind of drift this avoids. The quick mode follows the daveholloway.uk loading-sequence pattern (delight once, not every visit).
Alternative rejected: keeping the logic embedded in `BootSequence.astro` — forces the homepage to duplicate or import a component not designed for that.

### D4 — Mono-only typography
Set the body font stack to the mono stack in `global.css`; the name heading keeps `--text-display` (fluid `clamp()`) in mono. Prose keeps base ≥16px and line-height ≥1.6. The Inter import is removed only if nothing else references `--font-sans`; otherwise the token stays unused-but-harmless.
Rationale: mono-only is the strongest identity commitment of the concept.
Alternative rejected: sans body + mono UI — contradicts the chosen concept.

### D5 — Native scroll, no Lenis
Keep native scrolling with `scroll-behavior: smooth`; do not add Lenis or any smooth-scroll library.
Rationale: `animation-timeline: view()` requires native scroll position; transform-based smooth-scroll wrappers conflict with it, and the zero-dependency rule wins.

### D6 — View transitions + prefetch across pages
Enable prefetch for internal links (viewport strategy), add `transition:name` to the persistent header and main wrapper, and define a terminal-wipe crossfade. `BlueprintGrid` keeps `transition:animate="none"` (existing canvas-state guard).
Rationale: this activates the already-imported `ClientRouter`, making navigation feel like switching terminal tabs. Low risk, Astro-native.

### D7 — Command palette module jumps
Extend `CommandPalette` with `cd /identity`, `cd /skills`, `cd /experience`, `cd /contact`, and `shutdown` entries that scroll via the existing hash anchors.
Rationale: the palette already exists; anchors are already specified; this makes the palette the "filesystem navigation" of the page.

### D8 — SEO preservation
All module content is static HTML (reveals are visual only). The single H1 with the full name lives in `IdentityModule`. `ld+json`, sitemap, OG, robots stay untouched. The boot screen is decorative.
Rationale: crawlability and the recent SEO work must not regress.

## Risks / Trade-offs

- [First-viewport identity lost (recruiter comprehension)] → Accepted by owner as deliberate BREAKING change; mitigated by ≤2.5s skippable boot, identity one scroll away, palette jumps, and intact SEO markup
- [Scroll timing feels off / fragile] → Dividers are scroll-tied (`animation-timeline: view()`), not time-tied; 100svh modules give generous anchors; QA pass on desktop + mobile
- [Forced command format becomes tedious] → Command framing applies to module headers only; content inside is plain; the contact `ls` listing stays minimal
- [`animation-timeline` browser support] → Existing IntersectionObserver fallback; unsupported browsers get fully visible static content
- [Mono-only hurts long-form readability] → Base ≥16px + line-height ≥1.6; if QA shows fatigue, the `--font-sans` token remains available for prose only
- [SessionStorage quick mode hides the moment from repeat visitors] → Intended; first visit keeps the full boot
- [View transitions glitch the blueprint canvas] → Existing `transition:animate="none"` on `BlueprintGrid` preserved
- [Old components left dead] → Removed in a follow-up commit after verification passes (Hero, SkillsMarquee, SectionPanel usage checked first)

## Migration Plan

1. Implement modules + composition; swap `index.astro` composition in one commit
2. Rollback = git revert of `index.astro` + `BaseLayout` changes (old homepage components remain until step 3)
3. After QA passes, remove unreferenced old homepage components in a follow-up commit
4. Verify: `astro check`, production build, visual QA per module (desktop/mobile/reduced-motion/no-JS), Lighthouse

## Open Questions

- Boot line copy: reuse the existing LuisOS lines (preferred) or rewrite — decide during implementation
- Whether `/terminal` adopts the shared boot engine immediately (cheap) or later — default: immediately
- Exact removal list of old homepage components — decided after verification, checking references first
