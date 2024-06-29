import { get_user_by_username } from '@/action/get-user';
import { getAllUserSessions } from '@/data/session';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import UserProfileBody from '@/components/UserProfileBody/index';
import { currentUser } from '@/lib/authentication';
import { getAllUserTribes } from '@/data/tribe';
import { is_member } from '@/action/join-tribe';
import { get_tribe_members } from '@/action/get-tribe-members';
import { get_all_user_sessions } from '@/action/get-all-user-sessions';
import Tribes from '@/components/Tribes/index';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';

async function getData(username: string) {
  const res = await fetch(`http://localhost:3000/user/api/posts/${username}`, {
    next: {
      tags: ['userPosts'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = await currentUser();
  const data = await get_user_by_username(username);
  const countryCode = data.user?.number?.split(',')[0].toUpperCase();
  const tribes = await getAllUserTribes(data.user?.id as string);
  const sessions = await get_all_user_sessions(data.user?.id as string);
  const posts = await getData(username);

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
          sessions={sessions?.sessions}
          tribes={tribes}
          pageUserName={username}
          posts={posts}
        >
          <Tribes>
            {tribes?.map(async ({ tribe }) => {
              const members = await get_tribe_members(tribe.id);
              const isMember = await is_member(tribe.id, user?.id as string);
              return (
                <TribeSnippet
                  name={tribe?.name}
                  desc={tribe?.description}
                  tribeId={tribe?.id}
                  members={members?.length}
                  isMember={isMember.result}
                  userId={user?.id as string}
                  image={tribe?.profileImage}
                />
              );
            })}
          </Tribes>
        </UserProfileBody>
      </div>
    </div>
  );
};

export default page;
