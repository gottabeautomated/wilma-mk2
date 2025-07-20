import { Inter } from 'next/font/google';
import ClientAuthProvider from '../components/ClientAuthProvider';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Wilma Dashboard - Hochzeitsplanung',
    description: 'Ihr persönliches Dashboard für die perfekte Hochzeitsplanung',
};
export default function RootLayout({ children, }) {
    return (<html lang="de">
      <body className={inter.className}>
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      </body>
    </html>);
}
