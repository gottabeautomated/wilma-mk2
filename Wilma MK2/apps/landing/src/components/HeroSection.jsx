"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function HeroSection() {
    const [currentTool, setCurrentTool] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const tools = [
        {
            icon: "🧮",
            name: "Budget-Rechner",
            description: "Intelligente Budgetplanung mit österreichischen Marktdaten",
            url: process.env.NEXT_PUBLIC_BUDGET_TOOL_URL || "#budget",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: "📅",
            name: "Timeline-Generator",
            description: "Automatische Zeitplanung mit Vendor-Koordination",
            url: process.env.NEXT_PUBLIC_TIMELINE_TOOL_URL || "#timeline",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: "👥",
            name: "Gästeliste-Manager",
            description: "RSVP-Tracking und Sitzplan-Optimierung",
            url: process.env.NEXT_PUBLIC_GUESTS_TOOL_URL || "#guests",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: "🏛️",
            name: "Venue-Analyzer",
            description: "KI-gestützte Location-Analyse für Österreich",
            url: process.env.NEXT_PUBLIC_VENUE_TOOL_URL || "#venue",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: "🧘",
            name: "Wellness-Planer",
            description: "Stress-Assessment und Entspannungs-Tipps",
            url: process.env.NEXT_PUBLIC_WELLNESS_TOOL_URL || "#wellness",
            color: "from-amber-500 to-orange-500"
        }
    ];
    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTool((prev) => (prev + 1) % tools.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [tools.length]);
    return (<section className="hero-section">
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            #FFE6EC 0%, 
            #D9F6EF 50%, 
            #FFF8F2 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 2rem;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hero-hearts" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 20c-4-8-16-8-20 0-4 8 0 16 20 32 20-16 24-24 20-32-4-8-16-8-20 0z" fill="%23FFE6EC" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23hero-hearts)"/></svg>') repeat;
          pointer-events: none;
        }
        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        .hero-content {
          text-align: left;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid #FFE6EC;
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          margin-bottom: 2rem;
          font-size: 1rem;
          font-weight: 600;
          color: #be185d;
          box-shadow: 0 4px 20px rgba(190, 24, 93, 0.1);
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out' : 'none'};
        }
        .hero-title {
          font-family: 'Montserrat', 'Nunito', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none'};
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'};
        }
        .hero-cta-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'};
        }
        .cta-primary {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(190, 24, 93, 0.3);
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(190, 24, 93, 0.4);
        }
        .cta-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #be185d;
          padding: 1rem 2.5rem;
          border: 2px solid #FFE6EC;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .cta-secondary:hover {
          background: #FFE6EC;
          transform: translateY(-2px);
        }
        .hero-stats {
          display: flex;
          gap: 2rem;
          animation: ${isVisible ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none'};
        }
        .stat-item {
          text-align: center;
        }
        .stat-number {
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #be185d;
          display: block;
        }
        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }
        .hero-tools {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          animation: ${isVisible ? 'fadeInRight 1s ease-out 0.4s both' : 'none'};
        }
        .tool-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          border: 2px solid transparent;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .tool-card:hover {
          transform: translateY(-5px);
          border-color: #FFE6EC;
          box-shadow: 0 20px 50px rgba(190, 24, 93, 0.15);
        }
        .tool-card.active {
          border-color: #be185d;
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 25px 60px rgba(190, 24, 93, 0.2);
        }
        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--tool-color, #be185d));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tool-card:hover::before,
        .tool-card.active::before {
          opacity: 1;
        }
        .tool-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }
        .tool-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .tool-description {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.5;
        }
        .austria-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(220, 38, 38, 0.2);
          animation: ${isVisible ? 'fadeIn 1s ease-out 1s both' : 'none'};
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .hero-tools {
            grid-template-columns: 1fr;
          }
          .hero-cta-group {
            flex-direction: column;
            align-items: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .austria-badge {
            position: static;
            margin-bottom: 1rem;
          }
        }
      `}</style>
      <div className="hero-container">
        {/* Content Side */}
        <div className="hero-content">
          <div className="hero-badge">
            💍 Deine KI-Hochzeitsplanerin
          </div>
          <h1 className="hero-title">
            Hey, schön dass du da bist!<br />
            Lass uns gemeinsam deine <span className="highlight">Traumhochzeit</span> planen
          </h1>
          <p className="hero-subtitle">
            Mach dir keinen Kopf, falls du mal nicht weiterweißt – mit Wilma wird deine Hochzeitsplanung 
            stressfrei, persönlich und voller Freude. Speziell für Österreich entwickelt. 🇦🇹
          </p>
          <div className="hero-cta-group">
            <Link href="#auth" className="cta-primary">
              ✨ Jetzt kostenlos starten
            </Link>
            <Link href="#features" className="cta-secondary">
              🔍 Tools entdecken
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2.500+</span>
              <span className="stat-label">Glückliche Paare</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Zufriedenheit</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50%</span>
              <span className="stat-label">Weniger Stress</span>
            </div>
          </div>
        </div>
        
        {/* Tools Preview Side */}
        <div className="hero-tools">
          <div className="austria-badge">
            🇦🇹 Made in Austria
          </div>
          {tools.map((tool, index) => (<Link key={index} href={tool.url} className={`tool-card ${currentTool === index ? 'active' : ''}`} style={{ '--tool-color': `linear-gradient(135deg, ${tool.color.split(' ')[1]}, ${tool.color.split(' ')[3]})` }} onMouseEnter={() => setCurrentTool(index)}>
              <span className="tool-icon">{tool.icon}</span>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-description">{tool.description}</p>
            </Link>))}
        </div>
      </div>
    </section>);
}
