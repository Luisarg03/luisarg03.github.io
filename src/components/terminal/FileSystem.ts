import { siteConfig, experience, skillCategories } from '../../content/cv';

export interface FsNode {
  type: 'file' | 'directory';
  name: string;
  content?: () => string;
  children?: Record<string, FsNode>;
  hidden?: boolean;
}

const HOME_PATH = '/home/luis';

// ── Content generators ──────────────────────────────────────────────────────

const aboutContent = () =>
  [
    '        ....                luis@arch',
    '    .o+ooooooo+o.           -----------',
    '  .ooooooooooooooo.         OS: self-hosted',
    ' .oooooooooooooooooo.       Host: arch',
    '.ooooooooooooooooooooo.     Shell: zsh',
    '.ooooooooooooooooooooo.     Uptime: 7+ years',
    ':ooooooooooooooooooooo:     Role: ' + siteConfig.role,
    ':oooooooooooooooooooooo:    Location: ' + siteConfig.location,
    ' .ooooooooooooooooooo.      Company: Interbank',
    '  .oooooooooooooooo.        GitHub: ' + siteConfig.github,
    '    .+ooooooooooo+.         Contact: ' + siteConfig.email,
    '        ........',
  ].join('\n');

const contactContent = () =>
  [
    '# Contact',
    '',
    'Name: ' + siteConfig.name,
    'Email: ' + siteConfig.email,
    'LinkedIn: ' + siteConfig.linkedin,
    'GitHub: ' + siteConfig.github,
    'Location: ' + siteConfig.location,
    'Availability: ' + siteConfig.availability,
  ].join('\n');

const experienceContent = (exp: (typeof experience)[0]) =>
  [
    '# ' + exp.company,
    '',
    'Role: ' + exp.role,
    'Location: ' + exp.location,
    'Period: ' + exp.startDate + ' - ' + (exp.endDate || 'Present'),
    '',
    '## Responsibilities',
    ...exp.responsibilities.map((r) => '- ' + r),
  ].join('\n');

const skillContent = (cat: (typeof skillCategories)[0]) =>
  '# ' + cat.category + '\n\n' + cat.skills.join(', ');

// ── Filename-to-index mappings (defined per spec) ───────────────────────────

const experienceFiles: Array<{ filename: string; exp: (typeof experience)[0] }> = [
  { filename: 'interbank.md', exp: experience[0] },
  { filename: 'prisma.md', exp: experience[1] },
  { filename: 'tiendanube.md', exp: experience[2] },
  { filename: 'walmart.md', exp: experience[3] },
  { filename: 'tsoft.md', exp: experience[4] },
  { filename: 'monsun.md', exp: experience[5] },
  { filename: 'dthink.md', exp: experience[6] },
];

const skillFiles: Array<{ filename: string; cat: (typeof skillCategories)[0] }> = [
  { filename: 'cloud.md', cat: skillCategories[0] },
  { filename: 'cicd.md', cat: skillCategories[1] },
  { filename: 'data.md', cat: skillCategories[2] },
  { filename: 'python.md', cat: skillCategories[3] },
  { filename: 'databases.md', cat: skillCategories[4] },
  { filename: 'platform.md', cat: skillCategories[5] },
  { filename: 'ai.md', cat: skillCategories[6] },
  { filename: 'languages.md', cat: skillCategories[7] },
];

// ── Virtual filesystem ──────────────────────────────────────────────────────

export const fileSystem: FsNode = {
  type: 'directory',
  name: '/',
  children: {
    home: {
      type: 'directory',
      name: 'home',
      children: {
        luis: {
          type: 'directory',
          name: 'luis',
          children: {
            'about.md': {
              type: 'file',
              name: 'about.md',
              content: aboutContent,
            },
            experience: {
              type: 'directory',
              name: 'experience',
              children: Object.fromEntries(
                experienceFiles.map(({ filename, exp }) => [
                  filename,
                  { type: 'file' as const, name: filename, content: () => experienceContent(exp) },
                ]),
              ),
            },
            skills: {
              type: 'directory',
              name: 'skills',
              children: Object.fromEntries(
                skillFiles.map(({ filename, cat }) => [
                  filename,
                  { type: 'file' as const, name: filename, content: () => skillContent(cat) },
                ]),
              ),
            },
            now: {
              type: 'directory',
              name: 'now',
              children: {
                'now.md': {
                  type: 'file',
                  name: 'now.md',
                  content: () => 'Use workspace 2 to view /now content',
                },
              },
            },
            'contact.md': {
              type: 'file',
              name: 'contact.md',
              content: contactContent,
            },
            '.secret': {
              type: 'directory',
              name: '.secret',
              hidden: true,
              children: {
                'why.txt': {
                  type: 'file',
                  name: 'why.txt',
                  content: () => 'Because GUIs are bloat. Because the terminal is home. Because Arch btw.',
                },
                'hyprland.md': {
                  type: 'file',
                  name: 'hyprland.md',
                  content: () => 'Hyprland — a dynamic tiling Wayland compositor. The only way to fly.',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ── Helper functions ────────────────────────────────────────────────────────

/** Normalize a path string: resolve `.` and `..`, produce absolute form. */
function normalizePathString(cwd: string, target: string): string[] {
  let path = target;
  if (path.startsWith('~')) path = path.replace('~', HOME_PATH);

  const segments = path.startsWith('/')
    ? path.split('/').filter(Boolean)
    : [...cwd.split('/').filter(Boolean), ...path.split('/').filter(Boolean)];

  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '.' || seg === '') continue;
    if (seg === '..') {
      if (resolved.length > 0) resolved.pop();
      continue;
    }
    resolved.push(seg);
  }
  return resolved;
}

/**
 * Resolve a target path relative to cwd and return the FsNode, or null if not
 * found. Handles `~` → /home/luis, `.`, `..`, absolute, and relative paths.
 */
export function resolvePath(fs: FsNode, cwd: string, targetPath: string): FsNode | null {
  const segments = normalizePathString(cwd, targetPath);

  let node: FsNode = fs;
  for (const seg of segments) {
    if (!node.children || !node.children[seg]) return null;
    node = node.children[seg];
  }
  return node;
}

/** List directory contents. Directories end with `/`. Hidden entries skipped unless the parent directory is hidden. */
export function listDir(node: FsNode): string[] {
  if (!node.children) return [];

  return Object.values(node.children)
    .filter((child) => {
      if (node.hidden) return true; // inside a hidden dir → show everything
      return !child.hidden && !child.name.startsWith('.');
    })
    .map((child) => (child.type === 'directory' ? child.name + '/' : child.name));
}

export function isDirectory(node: FsNode): boolean {
  return node.type === 'directory';
}

export { HOME_PATH };
