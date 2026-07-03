import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Projects.css';
import { ExternalLink } from 'lucide-react';

export default function Projects() {
  const revealRef = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [newCardSlot, setNewCardSlot] = useState<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const visibleCount = 3;

  const projects = [
    {
      title: "FiamBond",
      subtitle: "Family Finance Tracking",
      tech: ["React", "TypeScript", "Firebase", "MongoDB"],
      description: "A full-stack finance app for personal and family budgeting with transaction tracking, goals, receipts, and shared finance management.",
      link: "https://fiambond.web.app/welcome",
      image: "/images/projects/firebase.png"
    },
    {
      title: "EVM_Kit",
      subtitle: "Web3 App Starter Stack",
      tech: ["TypeScript", "Next.js", "Solidity", "thirdweb"],
      description: "A developer-focused EVM toolkit for building modern full-stack dApps with smart contracts, wallet onboarding, and a polished UI.",
      link: "https://github.com/itachi-org/EVM_kit",
      image: "/images/projects/evm_kit.png"
    },
    {
      title: "IMAGINIFY",
      subtitle: "AI Image Generator",
      tech: ["Next.js", "AI", "Tailwind", "Cloud APIs"],
      description: "An AI-powered image generation platform that turns prompts into visuals with a clean interface and responsive experience.",
      link: "https://ai-imaginify.netlify.app/",
      image: "/images/projects/img_main.png"
    },
    {
      title: "Novmuser AI",
      subtitle: "Creative AI Experience",
      tech: ["Next.js", "TypeScript", "AI", "Serverless"],
      description: "A modern AI-driven app built with Next.js that showcases creative content generation and intelligent frontend interactions.",
      link: "https://novmuserai.com/",
      image: "/images/projects/novemuse.png"
    },
    {
      title: "Contract Guard",
      subtitle: "PDF Contract Analyzer",
      tech: ["React", "Node.js", "Python", "PostgreSQL"],
      description: "A contract analysis tool for GmbH agreements that flags required, recommended, and optional clauses after PDF upload.",
      link: "https://github.com/itachi-org/contract-guard",
      image: "/images/projects/contractguard.png"
    },
    {
      title: "Fitness Pro",
      subtitle: "Microservices Fitness App",
      tech: ["React", "Node.js", "MongoDB", "Docker"],
      description: "A multi-service fitness tracking platform with activity logging, analytics, authentication, and monitoring across microservices.",
      link: "https://github.com/itachi-org/fitness_pro",
      image: "/images/projects/frontpage.png"
    }
  ];

  const visibleProjects = Array.from({ length: visibleCount }, (_, offset) => {
    const index = (activeIndex + offset) % projects.length;
    return { project: projects[index], slot: offset };
  });

  const triggerTransitionEffect = (slot: number) => {
    if (transitionTimer.current) {
      window.clearTimeout(transitionTimer.current);
    }
    setNewCardSlot(slot);
    setIsTransitioning(true);
    transitionTimer.current = window.setTimeout(() => {
      setIsTransitioning(false);
      setNewCardSlot(null);
      transitionTimer.current = null;
    }, 3000);
  };

  const handlePrev = () => {
    triggerTransitionEffect(0);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    triggerTransitionEffect(visibleCount - 1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <h2 className="section-title">PROJECTS</h2>

        <div ref={revealRef} className="projects-carousel reveal">
          <div className="carousel-frame">
            <div className={`carousel-track ${isTransitioning ? 'is-transitioning' : ''}`}>
              {visibleProjects.map(({ project, slot }) => (
                <div
                  key={project.title}
                  className={`project-card glass-card ${isTransitioning && newCardSlot === slot ? 'entering' : ''}`}
                  role="link"
                  tabIndex={0}
                  aria-label={`View ${project.title} project`}
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="card-border-trace"></div>

                  <div className="project-thumb">
                    <img
                      src={project.image}
                      alt={`${project.title} preview screenshot`}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).classList.add('no-image');
                      }}
                    />
                    <div className="project-thumb-overlay"></div>
                  </div>

                  <div className="project-header">
                    <div>
                      <h3>{project.title}</h3>
                      <span className="project-subtitle">{project.subtitle}</span>
                    </div>
                    <div className="project-icon">
                      <ExternalLink size={24} color="var(--primary-neon)" />
                    </div>
                  </div>

                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link neon-btn secondary btn-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    [ACCESS DATA]
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-button prev"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-button next"
            onClick={handleNext}
            aria-label="Next project"
          >
            ›
          </button>

          <div className="carousel-indicators">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                aria-label={`Show project ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}