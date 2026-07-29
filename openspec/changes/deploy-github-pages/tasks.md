## 1. Git initialization

- [ ] 1.1 Verify `.gitignore` covers `node_modules/`, `dist/`, `.astro/`, `.env*`
- [ ] 1.2 Run `git init` in the project root
- [ ] 1.3 Stage all source files: `git add .`
- [ ] 1.4 Create initial commit with message `feat: initial portfolio site — Astro 7 + Tailwind v4`

## 2. GitHub remote and push

- [ ] 2.1 Create GitHub repository (user provides name — e.g., `luisarg03/luisarg03.github.io` or `luisarg03/MyGithubPage`)
- [ ] 2.2 Add remote: `git remote add origin <url>`
- [ ] 2.3 Push to main: `git push -u origin main`
- [ ] 2.4 Verify all files appear on GitHub

## 3. GitHub Pages activation

- [ ] 3.1 Go to repo Settings → Pages → Source = GitHub Actions
- [ ] 3.2 Trigger workflow manually or wait for push to `main` to trigger it
- [ ] 3.3 Verify deploy succeeds (green check in Actions tab)
- [ ] 3.4 Confirm site is live at default `*.github.io` URL

## 4. Custom domain

- [ ] 4.1 Update `public/CNAME` with actual domain
- [ ] 4.2 Commit and push the updated CNAME
- [ ] 4.3 In GitHub Pages settings, enter custom domain and save
- [ ] 4.4 Configure DNS at domain registrar (A/AAAA/CNAME records pointing to GitHub Pages)
- [ ] 4.5 Verify SSL certificate is provisioned (may take minutes) and site loads at custom domain

## 5. CV PDF

- [ ] 5.1 Export CV as PDF from Typst or another source
- [ ] 5.2 Place PDF at `public/cv.pdf`
- [ ] 5.3 Commit and push
- [ ] 5.4 Verify download link works on the deployed site

## 6. Verification

- [ ] 6.1 Visit the deployed site at custom domain
- [ ] 6.2 Verify all sections render (hero, experience, skills, contact)
- [ ] 6.3 Verify `/now` page loads
- [ ] 6.4 Verify blueprint canvas background animates
- [ ] 6.5 Verify CV PDF download works
