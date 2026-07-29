## ADDED Requirements

### Requirement: GitHub Pages enabled

GitHub Pages SHALL be enabled in the repository settings with source set to GitHub Actions.

#### Scenario: Pages deploys after successful workflow
- **WHEN** the deploy workflow completes successfully
- **THEN** the site is served at the default `*.github.io` URL

#### Scenario: Custom domain configured in Pages settings
- **WHEN** a custom domain is entered in GitHub Pages settings
- **THEN** the site is accessible at the custom domain after DNS propagation

### Requirement: CNAME file deployed

The `public/CNAME` file SHALL contain the custom domain and SHALL be deployed as part of the site.

#### Scenario: CNAME present in deployed site
- **WHEN** the site is deployed
- **THEN** a `CNAME` record exists at the site root containing the custom domain
