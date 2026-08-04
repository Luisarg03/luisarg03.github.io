# Proposal: add-dual-accent-and-structural-polish

Change: add-dual-accent-and-structural-polish

Summary

- Introduce new CSS token `--color-accent-identity: #2AD4C9` and matching glow token for identity/wayfinding uses only.
- Apply identity accent to four high-leverage locations per decision: nav brand link, nav active-tab indicator, IdentityModule.identity-name + glow, and .section-label::before tick (both global.css and SectionPanel.astro).
- Surgical structural change: flip impact/responsibility render order inside each ExperienceModule entry's expanded detail (impact lines render before responsibility bullets).
- Order /projects cards strongest-quantified-impact-first (implementation task only; design/spec note explains scoping decision).

Capabilities touched

- visual-system (modified): tokens and section-label requirement delta.
- experience-timeline (modified): entry detail ordering requirement delta.

Breaking changes

- None. Change is additive and surgical; copper usages remain unchanged.

Verification

- Dev server visual checks desktop/mobile
- Confirm global.css and SectionPanel.astro updated consistently
- Grep review to ensure copper usages unchanged
