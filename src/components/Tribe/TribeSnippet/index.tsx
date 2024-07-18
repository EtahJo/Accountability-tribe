'use client';
import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { FaUsers } from 'react-icons/fa';
import FullTextOnHover from '@/components/FullTextOnHover/index';
import { join_tribe } from '@/action/tribe/join-tribe';
import Link from 'next/link';
import { toast } from 'sonner';
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
  useEffect(() => {}, [isMember, members]);
  return (
    <div
      className="bg-white flex flex-col items-center 
    justify-center px-5 py-3 rounded-3xl my-5 gap-y-1 shadow-2xl
     m-auto w-[300px] relative group/item"
    >
      {newPosts && newPosts.length > 0 && (
        <Badge className="bg-purple absolute left-1 top-1 rounded-3xl">
          {newPosts.length} new posts
        </Badge>
      )}
      {manage && (
        <div className="bg-lighterPink absolute w-full h-full z-50 hidden group-hover/item:block">
          <div className="flex justify-center items-center m-auto h-full">
            <Link href={`/tribe-admin-management/${tribeId}`}>
              <Button className="text-2xl font-bold  p-3  move-button shadow-3xl">
                Manage
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className="flex justify-end   w-full absolute right-1 top-1">
        <div className="text-gray-500 text-[10px] bg-lighterPink rounded-3xl px-2  flex flex-col items-center justify-center">
          {lastVisit ? (
            <>
              {' '}
              <p className="font-bold text-black">Last Visit</p>
              <p>{formatDateTime(lastVisit, user?.timezone).date}</p>
              <p>{formatDateTime(lastVisit, user?.timezone).time}</p>
            </>
          ) : (
            <>
              <p>Never Visited</p>
            </>
          )}
        </div>
      </div>

      <Link
        className="move-button m-auto flex flex-col items-center"
        href={!manage ? `/tribe/${tribeId}` : ''}
      >
        <Avatar className="w-[80px]  h-[80px] shadow-lg">
          {image ? (
            <CldImage
              width={'100'}
              height="100"
              crop={'fill'}
              src={image}
              sizes="100vw"
              alt="Tribe profile"
            />
          ) : (
            <AvatarFallback className="bg-black">
              <FaUsers className="text-white" size={100} />
            </AvatarFallback>
          )}
        </Avatar>
        <p className="font-bold text-purple text-xl whitespace-nowrap">
          {name}
        </p>
        {members && (
          <p className="whitespace-nowrap">
            {members} {members > 1 ? 'members' : 'member'}
          </p>
        )}

        {desc && (
          <div className="bg-lighterPink mx-2 rounded-xl p-2">
            <FullTextOnHover text={desc} className="w-[200px] text-center" />
          </div>
        )}
      </Link>
      {!isMember && (
        <Button
          className="my-2 move-button py-3"
          size={'slg'}
          onClick={() =>
            join_tribe(tribeId, userId as string).then((data) => {
              if (data.error) {
                toast.error(data.error);
              }
              if (data.success) {
                toast.success(data.success);
              }
            })
          }
        >
          Join Us
        </Button>
      )}
    </div>
  );
};

export default TribeSnippet;
