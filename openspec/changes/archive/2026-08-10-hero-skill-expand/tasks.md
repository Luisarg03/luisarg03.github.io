1. HtopWindow.astro: chevron + button semantics (role/tabindex/aria-expanded/data-skill-index) on rows 001-008; skills sub-row container.
2. Script in HtopWindow (or shared pattern): document-level delegated click/keydown handler toggling expanded state + aria-expanded (survives view transitions).
3. global.css: .htop-subrow, chevron, expanded state, focus-visible, mobile-safe.
4. Verify: build; render check; keyboard (Tab + Enter/Space toggles); view-transition survival (navigate to /now and back, expand still works); mobile 390 no overflow; no-JS static; identity row not expandable.
