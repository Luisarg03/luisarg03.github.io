## Context

The portfolio site is fully built (source + build output in `dist/`). The CI/CD pipeline (`.github/workflows/deploy.yml`) is ready. What remains is git initialization, GitHub repository connection, and GitHub Pages activation. No code changes needed.

**Current state:**
- `.gitignore` exists (from Astro scaffold)
- `dist/` built successfully
- `public/CNAME` has placeholder text
- `.github/workflows/deploy.yml` ready
- No git history, no remote configured
- No CV PDF in `public/`

## Goals / Non-Goals

**Goals:**
- Initialize git, configure appropriate `.gitignore`, create first commit
- Push to GitHub (user provides repo name or existing repo URL)
- GitHub Pages deploys automatically on first push via existing workflow
- Custom domain configured via CNAME and repo settings
- CV PDF added as downloadable asset

**Non-Goals:**
- Setting up DNS records (user handles at registrar)
- GitHub organization/account setup (user already has GitHub account)
- Multi-branch strategy (single `main` branch for MVP)
- Custom build runners or self-hosted actions

## Decisions

### 1. GitHub Actions as Pages source

**Choice:** Use the existing `.github/workflows/deploy.yml` with `actions/upload-pages-artifact` + `actions/deploy-pages`.

**Rationale:** Already written and tested locally. No branch-based deployment (no `gh-pages` branch). Cleaner: source lives on `main`, deploy happens in CI.

### 2. `.gitignore` scope

**Choice:** Exclude `node_modules/`, `dist/`, `.astro/`, and OS files.

**Rationale:** Astro's scaffold already includes a base `.gitignore`. Verify it covers these paths. `dist/` is regenerated in CI, never committed.

### 3. CV PDF

**Choice:** If a PDF is available, place it at `public/cv.pdf`. Otherwise, leave the download link as-is (will 404 until provided).

**Rationale:** The ContactSection already links to `/cv.pdf`. Adding the file is a data task, not a code change. A placeholder or the actual PDF can be added at any time.

### 4. CNAME / custom domain

**Choice:** User provides domain. Update `public/CNAME` with it. Configure in GitHub Pages settings post-push.

**Rationale:** CNAME file in `public/` ensures it's deployed with the site. GitHub Pages settings must also have it configured for SSL certificate provisioning.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| First deploy fails due to missing Pages permission | The workflow declares `pages: write` and `id-token: write`. User must enable Pages in repo settings. |
| DNS propagation delay | Normal. Site available at `username.github.io` immediately; custom domain takes up to 24h. |
| CV PDF not ready | Download link will 404 until file is added. Non-blocking — reminder in tasks. |

## Open Questions

- **GitHub repo name**: Is it `luisarg03/luisarg03.github.io` (user/organization Pages) or `luisarg03/MyGithubPage` (project Pages)? Affects the base URL.
- **Custom domain**: What is the actual domain? Needed for `CNAME` file.
- **CV PDF**: Is there an exported PDF from the Typst CV, or should we add it later?
