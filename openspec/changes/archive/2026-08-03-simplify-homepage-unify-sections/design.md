## Context

The site currently has two pages:

1. **Homepage (`/`)**: Terminal shell (`Shell.astro`) as primary UI. The shell renders inside `index.astro` with no `BaseLayout`. All content (Hero, Experience, Skills, Contact) is accessible only through terminal commands against a virtual filesystem. Boot sequence, workspace bar, and command-line input are all part of the homepage experience.

2. **`/now` page**: Uses `BaseLayout` with proper sections (status cards + MDX content). Has header nav, blueprint background, command palette, status bar footer.

All section components already exist and work: `Hero.astro`, `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro`. They are unused on the homepage.

The change unifies the homepage into a scrollable page while preserving the terminal as an easter egg.

## Goals / Non-Goals

**Goals:**
- Replace terminal shell on homepage with scrollable sections using existing components
- Maintain terminal aesthetic throughout the homepage (colors, typography, panel conventions)
- Preserve the interactive terminal as an easter egg at `/terminal`
- Add keyboard shortcut (`Ctrl+Shift+T`) for terminal access
- Add terminal entry to command palette
- Show terminal hint in footer
- Keep `/now` page unchanged

**Non-Goals:**
- Modifying `Shell.astro` internals beyond removing the `nowBody` injection hack
- Redesigning individual section components (Hero, Timeline, Skills, Contact)
- Changing the design system or CSS variables
- Removing the workspace system (it stays on the terminal page)
- SEO optimization beyond what structural HTML provides
- Merging `/now` content into homepage (out of scope for this change)

## Decisions

### Decision 1: Use BaseLayout as the homepage wrapper

**Choice**: Wrap homepage sections in `BaseLayout` instead of a custom shell layout.

**Rationale**: `BaseLayout` already provides the header nav, blueprint grid background, status bar footer, command palette, and view transitions. Reusing it keeps the homepage consistent with `/now`. The existing `index.astro` shell-specific styles (border, border-radius on `#terminal-shell`) become unnecessary.

**Alternatives considered**:
- Custom layout: would duplicate BaseLayout functionality, violate DRY
- Keep terminal shell but add "View as page" toggle: adds complexity, doesn't solve the default experience problem

### Decision 2: Terminal at `/terminal` as a standalone page (no BaseLayout)

**Choice**: The terminal easter egg uses a minimal standalone page — no BaseLayout header/footer, no blueprint grid, just the full-screen shell.

**Rationale**: The terminal is an immersive experience. Adding BaseLayout chrome (nav header, status bar footer) breaks the illusion of a real terminal session. A minimal page with just `Shell.astro` + a subtle back link preserves the aesthetic.

**Alternatives considered**:
- Terminal inside BaseLayout: breaks immersion, adds unnecessary chrome
- Terminal as an overlay/modal: restricts the experience, harder to implement full shell with workspace bar
- Terminal at `/` with a toggle: same problem as current state, doesn't fix discoverability

### Decision 3: Remove `nowBody` injection from Shell

**Choice**: Remove the `shell-data` JSON injection in `index.astro` and the corresponding `localStorage` override in `Shell.astro`.

**Rationale**: The shell no longer needs to display the `/now` MDX content since the homepage won't use the shell. The `/terminal` page can either read from the filesystem's fallback content or we adapt the filesystem to contain the actual now.md content directly. Since the filesystem already has a `now/now.md` node with a static fallback, this works without the injection.

**Alternatives considered**:
- Keep injection on terminal page: adds complexity, the static fallback "Use workspace 2 to view /now content" is fine for the easter egg

### Decision 4: Section ordering

**Choice**: Hero → Experience → Skills → Contact (top to bottom).

**Rationale**: Natural information hierarchy for a portfolio:
1. Who are you? (Hero/identity)
2. What have you done? (Experience)
3. What can you do? (Skills)
4. How to reach you? (Contact)

**Alternatives considered**:
- Skills before Experience: less conventional for portfolios, experience carries more weight
- Contact immediately after Hero: too aggressive, visitor hasn't seen the value yet

### Decision 5: Section spacing via existing CSS tokens

**Choice**: Use existing `--section-padding-y-*` and `--section-gap` tokens for vertical rhythm between sections.

**Rationale**: These tokens are already defined in `global.css` and documented in the `visual-system` spec. Using them ensures consistency with the rest of the site.

### Decision 6: Global keyboard shortcut registration

**Choice**: Register `Ctrl+Shift+T` listener in `BaseLayout.astro` via an inline `<script>` that runs on every page.

**Rationale**: `BaseLayout` wraps every page except the terminal. The shortcut must work site-wide. An inline script is the simplest approach — the `Ctrl+K` handler already works this way in `CommandPalette.astro`. A standalone script module adds unnecessary indirection for ~10 lines.

**Alternatives considered**:
- Standalone script file: adds a network request for a one-liner, over-engineered
- Register in each page individually: DRY violation

## Risks / Trade-offs

- **Terminal content duplication**: The virtual filesystem in `FileSystem.ts` contains the same data as sections on the homepage. If CV data changes, both the section components (via `cv.ts`) and the filesystem (via `FileSystem.ts` content generators) update correctly since they both read from `cv.ts`. No manual sync needed. → Low risk.
- **Scroll performance**: Adding all sections on one page means more DOM nodes. All sections are server-rendered (no client-side hydration except the terminal). The reveal animations use scroll-driven CSS or a single IntersectionObserver. → Acceptable trade-off: single-page portfolios are standard and well-supported.
- **Backward compatibility**: The homepage URL (`/`) changes behavior completely. Any existing links to the terminal-based homepage break. Since this is a personal portfolio with no external dependencies, the impact is only on the user's own bookmarks. → Acceptable trade-off.
- **Terminal page needs the build**: The terminal page imports `FileSystem.ts` which imports `cv.ts`. Since the terminal page is not the homepage anymore, there's less pressure for fast load, but it still needs to work. → No action needed, Astro handles bundling.
