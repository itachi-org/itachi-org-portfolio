import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Education.css';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const revealRef = useScrollReveal();

  const eduData = [
 
     {
      degree: "Elementary Education",
      school: "Tomas Daguinsin Elementary School",
      period: "2008 – 2014",
      status: "PRIMARY",
      logo: "/images/tdes.png"
    },
    {
      degree: "Secondary Education ( JHS + SHS )",
      school: "Liceo de Victoria",
      period: "2014 – 2020",
      status: "SECONDARY",
      logo: "/images/ldv.png"
    },
       {
      degree: "BS Computer Science – Major in Data Science",
      school: "Laguna University",
      period: "2022 – 2026",
      status: "TERTIARY",
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