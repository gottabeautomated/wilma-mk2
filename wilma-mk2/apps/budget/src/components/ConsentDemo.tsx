import React, { useState } from 'react'
import { ConsentModal } from './ConsentModal'
import { consentService, ConsentData } from '../lib/consentService'
import Toast from './Toast'
import ElegantIcon from './ElegantIcon'

export const ConsentDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [consentStatus, setConsentStatus] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  const handleCheckStatus = async () => {
    const status = await consentService.hasValidConsent(testEmail)
    setConsentStatus(status)
    showToast('Consent-Status abgerufen', 'info')
  }

  const handleConsentGiven = async (consentData: ConsentData) => {
    const result = await consentService.saveInitialConsent(consentData)
    setShowModal(false)
    
    if (result.success) {
      showToast(result.message, 'success')
      await handleCheckStatus() // Status aktualisieren
    } else {
      showToast(result.message, 'error')
    }
  }

  const handleOptOut = async () => {
    const result = await consentService.optOut(testEmail, 'Demo-Test')
    
    if (result.success) {
      showToast(result.message, 'success')
      await handleCheckStatus() // Status aktualisieren
    } else {
      showToast(result.message, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔒 DSGVO Consent-System Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test der Einverständniserklärung mit Double-Opt-In und Opt-Out
          </p>
        </div>

        <div className="card-elegant p-8 space-y-6">
          {/* Test E-Mail Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test E-Mail-Adresse:
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
              placeholder="test@example.com"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <ElegantIcon name="shield-check" className="w-5 h-5" />
              <span>Consent Modal öffnen</span>
            </button>

            <button
              onClick={handleCheckStatus}
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <ElegantIcon name="search" className="w-5 h-5" />
              <span>Status prüfen</span>
            </button>

            <button
              onClick={handleOptOut}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <ElegantIcon name="x" className="w-5 h-5" />
              <span>Opt-Out</span>
            </button>
          </div>

          {/* Consent Status Anzeige */}
          {consentStatus && (
            <div className="section-elegant p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Consent-Status für {testEmail}:
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${consentStatus.hasConsent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center space-x-2">
                    <ElegantIcon name={consentStatus.hasConsent ? "check" : "x"} className="w-5 h-5" />
                    <span className="font-medium">
                      Consent: {consentStatus.hasConsent ? 'Erteilt' : 'Nicht erteilt'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${consentStatus.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  <div className="flex items-center space-x-2">
                    <ElegantIcon name={consentStatus.isVerified ? "check" : "clock"} className="w-5 h-5" />
                    <span className="font-medium">
                      E-Mail: {consentStatus.isVerified ? 'Verifiziert' : 'Unverifiziert'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${consentStatus.hasOptedOut ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  <div className="flex items-center space-x-2">
                    <ElegantIcon name={consentStatus.hasOptedOut ? "x" : "check"} className="w-5 h-5" />
                    <span className="font-medium">
                      Opt-Out: {consentStatus.hasOptedOut ? 'Ja' : 'Nein'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${consentStatus.aiProcessingAllowed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  <div className="flex items-center space-x-2">
                    <ElegantIcon name={consentStatus.aiProcessingAllowed ? "check" : "x"} className="w-5 h-5" />
                    <span className="font-medium">
                      KI-Verarbeitung: {consentStatus.aiProcessingAllowed ? 'Erlaubt' : 'Nicht erlaubt'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DSGVO Informationen */}
          <div className="section-elegant p-6 bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              📋 DSGVO-Features implementiert:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Explizites Opt-In</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Double-Opt-In per E-Mail</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Granulare Consent-Optionen</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Datenminimierung (Anonymisierung)</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Opt-Out Funktionalität</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Rechtssichere Dokumentation</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ IP & User-Agent Logging</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <ElegantIcon name="check" className="w-4 h-4" />
                  <span>✅ Versionierte Consent-Erklärungen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center pt-6 border-t">
            <a 
              href="#/"
              className="btn-outline inline-flex items-center space-x-2"
            >
              <ElegantIcon name="arrow-left" className="w-4 h-4" />
              <span>Zurück zur Budget-App</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showModal}
        email={testEmail}
        onConsentGiven={handleConsentGiven}
        onDecline={() => setShowModal(false)}
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={true}
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
} 