import { supabase } from '@wilma/database';
// Re-export the centralized Auth Provider and Hook
export { WilmaAuthProvider, useAuth, withAuth } from './AuthProvider';
export { ProtectedRoute } from './components/ProtectedRoute';
// Legacy Auth helpers (for backward compatibility)
export const signUp = async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: userData,
        },
    });
    return { data, error };
};
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
export const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
};
export const updatePassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({
        password,
    });
    return { data, error };
};
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};
export const getCurrentSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};
export const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange(callback);
};
