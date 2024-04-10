import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/index';
import AuthProvider from '@/context/AuthenticationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Accountability website',
  description: 'This is an accountability website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="bg-lightPink relative">
            <Navbar />
            <div className="pt-28">{children}</div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
