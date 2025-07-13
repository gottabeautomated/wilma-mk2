"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');

  useEffect(() => {
    const checkSession = async () => {
      // Supabase übernimmt die Session aus der URL automatisch (ab v2)
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setStatus('success');
        setTimeout(() => router.replace("/dashboard"), 1500);
      } else {
        setStatus('error');
        setTimeout(() => router.replace("/auth/login?error=verify"), 2500);
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
      <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 flex flex-col items-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-400 border-solid mb-4"></div>
            <h2 className="text-2xl font-playfair text-rose-600 mb-2">Account wird bestätigt ...</h2>
            <p className="text-gray-600">Bitte einen Moment Geduld.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-5xl mb-2 animate-bounce">💖</div>
            <h2 className="text-2xl font-playfair text-rose-600 mb-2">Willkommen bei Wilma!</h2>
            <p className="text-gray-600">Dein Account wurde erfolgreich bestätigt.<br/>Du wirst weitergeleitet ...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-5xl mb-2">❌</div>
            <h2 className="text-2xl font-playfair text-rose-600 mb-2">Bestätigung fehlgeschlagen</h2>
            <p className="text-gray-600">Bitte versuche es erneut oder kontaktiere den Support.</p>
          </>
        )}
      </div>
    </div>
  );
} 