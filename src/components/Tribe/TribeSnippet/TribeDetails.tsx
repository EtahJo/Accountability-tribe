'use client';
import Link from 'next/link';
import ProfileImage from '@/components/ProfileImage';
import FullTextOnHover from '@/components/FullTextOnHover';

interface TribeDetailsProps {
  manage?: boolean;
  image?: string | null;
  name: string;
  members: number | undefined;
  desc: string | null;
  tribeId: string;
}

const TribeDetails = ({
  manage,
  image,
  name,
  members,
  desc,
  tribeId,
}: TribeDetailsProps) => {
  return (
    <Link
      className="move-button m-auto flex flex-col items-center"
      href={!manage ? `/tribe/${tribeId}` : ''}
    >
      <ProfileImage image={image} />
      <p className="font-bold text-purple text-xl whitespace-nowrap">{name}</p>
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
  );
};

export default TribeDetails;
