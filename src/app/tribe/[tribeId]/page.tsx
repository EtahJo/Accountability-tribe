import TribeDetailHeader from '@/components/Tribe/TribeDetailHeder/index';
import TribeDetailBody, {
  TribeDetailBodyProps,
} from '@/components/Tribe/TribeDetailBody/index';

async function getTribeInfo(tribeId: string) {
  const response = await fetch(`http://localhost:3000/tribe/api/${tribeId}`, {
    headers: {
      accept: 'application/json',
      method: 'GET',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tribe');
  }
  return response.json();
}
async function getSimilarTribes(tribeInfo: any) {
  try {
    const response = await fetch(
      `http://localhost:3000/tribe/api?tags=${tribeInfo?.tags.join(',')}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch tribe');
    }
    return response.json();
  } catch (error: any) {
    // setError(error.message);
  }
}
async function getPostsData(tribeId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/tribe/api/posts/${tribeId}`,
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
  const tribeInfo = await getTribeInfo(tribeId);
  const similarTribes = await getSimilarTribes(tribeInfo);
  const posts = await getPostsData(tribeId);
  if (!tribeInfo) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-y-10">
      <TribeDetailHeader
        profileImage={tribeInfo.profileImage}
        tribeName={tribeInfo.name}
        tribeUsers={tribeInfo.users.length}
        tribeDescription={tribeInfo.description}
        users={tribeInfo.users}
      />
      <TribeDetailBody
        tribeInfo={tribeInfo}
        posts={posts}
        similarTribes={similarTribes}
      />
    </div>
  );
}

export default TribeProfile;
