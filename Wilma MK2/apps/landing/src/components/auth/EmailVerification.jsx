import React, { useState } from "react";
import { AuthService } from "../../../lib/auth";
export const EmailVerification = ({ email }) => {
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);
    const [error, setError] = useState(null);
    const resend = async () => {
        setLoading(true);
        setError(null);
        // Hier ggf. Supabase-Resend-Logik
        const { error } = await AuthService.resendVerification?.(email);
        setLoading(false);
        if (error)
            setError(error.message);
        else
            setResent(true);
    };
    return (<div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-rose-100 text-center">
      <h2 className="text-2xl font-playfair text-rose-600 mb-4">E-Mail-Bestätigung</h2>
      <p className="mb-4">
        Bitte bestätige deine E-Mail-Adresse.<br />
        Wir haben eine E-Mail an <span className="font-semibold">{email}</span> gesendet.
      </p>
      <button onClick={resend} disabled={resent || loading} className="w-full btn-primary">
        Erneut senden
      </button>
      {resent && <div className="text-green-600 mt-2">E-Mail wurde erneut gesendet!</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>);
};
