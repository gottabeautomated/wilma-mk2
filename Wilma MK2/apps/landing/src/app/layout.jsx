import './globals.css';
export const metadata = {
    title: 'Wilma - Ihre perfekte Hochzeitsplanung',
    description: 'Planen Sie Ihre Traumhochzeit mit Wilma. Budget, Timeline, Gästeliste und mehr - alles an einem Ort.',
};
export default function RootLayout({ children, }) {
    return (<html lang="de">
      <body className="min-h-screen bg-wedding-cream">
        {children}
      </body>
    </html>);
}
