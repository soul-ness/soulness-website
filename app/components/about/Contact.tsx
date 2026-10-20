'use client';

import { useActionState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Buttons } from '../ui/Buttons';
import { handleFormSubmit, type FormState } from './Actions';
import { useLocale, useTranslations } from 'next-intl';

const initialState: FormState = { success: false, message: '' };

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [state, formAction, pending] = useActionState(
    handleFormSubmit,
    initialState,
  );
  const t = useTranslations('Contact');
  const locale = useLocale();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heading = root.querySelector("[data-contact='heading']");
      const text = root.querySelector("[data-contact='text']");
      const cont = root.querySelector("[data-contact='cont']");

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([heading, text, cont], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([heading, text, cont], { opacity: 0, y: 20 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(heading, { opacity: 1, y: 0, duration: 0.8 })
        .to(text, { opacity: 1, y: 0, duration: 0.8 })
        .to(cont, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    },
    { scope: rootRef },
  );

  return (
    <section
      id="contact"
      ref={rootRef}
      className="bg-oat flex flex-col px-6 py-16 md:py-24 md:px-24"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <h1
          data-contact="heading"
          className="font-title text-noir text-title font-normal uppercase"
        >
          {t('heading')}
        </h1>
        <p data-contact="text" className="font-body text-noir text-body mt-6">
          {t('text')}
        </p>
      </div>
      <div data-contact="cont" className="max-w-2xl mx-auto w-full mt-12">
        {/*if state success is true show the message if it false show the form*/}
        {state.success ? (
          <p className="font-body text-noir text-body text-center">
            {state.message}
          </p>
        ) : (
          <form action={formAction} className="w-full">
            <input type="hidden" name="locale" value={locale} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-label text-noir">
                  {t('nameLabel')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="border-b border-noir bg-transparent py-2 font-body text-noir focus:outline-none text-body"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-label text-noir">
                  {t('emailLabel')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-b border-noir bg-transparent py-2 font-body text-noir focus:outline-none text-body"
                />
              </div>
              <div className="flex flex-col gap-3 md:col-span-2">
                <label htmlFor="message" className="text-label text-noir">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  className="border-b border-noir bg-transparent py-2 font-body text-noir focus:outline-none resize-none text-body"
                />
              </div>
            </div>

            {!state.success && state.message && (
              <p
                aria-live="polite"
                className="font-body text-cherry text-body mt-4"
              >
                {state.message}
              </p>
            )}

            <Buttons
              variant="cont"
              className="mt-6"
              type="submit"
              disabled={pending}
            >
              {pending ? t('sending') : t('submit')}
            </Buttons>
          </form>
        )}
      </div>
    </section>
  );
}
