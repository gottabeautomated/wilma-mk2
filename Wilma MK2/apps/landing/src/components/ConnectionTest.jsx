'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
export default function ConnectionTest() {
    const [testResult, setTestResult] = useState({ loading: true });
    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log('🔍 Teste Supabase-Verbindung...');
                const { data, error } = await supabase.from('profiles').select('*').limit(1);
                if (error) {
                    console.error('❌ Supabase-Verbindungsfehler:', error);
                    setTestResult({
                        loading: false,
                        success: false,
                        error: error.message,
                        data: null
                    });
                }
                else {
                    console.log('✅ Supabase-Verbindung erfolgreich!');
                    console.log('📊 Daten:', data);
                    setTestResult({
                        loading: false,
                        success: true,
                        error: undefined,
                        data: data
                    });
                }
            }
            catch (err) {
                console.error('❌ Unerwarteter Fehler:', err);
                setTestResult({
                    loading: false,
                    success: false,
                    error: err instanceof Error ? err.message : 'Unbekannter Fehler',
                    data: null
                });
            }
        };
        testConnection();
    }, []);
    if (testResult.loading) {
        return (<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800">🔄 Teste Supabase-Verbindung...</p>
      </div>);
    }
    return (<div className={`p-4 border rounded-lg ${testResult.success
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'}`}>
      <h3 className={`font-semibold mb-2 ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
        {testResult.success ? '✅ Supabase-Verbindung erfolgreich!' : '❌ Supabase-Verbindungsfehler'}
      </h3>
      
      {testResult.error && (<p className="text-red-700 text-sm mb-2">
          <strong>Fehler:</strong> {testResult.error}
        </p>)}
      
      {testResult.data && (<div className="text-sm">
          <p className="text-green-700 mb-1">
            <strong>Gefundene Datensätze:</strong> {testResult.data.length}
          </p>
          <details className="text-xs">
            <summary className="cursor-pointer text-green-600 hover:text-green-800">
              Zeige Daten (JSON)
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          </details>
        </div>)}
      
      <p className="text-xs text-gray-600 mt-2">
        💡 Schau auch in die Browser-Konsole (F12) für detaillierte Logs.
      </p>
    </div>);
}
