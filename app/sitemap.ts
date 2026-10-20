import type { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';
import { absoluteUrl, buildLanguageAlternates } from '../lib/seo';

const PAGES = ['', '/about'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PAGES.map((path) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    })),
  );
}
