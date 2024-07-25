'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { User } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user';
import SocialMedia from '@/components/UserProfile/ProfileHeader/SocialMedia';
import ContactInfo from '@/components/UserProfile/ProfileHeader/ContactInfo';
import UserProfileImage from '@/components/UserProfile/ProfileHeader/UserProfileImage';

interface ProfileHeaderProps {
  user: User;
}
const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { session }: any = useCurrentUser();
  return (
    <div className="py-10">
      <div className="bg-purple grid grid-cols-12 justify-between rounded-5xl mx-10 pt-10 ">
        <div className="col-start-2 col-end-9">
          <div className="flex items-center border-b-[1px] border-b-black justify-between pb-2 my-5">
            <span className="text-lightPink flex items-center font-semibold text-4xl">
              {session && user?.id === session?.data?.user.id ? 'Hello,' : ''}
              <p className=" text-white"> {user?.username}</p>
            </span>

            {session && user?.id === session?.data?.user.id && (
              <Button className="bg-black hover:bg-lightPink flex items-center gap-1 align-middle justify-between group move-button">
                <Link href={'/edit-profile'}>Edit information</Link>
                <FaEdit
                  size={20}
                  className="text-lightPink  group-hover:text-white mb-px"
                />
              </Button>
            )}
          </div>
          <div className="flex justify-between">
            <ContactInfo user={user} />
            <SocialMedia user={user} />
          </div>
        </div>

        <div className="col-start-10 col-end-12 flex flex-col h-[250px] relative w-full">
          <UserProfileImage user={user} />
          <div
            className="bg-lightPink absolute bottom-0 w-full h-[100px] border-l-2
         border-l-purple border-t-2 border-t-purple rounded-tl-5xl border-r-2 border-r-purple
         rounded-tr-5xl before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
