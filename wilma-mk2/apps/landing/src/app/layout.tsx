import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wilma - Ihre perfekte Hochzeitsplanung',
  description: 'Planen Sie Ihre Traumhochzeit mit Wilma. Budget, Timeline, Gästeliste und mehr - alles an einem Ort.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-wedding-cream">
        {children}
      </body>
    </html>
  );
} 