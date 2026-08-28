'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Buttons } from './ui/Buttons';
import { openCalendlyPopup } from '../lib/calendly';

export default function Cta() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heading = root.querySelector("[data-cta='heading']");
      const text = root.querySelector("[data-cta='text']");
      const cta = root.querySelector("[data-cta='cta']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([heading, text, cta], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([heading, text, cta], { opacity: 0, y: 20 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(heading, { opacity: 1, y: 0, duration: 0.8 })
        .to(text, { opacity: 1, y: 0, duration: 0.8 })
        .to(cta, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    },
    { scope: rootRef },
  );

  return (
    <section
      id="cta"
      ref={rootRef}
      className="bg-oat flex flex-col px-6 py-16 md:py-24 md:px-24"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <h1
          data-cta="heading"
          className="font-title text-noir text-title font-normal uppercase"
        >
          The next chapter begins with you.
        </h1>
        <p data-cta="text" className="font-body text-noir text-body mt-6">
          This work isn’t about doing more, it’s about coming home to yourself
          and your body. Together, we’ll support your nervous system, clear
          what’s been weighing you down, and reconnect you to your natural
          rhythm so you can move forward feeling grounded, inspired, and alive.
        </p>
        <Buttons
          data-cta="cta"
          variant="vanilla"
          className="mt-6"
          onClick={openCalendlyPopup}
        >
          Initial appointment
        </Buttons>
      </div>
    </section>
  );
}
