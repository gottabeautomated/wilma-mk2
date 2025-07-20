import { useAuthContext } from "../contexts/AuthContext";
export function useAuth() {
    const ctx = useAuthContext();
    return {
        user: ctx.user,
        profile: ctx.profile,
        loading: ctx.loading,
        error: ctx.error,
        signUp: ctx.signUp,
        signIn: ctx.signIn,
        signOut: ctx.signOut,
        updateProfile: ctx.updateProfile,
        resetPassword: ctx.resetPassword,
    };
}
