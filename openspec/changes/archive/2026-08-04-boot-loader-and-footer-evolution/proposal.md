## Why

The site has 2 pieces of site-wide chrome that have accumulated
ad-hoc polish over many sessions but lack a coherent visual
upgrade. They are the first and last visual elements a visitor
sees — the boot loader on initial homepage entry, and the site
footer on every page. The user wants both to feel "impressive"
and "professional" respectively, while keeping the terminal/OS
identity that defines the site.

## What Changes

- **Boot loader centered with pre-line prelude**:
  - `src/components/modules/BootModule.astro`: change the
    overlay from `align-items: flex-start` (top-anchored) to
    `align-items: center` (true vertical center). The previous
    top-anchored choice was a CLS fix to prevent content from
    shifting as boot lines append. The new layout centers a
    pre-line prelude (the OS name "luisOS" rendered as big
    ASCII) above the boot frames; the pre-line is rendered
    immediately, so it acts as a stable anchor and the typing
    frames grow downward from it. The 100vh container
    accommodates both the pre-line and the frames without CLS.
  - Add a glitch effect to the pre-line: a brief ~0.5s color
    shift animation using `@keyframes` with `text-shadow` shifts
    in copper and teal. Respects `prefers-reduced-motion: reduce`.
  - Add scan lines over the overlay: a subtle
    `repeating-linear-gradient` texture at low opacity, giving
    a CRT vibe without competing with the text content.
  - `src/components/modules/BootModule.astro`: render the
    pre-line prelude above the `.boot-terminal` block. The
    pre-line shows "luisOS" in big ASCII (5-6 lines tall, monospace,
    centered, copper accent).

- **Site footer 2×2 metadata readout + status dot**:
  - `src/layouts/BaseLayout.astro`: change the footer from
    a single muted meta line to a structured 2×2 metadata grid
    (commit | uptime, branch | built) with teal keys and copper
    values, followed by a live status line (`● online` with
    a teal dot) and the existing copyright line.
  - The status dot uses the existing `prefers-reduced-motion:
    reduce` pattern to disable animation when the user has
    reduced motion enabled.

## Capabilities

### Modified Capabilities
- `visual-system`: MODIFY the existing "Site footer is
  terminal-style" requirement to evolve from a single-line
  meta to a 2×2 metadata grid + status dot. ADD 2 new
  requirements for the boot loader (centered layout, pre-line
  prelude).

## Impact

- `src/components/modules/BootModule.astro` (centered layout,
  pre-line rendering, glitch + scan-lines CSS).
- `src/layouts/BaseLayout.astro` (2×2 footer grid, status dot).
- `openspec/specs/visual-system/spec.md` (1 MODIFIED + 2 ADDED
  requirements).
- No new dependencies. Shiki / monospace fonts / existing CSS
  tokens cover all the new elements.
