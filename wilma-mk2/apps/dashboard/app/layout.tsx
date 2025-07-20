import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientAuthProvider from '../components/ClientAuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wilma Dashboard - Hochzeitsplanung',
  description: 'Ihr persönliches Dashboard für die perfekte Hochzeitsplanung',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  )
}
