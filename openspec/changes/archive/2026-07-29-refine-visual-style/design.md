# Design — Refine Visual Style

## Context

The site is a personal portfolio for Luis Meyehen Paz (Cloud Engineer), built on Astro 7 + Tailwind CSS 4, deployed to GitHub Pages at `luisarg03.github.io`. It already leans terminal — dark theme (`#0a0e14`), monospace typography, command palette (`Cmd+K`), status bar with UTC clock, ASCII-flavored "~/luisarg" prompt in the nav. The bones are right but the execution is inconsistent: section spacing is irregular, the Hero lacks a strong identity block, some animations feel arbitrary, and the design doesn't fully commit to the terminal direction.

The user is an Arch Linux + Hyprland user (1+ year daily driver). The site should feel like a natural extension of their daily computing environment — not a generic "dark theme with monospace."

Recent state (already shipped): monogram removed, bento simplified, contact moved up, radar chart deleted. This change continues from that cleaner baseline.

Component layers today:
- `src/components/ui/` — small primitives (StatusIndicator, CommandPalette, Monogram)
- `src/components/layout/` — panels, grids, chrome (BaseLayout, SectionPanel, BlueprintGrid)
- `src/components/sections/` — page sections (Hero, ExperienceTimeline, SkillMap, ContactSection)
- `src/components/charts/` — data viz (only SkillGroupList remains after radar removal)

## Goals / Non-Goals

**Goals:**
- Establish a coherent Linux-terminal identity (prompt syntax, section-as-`cat` metaphor, subtle window chrome) without crossing into kitsch.
- Standardize vertical rhythm: predictable section padding, consistent connector spacing, clean mobile-to-desktop transitions.
- Polish every section's alignment, spacing, and responsive behavior.
- Re-evaluate the component hierarchy: extract repeated patterns into shared helpers, leave the rest alone.
- No new runtime dependencies. No data structure changes. No content rewrites.

**Non-Goals:**
- Building a real interactive terminal emulator.
- Adding new sections, pages, or features.
- Changing the data model (`cv.ts`).
- Changing deploy pipeline.
- Major animation overhauls (small refinements only — do not chase novelty).

## Decisions

### 1. Spacing system: 4px base, named tokens for section rhythm
- Adopt a 4px base via Tailwind's spacing scale. Already partially in place via `space-*` custom tokens in `global.css`.
- Define `--section-padding-y` token (3rem mobile, 5rem desktop) for vertical section padding.
- Define `--section-gap` (2rem) for gap between consecutive sections.
- Connector elements use existing `section-connector` class with predictable margin.

**Alternative considered:** Add a separate `space-tight`/`space-loose` scale. Rejected — adds tokens without solving the real problem (lack of discipline in applying existing ones).

