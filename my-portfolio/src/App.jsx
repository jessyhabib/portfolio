/**
 * App.jsx
 *
 * Root application layout.
 * Sections in order: Hero → Education → MyWork → Skills → CurrentlyLearning → FunFacts → Connect
 * The section IDs match the navbar anchor hrefs for smooth-scroll navigation.
 */
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import MyWork from './components/MyWork';
import Skills from './components/Skills';
import CurrentlyLearning from './components/CurrentlyLearning';
import FunFacts from './components/FunFacts';
import Connect from './components/Connect';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Education />
        <MyWork />
        <Skills />
        <CurrentlyLearning />
        <FunFacts />
        <Connect />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
