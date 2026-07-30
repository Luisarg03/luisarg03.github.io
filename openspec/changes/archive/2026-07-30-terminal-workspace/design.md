# Design — Terminal Workspace

## Context

The current site (after `refine-visual-style`) has a neofetch hero and a monospace panel aesthetic on top of a conventional scrollable page layout. It looks terminal-flavored but is still a standard CV: scroll, read sections, leave. The user wants the page to *be* a terminal — the interface itself becomes the user's identity, not just decoration.

This is a structural rewrite. The single page (and `/now` page) get replaced by a single-page interactive terminal app with Hyprland-style workspace tags for jumping between content contexts. The data layer (`cv.ts`) stays the same; only the surface changes.

The user is on Arch + Hyprland daily. The site should feel like SSH-ing into their machine. The tone: a personal machine, not a portfolio. Discovery is the point.

## Goals / Non-Goals

**Goals:**
- Replace the page with an interactive shell that visitors can type real commands into
- Add Hyprland-style workspace tags for jumping between content contexts (home, now, lab, contact)
- A boot sequence on first load (~2s) that sets the tone
- Discoverable but not required: easter eggs that reward curiosity
- Mobile-friendly: virtual keyboard helper, tappable workspace tags
- Keep `cv.ts` as the data source of truth
- No new runtime dependencies
- Static build, deploy to GitHub Pages unchanged

**Non-Goals:**
- Full TTY emulation (xterm.js, etc.) — the shell is purpose-built, not generic
- Multi-user / multiplayer
- Persistent state across sessions (the terminal can be ephemeral; use localStorage only for command history)
- Backend, server-side commands
- Replacing the favicon, OG image, or site identity outside the terminal

## Decisions

### 1. Architecture: hand-rolled command parser in vanilla JS
A lightweight parser class in `src/components/terminal/CommandParser.ts` that:
- Tokenizes input (handles quoted args, env-var syntax `$HOME`, simple redirects)
- Matches tokens against a command registry
- Returns a result object: `{ type: 'text' | 'html' | 'clear' | 'switch-workspace' | 'redirect', payload: ... }`

**Why not use a library?** xterm.js, commander, yargs — all add weight. The command set is small and fixed; a hand-rolled parser is ~150 lines and zero deps.

**Alternative considered:** Build on `readline` from Node — rejected, it's a server-side API and we run in the browser. `promptlib` — overkill for 20 commands.

### 2. Virtual filesystem: a static tree, not real fs
A `FileSystem.ts` module defines the virtual tree:
```
/home/luis/
├── about.md         → renders neofetch output
├── experience/      → list of jobs
│   ├── interbank.md
│   ├── prisma.md
│   └── ...
├── skills/          → tree of skill categories
├── now/             → current focus
├── contact.md       → contact card
└── .secret/         → easter egg paths
```

**Why static, not real fs?** We don't need writes. The tree is the same for every visitor. A static module is simpler, faster, and totally static-buildable.

**Alternative considered:** IndexedDB persistence for "files you created" — rejected, scope creep.

### 3. Workspace tags: Hyprland-style bar
A horizontal tag bar at the top, just like Hyprland's bar:
- Tags: `1:home` `2:now` `3:lab` `4:contact`
- Active tag highlighted with accent + active state
- Keyboard: `Alt+1..4` to switch
- Click to switch
- Mobile: tap to switch (works as a top-level nav)
- Each workspace has a `cwd` and a default command (e.g., workspace 2 runs `cd ~/now` then `cat now.md`)

**Why Hyprland-style specifically?** It's the user's actual daily driver. It signals "this is real" without saying it.

**Alternative considered:** i3-style vertical bar — rejected, less screen real estate. macOS Spaces — too generic.

### 4. Boot sequence: POST/BIOS-style multi-frame animation
On first load, before the terminal prompt appears:
- ~8 frames of "BIOS/POST" text scrolling
- Mentions the "machine" (Arch, kernel, host)
- Ends with a `[ OK ] Reached target Multi-User System.` line
- Then the prompt appears
- Skippable: any key press or click ends the boot early

**Why a boot sequence?** It's the strongest "you've SSH-ed into a real machine" signal. A 2s investment for a memorable first impression.

**Alternative considered:** Skip boot, just show prompt — rejected, misses the joke. Longer boot (5s+) — rejected, annoying on repeat visits.

