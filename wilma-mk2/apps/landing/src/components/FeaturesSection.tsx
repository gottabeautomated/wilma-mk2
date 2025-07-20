"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      id: "budget",
      icon: "🧮",
      name: "KI-Budget-Rechner",
      tagline: "Intelligente Budgetplanung für deine Traumhochzeit",
      description: "Unser KI-gestützter Budget-Rechner analysiert österreichische Marktdaten und erstellt einen personalisierten Budgetplan. Von der Location bis zur Dekoration – alles perfekt kalkuliert.",
      benefits: [
        "Österreichische Marktpreise in Echtzeit",
        "Automatische Kategorien-Optimierung",
        "Saisonale Preis-Empfehlungen",
        "Vendor-Vergleich und Spartipps"
      ],
      url: process.env.NEXT_PUBLIC_BUDGET_TOOL_URL || "#budget",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      id: "timeline",
      icon: "📅",
      name: "Timeline-Generator",
      tagline: "Perfekte Zeitplanung ohne Stress",
      description: "Wilma erstellt automatisch deine optimale Hochzeits-Timeline. Basierend auf deinem Datum, der Location und deinen Wünschen – mit Puffern für entspannte Planung.",
      benefits: [
        "KI-optimierte Zeitpläne",
        "Vendor-Verfügbarkeit berücksichtigt",
        "Wetter-Backup-Pläne",
        "Automatische Erinnerungen"
      ],
      url: process.env.NEXT_PUBLIC_TIMELINE_TOOL_URL || "#timeline",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50"
    },
    {
      id: "guests",
      icon: "👥",
      name: "Gästeliste-Manager",
      tagline: "RSVP-Tracking und Sitzplan-Magie",
      description: "Verwalte deine Gäste intelligent: Von der Einladung bis zum perfekten Sitzplan. Wilma koordiniert RSVPs, Diätwünsche und erstellt optimale Tischaufteilungen.",
      benefits: [
        "Automatisches RSVP-Tracking",
        "KI-optimierte Sitzpläne",
        "Diät-Koordination mit Catering",
        "Geschenke-Verwaltung"
      ],
      url: process.env.NEXT_PUBLIC_GUESTS_TOOL_URL || "#guests",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      id: "venue",
      icon: "🏛️",
      name: "Venue-Analyzer",
      tagline: "Die perfekte Location finden",
      description: "Lade Fotos deiner Wunsch-Locations hoch und Wilma analysiert Stil, Kapazität und Eignung. Mit Empfehlungen für Dekoration und passende Vendors.",
      benefits: [
        "KI-Foto-Analyse von Locations",
        "Stil-Matching mit deinen Wünschen",
        "Kapazitäts-Berechnung",
        "Österreichische Venue-Datenbank"
      ],
      url: process.env.NEXT_PUBLIC_VENUE_TOOL_URL || "#venue",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
    },
    {
      id: "wellness",
      icon: "🧘",
      name: "Wellness-Planer",
      tagline: "Entspannt zur Traumhochzeit",
      description: "Hochzeitsplanung kann stressig sein – muss sie aber nicht! Wilma überwacht dein Stress-Level und gibt personalisierte Wellness-Tipps für entspannte Planung.",
      benefits: [
        "Stress-Level Monitoring",
        "Personalisierte Entspannungs-Tipps",
        "Planungs-Pausen-Erinnerungen",
        "Achtsamkeits-Übungen"
      ],
      url: process.env.NEXT_PUBLIC_WELLNESS_TOOL_URL || "#wellness",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="features-section">
      <style jsx>{`
        .features-section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          position: relative;
          overflow: hidden;
        }
        .features-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="features-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23FFE6EC" opacity="0.6"/></pattern></defs><rect width="100" height="100" fill="url(%23features-dots)"/></svg>') repeat;
          pointer-events: none;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out' : 'none'};
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 230, 236, 0.8);
          border: 2px solid #FFE6EC;
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #be185d;
          backdrop-filter: blur(10px);
        }
        .section-title {
          font-family: 'Montserrat', 'Nunito', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          max-width: 800px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .austria-highlight {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: start;
        }
        .features-nav {
          position: sticky;
          top: 2rem;
        }
        .nav-item {
          display: block;
          padding: 1.5rem 2rem;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid transparent;
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
          animation: ${isVisible ? 'fadeInLeft 0.6s ease-out' : 'none'};
        }
        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-item:nth-child(3) { animation-delay: 0.3s; }
        .nav-item:nth-child(4) { animation-delay: 0.4s; }
        .nav-item:nth-child(5) { animation-delay: 0.5s; }
        .nav-item:hover {
          border-color: #FFE6EC;
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(190, 24, 93, 0.1);
        }
        .nav-item.active {
          border-color: #be185d;
          background: rgba(255, 230, 236, 0.3);
          transform: translateX(15px);
          box-shadow: 0 15px 40px rgba(190, 24, 93, 0.15);
        }
        .nav-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        .nav-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        .nav-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .feature-content {
          animation: ${isVisible ? 'fadeInRight 0.8s ease-out 0.3s both' : 'none'};
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--feature-color));
        }
        .feature-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .feature-icon {
          font-size: 3rem;
          padding: 1rem;
          background: var(--feature-bg);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .feature-info h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .feature-tagline {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }
        .feature-description {
          font-size: 1.1rem;
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .benefits-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .benefit-icon {
          color: #10b981;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .benefit-text {
          color: #374151;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .feature-cta {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .cta-primary {
          background: linear-gradient(135deg, var(--feature-color));
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        .cta-secondary {
          color: #6b7280;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease;
        }
        .cta-secondary:hover {
          color: #be185d;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .features-nav {
            position: static;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .nav-item {
            padding: 1rem;
            text-align: center;
          }
          .nav-item:hover,
          .nav-item.active {
            transform: none;
          }
          .benefits-list {
            grid-template-columns: 1fr;
          }
          .feature-cta {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            🚀 Deine KI-Tools
          </div>
          <h2 className="section-title">
            Alles was du für deine Traumhochzeit brauchst
          </h2>
          <p className="section-subtitle">
            Wilma bringt dir 5 intelligente Tools, die deine Hochzeitsplanung revolutionieren. 
            Jedes Tool nutzt KI, um dir personalisierte Empfehlungen zu geben.
          </p>
          <div className="austria-highlight">
            🇦🇹 Speziell für Österreich entwickelt
          </div>
        </div>

        <div className="features-grid">
          {/* Navigation */}
          <div className="features-nav">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className={`nav-item ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <span className="nav-icon">{feature.icon}</span>
                <div className="nav-title">{feature.name}</div>
                <div className="nav-subtitle">{feature.tagline}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="feature-content">
            {features.map((feature, index) => (
              activeFeature === index && (
                <div 
                  key={feature.id}
                  className="feature-card"
                  style={{ 
                    '--feature-color': `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                    '--feature-bg': feature.bgColor.replace('bg-gradient-to-br', 'linear-gradient(135deg,').replace('from-', '').replace('to-', ', ')
                  } as React.CSSProperties}
                >
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-info">
                      <h3>{feature.name}</h3>
                      <div className="feature-tagline">{feature.tagline}</div>
                    </div>
                  </div>
                  
                  <p className="feature-description">
                    {feature.description}
                  </p>
                  
                  <div className="benefits-list">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span className="benefit-text">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="feature-cta">
                    <Link href={feature.url} className="cta-primary">
                      🚀 Tool ausprobieren
                    </Link>
                    <Link href="#pricing" className="cta-secondary">
                      💰 Preise ansehen →
                    </Link>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
