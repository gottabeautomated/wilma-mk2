"use client";
import Link from 'next/link';
import { useState } from 'react';
export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        // Newsletter-Anmeldung Logik hier
        setIsSubscribed(true);
        setEmail('');
        setTimeout(() => setIsSubscribed(false), 3000);
    };
    return (<footer className="footer">
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="footer-hearts" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 15c-3-6-12-6-15 0-3 6 0 12 15 24 15-12 18-18 15-24-3-6-12-6-15 0z" fill="%23FFE6EC" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23footer-hearts)"/></svg>') repeat;
          pointer-events: none;
        }
        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
          position: relative;
          z-index: 10;
        }
        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand {
          max-width: 400px;
        }
        .brand-logo {
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #FFE6EC, #D9F6EF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }
        .brand-description {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .newsletter-form {
          margin-bottom: 2rem;
        }
        .newsletter-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #f9fafb;
        }
        .newsletter-input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #374151;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .newsletter-input:focus {
          outline: none;
          border-color: #FFE6EC;
          background: rgba(255, 255, 255, 0.15);
        }
        .newsletter-input::placeholder {
          color: #9ca3af;
        }
        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .newsletter-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(190, 24, 93, 0.3);
        }
        .newsletter-success {
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1d5db;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }
        .social-link:hover {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          transform: translateY(-2px);
        }
        .footer-section {
          min-width: 0;
        }
        .footer-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #f9fafb;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-link {
          margin-bottom: 0.75rem;
        }
        .footer-link a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-link a:hover {
          color: #FFE6EC;
        }
        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copyright {
          color: #9ca3af;
          font-size: 0.9rem;
        }
        .footer-legal {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .footer-legal a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        .footer-legal a:hover {
          color: #FFE6EC;
        }
        .austria-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #fca5a5;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(220, 38, 38, 0.2);
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-legal {
            justify-content: center;
          }
          .newsletter-input-group {
            flex-direction: column;
          }
        }
      `}</style>
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">Wilma 💍</div>
            <p className="brand-description">
              Deine KI-Hochzeitsplanerin für Österreich. Wir machen Hochzeitsplanung 
              stressfrei, persönlich und voller Freude. Lass uns gemeinsam deine 
              Traumhochzeit planen!
            </p>
            <div className="newsletter-form">
              <h4 className="newsletter-title">📧 Newsletter abonnieren</h4>
              {isSubscribed ? (<div className="newsletter-success">
                  ✅ Danke! Du erhältst bald Hochzeitstipps von Wilma.
                </div>) : (<form onSubmit={handleNewsletterSubmit}>
                  <div className="newsletter-input-group">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="deine.email@beispiel.at" className="newsletter-input" required/>
                    <button type="submit" className="newsletter-button">
                      Abonnieren
                    </button>
                  </div>
                </form>)}
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Pinterest">📌</a>
              <a href="#" className="social-link" aria-label="TikTok">🎵</a>
            </div>
            <div className="austria-badge">
              🇦🇹 Proudly made in Austria
            </div>
          </div>

          {/* Tools Section */}
          <div className="footer-section">
            <h4 className="footer-title">🚀 KI-Tools</h4>
            <ul className="footer-links">
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_BUDGET_TOOL_URL || "#budget"}>
                  🧮 Budget-Rechner
                </Link>
              </li>
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_TIMELINE_TOOL_URL || "#timeline"}>
                  📅 Timeline-Generator
                </Link>
              </li>
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_GUESTS_TOOL_URL || "#guests"}>
                  👥 Gästeliste-Manager
                </Link>
              </li>
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_VENUE_TOOL_URL || "#venue"}>
                  🏛️ Venue-Analyzer
                </Link>
              </li>
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_WELLNESS_TOOL_URL || "#wellness"}>
                  🧘 Wellness-Planer
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Section */}
          <div className="footer-section">
            <h4 className="footer-title">💍 Plattform</h4>
            <ul className="footer-links">
              <li className="footer-link">
                <Link href="#auth">🔑 Anmelden</Link>
              </li>
              <li className="footer-link">
                <Link href="#pricing">💰 Preise</Link>
              </li>
              <li className="footer-link">
                <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "#dashboard"}>
                  📊 Dashboard
                </Link>
              </li>
              <li className="footer-link">
                <Link href="#features">✨ Features</Link>
              </li>
              <li className="footer-link">
                <Link href="#faq">❓ FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h4 className="footer-title">🤝 Support</h4>
            <ul className="footer-links">
              <li className="footer-link">
                <Link href="#contact">📞 Kontakt</Link>
              </li>
              <li className="footer-link">
                <a href="mailto:hello@wilma.at">📧 hello@wilma.at</a>
              </li>
              <li className="footer-link">
                <a href="tel:+431234567890">📱 +43 1 234 567 890</a>
              </li>
              <li className="footer-link">
                <Link href="/help">🆘 Hilfe-Center</Link>
              </li>
              <li className="footer-link">
                <Link href="/blog">📝 Blog</Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h4 className="footer-title">🏢 Unternehmen</h4>
            <ul className="footer-links">
              <li className="footer-link">
                <Link href="/about">👥 Über uns</Link>
              </li>
              <li className="footer-link">
                <Link href="/careers">💼 Karriere</Link>
              </li>
              <li className="footer-link">
                <Link href="/press">📰 Presse</Link>
              </li>
              <li className="footer-link">
                <Link href="/partners">🤝 Partner</Link>
              </li>
              <li className="footer-link">
                <Link href="/affiliate">💎 Affiliate</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 Wilma. Alle Rechte vorbehalten. Made with 💕 in Austria.
          </div>
          <div className="footer-legal">
            <Link href="/privacy">Datenschutz</Link>
            <Link href="/terms">AGB</Link>
            <Link href="/imprint">Impressum</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>);
}
