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
            <h3 className="display-font">Hi, I am Itachi-org.</h3>
            <p className="bio-text">
              I’m a Blockchain & Full Stack Developer with 6+ years of experience building secure, scalable Web3 and full-stack applications using Solidity, Hardhat, React, Node.js, TypeScript, and PostgreSQL.
            </p>
            <p className="bio-text">
              I specialize in developing high-performance dApps and seamless on-chain/off-chain integrations, with a proven track record of improving security, optimizing system performance, and delivering reliable products used by thousands of users.
            </p>
            <p className="bio-text">
              My work focuses on secure smart contract architecture, enterprise-ready backend systems, and immersive front-end experiences that help startups and established teams launch Web3 products faster.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">30+</div>
              <div className="stat-label">Full Stack Development</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">10+</div>
              <div className="stat-label">Blockchain Development</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">4+</div>
              <div className="stat-label">Web3 Development</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">4+</div>
              <div className="stat-label">Mobile Development</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number neon-text font-display">20+</div>
              <div className="stat-label">Automation Development</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
