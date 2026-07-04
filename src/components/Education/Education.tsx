import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Education.css';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const revealRef = useScrollReveal();

  const eduData = [

    {
      degree: "High School Diploma",
      school: "Niigata Prefectural Shibata High School",
      period: "Apr 2018 — Mar 2021",
      status: "Top Honors",
      logo: "/images/tdes.png"
    },
    {
      degree: "Bachelor of Information Systems",
      school: "Niigata University of International and Information Studies",
      period: "Apr 2021 — Mar 2025",
      status: "Top Honors",
      logo: "/images/lu.png" // put file in /public/images
    }

  ];

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <h2 className="section-title">EDUCATION</h2>

        <div ref={revealRef} className="edu-grid reveal">
          {eduData.map((edu, idx) => (
            <div key={idx} className="edu-card glass-card">
              <div className="edu-status-badge">{edu.status}</div>
              <div className="edu-icon-wrapper">
                {edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="edu-logo-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <GraduationCap size={32} color="var(--secondary-neon)" />
                )}
              </div>
              <div className="edu-info">
                <h3>{edu.degree}</h3>
                <p className="edu-school">{edu.school}</p>
                <div className="edu-period">
                  <span className="line"></span>
                  <span className="text">{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}