import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Contact.css';
import { Facebook, Instagram, Linkedin, Github, Mail, Phone, SendHorizontal } from 'lucide-react';

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title">CONTACT ME</h2>
        
        <div ref={revealRef} className="contact-grid reveal">
          <div className="contact-info glass-card">
            <h3 className="display-font">COMM_CHANNELS</h3>
            <p className="contact-desc">
              Initialize a secure connection protocol. Send a ping to my terminal for collaborations, 
              inquiries, or system logs analysis.
            </p>
            
            <div className="direct-contact">
              <div className="contact-item">
                <Mail className="contact-icon" color="var(--primary-neon)" />
                <a href="mailto:cantal2227@gmail.com">cantal2227@gmail.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" color="var(--primary-neon)" />
                <a href="tel:+639761386092">+63 976 138 6092</a>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://www.facebook.com/INJOKERIN0/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/marcxairon_22/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Instagram />
              </a>
              <a href="https://www.linkedin.com/in/marc-airon-cantal-4a063a32b/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Linkedin />
              </a>
              <a href="https://github.com/PapiAiron" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Github />
              </a>
            </div>
          </div>
          
          <div className="contact-form-wrapper glass-card">
            <h3 className="display-font">SECURE_TRANSMISSION</h3>
            <form 
              className="contact-form"
              action="mailto:cantal2227@gmail.com" 
              method="post" 
              encType="text/plain"
            >
              <div className="input-group">
                <input type="text" name="name" required placeholder="GUEST_ID (Name)" />
                <span className="input-highlight"></span>
              </div>
              <div className="input-group">
                <input type="email" name="email" required placeholder="RETURN_NODE (Email)" />
                <span className="input-highlight"></span>
              </div>
              <div className="input-group">
                <textarea name="message" rows={5} required placeholder="PAYLOAD (Message)"></textarea>
                <span className="input-highlight"></span>
              </div>
              <button type="submit" className="submit-btn neon-btn primary">
                <span className="btn-text">[SEND MESSAGE]</span>
                <SendHorizontal size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
