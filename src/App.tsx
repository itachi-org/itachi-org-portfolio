import { useState, useEffect } from 'react';
import './App.css';
import Preloader from './components/Preloader/Preloader';
import CursorTrail from './components/CursorTrail/CursorTrail';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import VisitorCounter from './components/VisitorCounter/VisitorCounter';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasPreloaded = sessionStorage.getItem('preloaded');
    if (hasPreloaded) {
      setLoading(false);
    }
  }, []);

  const handlePreloadComplete = () => {
    sessionStorage.setItem('preloaded', 'true');
    setLoading(false);
  };

  return (
    <div className="app-container">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <CursorTrail />
      {loading ? (
        <Preloader onComplete={handlePreloadComplete} />
      ) : (
        <>
          <header>
            <Navbar />
          </header>
          <main id="main-content" aria-label="Portfolio sections">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </main>
          <Footer />
          <VisitorCounter />
        </>
      )}
    </div>
  );
}