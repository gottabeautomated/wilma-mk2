import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    open: true,
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'recharts']
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    global: 'globalThis',
    'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify('https://pyqooruoylfvrzbbxglp.supabase.co'),
    'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cW9vcnVveWxmdnJ6YmJ4Z2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODkzODAsImV4cCI6MjA2NjM2NTM4MH0.ahXqbeLGVpDiR9UIR6mBITb5mtHtgaGnLC3OPd2fYEo')
  }
})
