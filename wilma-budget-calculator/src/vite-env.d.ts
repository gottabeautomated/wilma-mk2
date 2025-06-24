/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ANALYTICS_ID: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_BUDGET_SAVING: string
  readonly VITE_ENABLE_EMAIL_CAPTURE: string
  readonly VITE_ENABLE_RECOMMENDATIONS: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
