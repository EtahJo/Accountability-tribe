'use client';
import { useEffect, useState } from 'react';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import PostForm from '@/components/Forms/PostForm';
import Posts from '@/components/Posts/index';
import SectionHeader from '@/components/SectionHeader/index';
import { Post } from '@prisma/client';
import { tribe_visit } from '@/action/tribe/tribe-visit';

export interface TribeDetailBodyProps {
  tribeInfo: {
    id: string;
    name: string;
    description: string;
    profileImage: string;
    tribeId: string;
    users: { userId: string }[];
    tags: string[];
  };
  posts: {}[];
  similarTribes: {}[];
  newPosts: Post[];
}

const TribeDetailBody = ({
  tribeInfo,
  posts,
  similarTribes,
  newPosts,
}: TribeDetailBodyProps) => {
  const { user } = useCurrentUser();
  const [error, setError] = useState<{ error: { message: string } } | null>(
    null
  );
  const [currentNewPosts, setCurrentNewPosts] = useState<Post[]>([]);
  useEffect(() => {
    const updateLastVisit = async () => {
      try {
        await tribe_visit(tribeInfo.id, user?.id as string);
      } catch (error) {
        console.error('Last visit update error', error);
      }
    };
    setCurrentNewPosts(newPosts);
    if (user) {
      updateLastVisit();
    }
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className=" grid grid-cols-12 pb-24">
        <div className="col-start-2 col-end-9">
          <PostForm tribeId={tribeInfo.id} />

          {/** Posts */}
          <Posts
            posts={posts}
            newPosts={currentNewPosts}
            tribeId={tribeInfo.tribeId}
          />
        </div>
        <div className="col-start-10 col-end-12">
          <SectionHeader name="Similar Tribes" />
          {error && (
            <div>
              <p>{'Error:' + error}</p>
            </div>
          )}
          {!similarTribes && <div>loading...</div>}
          {/** Similar tribes */}
          {similarTribes?.map((tribe: any) => (
            <div key={tribe.id}>
              {tribe.id !== tribeInfo.id && (
                <TribeSnippet
                  name={tribe.name}
                  desc={tribe.description}
                  image={tribe.profileImage}
                  userId={user?.id}
                  tribeId={tribe.id}
                  members={tribe.users?.length}
                  isMember={tribe.users?.some(
                    (tribeUser) => tribeUser.userId === user?.id
                  )}
                  lastVisit={
                    tribe.tribeVisit.length > 0 &&
                    tribe?.tribeVisit[0]?.lastVisit
                  }
                  newPosts={tribe.newPosts}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TribeDetailBody;
