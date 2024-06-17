import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/index';
import Footer from '@/components/Footer/index';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Accountability website',
  description: 'This is an accountability website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <div className="bg-lightPink relative h-full">
            <Navbar />
            <div className="sm:pt-28 pt-10">{children}</div>
            <Footer />
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
