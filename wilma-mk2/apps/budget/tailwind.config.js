/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wilma Brand Colors (aus Markenhandbuch)
        'wilma-rosa': '#FFE6EC',
        'wilma-mint': '#D9F6EF', 
        'wilma-creme': '#FFF8F2',
        'wilma-dark': '#34495E',
        
        // Erweiterte Farbpalette
        primary: {
          50: '#FFF8F2',   // Wilma Creme
          100: '#FFE6EC',  // Wilma Rosa
          200: '#FFD1DC',  // Heller Rosa
          300: '#FFBDCC',  // Rosa
          400: '#FF9FB3',  // Mittlerer Rosa
          500: '#FF8199',  // Kräftiger Rosa
          600: '#E6737F',  // Dunkler Rosa
          700: '#CC6566',  // Sehr dunkler Rosa
          800: '#B3574C',  // Braun-Rosa
          900: '#994933',  // Dunkelbraun
        },
        secondary: {
          50: '#D9F6EF',   // Wilma Mint
          100: '#C4F0E7',  // Heller Mint
          200: '#AFEADF',  // Mint
          300: '#9AE4D7',  // Mittlerer Mint
          400: '#85DECF',  // Kräftiger Mint
          500: '#70D8C7',  // Dunkler Mint
          600: '#5BC2B3',  // Sehr dunkler Mint
          700: '#46AC9F',  // Teal
          800: '#31968B',  // Dunkler Teal
          900: '#1C8077',  // Sehr dunkler Teal
        },
        accent: '#34495E',     // Wilma Dark
        graphite: '#2C3E50',   // Etwas heller als Wilma Dark
        
        // Zusätzliche Farben für UI
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
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
