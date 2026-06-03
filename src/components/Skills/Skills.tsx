import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Skills.css';

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drops: number[] = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    const fontSize = 16;
    
    let columns = 0;

    const initCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      columns = canvas.width / fontSize;
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
    };

    initCanvas();

    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Control speed
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);

        // Translucent background to show trail
        ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffe7'; 
        ctx.font = fontSize + 'px "Share Tech Mono"';

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
    };

    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', initCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  const skillCategories = [
    {
      title: "AI & Automation",
      skills: ["Gumloop", "Workflow Automation", "Process Optimization"]
    },
    {
      title: "Software Development",
      skills: ["Python", "C#", ".NET", "Java"]
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Vite"]
    },
    {
      title: "Databases & Design",
      skills: ["SQL", "Firebase", "MySQL", "Figma", "UI/UX Design"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="section-container skills-content">
        <h2 className="section-title">CORE_CAPABILITIES</h2>
        
        <div ref={revealRef} className="skills-grid reveal">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category glass-card">
              <div className="category-header">
                <h3>{cat.title}</h3>
                <div className="glow-line"></div>
              </div>
              <div className="skill-badges">
                {cat.skills.map(skill => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
