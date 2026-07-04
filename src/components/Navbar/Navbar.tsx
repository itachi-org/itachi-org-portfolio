import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Current section logic
      const sections = links.map(link => document.getElementById(link.toLowerCase()));
      const scrollPos = window.scrollY + 150;

      sections.forEach((sec, idx) => {
        if (sec && sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          setActiveSection(links[idx].toLowerCase());
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    setIsOpen(false);
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <span className="logo-brace">&lt;</span>
          <span className="logo-text"> Itachi-org </span>
          <span className="logo-brace">/&gt;</span>
        </div>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link);
                }}
                className={activeSection === link.toLowerCase() ? 'active' : ''}
                aria-current={activeSection === link.toLowerCase() ? 'page' : undefined}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
