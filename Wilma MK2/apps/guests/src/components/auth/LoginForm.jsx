import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useToast } from '../ui/toast';
import { useAuth } from '../../contexts/AuthContext';
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const { success, error: showError, ToastContainer } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await signIn(email, password);
            if (result.error) {
                showError(result.error);
            }
            else {
                success('Anmeldung erfolgreich!');
            }
        }
        catch (error) {
            console.error('Login failed:', error);
            showError('Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne-50 to-royal-50 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-royal-900">
            Wilma MK2
          </h1>
          <p className="text-royal-600">
            Gäste-Management für Ihre Hochzeit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-royal-700 mb-2">
              E-Mail-Adresse
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent" placeholder="ihre@email.de"/>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-royal-700 mb-2">
              Passwort
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent" placeholder="••••••••"/>
          </div>


          <Button type="submit" disabled={isLoading} className="w-full bg-royal-600 hover:bg-royal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            {isLoading ? 'Anmelden...' : 'Anmelden'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <div className="text-sm text-royal-600">
            Noch kein Konto? 
            <a href="/register" className="ml-1 text-royal-700 hover:text-royal-800 font-medium">
              Registrieren Sie sich hier
            </a>
          </div>
          
          <div className="text-sm">
            <a href="/forgot-password" className="text-royal-600 hover:text-royal-700">
              Passwort vergessen?
            </a>
          </div>
        </div>
      </Card>
    </div>);
};
