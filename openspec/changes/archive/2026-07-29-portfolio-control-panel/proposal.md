## Why

Luis Meyehen Paz needs a personal portfolio website that reflects his identity as a Cloud/Platform Engineer — not a generic developer template. The site should serve as a living professional presence on a custom domain, with a unique visual identity rooted in infrastructure and dashboard aesthetics, while remaining extensible for future content (blog, projects, i18n).

## What Changes

- Build a static personal website using Astro 5 + TypeScript + Tailwind CSS v4, deployed to GitHub Pages with a custom domain.
- Implement a "Control Panel" visual identity: dark theme, blueprint grid background (procedural canvas), stat cards, status indicators, and infrastructure-diagram-inspired layout.
- Convert existing `inputs/cv.typ` content into typed TypeScript data (`src/content/cv.ts`) as the single source of truth for professional experience.
- Add a `/now` page (MDX-based) for personal updates: certifications in progress, travel plans, skill development.
- Wire CI/CD via GitHub Actions to build and deploy on push to `main`.

## Capabilities

### New Capabilities

- `site-scaffold`: Astro 5 project scaffold with TypeScript, Tailwind CSS v4, and GitHub Pages deployment pipeline.
- `design-system`: Dark theme with blueprint-grid visual identity, stat cards, status indicators, and infrastructure-inspired layout components.
- `hero-section`: Landing section with name, role, key stat cards (years of experience, location, availability status).
- `experience-timeline`: Reverse-chronological professional experience sourced from typed CV data.
- `skill-map`: Categorized technical skills displayed as an infrastructure-style tag map.
- `now-page`: MDX-powered `/now` page for current-status updates (certifications, travel, learning).
- `contact-section`: Contact links, social profiles, and CV PDF download.
- `cv-data`: Typed TypeScript data layer extracted from `inputs/cv.typ`, serving as single source of truth for experience, skills, and education.

### Modified Capabilities

None — this is a greenfield project with no existing specs.

## Impact

- **New project**: Entire site built from scratch in the current repository root.
- **Input data**: `inputs/cv.typ` is read as reference; its content is manually transcribed into typed TypeScript (not mechanically converted).
- **Deployment**: GitHub Pages via GitHub Actions. Requires repository settings for custom domain and Pages source configuration.
- **Dependencies**: Astro, Tailwind CSS v4, TypeScript. No backend, no database, no third-party APIs in MVP.
- **Assets**: Favicon and OG image may be needed at implementation time.
