// components/Hero.tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Buttons } from './ui/Buttons';
import { openCalendlyPopup } from '../lib/calendly';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations('Hero');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heading = root.querySelector("[data-hero='heading']");
      const text = root.querySelector("[data-hero='text']");
      const image = root.querySelector("[data-hero='image']");
      const cta = root.querySelector("[data-hero='cta']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([heading, text, image, cta], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([heading, text, cta], { opacity: 0, y: 20 });
      gsap.set(image, { opacity: 0, scale: 1.05 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(heading, { opacity: 1, y: 0, duration: 0.8 })
        .to(text, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(cta, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to(image, { opacity: 1, scale: 1, duration: 1 }, '-=0.2');
    },
    { scope: rootRef },
  );

  return (
    <section
      id="hero"
      ref={rootRef}
      className="bg-vanilla flex flex-col md:flex-row min-h-dvh"
    >
      {/* Left panel */}
      <div className="w-full md:w-1/2 flex-1 md:flex-none bg-vanilla flex items-center justify-center px-6 pb-12 pt-16 sm:px-10 md:px-20">
        <div className="max-w-md">
          <h1
            data-hero="heading"
            className="font-title text-oatBright text-title font-normal uppercase"
          >
            {t('heading1')}
            <br />
            <em className="italic text-cherry"> {t('headingEmphasis')}</em>
            <br />
            {t('heading2')}
          </h1>
          <p data-hero="text" className="font-body text-noir text-body mt-6">
            {t('text')}
          </p>
          <Buttons
            data-hero="cta"
            variant="cherry"
            className="mt-6"
            onClick={openCalendlyPopup}
          >
            {t('cta')}
          </Buttons>
        </div>
      </div>

      {/* Right panel */}
      <div
        data-hero="image"
        className="w-full md:w-1/2 relative -mb-px flex-1 md:mb-0 md:flex-none min-h-[50vh] md:min-h-screen"
      >
        <Image
          src="/images/hero/hero.jpg"
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