### 2. Terminal chrome: subtle, semantic
- `SectionPanel` gets a 3-segment top bar styled as terminal tabs: `~/section-name` in mono, with three tiny dots (red/yellow/green) on the right (or left, matching Hyprland's bar aesthetic).
- Hero gets a single window-chrome bar with the Arch-style prompt.
- No full-window decorations on every panel — only top-level sections and the Hero.
- Prompt syntax (`[luis@arch ~]$`) reserved for actual interactive cues (section titles), not used as pure decoration.

**Alternative considered:** Full macOS-style window chrome on every panel. Rejected — too literal, breaks content density.

### 3. Hero identity: neofetch-flavored identity card
Replace current hero contents (status line + name + typewriter + summary + bento) with a neofetch-style card:
- Left: ASCII art (small, refined — Arch-style or a custom monogram that's actually meaningful)
- Right: `user@arch` prompt → name; `OS:` → role; `Host:` → location; `Kernel:` → experience years; `Uptime:` → current role
- Below: existing summary, bento stats

**Alternative considered:** Keep typewriter, just refine typography. Rejected — typewriter is a generic "dev portfolio" trope. Neofetch ties to the actual daily-driver OS.

### 4. Section headers: terminal command syntax
- Format: `── experience ──` with a small `cat /var/log/experience` or just a clear terminal prefix. Pick one style and use everywhere.
- Replace `SectionPanel` `section-label` rendering with this new pattern.
- Keep color contrast: muted text + accent on the prefix character.

**Alternative considered:** `▸ experience` chevron style. Rejected — clashes with timeline nodes that already use chevrons.

### 5. Component organization: extract on 3+ use, no premature abstraction
- Review every section. If the same JSX or className pattern appears 3+ times, extract a helper into `components/ui/` or `components/layout/`.
- Single-use patterns stay inline.
- Folder boundaries (`ui/`, `layout/`, `sections/`, `charts/`) are good. Do not add more folders.

**Alternative considered:** Full atomic-design refactor (atoms/molecules/organisms). Rejected — over-engineering for a 2-page site.

### 6. Status bar & command palette: keep, verify alignment
- `BaseLayout` status bar (section / scroll / UTC) already aligns with terminal aesthetic. Verify spacing and ensure it doesn't shift.
- `CommandPalette` may need minor polish (focus ring, monospace consistency) but is structurally fine.

### 7. BlueprintGrid: keep, tone down if competing
- Current blueprint background is a design signature. Keep it.
- If the new terminal chrome competes, reduce blueprint opacity by ~20%. Do not delete.

**Alternative considered:** Replace with `neofetch --stdout` style text rain. Rejected — performance + visual noise.

### 8. Animation discipline
- Each animation must justify its existence. The "noise" of decorative animation is removed.
- Keep: typewriter-equivalent on hero identity, scroll-reveal on sections, blueprint scroll-velocity, status-dot pulse, hover glow.
- Remove: arbitrary fade-in-up cascades on first paint (causes perceived lag).

## Risks / Trade-offs

- **Risk: Visual regressions across many files** → Mitigation: implement per-section, screenshot or visually verify each before moving to next.
- **Risk: Inconsistency during transition (mixed old/new styles)** → Mitigation: Phase 1 (tokens) and Phase 2 (SectionPanel chrome) must land before any section polish.
- **Risk: Over-terminal, kitsch territory** → Mitigation: use terminal elements semantically (prompts = interactive cues, paths = locations, tabs = section context), not cosmetically. Less is more.
- **Trade-off: removing some decorative animation** → less whimsy, more professional restraint. Net positive.
- **Trade-off: extraction adds small files** → only when 3+ reuse. YAGNI for one-offs.

## Migration Plan

Phase order (each phase ships as a working build):

1. **Tokens** — `src/styles/global.css`: spacing scale, section-padding tokens, panel chrome tokens, refined type scale if needed. No visual changes to existing components yet.
2. **Chrome** — `SectionPanel.astro`, `BaseLayout.astro`: terminal tab/window chrome. No content changes.
3. **Hero** — `Hero.astro` full redesign to neofetch identity card.
4. **Section polish** — `ExperienceTimeline.astro`, `SkillMap.astro`, `ContactSection.astro`: apply new section headers, verify spacing, audit responsive.
5. **Responsive audit** — verify 4-col → 2-col → 1-col transitions on every section. Mobile-first verification.
6. **Animation pass** — remove arbitrary reveals, keep meaningful ones.

Rollback: per-file `git revert` is always available since each phase is independent. If a phase breaks the build, that phase's commits can be reverted without affecting others.

## Open Questions

- **Nav style**: keep simple text links, or add Hyprland-style workspace tags (1:web 2:cv 3:now)? — Lean toward simple, but could experiment.
- **Color accent**: keep current blue (`#58a6ff`), or shift to a warmer Arch/gruvbox palette (orange/yellow accent)? — Lean keep current, ask user during design review.
- **Monospace everywhere** vs. **mono for UI, sans for body prose**: which? — Lean mono for chrome/labels, sans for body. Verify in design.
- **BlueprintGrid opacity**: full, reduce 20%, or remove? — Lean reduce. Confirm during Phase 2.
