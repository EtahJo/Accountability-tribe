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
async function getTribesData(username: string, currentUserId: string) {
  const tribesRes = await fetch(
    `http://localhost:3000/user/api/tribes/${username}/${currentUserId}`,
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
    `http://localhost:3000/user/api/tasks/${username}/uncompleted`,
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
async function getCompletedTasksData(username: string) {
  const completedTasksRes = await fetch(
    `http://localhost:3000/user/api/tasks/${username}/completed-task`,
    {
      next: {
        tags: ['userCompletedTasks'],
      },
    }
  );
  if (!completedTasksRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return completedTasksRes.json();
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
  const userData = await getUserData(username);
  const countryCode = userData?.number?.split(',')[0].toUpperCase();
  const posts = await getPostData(username);
  const sessions = await getSessionData(username, user?.id as string);
  const tribes = await getTribesData(username, user?.id);
  const tasks = await getTasksData(username);
  const completedTask = await getCompletedTasksData(username);
  console.log('Tribes Data >>', tribes);

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
          sessions={sessions.sessions}
          tribes={tribes}
          pageUserName={username}
          posts={posts}
          tasks={tasks}
          completedTasks={completedTask}
        >
          <Tribes pageUsername={username}>
            {tribes?.map(async ({ tribe, newPosts }: any) => {
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
                  lastVisit={tribe.tribeVisit[0]?.lastVisit}
                  newPosts={newPosts}
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
