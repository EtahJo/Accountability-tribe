'use client';

import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';

import { useCurrentUser } from '@/hooks/use-current-user';

export default function Home() {
  const { session } = useCurrentUser();

  return (
    <main className="">
      {session.status === 'authenticated' ? (
        <HomePageLoggedIn />
      ) : (
        <HomePageLoggedOut />
      )}
    </main>
  );
}
