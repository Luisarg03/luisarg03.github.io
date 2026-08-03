## 1. Engine frames (boot.js)

- [x] 1.1 Update `LUIS_BOOT_FRAMES`: `[  OK  ]` lines become `[     OK     ]` in the timestamp column (no timestamp on OK lines); `luis@arch` → `luis@cloud`
- [x] 1.2 Confirm the terminal page (Shell.astro) renders the updated frames correctly (no code change expected — it consumes the canonical frames)

## 2. Overlay conversion (BootModule)

- [x] 2.1 Convert BootModule to a fixed full-viewport overlay: `hidden` by default, `position: fixed; inset: 0; z-index: 40`, opaque page background
- [x] 2.2 JS: remove `hidden`, lock scroll (`html { overflow: hidden }`), run `initBootSequence`, on complete → fade (≤ 0.5s) → remove overlay from DOM + unlock scroll; fallback timeout guarantees cleanup
- [x] 2.3 Skip: click/keydown/touchstart (engine) + wheel/scroll (component); skip = finish typing + fade immediately
- [x] 2.4 Entry guard: skip overlay on `back_forward` navigation, client-side navigation (astro:page-load), and direct hash loads; quick mode (sessionStorage) already skips
- [x] 2.5 Delete: scroll hint, status bar markup, status bar IntersectionObserver + collapse CSS; reduced-motion/no-JS → overlay never shown
- [x] 2.6 a11y: overlay `aria-hidden="true"` during play; removed from DOM after fade (no focus trap, no residual listeners)

## 3. Homepage composition

- [x] 3.1 index.astro: module order → BootModule (overlay), Identity, Skills, Experience, Shutdown; `showBootChip` prop on BaseLayout
- [x] 3.2 BaseLayout: `[LOADED]` chip in header (prop-gated, homepage only), static under reduced motion / no-JS, appears after `boot-complete`

## 4. Verification

- [x] 4.1 `npm run check` + `npm run build` pass
- [x] 4.2 Playwright: overlay types on first load (fresh session), skip via click AND scroll, quick mode → no overlay, reduced motion → no overlay, no-JS → no overlay, client nav → no overlay, `back_forward` → no overlay
- [x] 4.3 Alignment: all boot message text starts at the same column (measure computed positions); `[     OK     ]` copper accent retained
- [x] 4.4 Identity in first viewport without scroll; 10-second comprehension (name, role, years, company, location)
- [x] 4.5 Header chip appears after boot; absent on other pages
- [x] 4.6 Lighthouse: CLS ≤ 0.05 (collapse removed); recapture screenshots (desktop / mobile / reduced-motion / no-JS)
- [x] 4.7 Designer visual gate on recaptured screenshots (overlay mid-typing, post-fade, identity first viewport)
- [x] 4.8 Archive the change (scenario-preserving deltas) and clean up
