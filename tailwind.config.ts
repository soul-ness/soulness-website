import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-title)'],
        italic: ['var(--font-italic)'],
        body: ['var(--font-body)'],
        quote: ['var(--font-quote)'],
      },
      fontSize: {
        title: [
          'clamp(2rem, 1.2rem + 3.5vw, 3.5rem)',
          { lineHeight: '1.1', letterSpacing: 'normal' },
        ],
        body: ['14px', { lineHeight: '1.8', letterSpacing: '0.05em' }],
      },
      colors: {
        ink: 'var(--ink)',
        vanilla: 'var(--vanilla)',
        oat: 'var(--oat)',
        oatBright: 'var(--oatBright)',
        beige: 'var(--beige)',
        beigeDark: 'var(--beigeDark)',
        cherry: 'var(--cherry)',
        noir: 'var(--noir)',
      },
    },
  },
  plugins: [],
};
export default config;
