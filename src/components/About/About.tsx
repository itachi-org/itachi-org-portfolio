import { useScrollReveal } from '../../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">ABOUT_ME</h2>
        
        <div ref={revealRef} className="about-grid reveal">
          <div className="about-bio glass-card">
            <h3 className="display-font">SYSTEM_USER: MARC AIRON</h3>
            <p className="bio-text">
              Hi, I'm Marc Airon — a Computer Science student majoring in Data Science from Laguna University. 
              I build full-stack systems, automate workflows with AI, and design interfaces that feel like the future.
            </p>
            <p className="bio-text">
              My focus is bridging the gap between performant structural design and immersive aesthetics, delivering 
              experiences that not only function flawlessly but leave a lasting impression in cyberspace.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">3+</div>
              <div className="stat-label">Major Projects Completed</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">2</div>
              <div className="stat-label">OJT Endorsements</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">DS</div>
              <div className="stat-label">Data Science Major</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">∞</div>
              <div className="stat-label">Lines of Code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