### 5. Easter eggs: 5-7 hidden commands
Curated, not random:
- `sudo` → "password:" with a fake prompt that always fails
- `vim` → launches a fake vim that exits on `:q`
- `cowsay <text>` → ASCII cow
- `sl` → steam locomotive ASCII animation
- `whoami` → "luis, but you already knew that"
- `arch` → reveals the Arch philosophy
- `exit` → "logout" + clears terminal, returns to boot
- Hidden file paths: `cat .secret/why.txt` → personal note

**Why this many?** Enough to reward curiosity, few enough to not overwhelm.

### 6. Mobile UX: virtual keyboard + tap-to-type
- Bottom-anchored command helper bar on touch: `[help] [ls] [about] [contact] [clear]`
- Tap a chip to insert the command into the prompt
- Visual keyboard hint: a small `[Tab]` `[↑]` `[↓]` row above the input
- Workspace tags remain tappable at the top
- iOS keyboard: prevent zoom by using `font-size: 16px` minimum

**Why a helper bar?** Discoverability on mobile is the #1 risk. The helper bar is the user's escape hatch.

**Alternative considered:** No helper, full keyboard only — rejected, kills mobile UX.

### 7. Output rendering: HTML-safe by default
Command output is rendered as React-style JSX nodes from the command handler. The terminal buffer accepts:
- Plain text (`text`)
- Pre-formatted blocks (`pre`)
- HTML nodes (`node`)
- Workspace switch events (`switch-workspace`)

All input is escaped before display. The shell never renders user input as HTML.

### 8. State: ephemeral + localStorage for history only
- Command history: persisted in `localStorage` (last 50 commands)
- Current workspace: session-only
- Current path (cwd): session-only
- No "files" persist

**Why minimal state?** Privacy. The user's commands don't leak across sessions.

## Risks / Trade-offs

- **Risk: SEO impact** — content is JS-generated. Crawlers see the boot screen, not the CV. → Mitigation: include a `<noscript>` fallback with a static, readable version of the CV data. The Astro build can SSR the noscript content from `cv.ts`.
- **Risk: Mobile discoverability** — users don't know they can type. → Mitigation: helper bar + a brief intro message in the boot sequence ("type 'help' to start").
- **Risk: Learning curve** — non-tech visitors bounce. → Mitigation: `help` command with clear examples, and the workspace tags work without typing.
- **Risk: Boot sequence annoys repeat visitors** — → Mitigation: skip after first visit via localStorage. Or skip on any user input.
- **Risk: Command set grows without bound** — → Mitigation: keep a small fixed set; the "lab" workspace is the dumping ground for new commands.
- **Trade-off: less conventional accessibility** — keyboard-only navigation can be tricky for screen readers. → Mitigation: ARIA roles on the prompt and output buffer; workspace tags are real buttons.

## Migration Plan

Each phase ships as a working build. The site stays live the whole time.

1. **Phase 1 — Terminal shell** (the heart of everything). Build `Shell.astro`, `CommandParser.ts`, `FileSystem.ts`, basic commands (`help`, `ls`, `cat`, `whoami`, `clear`, `echo`). Replace `index.astro` content with the shell.
2. **Phase 2 — Workspace tags**. Add `WorkspaceBar.astro`, workspace switching logic, the 4 default workspaces wired up. `/now` content reachable via workspace 2.
3. **Phase 3 — Boot sequence**. Add `BootSequence.astro`, ~8 frames, skip-on-input. Plays before shell.
4. **Phase 4 — Easter eggs + polish**. Add the 5-7 hidden commands. Mobile helper bar. History persistence. Reduced-motion behavior.
5. **Phase 5 — Verification**. astro check, build, manual run-through, accessibility check.

Rollback: each phase is a separate commit. The current `refine-visual-style` site is in git; if a phase breaks, that commit can be reverted without affecting others. The site can also fall back to the old scroll layout if a "no-terminal" mode flag is added.

## Open Questions

- **Persistence depth**: should the boot sequence skip on return visits? (Leaning yes.)
- **Command set**: which commands are essential vs fun? (Will tune in Phase 1.)
- **Workspaces**: 4 fixed tags, or user-creatable? (Leaning fixed for v1.)
- **Color per workspace**: same accent everywhere, or per-workspace hue? (Leaning same; consistency > variety.)
- **"Lab" workspace contents**: what goes there? (Open — could host blog posts, side projects, TILs later.)
