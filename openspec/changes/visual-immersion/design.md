## Context

The site has a solid foundation: dark theme tokens, `.panel` system, procedural blueprint canvas, and dashboard-style components. The current issue is visual monotony — every section is a `.panel` in a vertical `space-y-*` stack. The Control Panel identity needs more variety, depth, and immersion to feel truly distinctive.

This design is the third visual pass. It builds on existing tokens and components rather than replacing them.

## Goals / Non-Goals

**Goals:**
- Make the hero feel like an immersive entry, not a styled card
- Break the vertical monotony with asymmetric layouts
- Add scroll-driven depth (parallax, staggered reveals)
- Give each section a distinct visual treatment
- Make skills feel like a connected system, not a flat list
- Add interactivity to the timeline (accordion)
- Connect sections visually (pipes/gradient bars)
- Transform the footer into a system status bar

**Non-Goals:**
- New dependencies (no animation libs, no icon sets)
- Data layer changes
- New pages or routes
- Dark/light mode toggle
- Blog section or project showcase
- Accessibility regressions (all interactive elements must be keyboard-navigable)

## Decisions

### 1. Hero: full-viewport overlay, no panel wrapper

**Choice:** The hero spans full viewport width and height (min-height: 90vh). Name, role, and stat cards are positioned over the blueprint background with a semi-transparent gradient overlay. Stat cards are absolutely-positioned floating widgets. No `.panel` border — the blueprint IS the container.

**Rationale:** The hero is the first thing visitors see. Wrapping it in a `.panel` makes it feel contained and safe. Breaking out of the grid immediately signals "this is different from a template."

### 2. Asymmetric section layouts

**Choice:** Use a 2-column or offset grid for alternating sections. Example: Experience section shifts right by 2 columns on desktop, leaving negative space on the left with a subtle connector line. Skills section spans full width with a 3-column category grid. Contact section is compressed into a 2/3 width block aligned right.

**Rationale:** Asymmetry creates visual rhythm. A document where every section is full-width center-aligned reads as monotonous. Infrastructure dashboards are inherently asymmetric — widgets of different sizes arranged for information density.

### 3. Scroll-driven effects

**Choice:** Pure CSS + IntersectionObserver (vanilla JS in an Astro island). No animation library. Three effects:
1. **Parallax**: Blueprint nodes shift slightly with scroll position (already have `requestAnimationFrame` loop — add scroll offset).
2. **Staggered reveal**: Sections fade in and slide up as they enter the viewport, staggered by child index.
3. **Scroll velocity**: Blueprint pulse intensity increases during fast scrolling, settles during slow/stopped scroll.

**Rationale:** CSS-only animations + IntersectionObserver = zero added dependencies. The staggered reveal uses CSS `@keyframes` already defined in `global.css`. Parallax modifies the existing blueprint canvas loop.

### 4. Skill topology map

**Choice:** Replace the 2-column grid of `.panel` + pill tags with a visual network. Skills are rendered as connected nodes — larger nodes for category headers, smaller nodes for individual skills, with subtle connecting lines (SVG or canvas overlay). Each category cluster has a distinct position (like regions in a topology map).

**Rationale:** Pill tags in panels say "checklist." Connected nodes say "infrastructure." This is the visual signature the Control Panel identity needs. A Cloud Engineer's skills are interconnected, not listed.

### 5. Experience accordion

**Choice:** Only the current role (Interbank) is expanded by default. Past roles show company + title + date range. Clicking expands to show responsibilities with a smooth height transition. Uses CSS `grid-template-rows: 0fr` → `1fr` trick for smooth animation without JS measurement.

**Rationale:** The timeline with 7 fully-expanded roles is visually overwhelming. Collapsing saves vertical space and adds interactivity. The current role stays expanded to maintain immediate relevance.

### 6. Section variety rules

**Choice:** Adjacent sections must differ in at least 2 of: background treatment, border treatment, width, horizontal alignment, or internal layout.

| Section | Background | Border | Width | Alignment |
|---|---|---|---|---|
| Hero | Blueprint overlay | None | Full | Center |
| Experience | Dark surface | Left accent bar | 2/3 right | Right-offset |
| Skills | Transparent | None | Full | Center |
| Contact | Slightly lighter surface | Top accent glow | 3/5 center | Center |

**Rationale:** Forcing variety between adjacent sections prevents the "same panel, same panel" fatigue.

### 7. Visual connectors

**Choice:** Gradient bars (2px height, accent to transparent) between major sections. Positioned at the gap between sections with negative margin to overlap both. Optional: a subtle pipe-like vertical connector on the left side linking the Hero through to Contact.

**Rationale:** Infrastructure diagrams use lines and connectors to show relationships. Applying this to section separators reinforces the identity without being literal.

### 8. Footer as system status bar

**Choice:** Replace current two-line footer with a dashboard-style status bar: left side shows "SYSTEM STATUS: ONLINE" with a green dot, center shows last deploy timestamp, right shows version (`v1.0.0`). Monospace, small text, subtle border-top glow.

**Rationale:** The footer is currently wasted space. Turning it into a system status bar gives the entire page a satisfying terminal/dashboard frame.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Skill topology map is complex to implement without canvas/WebGL | Use CSS Grid + positioned elements + SVG connectors. No canvas needed. |
| Accordion animations may jank on mobile | Use CSS `grid-template-rows` transition — hardware-accelerated, no JS measurements. |
| Asymmetric layouts break at narrow viewports | All asymmetric positioning collapses to single-column at `md` breakpoint. Mobile is a clean vertical stack. |
| Scroll effects hurt performance | Throttle scroll handlers to ~60fps via `requestAnimationFrame`. IntersectionObserver is passive by default. |
| Too much complexity overwhelms the CV content | Each section's content is still the same data. Visual complexity serves hierarchy and identity, not decoration for its own sake. |
