# Site Configuration

## Purpose

Global site configuration: build-time sitemap generation via `@astrojs/sitemap`, a `robots.txt` referencing the sitemap, and theme-color/color-scheme meta tags consistent with the dark terminal aesthetic.
## Requirements
### Requirement: Auto-generated sitemap.xml at build time
The site SHALL generate a valid sitemap.xml at build time using the `@astrojs/sitemap`
integration. The sitemap MUST include `<url>` entries for `/` and `/now` with
appropriate `<lastmod>` and `<priority>` values.

#### Scenario: Build produces sitemap
- **WHEN** `astro build` completes
- **THEN** `dist/sitemap-index.xml` exists and references `dist/sitemap-0.xml`
- **AND** `dist/sitemap-0.xml` contains `<url>` entries for `/` and `/now`

#### Scenario: Sitemap is valid XML
- **WHEN** sitemap-index.xml and sitemap-0.xml are checked
- **THEN** both files parse as valid XML with correct namespaces

### Requirement: robots.txt with sitemap reference
The site SHALL serve a `robots.txt` at the root that references the sitemap URL
and allows all crawlers.

#### Scenario: robots.txt exists at build output
- **WHEN** `astro build` completes
- **THEN** `dist/robots.txt` exists with content:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://luisarg03.github.io/sitemap-index.xml
  ```

### Requirement: Theme color and color-scheme meta tags
The site SHALL include `<meta name="theme-color">` and
`<meta name="color-scheme" content="dark">` in the `<head>` of every page.

The theme-color value SHALL match the background token
(`#0a0e14`).

#### Scenario: Dark theme meta present
- **WHEN** any page renders
- **THEN** `<meta name="theme-color" content="#0a0e14">` is present
- **AND** `<meta name="color-scheme" content="dark">` is present

#### Scenario: Theme color matches the background token
- **WHEN** any page renders
- **THEN** the rendered meta theme-color equals `#0a0e14`
- **AND** the value matches the page background token

