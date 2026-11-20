export type WorldId =
  | "quiet-authority"
  | "mumbai-momentum"
  | "future-interface"
  | "playful-intelligence"
  | "editorial-precision"
  | "secret-world";

export interface WorldConfig {
  id: WorldId;
  index: string; // "01/06"
  name: string;
  tagline: string;
  energyLabel: "Calm" | "Energetic" | "Tactical" | "Playful" | "Stark" | "Experimental";
  colors: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentSecondary?: string;
  };
  transitionColors: [string, string, string]; // 3 layered wipe colors
  fontClass: {
    display: string;
    body: string;
    mono: string;
  };
  cardStyle: string;
  buttonVariant: "matte" | "poster" | "terminal" | "pill" | "stark" | "cyber";
  cursorType: "minimal" | "crosshair" | "ring" | "dot" | "editorial";
  whyThisWorld: {
    layout: string;
    typography: string;
    motion: string;
    emotionalResponse: string;
    communicationGoal: string;
  };
}

export const WORLDS: Record<WorldId, WorldConfig> = {
  "quiet-authority": {
    id: "quiet-authority",
    index: "01/06",
    name: "Quiet Authority",
    tagline: "Restrained, highly legible, precise hierarchy, premium and trustworthy.",
    energyLabel: "Calm",
    colors: {
      bg: "#F5F2EA",
      surface: "#FFFFFF",
      text: "#181818",
      muted: "#68665F",
      border: "rgba(24, 24, 24, 0.16)",
      accent: "#F05D35",
      accentSecondary: "#EBE6DA",
    },
    transitionColors: ["#EBE6DA", "#F05D35", "#F5F2EA"],
    fontClass: {
      display: "font-display",
      body: "font-sans",
      mono: "font-mono",
    },
    cardStyle: "rounded-2xl border border-border bg-surface shadow-sm",
    buttonVariant: "matte",
    cursorType: "dot",
    whyThisWorld: {
      layout: "Generous whitespace, asymmetric columns inspired by Swiss editorial tradition.",
      typography: "Space Grotesk headline balanced with high-contrast Inter body text.",
      motion: "Deliberate, slow easing with undulating organic dot canvas.",
      emotionalResponse: "Confidence, calm capability, institutional credibility without arrogance.",
      communicationGoal: "Demonstrates that Shreejan is an engineering studio of serious technical depth.",
    },
  },
  "mumbai-momentum": {
    id: "mumbai-momentum",
    index: "02/06",
    name: "Mumbai Momentum",
    tagline: "Energetic, local, fast-moving, high-contrast, poster-like clarity.",
    energyLabel: "Energetic",
    colors: {
      bg: "#FFFDF5",
      surface: "#FFFFFF",
      text: "#0D0D0D",
      muted: "#57534E",
      border: "rgba(13, 13, 13, 0.22)",
      accent: "#FF5500", // Vibrant Bombay Marigold / Electric Orange
      accentSecondary: "#FFDE59", // Yellow taxi highlight
    },
    transitionColors: ["#FFDE59", "#FF5500", "#FFFDF5"],
    fontClass: {
      display: "font-display font-black uppercase tracking-tight",
      body: "font-sans font-medium",
      mono: "font-mono font-bold",
    },
    cardStyle: "rounded-xl border-2 border-text bg-surface shadow-[4px_4px_0px_0px_#0D0D0D]",
    buttonVariant: "poster",
    cursorType: "minimal",
    whyThisWorld: {
      layout: "Dense, pragmatic, bold section stamps inspired by vintage Mumbai trade posters.",
      typography: "Punchy, capitalized headlines that demand immediate attention.",
      motion: "Snappy, instantaneous transitions with bold physical offsets.",
      emotionalResponse: "Urgency, practical hustle, direct no-nonsense partnership.",
      communicationGoal: "Proves we understand Indian business velocity and deliver without delays.",
    },
  },
  "future-interface": {
    id: "future-interface",
    index: "03/06",
    name: "Future Interface",
    tagline: "Tactical dark console, data-rich telemetry, structured engineering grid.",
    energyLabel: "Tactical",
    colors: {
      bg: "#0A0D0E",
      surface: "#121719",
      text: "#E5EDEE",
      muted: "#7B8E91",
      border: "rgba(79, 214, 180, 0.22)",
      accent: "#00F5A0", // Phosphor cyber teal
      accentSecondary: "#00B4D8",
    },
    transitionColors: ["#121719", "#00F5A0", "#0A0D0E"],
    fontClass: {
      display: "font-mono font-bold tracking-tight uppercase",
      body: "font-mono",
      mono: "font-mono",
    },
    cardStyle: "rounded-none border border-border bg-surface/90 shadow-[0_0_15px_rgba(0,245,160,0.06)]",
    buttonVariant: "terminal",
    cursorType: "crosshair",
    whyThisWorld: {
      layout: "Structured matrix grids, coordinate badges, telemetry panels.",
      typography: "Full monospace and technical character scales.",
      motion: "Precision-timed digital sweeps, scanlines, and telemetry pulses.",
      emotionalResponse: "Sophisticated engineering competence, advanced computing feel.",
      communicationGoal: "Highlights our low-latency backend, database systems, and AI infrastructure.",
    },
  },
  "playful-intelligence": {
    id: "playful-intelligence",
    index: "04/06",
    name: "Playful Intelligence",
    tagline: "Friendly, tactile, bouncy curves, smart humor balanced with precision.",
    energyLabel: "Playful",
    colors: {
      bg: "#FAF6F0",
      surface: "#FFFFFF",
      text: "#1F1D1A",
      muted: "#736E65",
      border: "rgba(31, 29, 26, 0.14)",
      accent: "#FF4A22",
      accentSecondary: "#C9E265", // Lime pill
    },
    transitionColors: ["#C9E265", "#FF4A22", "#FAF6F0"],
    fontClass: {
      display: "font-display font-bold",
      body: "font-sans",
      mono: "font-mono",
    },
    cardStyle: "rounded-3xl border-2 border-border bg-surface shadow-sm",
    buttonVariant: "pill",
    cursorType: "ring",
    whyThisWorld: {
      layout: "Soft squircle pill containers, playful badge tags, sticker-like compositions.",
      typography: "Curved friendly headings that make high technology approachable.",
      motion: "Spring-like organic bounciness and tactile click depths.",
      emotionalResponse: "Warmth, curiosity, delightful exploration without corporate stuffiness.",
      communicationGoal: "Shows that software can be deeply joyful to use while performing impeccably.",
    },
  },
  "editorial-precision": {
    id: "editorial-precision",
    index: "05/06",
    name: "Editorial Precision",
    tagline: "Stark Swiss grid, oversized serif/grotesque contrasts, high cultural confidence.",
    energyLabel: "Stark",
    colors: {
      bg: "#FFFFFF",
      surface: "#F8F8F8",
      text: "#000000",
      muted: "#666666",
      border: "rgba(0, 0, 0, 0.15)",
      accent: "#E63946", // Sharp crimson
      accentSecondary: "#111111",
    },
    transitionColors: ["#000000", "#E63946", "#FFFFFF"],
    fontClass: {
      display: "font-display font-extrabold tracking-tighter",
      body: "font-sans leading-relaxed",
      mono: "font-mono",
    },
    cardStyle: "rounded-none border-t border-b border-text/20 bg-surface",
    buttonVariant: "stark",
    cursorType: "editorial",
    whyThisWorld: {
      layout: "Extreme typographic scale ratios, strict 1px hairline rules, zero rounded corners.",
      typography: "Large format art-direction with dramatic weight contrasts.",
      motion: "Sharp, instantaneous cuts and razor-clean reveals.",
      emotionalResponse: "High-end design authority, architectural taste, luxury agency status.",
      communicationGoal: "Targets high-growth brands who prize immaculate aesthetic taste.",
    },
  },
  "secret-world": {
    id: "secret-world",
    index: "06/06",
    name: "The Deep Lab",
    tagline: "Unlocked creative realm. Raw matrix coordinates and reactive digital physics.",
    energyLabel: "Experimental",
    colors: {
      bg: "#050508",
      surface: "#0D0E15",
      text: "#00FF66", // Phosphor green
      muted: "#5B7563",
      border: "rgba(0, 255, 102, 0.25)",
      accent: "#FF0077", // Neon magenta
      accentSecondary: "#00FF66",
    },
    transitionColors: ["#0D0E15", "#FF0077", "#050508"],
    fontClass: {
      display: "font-mono font-black tracking-widest uppercase",
      body: "font-mono",
      mono: "font-mono",
    },
    cardStyle: "rounded-lg border border-accent/40 bg-surface/90 shadow-[0_0_20px_rgba(255,0,119,0.15)]",
    buttonVariant: "cyber",
    cursorType: "crosshair",
    whyThisWorld: {
      layout: "Unlocked matrix shell exposing internal studio logs and experimental sandbox nodes.",
      typography: "Raw CRT phosphor mono display.",
      motion: "Hyperspeed warp wiping and particle field reactivity.",
      emotionalResponse: "Thrilling insider discovery, hacker-craft excitement.",
      communicationGoal: "Demonstrates that the team can build anything at the bleeding edge.",
    },
  },
};
