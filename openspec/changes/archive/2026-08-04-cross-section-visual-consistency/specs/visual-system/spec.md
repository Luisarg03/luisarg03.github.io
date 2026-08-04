## ADDED Requirements

### Requirement: Shared Card component primitive

The system SHALL provide a shared `<Card>` component at
`src/components/ui/Card.astro` for use across pages. The
component SHALL be a thin wrapper over the existing `.panel`
class plus a `variant` modifier. The component SHALL accept a
`variant` prop with the closed union `'project' | 'status'`,
a `class` prop for additional classes, and a default `<slot
/>` for content.

The `project` variant SHALL apply: surface background, border,
`padding: var(--space-5)`, top accent bar (visible on hover),
hover lift, soft copper-tinted shadow.

The `status` variant SHALL apply: surface background, border,
`padding: var(--space-4)`, top accent bar (visible always),
no hover effect.

#### Scenario: Card renders with project variant
- **WHEN** a page uses `<Card variant="project">`
- **THEN** the rendered element has surface background, border,
  and `padding: var(--space-5)`
- **AND** the top accent bar is hidden by default
- **AND** hovering the card shows the top accent bar and a
  hover lift

#### Scenario: Card renders with status variant
- **WHEN** a page uses `<Card variant="status">`
- **THEN** the rendered element has surface background, border,
  and `padding: var(--space-4)`
- **AND** the top accent bar is always visible
- **AND** no hover effect is applied

#### Scenario: Card slot renders content
- **WHEN** a page passes content inside `<Card>...</Card>`
- **THEN** the content renders inside the card's body

#### Scenario: Card variant prop is a closed union
- **WHEN** a developer inspects the `Card.astro` props
- **THEN** the `variant` prop is typed as the union
  `'project' | 'status'`
- **AND** TypeScript errors on any other value

### Requirement: Site footer is terminal-style

The site footer in `BaseLayout.astro` SHALL render in
terminal style, consistent with the project's "portfolio as
OS" identity. The footer SHALL show a shell prompt prefix
(`~/luisarg $ `), the current commit short hash (read at
build time from `process.env.VITE_BUILD_COMMIT`), the build
date (`process.env.VITE_BUILD_DATE`), the uptime in days
(`process.env.VITE_BUILD_UPTIME_DAYS`), and the working
directory hint (`~/luisarg`). The footer SHALL be hidden on
the homepage via the existing `hideFooter` flag (the homepage
ends with `ShutdownModule`).

The footer SHALL be present on all non-homepage pages,
including `/now` and `/projects`.

#### Scenario: Footer shows build metadata
- **WHEN** a visitor views any non-homepage page
- **THEN** the site footer renders below the page content
- **AND** the footer shows the current commit short hash
- **AND** the footer shows the build date
- **AND** the footer shows the uptime in days
- **AND** the footer shows the shell prompt prefix

#### Scenario: Footer is hidden on homepage
- **WHEN** a visitor views the homepage (`/`)
- **THEN** the site footer does NOT render
- **AND** the `ShutdownModule` renders in its place

#### Scenario: Footer uses terminal-style chrome
- **WHEN** the site footer renders
- **THEN** the footer uses the monospace font
- **AND** the footer uses the muted text color
- **AND** the footer is separated from the page content by a
  top border
