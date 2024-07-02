'use client';
import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { FaUsers } from 'react-icons/fa';
import FullTextOnHover from '@/components/FullTextOnHover';
import { join_tribe } from '@/action/join-tribe';
import Link from 'next/link';
export interface TribeSnippetProps {
  image?: string | null;
  name: string;
  desc: string | null;
  tribeId: string;
  userId: string | undefined | null;
  isMember: boolean;
  members: number | undefined;
}

const TribeSnippet = ({
  name,
  image,
  desc,
  tribeId,
  isMember,
  members,
  userId,
}: TribeSnippetProps) => {
  useEffect(() => {}, [isMember, members]);
  return (
    <div
      className="bg-white flex flex-col items-center 
    justify-center px-5 py-3 rounded-3xl my-5 gap-y-1 shadow-2xl m-auto"
    >
      <Link
        className="move-button m-auto flex flex-col items-center"
        href={`/tribe/${tribeId}`}
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
          onClick={() => join_tribe(tribeId, userId as string)}
        >
          Join
        </Button>
      )}
    </div>
  );
};

export default TribeSnippet;
