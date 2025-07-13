"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PricingSection from '../src/components/PricingSection';
import FAQSection from '../src/components/FAQSection';
import AuthSection from '../src/components/AuthSection';
import ContactSection from '../src/components/ContactSection';
import AboutSection from '../src/components/AboutSection';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-bg');
      if (hero) {
        (hero as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    setLoginOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    setLoginOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll mit Offset für Header
      const headerHeight = 80; // Geschätzte Header-Höhe
      const elementPosition = element.offsetTop - headerHeight;
      
      // Elegante Scroll-Animation
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      // Hervorhebung der Sektion nach dem Scrollen
      setTimeout(() => {
        // Füge Highlight-Klasse hinzu
        element.classList.add('section-highlight');
        
        // Temporäre Hervorhebung
        element.style.transition = 'all 0.6s ease';
        element.style.transform = 'scale(1.01)';
        element.style.boxShadow = '0 25px 50px rgba(190, 24, 93, 0.15)';
        element.style.borderRadius = '20px';
        
        // Entferne Highlight nach Animation
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.boxShadow = 'none';
          element.style.borderRadius = '';
          element.classList.remove('section-highlight');
        }, 600);
      }, 1000);
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow flex items-center justify-between px-6 py-3">
        <button onClick={scrollToTop} className="font-serif text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent focus:outline-none">
          Wilma
        </button>
        <div className="flex items-center gap-4">
          {/* Login Button */}
          <div className="relative">
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-200 flex items-center gap-2"
            >
              <span>🔑</span>
              <span>Login</span>
            </button>
            {/* Login Dropdown */}
            {loginOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-lg font-semibold text-gray-800">Willkommen zurück</h3>
                  <button 
                    onClick={() => setLoginOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="ihre.email@beispiel.at"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ihr Passwort"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="ml-2 text-sm text-gray-600">Angemeldet bleiben</span>
                    </label>
                    <a href="#" className="text-sm text-pink-600 hover:text-pink-700">Passwort vergessen?</a>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    🔑 Anmelden
                  </button>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Noch kein Konto? </span>
                    <a href="#auth" onClick={() => setLoginOpen(false)} className="text-sm text-pink-600 hover:text-pink-700 font-semibold">
                      Jetzt registrieren
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Menu Button */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 group"
            aria-label="Menü öffnen"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block w-7 h-0.5 bg-pink-600 mb-1.5 rounded transition-all duration-300 group-hover:bg-purple-600" style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <span className="block w-7 h-0.5 bg-pink-600 mb-1.5 rounded transition-all duration-300 group-hover:bg-purple-600" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-7 h-0.5 bg-pink-600 rounded transition-all duration-300 group-hover:bg-purple-600" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
        {/* Overlay-Menü */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur z-50 flex flex-col items-center justify-start pt-32 animate-fadeIn">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-8 text-3xl text-pink-600 font-bold">×</button>
            <nav className="flex flex-col gap-4 text-xl font-serif text-pink-700">
              <a href="#features" onClick={() => scrollToSection('features')} className="hover:text-purple-600 transition">Features</a>
              <a href="#pricing" onClick={() => scrollToSection('pricing')} className="hover:text-purple-600 transition">Preise</a>
              <a href="#" onClick={() => scrollToSection('contact')} className="hover:text-purple-600 transition">Kontakt</a>
              <a href="#auth" onClick={() => scrollToSection('auth')} className="hover:text-purple-600 transition">Registrierung</a>
            </nav>
          </div>
        )}
      </header>
      <div className="font-sans bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* ... Restlicher Onepager-Inhalt ... */}
        <AboutSection />
        <PricingSection />
        <FAQSection />
        <AuthSection />
        <ContactSection />
      </div>
    </>
  );
} 