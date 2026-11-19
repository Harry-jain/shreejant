import { LanguageCode, LANGUAGES, DEFAULT_LANG } from './languages';

export function updateSeo(lang: LanguageCode) {
  if (typeof document === 'undefined') return;

  // 1. Set <html lang="...">
  document.documentElement.lang = lang;

  // 2. Map locale codes
  const localeMap: Record<LanguageCode, string> = {
    en: 'en_IN',
    hi: 'hi_IN',
    mr: 'mr_IN',
  };

  // 3. Update or create og:locale
  let ogLocale = document.querySelector('meta[property="og:locale"]');
  if (!ogLocale) {
    ogLocale = document.createElement('meta');
    ogLocale.setAttribute('property', 'og:locale');
    document.head.appendChild(ogLocale);
  }
  ogLocale.setAttribute('content', localeMap[lang] || 'en_IN');

  // 4. Update hreflang link tags
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://shreejanai.in').replace(/\/+$/, '');
  const pathname = window.location.pathname;

  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  LANGUAGES.forEach((l) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', l.code);
    const href = l.code === DEFAULT_LANG 
      ? `${siteUrl}${pathname}`
      : `${siteUrl}${pathname}?lang=${l.code}`;
    link.setAttribute('href', href);
    document.head.appendChild(link);
  });

  // x-default hreflang pointing to default language
  const xDefault = document.createElement('link');
  xDefault.setAttribute('rel', 'alternate');
  xDefault.setAttribute('hreflang', 'x-default');
  xDefault.setAttribute('href', `${siteUrl}${pathname}`);
  document.head.appendChild(xDefault);

  // 5. Update or inject JSON-LD for ProfessionalService
  let script = document.getElementById('shreejan-jsonld-i18n') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'shreejan-jsonld-i18n';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SHREEJAN AI SOLUTIONS',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  };
  script.textContent = JSON.stringify(jsonLd);
}
