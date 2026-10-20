import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Cta from '../components/Cta';
import Experiences from '../components/Experiences';
import Deck from '../components/Deck';
import { absoluteUrl, buildLanguageAlternates, ogLocale } from '../../lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: absoluteUrl(locale),
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: absoluteUrl(locale),
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

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Experiences />
      <Deck />
      <Cta />
      <Reviews />
    </main>
  );
}
