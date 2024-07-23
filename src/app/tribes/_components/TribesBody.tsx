'use client';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSearchParams } from 'next/navigation';
import PaginationController from '@/components/PaginationController';
import TribeSnippet from '@/components/Tribe/TribeSnippet';
import TribeSkeleton from '@/components/Skeletons/TribeSkeleton';
import { Post, TribeUser, TribeVisit, Tribe } from '@prisma/client';
import TribesFilter from './TribesFilter';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TribesBody = () => {
  const { user }: any = useCurrentUser();
  const searchParams = useSearchParams();
  let page = parseInt(searchParams?.get('page') as string, 10);
  page = !page || page < 1 ? 1 : page;
  const filter = searchParams.get('filter');
  const { data: tribesData, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/tribes/api/${user.id}?page=${page}&filter=${filter}`,
    fetcher
  );
  if (isLoading || tribesData === undefined) {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <TribeSkeleton key={index} />
        ))}
      </div>
    );
  }
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= tribesData?.totalPages) {
      pageNumbers.push(i);
    }
  }
  const tags = new Set();

  tribesData?.tribes?.forEach((item: any) => {
    item.tags.forEach((tag: string) => {
      tags.add(tag);
    });
  });

  return (
    <div className="h-screen flex flex-col">
      <TribesFilter tags={Array.from(tags)} page={page} />
      <div className="flex items-center justify-start">
        {tribesData.tribes.map(
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
            <TribeSnippet
              key={id}
              name={name}
              desc={description}
              image={profileImage}
              members={users.length}
              isMember={users?.some(
                (tribeUser: TribeUser) => tribeUser.userId === user?.id
              )}
              lastVisit={
                tribeVisit.length > 0 ? (tribeVisit[0]?.lastVisit as any) : null
              }
              newPosts={newPosts}
              tribeId={id}
              userId={user.id}
            />
          )
        )}
      </div>
      <PaginationController
        page={page}
        hasMore={tribesData.hasMore}
        totalPages={tribesData.totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};

export default TribesBody;
