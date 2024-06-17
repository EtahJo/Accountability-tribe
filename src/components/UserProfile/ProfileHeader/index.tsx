'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

const ProfileHeader = () => {
  const { session, user } = useCurrentUser();
  return (
    <div className="py-10">
      <div className="bg-purple grid grid-cols-12 justify-between rounded-5xl mx-10 pt-10 ">
        <div className="col-start-2 col-end-9">
          <div className="flex items-center border-b-[1px] border-b-black justify-between pb-2 my-5">
            <span className="text-lightPink flex items-center font-semibold text-4xl">
              Hello,
              <p className=" text-white"> {user?.username}</p>
            </span>

            <Button variant={'primary'} className="bg-black hover:bg-lightPink">
              <Link href={'/edit-profile'}>Edit information</Link>
            </Button>
          </div>
          <div>
            <span className="flex items-center">
              <p className="text-white mr-1.5">Email:</p>
              <p className="text-lightPink">{user?.email}</p>
            </span>
            <span className="flex items-center">
              <p className="text-white mr-1.5">Email:</p>
              <p className="text-lightPink">{user?.email}</p>
            </span>
          </div>
        </div>

        <div className="col-start-10 col-end-12 flex flex-col h-[250px] relative w-full">
          <Avatar className="w-[180px] h-[180px] z-10 items-center flex justify-center m-auto">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-black">
              <FaUser className="text-white" size={100} />
            </AvatarFallback>
          </Avatar>
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
