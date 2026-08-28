import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-noir py-10 px-6 md:py-14 md:px-30">
      {/* 1st row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_.5fr_.5fr]">
        {/* Column 1: logo + phrase */}
        <div className="flex flex-col gap-4">
          <a href="/" className="relative block h-10 w-32">
            <Image
              src="/images/logo-white1.png"
              alt="Soulness"
              fill
              sizes="128px"
              className="object-contain"
            />
          </a>
          <p className="font-body text-vanilla/70 text-body">
            A space for inner alignment and embodied transformation.
            <br />
            Based in Melbourne, supporting clients worldwide.
          </p>
        </div>

        {/* Column 2: Navigate + links */}
        <div className="flex flex-col gap-4">
          <p className="text-label text-[14px] text-white">Navigate</p>
          <ul className="text-label flex flex-col gap-2 text-vanilla/70">
            <li>
              <a href="/#offerings">Offerings</a>
            </li>
            <li>
              <a href="/about">About Ana</a>
            </li>
            <li>
              <a href="/#experiences">Group Experiences</a>
            </li>
            <li>
              <a href="/#reviews">Reviews</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact me + icons */}
        <div className="flex flex-col gap-4">
          <p className="text-label text-[14px] text-white">Contact me</p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/soulness.us"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5 text-vanilla"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a href="mailto:hello@soulness.com" aria-label="Email">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-vanilla/40 md:flex-row md:items-center md:justify-between">
        <p className="text-label">© 2026 ANA FROM SOULNESS</p>
        <p className="text-label">
          Design and development by{' '}
          <a
            href="https://www.andreamg.dev/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-vanilla"
          >
            Andrea
          </a>
        </p>
      </div>
    </footer>
  );
}
