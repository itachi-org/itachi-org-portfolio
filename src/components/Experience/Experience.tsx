import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Experience.css';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const revealRef = useScrollReveal();

  const expData = [
    {
      title: "On-the-Job Training",
      company: "TechFactorsInc",
      period: "Feb 2026 – Apr 2026",
      details: [
        "Spearheaded the development of TALA.Sys using React, Vite, TypeScript, and Firebase.",
        "Executed robotics and Arduino-related hardware/software tasks.",
        "Performed rigorous system auditing, debugging, and comprehensive module testing to ensure enterprise readiness."
      ],
      // Drop a photo or screenshot for this entry here (e.g. workplace, system UI)
      image: "/images/experience/techfactorsinc.jpg"
    },
    {
      title: "SPES Program (2023 - 2025)",
      company: "Victoria, Laguna Engineering Office",
      period: "Summer Job Program",
      details: [
        "Provided critical front-office support and communication routing.",
        "Processed and digitized documentation for building permits and zoning applications.",
        "Ensured compliance with local engineering protocols through systematic filing."
      ],
      image: "/images/experience/spes-program.jpg"
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <h2 className="section-title">EXPERIENCE</h2>

        <div ref={revealRef} className="timeline-container reveal">
          <div className="timeline-line"></div>

          {expData.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
              <div className="timeline-content glass-card">
                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <h4 className="exp-company">{exp.company}</h4>

                <div className="exp-body">
                  {exp.image && (
                    <div className="exp-thumb">
                      <img
                        src={exp.image}
                        alt={`${exp.company} — ${exp.title}`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).classList.add('no-image');
                        }}
                      />
                    </div>
                  )}
                  <ul className="exp-details">
                    {exp.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
