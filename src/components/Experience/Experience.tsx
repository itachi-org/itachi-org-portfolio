import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Experience.css';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const revealRef = useScrollReveal();

  const expData = [
    {
      title: "Blockchain Developer",
      company: "NexisWave Systems Co., Ltd",
      period: "Jun 2021 — Present",
      details: [
        "Lead development of secure, upgradeable smart contracts and on-chain components using Solidity and Hardhat, delivering 12+ contracts for token, governance and marketplace features",
        "Implemented multi-chain support (Ethereum, Polygon) and wallet integrations, improving user onboarding and increasing on-chain transaction success while reducing average gas per interaction by 25% through optimizations.",
        "Built and maintained backend services and node infrastructure, improving DApp uptime to 99.9% and reducing incident response time through monitoring and alerting.",
        "Introduced automated testing and CI/CD pipelines (Docker, GitHub Actions) to ensure reliable releases and shorten deployment cycles.",
        "Collaborated with security teams to perform audits and remediation, mentored 3 junior developers, and coordinated cross-team deliveries to meet product milestones."
      ],
      // Photo for this entry (local copy)
      image: "/images/experience/blockchain.jpg"
    },
    {
      title: "Full Stack Developer",
      company: "Sakura Tech Solutions Co., Ltd.",
      period: "Mar 2022 — Mar 2026",
      details: [
        "Designed and implemented scalable dApps and REST APIs using React, Node.js/Express, Solidity, and ethers.js/web3.js; integrated MetaMask and WalletConnect for seamless wallet interactions and multi-chain support (Ethereum, Polygon).",
        "Developed and audited 8 smart contracts with Hardhat, applied upgradeable patterns and gas optimizations that reduced average gas per transaction by ~30% and improved on-chain success rate by 28%.",
        "Architected backend microservices and optimized PostgreSQL queries and caching layers, increasing API throughput by 50% and reducing latency by 60% under load.",
        "Built automated CI/CD pipelines with Docker and GitHub Actions and expanded unit/integration test coverage, lowering deployment rollback rate by ~70%.",
        "Collaborated with product, security, and QA teams; mentored 6 junior engineers and led delivery of 10+ product features, supporting growth to ~25k monthly active users."
      ],
      image: "/images/experience/sakura.jpg"
    },
    {
      title: "Full Stack Developer",
      company: "BlueOrbit Labs Pte Ltd",
      period: "Jul 2021 — Nov 2025",
      details: [
        "Designed and built an end-to-end web application and Web3 integrations using React, Node.js/Express, and Solidity smart contracts, enabling secure on-chain/off-chain interactions and supporting 10k+ monthly users.",
        "Implemented and tested smart contracts (Solidity) with Hardhat and Truffle; executed audits and fixes that reduced contract vulnerabilities by 90% and decreased failed transactions by 35%.",
        "Optimized backend performance and database design (PostgreSQL) to increase API throughput by 40% and lower average response time from 450ms to 180ms. ",
        "Created CI/CD pipelines with GitHub Actions and Docker, automating build/test/deploy and cutting release time from multiple hours to under 15 minutes; managed staging and production rollouts.",
        "Led cross-functional collaborations with product and QA teams, mentored 4 junior developers, and delivered 6 major feature releases on schedule."
      ],
      image: "/images/experience/blueorbit.jpg"
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
