## Why

The first design pass (`portfolio-control-panel`) established the "Control Panel" identity with tokens, panels, and a blueprint background. The second pass ("x100") added corner accents, glow effects, animations, and dashboard cards. However, the page still reads as a monotone vertical stack — every section is structurally identical. The site needs visual variety, depth, and immersion to feel like a living infrastructure dashboard rather than a styled document.

## What Changes

- **Hero**: Full-viewport immersive entry with name/role overlaid directly on the blueprint background. Floating stat cards break out of the content column. No `.panel` wrapper — the hero owns the viewport.
- **Asymmetric layouts**: Not every section spans the full content width. Some are offset, some break the grid, some overlap adjacent sections. The page layout should feel deliberately composed, not auto-stacked.
- **Section variety**: Different visual treatments per section — some with left accent bars, some edge-to-edge with subtle background shifts, some with diagonally offset panels. No two adjacent sections should look the same.
- **Scroll-driven effects**: Blueprint background nodes respond to scroll velocity. Content sections reveal with staggered entrance animations. Parallax depth between foreground content and background grid.
- **Skill visualization**: Replace flat pill tags with a connected topology/network map where related skills cluster together visually, reinforcing the "infrastructure diagram" identity.
- **Experience accordion**: Timeline entries collapse by default (except current role). Click to expand. Reduces vertical sprawl and adds interactivity.
- **Visual connectors**: Pipe-like lines or gradient bars between major sections, styled like infrastructure diagram connectors.
- **Footer**: System status bar with version badge, last-deploy timestamp, and a subtle metric.

## Capabilities

### New Capabilities

- `hero-immersion`: Full-viewport hero overlaid on blueprint, floating stat cards, no panel wrapper.
- `asymmetric-layout`: Variable-width sections, offset positioning, overlapping elements. Break the vertical monotony.
- `scroll-effects`: Parallax blueprint, staggered content reveal, scroll-velocity-driven background animation.
- `skill-topology`: Network/topology-style skill visualization replacing flat pill tags.
- `experience-accordion`: Collapsible timeline entries with smooth expand/collapse transitions.
- `section-variety`: Distinct visual treatments per section — left accent, edge-to-edge, diagonal offsets, background shifts.
- `visual-connectors`: Pipe/line separators between major sections.

### Modified Capabilities

None — all changes are visual enhancements to existing components, not new data or behavioral requirements.

## Impact

- **Components**: Hero, ExperienceTimeline, SkillMap, ContactSection, BaseLayout, BlueprintGrid, global.css
- **No data changes**: `src/content/cv.ts` and `src/content/now/now.mdx` unchanged
- **No new dependencies**: Pure CSS + vanilla JS for scroll effects (no animation libraries)
- **Performance**: Scroll observers must be throttled. Blueprint canvas animation already uses `requestAnimationFrame`.
