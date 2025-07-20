"use client";
import { useState } from 'react';
export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        weddingDate: '',
        budget: '',
        preferredContact: 'email'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            // Hier würde normalerweise die E-Mail-Versand-Logik stehen
            // Für jetzt simulieren wir eine erfolgreiche Übermittlung
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                weddingDate: '',
                budget: '',
                preferredContact: 'email'
            });
        }
        catch (error) {
            setSubmitStatus('error');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<section id="contact" className="contact-section">
      <style jsx>{`
        .contact-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, 
            #f8fafc 0%, 
            #f1f5f9 50%, 
            #e2e8f0 100%);
          position: relative;
          overflow: hidden;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="contact-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1.5" fill="%23be185d" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23contact-dots)"/></svg>') repeat;
          pointer-events: none;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-content {
          text-align: left;
        }
        .contact-badge {
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
        .contact-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .contact-info {
          margin-bottom: 2rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          border: 1px solid rgba(190, 24, 93, 0.1);
        }
        .contact-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }
        .contact-details h4 {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        .contact-details p {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .contact-form-container {
          background: white;
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .contact-form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #be185d, #7c3aed, #2563eb);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #be185d;
          background: white;
          box-shadow: 0 0 0 3px rgba(190, 24, 93, 0.1);
        }
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .radio-group {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .radio-input {
          accent-color: #be185d;
        }
        .submit-button {
          width: 100%;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(190, 24, 93, 0.3);
        }
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .submit-button.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .status-message {
          text-align: center;
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          font-weight: 600;
        }
        .status-success {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .status-error {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .contact-form-container {
            padding: 2rem 1.5rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="container">
        <div className="contact-grid">
          {/* Content Side */}
          <div className="contact-content">
            <div className="contact-badge">
              📞 Kontaktieren Sie uns
            </div>
            <h2 className="contact-title">
              Lassen Sie uns Ihre Traumhochzeit planen
            </h2>
            <p className="contact-subtitle">
              Haben Sie Fragen zu Wilma oder möchten Sie eine persönliche Beratung? 
              Unser Team hilft Ihnen gerne weiter und steht Ihnen für alle Fragen zur Verfügung.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>E-Mail</h4>
                  <p>hello@wilma.at</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h4>Telefon</h4>
                  <p>+43 1 234 567 890</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Adresse</h4>
                  <p>Wien, Österreich</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h4>Öffnungszeiten</h4>
                  <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
                </div>
              </div>
            </div>
          </div>
          {/* Form Side */}
          <div className="contact-form-container">
            <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
              Senden Sie uns eine Nachricht
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Ihr vollständiger Name" required/>
                </div>
                <div className="form-group">
                  <label className="form-label">E-Mail *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="ihre.email@beispiel.at" required/>
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" placeholder="+43 123 456 789"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Betreff *</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="form-select" required>
                    <option value="">Bitte wählen Sie</option>
                    <option value="allgemein">Allgemeine Anfrage</option>
                    <option value="beratung">Persönliche Beratung</option>
                    <option value="demo">Demo anfordern</option>
                    <option value="support">Technischer Support</option>
                    <option value="partnerschaft">Partnerschaft</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Hochzeitsdatum</label>
                  <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleInputChange} className="form-input"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget-Rahmen</label>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} className="form-select">
                    <option value="">Bitte wählen Sie</option>
                    <option value="unter-10000">Unter €10.000</option>
                    <option value="10000-20000">€10.000 - €20.000</option>
                    <option value="20000-35000">€20.000 - €35.000</option>
                    <option value="35000-50000">€35.000 - €50.000</option>
                    <option value="ueber-50000">Über €50.000</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Bevorzugter Kontakt</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="preferredContact" value="email" checked={formData.preferredContact === 'email'} onChange={handleInputChange} className="radio-input"/>
                      <span>E-Mail</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="preferredContact" value="phone" checked={formData.preferredContact === 'phone'} onChange={handleInputChange} className="radio-input"/>
                      <span>Telefon</span>
                    </label>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Ihre Nachricht *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-textarea" placeholder="Erzählen Sie uns von Ihrer Traumhochzeit und wie wir Ihnen helfen können..." required/>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className={`submit-button ${isSubmitting ? 'loading' : ''}`}>
                {isSubmitting ? 'Wird gesendet...' : '📤 Nachricht senden'}
              </button>
              {submitStatus === 'success' && (<div className="status-message status-success">
                  ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </div>)}
              {submitStatus === 'error' && (<div className="status-message status-error">
                  ❌ Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.
                </div>)}
            </form>
          </div>
        </div>
      </div>
    </section>);
}
