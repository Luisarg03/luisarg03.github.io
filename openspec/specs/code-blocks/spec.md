# code-blocks Specification

## Purpose

Provide first-class code block rendering for the blog: syntax highlighting, copy-to-clipboard, and line highlighting, matching the site's dark aesthetic.

## Requirements

### Requirement: Syntax-highlighted code blocks
The system SHALL render fenced code blocks with Shiki syntax highlighting using a theme consistent with the site's dark palette.

#### Scenario: Code block renders with highlighting
- **WHEN** a post contains a fenced code block
- **THEN** it renders with syntax highlighting readable on the dark background

### Requirement: Copy button on code blocks
The system SHALL provide a copy button on each code block that copies the raw code text (without highlighting) to the clipboard and shows feedback.

#### Scenario: Copy button copies code
- **WHEN** a reader clicks the copy button on a code block
- **THEN** the raw code text is copied to the clipboard and the button shows feedback

### Requirement: Line highlighting via notation
The system SHALL support Shiki notation line highlighting: lines marked with `// [!code highlight]` comments in code blocks render with a highlight background.

#### Scenario: Notation highlight renders
- **WHEN** a code block contains a `// [!code highlight]` comment on a line
- **THEN** that line renders with a highlight background and the comment is hidden from output
