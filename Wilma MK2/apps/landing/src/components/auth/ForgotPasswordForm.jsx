import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "../../../lib/auth";
// importiere Input, Button aus deinem UI-System
const forgotSchema = z.object({
    email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
});
export const ForgotPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(forgotSchema),
        mode: "onChange",
    });
    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        const { error } = await AuthService.resetPassword(data.email);
        setLoading(false);
        if (error)
            setServerError(error.message);
        else
            setSuccess(true);
    };
    return (<form className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-rose-100" onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
      <h2 className="text-2xl font-playfair text-rose-600 mb-4">Passwort zurücksetzen</h2>
      {/* Input-Komponente für E-Mail */}
      <button type="submit" disabled={loading} className="w-full btn-primary mt-4">
        Link anfordern
      </button>
      {success && (<div className="text-green-600 mt-4">
          Wir haben dir eine E-Mail mit Anweisungen geschickt.
        </div>)}
      {serverError && <div className="text-red-600 mt-2">{serverError}</div>}
      <a href="/auth/login" className="text-rose-500 hover:underline text-sm block mt-4">Zurück zum Login</a>
    </form>);
};
