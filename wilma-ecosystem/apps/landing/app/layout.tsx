import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@wilma/shared-ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wilma - AI-Powered Wedding Planning',
  description: 'Plan your perfect wedding with AI-powered tools. Budgeting, timeline, guest management, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="py-8 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600">© {new Date().getFullYear()} Wilma Wedding Planning</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-600 hover:text-wedding-rose transition-colors">Privacy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-wedding-rose transition-colors">Terms</a>
                <a href="#" className="text-sm text-gray-600 hover:text-wedding-rose transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
