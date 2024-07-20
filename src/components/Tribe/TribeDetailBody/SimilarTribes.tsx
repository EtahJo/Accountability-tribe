'use client';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import SectionHeader from '@/components/SectionHeader';
import { TribeUser, TribeVisit, Tribe, Post } from '@prisma/client';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SimilarTribes = ({ tribeId }: { tribeId: string }) => {
  const { user }: any = useCurrentUser();
  const {
    data: similarTribes,
    isLoading,
    isValidating,
  } = useSWR(
    `https://accountability-tribe.vercel.app/tribe/api/${user.id}/${tribeId}/similar-tribes`,
    fetcher
  );
  if (isLoading || isValidating || similarTribes === undefined) return null;

  return (
    <div>
      <SectionHeader name="Similar Tribes" />
      <div>
        {similarTribes?.map(
          ({
            description,
            id,
            name,
            newPosts,
            profileImage,
            users,
            tribeVisit,
          }: Tribe & {
            newPosts: Post[];
            users: TribeUser[];
            tribeVisit: TribeVisit[];
          }) => (
            <div key={id}>
              <TribeSnippet
                name={name}
                desc={description}
                image={profileImage}
                members={users.length}
                isMember={users?.some(
                  (tribeUser: TribeUser) => tribeUser.userId === user?.id
                )}
                lastVisit={
                  tribeVisit.length > 0
                    ? (tribeVisit[0]?.lastVisit as any)
                    : null
                }
                newPosts={newPosts}
                tribeId={id}
                userId={user.id}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SimilarTribes;
