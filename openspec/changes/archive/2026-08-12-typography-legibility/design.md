# Typography legibility — design

Per-fix spec (selectors verified in audit; implementer re-verifies in code):
1. ExperienceModule.astro `.experience-resp` (lines ~254-259): font-family var(--font-mono) → var(--font-sans); font-size text-xs → text-sm; line-height 1.6 → 1.7. Prefix `·` and other chrome unchanged.
2. projects.astro `.project-card__description` (lines ~427-431): font-family var(--font-mono) → var(--font-sans); line-height declare 1.6. Meta line, tags, plan summary unchanged (mono).
3. global.css: `--text-xs: 0.75rem` → `0.8125rem` (13px). ~30 rules consume the token automatically. After change verify htop window grid at 390px (columns absorb +1px; no overflow, no wrap breakage).
4. ExperienceModule `.experience-impact-line`: line-height 1.6 → 1.7.
5. now.astro note: class with text-[10px] → var(--text-xs); line-height 1.6.

Verification: computed font-family/size/line-height per element; htop 390px grid intact; prose blocks readable; build + astro check.
