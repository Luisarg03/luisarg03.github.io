## Context

The portfolio site uses a blueprint/terminal aesthetic built on Astro 7 + Tailwind CSS 4. The visual system has five established specs: visual-system, personal-brand, site-navigation, skills-visualization, and experience-timeline. All components are in a flat `src/components/` directory. Inline JavaScript for status bar, scroll observer, and velocity tracking is spread across ~120 lines inside BaseLayout.astro. The copper accent color (`--color-accent-warm: #f0b429`) is defined but used only in two places (radar polygon, current-role background). Timeline nodes use brittle absolute `left` positioning. `StatCard.astro` exists but Hero uses inline `widget-float` divs instead.

## Goals / Non-Goals

**Goals:**
- Fix all alignment issues: timeline nodes, bento grid rows, skills radar-list, contact double-centering
- Extract inline JavaScript from BaseLayout into standalone, cacheable script modules
- Expand copper accent usage to section connectors, hover states, and status indicators
- Add real favicon and SVG monogram variant to `/public/`
- Remove dead code: `StatCard.astro`, unused `bento` prop in `SectionPanel`
- Group components by domain into subdirectories while preserving all import paths
- Deduplicate `animation-timeline` / `IntersectionObserver` fallback logic

**Non-Goals:**
- Adding new pages or content types (blog, projects, /uses)
- Changing the data model in `cv.ts`
- Introducing new npm dependencies
- Dark mode toggle (single theme only)
- Animating the monogram
- Adding a component library or design system tooling

## Decisions

### Decision 1: Timeline nodes → CSS Grid positioning
**Choice:** Replace absolute `left: -1.55rem` positioning with a two-column CSS Grid: `grid-template-columns: [spine] 16px [content] 1fr`. Place the node in the spine column and the card in the content column.

**Rationale:** Absolute offsets are zoom-dependent and break at non-standard viewport widths. CSS Grid guarantees alignment regardless of font scaling, zoom level, or content height. The current approach already uses a `ml-8`/`ml-10` margin on the entry column — the migration is a small structural change.

**Alternatives considered:**
- Keep absolute but use `rem` values calibrated per breakpoint — still fragile, still needs per-breakpoint adjustments.
- Use `display: flex` with a fixed-width left rail — works but harder to overlap the node on the spine line than a grid placement.

### Decision 2: Script extraction → external `<script>` modules in `public/scripts/`
**Choice:** Move status bar, scroll observer, and velocity tracker into three files: `public/scripts/status-bar.js`, `public/scripts/scroll-observer.js`, `public/scripts/velocity-tracker.js`. Load via `<script src="...">` tags in BaseLayout.

**Rationale:** Inline JavaScript blocks add noise to BaseLayout (currently 273 lines). External scripts are browser-cacheable, individually inspectable, and keep the layout file focused on markup. No build step needed — these are vanilla JS served from `public/`.

**Alternatives considered:**
- Hoist to `<script>` inside BaseLayout's frontmatter — reduces noise but still inline, not cacheable.
- Use Astro's `client:*` directives with a framework component — overkill, adds framework dependency for 120 lines of vanilla JS.

### Decision 3: Component directory grouping
**Choice:** Group components into domain subdirectories but keep them as Astro components (no barrel exports, no index files):

```
src/components/
├── charts/         SkillRadar.astro, SkillGroupList.astro
├── layout/         SectionPanel.astro, BlueprintGrid.astro
├── ui/             StatusIndicator.astro, Monogram.astro, CommandPalette.astro
└── sections/       Hero.astro, ExperienceTimeline.astro, SkillMap.astro, ContactSection.astro
```

**Rationale:** 12 flat files is manageable but as the site grows, domain grouping reduces cognitive load. Components are still imported by path (`'../components/sections/Hero.astro'`) — no extra abstraction layer. This is the smallest organizational change that provides value.

**Alternatives considered:**
- Keep flat — simpler diff but doesn't solve the organizational debt as new components are added.
- Barrel exports with `index.astro` re-exports — adds indirection, breaks IDE auto-imports.
- Atomic design (atoms/molecules/organisms) — overkill for a portfolio site with 12 components.

### Decision 4: Copper accent expansion
**Choice:** Add copper to `.section-connector` gradients, contact card hover borders, skill tag hover states, and panel glow effects. Keep it out of body text and primary headings.

**Rationale:** The copper is already in the token palette and spec but underused. Small touches (connectors, hovers) add visual warmth without overwhelming the blue-primary identity. No new tokens needed.

### Decision 5: Favicon and monogram SVG
**Choice:** Create a simplified "LP" SVG monogram using the same monospace grid as the ASCII version but optimized for small sizes. Place at `public/favicon.svg` and update `public/monogram.svg` if missing. Use `viewBox="0 0 32 32"` with simple geometric shapes for the favicon.

**Rationale:** An SVG favicon renders crisply at all sizes, supports dark/light browser themes (if needed later), and weighs <1KB. The ASCII monogram renders as text in the hero but can't be used reliably in `<link rel="icon">` or `<meta property="og:image">`.

### Decision 6: Dead code removal
**Choice:** Delete `StatCard.astro`. Remove the `bento` prop from `SectionPanel.astro`'s Props interface and the conditional branch in its template. Clean up any CSS classes in `global.css` with zero consumers (validate via grep before deleting).

**Rationale:** Dead code misleads future contributors. StatCard was scaffolded for the bento grid but Hero uses inline `widget-float` divs directly. Removing it eliminates a decision point ("should I use StatCard or not?") and reduces the component count.

## Risks / Trade-offs

- **Import path changes**: Moving components breaks all existing imports in pages and layouts. Risk: missed import → build failure. Mitigation: use search-and-replace across the codebase, verify with `astro check` after migration.
- **Script extraction**: The velocity tracker reads `--scroll-velocity` and the blueprint canvas reads it back. Risk: script load order matters. Mitigation: load scripts in dependency order (velocity → blueprint) and ensure each initializes defensively if the DOM isn't ready.
- **Timeline grid migration**: Changing from absolute positioning to grid may shift the visual position of nodes by 1-2px. Risk: visual regression. Mitigation: compare before/after screenshots at 320px, 768px, 1024px, 1440px.
- **CSS class cleanup**: Removing unused CSS classes could break components if a class has a consumer we missed. Mitigation: grep the entire `src/` directory for each class before removal.
