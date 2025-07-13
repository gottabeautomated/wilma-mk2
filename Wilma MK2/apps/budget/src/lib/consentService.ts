import { supabase } from './supabase'

export interface ConsentData {
  email: string
  marketingConsent: boolean
  analyticsConsent: boolean
  aiProcessingConsent: boolean
  ipAddress?: string
  userAgent?: string
}

export interface ConsentRecord {
  id: string
  email: string
  consent_given: boolean
  consent_timestamp: string | null
  verification_token: string | null
  email_verified: boolean
  verification_timestamp: string | null
  opted_out: boolean
  opt_out_timestamp: string | null
  opt_out_reason: string | null
  marketing_consent: boolean
  analytics_consent: boolean
  ai_processing_consent: boolean
  ip_address: string | null
  user_agent: string | null
  consent_version: string
  created_at: string
  updated_at: string
}

class ConsentService {
  
  /**
   * Speichere initial Consent (noch nicht verifiziert)
   */
  async saveInitialConsent(consentData: ConsentData): Promise<{ success: boolean, message: string, verificationToken?: string }> {
    try {
      // Generiere Verification Token für Double-Opt-In
      const verificationToken = this.generateVerificationToken()
      
      // Prüfe ob bereits ein Consent-Record existiert
      const { data: existingConsent, error: selectError } = await supabase
        .from('user_consents')
        .select('*')
        .eq('email', consentData.email)
        .single()

      // Falls Tabelle nicht existiert, gebe Fehler zurück
      if (selectError && selectError.message.includes('does not exist')) {
        console.error('❌ Consent-Tabelle existiert nicht! Bitte führen Sie die Migration aus.')
        return { 
          success: false, 
          message: 'Datenbank-Konfiguration fehlt. Bitte kontaktieren Sie den Support.',
          verificationToken 
        }
      }

      let result
      
      if (existingConsent) {
        // Update existing consent
        const { data, error } = await supabase
          .from('user_consents')
          .update({
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            verification_token: verificationToken,
            email_verified: false, // Reset verification
            marketing_consent: consentData.marketingConsent,
            analytics_consent: consentData.analyticsConsent,
            ai_processing_consent: consentData.aiProcessingConsent,
            ip_address: consentData.ipAddress,
            user_agent: consentData.userAgent,
            opted_out: false, // Reset opt-out wenn neuer Consent
            opt_out_timestamp: null,
            opt_out_reason: null
          })
          .eq('email', consentData.email)
          .select()
          
        result = { data, error }
      } else {
        // Insert new consent
        const { data, error } = await supabase
          .from('user_consents')
          .insert({
            email: consentData.email,
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            verification_token: verificationToken,
            email_verified: false,
            marketing_consent: consentData.marketingConsent,
            analytics_consent: consentData.analyticsConsent,
            ai_processing_consent: consentData.aiProcessingConsent,
            ip_address: consentData.ipAddress,
            user_agent: consentData.userAgent
          })
          .select()
          
        result = { data, error }
      }

      if (result.error) {
        console.error('Fehler beim Speichern des Consents:', result.error)
        
        // Logge RLS-Probleme für Debugging
        if (result.error.code === '42501' || result.error.code === '401' || result.error.code === '406') {
          console.error('❌ RLS-Problem oder Auth-Fehler:', result.error)
        }
        
        return { 
          success: false, 
          message: 'Fehler beim Speichern der Einverständniserklärung' 
        }
      }

      console.log('✅ Consent gespeichert, Verification Token:', verificationToken)
      
      // TODO: E-Mail mit Verification-Link senden
      await this.sendVerificationEmail(consentData.email, verificationToken)

      return { 
        success: true, 
        message: 'Einverständnis gespeichert. Bitte bestätigen Sie Ihre E-Mail-Adresse.',
        verificationToken 
      }

    } catch (error) {
      console.error('Unerwarteter Fehler beim Consent-Speichern:', error)
      return { 
        success: false, 
        message: 'Ein unerwarteter Fehler ist aufgetreten' 
      }
    }
  }

  /**
   * Double-Opt-In: E-Mail-Verifizierung
   */
  async verifyEmail(verificationToken: string): Promise<{ success: boolean, message: string }> {
    try {
      const { data, error } = await supabase
        .from('user_consents')
        .update({
          email_verified: true,
          verification_timestamp: new Date().toISOString()
        })
        .eq('verification_token', verificationToken)
        .eq('email_verified', false) // Nur unverifizierte
        .select()

      if (error) {
        console.error('Fehler bei E-Mail-Verifizierung:', error)
        return { 
          success: false, 
          message: 'Fehler bei der E-Mail-Verifizierung' 
        }
      }

      if (!data || data.length === 0) {
        return { 
          success: false, 
          message: 'Ungültiger oder bereits verwendeter Verifizierungslink' 
        }
      }

      console.log('✅ E-Mail erfolgreich verifiziert für:', data[0].email)
      
      return { 
        success: true, 
        message: 'E-Mail-Adresse erfolgreich bestätigt!' 
      }

    } catch (error) {
      console.error('Unerwarteter Fehler bei E-Mail-Verifizierung:', error)
      return { 
        success: false, 
        message: 'Ein unerwarteter Fehler ist aufgetreten' 
      }
    }
  }

