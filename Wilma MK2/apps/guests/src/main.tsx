import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
import { WilmaAuthProvider } from './lib/auth'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WilmaAuthProvider>
        <App />
      </WilmaAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 