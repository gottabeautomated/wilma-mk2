"use client";
import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';
export default function TestEnv() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('venue_analyses').select('*');
            if (error)
                setError(error.message);
            else
                setData(data || []);
            setLoading(false);
        };
        fetchData();
    }, []);
    return (<div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 Environment Variables Test</h1>
      
      <div style={{
            padding: '16px',
            backgroundColor: url && key ? '#d1fae5' : '#fef2f2',
            border: `2px solid ${url && key ? '#10b981' : '#ef4444'}`,
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
        <h2>Status: {url && key ? '✅ SUCCESS' : '❌ FAILED'}</h2>
        <div><strong>URL:</strong> {url ? '✅ Loaded' : '❌ Missing'}</div>
        <div><strong>Key:</strong> {key ? '✅ Loaded' : '❌ Missing'}</div>
        <div><strong>Node Env:</strong> {process.env.NODE_ENV}</div>
      </div>

      {url && (<div style={{ fontSize: '12px', wordBreak: 'break-all' }}>
          <strong>URL Value:</strong> {url}
        </div>)}

      <div style={{ marginTop: '20px' }}>
        <h3>All NEXT_PUBLIC_ Variables:</h3>
        <pre style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px' }}>
          {JSON.stringify(Object.keys(process.env)
            .filter(key => key.startsWith('NEXT_PUBLIC_'))
            .reduce((obj, key) => {
            obj[key] = process.env[key];
            return obj;
        }, {}), null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2>Venue Analyses (Testdaten)</h2>
        <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 4 }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>);
}
