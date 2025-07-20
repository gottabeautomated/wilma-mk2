"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthService } from '../lib/auth';
const registerSchema = z.object({
    email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
    password: z.string()
        .min(8, 'Mindestens 8 Zeichen')
        .regex(/[A-Z]/, 'Mindestens ein Großbuchstabe')
        .regex(/[a-z]/, 'Mindestens ein Kleinbuchstabe')
        .regex(/[0-9]/, 'Mindestens eine Zahl')
        .regex(/[^A-Za-z0-9]/, 'Mindestens ein Sonderzeichen'),
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwörter stimmen nicht überein.',
    path: ['passwordConfirm'],
});
const loginSchema = z.object({
    email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
    password: z.string().min(1, 'Bitte gib dein Passwort ein.'),
    remember: z.boolean().optional(),
});
export default function AuthSection() {
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(false);
    // RHF für beide Modi
    const { register, handleSubmit, formState: { errors, isValid }, watch, reset, } = useForm({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema),
        mode: 'onChange',
    });
    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        if (isLogin) {
            // Login-Logik
            const { error } = await AuthService.signIn(data.email, data.password);
            setLoading(false);
            if (error)
                setServerError(error.message);
            // TODO: Redirect nach Login
        }
        else {
            // Registrierung
            const { error } = await AuthService.signUp({
                email: data.email,
                password: data.password,
            });
            setLoading(false);
            if (error)
                setServerError(error.message);
            else {
                setSuccess(true);
                reset();
            }
        }
    };
    return (<section id="auth" className="auth-section">
      <style jsx>{`
        .auth-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, 
            #fdf2f8 0%, 
            #f3e8ff 50%, 
            #dbeafe 100%);
          position: relative;
          overflow: hidden;
        }
        .auth-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hearts" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 10c-2.5-5-10-5-12.5 0-2.5 5 0 10 12.5 20 12.5-10 15-15 12.5-20-2.5-5-10-5-12.5 0z" fill="%23be185d" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23hearts)"/></svg>') repeat;
          pointer-events: none;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .auth-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .auth-content {
          text-align: left;
        }
        .auth-badge {
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
        .auth-title {
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
        .auth-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .auth-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .auth-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: #4b5563;
          font-size: 1rem;
        }
        .auth-feature-icon {
          color: #10b981;
          font-weight: 600;
        }
        .auth-form-container {
          background: white;
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .auth-form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #be185d, #7c3aed, #2563eb);
        }
        .auth-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 50px;
          padding: 0.25rem;
          margin-bottom: 2rem;
        }
        .toggle-button {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .toggle-button.active {
          background: white;
          color: #be185d;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        .form-input:focus {
          outline: none;
          border-color: #be185d;
          background: white;
          box-shadow: 0 0 0 3px rgba(190, 24, 93, 0.1);
        }
        .password-container {
          position: relative;
        }
        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 1.1rem;
        }
        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .checkbox-input {
          width: 1.2rem;
          height: 1.2rem;
          accent-color: #be185d;
        }
        .checkbox-label {
          font-size: 0.9rem;
          color: #6b7280;
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
          margin-bottom: 1.5rem;
        }
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(190, 24, 93, 0.3);
        }
        .divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
        }
        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e7eb;
        }
        .divider-text {
          background: white;
          padding: 0 1rem;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .social-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .social-button {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .social-button:hover {
          border-color: #be185d;
          color: #be185d;
        }
        .auth-footer {
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .auth-link {
          color: #be185d;
          text-decoration: none;
          font-weight: 600;
        }
        .auth-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .auth-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .auth-form-container {
            padding: 2rem 1.5rem;
          }
          .social-buttons {
            flex-direction: column;
          }
        }
      `}</style>
      <div className="container">
        <div className="auth-grid">
          {/* Content Side */}
          <div className="auth-content">
            <div className="auth-badge">
              🔐 Sichere Anmeldung
            </div>
            <h2 className="auth-title">
              Willkommen bei Wilma
            </h2>
            <p className="auth-subtitle">
              Starten Sie Ihre Hochzeitsplanung mit KI-Unterstützung. 
              Erstellen Sie Ihr Konto oder melden Sie sich an, um alle Features zu nutzen.
            </p>
            <ul className="auth-features">
              <li className="auth-feature">
                <span className="auth-feature-icon">✅</span>
                <span>KI-gestützte Hochzeitsplanung</span>
              </li>
              <li className="auth-feature">
                <span className="auth-feature-icon">✅</span>
                <span>Österreichische Vendor-Datenbank</span>
              </li>
              <li className="auth-feature">
                <span className="auth-feature-icon">✅</span>
                <span>DSGVO-konform & sicher</span>
              </li>
              <li className="auth-feature">
                <span className="auth-feature-icon">✅</span>
                <span>24/7 KI-Support auf Deutsch</span>
              </li>
            </ul>
          </div>
          {/* Form Side */}
          <div className="auth-form-container">
            <div className="auth-toggle">
              <button className={`toggle-button ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setSuccess(false); setServerError(null); reset(); }} type="button">
                Anmelden
              </button>
              <button className={`toggle-button ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setSuccess(false); setServerError(null); reset(); }} type="button">
                Registrieren
              </button>
            </div>
            {success && !isLogin ? (<div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 text-center border border-rose-100">
                <h2 className="text-2xl font-playfair text-rose-600 mb-4">E-Mail-Bestätigung</h2>
                <p className="mb-4">
                  Wir haben dir eine Bestätigungs-E-Mail geschickt. Bitte prüfe dein Postfach und folge dem Link, um deine Registrierung abzuschließen.
                </p>
              </div>) : (<form onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
                <div className="form-group">
                  <label className="form-label">E-Mail</label>
                  <input type="email" className="form-input" placeholder="ihre.email@beispiel.at" {...register('email')} autoComplete="email" required/>
                  {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Passwort</label>
                  <div className="password-container">
                    <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Ihr Passwort" {...register('password')} autoComplete={isLogin ? 'current-password' : 'new-password'} required/>
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password.message}</div>}
                </div>
                {!isLogin && (<div className="form-group">
                    <label className="form-label">Passwort bestätigen</label>
                    <div className="password-container">
                      <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Passwort wiederholen" {...register('passwordConfirm')} required/>
                    </div>
                    {errors.passwordConfirm && <div className="text-red-600 text-sm mt-1">{errors.passwordConfirm.message}</div>}
                  </div>)}
                {isLogin && (<div className="form-checkbox">
                    <input type="checkbox" className="checkbox-input" id="remember" {...register('remember')}/>
                    <label htmlFor="remember" className="checkbox-label">
                      Angemeldet bleiben
                    </label>
                  </div>)}
                {serverError && <div className="text-red-600 text-sm mb-2">{serverError}</div>}
                <button type="submit" className="submit-button" disabled={loading || !isValid}>
                  {loading ? 'Bitte warten...' : isLogin ? '🔑 Anmelden' : '✨ Konto erstellen'}
                </button>
                <div className="divider">
                  <span className="divider-text">oder</span>
                </div>
                <div className="social-buttons">
                  <button type="button" className="social-button" disabled>
                    <span>🔍</span>
                    <span>Google</span>
                  </button>
                  <button type="button" className="social-button" disabled>
                    <span>📘</span>
                    <span>Facebook</span>
                  </button>
                </div>
                <div className="auth-footer">
                  {isLogin ? (<>
                      <p>Passwort vergessen? <a href="#" className="auth-link">Zurücksetzen</a></p>
                      <p>Noch kein Konto? <button type="button" onClick={() => { setIsLogin(false); setSuccess(false); setServerError(null); reset(); }} className="auth-link">Jetzt registrieren</button></p>
                    </>) : (<>
                      <p>Bereits ein Konto? <button type="button" onClick={() => { setIsLogin(true); setSuccess(false); setServerError(null); reset(); }} className="auth-link">Anmelden</button></p>
                      <p>Mit der Registrierung stimmen Sie unseren <a href="/terms" className="auth-link">AGB</a> und <a href="/privacy" className="auth-link">Datenschutz</a> zu.</p>
                    </>)}
                </div>
              </form>)}
          </div>
        </div>
      </div>
    </section>);
}
