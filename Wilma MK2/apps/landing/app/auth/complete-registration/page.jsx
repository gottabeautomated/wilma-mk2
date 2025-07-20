"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { DataMigrationService } from "../../../lib/data-migration";
const profileSchema = z.object({
    first_name: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
    last_name: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
    wedding_date: z.string().min(1, "Bitte wähle ein Datum"),
    partner_name: z.string().min(2, "Name des Partners ist erforderlich"),
    phone: z.string().optional(),
});
export default function CompleteRegistrationPage() {
    const { user, updateProfile } = useAuth();
    const router = useRouter();
    const [migrating, setMigrating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [migrationError, setMigrationError] = useState(null);
    const [step, setStep] = useState('profile');
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
    });
    useEffect(() => {
        if (!user) {
            router.replace("/auth/login");
        }
    }, [user, router]);
    const onSubmitProfile = async (data) => {
        try {
            await updateProfile(data);
            setStep('migration');
            // Datenmigration starten
            const sessionId = localStorage.getItem("sessionId");
            if (sessionId && user) {
                setMigrating(true);
                await DataMigrationService.migrateAnonymousData(user.id, sessionId);
                setProgress(100);
                localStorage.removeItem("sessionId");
                setMigrating(false);
                setStep('welcome');
            }
            else {
                setStep('welcome');
            }
        }
        catch (error) {
            console.error("Fehler beim Profil-Update:", error);
        }
    };
    const handleWelcomeComplete = () => {
        router.replace("/dashboard");
    };
    if (step === 'migration' && migrating) {
        return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-400 border-solid mb-4"></div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">Daten werden übertragen</h2>
          <p className="text-gray-600 mb-4">Deine bisherigen Einträge werden übernommen ...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-rose-400 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-500">{progress}% abgeschlossen</p>
        </div>
      </div>);
    }
    if (step === 'welcome') {
        return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 flex flex-col items-center max-w-md">
          <div className="text-5xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">Willkommen bei Wilma!</h2>
          <p className="text-gray-600 text-center mb-6">
            Dein Account ist vollständig eingerichtet. 
            Du kannst jetzt mit der Hochzeitsplanung beginnen!
          </p>
          <button onClick={handleWelcomeComplete} className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
            Zum Dashboard
          </button>
        </div>
      </div>);
    }
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
      <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-rose-100 max-w-md w-full">
        <h2 className="text-2xl font-playfair text-rose-600 mb-6 text-center">Vervollständige dein Profil</h2>
        
        <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vorname *
            </label>
            <input type="text" {...register("first_name")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent" placeholder="Dein Vorname"/>
            {errors.first_name && (<p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nachname *
            </label>
            <input type="text" {...register("last_name")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent" placeholder="Dein Nachname"/>
            {errors.last_name && (<p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hochzeitsdatum *
            </label>
            <input type="date" {...register("wedding_date")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"/>
            {errors.wedding_date && (<p className="text-red-500 text-sm mt-1">{errors.wedding_date.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name des Partners *
            </label>
            <input type="text" {...register("partner_name")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent" placeholder="Name deines Partners"/>
            {errors.partner_name && (<p className="text-red-500 text-sm mt-1">{errors.partner_name.message}</p>)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer (optional)
            </label>
            <input type="tel" {...register("phone")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent" placeholder="+43 123 456 789"/>
          </div>

          <button type="submit" disabled={!isValid} className="w-full px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Profil vervollständigen
          </button>
        </form>

        {migrationError && (<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">Migration fehlgeschlagen: {migrationError}</p>
            <button onClick={() => window.location.reload()} className="text-red-500 underline text-sm mt-1">
              Erneut versuchen
            </button>
          </div>)}
      </div>
    </div>);
}
