'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Nav() {
  const t = useTranslations('Nav');

  const [isOpen, setIsOpen] = useState(false);
  //to track the scroll position in order to make ir disappear and appear once scrolling down
  const [hasScrolled, setHasScrolled] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === 'en' ? 'es' : 'en';

  const serviceItems = [
    { label: t('offerings'), href: '/#offerings' },
    { label: t('aboutAna'), href: '/about' },
    { label: t('experiences'), href: '/#experiences' },
    { label: t('reviews'), href: '/#reviews' },
    { label: t('contact'), href: '/about#contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  //open
  useEffect(() => {
    const handleWindowScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <>
      <nav
        className={`px-6 py-4 md:px-30 md:py-6 fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-vanilla transition-transform duration-300 ${
          hasScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/" className="relative block h-8 w-32">
          <Image
            src="/images/logofinal1.png"
            alt="Logo"
            fill
            sizes="128px"
            className="object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {serviceItems.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-cherry transition-colors text-[12px] tracking-[0.15em] uppercase hover:text-beigeDark"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={pathname}
              locale={otherLocale}
              className="font-body text-cherry transition-colors text-[12px] tracking-[0.15em] uppercase hover:text-beigeDark"
            >
              {otherLocale}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="relative z-50 flex h-6 w-8 cursor-pointer flex-col justify-between md:hidden"
        >
          {/*when isOpen translate it and the middle one fade it*/}
          <span
            className={`h-0.5 w-full bg-cherry transition-transform duration-300 ${isOpen ? 'translate-y-[11px] rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-full bg-cherry transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-full bg-cherry transition-transform duration-300 ${isOpen ? '-translate-y-[11px] -rotate-45' : ''}`}
          />
        </button>
      </nav>
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-vanilla transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {serviceItems.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-title text-cherry text-[24px] uppercase"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={pathname}
          locale={otherLocale}
          onClick={() => setIsOpen(false)}
          className="text-label text-cherry mt-12"
        >
          {t('switchLabel')}
        </Link>
      </div>
    </>
  );
}
