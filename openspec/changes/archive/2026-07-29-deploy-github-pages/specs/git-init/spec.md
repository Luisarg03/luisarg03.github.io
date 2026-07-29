## ADDED Requirements

### Requirement: Git repository initialized

The project directory SHALL be initialized as a git repository with a `.gitignore` that excludes build artifacts, dependencies, and OS files.

#### Scenario: Git init succeeds
- **WHEN** `git init` is run in the project root
- **THEN** a `.git` directory is created and `git status` reports the repository as initialized

#### Scenario: .gitignore excludes build output
- **WHEN** `npm run build` produces `dist/` output
- **THEN** `git status` does not show `dist/` as untracked

#### Scenario: .gitignore excludes node_modules
- **WHEN** dependencies are installed
- **THEN** `git status` does not show `node_modules/` as untracked

### Requirement: Initial commit created

All source files SHALL be staged and committed in a single initial commit.

#### Scenario: First commit exists
- **WHEN** `git log --oneline` is run after the initial commit
- **THEN** exactly one commit is shown with all project files included
