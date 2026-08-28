'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Buttons } from './ui/Buttons';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: 'Cacao Journaling and Sound Healing',
    subtitle: 'Saturday 15th of May from 10:30am - 12pm inversion $44',
    label: 'Book now',
    image: '/images/experiences/ex1.jpg',
    link: 'https://www.verdevida.com.au/es/retreat',
  },
  {
    title: 'Sound Healing',
    subtitle: 'Saturday 15th of May from 10:30am - 12pm inversion $44',
    label: 'Book now',
    image: '/images/experiences/ex2.jpg',
    link: 'https://www.verdevida.com.au/es/retreat',
  },
];

export default function Experiences() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const eyebrow = root.querySelector("[data-experience='eyebrow']");
      const title = root.querySelector("[data-experience='title']");
      const body = root.querySelector("[data-experience='body']");
      const cards = root.querySelectorAll("[data-experience='card']");
      const arrows = root.querySelectorAll("[data-experience='arrow']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([eyebrow, title, body, ...cards, ...arrows], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set([eyebrow, title, body], { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 30, scale: 1.03 });
      gsap.set(arrows, { opacity: 0 });

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
        .to(body, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')

        .to(
          cards,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15 },
          '-=0.3',
        )
        .to(arrows, { opacity: 1, duration: 0.5 }, '-=0.3');
    },
    { scope: rootRef },
  );

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const handlePrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const handleNext = () =>
    scrollToIndex(Math.min(activeIndex + 1, EXPERIENCES.length - 1));

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section
      id="experiences"
      ref={rootRef}
      className="bg-cherry py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-30 items-center">
        <div className="flex flex-col justify-center text-center md:text-left">
          <p data-experience="eyebrow" className="text-vanilla text-eyebrow">
            group experiences
          </p>
          <h1
            data-experience="title"
            className="font-title text-white text-title uppercase font-normal mt-6"
          >
            You don't have to heal alone
          </h1>
          <p
            data-experience="body"
            className="font-body text-beige text-body mt-6 max-w-xl mx-auto mb-6"
          >
            Healing is amplified in community. These experiences are designed to
            support your nervous system and energy field within a collective
            container of coherence, safety, and presence. They remind us that
            we’re not meant to do this work alone, that connection itself is
            medicine.
          </p>
        </div>
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {EXPERIENCES.map((experience) => (
              <div
                key={experience.title}
                data-experience="card"
                className="relative aspect-3/4 w-full shrink-0 snap-start overflow-hidden"
              >
                <Image
                  src={experience.image}
                  alt={experience.label}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-cherry/87 via-transparent to-cherry/80" />
                <div className="absolute top-6 left-0 right-0 text-center">
                  <p className="font-title text-white  text-[22px] uppercase px-6 ">
                    {experience.title}
                  </p>
                  <p className="font-body text-white font-semibold text-[12px] tracking-[0.15em] uppercase mt-1 px-10">
                    {experience.subtitle}
                  </p>
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <Buttons
                    variant="transparent"
                    href={experience.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {experience.label}
                  </Buttons>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-experience="arrow"
            onClick={handlePrev}
            aria-label="Previous experience"
            className="absolute cursor-pointer top-1/2 -left-15 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-vanilla hover:text-oat md:flex"
          >
            <svg
              className="h-6 w-6 rotate-270"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
            >
              <path
                d="M12 19V5M5 12l7-7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            data-experience="arrow"
            onClick={handleNext}
            aria-label="Next experience"
            className="absolute cursor-pointer top-1/2 -right-15 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-vanilla hover:text-oat md:flex"
          >
            <svg
              className="h-6 w-6 rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
            >
              <path
                d="M12 19V5M5 12l7-7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {EXPERIENCES.map((experience, index) => (
              <button
                key={experience.title}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-vanilla' : 'bg-vanilla/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
