import React from "react";
import Head from "next/head";
export const AuthLayout = ({ children }) => (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-yellow-50">
    <Head>
      <title>Wilma Mk2 – Anmeldung</title>
      <meta name="description" content="Registriere dich für Wilma Mk2 – die moderne Hochzeitsplanung."/>
    </Head>
    <div className="absolute inset-0 z-0 pointer-events-none select-none">
      {/* Wedding-themed Glassmorphism/Imagery */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-rose-200/60 to-transparent rounded-b-3xl blur-2xl"/>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100/30 rounded-full blur-3xl"/>
      {/* Optional: SVG-Deko, Herzen, Blumen etc. */}
    </div>
    <main className="relative z-10 w-full max-w-lg">{children}</main>
  </div>);
