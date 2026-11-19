"use client";

import type { Theme } from "@/lib/tokens";

export function useTheme() {
  // Pure light mode agency experience
  const theme: Theme = "light";
  const mounted = true;
  const toggleTheme = () => {};

  return { theme, toggleTheme, mounted };
}
