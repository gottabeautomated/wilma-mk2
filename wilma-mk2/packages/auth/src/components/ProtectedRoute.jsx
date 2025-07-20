import React, { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
export const ProtectedRoute = ({ children, requireAuth = true, redirectTo = 'http://localhost:3000', fallback }) => {
    const { user, loading } = useAuth();
    useEffect(() => {
        if (!loading && requireAuth && !user) {
            // Redirect to landing page if not authenticated
            window.location.href = redirectTo;
        }
    }, [user, loading, requireAuth, redirectTo]);
    // Show loading state
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-serif text-gray-700 mb-2">Wilma wird geladen...</h2>
          <p className="text-gray-500">Einen Moment bitte</p>
        </div>
      </div>);
    }
    // Show fallback if provided and not authenticated
    if (requireAuth && !user && fallback) {
        return <>{fallback}</>;
    }
    // If auth is required but user is not authenticated, don't render anything
    // (redirect will happen via useEffect)
    if (requireAuth && !user) {
        return null;
    }
    // Render children if authenticated or auth not required
    return <>{children}</>;
};
export default ProtectedRoute;
