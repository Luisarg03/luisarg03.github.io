## Why

The current site has a terminal aesthetic on top of a standard scrollable page layout. It leans into monospace typography and a neofetch hero, but the structure is still a conventional CV template: sections in a column, scroll to read, no interactive depth. The user's daily driver (Arch + Hyprland) isn't reflected in how the site *works* — only in how it *looks*. This change rebuilds the page as a real interactive terminal environment where the user's identity isn't just decoration — it IS the interface. Exploring the page should feel like SSH-ing into the user's machine.

## What Changes

- **Terminal shell as main UI** — The page becomes an interactive shell session. Visitors type real commands (`ls`, `cat`, `cd`, `whoami`, `neofetch`, `help`) to navigate and discover content. The prompt is `luis@arch:~$`.
- **Hyprland workspace tags** — A workspace/tag bar (like Hyprland's bar) shows numeric tags: 1:home 2:now 3:lab 4:contact. Clicking or keying a tag switches the workspace view. Visual feedback like in a real WM — active tag highlighted, others muted.
- **Command parser + filesystem** — A lightweight command parser in JS maps commands to content. The filesystem is virtual: `~/`, `~/experience/`, `~/skills/`, `~/now/`, `~/contact/`. Commands render output into the terminal buffer.
- **Boot sequence** — On first load, a brief POST/BIOS-style boot sequence plays (~2s) before dropping to the shell prompt. Sets the tone immediately.
- **Easter eggs** — Hidden commands (`sudo`, `vim`, `sl`, `cowsay`, `:q`) trigger fun responses. Typing the user's name or Arch references reveals secret content.
- **Keyboard-driven** — `Tab` autocompletes commands/paths. `Up/Down` cycles command history. `Ctrl+L` clears the terminal. Vim-like shortcuts where appropriate.
- **Mobile-friendly** — On touch devices, a virtual keyboard helper and tap-to-auto-type reduces friction. Workspace tags remain tappable.
- **Existing CV data reused** — Content lives in `cv.ts` unchanged. The terminal shell just reads it differently.

## Capabilities

### New Capabilities
- `terminal-shell`: The interactive command-line shell that powers the entire page. Command parsing, history, autocomplete, output rendering, and the virtual filesystem.
- `workspace-navigation`: The Hyprland-inspired workspace/tag system for switching between content views (about, now, lab, contact).
- `boot-sequence`: The multi-frame boot animation that plays on first load before the shell prompt appears.

### Modified Capabilities
- `terminal-theme`: The existing terminal aesthetic becomes part of a real terminal interface — not just a visual skin over a standard layout.
- `visual-system`: The panel system and section layout are replaced by a terminal buffer + workspace viewports. Panel chrome moves into the shell output format.
- `personal-brand`: The identity shifts from "portfolio with terminal flavor" to "your machine, explore it yourself."

## Impact

- **Files affected (primary)**:
  - `src/pages/index.astro` — becomes the terminal app shell (single-page, no scrollable sections)
  - `src/pages/now.astro` — merged into the workspace system (tag 2)
  - `src/components/terminal/` — new: Shell.astro, CommandParser.ts, Prompt.astro, Output.astro, TerminalBuffer.ts, FileSystem.ts
  - `src/components/workspace/` — new: WorkspaceBar.astro, WorkspaceView.astro
  - `src/components/boot/` — new: BootSequence.astro
  - `src/components/sections/` — removed from index (content served via commands instead)
  - `src/layouts/BaseLayout.astro` — replaced or heavily stripped
  - `src/content/cv.ts` — unchanged, just consumed differently
  - `src/styles/global.css` — new terminal-specific styles (cursor blink, scanlines, green/mono mode)
- **Dependencies**: No new packages. Pure Astro components + vanilla JS for the command parser (keeping it light). Could be enhanced later with a tiny state machine lib.
- **Build/deploy**: No change to the build pipeline. Astro builds the terminal app as a static single-page app.
- **Risk**: High. This is a structural rewrite. The existing scroll-based page is replaced by a command-driven interface. Fallback: keyboard focus management, touch device usability, and SEO (content is JS-generated, needs SSR consideration).
- **No data structure changes** — `cv.ts` stays the same.
