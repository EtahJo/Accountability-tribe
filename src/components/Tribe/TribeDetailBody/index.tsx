'use client';
import { useEffect, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/index';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import PostForm from '@/components/Forms/PostForm';
import Posts from '@/components/Posts/index';

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
}
interface SimilarTribesProp {}
const TribeDetailBody = ({ tribeInfo, posts }: TribeDetailBodyProps) => {
  const { user } = useCurrentUser();
  const [similarTribes, setSimilarTribes] = useState<any>(null);
  const [error, setError] = useState<{ error: { message: string } } | null>(
    null
  );
  useEffect(() => {
    const fetchSimilarTribes = async () => {
      try {
        const response = await fetch(
          `/tribe/api?tags=${tribeInfo?.tags.join(',')}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tribe');
        }
        const data = await response.json();
        setSimilarTribes(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchSimilarTribes();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className=" grid grid-cols-12 pb-24">
        <div className="col-start-2 col-end-9">
          <PostForm tribeId={tribeInfo.id} />
          <SectionHeader name="Shared Experiences and Lots More" />

          {/** Posts */}
          <Posts posts={posts} />
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
          {similarTribes?.map(
            (tribe: {
              name: string;
              description: string;
              profileImage: string;
              id: string;
              tribeId: string;
              users: { id: string }[];
            }) => (
              <div>
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
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TribeDetailBody;
