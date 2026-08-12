# Host Header

## Purpose

Add a compact host header section above the htop hero window, restoring the identity detail data (Role, Experience, Current, Location) server-rendered with the system line (OS/Browser/Display/CPU/Lang) JS-detected, and remove the duplicated below-window host details section.

## ADDED Requirements

### Requirement: identity section above the htop window

A section with id="identity" SHALL render above the htop window, showing `Role`, `Experience`, `Current`, and `Location` key:value pairs with keys in teal, fully server-rendered so it works without JavaScript.

#### Scenario: identity renders without JS

- **WHEN** a user loads the site with JavaScript disabled
- **THEN** the identity section renders Role, Experience, Current, and Location from site data with no client scripting

#### Scenario: identity pairs survive wrapping

- **WHEN** the viewport is narrow enough to wrap the identity row
- **THEN** key:value pairs wrap as intact units without splitting mid-pair and without horizontal overflow

### Requirement: identity data from site configuration

The identity values SHALL come from siteConfig and the same experience computation used by the htop status bar uptime, so the displays stay consistent.

#### Scenario: consistent experience display

- **WHEN** the identity section and the htop status bar render
- **THEN** both derive experience from the same single computation

#### Scenario: current derived from active role

- **WHEN** an experience entry has no end date
- **THEN** the Current value is that entry's company, with a fallback when no such entry exists

### Requirement: system line without JS shows placeholders

The system line SHALL render OS, Browser, Display, CPU, and Lang values detected by client JS, and SHALL show '—' placeholders when JavaScript is unavailable.

#### Scenario: system values detected by JS

- **WHEN** JavaScript runs
- **THEN** OS, Browser, Display, CPU, and Lang show detected values

#### Scenario: no-JS system placeholders

- **WHEN** JavaScript is unavailable
- **THEN** the system values render as '—'

### Requirement: no duplicated host details

The previous host details section below the htop window SHALL be removed so each piece of information renders once.

#### Scenario: no duplicate section

- **WHEN** a user scrolls the homepage
- **THEN** no below-window host details section exists duplicating the new header content

### Requirement: palette anchors target the section

The command palette `cd /identity` SHALL scroll to the new #identity section while `cd /skills` keeps targeting the htop window.

#### Scenario: cd /identity scrolls to section

- **WHEN** a user runs `cd /identity` in the command palette
- **THEN** the page scrolls to the identity section anchor

#### Scenario: cd /skills unchanged

- **WHEN** a user runs `cd /skills`
- **THEN** the page scrolls to the htop window anchor
