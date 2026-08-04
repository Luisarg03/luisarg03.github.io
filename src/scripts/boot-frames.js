// Canonical boot sequence frames for LuisOS terminal boot.
// Single source of truth — consumed by boot.js (runtime typing engine)
// and BootModule.astro (no-JS static fallback).

export var LUIS_BOOT_FRAMES = [
  '[    0.000000] Booting LuisOS v7.0.0 — luis@cloud',
  '[    0.154200] CPU: Arch x86_64 (4 cores @ 3.4GHz)',
  '[    0.423100] Memory: 64GB RAM detected — swap: 8GB',
  '[    0.891300] Kernel: linux-arch 6.6.0 loaded',
  '[    1.245000] Starting system services...',
  '<span class="boot-ok">[     OK     ]</span> Started OpenSSH Daemon',
  '<span class="boot-ok">[     OK     ]</span> Started Hyprland Compositor',
  '<span class="boot-ok">[     OK     ]</span> Reached target Multi-User System.',
];
