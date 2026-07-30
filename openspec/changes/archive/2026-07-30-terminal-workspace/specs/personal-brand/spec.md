## MODIFIED Requirements

### Requirement: Favicon asset
The system SHALL continue to serve a real SVG favicon at `/favicon.svg`.

The favicon SHALL be a simplified monogram mark ("LP") using the accent blue color on a transparent or dark background. It SHALL be legible at 16×16px and 32×32px sizes. The favicon SHALL be linked from the `<head>` of every page via `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.

#### Scenario: Favicon loads in browser tab
- **WHEN** any page of the site is loaded
- **THEN** the browser tab displays the LP monogram favicon
- **AND** the favicon is legible at standard tab sizes

#### Scenario: Favicon linked in head
- **WHEN** the HTML `<head>` is inspected
- **THEN** a `<link rel="icon">` tag references `/favicon.svg`

### Requirement: Monogram SVG variant
The SVG monogram SHALL be served from `/public/monogram.svg` and SHALL render the "LP" mark. The SVG variant SHALL be used for OG images, social previews, and static contexts where text rendering is unreliable.

#### Scenario: SVG monogram is served from public
- **WHEN** `/monogram.svg` is requested
- **THEN** a valid SVG file is returned with the LP monogram
- **AND** the SVG uses the accent blue color

#### Scenario: OG image references SVG monogram
- **WHEN** the OG image meta tag is rendered
- **THEN** it references `/monogram.svg` as the image source

### Requirement: Color palette tokens
The color palette tokens (defined in `@theme` in `global.css`) SHALL remain the source of truth for all colors used in the terminal interface.

#### Scenario: Tokens resolve via CSS and Tailwind
- **WHEN** any component references `var(--color-accent)` or the `text-accent` utility
- **THEN** both resolve to the same color value
- **AND** the value is defined exactly once in the `@theme` block

### Requirement: Typography stack
The system SHALL continue to use variable fonts loaded self-hosted via `@fontsource-variable`.

The stack SHALL consist of:
- Inter Variable for display text (if any non-terminal content exists)
- JetBrains Mono Variable for the terminal interface (prompt, output, command history)

The terminal interface is mono-only.

#### Scenario: Terminal uses mono
- **WHEN** the terminal interface renders
- **THEN** all text uses JetBrains Mono Variable
- **AND** Inter is used only for `<noscript>` fallback content

#### Scenario: Fonts load self-hosted
- **WHEN** a page is requested
- **THEN** the browser fetches font files from the same origin (`/fonts/`)
- **AND** no third-party font CDN request is made

### Requirement: Motion language
The system SHALL define a motion vocabulary for the terminal interface.

The motion language SHALL include:
- Boot sequence (multi-frame animation, ~2s)
- Cursor blink (1Hz, monospace block)
- Command output fade-in (per command, ~200ms)
- Reduced motion: all of the above disabled

There SHALL be no scroll-driven animations in the terminal interface.

#### Scenario: Reduced motion disables animations
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** boot sequence, cursor blink, and command output fade are disabled
- **AND** all content appears immediately

## REMOVED Requirements

### Requirement: Hero identity card
**Reason**: The static neofetch hero card is replaced by the `neofetch` command in the terminal shell (defined in the `terminal-shell` capability). The identity is now produced by a real command, not a page element.

**Migration**: The `neofetch` command in the terminal shell produces the equivalent output. The values still resolve from `cv.ts`.

## ADDED Requirements

### Requirement: Interactive identity through commands
The system SHALL expose the user's identity, role, and professional context as discoverable commands in the terminal shell.

At minimum, the following commands SHALL be implemented:
- `neofetch` — full identity card
- `whoami` — short identity
- `cat about.md` — about content
- `cat contact.md` — contact details

#### Scenario: whoami shows short identity
- **WHEN** the user types `whoami`
- **THEN** the terminal shows a one-line identity (e.g., `luis — Cloud Engineer at Interbank`)

#### Scenario: cat about.md shows neofetch
- **WHEN** the user types `cat about.md`
- **THEN** the terminal output matches the `neofetch` command output

### Requirement: Workspace as identity context
Each workspace SHALL correspond to a different facet of the user's identity, accessed via the workspace tag bar (defined in `workspace-navigation`).

Workspaces:
- `1:home` — about, identity, current focus
- `2:now` — what the user is focused on right now
- `3:lab` — side projects, experiments, things built for fun
- `4:contact` — contact details and social links

#### Scenario: Workspace 1 shows home content
- **WHEN** the user switches to workspace `1:home`
- **THEN** the terminal auto-runs `cd ~ && cat about.md`

#### Scenario: Workspace 3 shows lab
- **WHEN** the user switches to workspace `3:lab`
- **THEN** the terminal shows a placeholder or list of side projects

### Requirement: No-script fallback identity
The system SHALL provide a `<noscript>` fallback that renders a static, readable version of the user's identity and CV for crawlers and users without JavaScript.

The fallback SHALL include:
- The user's name and role
- A short summary
- A list of recent work experience
- Contact details

#### Scenario: Noscript fallback renders
- **WHEN** JavaScript is disabled in the browser
- **THEN** the noscript fallback is visible
- **AND** it includes name, role, summary, experience list, and contact details

#### Scenario: SEO crawler sees content
- **WHEN** a search engine crawler requests the page
- **THEN** the HTML source includes the noscript fallback content
- **AND** the content is human-readable
