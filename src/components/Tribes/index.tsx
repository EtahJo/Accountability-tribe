'use client';
import useSWR from 'swr';
import SectionHeader from '../SectionHeader/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FaPlusCircle } from 'react-icons/fa';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import { is_member } from '@/action/tribe/join-tribe';
import { get_tribe_members } from '@/action/tribe/get-tribe-members';
import { TribeUser } from '@prisma/client';
import TribeSkeleton from '../Skeletons/TribeSkeleton';
import UserSessions from '@/app/user/[username]/sessions/page';
interface TribesProps {
  pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Tribes = ({ pageUsername }: TribesProps) => {
  const { user }: any = useCurrentUser();
  const { data: tribes, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${pageUsername}/${user.id}`,
    fetcher
  );
  if (isLoading || tribes === undefined) {
    return (
      <div className="flex flex-col gap-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <TribeSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <SectionHeader
        name="Tribes"
        classNames="flex-row"
        buttonTitle="Create Tribe"
        pageUsername={pageUsername}
        buttonLink="/create-tribe"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />
      <div>
        {tribes?.map(({ tribe, newPosts }: any) => {
          return (
            <TribeSnippet
              key={tribe.id}
              name={tribe?.name}
              desc={tribe?.description}
              tribeId={tribe?.id}
              members={tribe.users.length}
              isMember={tribe.users?.some(
                (tribeUser: TribeUser) => tribeUser.userId === user.id
              )}
              userId={user?.id as string}
              image={tribe?.profileImage}
              lastVisit={tribe.tribeVisit[0]?.lastVisit}
              newPosts={newPosts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tribes;
