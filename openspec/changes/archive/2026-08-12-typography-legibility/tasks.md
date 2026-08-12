1. global.css: --text-xs 0.75rem → 0.8125rem.
2. ExperienceModule.astro: .experience-resp → Inter text-sm lh 1.7; .experience-impact-line lh 1.7.
3. projects.astro: .project-card__description → Inter, lh 1.6.
4. now.astro: note 10px → var(--text-xs), lh 1.6.
5. Verify: build + check; computed styles (font/size/lh per element); htop grid 390px no overflow; screenshots desktop/mobile to /tmp/opencode/qa-homepage/; regression smoke (expand toggles, boot).
