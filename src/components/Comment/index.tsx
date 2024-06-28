'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
interface CommentProps {
  profileImage: string;
  username: string;
  comment: string;
}
const Comment = ({ profileImage, username, comment }: CommentProps) => {
  return (
    <div className="flex flex-col gap-y-1 border-b-2 border-b-gray-200 m-2 pb-2">
      <Link
        href={`/user/${username}`}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <Avatar className=" w-[30px] h-[30px] z-10 items-center border-2 border-lightPink  shadow-3xl">
          {!profileImage ? (
            <AvatarFallback className="bg-black">
              <FaUser className="text-white" size={50} />
            </AvatarFallback>
          ) : (
            <CldImage
              width="50"
              height="50"
              crop={'fill'}
              src={profileImage}
              sizes="100vw"
              alt="Tribe profile"
            />
          )}
        </Avatar>
        <p className="font-semibold">{username}</p>
      </Link>
      <p className="ml-8">{comment}</p>
    </div>
  );
};

export default Comment;
