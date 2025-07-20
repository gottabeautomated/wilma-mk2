import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";
export function useEmailVerification() {
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [resendAvailable, setResendAvailable] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);
    const router = useRouter();
    const params = useSearchParams();
    // Token aus URL holen und Verifizierung versuchen
    useEffect(() => {
        const token = params.get("token");
        const type = params.get("type");
        if (token && type === "signup") {
            // Für E-Mail-Verifizierung verwenden wir die Session-Übernahme
            supabase.auth.getSession().then(({ data, error }) => {
                if (data?.session) {
                    setStatus("success");
                    setTimeout(() => router.replace("/auth/complete-registration"), 2000);
                }
                else {
                    setStatus("error");
                    setError("Der Link ist ungültig oder abgelaufen. Bitte fordere eine neue E-Mail an.");
                }
            });
        }
        else {
            setStatus("pending");
        }
    }, [params, router]);
    // E-Mail aus Session holen
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data?.user?.email)
                setEmail(data.user.email);
        });
    }, []);
    // Countdown für Resend
    useEffect(() => {
        if (!resendAvailable && status === "pending") {
            const interval = setInterval(() => {
                setResendCountdown((c) => {
                    if (c <= 1) {
                        setResendAvailable(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendAvailable, status]);
    // Resend-Funktion
    const resend = useCallback(async () => {
        if (!email)
            return;
        setResendAvailable(false);
        setResendCountdown(60);
        const { error } = await supabase.auth.resend({ type: "signup", email });
        if (error) {
            setError("Fehler beim Senden der E-Mail. Bitte versuche es später erneut.");
        }
        else {
            setError(null);
        }
    }, [email]);
    // Email-Client öffnen
    const openEmailClient = useCallback((client) => {
        const urls = {
            gmail: "https://mail.google.com/",
            outlook: "https://outlook.live.com/"
        };
        window.open(urls[client], "_blank");
    }, []);
    return {
        status,
        error,
        email,
        resendAvailable,
        resendCountdown,
        resend,
        openEmailClient
    };
}
