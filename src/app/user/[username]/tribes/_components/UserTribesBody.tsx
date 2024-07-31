'use client';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSearchParams } from 'next/navigation';
import TribeSkeleton from '@/components/Skeletons/TribeSkeleton';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import PaginationController from '@/components/PaginationController';
import { Post, TribeUser, TribeVisit, Tribe } from '@prisma/client';
import TribesFilter from '@/app/tribes/_components/TribesFilter';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserTribesBody = ({ pageUsername }: { pageUsername: string }) => {
  const { user }: any = useCurrentUser();
  const searchParams = useSearchParams();
  let page = parseInt(searchParams?.get('page') as string, 10);
  page = !page || page < 1 ? 1 : page;
  const filter = searchParams.get('filter') || '';
  const { data: tribesData, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${pageUsername}/${user.id}?page=${page}&filter=${filter}`,
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
  const tags = new Set();

  tribesData?.tribes?.forEach((item: any) => {
    item.tags.forEach((tag: string) => {
      tags.add(tag);
    });
  });
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= tribesData?.totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="flex flex-col  h-max">
      <TribesFilter tags={Array.from(tags)} page={page} />
      <div className="flex flex-wrap items-center justify-start">
        {tribesData.tribes?.map(
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
          }) => {
            return (
              <TribeSnippet
                key={id}
                name={name}
                desc={description}
                tribeId={id}
                members={users.length}
                isMember={users?.some(
                  (tribeUser: TribeUser) => tribeUser.userId === user.id
                )}
                userId={user?.id as string}
                image={profileImage}
                lastVisit={
                  tribeVisit.length > 0
                    ? (tribeVisit[0]?.lastVisit as any)
                    : null
                }
                newPosts={newPosts}
              />
            );
          }
        )}
      </div>
      <PaginationController
        page={page}
        hasMore={tribesData.hasMore}
        totalPages={tribesData.totalPages}
        pageNumbers={pageNumbers}
        filter={filter}
      />
    </div>
  );
};

export default UserTribesBody;
