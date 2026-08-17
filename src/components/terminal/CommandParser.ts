import type { FsNode } from './FileSystem';
import { resolvePath, listDir, isDirectory, HOME_PATH, normalizePathString } from './FileSystem';

// ── Result types ────────────────────────────────────────────────────────────

export interface CommandResult {
  type: 'output';
  content: string;
  outputType?: 'text' | 'pre' | 'success' | 'warning' | 'error' | 'info';
}

export interface ClearResult {
  type: 'clear';
}

export interface CdResult {
  type: 'cd';
  path: string;
}

export interface RebootResult { type: 'reboot'; }

export type ParseResult = CommandResult | ClearResult | CdResult | RebootResult;

// ── CommandParser ───────────────────────────────────────────────────────────

interface RegisteredCommand {
  handler: (args: string[], cwd: string) => ParseResult;
  description: string;
}

export class CommandParser {
  private commands = new Map<string, RegisteredCommand>();

  constructor(fs: FsNode) {
    this.registerDefaults(fs);
  }

  /** Split input into command + args, handling quoted strings and $HOME/$USER expansion. */
  tokenize(input: string): { command: string; args: string[] } {
    const trimmed = input.trim();
    if (!trimmed) return { command: '', args: [] };

    const tokens: string[] = [];
    let current = '';
    let inQuote = false;

    for (const ch of trimmed) {
      if (ch === '"') {
        inQuote = !inQuote;
        continue;
      }
      if (ch === ' ' && !inQuote) {
        if (current) {
          tokens.push(current);
          current = '';
        }
        continue;
      }
      current += ch;
    }
    if (current) tokens.push(current);

    // Expand environment variables
    const expanded = tokens.map((t) =>
      t.replace(/\$HOME/g, HOME_PATH).replace(/\$USER/g, 'luis'),
    );

    return { command: expanded[0] || '', args: expanded.slice(1) };
  }

  /** Parse a full input line and return the result. */
  parse(input: string, cwd: string): ParseResult {
    const { command, args } = this.tokenize(input);
    if (!command) return { type: 'output', content: '' };

    const cmd = this.commands.get(command);
    if (!cmd) {
      return {
        type: 'output',
        content: `[ERROR] command not found: ${command}`,
        outputType: 'error',
      };
    }

    return cmd.handler(args, cwd);
  }

  /** Register a new command. */
  register(name: string, handler: (args: string[], cwd: string) => ParseResult, description = ''): void {
    this.commands.set(name, { handler, description });
  }

  /** Get list of registered command names. */
  getCommandNames(): string[] {
    return Array.from(this.commands.keys());
  }

  /** Return tab-completion candidates based on partial input. */
  getCompletions(partial: string, cwd: string, fs: FsNode): string[] {
    const trimmed = partial.trimStart();
    if (!trimmed) return this.getCommandNames();

    // Find the last word being typed
    const words = trimmed.split(/\s+/);
    const lastWord = trimmed.endsWith(' ') ? '' : words[words.length - 1];

    // If only one word so far and no trailing space → complete command name
    if (words.length <= 1 && !trimmed.includes(' ')) {
      return this.getCommandNames().filter((c) => c.startsWith(lastWord));
    }

    // Else complete against files/dirs in cwd
    const node = resolvePath(fs, cwd, '.');
    if (!node?.children) return [];

    return Object.keys(node.children)
      .filter((name) => name.startsWith(lastWord) && !name.startsWith('.'))
      .map((name) => (node.children![name].type === 'directory' ? name + '/' : name));
  }

  // ── Default commands ────────────────────────────────────────────────────

