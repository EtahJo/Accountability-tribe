'use client';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';
import TribePosts from '@/components/Posts/TribePosts';
import SimilarTribes from './SimilarTribes';

import { Post, TribeUser } from '@prisma/client';
import { tribe_visit } from '@/action/tribe/tribe-visit';

export interface TribeDetailBodyProps {
  tribeId: string;
  // newPosts: Post[];
}

const TribeDetailBody = ({
  tribeId,
}: // newPosts,
TribeDetailBodyProps) => {
  const { user } = useCurrentUser();
  const [error, setError] = useState<{ error: { message: string } } | null>(
    null
  );
  // const [currentNewPosts, setCurrentNewPosts] = useState<Post[]>([]);
  useEffect(() => {
    const updateLastVisit = async () => {
      try {
        await tribe_visit(tribeId, user?.id as string);
      } catch (error) {
        console.error('Last visit update error', error);
      }
    };
    // setCurrentNewPosts(newPosts);
    if (user) {
      updateLastVisit();
    }
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className=" grid grid-cols-12 pb-24">
        <div className="col-start-2 col-end-9">
          <TribePosts tribeId={tribeId} />
        </div>
        <div className="col-start-10 col-end-12">
          <SimilarTribes tribeId={tribeId} />
        </div>
      </div>
    </div>
  );
};

export default TribeDetailBody;
