'use client';
import HomePageLoggedIn from '@/components/HomePage/HomePageLoggedIn';
import HomePageLoggedOut from '@/components/HomePage/HomePageLoggedOut';
import { useCurrentUser } from '@/hooks/use-current-user';
import useSWR from 'swr';

const base_url = process.env.BASE_URL;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { user }: any = useCurrentUser();
  const { data: highlightedUsers } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/highlighted-users`,
    fetcher
  );
  if (!user) return <HomePageLoggedOut />;

  return (
    <main className="">
      <HomePageLoggedIn highlightedUsers={highlightedUsers} user={user} />
    </main>
  );
};

export default Home;
