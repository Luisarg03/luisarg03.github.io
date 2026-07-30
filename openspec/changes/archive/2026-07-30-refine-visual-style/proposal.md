## Why

The current full-viewport terminal interface, while technically impressive, reads as a raw terminal emulator — unwelcoming to non-technical visitors (recruiters, colleagues, general public) who are the primary audience. The site needs to blend terminal personality with a warm, polished, approachable visual style.

## What Changes

- Introduce `visual-blend` as a new capability that defines the hybrid visual design system
- Warm the terminal color palette: replace cool/harsh tones with softer, inviting accents while preserving monospace identity
- Add depth and polish: glass morphism, gentle shadows, subtle backdrop blur, and refined transitions
- Break out of full-viewport terminal into a centered, card-like presentation with breathing room around the shell
- Add card-based rendering for command output where it improves readability (projects, contact info, experience items)
- Evolve the personal brand identity from "hacker terminal" to "polished developer portfolio with terminal soul"

## Capabilities

### New Capabilities

- `visual-blend`: A hybrid visual design system that fuses terminal monospace typography with modern web aesthetics. Defines a warm accent palette, glass morphism surfaces, centered layout with controlled max-width, card-based output rendering for structured content, and refined motion language. Acts as the bridge between terminal authenticity and mainstream approachability.

### Modified Capabilities

- `terminal-theme` (existing spec in `terminal-workspace/specs/terminal-theme/`): Warm the color palette — replace harsh green-on-black terminal defaults with softer accent tones (warm blue, amber, rose). Add glass morphism effects (backdrop blur, subtle transparency) to panels and output cards. Refine the cursor, prompt, and status dot colors for visual warmth. Keep monospace as the terminal voice.

- `visual-system` (existing spec in `terminal-workspace/specs/visual-system/`): Replace full-viewport terminal with a centered, padded layout capped at a readable max-width. Add card rendering for structured command output (projects list, experience entries, contact details). Introduce subtle border glow and shadow elevation on interactive elements. Keep the terminal buffer and viewport concepts but apply the new visual treatment.

- `personal-brand` (existing spec in `terminal-workspace/specs/personal-brand/`): Shift brand positioning from "hacker terminal" to "polished developer portfolio with terminal personality". Update typography direction — keep JetBrains Mono for terminal but allow Inter Variable for card content headers. Add visual warmth to the favicon and monogram if needed. Maintain the workspace-as-identity-context model.

## Impact

- **New spec files**: `openspec/changes/refine-visual-style/specs/visual-blend/` (new capability)
- **Modified spec files**: `terminal-theme/spec.md`, `visual-system/spec.md`, `personal-brand/spec.md` (updated requirements)
- **No new external dependencies** — all effects achievable with Tailwind v4 utilities and CSS
- **Backward compatible**: terminal still works as-is; changes are visual layering on top
