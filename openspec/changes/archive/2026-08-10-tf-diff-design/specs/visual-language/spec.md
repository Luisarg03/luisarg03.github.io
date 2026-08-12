# Visual Language

## Purpose

Establish the Terraform plan diff syntax (`+` add / `-` remove / `~` change / `=` unchanged) as the signature visual language of the site, through semantic color tokens, a self-hosted display typeface, and diff-prefix decorators on content entries.

## ADDED Requirements

### Requirement: tf-diff color tokens

The `:root` palette SHALL define semantic alias tokens `--color-tf-add`, `--color-tf-remove`, `--color-tf-change`, `--color-tf-unchanged`, and `--color-tf-unknown` mapping to the existing palette values without changing any hex values.

#### Scenario: tokens alias existing palette

- **WHEN** the site styles load
- **THEN** each `--color-tf-*` token resolves to its mapped existing palette color

#### Scenario: palette unchanged

- **WHEN** all CSS custom properties are collected
- **THEN** the set of palette hex values used by the site is identical before and after the change

### Requirement: self-hosted display typeface

The site SHALL self-host a display typeface (Clash Display, woff2 weights 400/500/600/700) under `public/fonts/clash-display/`, register it via `@font-face` in `global.css`, and expose it as the `--font-display` token.

#### Scenario: fonts load from origin

- **WHEN** a browser requests the display typeface
- **THEN** the woff2 files are served from the site origin and no runtime CDN dependency is introduced

#### Scenario: font applied to titles only

- **WHEN** rendering section and module titles
- **THEN** they use `--font-display`, while body text, mono chrome, and boot frames keep their existing typefaces

### Requirement: diff prefix decorators

Content entries (project cards, experience entries, skill category headers) SHALL render `+`, `-`, `~`, or `=` prefix glyphs colored by the semantic tokens, using a small shared utility class rather than per-component duplicated CSS.

#### Scenario: prefixes colored by semantics

- **WHEN** a project card, experience entry, or skill category header is rendered
- **THEN** its prefix glyph uses the color of the corresponding `--color-tf-*` token

#### Scenario: shared utility

- **WHEN** diff prefixes are styled
- **THEN** the styling lives in a single shared utility class, not in per-component CSS

### Requirement: optional planSummary on projects

The projects content schema SHALL support an optional `planSummary` frontmatter field, and project cards SHALL render one mono line (e.g. `plan: +342 ~12 -89 =1247`) when present.

#### Scenario: planSummary present

- **WHEN** a project entry defines `planSummary`
- **THEN** its card renders the summary line with per-character token colors

#### Scenario: planSummary absent

- **WHEN** a project entry does not define `planSummary`
- **THEN** its card renders no plan line
