export type PerfMode = 'lite' | 'full';

export const PERF_KEY = 'shreejan_perf';

export function getPerfMode(): PerfMode {
  if (typeof window === 'undefined') {
    return 'full';
  }

  try {
    // 1. Stored manual preference always wins
    const stored = window.localStorage.getItem(PERF_KEY);
    if (stored === 'lite' || stored === 'full') {
      return stored;
    }

    // 2. Active DOM state set by pre-paint script
    const datasetPerf = document.documentElement.dataset.perf;
    if (datasetPerf === 'lite' || datasetPerf === 'full') {
      return datasetPerf;
    }

    // 3. Hardware and network heuristics
    const nav = window.navigator as any;
    const isLowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2;
    const isLowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2;
    const isSaveData = nav.connection?.saveData === true;
    const isSlowConnection =
      typeof nav.connection?.effectiveType === 'string' &&
      /slow-2g|2g|3g/.test(nav.connection.effectiveType);

    // 4. Media query user preferences
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const prefersReducedTransparency = window.matchMedia?.('(prefers-reduced-transparency: reduce)')?.matches;
    const prefersReducedData = window.matchMedia?.('(prefers-reduced-data: reduce)')?.matches;

    if (
      isLowMemory ||
      isLowCpu ||
      isSaveData ||
      isSlowConnection ||
      prefersReducedMotion ||
      prefersReducedTransparency ||
      prefersReducedData
    ) {
      return 'lite';
    }
  } catch (err) {
    // Graceful fallback on storage or API restrictions
  }

  return 'full';
}

export function setPerfMode(mode: PerfMode): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PERF_KEY, mode);
    document.documentElement.dataset.perf = mode;
    window.dispatchEvent(new CustomEvent('shreejan_perf_change', { detail: mode }));
  } catch (err) {
    // Fallback if localStorage is inaccessible
    document.documentElement.dataset.perf = mode;
  }
}
