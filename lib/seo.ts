import { routing } from '../i18n/routing';

// TODO: switch back to 'https://www.soul-ness.com' once the domain is connected
export const SITE_URL = 'https://soulness-website.vercel.app';

function localePrefix(locale: string) {
  return locale === routing.defaultLocale ? '' : `/${locale}`;
}

export function absoluteUrl(locale: string, pathname = '') {
  return `${SITE_URL}${localePrefix(locale)}${pathname}`;
}

const OG_LOCALES: Record<string, string> = {
  en: 'en_AU',
  es: 'es_419',
};

export function ogLocale(locale: string) {
  return OG_LOCALES[locale] ?? locale;
}

export function buildLanguageAlternates(pathname = '') {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, pathname);
  }
  languages['x-default'] = absoluteUrl(routing.defaultLocale, pathname);
  return languages;
}
