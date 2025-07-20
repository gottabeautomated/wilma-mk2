import { supabase } from './supabase';
export class AuthService {
    static async signUp(data) {
        const { email, password, wedding_date, partner_name } = data;
        const { error, data: result } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
                data: { wedding_date, partner_name }
            }
        });
        if (error)
            return { error: mapAuthError(error) };
        return { user: result.user };
    }
    static async signIn(email, password) {
        const { error, data: result } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            return { error: mapAuthError(error) };
        return { user: result.user };
    }
    static async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error)
            return { error: mapAuthError(error) };
        return {};
    }
    static async resetPassword(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
        });
        if (error)
            return { error: mapAuthError(error) };
        return {};
    }
    static async resendVerification(email) {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
            }
        });
        if (error)
            return { error: mapAuthError(error) };
        return {};
    }
    static async updateProfile(profile) {
        const { error } = await supabase.auth.updateUser({ data: profile });
        if (error)
            return { error: mapAuthError(error) };
        return {};
    }
    static async getCurrentUser() {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user)
            return null;
        return data.user;
    }
}
function mapAuthError(error) {
    const messages = {
        'Invalid login credentials': 'E-Mail oder Passwort ist ungültig.',
        'User already registered': 'Diese E-Mail ist bereits registriert.',
        'Email not confirmed': 'Bitte bestätige deine E-Mail-Adresse.',
        'Password should be at least 6 characters': 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    };
    return { message: messages[error.message] || 'Unbekannter Fehler. Bitte versuche es erneut.' };
}