  private registerDefaults(fs: FsNode): void {
    this.register('help', (_args, _cwd) => {
      const lines = Array.from(this.commands.entries()).map(
        ([name, cmd]) => `  ${name.padEnd(12)} ${cmd.description}`,
      );
      return {
        type: 'output',
        content: 'Available commands:\n' + lines.join('\n'),
        outputType: 'info',
      };
    }, 'Show this help message');

    this.register('ls', (args, cwd) => {
      const target = args[0] || '.';
      const node = resolvePath(fs, cwd, target);
      if (!node) {
        return { type: 'output', content: `[ERROR] ${target}: No such file or directory`, outputType: 'error' };
      }
      if (!isDirectory(node)) {
        return { type: 'output', content: `[ERROR] ${target}: Not a directory`, outputType: 'error' };
      }
      return { type: 'output', content: listDir(node).join('\n') };
    }, 'List directory contents');

    this.register('cd', (args, cwd) => {
      const rawTarget = args[0] || '~';
      const node = resolvePath(fs, cwd, rawTarget);
      if (!node) {
        return { type: 'output', content: `[ERROR] ${rawTarget}: No such file or directory`, outputType: 'error' };
      }
      if (!isDirectory(node)) {
        return { type: 'output', content: `[ERROR] ${rawTarget}: Not a directory`, outputType: 'error' };
      }
      const segments = normalizePathString(cwd, rawTarget);
      return { type: 'cd', path: '/' + segments.join('/') };
    }, 'Change directory (default: ~)');

    this.register('cat', (args, cwd) => {
      if (args.length === 0) {
        return { type: 'output', content: '[ERROR] Usage: cat <file> [file...]', outputType: 'error' };
      }
      // Special case: cv.pdf triggers download
      if (args[0] === 'cv.pdf') {
        window.location.href = '/cv.pdf';
        return { type: 'output', content: 'Downloading CV...', outputType: 'success' };
      }
      const contents: string[] = [];
      for (const file of args) {
        const node = resolvePath(fs, cwd, file);
        if (!node) {
          contents.push(`[ERROR] ${file}: No such file or directory`);
          continue;
        }
        if (isDirectory(node)) {
          contents.push(`[ERROR] ${file}: Is a directory`);
          continue;
        }
        contents.push(node.content ? node.content() : '');
      }
      return { type: 'output', content: contents.join('\n') };
    }, 'Show file contents (or download cv.pdf)');

    this.register('pwd', (_args, cwd) => {
      return { type: 'output', content: cwd };
    }, 'Print working directory');

    this.register('echo', (args, _cwd) => {
      return { type: 'output', content: args.join(' ') };
    }, 'Echo text');

    this.register('clear', (_args, _cwd) => {
      return { type: 'clear' };
    }, 'Clear the terminal');

    this.register('whoami', (_args, _cwd) => {
      return { type: 'output', content: 'luis' };
    }, 'Print current user');

    this.register('neofetch', (_args, cwd) => {
      const node = resolvePath(fs, cwd, '~/about.md');
      if (!node) {
        return { type: 'output', content: '[ERROR] about.md not found', outputType: 'error' };
      }
      return {
        type: 'output',
        content: node.content ? node.content() : '',
        outputType: 'pre',
      };
    }, 'Display system information (cat ~/about.md)');

    this.register('sudo', (args, _cwd) => {
      const cmd = args.join(' ') || 'anything';
      return {
        type: 'output',
        content: `[sudo] password for luis:\nSorry, try again.\n[sudo] password for luis:\nSorry, try again.\n[sudo] password for luis:\nsudo: 3 incorrect password attempts\n\nluis is not in the sudoers file. This incident will be reported.`,
        outputType: 'warning',
      };
    }, 'Execute a command as superuser (good luck)');

    this.register('vim', (_args, _cwd) => {
      return {
        type: 'output',
        content: [
          '',
          '  ~                              VIM - Vi IMproved',
          '  ~                              version 9.0',
          '  ~                              by Bram Moolenaar et al.',
          '  ~',
          '  ~                              Vim is open source and freely distributable',
          '  ~',
          '  ~                              Help poor children in Uganda!',
          '  ~                              type  :help iccf<Enter>  for information',
          '  ~',
          '  ~                              type  :q<Enter>  to exit',
          '  ~                              type  :help<Enter> or <F1> for on-line help',
          '  ~',
          '  ~',
          '  -- INSERT --',
        ].join('\n'),
        outputType: 'pre',
      };
    }, 'The one true editor (good luck exiting)');

    this.register('cowsay', (args, _cwd) => {
      const text = args.join(' ') || 'moo';
      const line = '_'.repeat(text.length + 2);
      return {
        type: 'output',
        content: [
          ' ' + line,
          '< ' + text + ' >',
          ' ' + '-'.repeat(text.length + 2),
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
        ].join('\n'),
        outputType: 'pre',
      };
    }, 'The cow says...');

    this.register('sl', (_args, _cwd) => {
      return {
        type: 'output',
        content: [
          '                         (@@@)     (@@@@@)',
          '                   (@@)     (@@@@@@@)        (@@@@@@@)',
          '             (@@@@@@@)   (@@@@@)       (@@@@@@@@@@@)',
          '        (@@@)     (@@@@@@@)   (@@@@@@)             (@@@)',
          '   (@@@@@@)    (@@@@@@)                (@)',
          '       (@)  (@@@@)  (@) (@)    (@@)',
          '                  (@@@@)   (@@@@)',
          '               #  #  #  #  #  #  #  #',
          '            ###  ###  ###  ###  ###  ###',
          '#############################################',
          '  CHOO CHOO!  Steam locomotive passing through!',
        ].join('\n'),
        outputType: 'pre',
      };
    }, 'Steam locomotive (you should be studying)');

    this.register('arch', (_args, _cwd) => {
      return {
        type: 'output',
        content: 'Arch Linux — Keep it simple, stupid.\n\nBTW, I use Arch. (Well, technically this site runs on GitHub Pages, but the spirit is there.)\n\nThe user is on Arch + Hyprland daily. The site should feel like SSH-ing into their machine.',
        outputType: 'info',
      };
    }, 'Reveal the truth');

    this.register('home', (_args, _cwd) => {
      window.location.href = '/';
      return { type: 'output', content: 'Navigating to home...' };
    }, 'Go to homepage');

    this.register('projects', (_args, _cwd) => {
      window.location.href = '/projects';
      return { type: 'output', content: 'Navigating to /projects...' };
    }, 'Go to projects page');

    this.register('now', (_args, _cwd) => {
      window.location.href = '/now';
      return { type: 'output', content: 'Navigating to /now...' };
    }, 'Go to /now page');

    this.register('exit', (_args, _cwd) => {
      return { type: 'reboot' };
    }, 'Disconnect from the session');
  }

}
