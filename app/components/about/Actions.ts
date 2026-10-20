'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '../../../i18n/routing';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── 1. In-memory rate limiter (per IP) ───────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 3; // max 3 submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count++;
  return false;
}

export type FormState = {
  success: boolean;
  message: string;
};

export async function handleFormSubmit(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const requestedLocale = formData.get('locale');
  const locale =
    typeof requestedLocale === 'string' &&
    hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: 'Contact' });

  const schema = z.object({
    name: z.string().min(2, t('errorName')).max(80),
    email: z.email(t('errorEmail')),
    message: z.string().min(10, t('errorMessageTooShort')).max(2000),
  });

  //getting the ip and checking
  const ip =
    (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: t('errorRateLimit'),
    };
  }
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? t('errorGeneric'),
    };
  }

  const { error } = await resend.emails.send({
    from: 'Soulness <onboarding@resend.dev>',
    to: 'ana@soul-ness.com',
    replyTo: result.data.email,
    subject: `Soulness Form new message from ${result.data.name}`,
    text: `From: ${result.data.name}\n\nEmail: ${result.data.email}\n\n${result.data.message}`,
  });

  if (error) {
    return {
      success: false,
      message: t('errorSendFailed'),
    };
  }
  return {
    success: true,
    message: t('successMessage'),
  };
}
