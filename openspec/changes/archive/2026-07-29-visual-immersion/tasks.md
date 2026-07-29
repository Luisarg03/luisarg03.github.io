## 1. Hero immersion

- [x] 1.1 Remove `.panel` wrapper from Hero — use full-viewport layout
- [x] 1.2 Position Hero content over blueprint background with gradient overlay
- [x] 1.3 Convert stat cards to floating widgets with backdrop-blur and elevated shadows
- [x] 1.4 Set hero min-height to 85vh on desktop
- [x] 1.5 Style stat cards as dashboard widgets (absolute/fixed positioning, semi-transparent bg)

## 2. Section variety and asymmetry

- [x] 2.1 Experience section: 2/3 width, right-aligned with left accent bar
- [x] 2.2 Skills section: full-width with 3-column category grid (replacing 2-column)
- [x] 2.3 Contact section: 3/5 width, centered, with top accent glow
- [x] 2.4 Ensure no two adjacent sections share the same visual treatment
- [x] 2.5 Add gradient bar separators (2px, accent-to-transparent) between sections
- [x] 2.6 Add subtle vertical connector line on left edge (desktop only)

## 3. Scroll effects

- [x] 3.1 Implement staggered section reveal using IntersectionObserver + CSS @keyframes
- [x] 3.2 Add scroll velocity tracking to BlueprintGrid canvas
- [x] 3.3 Increase blueprint pulse intensity during fast scrolling
- [x] 3.4 Throttle scroll handlers to requestAnimationFrame
- [x] 3.5 Ensure mobile performance is maintained (reduce effects on small viewports)

## 4. Skill topology map

- [x] 4.1 Replace flat 2-column grid with connected network layout
- [x] 4.2 Position category clusters at distinct visual regions
- [x] 4.3 Render individual skills as connected nodes within each cluster
- [x] 4.4 Add subtle SVG connector lines between related categories
- [x] 4.5 Weight larger categories visually (Cloud & IaC, CI/CD prominent)

## 5. Experience accordion

- [x] 5.1 Collapse all past roles by default (show company + role + dates only) — accordion CSS in place; default-open semantics via component
- [x] 5.2 Keep current role (Interbank) expanded
- [x] 5.3 Implement CSS-only smooth expand/collapse (grid-template-rows technique)
- [x] 5.4 Add expand/collapse indicator (chevron or +/- icon)
- [x] 5.5 Ensure keyboard accessibility (Enter/Space to toggle)

## 6. Footer as system status bar

- [x] 6.1 Replace two-line footer with dashboard-style status bar
- [x] 6.2 Left: "SYSTEM STATUS: ONLINE" with green dot
- [x] 6.3 Center: last deploy timestamp (or static version)
- [x] 6.4 Right: version badge
- [x] 6.5 Add subtle top border glow

## 7. Contact section polish

- [x] 7.1 Style contact cards as centered narrow panels with top accent glow
- [x] 7.2 Add subtle background shift (slightly lighter surface)

## 8. /now page enhancements

- [x] 8.1 Add scroll reveal animation to dashboard cards
- [x] 8.2 Style the /now page with its own visual treatment (distinct from index)
- [x] 8.3 Add subtle background accent on the /now container

## 9. Verification

- [x] 9.1 `npm run build` passes with 0 errors
- [x] 9.2 `npm run check` passes with 0 errors, 0 warnings
- [x] 9.3 Test responsive layout at 320px, 768px, 1024px, 1440px
- [x] 9.4 Verify scroll effects work on desktop
- [x] 9.5 Verify accordion expand/collapse works with keyboard
- [x] 9.6 Verify no layout shifts on page load
