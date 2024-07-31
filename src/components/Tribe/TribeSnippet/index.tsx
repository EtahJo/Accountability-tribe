'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { join_tribe } from '@/action/tribe/join-tribe';
import TribeDetails from '@/components/Tribe/TribeSnippet/TribeDetails';
import TribeLastVisitInfo from '@/components/Tribe/TribeSnippet/TribeLastVisitInfo';
import { mutate } from 'swr';
import Link from 'next/link';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formatDateTime } from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Badge } from '@/components/ui/badge';

export interface TribeSnippetProps {
  image?: string | null;
  name: string;
  desc: string | null;
  tribeId: string;
  userId: string | undefined | null;
  isMember: boolean;
  members: number | undefined;
  lastVisit?: string;
  newPosts?: {}[];
  manage?: boolean;
}

const TribeSnippet = ({
  name,
  image,
  desc,
  tribeId,
  isMember,
  members,
  userId,
  lastVisit,
  newPosts,
  manage,
}: TribeSnippetProps) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const joinTribe = () => {
    startTransition(() => {
      join_tribe(tribeId, userId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/recommended-tribes/${user.id}`
          );
        }
      });
    });
  };
  return (
    <div
      className="bg-white flex flex-col items-center 
    justify-center px-5 py-3 rounded-3xl my-5 gap-y-1 shadow-2xl
     m-auto largePhone:w-[300px] relative group/item min-[355px]:w-[200px] w-[170px] "
    >
      {newPosts && newPosts.length > 0 && (
        <Badge className="bg-purple absolute left-1 -top-3 rounded-3xl text-xs">
          {newPosts.length} new posts
        </Badge>
      )}
      {manage && (
        <div className="bg-lighterPink absolute w-full h-full z-50 hidden group-hover/item:block ">
          <div className="flex justify-center items-center m-auto h-full">
            <Link href={`/tribe-admin-management/${tribeId}`}>
              <Button className="text-2xl font-bold  p-3  move-button shadow-3xl">
                Manage
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className={cn(manage ? 'group-hover/item:blur-sm' : '')}>
        <TribeLastVisitInfo lastVisit={lastVisit} />

        <TribeDetails
          manage={manage}
          image={image}
          name={name}
          members={members}
          desc={desc}
          tribeId={tribeId}
        />
      </div>

      {!isMember && (
        <Button
          className="my-2 move-button "
          size={'slg'}
          disabled={isPending}
          onClick={joinTribe}
        >
          Join Us
        </Button>
      )}
    </div>
  );
};

export default TribeSnippet;
