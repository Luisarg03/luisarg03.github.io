## Why

The portfolio site has strong foundations (design tokens, panel system, scroll-driven animations) but accumulated organic growth issues: brittle absolute positioning in the timeline, inconsistent grid alignment across sections, inline JavaScript scattered in BaseLayout, an underutilized brand accent (copper), and dead code (unused `StatCard`, unused `bento` prop). Fixing these now — before adding more pages or features — prevents compounding maintenance debt.

## What Changes

- **Fix alignment**: Replace absolute-positioned timeline nodes with a proper grid layout. Normalize bento grid `col-span` assignments so rows don't leave gaps. Align the radar SVG with the skill tag list vertically. Remove double-centering in ContactSection.
- **Refine brand**: Expand copper accent usage to section connectors, status indicators, and interactive states. Improve monogram rendering with an SVG variant alongside the ASCII form. Add a real favicon and verify the OG image path.
- **Reorganize components**: Group 12 flat components by domain (charts/, layout/, ui/, sections/). Extract ~120 lines of inline JS from BaseLayout into standalone `<script>` modules. Extract toggle JS from ExperienceTimeline and expansion JS from SkillGroupList.
- **Remove dead code**: Eliminate unused `StatCard.astro` component and the unused `bento` prop from `SectionPanel.astro`. Clean up CSS classes with no consumers.
- **Visual polish**: Make section spacing consistent. Ensure `animation-timeline` and `IntersectionObserver` fallback logic is clean and non-duplicative. Add subtle hover transitions to contact cards and skill tags.

## Capabilities

### New Capabilities

_None — this change refines existing systems without introducing new capabilities._

### Modified Capabilities

- `visual-system`: Layout grid primitives are reworked for consistent alignment. Bento grid column behavior is normalized. Panel system gets a minor refinements pass. Scroll-driven animation fallbacks are de-duplicated.
- `personal-brand`: Copper accent usage is expanded to more UI surfaces. Monogram gains an SVG variant. Favicon and OG image assets are added or verified.
- `site-navigation`: Inline JavaScript is extracted from BaseLayout into separate `<script>` modules. Status bar, scroll observer, and velocity tracker become independently loadable scripts.
- `skills-visualization`: Radar chart and skill group list alignment is fixed so both halves of the grid start at the same vertical position.
- `experience-timeline`: Timeline node positioning switches from absolute `left` offsets to a grid-based layout. Spine line stays aligned with nodes at all viewport widths.

## Impact

- **Files**: `BaseLayout.astro`, `ExperienceTimeline.astro`, `Hero.astro`, `SkillMap.astro`, `SkillRadar.astro`, `SkillGroupList.astro`, `ContactSection.astro`, `SectionPanel.astro`, `Monogram.astro`, `global.css`, `cv.ts`
- **Deleted**: `StatCard.astro`
- **New**: 3-4 standalone `.js` modules under `src/scripts/` (status bar, scroll observer, velocity tracker)
- **Assets**: `public/favicon.svg`, verify `public/monogram.svg`
- **No breaking changes** — visual refinements only, no API or data contract changes
- **No new dependencies**
