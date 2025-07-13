import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ElegantIcon from './ElegantIcon'

interface ConsentData {
  email: string
  marketingConsent: boolean
  analyticsConsent: boolean
  aiProcessingConsent: boolean
  ipAddress?: string
  userAgent?: string
}

interface ConsentModalProps {
  isOpen: boolean
  email: string
  onConsentGiven: (consentData: ConsentData) => void
  onDecline: () => void
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  email,
  onConsentGiven,
  onDecline
}) => {
  const [consents, setConsents] = useState({
    required: true, // Basis-Verarbeitung (erforderlich)
    marketing: false,
    analytics: false,
    aiProcessing: true // Standardmäßig aktiviert für Budget-Analyse
  })

  const [showDetails, setShowDetails] = useState(false)

  const handleConsentSubmit = async () => {
    // IP-Adresse und User-Agent für rechtliche Dokumentation
    const userAgent = navigator.userAgent
    
    // IP-Adresse über externe API holen (optional)
    let ipAddress: string | undefined
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      ipAddress = data.ip
    } catch (error) {
      console.log('IP-Adresse konnte nicht ermittelt werden:', error)
    }

    const consentData: ConsentData = {
      email,
      marketingConsent: consents.marketing,
      analyticsConsent: consents.analytics,
      aiProcessingConsent: consents.aiProcessing,
      ipAddress,
      userAgent
    }

    onConsentGiven(consentData)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-royal to-royal-light p-6 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <ElegantIcon 
                name="shield-check" 
                className="w-8 h-8 text-white" 
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Datenschutz & Einverständnis
                </h2>
                <p className="text-royal-light text-sm">
                  DSGVO-konforme Datenverarbeitung
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Einleitung */}
            <div className="text-center">
              <p className="text-gray-700 text-lg">
                Wir möchten Ihre Budget-Analyse für <strong>{email}</strong> erstellen.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Dafür benötigen wir Ihr Einverständnis zur Datenverarbeitung.
              </p>
            </div>

            {/* Erforderliche Verarbeitung */}
            <div className="section-elegant p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <ElegantIcon name="check" className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ✅ Erforderliche Datenverarbeitung
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Zur Erstellung Ihrer Budget-Analyse verarbeiten wir:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Budget-Daten (Gesamtbudget, Gästeanzahl, Stil, Location)</li>
                    <li>• Anonymisierte Analyse-Anfrage an unsere KI</li>
                    <li>• Speicherung für Ihre persönliche Übersicht</li>
                  </ul>
                  <p className="text-green-700 font-medium text-sm mt-2">
                    Diese Verarbeitung ist zur Leistungserbringung erforderlich.
                  </p>
                </div>
              </div>
            </div>

            {/* Optionale Einverständnisse */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                Optionale Einverständnisse:
              </h3>

              {/* KI-Verarbeitung */}
              <div className="section-elegant p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents.aiProcessing}
                    onChange={(e) => setConsents(prev => ({ 
                      ...prev, 
                      aiProcessing: e.target.checked 
                    }))}
                    className="mt-1 h-5 w-5 text-royal rounded focus:ring-royal border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      🤖 KI-gestützte Budget-Empfehlungen
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Für personalisierte Anbieter-Empfehlungen und Spartipps nutzen wir OpenAI. 
                      Ihre persönlichen Daten werden dabei anonymisiert.
                    </p>
                  </div>
                </label>
              </div>

              {/* Marketing */}
              <div className="section-elegant p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents.marketing}
                    onChange={(e) => setConsents(prev => ({ 
                      ...prev, 
                      marketing: e.target.checked 
                    }))}
                    className="mt-1 h-5 w-5 text-royal rounded focus:ring-royal border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      📧 Marketing & Newsletter
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Informationen über neue Features, Hochzeitstipps und 
                      exklusive Angebote per E-Mail erhalten.
                    </p>
                  </div>
                </label>
              </div>

              {/* Analytics */}
              <div className="section-elegant p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents.analytics}
                    onChange={(e) => setConsents(prev => ({ 
                      ...prev, 
                      analytics: e.target.checked 
                    }))}
                    className="mt-1 h-5 w-5 text-royal rounded focus:ring-royal border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      📊 Nutzungsstatistiken
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Anonyme Nutzungsdaten zur Verbesserung unserer App-Funktionen.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Detaillierte Informationen */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 text-royal hover:text-royal-light text-sm"
              >
                <ElegantIcon 
                  name={showDetails ? "chevron-up" : "chevron-down"} 
                  className="w-4 h-4" 
                />
                <span>Detaillierte Datenschutz-Informationen</span>
              </button>

              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600"
                >
                  <div className="space-y-3">
                    <div>
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), 
                      Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
                    </div>
                    <div>
                      <strong>Speicherdauer:</strong> Ihre Daten werden bis zum Widerruf oder 
                      für max. 24 Monate gespeichert.
                    </div>
                    <div>
                      <strong>Ihre Rechte:</strong> Auskunft, Berichtigung, Löschung, 
                      Einschränkung, Datenübertragbarkeit, Widerspruch
                    </div>
                    <div>
                      <strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit 
                      per E-Mail an datenschutz@wilma-wedding.com widerrufen.
                    </div>
                    <div>
                      <strong>Beschwerde:</strong> Sie haben das Recht, sich bei einer 
                      Datenschutz-Aufsichtsbehörde zu beschweren.
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={onDecline}
                className="btn-outline flex-1"
              >
                <ElegantIcon name="x" className="w-4 h-4 mr-2" />
                Ablehnen
              </button>
              <button
                onClick={handleConsentSubmit}
                className="btn-primary flex-1"
              >
                <ElegantIcon name="check" className="w-4 h-4 mr-2" />
                Einverständnis erteilen
              </button>
            </div>

            {/* Rechtlicher Hinweis */}
            <div className="text-center text-xs text-gray-500 pt-2 border-t">
              Mit dem Klick auf "Einverständnis erteilen" stimmen Sie der Verarbeitung 
              Ihrer Daten gemäß unserer{' '}
              <a href="#" className="text-royal hover:underline">
                Datenschutzerklärung
              </a>{' '}
              zu.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 