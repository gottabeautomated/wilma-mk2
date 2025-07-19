import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@wilma/auth'

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = 'http://localhost:3000'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleDashboard = () => {
    window.location.href = 'http://localhost:3006'
  }

  if (!user) return null

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:scale-105 transition-transform duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user.email?.split('@')[0]}
        </span>
        <span className="text-xs">💕</span>
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Angemeldet als</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
            
            <div className="py-1">
              <button
                onClick={handleDashboard}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <span>💖</span>
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => window.location.href = 'http://localhost:3001/meine-budgets'}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <span>🧮</span>
                <span>Meine Budgets</span>
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <span>👋</span>
                <span>Abmelden</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-pink-200' 
          : 'bg-gradient-to-r from-pink-50 via-white to-purple-50'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'linear-gradient(to right, #fdf2f8, #ffffff, #faf5ff)'
      }}
    >
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Wilma Logo & Brand */}
          <motion.div 
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.location.href = 'http://localhost:3006'}
          >
            <div className="relative">
              <motion.div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #ff8a9b, #c084fc)',
                  boxShadow: '0 4px 15px rgba(255, 138, 155, 0.3)'
                }}
              >
                <span className="text-white font-bold text-xl">W</span>
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)'
                }}
              >
                <span className="text-white text-xs">💕</span>
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide" style={{ color: '#374151' }}>
                WILMA
              </h1>
              <p className="text-xs font-medium tracking-wider uppercase -mt-1" style={{ color: '#6b7280' }}>
                Budget Planer
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Budget-Rechner', icon: '🧮', action: () => window.location.href = 'http://localhost:3001' },
              { name: 'Dashboard', icon: '💖', action: () => window.location.href = 'http://localhost:3006' },
              { name: 'Alle Tools', icon: '✨', action: () => window.location.href = 'http://localhost:3006' }
            ].map((item, index) => (
              <motion.button 
                key={item.name}
                onClick={item.action}
                className="flex items-center space-x-2 font-medium group cursor-pointer transition-all duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                style={{ 
                  color: '#374151',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec4899'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#374151'
                }}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* User Menu or Login Button */}
          {user ? (
            <UserMenu />
          ) : (
            <motion.button
              className="px-6 py-3 text-white rounded-xl font-medium flex items-center space-x-2 transition-all duration-300"
              onClick={() => window.location.href = 'http://localhost:3000'}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #ff8a9b, #c084fc)',
                boxShadow: '0 4px 15px rgba(255, 138, 155, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 138, 155, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 138, 155, 0.3)'
              }}
            >
              <span>Anmelden</span>
              <span className="text-xs">💕</span>
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-3 rounded-xl border transition-all duration-300"
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = 'http://localhost:3006'}
            style={{
              background: '#fdf2f8',
              borderColor: '#fbcfe8',
              boxShadow: '0 2px 8px rgba(255, 138, 155, 0.2)'
            }}
          >
            <span className="text-lg">💕</span>
          </motion.button>
        </div>
      </div>

      {/* Floating Elements */}
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
          <span className="text-sm" style={{ color: '#ff8a9b' }}>💕</span>
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
          <span className="text-xs" style={{ color: '#c084fc' }}>🌸</span>
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
          <span className="text-xs" style={{ color: '#ff8a9b' }}>✨</span>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255, 138, 155, 0.3), transparent)'
        }}
      ></div>
    </motion.header>
  )
}

export default Header
