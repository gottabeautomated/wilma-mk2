import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "../../../lib/auth";

const registerSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string()
    .min(8, "Mindestens 8 Zeichen")
    .regex(/[A-Z]/, "Mindestens ein Großbuchstabe")
    .regex(/[a-z]/, "Mindestens ein Kleinbuchstabe")
    .regex(/[0-9]/, "Mindestens eine Zahl")
    .regex(/[^A-Za-z0-9]/, "Mindestens ein Sonderzeichen"),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwörter stimmen nicht überein.",
  path: ["passwordConfirm"],
});

export const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setServerError(null);
    const { error } = await AuthService.signUp({
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (error) setServerError(error.message);
    else setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-rose-100 text-center">
        <h2 className="text-2xl font-playfair text-rose-600 mb-4">E-Mail-Bestätigung</h2>
        <p className="mb-4">
          Wir haben dir eine Bestätigungs-E-Mail geschickt. Bitte prüfe dein Postfach und folge dem Link, um deine Registrierung abzuschließen.
        </p>
      </div>
    );
  }

  return (
    <form
      className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-rose-100"
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={loading}
    >
      <h2 className="text-2xl font-playfair text-rose-600 mb-4">Registrierung</h2>
      {/* Input-Komponenten für E-Mail, Passwort, Passwort bestätigen */}
      <button type="submit" disabled={loading || !formState.isValid} className="w-full btn-primary mt-4">
        Registrieren
      </button>
      {serverError && <div className="text-red-600 mt-2">{serverError}</div>}
    </form>
  );
}; 