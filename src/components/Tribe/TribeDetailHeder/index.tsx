'use client';
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import TribeUsers from '@/components/Tribe/TribeUsers';
import { tribe_visit } from '@/action/tribe/tribe-visit';
import { useCurrentUser } from '@/hooks/use-current-user';

interface TribeDetailHeaderProps {
  profileImage: string;
  tribeName: string;
  tribeUsers: number;
  tribeDescription: string;
  tribeId: string;
  users: { username: string; image: string; id: string }[];
}
const TribeDetailHeader = ({
  profileImage,
  tribeName,
  tribeUsers,
  tribeDescription,
  users,
  tribeId,
}: TribeDetailHeaderProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useCurrentUser();
  useEffect(() => {
    const updateLastVisit = async () => {
      try {
        await tribe_visit(tribeId, user?.id as string);
      } catch (error) {
        console.log('Last visit update error', error);
      }
    };
    if (user) {
      updateLastVisit();
    }
  }, []);
  return (
    <div className=" grid  grid-cols-10">
      <div className="bg-white shadow-3xl rounded-3xl p-10  pt-24 flex-col relative col-start-2 col-end-10 mx-2">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div
              className="w-[100px] h-[100px] rounded-full 
     bg-lightPink flex justify-center items-center shadow-buttonInner p-2 -mt-24"
            >
              <p className="text-shadow-xl text-center whitespace-normal font-bold text-lg">
                You can do it
              </p>
            </div>
            <div
              className="w-[100px] h-[100px] rounded-full  
     bg-lightPink flex justify-center items-center shadow-buttonInner p-2"
            >
              <p className="text-shadow-xl text-center whitespace-normal font-bold text-lg">
                Yes you can
              </p>
            </div>
          </div>
          <Avatar
            className=" w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-4
 border-white -mt-24 shadow-3xl"
          >
            {!profileImage ? (
              <AvatarFallback className="bg-black">
                <FaUser className="text-white" size={100} />
              </AvatarFallback>
            ) : (
              <CldImage
                width="180"
                height="180"
                crop={'fill'}
                src={profileImage}
                sizes="100vw"
                alt="Tribe profile"
              />
            )}
          </Avatar>
          <div className="flex items-center">
            <div
              className="w-[100px] h-[100px] rounded-full 
     bg-lightPink flex justify-center items-center shadow-buttonInner p-2"
            >
              <p className="text-shadow-xl text-center whitespace-normal font-bold text-lg">
                Be Strong
              </p>
            </div>
            <div
              className="w-[100px] h-[100px] rounded-full  bg-lightPink flex 
            justify-center items-center shadow-buttonInner p-2 -mt-24"
            >
              <p className="text-shadow-xl text-center whitespace-normal font-bold text-lg">
                Be Bold
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col gap-3 mt-5">
          <div className="bg-purple px-3 py-2 rounded-xl ">
            <p className="text-4xl font-bold text-center">{tribeName}</p>
            <p
              className="text-center text-lightPink cursor-pointer hover:underline"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              {tribeUsers} {tribeUsers > 1 ? 'members' : 'member'}
            </p>
          </div>

          <p className="text-lg  text-center">{tribeDescription}</p>
        </div>
        <TribeUsers
          isOpen={modalIsOpen}
          users={users}
          onRequestClose={() => setModalIsOpen(false)}
          tribeName={tribeName}
        />
      </div>
    </div>
  );
};

export default TribeDetailHeader;
