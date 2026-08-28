import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import Cta from './components/Cta';
import Experiences from './components/Experiences';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Experiences />
      <Cta />
      <Reviews />
    </main>
  );
}
