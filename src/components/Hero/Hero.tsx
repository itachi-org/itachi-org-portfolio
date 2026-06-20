import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const primaryBtnRef = useMagnetic<HTMLAnchorElement>(0.3);
  const secondaryBtnRef = useMagnetic<HTMLAnchorElement>(0.3);

  const roles = ["Full-Stack Developer", "Data Analyst", "AI Automation Engineer", "UI/UX Designer", "QA Tester"];

  // Typewriter effect
  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setRoleText(isDeleting
        ? fullText.substring(0, roleText.length - 1)
        : fullText.substring(0, roleText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && roleText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(2000); // Pause at end
      } else if (isDeleting && roleText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next word
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [roleText, isDeleting, loopNum, roles, typingSpeed]);

  // Particle canvas — particle count now scales with viewport so the
  // effect stays light on phones and rich on desktop.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        const colors = ['#00ffe7', '#ff00aa', '#ffe600'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (canvas) {
          if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
          if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    let particlesArray: Particle[] = [];

    const particleCountForWidth = (w: number) => {
      if (w < 480) return 30;
      if (w < 900) return 50;
      return 80;
    };

    const init = () => {
      if (!canvas) return;
      const section = canvas.parentElement;
      canvas.width = section ? section.offsetWidth : window.innerWidth;
      canvas.height = section ? section.offsetHeight : window.innerHeight;
      particlesArray = [];
      const count = particleCountForWidth(canvas.width);
      for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
      }
    };

    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="hero-content section-container">
        <div className="hero-text">
          <p className="greeting">INITIALIZING_USER_PROFILE...</p>
          <h1 className="glitch-name" data-text="MARC AIRON CANTAL">
            MARC AIRON CANTAL
          </h1>
          <h2 className="typewriter-container">
            <span className="role-text">&gt; {roleText}</span>
            <span className="cursor">|</span>
          </h2>
          <div className="cta-container">
            <a ref={primaryBtnRef} href="#projects" className="neon-btn primary">
              <span className="btn-text">[VIEW PROJECTS]</span>
            </a>
            <a
              ref={secondaryBtnRef}
              href="/files/cv.pdf"
              download="Marc_Airon_Cantal_CV.pdf"
              className="neon-btn secondary"
            >
              <span className="btn-text">[DOWNLOAD CV]</span>
            </a>
          </div>
        </div>
        <div className="hero-visuals">
          <div className="profile-wrapper">
            <div className="energy-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="hud-rings">
              <div className="hud-ring rotating-clockwise"></div>
              <div className="hud-ring rotating-counter"></div>
              <div className="hud-markers"></div>
            </div>
            <div className="image-container">
              <img src="/images/gradpic.jpg" alt="Marc Airon Cantal - Graduation Photo" className="profile-img" />
              <div className="img-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            ['FULL-STACK DEVELOPER', 'DATA SCIENCE', 'AI AUTOMATION', 'UI / UX DESIGN'].map((label) => (
              <span key={`${i}-${label}`}>{label}</span>
            ))
          )}
        </div>
      </div>

      <div className="scroll-cue">
        <span>SCROLL</span>
        <span className="line"></span>
      </div>
    </section>
  );
}
