import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Cta from '../components/Cta';
import Experiences from '../components/Experiences';
import Deck from '../components/Deck';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Experiences />
      <Deck />
      <Cta />
      <Reviews />
    </main>
  );
}
