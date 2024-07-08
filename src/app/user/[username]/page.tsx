import { get_user_by_username } from '@/action/get-user';

import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import UserProfileBody from '@/components/UserProfileBody/index';
import { currentUser } from '@/lib/authentication';

import { is_member } from '@/action/tribe/join-tribe';
import { get_tribe_members } from '@/action/tribe/get-tribe-members';
import Tribes from '@/components/Tribes/index';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
// import { getSessionData } from './data';

async function getPostData(username: string) {
  const postsRes = await fetch(
    `http://localhost:3000/user/api/posts/${username}`,
    {
      next: {
        tags: ['userPosts'],
      },
    }
  );
  if (!postsRes.ok) {
    throw new Error('Failed to fetch data');
  }
  return postsRes.json();
}
async function getSessionData(username: string, currentUserId: string) {
  const sessionRes = await fetch(
    `http://localhost:3000/user/api/sessions/${username}/${currentUserId}?page=${1}&filter=${'all'}`,
    {
      next: {
        tags: ['userSessions'],
      },
    }
  );
  if (!sessionRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return sessionRes.json();
}
async function getTribesData(username: string) {
  const tribesRes = await fetch(
    `http://localhost:3000/user/api/tribes/${username}`,
    {
      next: {
        tags: ['userTribes'],
      },
    }
  );
  if (!tribesRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return tribesRes.json();
}
async function getTasksData(username: string) {
  const tasksRes = await fetch(
    `http://localhost:3000/user/api/tasks/${username}`,
    {
      next: {
        tags: ['userTasks'],
      },
    }
  );
  if (!tasksRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return tasksRes.json();
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
const page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user: any = await currentUser();
  // const data = await get_user_by_username(username);
  const userData = await getUserData(username);
  const countryCode = userData?.number?.split(',')[0].toUpperCase();
  const posts = await getPostData(username);
  const sessions = await getSessionData(username, user?.id as string);
  const tribes = await getTribesData(username);
  const tasks = await getTasksData(username);
  const firstSixSessions = sessions?.sessions.slice(0, 6);

  if (userData.error) {
    return (
      <div className="h-screen flex justify-center">
        <p>{userData.error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ProfileHeader
          user={userData}
          phoneNumber={userData?.number}
          countryCode={countryCode}
        />
        <UserProfileBody
          user={user}
          sessions={firstSixSessions}
          tribes={tribes}
          pageUserName={username}
          posts={posts}
          tasks={tasks}
        >
          <Tribes>
            {tribes?.map(async ({ tribe }: any) => {
              const members = await get_tribe_members(tribe.id);
              const isMember = await is_member(tribe.id, user?.id as string);
              return (
                <TribeSnippet
                  key={tribe.id}
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
