## Why

The current site has good bones — clean dark theme, monospace typography, some terminal-style flourishes — but the visual presentation feels inconsistent. Spacing is irregular across sections, the Hero lacks the punch of a true command-prompt identity, and the overall aesthetic doesn't fully lean into the Arch + Hyprland vibe the user lives in daily. The user is asking for a professional, deliberate polish pass: better use of whitespace, consistent vertical rhythm, refined alignment, and a stronger terminal/Linux identity that ties the whole site together.

## What Changes

- **Refine the visual system** — tighten the spacing scale, standardize vertical rhythm between sections, ensure consistent alignment of headers, stats, and panels. Make the design feel deliberately composed rather than improvised.
- **Strengthen the terminal/Linux identity** — evolve the design system so the site reads as a Linux terminal environment. Prompt-style headings (`[luis@arch ~]$ section`), workspace-tag style nav, neofetch-flavored hero card, refined monospace system, terminal-window chrome around panels.
- **Polish the Hero** — replace the typewriter caret with a clearer identity block. Use prompt syntax. The Hero should feel like the opening of a shell session.
- **Audit and rebalance the Bento stats** — after recent simplifications, the 2-card layout needs proper visual weight. Verify spacing, alignment, hover states.
- **Component organization** — review the component hierarchy for clean separation. Ensure `ui/`, `layout/`, `sections/`, `charts/` boundaries are consistent. Move or extract any mis-located concerns.
- **Section spacing audit** — standard `section-padding`, consistent connector rhythm, predictable top/bottom margins.
- **Responsive behavior** — verify every section degrades cleanly from 4-col → 2-col → 1-col without awkward gaps or orphaned elements.

## Capabilities

### New Capabilities
- `terminal-theme`: Establishes the visual direction as a Linux terminal / Arch + Hyprland inspired design system. Covers prompt-style identity elements, terminal chrome, monospace-first typography, and the conceptual framing of the whole site as a shell session.

### Modified Capabilities
- `visual-system`: The design tokens (color palette, type scale, spacing scale, panel chrome, animations) need refinement to support the terminal theme direction and to enforce consistent spacing/alignment. Requirements change — not just implementation details.
- `personal-brand`: The hero block identity (was the ASCII "LUIS" monogram) needs a new expression. The name and role presentation shifts to a shell-prompt style.

## Impact

- **Files affected (primary)**:
  - `src/styles/global.css` — design tokens, animations, spacing scale
  - `src/layouts/BaseLayout.astro` — terminal chrome around the page, possibly status bar tweaks
  - `src/components/sections/Hero.astro` — new prompt-style identity
  - `src/components/sections/SkillMap.astro` — section header style, polish
  - `src/components/sections/ExperienceTimeline.astro` — section header style, polish
  - `src/components/sections/ContactSection.astro` — section header style, polish
  - `src/components/layout/SectionPanel.astro` — terminal-window chrome
  - `src/components/layout/BlueprintGrid.astro` — possible refinement
  - `src/components/ui/StatusIndicator.astro` — possibly nothing
  - `src/components/ui/CommandPalette.astro` — verify it still feels consistent
- **Dependencies**: No new runtime dependencies. Pure styling refactor.
- **Build/deploy**: No change to the Astro build or GitHub Pages deploy.
- **Risk**: Medium. This is a visual refactor touching many files. Risk is mostly aesthetic regressions, easy to revert file-by-file.
- **No data structure changes** — `cv.ts` data shape is unchanged.
