"use client";
import { useState } from 'react';

export default function AboutSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Jonas Behrmann",
      role: "Gründer & CEO",
      description: "Visionär und treibende Kraft hinter Wilma. Jonas bringt seine Leidenschaft für Technologie und Hochzeitsplanung zusammen, um Paaren in Österreich ihre Traumhochzeit zu ermöglichen.",
      expertise: ["KI-Entwicklung", "Produktstrategie", "Unternehmensführung"],
      image: "👨‍💼",
      color: "from-pink-500 to-purple-600",
      backDescription: "Jonas hat über 8 Jahre Erfahrung in der Software-Entwicklung und hat bereits mehrere erfolgreiche Startups mit aufgebaut. Seine Vision ist es, die Hochzeitsplanung durch KI zu revolutionieren und Paaren stressfreie, perfekte Hochzeiten zu ermöglichen.",
      achievements: ["8+ Jahre Tech-Erfahrung", "3 erfolgreiche Startups", "KI-Experte"],
      contact: "jonas@wilma-wedding.com"
    },
    {
      name: "Karina Anders",
      role: "Lebensgefährtin & COO",
      description: "Karina bringt ihre Erfahrung in der Hochzeitsbranche und ihr Verständnis für die Bedürfnisse von Paaren ein. Sie sorgt dafür, dass Wilma immer am Puls der Zeit bleibt.",
      expertise: ["Hochzeitsplanung", "Kundenbeziehungen", "Betriebsabläufe"],
      image: "👩‍💼",
      color: "from-purple-500 to-blue-600",
      backDescription: "Karina hat jahrelange Erfahrung in der Hochzeitsbranche und kennt die Herausforderungen von Paaren aus erster Hand. Sie sorgt dafür, dass Wilma nicht nur technisch innovativ, sondern auch emotional intelligent ist.",
      achievements: ["5+ Jahre Hochzeitsbranche", "100+ erfolgreiche Events", "Kundenbeziehungs-Expertin"],
      contact: "karina@wilma-wedding.com"
    },
    {
      name: "Simon Behrmann",
      role: "Bruder & CTO",
      description: "Simon ist verantwortlich für die technische Umsetzung von Wilma. Mit seiner Expertise in modernen Technologien entwickelt er die KI-gestützten Features, die Wilma einzigartig machen.",
      expertise: ["Software-Entwicklung", "KI-Integration", "Technische Architektur"],
      image: "👨‍💻",
      color: "from-blue-500 to-indigo-600",
      backDescription: "Simon ist ein erfahrener Full-Stack-Entwickler mit Spezialisierung auf KI und Machine Learning. Er entwickelt die technische Infrastruktur, die Wilma so einzigartig macht.",
      achievements: ["Full-Stack-Entwickler", "KI/ML-Spezialist", "Cloud-Architekt"],
      contact: "simon@wilma-wedding.com"
    }
  ];

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section id="about" className="about-section">
      <style jsx>{`
        .about-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, 
            #fef7ff 0%, 
            #f3e8ff 50%, 
            #ede9fe 100%);
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="about-hearts" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 15c-3-6-12-6-15 0-3 6 0 12 15 25 15-13 18-19 15-25-3-6-12-6-15 0z" fill="%23be185d" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23about-hearts)"/></svg>') repeat;
          pointer-events: none;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(190, 24, 93, 0.1);
          border: 1px solid rgba(190, 24, 93, 0.2);
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #be185d;
        }
        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 800px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .story-section {
          background: white;
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 4rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .story-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #be185d, #7c3aed, #2563eb);
        }
        .story-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .story-text {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.8;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .team-card-container {
          perspective: 1000px;
          height: 500px;
          position: relative;
        }
        .team-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4,0.2,0.2,1);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          overflow: visible;
        }
        .team-card.flipped {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
        }
        .card-front {
          background: white;
          z-index: 2;
          padding: 2.5rem 2rem;
          text-align: center;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .card-front .member-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--member-color));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .card-front .member-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .card-front .member-role {
          font-size: 1rem;
          color: #be185d;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .card-front .member-description {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .card-front .member-expertise {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .card-front .expertise-tag {
          background: rgba(190, 24, 93, 0.1);
          color: #be185d;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .card-front .flip-hint {
          position: static;
          margin-top: 1rem;
          color: #6b7280;
          font-size: 0.85rem;
          opacity: 0.7;
        }
        .card-back {
          background: linear-gradient(135deg, #7c3aed 0%, #be185d 100%);
          color: #fff;
          transform: rotateY(180deg);
          z-index: 3;
          box-shadow: 0 10px 40px rgba(190,24,93,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 2.5rem;
          overflow: hidden;
        }
        .card-back .member-avatar.back {
          width: 120px;
          height: 120px;
          font-size: 4rem;
          background: none;
          margin-top: 12px;
          margin-bottom: 1.2rem;
        }
        .card-back .member-name.back {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 0.2rem;
        }
        .card-back .member-role.back {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 1.2rem;
        }
        .card-back .member-description.back {
          color: rgba(255, 255, 255, 0.97);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.2rem;
          background: rgba(0,0,0,0.13);
          border-radius: 12px;
          padding: 1.1rem 1.2rem;
          width: 100%;
          max-width: 320px;
          text-align: center;
        }
        .card-back .achievements-list {
          background: rgba(0,0,0,0.10);
          border-radius: 10px;
          padding: 0.7rem 1.2rem;
          margin-bottom: 1.5rem;
          width: 100%;
          max-width: 320px;
        }
        .contact-info {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 0.5rem;
          pointer-events: auto;
        }
        .contact-email {
          color: #fff;
          font-size: 0.98rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          opacity: 0.85;
          pointer-events: auto;
          background: none;
          border: none;
          box-shadow: none;
          margin: 0;
        }
        .flip-hint {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: #6b7280;
          opacity: 0.7;
        }
        .mission-section {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          border: 1px solid rgba(190, 24, 93, 0.1);
        }
        .mission-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .mission-text {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
          .story-section, .mission-section {
            padding: 2rem 1.5rem;
          }
          .team-card-container {
            height: 450px;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            💍 Unser Team
          </div>
          <h2 className="section-title">
            Die Menschen hinter Wilma
          </h2>
          <p className="section-subtitle">
            Wir sind ein kleines, leidenschaftliches Team aus Wien, das es sich zur Aufgabe gemacht hat, 
            die Hochzeitsplanung in Österreich zu revolutionieren.
          </p>
        </div>

        <div className="story-section">
          <h3 className="story-title">
            Unsere Geschichte
          </h3>
          <p className="story-text">
            Wilma entstand aus der Erkenntnis, dass Hochzeitsplanung in Österreich oft stressig und überwältigend ist. 
            Als Jonas und Karina Hochzeiten von Freunden planten, erlebten sie die Herausforderungen hautnah. 
            Zusammen mit Simons technischer Expertise entwickelten sie eine KI-gestützte Lösung, 
            die Paaren hilft, ihre Traumhochzeit stressfrei und effizient zu planen.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card-container">
              <div 
                className={`team-card ${flippedCard === index ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                style={{ '--member-color': member.color } as React.CSSProperties}
              >
                {/* Front of card */}
                <div className="card-front">
                  <div className="member-avatar">
                    {member.image}
                  </div>
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                  <div className="member-expertise">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="expertise-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flip-hint">
                    Klicken für mehr Details
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="card-back">
                  <div className="member-avatar back">
                    {member.name === "Jonas Behrmann" ? (
                      <img src="/JB_landing_portrait.png" alt="Jonas Behrmann" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', boxShadow: '0 6px 24px rgba(0,0,0,0.18)', marginTop: '12px', background: 'none' }} />
                    ) : (
                      member.image
                    )}
                  </div>
                  <h4 className="member-name back">{member.name}</h4>
                  <p className="member-role back">{member.role}</p>
                  <p className="member-description back">{member.backDescription}</p>
                  <ul className="achievements-list">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="achievement-item">
                        <span className="achievement-icon">🏆</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="contact-info">
                    <p className="contact-email">{member.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mission-section">
          <h3 className="mission-title">
            🎯 Unsere Mission
          </h3>
          <p className="mission-text">
            Wir glauben daran, dass jede Hochzeit einzigartig und wunderschön sein sollte. 
            Mit Wilma möchten wir Paaren in Österreich dabei helfen, ihre Traumhochzeit zu verwirklichen, 
            ohne dabei den Stress und die Komplexität traditioneller Planungsmethoden. 
            Durch KI-gestützte Tools und unsere lokale Expertise schaffen wir eine neue Ära der Hochzeitsplanung.
          </p>
        </div>
      </div>
    </section>
  );
} 