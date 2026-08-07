/*
 * ========================================
 * TRANSITIONS SYSTEM
 * ========================================
 */

export const transitions = {
  // ===== Durations =====
  duration: {
    instant: "0ms",
    fastest: "50ms",
    faster: "100ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "400ms",
    slowest: "500ms",
  },

  // ===== Easing Functions =====
  easing: {
    linear: "linear",
    ease: "ease",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out",
    inQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    outQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    inOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    inCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    outCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    inOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    inQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    outQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    inOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
    inQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    outQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    inOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
    inExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    outExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
    inOutExpo: "cubic-bezier(1, 0, 0, 1)",
    inBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    outBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    inOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // ===== Preset Transitions =====
  preset: {
    // Fade
    fade: "opacity 0.3s ease",
    fadeFast: "opacity 0.15s ease",
    fadeSlow: "opacity 0.5s ease",

    // Transform
    transform: "transform 0.3s ease",
    transformFast: "transform 0.15s ease",
    transformSlow: "transform 0.5s ease",

    // All Properties
    all: "all 0.3s ease",
    allFast: "all 0.15s ease",
    allSlow: "all 0.5s ease",

    // Specific
    color: "color 0.3s ease",
    background: "background 0.3s ease",
    border: "border 0.3s ease",
    shadow: "box-shadow 0.3s ease",
    width: "width 0.3s ease",
    height: "height 0.3s ease",
    spacing: "margin 0.3s ease, padding 0.3s ease",
  },
} as const;

export type TransitionKey = keyof typeof transitions;
export type DurationKey = keyof typeof transitions.duration;
export type EasingKey = keyof typeof transitions.easing;
export type PresetKey = keyof typeof transitions.preset;
