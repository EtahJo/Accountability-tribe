'use client';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { TribeUser, Tribe, TribeVisit } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TribeSkeleton from '@/components/Skeletons/TribeSkeleton';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';

type TribeAdminManagementPageProps = Tribe & {
  tribeVisit: TribeVisit[];
  users: TribeUser[];
};
interface USerIsAdminProps {
  asSideBy?: boolean;
  presentTribeId?: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Tribes = ({ asSideBy, presentTribeId }: USerIsAdminProps) => {
  const { user }: any = useCurrentUser();
  const { data: tribesData, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
    fetcher
  );
  if (isLoading || tribesData === undefined)
    return (
      <div
        className={cn(
          'flex flex-wrap gap-2 items-center',
          asSideBy ? 'flex-col' : 'flex-row'
        )}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <TribeSkeleton key={index} />
        ))}
      </div>
    );
  const showOtherTribeInfo = tribesData.filter(
    (tribe: Tribe) => tribe.id !== presentTribeId
  );
  const tribestoMapThrough = asSideBy ? showOtherTribeInfo : tribesData;
  return (
    <div className={cn('flex gap-x-2', asSideBy ? 'flex-col' : 'flex-wrap ')}>
      {tribesData.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl">You are not admin of any tribe</p>
          <Button className="move-button">Create Tribe</Button>
        </div>
      ) : (
        tribestoMapThrough?.map(
          ({
            id,
            description,
            name,
            profileImage,
            users,
            tribeVisit,
          }: TribeAdminManagementPageProps) => (
            <TribeSnippet
              key={id}
              name={name}
              desc={description}
              tribeId={id}
              userId={user.id}
              isMember={users.some(
                (tribeUser: TribeUser) => tribeUser.userId === user.id
              )}
              members={users.length}
              image={profileImage}
              lastVisit={tribeVisit[0]?.lastVisit as any}
              manage
            />
          )
        )
      )}
    </div>
  );
};

export default Tribes;
