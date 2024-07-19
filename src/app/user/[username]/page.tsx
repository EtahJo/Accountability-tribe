'use client';
import useSWR from 'swr';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import UserProfileBody from '@/components/UserProfileBody/index';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const {
    data: user,
    isLoading,
    isValidating,
  } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/${username}`,
    fetcher
  );
  if (isLoading) {
    return null;
  }
  return (
    <div>
      <div>
        <ProfileHeader user={user} />
        <UserProfileBody pageUserName={username} />
      </div>
    </div>
  );
};

export default page;
