'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Buttons } from './ui/Buttons';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const text = root.querySelector("[data-about='text']");
      const imageMain = root.querySelector("[data-about='image-main']");
      const side = root.querySelector("[data-about='side']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([text, imageMain, side], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([text, imageMain, side], { opacity: 0, y: 30 });

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%' },
        })
        .to(text, { opacity: 1, y: 0, duration: 0.8 })
        .to(imageMain, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to(side, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
    },
    { scope: rootRef },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      className="bg-vanilla py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr_0.8fr] gap-8 md:gap-6">
        <div
          data-about="text"
          className="flex flex-col justify-center text-left md:text-right"
        >
          <p className="text-eyebrow text-oatBright">Founder of Soulness</p>
          <h2 className="font-title text-cherry text-title uppercase mt-4">
            Meet Ana
          </h2>
          <p className="font-body text-beigeDark text-body mt-6">
            I support people move through life’s transitions with clarity,
            confidence, and calm. My work bridges the nervous system, the
            energetic field, and the subconscious mind, guiding you back to the
            part of you that already knows how to flow.
          </p>
          <Buttons
            variant="beigeDark"
            href="/about"
            className="mt-8 self-start md:self-end"
          >
            About Me
          </Buttons>
        </div>
        <div
          data-about="image-main"
          className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[400px]"
        >
          <Image
            src="/images/hero/about1.jpg"
            alt="Portrait of Ana"
            fill
            sizes="(min-width: 768px) 47vw, 100vw"
            className="object-cover object-[center_85%]"
            priority
          />
        </div>
        <div data-about="side" className="flex flex-col gap-6">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/about/smoke.jpg"
              alt="Detail shot"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-eyebrow text-oatBright">
              Nervous system and energy practitioner
            </p>

            <p className="font-quote text-beigeDark text-[18px] leading-[1.4] mt-3">
              "Change looks different for everyone, but the path to health,
              presence, and inspiration always starts in the body"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
