// 'use client';

import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';
import { currentUser } from '@/lib/authentication';
// import { useCurrentUser } from '@/hooks/use-current-user';

async function getHighlightedUsers() {
  const highlightedUsers = await fetch(
    'http://localhost:3000/api/highlighted-users',
    {
      next: {
        tags: ['highlightedUsers'],
      },
    }
  );
  if (!highlightedUsers.ok) {
    throw new Error('Failed to fetch data');
  }
  return highlightedUsers.json();
}
async function getUserData(username: string) {
  const userRes = await fetch(`http://localhost:3000/user/api/${username}`, {
    next: {
      tags: ['userInfo'],
    },
  });
  if (!userRes.ok) {
    throw new Error('Failed to fetch data');
  }
  return userRes.json();
}
const Home = async () => {
  const user = await currentUser();
  const tryUser = await getUserData('Etah');
  // const highlightedUsers = await getHighlightedUsers();
  // console.log('Highlighted users >>', highlightedUsers);
  return (
    <main className="">
      {user ? (
        <HomePageLoggedIn highlightedUsers={[]} />
      ) : (
        <HomePageLoggedOut />
      )}
    </main>
  );
};

export default Home;
