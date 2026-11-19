import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--color-bg)",
          "bg-alt": "var(--color-bg-alt)",
          text: "var(--color-text)",
          muted: "var(--color-text-muted)",
          gold: "var(--color-gold)",
          "gold-bright": "var(--color-gold-bright)",
          "gold-dark": "var(--color-gold-dark)",
          divider: "var(--color-divider)",
          border: "var(--color-border)",
          surface: "var(--color-surface)",
          watermark: "var(--color-watermark)",
          violet: "var(--color-brand)",
        },
        ghost: "var(--ghost)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        panel: "var(--color-panel)",
        violet: {
          DEFAULT: "#7C5CFC",
          soft: "#8B6DFF",
          whisper: "#F5F3FF",
          deep: "#5B3FD4",
          pale: "#C4B5FD",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-cal-sans)", "Cal Sans", "sans-serif"],
        display: ["var(--font-cal-sans)", "Cal Sans", "sans-serif"],
        body: ["var(--font-body)", "var(--font-dm-sans)", "DM Sans", "sans-serif"],
        tech: ["var(--font-tech)", "var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "22px",
      },
      maxWidth: {
        "8xl": "1536px",
        "9xl": "1600px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGold: {
          "0%, 100%": { borderColor: "var(--color-gold)", boxShadow: "0 0 15px rgba(201, 168, 76, 0.4)" },
          "50%": { borderColor: "var(--color-gold-bright)", boxShadow: "0 0 25px rgba(255, 184, 48, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
