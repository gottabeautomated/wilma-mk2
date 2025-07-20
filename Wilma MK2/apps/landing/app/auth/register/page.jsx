"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "../../../lib/auth";
const registerSchema = z.object({
    email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
    password: z.string()
        .min(8, 'Mindestens 8 Zeichen')
        .regex(/[A-Z]/, 'Mindestens ein Großbuchstabe')
        .regex(/[a-z]/, 'Mindestens ein Kleinbuchstabe')
        .regex(/[0-9]/, 'Mindestens eine Zahl')
        .regex(/[^A-Za-z0-9]/, 'Mindestens ein Sonderzeichen'),
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwörter stimmen nicht überein.',
    path: ['passwordConfirm'],
});
export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });
    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        const { error } = await AuthService.signUp({
            email: data.email,
            password: data.password,
        });
        setLoading(false);
        if (error) {
            setServerError(error.message);
        }
        else {
            setSuccess(true);
            // Weiterleitung zur Verifizierungsseite
            setTimeout(() => {
                router.push("/auth/verify");
            }, 2000);
        }
    };
    if (success) {
        return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 flex flex-col items-center max-w-md">
          <div className="text-5xl mb-4 animate-bounce">💌</div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">E-Mail-Bestätigung</h2>
          <p className="text-gray-600 text-center mb-4">
            Wir haben dir eine Bestätigungs-E-Mail geschickt. 
            Bitte prüfe dein Postfach und folge dem Link, um deine Registrierung abzuschließen.
          </p>
          <p className="text-sm text-gray-500">Du wirst weitergeleitet ...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
      <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 max-w-md w-full">
        <h2 className="text-2xl font-playfair text-rose-600 mb-6 text-center">Registrierung</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail *
            </label>
            <input type="email" {...register("email")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent" placeholder="ihre.email@beispiel.at" autoComplete="email"/>
            {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort *
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register("password")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent pr-10" placeholder="Ihr Passwort" autoComplete="new-password"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort bestätigen *
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register("passwordConfirm")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent pr-10" placeholder="Passwort wiederholen" autoComplete="new-password"/>
            </div>
            {errors.passwordConfirm && (<p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>)}
          </div>

          <button type="submit" disabled={loading || !isValid} className="w-full px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {loading ? "Bitte warten..." : "✨ Konto erstellen"}
          </button>

          {serverError && (<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{serverError}</p>
            </div>)}

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Bereits ein Konto?{" "}
              <a href="/auth/login" className="text-rose-500 hover:underline">
                Anmelden
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>);
}
