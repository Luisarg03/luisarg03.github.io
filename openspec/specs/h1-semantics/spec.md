# h1-semantics Specification

## Purpose

Define semantic H1 requirements for the homepage to improve SEO ranking for the
user's full name ("Luis Meyehen Paz") in search engines.

## Requirements

### Requirement: Homepage has semantic H1 with full name
The homepage SHALL contain a visible `<h1>` element whose text content includes
"Luis Meyehen Paz". The H1 MUST be semantically correct (single `<h1>` per page,
not hidden with `display: none` or `visibility: hidden`).

#### Scenario: Homepage renders H1 with name
- **WHEN** a search engine crawler or user visits the homepage (`/`)
- **THEN** the HTML contains exactly one `<h1>` element
- **AND** the `<h1>` text includes "Luis Meyehen Paz"

#### Scenario: H1 is visually identical to previous design
- **WHEN** the homepage is rendered in a browser
- **THEN** the H1 has the same visual appearance as the previous `<span class="neofetch-user">`
- **AND** no layout shift or visual difference is observable
