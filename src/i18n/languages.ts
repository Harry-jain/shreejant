export type LanguageCode = 'en' | 'hi' | 'mr';

export interface Language {
  code: LanguageCode;
  label: string;
  short: string;
  htmlLang: string;
  locale: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en', locale: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं', htmlLang: 'hi', locale: 'hi-IN' },
  { code: 'mr', label: 'मराठी', short: 'मरा', htmlLang: 'mr', locale: 'mr-IN' },
];

export const DEFAULT_LANG: LanguageCode = 'en';

export function isValidLang(code: string): code is LanguageCode {
  return LANGUAGES.some((l) => l.code === code);
}
