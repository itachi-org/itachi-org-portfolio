import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo display-font">
          <span className="logo-brace">&lt;</span>
          <span className="logo-text"> MARC_AIRON_CANTAL </span>
          <span className="logo-brace">/&gt;</span>
        </div>
        
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} All Rights Reserved. Designed & Built for the Future.
        </div>
        
        <div className="footer-glow"></div>
      </div>
    </footer>
  );
}
