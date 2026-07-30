## ADDED Requirements

### Requirement: Person schema on every page
The site SHALL include a JSON-LD `Person` structured data block on every page. The block
MUST include `@type: Person`, `name`, `url`, `jobTitle`, `sameAs` (GitHub, LinkedIn URLs),
and `image` pointing to the monogram.

#### Scenario: Homepage includes Person schema
- **WHEN** a crawler visits the homepage (`/`)
- **THEN** the HTML contains a `<script type="application/ld+json">` with `@type: Person`

#### Scenario: Now page includes Person schema
- **WHEN** a crawler visits the `/now` page
- **THEN** the HTML contains a `<script type="application/ld+json">` with `@type: Person`

### Requirement: WebSite schema on every page
The site SHALL include a JSON-LD `WebSite` structured data block on every page. The block
MUST include `@type: WebSite`, `name`, `url`, and `description`.

#### Scenario: Homepage includes WebSite schema
- **WHEN** a crawler visits the homepage (`/`)
- **THEN** the HTML contains a `<script type="application/ld+json">` with `@type: WebSite`

### Requirement: Valid JSON-LD syntax
The JSON-LD blocks SHALL be valid JSON with no trailing commas, properly escaped strings,
and correct schema.org property names.

#### Scenario: JSON-LD passes Google Rich Results Test
- **WHEN** the JSON-LD is extracted and validated
- **THEN** it parses as valid JSON and contains recognized schema.org types
