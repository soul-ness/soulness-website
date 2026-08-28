// components/Services.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ServiceCard from './ui/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  label: string;
  image: string;
  description: string;
  link: string;
  strTarget?: string;
  strRel?: string;
  ctaLabel: string;
}

const SERVICES: Service[] = [
  {
    label: 'Individual Sessions',
    image: '/images/services/s1.jpg',
    description:
      'Personalized energy and nervous system sessions combining Spinal Energetics, Sound Healing, and subconscious work. Perfect for moments of transition when you need clarity, balance, and deeper reconnection with yourself.',
    link: '#cta',
    ctaLabel: 'Initial Appointment',
  },
  {
    label: 'Group Experiences',
    image: '/images/services/spinal0.jpg',
    description:
      'Sharing circles, sound healing sessions and group Spinal Energetics, a journey to calm your system, release tension, and restore inner harmony in a shared community space.',
    link: '#experiences',
    ctaLabel: 'Book now',
  },
  {
    label: 'A Journey Within',
    image: '/images/services/cards.jpg',
    description:
      'A 33-card deck to realign your energy and reconnect with your intuition. Instead of rushing into your day, take a brief pause that brings clarity, resets your energy, and centers you in self-connection. Space to breathe, even on the busiest days.',
    link: '#cta',
    ctaLabel: 'Contact me to get Yours!',
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

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
          ways we can work together
        </p>
        <h1
          data-services="title"
          className="font-title text-white text-title uppercase font-normal mt-6"
        >
          Guiding you back to yourself
        </h1>
        <p
          data-services="body"
          className="font-body text-beige text-body mt-6 max-w-xl mx-auto"
        >
          I support people through new beginnings, endings, and all the
          in-between moments that shape who we become. Through nervous system
          healing, energetic alignment, and somatic awareness, I help you
          reconnect with your body’s wisdom, so you feel grounded, clear, and
          fully alive.When your energy is aligned, life naturally flows.
        </p>
      </div>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.label}
            label={service.label}
            image={service.image}
            description={service.description}
            link={service.link}
            strTarget={service.strTarget}
            strRel={service.strRel}
            ctaLabel={service.ctaLabel}
          />
        ))}
      </div>
    </section>
  );
}
