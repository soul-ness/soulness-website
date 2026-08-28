'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    title: "Dani's Journey from control to clarity",
    quote:
      '“Each session has been magical and transformative. I’ve discovered parts of myself that allowed me to grow in every area of my life, from my purpose to my relationships.”',
    name: 'Dani',
  },
  {
    title: "Abi's story overcoming overwhelm",
    quote:
      '“Since we started, I’ve stepped into my new business with confidence and ease. My body isn’t struggling, I can expand without losing myself.”',
    name: 'Abi',
  },
  {
    title: "Joan's shift from emotional exhaustion to calm",
    quote:
      '“At first I was skeptical about energy work, but I can feel how much it has helped me. I’m finally back to myself, calm, happy, and grounded.”',
    name: 'Joan',
  },
];

export default function Reviews() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const bg = root.querySelector("[data-reviews='bg']");
      const cards = root.querySelectorAll("[data-reviews='card']");
      const arrows = root.querySelectorAll("[data-reviews='arrow']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([...cards, ...arrows], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(arrows, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 70%' },
        })
        .to(cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 })
        .to(arrows, { opacity: 1, duration: 0.5 }, '-=0.3');

      gsap.fromTo(
        bg,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
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
    scrollToIndex(Math.min(activeIndex + 1, REVIEWS.length - 1));

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-6 py-16 md:py-0"
    >
      <div data-reviews="bg" className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image
          src="/images/hero/review1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          onLoad={() => ScrollTrigger.refresh()}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <div key={review.name} className="w-full shrink-0 snap-start px-1">
              <div
                data-reviews="card"
                className="bg-vanilla px-8 py-10 md:px-10 md:py-12"
              >
                <div className="mb-4 flex justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-cherry"
                    >
                      <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-title text-cherry text-[20px] leading-[1.5] md:text-[22px]">
                  {review.title}
                </p>

                <p className="font-quote text-beigeDark text-[16px] leading-[1.5] md:text-[19px] mt-2">
                  {review.quote}
                </p>
                <p className="font-body text-cherry mt-6 text-[11px] tracking-[0.15em] uppercase">
                  — {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          data-reviews="arrow"
          onClick={handlePrev}
          aria-label="Previous review"
          className="absolute top-1/2 -left-15 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-white hover:text-oat md:flex"
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
          data-reviews="arrow"
          onClick={handleNext}
          aria-label="Next review"
          className="absolute top-1/2 -right-15 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-white hover:text-oat md:flex"
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
          {REVIEWS.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-cherry' : 'bg-cherry/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
