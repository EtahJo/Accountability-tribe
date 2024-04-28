import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/index';
import Footer from '@/components/Footer/index';
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
            <div className="sm:pt-28 pt-10">{children}</div>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
