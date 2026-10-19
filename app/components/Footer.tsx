import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');

  return (
    <footer className="bg-noir py-10 px-6 md:py-14 md:px-30">
      {/* 1st row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_.5fr_.5fr]">
        {/* Column 1: logo + phrase */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="relative block h-10 w-32">
            <Image
              src="/images/logo-white1.png"
              alt="Soulness"
              fill
              sizes="128px"
              className="object-contain"
            />
          </Link>
          <p className="font-body text-vanilla/70 text-body max-w-xl">
            {t('taglinePart1')}
            <br />
            {t('taglinePart2')}
          </p>
        </div>

        {/* Column 2: Navigate + links */}
        <div className="flex flex-col gap-4">
          <p className="text-label text-[14px] text-white">{t('navigate')}</p>
          <ul className="text-label flex flex-col gap-2 text-vanilla/70">
            <li>
              <Link href="/#offerings">{tNav('offerings')}</Link>
            </li>
            <li>
              <Link href="/about">{tNav('aboutAna')}</Link>
            </li>
            <li>
              <Link href="/#experiences">{tNav('experiences')}</Link>
            </li>
            <li>
              <Link href="/#reviews">{tNav('reviews')}</Link>
            </li>
            <li>
              <Link href="/about#contact">{tNav('contact')}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact me + icons */}
        <div className="flex flex-col gap-4">
          <p className="text-label text-[14px] text-white">{t('contactMe')}</p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/soulness.us"
              target="_blank"
              rel="noreferrer"
              aria-label={t('instagramLabel')}
            >
              <svg
                className="h-5 w-5 text-vanilla"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a href="mailto:ana@soul-ness.com" aria-label={t('emailLabel')}>
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-vanilla/40 md:flex-row md:items-center md:justify-between">
        <p className="text-label">{t('copyright')}</p>
        <p className="text-label">
          {t('credit')}{' '}
          <a
            href="https://www.andreamg.dev/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-vanilla"
          >
            Andrea
          </a>
        </p>
      </div>
    </footer>
  );
}
