'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { FaUsers } from 'react-icons/fa';
import FullTextOnHover from '@/components/FullTextOnHover';
import { is_member } from '@/action/join-tribe';
import { get_tribe_members } from '@/action/get-tribe-members';

export interface TribeSnippetProps {
  image?: string;
  name: string;
  desc: string;
  tribeId: string;
  userId: string;
  joinTribe: () => void;
}

const TribeSnippet = ({
  name,
  image,
  desc,
  tribeId,
  userId,
  joinTribe,
}: TribeSnippetProps) => {
  const [members, setMembers] = useState(0);
  const [isMember, setIsMember] = useState<boolean>(false);
  useEffect(() => {
    const checkMember = async () => {
      const check = await is_member(tribeId, userId);
      setIsMember(check.result);
    };
    const getUsers = async () => {
      const members = await get_tribe_members(tribeId);
      setMembers(members?.length);
    };
    checkMember();
    getUsers();
  }, []);
  return (
    <div
      className=" bg-white flex flex-col items-center 
    justify-center px-5 py-2 rounded-3xl my-5 gap-y-1 shadow-2xl 
     m-auto"
    >
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
        <Avatar className="w-[80px]  h-[80px]">
          <AvatarFallback className="bg-black">
            <FaUsers className="text-white" size={100} />
          </AvatarFallback>
        </Avatar>
      )}
      <p className="font-bold text-purple text-xl whitespace-nowrap">{name}</p>
      <p className="whitespace-nowrap">
        {members === 0 ? 'Loading ...' : members + ' members'}
      </p>
      {desc && (
        <div className="bg-lighterPink mx-2 rounded-xl p-2">
          <FullTextOnHover text={desc} className="w-[200px] text-center" />
        </div>
      )}

      {!isMember && (
        <Button
          className="my-2 move-button py-3"
          size={'slg'}
          onClick={joinTribe}
        >
          Join
        </Button>
      )}
    </div>
  );
};

export default TribeSnippet;
