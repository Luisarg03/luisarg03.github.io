## MODIFIED Requirements

### Requirement: Site footer is terminal-style
The site footer in `BaseLayout.astro` SHALL render as a
terminal-style block, consistent with the project's "portfolio
as OS" identity. The footer SHALL have 3 visual layers: (1) a
primary prompt line in copper (`~/luisarg $ git rev-parse
--short HEAD`), (2) a muted 2×2 metadata grid with teal keys
(`--color-accent-identity`) and copper values (`--color-accent`)
showing commit, branch, uptime, and build date, and (3) a
status line with a teal dot indicator and copyright text.
The footer SHALL be hidden on the homepage via the existing
`hideFooter` flag (the homepage ends with `ShutdownModule`).
The footer SHALL be present on all non-homepage pages,
including `/now` and `/projects`.

#### Scenario: Footer shows build metadata in 2×2 grid
- **WHEN** a visitor views any non-homepage page
- **THEN** the site footer renders below the page content
- **AND** the footer shows the commit hash, branch name,
  uptime in days, and build date in a 2×2 grid layout
- **AND** the keys (commit, branch, uptime, built) are in
  teal
- **AND** the values are in copper

#### Scenario: Footer shows status dot and copyright
- **WHEN** the site footer renders
- **THEN** a teal status dot (`● online` indicator) appears
  in a status line
- **AND** the copyright text (`© 2026 Luis Meyehen Paz`)
  appears on the same status line
- **AND** the status dot uses `var(--color-accent-identity)`

#### Scenario: Footer is hidden on homepage
- **WHEN** a visitor views the homepage (`/`)
- **THEN** the site footer does NOT render
- **AND** the `ShutdownModule` renders in its place

#### Scenario: Footer uses terminal-style chrome
- **WHEN** the site footer renders
- **THEN** the footer uses the monospace font
- **AND** the footer uses muted text color
- **AND** the footer is separated from the page content by a
  top border
- **AND** the footer is centered within a `max-width: 52rem`
  container

## ADDED Requirements

### Requirement: Boot loader is centered with pre-line prelude

The homepage boot loader overlay SHALL be vertically centered
in the viewport, with a pre-line prelude above the typing
boot frames. The pre-line shows the OS name in big ASCII
art (5-6 lines tall, monospace, copper accent) and acts as
a stable anchor for the layout. The boot frames type below
the pre-line. The total content (pre-line + frames) fits
within the 100vh viewport without scrolling. The pre-line
renders synchronously (no async/await, no animation delay)
so the layout has no CLS.

The boot overlay SHALL also include:
- A brief glitch effect on the pre-line (~0.5s) using CSS
  `@keyframes` with `text-shadow` shifts in copper and teal.
  The glitch resolves to clean copper text.
- Subtle scan lines over the overlay (low-opacity
  `repeating-linear-gradient` texture) giving a CRT vibe.

Both effects SHALL respect `prefers-reduced-motion: reduce`
(animations disabled).

#### Scenario: Boot overlay is centered in the viewport
- **WHEN** the boot loader plays on initial homepage entry
- **THEN** the overlay content is vertically centered in the
  100vh viewport
- **AND** the pre-line (big ASCII) is the first visible
  element
- **AND** the typing boot frames appear below the pre-line
- **AND** the layout has no CLS (the pre-line is the stable
  anchor, frames grow below it)

#### Scenario: Pre-line shows big ASCII of the OS name
- **WHEN** the boot loader plays
- **THEN** a pre-line element shows "luisOS" rendered as
  big ASCII art (5-6 lines tall, monospace, copper accent,
  centered horizontally)

#### Scenario: Glitch effect animates the pre-line
- **WHEN** the pre-line first appears
- **THEN** it has a brief color-shift glitch effect (~0.5s)
  using CSS `text-shadow` shifts in copper and teal
- **AND** the glitch resolves to clean copper text at the end
  of the animation

#### Scenario: Scan lines overlay the boot
- **WHEN** the boot overlay is visible
- **THEN** subtle scan lines (low-opacity
  `repeating-linear-gradient` texture) overlay the entire
  overlay
- **AND** the scan lines don't compete with the text content
- **AND** pointer events are disabled on the scan-line layer

#### Scenario: Animations are disabled under reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** the glitch animation does not play
- **AND** the pre-line appears in its final copper state
  immediately
- **AND** the scan lines may still be visible (they're
  static, not animated)
