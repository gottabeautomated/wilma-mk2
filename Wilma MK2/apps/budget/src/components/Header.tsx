import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ElegantIcon from './ElegantIcon'
import { authHelpers } from '../lib/supabase'

// AuthModal als separate Komponente außerhalb von Header
const AuthModal = React.memo(({ 
  showAuthModal, 
  setShowAuthModal, 
  formData, 
  setFormData, 
  isLoading, 
  error, 
  success, 
  handleInputChange, 
  handleSubmit, 
  resetForm 
}: {
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  formData: any
  setFormData: (data: any) => void
  isLoading: boolean
  error: string | null
  success: string | null
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  resetForm: () => void
}) => (
  <AnimatePresence>
    {showAuthModal && (
      <motion.div
        className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 min-h-screen overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setShowAuthModal(false)
          resetForm()
        }}
      >
        {/* Registrierungsmodal */}
        <motion.div 
          className="bg-white rounded-elegant p-8 max-w-md w-full shadow-royal-lg border border-royal/20 relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-royal to-royal-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-royal">
              <ElegantIcon name="rings" className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-graphite mb-2">
              Willkommen bei WILMA
            </h2>
            <p className="text-accent/80 text-sm">
              Erstellen Sie Ihr Konto und planen Sie Ihre Traumhochzeit
            </p>
          </div>

          {/* Registrierungsformular */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-elegant text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-elegant text-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Vollständiger Name
              </label>
              <input
                type="text"
                placeholder="Max Mustermann"
                className="w-full px-4 py-3 rounded-elegant border border-royal/20 focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                placeholder="ihre@email.com"
                className="w-full px-4 py-3 rounded-elegant border border-royal/20 focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Passwort
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-elegant border border-royal/20 focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
                required
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Passwort bestätigen
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-elegant border border-royal/20 focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            {/* Datenschutz Checkbox */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-royal border-royal/20 rounded focus:ring-royal/20"
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-accent/80 leading-relaxed">
                Ich akzeptiere die{' '}
                <a href="#" className="text-royal hover:text-royal-dark font-medium underline">
                  Nutzungsbedingungen
                </a>{' '}
                und{' '}
                <a href="#" className="text-royal hover:text-royal-dark font-medium underline">
                  Datenschutzrichtlinien
                </a>
              </label>
            </div>

            {/* Registrierung Button */}
            <motion.button
              type="submit"
              className={`w-full py-3 rounded-elegant font-medium transition-all shadow-royal hover:shadow-royal-lg mt-6 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-royal text-white hover:bg-royal-dark'
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Wird erstellt...</span>
                  </>
                ) : (
                  <>
                    <span>Konto erstellen & Budget planen</span>
                    <ElegantIcon name="sparkles" size={16} />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-accent/60">
              Haben Sie bereits ein Konto?{' '}
              <button 
                type="button"
                className="text-royal hover:text-royal-dark font-medium underline"
                onClick={() => {
                  // Hier könnte später zur Login-Seite weitergeleitet werden
                  alert('Login-Funktion wird bald verfügbar sein!')
                }}
              >
                Hier anmelden
              </button>
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setShowAuthModal(false)
              resetForm()
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            disabled={isLoading}
          >
            <span className="text-gray-500 text-lg">×</span>
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
))

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(false) // false = Registrierung, true = Login
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAuthModal])

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validation
      if (!formData.email || !formData.password || !formData.fullName) {
        throw new Error('Bitte füllen Sie alle Felder aus')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Die Passwörter stimmen nicht überein')
      }

      if (formData.password.length < 6) {
        throw new Error('Das Passwort muss mindestens 6 Zeichen lang sein')
      }

      // Supabase registration
      const { data, error } = await authHelpers.signUp(
        formData.email,
        formData.password,
        formData.fullName
      )

      if (error) {
        throw new Error(error.message)
      }

      if (data.user) {
        setSuccess('Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail für die Bestätigung.')
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setShowAuthModal(false)
          setSuccess(null)
        }, 3000)
      }
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setError(null)
    setSuccess(null)
  }

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-elegant border-b border-undertone' 
          : 'bg-gradient-to-r from-primary-50 via-white to-primary-100'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Elegant Logo & Brand */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-accent via-champagne to-primary-300 rounded-elegant flex items-center justify-center shadow-elegant hover:shadow-gold transition-all duration-300"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ElegantIcon name="rings" className="text-white" size={20} />
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center shadow-sm border-2 border-white"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <ElegantIcon name="sparkles" className="text-white" size={10} />
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-graphite tracking-wide">
                WILMA
              </h1>
              <p className="text-xs text-accent font-medium tracking-wider uppercase -mt-1">
                Budget Planer
              </p>
            </div>
          </motion.div>

          {/* Elegant Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Budget-Rechner', icon: 'calculator', href: '#', action: 'scroll-to-form' },
              { name: 'Hilfe', icon: 'sparkles', href: '#', action: 'show-help' },
              { name: 'Kontakt', icon: 'heart', href: '#footer', action: 'scroll-to-footer' }
            ].map((item, index) => (
              <motion.button 
                key={item.name}
                onClick={() => {
                  if (item.action === 'scroll-to-form') {
                    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })
                  } else if (item.action === 'scroll-to-footer') {
                    document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })
                  } else if (item.action === 'show-help') {
                    // Hier könnte später ein Hilfe-Modal geöffnet werden
                    alert('Hilfe-Bereich wird bald verfügbar sein!')
                  }
                }}
                className="flex items-center space-x-2 text-accent hover:text-gold transition-all duration-300 font-medium group cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <ElegantIcon 
                  name={item.icon} 
                  className="group-hover:text-gold transition-colors duration-300" 
                  size={16} 
                />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* Elegant CTA Button */}
          <motion.button
            className="btn-primary flex items-center space-x-2 hover:shadow-gold"
            onClick={() => {
              resetForm()
              setShowAuthModal(true)
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>Jetzt starten</span>
            <ElegantIcon name="sparkles" className="text-gold" size={16} />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-3 rounded-elegant bg-primary-100 border border-undertone hover:bg-primary-200 hover:shadow-gold transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <ElegantIcon name="calendar" className="text-accent" size={20} />
          </motion.button>
        </div>
      </div>

      {/* Elegant Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-3 right-32 opacity-20"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 15, -15, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ElegantIcon name="heart" className="text-gold" size={16} />
        </motion.div>
        <motion.div 
          className="absolute top-5 left-1/4 opacity-15"
          animate={{ 
            y: [0, -6, 0],
            x: [0, 8, 0] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5 
          }}
        >
          <ElegantIcon name="flower" className="text-gold" size={14} />
        </motion.div>
        <motion.div 
          className="absolute top-2 left-1/2 opacity-10"
          animate={{ 
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <ElegantIcon name="sparkles" className="text-gold" size={12} />
        </motion.div>
      </div>

      {/* Elegant Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>

      <AuthModal 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        error={error}
        success={success}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </motion.header>
  )
}

export default Header 