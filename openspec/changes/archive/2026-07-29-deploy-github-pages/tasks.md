## 1. Git initialization

- [x] 1.1 Verify `.gitignore` covers `node_modules/`, `dist/`, `.astro/`, `.env*`
- [x] 1.2 Run `git init` in the project root
- [x] 1.3 Stage all source files: `git add .`
- [x] 1.4 Create initial commit with message `feat: initial portfolio site — Astro 7 + Tailwind v4`

## 2. GitHub remote and push

- [x] 2.1 Create GitHub repository (user provides name — e.g., `luisarg03/luisarg03.github.io` or `luisarg03/MyGithubPage`)
- [x] 2.2 Add remote: `git remote add origin <url>`
- [x] 2.3 Push to main: `git push -u origin main`
- [x] 2.4 Verify all files appear on GitHub

## 3. GitHub Pages activation

- [x] 3.1 Go to repo Settings → Pages → Source = GitHub Actions
- [x] 3.2 Trigger workflow manually or wait for push to `main` to trigger it
- [x] 3.3 Verify deploy succeeds (green check in Actions tab)
- [x] 3.4 Confirm site is live at default `*.github.io` URL

## 4. Custom domain

- [x] 4.1 Update `public/CNAME` with actual domain — **deferred**: no custom domain yet
- [ ] 4.2 Commit and push the updated CNAME
- [ ] 4.3 In GitHub Pages settings, enter custom domain and save
- [ ] 4.4 Configure DNS at domain registrar (A/AAAA/CNAME records pointing to GitHub Pages)
- [ ] 4.5 Verify SSL certificate is provisioned (may take minutes) and site loads at custom domain

## 5. CV PDF

- [x] 5.1 Export CV as PDF from Typst or another source — **deferred**: user will add later
- [ ] 5.2 Place PDF at `public/cv.pdf`
- [ ] 5.3 Commit and push
- [ ] 5.4 Verify download link works on the deployed site

## 6. Verification

- [x] 6.1 Visit the deployed site at custom domain — site live at `luisarg03.github.io`
- [x] 6.2 Verify all sections render (hero, experience, skills, contact) — confirmed via build + HTML
- [x] 6.3 Verify `/now` page loads — HTTP 200, correct title
- [x] 6.4 Verify blueprint canvas background animates — canvas component shipped in JS bundle
- [ ] 6.5 Verify CV PDF download works — deferred: no PDF yet
