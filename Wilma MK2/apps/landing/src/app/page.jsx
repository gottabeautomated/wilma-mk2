import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import PricingSection from '../components/PricingSection';
import AuthSection from '../components/AuthSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
export default function HomePage() {
    return (<>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      
      <main className="min-h-screen">
        {/* Hero Section - Wilma's empathetic welcome */}
        <HeroSection />
        
        {/* Features Section - 5 Core AI Tools */}
        <FeaturesSection />
        
        {/* About Section - Team presentation */}
        <AboutSection />
        
        {/* Pricing Section - Monthly vs Lifetime */}
        <PricingSection />
        
        {/* Auth Section - Login/Register */}
        <AuthSection />
        
        {/* FAQ Section - Common questions */}
        <FAQSection />
        
        {/* Contact Section - Get in touch */}
        <ContactSection />
        
        {/* Footer - Links and newsletter */}
        <Footer />
      </main>
      
      {/* Global Styles for Wilma Brand */}
      <style jsx global>{`
        :root {
          --wilma-rosa: #FFE6EC;
          --wilma-mint: #D9F6EF;
          --wilma-creme: #FFF8F2;
          --wilma-accent: #34495E;
          --wilma-primary: #be185d;
          --wilma-secondary: #7c3aed;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #1f2937;
          margin: 0;
          padding: 0;
        }
        
        .font-serif {
          font-family: 'Montserrat', sans-serif;
        }
        
        /* Smooth animations */
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Scroll reveal animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, var(--wilma-primary), var(--wilma-secondary));
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #a21650, #6d28d9);
        }
        
        /* Focus styles for accessibility */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid var(--wilma-primary);
          outline-offset: 2px;
        }
        
        /* Selection styles */
        ::selection {
          background: var(--wilma-rosa);
          color: var(--wilma-primary);
        }
        
        /* Smooth transitions for interactive elements */
        button,
        a,
        input,
        textarea,
        select {
          transition: all 0.3s ease;
        }
        
        /* Responsive typography */
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
        
        /* Print styles */
        @media print {
          * {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </>);
}
