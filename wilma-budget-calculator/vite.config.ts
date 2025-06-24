import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: mode !== 'production',
      // Minify for production builds
      minify: 'terser',
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Configure Terser
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      // Configure rollup options
      rollupOptions: {
        output: {
          // Create separate chunks for better caching
          manualChunks: (id) => {
            // React vendor chunk
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom') || 
                id.includes('node_modules/react-router-dom')) {
              return 'react-vendor'
            }
            
            // Chart vendor chunk (if using chart libraries)
            if (id.includes('node_modules/chart.js') || 
                id.includes('node_modules/react-chartjs-2')) {
              return 'chart-vendor'
            }
          },
          // Configure chunk naming pattern
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port: 3000,
      strictPort: true,
      open: true,
      cors: true
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: true
    }
  }
})
