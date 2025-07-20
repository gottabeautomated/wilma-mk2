"use client";
import { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Wie unterscheidet sich Wilma von anderen Hochzeitsplanern?",
      answer: "Wilma ist die erste KI-gestützte Hochzeitsplanung speziell für Österreich. Unsere Preisdatenbank, Venue-Empfehlungen und Vendor-Netzwerk sind ausschließlich auf den österreichischen Markt optimiert."
    },
    {
      question: "Kann ich jederzeit kündigen?",
      answer: "Ja! Bei unserem monatlichen Plan können Sie jederzeit ohne Kündigungsfrist kündigen. Bei der Lifetime-Option erhalten Sie lebenslangen Zugang ohne weitere Kosten."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren alle gängigen Kreditkarten, PayPal, Klarna und SEPA-Lastschrift. Alle Zahlungen sind SSL-verschlüsselt und DSGVO-konform."
    },
    {
      question: "Gibt es eine Geld-zurück-Garantie?",
      answer: "Ja! Sie haben 30 Tage Geld-zurück-Garantie, ohne Fragen zu stellen. Wenn Wilma nicht Ihre Erwartungen erfüllt, erstatten wir Ihnen den vollen Betrag."
    },
    {
      question: "Funktioniert Wilma auch außerhalb Österreichs?",
      answer: "Wilma ist speziell für Österreich optimiert, funktioniert aber auch in Deutschland und der Schweiz. Unsere Preisdatenbank und Vendor-Empfehlungen sind jedoch am besten für den österreichischen Markt."
    },
    {
      question: "Wie funktioniert die KI-Unterstützung?",
      answer: "Unsere KI analysiert Ihre Präferenzen, Budget und Timeline, um personalisierte Empfehlungen zu geben. Sie lernt aus jeder Interaktion und wird mit der Zeit immer präziser."
    },
    {
      question: "Kann ich meine Daten exportieren?",
      answer: "Selbstverständlich! Alle Ihre Daten können jederzeit als PDF oder Excel exportiert werden. Sie behalten immer die volle Kontrolle über Ihre Hochzeitspläne."
    },
    {
      question: "Gibt es Support auf Deutsch?",
      answer: "Ja! Unser gesamter Support ist auf Deutsch verfügbar. Zusätzlich bietet unsere KI 24/7 Unterstützung in deutscher Sprache."
    }
  ];

  return (
    <section className="faq-section">
      <style jsx>{`
        .faq-section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
          position: relative;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
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
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .section-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .faq-item {
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .faq-question {
          width: 100%;
          padding: 1.5rem 2rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        .faq-question:hover {
          color: #be185d;
        }
        .faq-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
          color: #be185d;
        }
        .faq-icon.open {
          transform: rotate(45deg);
        }
        .faq-answer {
          padding: 0 2rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          color: #6b7280;
          line-height: 1.6;
        }
        .faq-answer.open {
          max-height: 200px;
          padding: 0 2rem 1.5rem;
        }
        .contact-cta {
          text-align: center;
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(190, 24, 93, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(190, 24, 93, 0.1);
        }
        .contact-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .contact-text {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .contact-button {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(190, 24, 93, 0.3);
        }
        @media (max-width: 768px) {
          .faq-question {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
          .faq-answer.open {
            padding: 0 1.5rem 1rem;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            ❓ Häufige Fragen
          </div>
          <h2 className="section-title">
            Alles was Sie wissen müssen
          </h2>
          <p className="section-subtitle">
            Hier finden Sie Antworten auf die häufigsten Fragen zu Wilma und unserer Hochzeitsplanung.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={`faq-icon ${openFAQ === index ? 'open' : ''}`}>
                  +
                </span>
              </button>
              <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        <div className="contact-cta">
          <h3 className="contact-title">
            🤝 Noch Fragen?
          </h3>
          <p className="contact-text">
            Unser Team hilft Ihnen gerne weiter. Kontaktieren Sie uns für eine persönliche Beratung.
          </p>
          <a href="mailto:hello@wilma.at" className="contact-button">
            📧 Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
} 