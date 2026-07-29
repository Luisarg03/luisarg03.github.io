## Why

The portfolio site is built locally and passes all checks, but is not yet deployed. The site needs to be pushed to GitHub, configured for GitHub Pages deployment, and made available at a custom domain.

## What Changes

- Initialize git repository and configure `.gitignore` for build artifacts and dependencies.
- Create initial commit with all source files and push to the GitHub remote.
- Configure GitHub Pages in repository settings to use GitHub Actions as the deployment source (the `.github/workflows/deploy.yml` workflow is already in place).
- Update `public/CNAME` with the actual custom domain.
- Add a CV PDF file to `public/` (exported from `inputs/cv.typ` or a placeholder until ready).
- Verify the site is live at the custom domain after DNS propagation.

## Capabilities

### New Capabilities

- `git-init`: Initialize git, configure `.gitignore`, create first commit.
- `github-push`: Connect to GitHub remote repository and push `main` branch.
- `pages-activate`: Configure GitHub Pages settings (source = GitHub Actions, custom domain).
- `cv-pdf`: Add CV PDF file to `public/cv.pdf` for download link.

### Modified Capabilities

None — this is an operations/deployment change.

## Impact

- **Repository**: Git history begins at initial commit. Repository becomes public on GitHub.
- **Deployment**: First push to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.
- **Domain**: Custom domain configured via `public/CNAME` and GitHub Pages settings. DNS records must be set by the user at their domain registrar.
- **No code changes**: All source files are already in place. This change only handles git initialization, remote configuration, and deployment activation.
