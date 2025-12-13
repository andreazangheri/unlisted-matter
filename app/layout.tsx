import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UNLISTED MATTER: Rileva ciò che conta veramente (Non listato).',
  description:
    'Mappa i tuoi Valori Inespressi (le tue capability, processi, e fallimenti). ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white`}
      >
        {/* HEADER condiviso con link */}
        <header className="px-6 py-4 bg-slate-900">
          <a
            href="/"
            className="uppercase font-bold text-slate-100 hover:text-slate-300 transition-colors cursor-pointer"
          >
            unlisted matter
          </a>
        </header>

        {/* CONTENUTO pagine */}
        <main>{children}</main>
      </body>
    </html>
  );
}
