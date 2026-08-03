## Why

User feedback on the live homepage (post-redesign) surfaced five concrete issues:

1. **Sticky header is not clickable when scrolled** — the header (`z-10`) and `<main>` (`z-10`) share the same stacking level; `<main>` comes later in the DOM, so module content paints over the sticky header and intercepts clicks. The header is visible but inert.
2. **Skills content disappears after navigating away and back** — module content reveal uses `animation-timeline: view()` as the primary mechanism; after client-side navigation or back/forward with restored scroll position, the timeline freezes at progress 0 in Chrome, leaving module content at `opacity: 0` until the next scroll event. The `is-visible` fallback cannot override an active animation timeline.
3. **The name heading is too large** — `--text-display` max is 5.5rem (88px), which the owner finds oversized.
4. **Skills section over-specifies** — `cv.ts` lists 10 categories with exhaustive inventories (e.g., 19 individual AWS services); the owner wants broad, general categories (e.g., "AWS") and compact rows so the section reads at a glance.
5. **Typography is hard to read** — mono-only prose (JetBrains Mono 16px) on the dark background feels opaque, dark, and small. The owner wants readable sans-serif prose with the monospace voice reserved for terminal framing, labels, headings, and code.

## What Changes

- **Header stacking fix**: the sticky site header paints above in-page content (z-index above `<main>` content, below the boot overlay and command palette), so header links stay clickable at every scroll position.
- **Deterministic content reveal**: module content visibility is gated by the `is-visible` class from the single IntersectionObserver (re-observed after client-side navigation); `animation-timeline: view()` is kept only for the decorative divider line, so a frozen timeline can never hide content.
- **Name size**: `--text-display` maximum reduced from 5.5rem to 4.5rem (desktop), keeping the fluid `clamp()` behavior.
- **Generalized skills**: `cv.ts` `skillCategories` rewritten to broad technologies (at most a handful of entries per category, e.g., "AWS" instead of every service); htop rows collapse by default on ALL viewports, with the concise skill list revealed on expand.
- **Readable typography**: sans-serif (Inter variable font, already a dependency) for prose and body text; monospace kept for terminal framing, labels, headings, and code; base size raised to 17px; text colors lightened while keeping AA contrast.

## Capabilities

### New
(none)

### Modified
- `site-navigation`: ADDED requirement "Persistent header remains interactive" (stacking contract for the sticky header)
- `boot-into-content`: MODIFIED "Scroll-driven module loading" (class-gated reveal, timeline only for the divider) and "Mono-only typography" (sans prose + mono UI — deliberate reversal of the mono-only decision)
- `skills-visualization`: MODIFIED "Grouped skill tag list" (compact rows on all viewports, generalized data)

## Impact

- `src/layouts/BaseLayout.astro` — header `z-10` → `z-30`
- `src/styles/global.css` — reveal mechanism (`.module-content` gated by `.is-visible`), `--text-display` max 4.5rem, typography tokens (Inter for prose, base 17px, lightened text colors)
- `src/content/cv.ts` — generalized `skillCategories`
- `src/components/modules/SkillsModule.astro` — compact collapsed-by-default rows on all viewports
- Specs: deltas for `site-navigation`, `boot-into-content`, `skills-visualization`
- No dependency changes (Inter fontsource package already installed)
