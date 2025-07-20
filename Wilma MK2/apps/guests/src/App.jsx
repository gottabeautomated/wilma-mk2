import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { WeddingSelector } from './components/WeddingSelector';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import GuestList from './pages/GuestList';
import SeatingChart from './pages/SeatingChart';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './index.css';
// Custom Protected Route for Wedding Selection
const WeddingProtectedRoute = ({ children }) => {
    const { user, currentWedding, loading } = useAuth();
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne-50 to-royal-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600 mx-auto"></div>
          <p className="text-royal-600">Laden...</p>
        </div>
      </div>);
    }
    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    if (!currentWedding) {
        return <Navigate to="/wedding-selector" replace/>;
    }
    return <>{children}</>;
};
// Main App Layout
const AppLayout = ({ children }) => {
    return (<div className="min-h-screen bg-gradient-to-br from-champagne-50 to-royal-50">
      <Header />
      <Navigation />
      <main className="pt-32">
        {children}
      </main>
    </div>);
};
// App Routes Component
const AppRoutes = () => {
    const { user, currentWedding } = useAuth();
    return (<Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to="/" replace/> : <LoginForm />}/>
      
      {/* Wedding Selection */}
      <Route path="/wedding-selector" element={user ? <WeddingSelector /> : <Navigate to="/login" replace/>}/>
      
      {/* Protected Routes */}
      <Route path="/" element={<WeddingProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </WeddingProtectedRoute>}/>
      
      <Route path="/guests" element={<WeddingProtectedRoute>
            <AppLayout>
              <GuestList />
            </AppLayout>
          </WeddingProtectedRoute>}/>
      
      <Route path="/seating" element={<WeddingProtectedRoute>
            <AppLayout>
              <SeatingChart />
            </AppLayout>
          </WeddingProtectedRoute>}/>
      
      <Route path="/analytics" element={<WeddingProtectedRoute>
            <AppLayout>
              <Analytics />
            </AppLayout>
          </WeddingProtectedRoute>}/>
      
      <Route path="/settings" element={<WeddingProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </WeddingProtectedRoute>}/>
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>);
};
// Main App Component
const App = () => {
    return (<AuthProvider>
      <AppRoutes />
    </AuthProvider>);
};
export default App;
