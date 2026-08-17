// Canonical boot sequence frames for LuisOS terminal boot.
// Single source of truth — consumed by boot.js (runtime typing engine)
// and BootModule.astro (no-JS static fallback).

export var LUIS_BOOT_FRAMES = [
  '[    0.000000] Booting LuisOS v7.0.0 — luis@cloud',
  '[    0.154200] CPU: Arch x86_64 (4 cores @ 3.4GHz)',
  '[    0.423100] Memory: 64GB RAM — swap: 8GB',
  '<span class="boot-ok">[     OK     ]</span> Started Hyprland Compositor',
  '<span class="boot-ok">[     OK     ]</span> Identity module loaded',
  '<span class="boot-ok">[     OK     ]</span> Skills index ready',
  '<span class="boot-ok">[     OK     ]</span> Experience timeline initialized',
  '<span class="boot-ok">[     OK     ]</span> Network connectivity established',
  '<span class="boot-ok">[     OK     ]</span> htop --sort=cpu',
];
