## 1. Semantic H1

- [x] 1.1 Change `<span class="neofetch-user">` to `<h1 class="neofetch-user">` in `src/components/sections/Hero.astro`
- [x] 1.2 Ensure `.neofetch-user` CSS class explicitly sets `font-size` and `font-weight` to override browser H1 defaults

## 2. Verification

- [x] 2.1 Run `astro build` and verify no errors
- [x] 2.2 Verify built HTML contains `<h1 class="neofetch-user">Luis Meyehen Paz</h1>`
- [x] 2.3 Confirm only one `<h1>` exists in `dist/index.html`

## 3. Google Search Console (manual)

- [ ] 3.1 Go to https://search.google.com/search-console and add property `luisarg03.github.io`
- [ ] 3.2 Verify ownership (DNS TXT record recommended, or HTML file upload to `public/`)
- [ ] 3.3 Submit sitemap: `https://luisarg03.github.io/sitemap-index.xml`
- [ ] 3.4 Request indexing for `https://luisarg03.github.io/`

## 4. Bing Webmaster Tools (manual)

- [ ] 4.1 Go to https://www.bing.com/webmasters and add site `luisarg03.github.io`
- [ ] 4.2 Import from Google Search Console if possible, or verify manually
- [ ] 4.3 Submit sitemap URL

## 5. Backlinks (manual)

- [ ] 5.1 Update LinkedIn profile to include `https://luisarg03.github.io` in contact info or featured section
- [ ] 5.2 Update GitHub profile README or website field with `https://luisarg03.github.io`
- [ ] 5.3 Update Twitter/X profile website field with `https://luisarg03.github.io`
- [ ] 5.4 Any other professional profiles (Stack Overflow, Medium, etc.)
