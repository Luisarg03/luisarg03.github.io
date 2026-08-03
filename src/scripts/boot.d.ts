// Type declarations for the shared boot engine (src/scripts/boot.js).
// Contract: window.initBootSequence(containerEl, options)
export {};

declare global {
  interface Window {
    LUIS_BOOT_FRAMES: string[];
    // Present once src/scripts/boot.js has loaded (side-effect import).
    initBootSequence?: (
      containerEl: HTMLElement | null,
      options?: {
        frames?: string[];
        frameDelay?: number;
        onComplete?: () => void;
      }
    ) => { skip: () => void } | null | undefined;
  }
}
