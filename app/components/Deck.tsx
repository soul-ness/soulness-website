'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Buttons } from './ui/Buttons';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Deck() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations('Deck');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const items = root.querySelectorAll("[data-deck='item']");

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
    <section
      id="deck"
      ref={rootRef}
      className="bg-vanilla pt-0 pb-0 md:pt-24 md:pb-0"
    >
      <div className="mx-auto flex max-w-6xl flex-col">
        {/* Row 1 pl-6 pr-6 same as px-6*/}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
          <div
            data-deck="item"
            className="order-2 md:order-1 relative flex min-h-90 flex-col justify-end overflow-hidden md:min-h-95 md:pl-0 md:pr-6 md:pb-24 px-6 pb-16"
          >
            <Image
              src="/images/logo-s1-black.png"
              alt=" "
              fill
              sizes="(min-width: 768px) 59vw, 100vw"
              className="object-contain object-[center_30%] opacity-3 scale-120 md:scale-100 "
            />
            <div className="relative flex flex-col justify-center gap-6">
              <h2 className="font-title text-cherry text-[21px] uppercase leading-relaxed md:text-[30px] mt-8 md:mt-0">
                {t('heading')}
              </h2>
              <p className="font-body text-beigeDark text-body">
                {t('bodyPart1')}
                <br />
                <br />
                {t('bodyPart2')}
              </p>
              <Buttons
                variant="beigeDark"
                href="https://buy.stripe.com/bJe7sL2dAdUk0nf7qb0x20B"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                {t('cta')}
              </Buttons>
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-2 md:h-120">
            <div data-deck="item" className="relative h-100 w-full md:h-full">
              <Image
                src="/images/card/card3.jpg"
                alt={t('imageHandsAlt')}
                fill
                loading="eager"
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-2 md:h-full">
              <div data-deck="item" className="relative h-70 w-full md:h-full">
                <Image
                  src="/images/card/card2.jpg"
                  alt={t('imageDetailAlt')}
                  fill
                  sizes="(min-width: 768px) 24vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-deck="item" className="relative h-70 w-full md:h-full">
                <Image
                  src="/images/card/card1.jpg"
                  alt={t('imageTableAlt')}
                  fill
                  sizes="(min-width: 768px) 24vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
