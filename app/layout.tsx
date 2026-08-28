// app/layout.tsx
import type { Metadata } from 'next';
import {
  Bodoni_Moda,
  Petit_Formal_Script,
  Poppins,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Script from 'next/script';

const title = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-title',
  display: 'swap',
});

const italic = Petit_Formal_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italic',
  display: 'swap',
});

const body = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
});

const quote = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-quote',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soulness',
  description: 'Soulness wellness practice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body
        className={`${title.variable} ${italic.variable} ${body.variable} ${quote.variable}`}
      >
        <Nav />
        {children}
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
