export const BRAND_TOKENS = {
  light: {
    bg: "#F8FAFC",
    bgAlt: "#F1F5F9",
    text: "#0F172A",
    textMuted: "#475569",
    gold: "#7C5CFC",
    goldBright: "#9E84FF",
    divider: "rgba(0, 0, 0, 0.08)",
    watermark: "#E2E8F0",
    watermarkOpacity: 0.1,
    border: "rgba(124, 92, 252, 0.15)",
    surface: "rgba(255, 255, 255, 0.8)",
  },
  dark: {
    bg: "#090C15",
    bgAlt: "#0E121E",
    text: "#F4F7FB",
    textMuted: "#8E95A5",
    gold: "#7C5CFC",
    goldBright: "#9E84FF",
    divider: "rgba(255, 255, 255, 0.08)",
    watermark: "#161922",
    watermarkOpacity: 0.14,
    border: "rgba(124, 92, 252, 0.25)",
    surface: "rgba(18, 21, 27, 0.85)",
  },
} as const;

export type Theme = "light" | "dark";

export const CINEMA_TOKENS = {
  light: {
    bg: "var(--cinema-bg)",
    surface: "var(--cinema-surface)",
    border: "var(--cinema-border)",
    ink: "var(--cinema-ink)",
    inkMuted: "var(--cinema-ink-muted)",
    accent: "var(--cinema-accent)",
    letterbox: "var(--cinema-letterbox)",
  },
  dark: {
    bg: "var(--cinema-bg)",
    surface: "var(--cinema-surface)",
    border: "var(--cinema-border)",
    ink: "var(--cinema-ink)",
    inkMuted: "var(--cinema-ink-muted)",
    accent: "var(--cinema-accent)",
    letterbox: "var(--cinema-letterbox)",
  },
} as const;

