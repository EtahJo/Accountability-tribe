import { get_user_by_username } from '@/action/get-user';
import { getAllUserSessions } from '@/data/session';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import UserProfileBody from '@/components/UserProfileBody/index';
import { currentUser } from '@/lib/authentication';
import { getAllUserTribes } from '@/data/tribe';
const page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = await currentUser();
  const data = await get_user_by_username(username);
  const countryCode = data.user?.number?.split(',')[0].toUpperCase();
  // const userSess = await getAllUserSessions(username);
  const tribes = await getAllUserTribes(data.user?.id as string);

  if (data.error) {
    return (
      <div className="h-screen flex justify-center">
        <p>{data.error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ProfileHeader
          user={data.user}
          phoneNumber={data.user?.number}
          countryCode={countryCode}
        />
        <UserProfileBody
          user={user}
          sessions={data.user?.sessions}
          tribes={tribes}
        />
      </div>
    </div>
  );
};

export default page;
