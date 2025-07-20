import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            global: 'globalThis',
            'process.env': {
                NEXT_PUBLIC_SUPABASE_URL: JSON.stringify('https://pyqooruoylfvrzbbxglp.supabase.co'),
                NEXT_PUBLIC_SUPABASE_ANON_KEY: JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cW9vcnVveWxmdnJ6YmJ4Z2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODkzODAsImV4cCI6MjA2NjM2NTM4MH0.ahXqbeLGVpDiR9UIR6mBITb5mtHtgaGnLC3OPd2fYEo'),
            },
        },
        server: {
            port: 3002,
            open: true,
        },
    };
});
