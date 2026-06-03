import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Projects.css';
import { ExternalLink } from 'lucide-react';

export default function Projects() {
  const revealRef = useScrollReveal();

  const projects = [
    
    {
      title: "TALA.Sys",
      subtitle: "TechFactorsInc Ops System",
      tech: ["React/Vite", "TypeScript", "Firebase"],
      description: "Internal operations system managing equipment deployments, inspections, inventory logistics, and user control. Hardened architecture for seamless enterprise ops.",
      link: "https://techfactorsincequipmentmanagementsystem.onrender.com/"
    },
    {
      title: "3N8Analytics",
      subtitle: "Supply Chain Forecasting",
      tech: ["React/Vite", "JavaScript", "Firebase"],
      description: "Causal forecasting & simulation engine for beverage supply chains. Predicts demand to optimize inventory management directly for Pepsi distribution nodes.",
      link: "https://www.3n8analytics.site/"
    },
    {
      title: "Note Nudge",
      subtitle: "Task Management System",
      tech: ["React", "Python", "Firebase", "JavaScript", "Tailwind"],
      description: "A dual-language task management sys offering real-time sync, smart notifications, and automatic overdue archiving. Ensures fluid personal and team productivity.",
      link: "https://github.com/seansalabsab/Taskdumpster"
    },
    {
      title: "Botani-Snap AI",
      subtitle: "Plant Identification System",
      tech: ["React", "Python", "Firebase", "AI Models"],
      description: "Visual AI recognition system allowing camera input or upload to classify plant species and retrieve curated care instructions in real-time.",
      link: "https://github.com/thebadsektor/tc3202-3b-4"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <h2 className="section-title">PROJECT_ARCHIVES</h2>
        
        <div ref={revealRef} className="projects-grid reveal">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card glass-card">
              <div className="card-border-trace"></div>
              
              <div className="project-header">
                <div>
                  <h3>{proj.title}</h3>
                  <span className="project-subtitle">{proj.subtitle}</span>
                </div>
                <div className="project-icon">
                  <ExternalLink size={24} color="var(--primary-neon)" />
                </div>
              </div>
              
              <div className="project-tech">
                {proj.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              
              <p className="project-desc">{proj.description}</p>
              
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link neon-btn secondary btn-sm"
              >
                [ACCESS DATA]
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
