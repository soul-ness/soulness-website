// components/Services.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ServiceCard from './ui/ServiceCard';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  image: string;
  link: string;
  strTarget?: string;
  strRel?: string;
}

const SERVICES: Service[] = [
  { id: 'individual', image: '/images/services/s1.jpg', link: '#cta' },
  { id: 'group', image: '/images/services/spinal0.jpg', link: '#experiences' },
  { id: 'journey', image: '/images/services/cards.jpg', link: '#deck' },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations('Services');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const eyebrow = root.querySelector("[data-services='eyebrow']");
      const title = root.querySelector("[data-services='title']");
      const body = root.querySelector("[data-services='body']");
      const cards = root.querySelectorAll("[data-services='card']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([eyebrow, title, body, ...cards], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set([eyebrow, title, body], { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 30, scale: 1.03 });

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
          },
        })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.6 })
        .to(title, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .to(body, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(
          cards,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15 },
          '-=0.3',
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="offerings"
      ref={rootRef}
      className="bg-noir py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p data-services="eyebrow" className="text-eyebrow text-vanilla">
          {t('eyebrow')}
        </p>
        <h1
          data-services="title"
          className="font-title text-white text-title uppercase font-normal mt-6"
        >
          {t('title')}
        </h1>
        <p
          data-services="body"
          className="font-body text-beige text-body mt-6 max-w-xl mx-auto"
        >
          {t('body')}
        </p>
      </div>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            label={t(`${service.id}.label`)}
            image={service.image}
            description={t(`${service.id}.description`)}
            link={service.link}
            strTarget={service.strTarget}
            strRel={service.strRel}
            ctaLabel={t(`${service.id}.ctaLabel`)}
          />
        ))}
      </div>
    </section>
  );
}
