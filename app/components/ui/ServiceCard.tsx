'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Buttons } from './Buttons';

interface FlipArrowProps {
  className?: string;
}

interface ServiceCardProps {
  label: string;
  image: string;
  description: string;
  link: string;
  strTarget?: string;
  strRel?: string;
  ctaLabel: string;
}

function FlipArrow({ className }: FlipArrowProps) {
  return (
    <svg
      className={`absolute bottom-6 right-4 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 ${className}`}
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
  );
}

export default function ServiceCard({
  label,
  image,
  description,
  link,
  strTarget,
  strRel,
  ctaLabel,
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      data-services="card"
      onClick={() => setIsFlipped((prev) => !prev)}
      className="group relative aspect-3/4 cursor-pointer perspective-distant"
    >
      <div
        className="relative h-full w-full transition-transform duration-700 transform-3d"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front face */}
        <div className="absolute inset-0 overflow-hidden backface-hidden">
          <Image
            src={image}
            alt={label}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-noir/80 via-noir/10 to-transparent" />
          <p className="absolute bottom-6 left-0 right-0 text-center text-label text-vanilla">
            {label}
          </p>
          <FlipArrow className="text-vanilla rotate-45" />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-vanilla px-6 text-center [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-body text-beigeDark text-body">{description}</p>
          <Buttons
            variant="cherry"
            className="mt-6"
            href={link}
            target={strTarget}
            rel={strRel}
            onClick={(e) => e.stopPropagation()}
          >
            {ctaLabel}
          </Buttons>
          <FlipArrow className="text-beigeDark rotate-225" />
        </div>
      </div>
    </div>
  );
}
