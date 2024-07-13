'use client';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser, FaPen } from 'react-icons/fa';
import TribeUsers from '@/components/Tribe/TribeUsers';
import { useCurrentUser } from '@/hooks/use-current-user';
import { join_tribe } from '@/action/tribe/join-tribe';
import { toast } from 'sonner';
import ProfileImage from '@/components/Tribe/TribeDetailHeader/ProfileImage';
import EditableComponent from '@/components/Tribe/TribeDetailHeader/EditableComponent';
import { Button } from '@/components/ui/button';

interface TribeDetailHeaderProps {
  profileImage: string;
  tribeName: string;
  tribeUsers: number;
  tribeDescription: string;
  tribeAdminUsername: string;
  tribeId: string;
  users: { username: string; image: string; id: string }[];
  isMember?: boolean;
}
const TribeDetailHeader = ({
  profileImage,
  tribeName,
  tribeUsers,
  tribeDescription,
  tribeAdminUsername,
  users, /// members of the tribe
  tribeId,
  isMember,
}: TribeDetailHeaderProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user }: any = useCurrentUser();
  const joinTribe = () => {
    join_tribe(tribeId, user?.id as string).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <div className=" grid  grid-cols-10">
      <div className="bg-white shadow-3xl rounded-3xl p-10  pt-24 flex-col relative col-start-2 col-end-10 mx-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="w-[100px] h-[100px] rounded-full 
     bg-lightPink flex justify-center items-center shadow-buttonInner
      p-2 -mt-24 relative"
            >
              <p
                className="text-shadow-xl text-center whitespace-normal 
              font-bold text-lg circle-message-before"
              >
                You can do it
              </p>
            </div>
            <div
              className="w-[100px] h-[100px] rounded-full  
     bg-lightPink flex justify-center items-center shadow-buttonInner p-2"
            >
              <p
                className="text-shadow-xl text-center whitespace-normal 
              font-bold text-lg circle-message-before"
              >
                Yes you can
              </p>
            </div>
          </div>

          {/* <Avatar
            className=" w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-4
 border-white -mt-24 shadow-3xl relative"
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
          </Avatar> */}
          <ProfileImage
            isAdmin={user?.username === tribeAdminUsername}
            profileImage={profileImage}
            tribeId={tribeId}
          />
          <div className="flex items-center">
            <div
              className="w-[100px] h-[100px] rounded-full 
     bg-lightPink flex justify-center items-center shadow-buttonInner p-2"
            >
              <p
                className="text-shadow-xl text-center 
              whitespace-normal font-bold text-lg circle-message-before"
              >
                Be Strong
              </p>
            </div>
            <div
              className="w-[100px] h-[100px] rounded-full  bg-lightPink flex 
            justify-center items-center shadow-buttonInner p-2 -mt-24"
            >
              <p
                className="text-shadow-xl text-center whitespace-normal
               font-bold text-lg circle-message-before before:-ml-3"
              >
                Be Bold
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col gap-3 mt-5">
          <div className="bg-purple px-3 py-2 rounded-xl ">
            <EditableComponent
              tribeId={tribeId}
              text={tribeName}
              name="name"
              editTrigger={
                <FaPen className="text-lightPink cursor-pointer hover:text-black" />
              }
              cancelTrigger={
                <p className="text-lightPink font-bold cursor-pointer">X</p>
              }
              textClass="text-4xl font-bold text-center"
              showEditOption={user?.username === tribeAdminUsername}
            />

            <p
              className="text-center text-lightPink cursor-pointer hover:underline"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              {tribeUsers} {tribeUsers > 1 ? 'members' : 'member'}
            </p>
          </div>
          <EditableComponent
            tribeId={tribeId}
            text={tribeDescription}
            textArea
            name="description"
            editTrigger={
              <FaPen className="text-purple cursor-pointer hover:text-black" />
            }
            cancelTrigger={
              <p className="text-lightPink font-bold cursor-pointer">X</p>
            }
            textClass="text-lg  text-center"
            showEditOption={user?.username === tribeAdminUsername}
          />

          {user?.username === tribeAdminUsername && (
            <Button className="w-max m-auto move-button">
              Edit Tribe Information
            </Button>
          )}

          {!isMember && (
            <Button onClick={joinTribe} className="w-48 m-auto move-button">
              Join Us
            </Button>
          )}
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
