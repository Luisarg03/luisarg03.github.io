## ADDED Requirements

### Requirement: CV PDF available for download

A CV PDF file SHALL be placed at `public/cv.pdf` so the download link in the contact section resolves.

#### Scenario: PDF file exists in public directory
- **WHEN** the site is built
- **THEN** `dist/cv.pdf` is included in the build output

#### Scenario: Download link works on deployed site
- **WHEN** a user clicks the CV download link
- **THEN** the browser downloads or opens the PDF file
