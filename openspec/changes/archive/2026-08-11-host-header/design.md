# Host header section — design

## Placement & structure

- New section component (or block inside index.astro / HtopWindow wrapper — implementer decides the cleanest structure) rendered BEFORE HtopWindow in main flow. id="identity".
- Styling: same panel grammar as the rest of the site (surface bg, copper corner accents, film-graded light inherited), JetBrains Mono throughout (this is chrome, not prose — Clash Display NOT used here).
- Identity row: `Role: Cloud Engineer · Experience: 7+ years · Current: Interbank · Location: Buenos Aires, Argentina`. Keys (Role/Experience/Current/Location) in teal (--color-accent-identity), values in default text color, separators '·' muted, tabular-nums for numbers. Single line on desktop with wrap on mobile; key:value pairs must not split mid-pair on wrap (use inline-block or non-breaking spaces between key and value).
- System line: `OS: <os> · Browser: <browser> · Display: <w>x<h>@<dpr>x · CPU: <cores> cores · Lang: <lang>` — muted, smaller (text-xs), JS-detected values; '—' when no JS.

## Data sources (server-rendered, no-JS safe for identity)

- Role: siteConfig.role.
- Experience: `${Math.floor(yearsExp)}+ years` where yearsExp = currentYear − 2019 (SAME source as the status bar uptime — one computation, consistent display).
- Current: first experience entry with endDate === null → company (Interbank); fallback to siteConfig.availability if the dataset changes.
- Location: siteConfig.location.
- System values: existing host-detection JS (navigator.userAgent / hardwareConcurrency / screen) — moved from the below-window section, same '—' fallback.

## Responsive / viewport

- Section is compact (≤2 lines desktop). On 1440x900 the htop window stays first-viewport-visible after boot handoff (section ~80px + window ~600px fit). Mobile 390: identity line wraps (pairs intact), no horizontal overflow.
- Boot handoff scroll position unchanged (user starts at top: section visible, window below — natural).

## Anchors

- Section id="identity"; CommandPalette `cd /identity` → /#identity; `cd /skills` → /#htop (unchanged).
