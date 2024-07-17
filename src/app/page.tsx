import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';
import { currentUser } from '@/lib/authentication';

const base_url = process.env.BASE_URL;

async function getHighlightedUsers() {
  const highlightedUsers = await fetch(
    `https://accountability-tribe.vercel.app/user/api/highlighted-users`,
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
    `https://accountability-tribe.vercel.app/user/api/tasks/${username}/high-priority`,
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

async function getRecommendedTribes(currentUserId: string) {
  const recommendedTribes = await fetch(
    `https://accountability-tribe.vercel.app/tribe/api/recommended-tribes/${currentUserId}`,
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
    `https://accountability-tribe.vercel.app//user/api/sessions/${username}/closest-session`,
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
  console.log(user);
  if (!user) return <HomePageLoggedOut />;

  const highlightedUsers = await getHighlightedUsers();
  const highPriorityTasks = await getHighPriorityTasks(
    user?.username as string
  );
  const recommendedTribes = await getRecommendedTribes(user?.id as string);
  const closestSession = await getClosestSession(user.username);
  return (
    <main className="">
      <HomePageLoggedIn
        highlightedUsers={highlightedUsers}
        highPriorityTasks={highPriorityTasks}
        user={user}
        recommendedTribes={recommendedTribes}
        session={closestSession}
      />
    </main>
  );
};

export default Home;
