'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthenticationContext';
import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';

export default function Home() {
  const { login } = useContext(AuthContext);
  return (
    <main className="">
      {login ? <HomePageLoggedIn /> : <HomePageLoggedOut />}
    </main>
  );
}
