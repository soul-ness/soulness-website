'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function AboutAna() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutAna');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const items = root.querySelectorAll("[data-about-ana='item']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 30 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-vanilla pt-0 pb-16 md:px-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-9">
        {/* Row 1 pl-6 pr-6 same as px-6*/}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr_0.6fr] gap-2">
          <div
            data-about-ana="item"
            className="order-2 md:order-1 relative flex min-h-[360px] flex-col justify-center overflow-hidden px-6 md:min-h-[380px] md:pl-0 md:pr-6"
          >
            <Image
              src="/images/logo-s1-black.png"
              alt=" "
              fill
              sizes="(min-width: 768px) 59vw, 100vw"
              className="object-contain opacity-3 scale-130 md:scale-100 "
            />
            <div className="relative flex flex-col justify-center gap-6">
              <h2 className="font-title text-cherry text-[20px] uppercase leading-relaxed md:text-[30px] mt-6 md:mt-0">
                {t('heading1')}
              </h2>
              <p className="font-body text-beigeDark text-body">
                {t('body1Part1')}
                <br /> <br />
                {t('body1Part2')}
              </p>
            </div>
          </div>
          <div
            data-about-ana="item"
            className="order-1 md:order-2 relative h-[400px] md:h-full w-full md:mt-0"
          >
            <Image
              src="/images/about/about-ana1.jpg"
              alt={t('imageSittingAlt')}
              fill
              loading="eager"
              sizes="(min-width: 768px) 41vw, 100vw"
              className="object-cover object-[center_95%]"
            />
          </div>
          <div
            data-about-ana="item"
            className="hidden md:order-3 md:block relative md:h-full w-full md:mt-0"
          >
            <Image
              src="/images/about/drops1.jpg"
              alt={t('imageSittingAlt2')}
              fill
              sizes="(min-width: 768px) 41vw, 100vw"
              className="object-cover object-[center_95%] "
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr]">
          <div data-about-ana="item" className=" relative min-h-[360px] w-full">
            <Image
              src="/images/about/spinal4.jpg"
              alt={t('imageDetailAlt')}
              fill
              loading="eager"
              sizes="(min-width: 768px) 41vw, 100vw"
              className="object-cover object-[center_85%]"
            />
          </div>

          <div
            data-about-ana="item"
            className="flex flex-col justify-center gap-6 px-6 mt-6 md:pl-10 md:pr-0 md:mt-0"
          >
            <h2 className="font-title text-cherry text-[20px] uppercase leading-relaxed md:text-[30px]">
              {t('heading2')}
            </h2>
            <p className="font-body text-beigeDark text-body">
              {t('body2Part1')}
              <br /> <br /> {t('body2Part2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
