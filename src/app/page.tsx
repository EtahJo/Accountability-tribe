// 'use client';

import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';
import { currentUser } from '@/lib/authentication';

async function getHighlightedUsers() {
  const highlightedUsers = await fetch(
    'http://localhost:3000/user/api/highlighted-users',
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

async function getHighPriorityTasks(username: string) {
  const highPriorityTasks = await fetch(
    `http://localhost:3000/user/api/tasks/${username}/high-priority`,
    {
      next: {
        tags: ['highPriority'],
      },
    }
  );
  if (!highPriorityTasks.ok) {
    throw new Error('Failed to fetch data');
  }
  return highPriorityTasks.json();
}

async function getRecommendedTribes() {
  const recommendedTribes = await fetch(
    'http://localhost:3000/tribe/api/recommended-tribes',
    {
      next: {
        tags: ['recommendedTribes'],
      },
    }
  );
  if (!recommendedTribes.ok) {
    throw new Error('Failed to fetch data');
  }
  return recommendedTribes.json();
}
async function getClosestSession(username: string) {
  const closestSession = await fetch(
    `http://localhost:3000/user/api/sessions/${username}/closest-session`,
    {
      next: {
        tags: ['closestSession'],
      },
    }
  );
  if (!closestSession.ok) {
    throw new Error('Failed to fetch data');
  }
  return closestSession.json();
}
const Home = async () => {
  const user: any = await currentUser();

  const highlightedUsers = await getHighlightedUsers();
  const highPriorityTasks = await getHighPriorityTasks(
    user?.username as string
  );
  const recommendedTribes = await getRecommendedTribes();
  const closestSession = await getClosestSession(user.username);
  return (
    <main className="">
      {user ? (
        <HomePageLoggedIn
          highlightedUsers={highlightedUsers}
          highPriorityTasks={highPriorityTasks}
          user={user}
          recommendedTribes={recommendedTribes}
          session={closestSession}
        />
      ) : (
        <HomePageLoggedOut />
      )}
    </main>
  );
};

export default Home;
