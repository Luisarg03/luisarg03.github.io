## ADDED Requirements

### Requirement: Astro project with TypeScript and Tailwind CSS v4

The project SHALL be initialized as an Astro 5 project with TypeScript strict mode and Tailwind CSS v4 for styling.

#### Scenario: Project builds successfully
- **WHEN** `npm run build` is executed
- **THEN** the build completes without errors and outputs static files to `dist/`

#### Scenario: TypeScript type-checking passes
- **WHEN** `npx astro check` is executed
- **THEN** no type errors are reported

### Requirement: GitHub Pages deployment via GitHub Actions

The project SHALL include a GitHub Actions workflow that builds the Astro site and deploys to GitHub Pages on push to the `main` branch.

#### Scenario: Push to main triggers deploy
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the workflow runs `npm ci`, `npm run build`, and deploys the `dist/` directory to GitHub Pages

#### Scenario: Build succeeds before deploy
- **WHEN** the build step fails
- **THEN** deployment is not attempted

### Requirement: Custom domain support

The project SHALL support a custom domain via a `CNAME` file placed in the `public/` directory or configured through GitHub Pages settings.

#### Scenario: Custom domain configured
- **WHEN** a `CNAME` file exists in `public/` with a domain name
- **THEN** the deployed site serves from that domain after DNS configuration

### Requirement: Project directory structure

The project SHALL follow the standard Astro directory layout with `src/pages/` for routes, `src/components/` for reusable components, `src/content/` for data and MDX, `src/layouts/` for page layouts, and `public/` for static assets.

#### Scenario: Directory structure matches convention
- **WHEN** the project is scaffolded
- **THEN** directories `src/pages/`, `src/components/`, `src/content/`, `src/layouts/`, and `public/` exist
