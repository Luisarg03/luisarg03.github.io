## ADDED Requirements

### Requirement: Contact links display

The contact section SHALL display links to email, LinkedIn, and GitHub profiles.

#### Scenario: Contact links render
- **WHEN** the page loads
- **THEN** email (`luis.m.paz.03@gmail.com`), LinkedIn, and GitHub links are visible and functional

#### Scenario: Email link uses mailto
- **WHEN** a user clicks the email link
- **THEN** their default mail client opens with the address pre-filled

### Requirement: CV PDF download

The contact section SHALL provide a link to download the CV as a PDF file.

#### Scenario: PDF download link works
- **WHEN** a user clicks the CV download link
- **THEN** a PDF file is downloaded or opened in the browser

### Requirement: Social profile icons

Social and professional links SHALL be accompanied by recognizable icons (LinkedIn, GitHub, email).

#### Scenario: Icons are visible with links
- **WHEN** the contact section renders
- **THEN** each link displays an appropriate icon alongside the text

### Requirement: Contact data sourced from config

All contact links and text SHALL be sourced from `src/content/config.ts` to allow easy updates without editing components.

#### Scenario: Changing email in config updates the page
- **WHEN** the email address is changed in `config.ts`
- **THEN** the contact section displays the new email on next build
