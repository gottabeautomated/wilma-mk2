import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "../../../lib/auth";
// importiere Input, Button aus deinem UI-System
const loginSchema = z.object({
    email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
    password: z.string().min(1, "Bitte gib dein Passwort ein."),
    remember: z.boolean().optional(),
});
export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });
    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        const { error } = await AuthService.signIn(data.email, data.password);
        setLoading(false);
        if (error)
            setServerError(error.message);
        // TODO: Redirect nach Login
    };
    return (<form className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-rose-100" onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
      <h2 className="text-2xl font-playfair text-rose-600 mb-4">Login</h2>
      {/* Input-Komponenten für E-Mail und Passwort */}
      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("remember")} className="accent-rose-400"/>
          Angemeldet bleiben
        </label>
        <a href="/auth/forgot-password" className="text-rose-500 hover:underline text-sm">Passwort vergessen?</a>
      </div>
      <button type="submit" disabled={loading} className="w-full btn-primary mt-4">
        Login
      </button>
      <div className="flex flex-col gap-2 mt-4">
        <button type="button" className="w-full btn-outline" disabled>
          {/* Google Icon */} Mit Google anmelden
        </button>
        <button type="button" className="w-full btn-outline" disabled>
          {/* Apple Icon */} Mit Apple anmelden
        </button>
      </div>
      {serverError && <div className="text-red-600 mt-2">{serverError}</div>}
    </form>);
};
