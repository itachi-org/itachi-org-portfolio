import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Skills.css';
import {
  SiPython, SiSharp, SiDotnet, SiOpenjdk, SiHtml5, SiCss, SiJavascript,
  SiReact, SiTypescript, SiVite, SiMysql, SiFirebase, SiFigma,
  SiNodedotjs, SiExpress, SiEthereum, SiSolidity, SiWeb3Dotjs,
  SiEthers, SiSolana, SiFlutter, SiExpo, SiKotlin,
  SiAndroidstudio, SiHive, SiN8N, SiOpenai, SiDocker
} from 'react-icons/si';
import { Workflow, Cog, PenTool, Sparkles, Code2, Layers, Server, Database, Hammer, Package, Play, type LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

// Maps each skill label to its brand icon. Anything without a known
// brand mark (process/automation concepts) falls back to a generic
// lucide icon so every badge still reads visually, not just as text.
const skillIconMap: Record<string, IconType | LucideIcon> = {
  'Python': SiPython,
  'C#': SiSharp,
  '.NET': SiDotnet,
  'Java': SiOpenjdk,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'JS': SiJavascript,
  'JavaScript': SiJavascript,
  'TS': SiTypescript,
  'TypeScript': SiTypescript,
  'React': SiReact,
  'Vite': SiVite,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Ethereum': SiEthereum,
  'Solidity': SiSolidity,
  'Smart Contract': Code2,
  'DApps': Layers,
  'NFT': Database,
  'Web3.js': SiWeb3Dotjs,
  'Ethers.js': SiEthers,
  'Solana': SiSolana,
  'Hardhat': Hammer,
  'Truffle': Package,
  'React Native': Play,
  'Flutter': SiFlutter,
  'Expo': SiExpo,
  'Kotlin': SiKotlin,
  'Android Studio': SiAndroidstudio,
  'Firebase': SiFirebase,
  'Hive': SiHive,
  'Playwright': Play,
  'n8n': SiN8N,
  'OpenAI': SiOpenai,
  'Docker': SiDocker,
  'SQL': SiMysql,
  'MySQL': SiMysql,
  'Figma': SiFigma,
  'UI/UX Design': PenTool,
  'Gumloop': Sparkles,
  'Workflow Automation': Workflow,
  'Rest API': Server,
  'Process Optimization': Cog,
};

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
    const fps = 20;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);

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
      title: "Full Stack Development",
      skills: ["HTML", "CSS", "JS", "TS", "React", "Node.js", "Express", "Vite"]
    },
    {
      title: "Blockchain Development",
      skills: ["Ethereum", "Solidity", "Smart Contract", "DApps", "NFT", "Docker"]
    },
    {
      title: "Web3 Development",
      skills: ["Web3.js", "Ethers.js", "Solana", "Hardhat", "Truffle"]
    },
    {
      title: "Mobile Development",
      skills: ["React Native", "Flutter", "Expo", "Kotlin", "Java", "Android Studio", "Firebase", "Hive"]
    },
    {
      title: "Automation Development",
      skills: ["Python", "Workflow Automation", "Rest API", "Playwright", "n8n", "Docker", "OpenAI"]
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="section-container skills-content">
        <h2 className="section-title">CORE_SKILLS</h2>

        <div ref={revealRef} className="skills-grid reveal">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category glass-card">
              <div className="category-header">
                <h3>{cat.title}</h3>
                <div className="glow-line"></div>
              </div>
              <div className="skill-badges">
                {cat.skills.map(skill => {
                  const Icon = skillIconMap[skill];
                  return (
                    <span key={skill} className="skill-badge">
                      {Icon && <Icon className="skill-badge-icon" aria-hidden="true" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
