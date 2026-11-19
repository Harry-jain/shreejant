"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { LanguageCode, LANGUAGES, DEFAULT_LANG, isValidLang } from './languages';
import { updateSeo } from './seo';

import en from './locales/en.json';

// In-memory translation storage. English is bundled by default.
// Hindi and Marathi are dynamically imported when requested.
const translations: Record<LanguageCode, Record<string, any>> = {
  en,
  hi: {},
  mr: {},
};

const loadedLocales = new Set<LanguageCode>(['en']);
const pendingLoads: Partial<Record<LanguageCode, Promise<void>>> = {};

export async function loadLocale(lang: LanguageCode): Promise<void> {
  if (lang === 'en' || loadedLocales.has(lang)) {
    return;
  }
  const pending = pendingLoads[lang];
  if (pending) {
    return pending;
  }

  pendingLoads[lang] = (async () => {
    try {
      if (lang === 'hi') {
        const mod = await import('./locales/hi.json');
        translations.hi = (mod.default || mod) as Record<string, any>;
        loadedLocales.add('hi');
      } else if (lang === 'mr') {
        const mod = await import('./locales/mr.json');
        translations.mr = (mod.default || mod) as Record<string, any>;
        loadedLocales.add('mr');
      }
    } catch (err) {
      console.error(`[i18n] Failed to load locale "${lang}":`, err);
    } finally {
      delete pendingLoads[lang];
    }
  })();

  return pendingLoads[lang];
}

// Global in-memory state
let currentLang: LanguageCode = DEFAULT_LANG;
const subscribers = new Set<(lang: LanguageCode) => void>();
const warnedMissingKeys = new Set<string>();

export function getLang(): LanguageCode {
  if (typeof window === 'undefined') {
    return DEFAULT_LANG;
  }

  // 1. ?lang= URL parameter
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang && isValidLang(paramLang)) {
      return paramLang;
    }
  } catch (e) {
    // Ignore URL parsing errors
  }

  // 2. localStorage "shreejan_lang"
  try {
    const stored = window.localStorage.getItem('shreejan_lang');
    if (stored && isValidLang(stored)) {
      return stored;
    }
  } catch (e) {
    // localStorage may be blocked in private mode
  }

  // 3. navigator.language starting with hi or mr
  try {
    const navLang = (window.navigator.language || '').toLowerCase();
    if (navLang.startsWith('hi')) return 'hi';
    if (navLang.startsWith('mr')) return 'mr';
  } catch (e) {
    // Ignore navigator errors
  }

  // 4. Default fallback
  return DEFAULT_LANG;
}

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export function hasTranslationKey(key: string, langOverride?: LanguageCode): boolean {
  const lang = langOverride || currentLang;
  return getNestedValue(translations[lang], key) !== undefined || getNestedValue(translations.en, key) !== undefined;
}

export function t(key: string, vars?: Record<string, string | number>, langOverride?: LanguageCode): string {
  const lang = langOverride || currentLang;
  let text = getNestedValue(translations[lang], key);

  if (text === undefined && lang !== 'en') {
    text = getNestedValue(translations.en, key);
  }

  if (text === undefined) {
    if (process.env.NODE_ENV !== 'production' && !warnedMissingKeys.has(key) && !key.match(/\.f\d+$/)) {
      warnedMissingKeys.add(key);
      console.warn(`[i18n] Missing translation key: "${key}" (lang: ${lang})`);
    }
    return key;
  }

  if (vars) {
    return text.replace(/\{(\w+)\}/g, (_, k) => {
      return k in vars ? String(vars[k]) : `{${k}}`;
    });
  }

  return text;
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-IN-u-nu-latn', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function subscribe(callback: (lang: LanguageCode) => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function applyTranslations(): void {
  if (typeof document === 'undefined') return;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && 'placeholder' in el) {
      (el as HTMLInputElement).placeholder = t(key);
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', t(key));
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });
}

export function setLang(code: LanguageCode): void {
  if (!isValidLang(code)) return;
  currentLang = code;

  // 1. Try to save to localStorage
  try {
    window.localStorage.setItem('shreejan_lang', code);
  } catch (e) {
    // Safely ignore if localStorage is blocked
  }

  // 2. Set documentElement.lang
  if (typeof document !== 'undefined') {
    document.documentElement.lang = code;
  }

  // 3. Update URL without reloading the page
  if (typeof window !== 'undefined') {
    try {
      const url = new URL(window.location.href);
      if (code === DEFAULT_LANG) {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', code);
      }
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {
      // Ignore history API errors
    }

    // 4. Update SEO tags
    updateSeo(code);
  }

  // 5. If non-English, load dynamic chunk then update DOM & subscribers
  if (code !== 'en' && !loadedLocales.has(code)) {
    loadLocale(code).then(() => {
      applyTranslations();
      subscribers.forEach((cb) => {
        try {
          cb(code);
        } catch (err) {
          console.error('[i18n] subscriber error:', err);
        }
      });
    });
  } else {
    applyTranslations();
    subscribers.forEach((cb) => {
      try {
        cb(code);
      } catch (err) {
        console.error('[i18n] subscriber error:', err);
      }
    });
  }
}

export interface LanguageContextType {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatPrice: (n: number) => string;
  hasKey: (key: string) => boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key: string, vars?: Record<string, string | number>) => t(key, vars),
  formatPrice: (n: number) => formatPrice(n),
  hasKey: (key: string) => hasTranslationKey(key),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(DEFAULT_LANG);
  const [, setVersion] = useState(0);

  useEffect(() => {
    const initialLang = getLang();
    currentLang = initialLang;
    setLangState(initialLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = initialLang;
    }
    updateSeo(initialLang);
    applyTranslations();

    if (initialLang !== 'en') {
      loadLocale(initialLang).then(() => {
        setVersion((v) => v + 1);
        applyTranslations();
      });
    }

    const unsubscribe = subscribe((newLang) => {
      setLangState(newLang);
      setVersion((v) => v + 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const changeLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    setLang(code);
  }, []);

  const translate = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      return t(key, vars, lang);
    },
    [lang]
  );

  const hasKey = useCallback(
    (key: string) => {
      return hasTranslationKey(key, lang);
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang: changeLang,
      t: translate,
      formatPrice,
      hasKey,
    }),
    [lang, changeLang, translate, hasKey]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}

export function useT() {
  const context = useContext(LanguageContext);
  return context;
}

export * from './languages';
export * from './seo';
