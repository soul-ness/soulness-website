'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = ['spinal', 'sound', 'theta', 'homeopathy'];

export default function AboutCert() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('AboutCert');

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const eyebrow = root.querySelector("[data-about-cert='eyebrow']");
      const title = root.querySelector("[data-about-cert='title']");
      const body = root.querySelector("[data-about-cert='body']");
      const certs = root.querySelectorAll("[data-about-cert^='cert']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([eyebrow, title, body, ...certs], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([eyebrow, title, body], { opacity: 0, y: 20 });
      gsap.set(certs, { opacity: 0, y: 30, scale: 1.03 });

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%' },
        })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.6 })
        .to(title, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .to(body, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(
          certs,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15 },
          '<',
        );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-noir py-16 md:py-24 px-6 md:px-16">
      {/* Eyebrow title subtitle */}
      <div className="max-w-3xl mx-auto text-center">
        <p data-about-cert="eyebrow" className="text-eyebrow text-vanilla">
          {t('eyebrow')}
        </p>
        <h1
          data-about-cert="title"
          className="font-title text-white text-title uppercase font-normal mt-6"
        >
          {t('title')}
        </h1>
        <p
          data-about-cert="body"
          className="font-body text-beige text-body mt-6 max-w-xl mx-auto"
        >
          {t('body')}
        </p>
      </div>
      {/* Mobile carousel */}
      <div className="mt-14 md:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CERTIFICATIONS.map((certId) => (
            <div key={certId} className="w-full shrink-0 snap-start px-1">
              <div
                data-about-cert="cert-mobile"
                className="flex aspect-square flex-col items-center justify-center gap-2 bg-vanilla px-4 text-center"
              >
                <p className="font-title text-cherry text-[22px] uppercase">
                  {t(`${certId}.title`)}
                </p>
                <p className="font-body text-beigeDark text-body">
                  {t(`${certId}.subtitle`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {CERTIFICATIONS.map((certId, index) => (
            <button
              key={certId}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={t('goToCert', { number: index + 1 })}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-vanilla' : 'bg-vanilla/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="mx-auto mt-14 hidden max-w-5xl grid-cols-4 gap-6 md:mt-20 md:grid">
        {CERTIFICATIONS.map((certId) => (
          <div
            key={certId}
            data-about-cert="cert-desktop"
            className="flex aspect-square flex-col items-center justify-center gap-2 bg-vanilla px-4 text-center"
          >
            <p className="font-title text-cherry text-[16px] uppercase">
              {t(`${certId}.title`)}
            </p>
            <p className="font-body text-beigeDark text-body text-[12px] ">
              {t(`${certId}.subtitle`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
