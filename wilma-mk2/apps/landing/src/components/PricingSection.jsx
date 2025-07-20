"use client";
import { useState } from 'react';
import Link from 'next/link';
export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const [hoveredPlan, setHoveredPlan] = useState(null);
    return (<section id="pricing" className="pricing-section">
      <style jsx>{`
        .pricing-section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, 
            #fafafa 0%, 
            #ffffff 50%, 
            #fdf2f8 100%);
          position: relative;
          overflow: hidden;
        }
        .pricing-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23db2777" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>') repeat;
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
          margin-bottom: 4rem;
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
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        .austria-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 25px;
          padding: 0.5rem 1rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #dc2626;
        }
        .pricing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .toggle-option {
          font-size: 1.1rem;
          font-weight: 500;
          color: #6b7280;
          transition: color 0.3s ease;
        }
        .toggle-option.active {
          color: #be185d;
        }
        .toggle-switch {
          position: relative;
          width: 60px;
          height: 30px;
          background: ${isYearly ? '#be185d' : '#d1d5db'};
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .toggle-knob {
          position: absolute;
          top: 3px;
          left: ${isYearly ? '33px' : '3px'};
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .savings-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }
        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .pricing-card {
          background: white;
          border-radius: 24px;
          padding: 3rem 2rem;
          position: relative;
          transition: all 0.4s ease;
          border: 2px solid transparent;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #be185d, #7c3aed, #2563eb);
        }
        .pricing-card.popular {
          border-color: #be185d;
          box-shadow: 0 20px 60px rgba(190, 24, 93, 0.2);
          transform: scale(1.05);
        }
        .pricing-card.popular::after {
          content: 'Beliebteste Wahl';
          position: absolute;
          top: 20px;
          right: -30px;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          padding: 0.5rem 2rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          transform: rotate(45deg);
        }
        .pricing-card:hover {
          transform: translateY(-10px) ${hoveredPlan === 'lifetime' ? 'scale(1.05)' : ''};
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
        .plan-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .plan-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        .plan-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .plan-description {
          color: #6b7280;
          font-size: 1rem;
        }
        .plan-price {
          text-align: center;
          margin-bottom: 2rem;
        }
        .price-amount {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3rem;
          font-weight: 700;
          color: #be185d;
          line-height: 1;
        }
        .price-period {
          color: #6b7280;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .price-note {
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }
        .plan-features {
          margin-bottom: 2.5rem;
        }
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .feature-item:last-child {
          border-bottom: none;
        }
        .feature-icon {
          color: #10b981;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .feature-text {
          color: #4b5563;
          font-size: 0.95rem;
        }
        .cta-button {
          width: 100%;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .cta-primary {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          box-shadow: 0 10px 25px rgba(190, 24, 93, 0.3);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(190, 24, 93, 0.4);
        }
        .cta-secondary {
          background: rgba(190, 24, 93, 0.1);
          color: #be185d;
          border: 2px solid rgba(190, 24, 93, 0.2);
        }
        .cta-secondary:hover {
          background: rgba(190, 24, 93, 0.2);
          transform: translateY(-2px);
        }
        .guarantee-section {
          text-align: center;
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .guarantee-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .guarantee-text {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .faq-preview {
          text-align: center;
          margin-top: 3rem;
          color: #6b7280;
        }
        .faq-link {
          color: #be185d;
          text-decoration: none;
          font-weight: 600;
        }
        .faq-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .pricing-cards {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          .pricing-card.popular {
            transform: none;
          }
          .trust-badges {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            💸 Transparent & Fair
          </div>
          <h2 className="section-title">
            Wählen Sie Ihren Weg zur Traumhochzeit
          </h2>
          <p className="section-subtitle">
            Keine versteckten Kosten. Keine Überraschungen. Nur faire Preise für Ihre perfekte Hochzeitsplanung.
          </p>
          <div className="austria-badge">
            🇦🇹 Made in Austria - DSGVO konform
          </div>
        </div>
        {/* Pricing Toggle */}
        <div className="pricing-toggle">
          <span className={`toggle-option ${!isYearly ? 'active' : ''}`}>
            Monatlich
          </span>
          <div className="toggle-switch" onClick={() => setIsYearly(!isYearly)}>
            <div className="toggle-knob"></div>
          </div>
          <span className={`toggle-option ${isYearly ? 'active' : ''}`}>
            Einmalzahlung
            <span className="savings-badge">10% sparen</span>
          </span>
        </div>
        {/* Pricing Cards */}
        <div className="pricing-cards">
          {/* Monthly Plan */}
          <div className={`pricing-card ${isYearly ? '' : 'popular'}`} onMouseEnter={() => setHoveredPlan('monthly')} onMouseLeave={() => setHoveredPlan(null)}>
            <div className="plan-header">
              <span className="plan-icon">📅</span>
              <h3 className="plan-name">Monatlich</h3>
              <p className="plan-description">
                Flexibel & jederzeit kündbar
              </p>
            </div>
            <div className="plan-price">
              <div className="price-amount">€10</div>
              <div className="price-period">pro Monat</div>
              <div className="price-note">Jederzeit kündbar</div>
            </div>
            <div className="plan-features">
              <ul className="features-list">
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">KI-gestützte Budgetplanung</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Automatische Timeline-Erstellung</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Venue Analyzer für AT</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Gästeverwaltung & RSVP</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Wellness & Stress-Tracking</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">24/7 KI-Support</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Österreichische Vendor-DB</span>
                </li>
              </ul>
            </div>
            <Link href="/signup?plan=monthly" className="cta-button cta-secondary">
              🚀 Jetzt starten
            </Link>
          </div>
          {/* Lifetime Plan */}
          <div className={`pricing-card ${isYearly ? 'popular' : ''}`} onMouseEnter={() => setHoveredPlan('lifetime')} onMouseLeave={() => setHoveredPlan(null)}>
            <div className="plan-header">
              <span className="plan-icon">💍</span>
              <h3 className="plan-name">Lifetime</h3>
              <p className="plan-description">
                Einmal zahlen, für immer nutzen
              </p>
            </div>
            <div className="plan-price">
              <div className="price-amount">€99</div>
              <div className="price-period">einmalig</div>
              <div className="price-note">Sparen Sie €21!</div>
            </div>
            <div className="plan-features">
              <ul className="features-list">
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Alle Features inklusive</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Lebenslanger Zugang</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Alle zukünftigen Updates</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Premium KI-Features</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Prioritäts-Support</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Exklusive Templates</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">🎁</span>
                  <span className="feature-text"><strong>Bonus:</strong> Wedding Day App</span>
                </li>
              </ul>
            </div>
            <Link href="/signup?plan=lifetime" className="cta-button cta-primary">
              💍 Lifetime sichern
            </Link>
          </div>
        </div>
        {/* Guarantee Section */}
        <div className="guarantee-section">
          <h3 className="guarantee-title">
            🛡️ Unsere Zufriedenheitsgarantie
          </h3>
          <p className="guarantee-text">
            Nicht zufrieden? Geld zurück - ohne Fragen, innerhalb von 30 Tagen. 
            Ihre perfekte Hochzeit ist unser Versprechen.
          </p>
          <div className="trust-badges">
            <div className="trust-badge">
              <span>🔒</span>
              <span>SSL Verschlüsselt</span>
            </div>
            <div className="trust-badge">
              <span>🇦🇹</span>
              <span>Austrian DSGVO</span>
            </div>
            <div className="trust-badge">
              <span>💳</span>
              <span>Sichere Zahlung</span>
            </div>
            <div className="trust-badge">
              <span>⭐</span>
              <span>98% Zufriedenheit</span>
            </div>
          </div>
          <div className="faq-preview">
            <p>
              Fragen zu den Preisen? <br />
              <a href="#faq" className="faq-link">Lesen Sie unsere häufigen Fragen →</a>
            </p>
          </div>
        </div>
      </div>
    </section>);
}
