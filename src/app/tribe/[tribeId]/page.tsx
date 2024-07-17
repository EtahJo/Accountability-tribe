import TribeDetailHeader from '@/components/Tribe/TribeDetailHeader/index';
import TribeDetailBody, {
  TribeDetailBodyProps,
} from '@/components/Tribe/TribeDetailBody/index';
import { currentUser } from '@/lib/authentication';
import { TribeUser } from '@prisma/client';

const base_url = process.env.BASE_URL;

async function getTribeInfo(tribeId: string, currentUserId: string) {
  const response = await fetch(
    `${base_url}/tribe/api/${currentUserId}/${tribeId}`,
    {
      headers: {
        accept: 'application/json',
        method: 'GET',
      },
      next: {
        tags: ['tribeInfo'],
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch tribe');
  }
  return response.json();
}
async function getSimilarTribes(tribeInfo: any, currentUserId: String) {
  try {
    const response = await fetch(
      `${base_url}/tribe/api/?userId=${currentUserId}&tags=${tribeInfo?.tags.join(
        ','
      )}`,
      {
        next: {
          tags: ['userSimilarTribes'],
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch tribe');
    }
    return response.json();
  } catch (error: any) {
    // setError(error.message);
  }
}
async function getPostsData(tribeId: string, currentUserId: string) {
  try {
    const response = await fetch(
      `${base_url}/tribe/api/posts/${tribeId}/${currentUserId}`,
      {
        headers: {
          accept: 'application/json',
          method: 'GET',
        },
        next: {
          tags: ['tribePosts'],
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error: any) {}
}
async function TribeProfile({ params }: { params: { tribeId: string } }) {
  const { tribeId } = params;
  const user = await currentUser();
  const tribeInfo = await getTribeInfo(tribeId, user?.id as string);
  const similarTribes = await getSimilarTribes(tribeInfo, user?.id as string);
  const posts = await getPostsData(tribeId, user?.id as string);
  const newPosts = posts.newPosts;
  if (!tribeInfo) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-y-10">
      <TribeDetailHeader
        profileImage={tribeInfo.profileImage}
        tribeName={tribeInfo.name}
        tribeUsers={tribeInfo.users.length}
        tribeDescription={tribeInfo.description}
        tribeTags={tribeInfo.tags}
        users={tribeInfo.users}
        tribeId={tribeId}
        isMember={tribeInfo.users.some(
          (tribeUser: TribeUser) => tribeUser.userId === user?.id
        )}
        adminsUsername={tribeInfo.adminsUsername}
      />
      <TribeDetailBody
        tribeInfo={tribeInfo}
        posts={posts.posts}
        similarTribes={similarTribes}
        newPosts={newPosts}
      />
    </div>
  );
}

export default TribeProfile;
