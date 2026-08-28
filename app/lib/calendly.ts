export const CALENDLY_URL =
  'https://calendly.com/soulness/spinal-initialassesment';

export function openCalendlyPopup() {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
}
