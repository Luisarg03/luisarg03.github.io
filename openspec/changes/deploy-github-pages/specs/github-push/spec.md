## ADDED Requirements

### Requirement: GitHub remote configured

The local repository SHALL have a GitHub remote configured pointing to the user's repository.

#### Scenario: Remote origin exists
- **WHEN** `git remote -v` is run
- **THEN** an `origin` remote is configured with a GitHub URL (e.g., `https://github.com/luisarg03/...`)

### Requirement: Main branch pushed to GitHub

The `main` branch SHALL be pushed to the GitHub remote with all commits.

#### Scenario: Push succeeds
- **WHEN** `git push -u origin main` is executed
- **THEN** the repository contents appear on GitHub at the remote URL

#### Scenario: GitHub workflow triggers on push
- **WHEN** the push reaches GitHub
- **THEN** the `Build and Deploy to GitHub Pages` workflow starts in the Actions tab
