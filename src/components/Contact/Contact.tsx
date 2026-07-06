import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Contact.css';
import { Facebook, Instagram, Linkedin, Github, Mail, Phone, SendHorizontal } from 'lucide-react';
import { SiTelegram, SiDiscord, SiWhatsapp } from 'react-icons/si';
import { useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const revealRef = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Honeypot check: real users never fill this, bots usually do
    if (formData.get('company')) {
      // Pretend it worked so the bot doesn't know it was blocked
      setStatus('sending');
      setTimeout(() => {
        setStatus('sent');
        formRef.current?.reset();
      }, 800);
      return;
    }

    // Time-trap: reject submissions faster than a human could realistically type
    const elapsed = Date.now() - mountedAt.current;
    if (elapsed < 2500) {
      setStatus('sending');
      setTimeout(() => {
        setStatus('sent');
        formRef.current?.reset();
      }, 800);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(formRef.current.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('sent');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title">CONTACT ME</h2>
        
        <div ref={revealRef} className="contact-grid reveal">
          <div className="contact-info glass-card">
            <h3 className="display-font">Contact_Info</h3>
            <p className="contact-desc">
              Initialize a secure connection protocol. Send a ping to my terminal for collaborations, 
              inquiries, or system logs analysis.
            </p>
            
            <div className="direct-contact">
              <div className="contact-item">
                <Mail className="contact-icon" color="var(--primary-neon)" />
                <a href="mailto:ryota.oshima2026@gmail.com">ryota.oshima2026@gmail.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" color="var(--primary-neon)" />
                <a href="tel:+817095163012">+81 70 9516 3012</a>
              </div>
            </div>
            
            <div className="social-links">
              <a href={`https://t.me/hades02921`} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram">
                <SiTelegram />
              </a>
              <a href={`https://discord.gg/user/itachi_org02921`} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Discord">
                <SiDiscord />
              </a>
              <a href={`https://wa.me/817095163012`} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <SiWhatsapp />
              </a>
              <a href="https://github.com/itachi-org" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Github />
              </a>
            </div>
          </div>
          
          <div className="contact-form-wrapper glass-card">
            <h3 className="display-font">SECURE_TRANSMISSION</h3>
            <form 
              ref={formRef}
              className="contact-form"
              action="https://formspree.io/f/xzdlpdjr"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* Honeypot field — hidden from real users, bots tend to fill it anyway */}
              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <input type="text" name="name" required placeholder="GUEST_ID (Name)" disabled={status === 'sending'} />
                <span className="input-highlight"></span>
              </div>
              <div className="input-group">
                <input type="email" name="email" required placeholder="RETURN_NODE (Email)" disabled={status === 'sending'} />
                <span className="input-highlight"></span>
              </div>
              <div className="input-group">
                <textarea name="message" rows={5} required placeholder="PAYLOAD (Message)" disabled={status === 'sending'}></textarea>
                <span className="input-highlight"></span>
              </div>
              <button type="submit" className="submit-btn neon-btn primary" disabled={status === 'sending'}>
                <span className="btn-text">
                  {status === 'sending' ? '[TRANSMITTING...]' : '[SEND MESSAGE]'}
                </span>
                <SendHorizontal size={18} />
              </button>

              {status === 'sent' && (
                <p className="form-status form-success">TRANSMISSION RECEIVED. I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="form-status form-error">TRANSMISSION FAILED. Please try again or email me directly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}