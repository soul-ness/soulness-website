'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

export default function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutHero');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heading = root.querySelector("[data-about-hero='heading']");
      const image = root.querySelector("[data-about-hero='image']");
      const text = root.querySelector("[data-about-hero='text']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([heading, image, text], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([heading, text], { opacity: 0, y: 20 });
      gsap.set(image, { opacity: 0, scale: 1.05 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(heading, { opacity: 1, y: 0, duration: 0.8 })
        .to(image, { opacity: 1, scale: 1, duration: 1 }, '-=0.4')
        .to(text, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="bg-oat flex flex-col items-center px-6 pt-16 pb-12 text-center md:py-15"
    >
      <h1
        data-about-hero="heading"
        className="font-title text-noir text-title uppercase"
      >
        {t('heading')}
      </h1>

      <div
        data-about-hero="image"
        className="relative mt-10 aspect-[3/4] w-full max-w-xs md:max-w-sm"
      >
        <Image
          src="/images/about/about.jpg"
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 768px) 384px, 320px"
          className="object-cover"
          priority
        />
      </div>

      <p
        data-about-hero="text"
        className="font-title text-noir mt-10 max-w-3xl text-[20px] uppercase leading-relaxed md:text-[30px]"
      >
        {t('text')}
      </p>
    </section>
  );
}