  /**
   * Prüfe Consent-Status für E-Mail
   */
  async getConsentStatus(email: string): Promise<ConsentRecord | null> {
    try {
      const { data, error } = await supabase
        .from('user_consents')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        // Logge DB-Fehler für Debugging
        if (error.code === '42501' || error.code === '401' || error.code === '406' || error.message.includes('does not exist')) {
          console.error('❌ DB-Problem beim Laden von Consent:', error)
        }
        
        console.log('Kein Consent-Record gefunden für:', email)
        return null
      }

      return data as ConsentRecord

    } catch (error) {
      console.error('Fehler beim Laden des Consent-Status:', error)
      return null
    }
  }

  /**
   * Opt-Out: Widerruf der Einverständniserklärung
   */
  async optOut(email: string, reason?: string): Promise<{ success: boolean, message: string }> {
    try {
      const { data, error } = await supabase
        .from('user_consents')
        .update({
          opted_out: true,
          opt_out_timestamp: new Date().toISOString(),
          opt_out_reason: reason || 'Nutzer-Anfrage',
          consent_given: false,
          marketing_consent: false,
          analytics_consent: false,
          ai_processing_consent: false
        })
        .eq('email', email)
        .select()

      if (error) {
        console.error('Fehler beim Opt-Out:', error)
        return { 
          success: false, 
          message: 'Fehler beim Widerruf der Einverständniserklärung' 
        }
      }

      if (!data || data.length === 0) {
        return { 
          success: false, 
          message: 'Keine Einverständniserklärung für diese E-Mail-Adresse gefunden' 
        }
      }

      console.log('✅ Opt-Out erfolgreich für:', email)
      
      return { 
        success: true, 
        message: 'Einverständniserklärung erfolgreich widerrufen' 
      }

    } catch (error) {
      console.error('Unerwarteter Fehler beim Opt-Out:', error)
      return { 
        success: false, 
        message: 'Ein unerwarteter Fehler ist aufgetreten' 
      }
    }
  }

  /**
   * Prüfe ob User valides Consent hat (für Budget-Verarbeitung)
   */
  async hasValidConsent(email: string): Promise<{ 
    hasConsent: boolean, 
    isVerified: boolean, 
    hasOptedOut: boolean,
    aiProcessingAllowed: boolean 
  }> {
    const consent = await this.getConsentStatus(email)
    
    if (!consent) {
      return { 
        hasConsent: false, 
        isVerified: false, 
        hasOptedOut: false,
        aiProcessingAllowed: false 
      }
    }

    return {
      hasConsent: consent.consent_given,
      isVerified: consent.email_verified,
      hasOptedOut: consent.opted_out,
      aiProcessingAllowed: consent.ai_processing_consent && !consent.opted_out
    }
  }

  /**
   * Versende Verification-E-Mail (Double-Opt-In)
   */
  private async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    try {
      // TODO: Implementiere E-Mail-Versand (z.B. mit Resend, SendGrid, etc.)
      const verificationUrl = `${window.location.origin}/verify-email?token=${verificationToken}`
      
      console.log('📧 Verification-E-Mail senden an:', email)
      console.log('🔗 Verification-URL:', verificationUrl)
      
      // Placeholder für E-Mail-Service
      // await emailService.send({
      //   to: email,
      //   subject: 'Bestätigen Sie Ihre E-Mail-Adresse - Wilma Wedding',
      //   html: this.generateVerificationEmailHtml(verificationUrl)
      // })
      
    } catch (error) {
      console.error('Fehler beim E-Mail-Versand:', error)
    }
  }

  /**
   * Generiere sicheren Verification Token
   */
  private generateVerificationToken(): string {
    return crypto.randomUUID() + '-' + Date.now().toString(36)
  }

  /**
   * HTML für Verification-E-Mail
   */
  private generateVerificationEmailHtml(verificationUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6B46C1, #8B5CF6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Wilma Wedding</h1>
          <p style="color: #E5E7EB; margin: 10px 0 0 0;">Bestätigen Sie Ihre E-Mail-Adresse</p>
        </div>
        
        <div style="padding: 30px; background: #F9FAFB;">
          <h2 style="color: #1F2937; margin-bottom: 20px;">E-Mail-Bestätigung erforderlich</h2>
          
          <p style="color: #4B5563; line-height: 1.6; margin-bottom: 25px;">
            Vielen Dank für Ihr Interesse an unserer Budget-Analyse! 
            Um die Verarbeitung zu starten, bestätigen Sie bitte Ihre E-Mail-Adresse.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #6B46C1; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold;
                      display: inline-block;">
              E-Mail-Adresse bestätigen
            </a>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 25px;">
            Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
            <span style="word-break: break-all; color: #6B46C1;">${verificationUrl}</span>
          </p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 25px 0;">
          
          <p style="color: #6B7280; font-size: 12px; text-align: center;">
            Diese E-Mail wurde gesendet, weil Sie eine Budget-Analyse bei Wilma Wedding angefordert haben.<br>
            Falls Sie dies nicht waren, können Sie diese E-Mail ignorieren.
          </p>
        </div>
      </div>
    `
  }
}

export const consentService = new ConsentService() 