# Asset Optimization

## Purpose

Optimize the site's asset delivery and initial paint: font preconnect to Google Fonts CDN, `font-display: swap` on custom fonts, deferred loading of non-critical scripts, a properly-dimensioned OG image, and paint optimization hints for the BlueprintGrid canvas.

## Requirements

### Requirement: Font preconnect to Google Fonts CDN
The site SHALL include a `<link rel="preconnect">` to `https://fonts.googleapis.com`
in the `<head>` of every page.

#### Scenario: Preconnect link present
- **WHEN** any page is rendered
- **THEN** the `<head>` contains `<link rel="preconnect" href="https://fonts.googleapis.com">`
- **AND** `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

### Requirement: font-display swap on all custom fonts
The site SHALL apply `font-display: swap` to all `@font-face` declarations for Inter
and JetBrains Mono fonts.

#### Scenario: Text renders immediately with fallback font
- **WHEN** fonts are still loading
- **THEN** text is visible using system fallback fonts
- **AND** text swaps to Inter/JetBrains Mono once loaded without layout shift

### Requirement: Non-critical scripts load with defer
The site SHALL load status-bar.js, scroll-observer.js, and velocity-tracker.js with
the `defer` attribute so they do not block initial page render.

#### Scenario: Scripts execute after HTML parse
- **WHEN** a page loads
- **THEN** the DOM is fully parsed before these scripts execute
- **AND** status bar, scroll observer, and velocity tracker initialize after first paint

### Requirement: OG image is a proper PNG with dimensions
The site SHALL serve a 1200×630 PNG image at `/og-default.png` for Open Graph and
Twitter card previews. Meta tags MUST declare `og:image:width` (1200) and
`og:image:height` (630).

#### Scenario: OG meta tags include image dimensions
- **WHEN** a social platform crawls any page
- **THEN** the `<head>` contains `og:image:width` set to `1200`
- **AND** `og:image:height` set to `630`

### Requirement: BlueprintGrid canvas has paint optimization hints
The site SHALL apply `content-visibility: auto` to the BlueprintGrid container and
`will-change: transform` to the canvas element.

#### Scenario: Canvas repaints are GPU-accelerated
- **WHEN** the user scrolls with BlueprintGrid visible
- **THEN** the canvas element has `will-change: transform` in its computed style
