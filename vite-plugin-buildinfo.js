// ═══════════════════════════════════════════════════════════════════════════
//  buildinfo — Vite plugin that injects build-time metadata as global
//  constants. Used by the projects page terminal-style footer.
// ═══════════════════════════════════════════════════════════════════════════

import { execSync } from 'node:child_process';

// Reference date for the simulated "uptime" counter. Update this when
// the portfolio site is meaningfully re-deployed.
const DEPLOY_ZERO = '2025-01-15';

function daysSince(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export default function buildinfo() {
  return {
    name: 'buildinfo',
    configResolved(config) {
      let commit = 'unknown';
      try {
        commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
      } catch {
        // git not available or not a repo; fall back to 'unknown'
      }
      const date = new Date().toISOString().slice(0, 10);
      const uptime = daysSince(DEPLOY_ZERO);

      config.define = {
        ...config.define,
        __BUILD_COMMIT__: JSON.stringify(commit),
        __BUILD_DATE__: JSON.stringify(date),
        __BUILD_UPTIME_DAYS__: JSON.stringify(uptime),
      };

      // Also expose via the VITE_ env prefix so Astro frontmatter can read
      // them through `import.meta.env` in both dev and build (Vite's
      // `define` does not reach `.astro` frontmatter modules in dev).
      process.env.VITE_BUILD_COMMIT = commit;
      process.env.VITE_BUILD_DATE = date;
      process.env.VITE_BUILD_UPTIME_DAYS = String(uptime);
    },
  };
}
