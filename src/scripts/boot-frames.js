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
  '[    2.100000] Mounting virtual filesystems...',
  '<span class="boot-ok">[     OK     ]</span> Mounted /proc/sysrq-trigger',
  '<span class="boot-ok">[     OK     ]</span> Mounted /dev/pts',
  '[    2.350000] Loading identity module...',
  '<span class="boot-ok">[     OK     ]</span> Identity module loaded',
  '[    2.600000] Loading skills index...',
  '<span class="boot-ok">[     OK     ]</span> Skills index ready',
  '[    2.850000] Initializing experience timeline...',
  '<span class="boot-ok">[     OK     ]</span> Experience timeline initialized',
  '[    3.100000] Starting network interfaces...',
  '<span class="boot-ok">[     OK     ]</span> Network connectivity established',
  '[    3.350000] Starting htop...',
  '<span class="boot-ok">[     OK     ]</span> htop --sort=cpu',
];
