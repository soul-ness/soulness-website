import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutHero from '../../components/about/AboutHero';
import AboutAna from '../../components/about/AboutAna';
import AboutCert from '../../components/about/AboutCert';
import Contact from '../../components/about/Contact';
import {
  absoluteUrl,
  buildLanguageAlternates,
  ogLocale,
} from '../../../lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.about' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: absoluteUrl(locale, '/about'),
      languages: buildLanguageAlternates('/about'),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: absoluteUrl(locale, '/about'),
      locale: ogLocale(locale),
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutAna />
      <AboutCert />
      <Contact />
    </main>
  );
}
