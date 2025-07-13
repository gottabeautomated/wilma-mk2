/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neue elegante Farbpalette
        primary: {
          50: '#FDFDFD',
          100: '#F9F3F0',  // Soft Rosé
          200: '#E6D4C1',  // Unterton-Hintergrund
          300: '#DBC2A4',  // Champagner
          400: '#9D7D6A',  // Akzentfarbe
          500: '#7A6152',
          600: '#5D4A3E',
          700: '#453529',
          800: '#2D231A',
          900: '#1A140D',
        },
        graphite: '#353535',
        champagne: '#DBC2A4',
        accent: '#9D7D6A',
        softrose: '#F9F3F0',
        undertone: '#E6D4C1',
        royal: '#6B46C1',      // Royales Lila
        'royal-light': '#8B5CF6', // Helles Royallila
        'royal-dark': '#553C9A',   // Dunkles Royallila
        gold: '#D4AF37',           // Elegantes Gold
        'gold-light': '#F4E4A6',   // Helles Gold
        'gold-dark': '#B8941F',    // Dunkles Gold
        moss: '#6B7F5B',           // Moosgrün
        'moss-light': '#8FA584',   // Helles Moosgrün
        'moss-dark': '#4A5A41',    // Dunkles Moosgrün
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 2px 6px rgba(0, 0, 0, 0.05)',
        'elegant-lg': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'elegant-xl': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'golden': '0 2px 8px rgba(157, 125, 106, 0.15)',
        'royal': '0 4px 16px rgba(107, 70, 193, 0.2)',
        'royal-lg': '0 8px 32px rgba(107, 70, 193, 0.3)',
        'gold': '0 4px 16px rgba(212, 175, 55, 0.15)',
        'moss': '0 4px 16px rgba(107, 127, 91, 0.15)',
      },
      borderRadius: {
        'elegant': '12px',
        'elegant-lg': '16px',
        'elegant-xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'gentle-float': 'gentleFloat 3s ease-in-out infinite',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
} 