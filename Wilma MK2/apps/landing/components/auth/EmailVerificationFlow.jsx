"use client";
import { useEmailVerification } from "../../hooks/useEmailVerification";
export function EmailVerificationFlow() {
    const { status, error, email, resendAvailable, resendCountdown, resend, openEmailClient } = useEmailVerification();
    return (<div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 flex flex-col items-center max-w-md w-full">
      {status === 'loading' && (<>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-400 border-solid mb-4"></div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">E-Mail wird verifiziert ...</h2>
          <p className="text-gray-600">Bitte einen Moment Geduld.</p>
        </>)}
      
      {status === 'pending' && (<>
          <div className="text-5xl mb-4 animate-bounce">💌</div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">Bestätige deine E-Mail</h2>
          <p className="text-gray-600 mb-4 text-center">
            Wir haben eine E-Mail an <b>{email}</b> gesendet.<br />
            Bitte prüfe auch deinen Spam-Ordner.
          </p>
          
          <div className="flex gap-2 mb-4">
            <button onClick={() => openEmailClient("gmail")} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Gmail öffnen
            </button>
            <button onClick={() => openEmailClient("outlook")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Outlook öffnen
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">Noch keine E-Mail erhalten?</p>
          <button onClick={resend} disabled={!resendAvailable} className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {resendAvailable ? "Erneut senden" : `Erneut senden in ${resendCountdown}s`}
          </button>
          
          <p className="text-xs text-gray-400 mt-4 text-center">
            Probleme? <a href="mailto:support@wilma.de" className="underline">Support kontaktieren</a>
          </p>
        </>)}
      
      {status === 'success' && (<>
          <div className="text-5xl mb-4 animate-bounce">💖</div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">E-Mail bestätigt!</h2>
          <p className="text-gray-600 text-center">Willkommen bei Wilma! Du wirst weitergeleitet ...</p>
        </>)}
      
      {status === 'error' && (<>
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">Verifizierung fehlgeschlagen</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button onClick={resend} disabled={!resendAvailable} className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {resendAvailable ? "Neue E-Mail anfordern" : `Erneut senden in ${resendCountdown}s`}
          </button>
        </>)}
    </div>);
}
