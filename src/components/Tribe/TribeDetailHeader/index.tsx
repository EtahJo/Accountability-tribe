'use client';
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPen } from 'react-icons/fa';
import TribeUsers from '@/components/Tribe/TribeUsers/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import { join_tribe } from '@/action/tribe/join-tribe';
import { toast } from 'sonner';
import ProfileImage from '@/components/Tribe/TribeDetailHeader/ProfileImage';
import { delete_tribe } from '@/action/tribe/delete-tribe';
import EditTribeModalForm from '@/components/Forms/EditTribeModalForm';
import EditableComponent from '@/components/Tribe/TribeDetailHeader/EditableComponent';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';
import { Button } from '@/components/ui/button';

interface TribeDetailHeaderProps {
  profileImage: string;
  tribeName: string;
  tribeUsers: number;
  tribeDescription: string;
  adminsUsername: string[];
  tribeTags: [];
  tribeId: string;
  users: {
    user: { username: string; image: string };
    userRole: string;
    adminsUsername: string[];
    userId: string;
  }[];
  isMember?: boolean;
}
const TribeDetailHeader = ({
  profileImage,
  tribeName,
  tribeUsers,
  tribeDescription,
  adminsUsername,
  users, /// members of the tribe
  tribeId,
  isMember,
  tribeTags,
}: TribeDetailHeaderProps) => {
  const [isPending, startTransition] = useTransition();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editTribeModalOpen, setEditTribeModalOpen] = useState(false);
  const router = useRouter();
  const { user }: any = useCurrentUser();
  const isAdmin = adminsUsername.includes(user?.username);
  useEffect(() => {
    router.prefetch(`/user/${user.username}`);
  }, []);
  const joinTribe = () => {
    startTransition(() => {
      join_tribe(tribeId, user?.id as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };
  const deleteTribe = () => {
    startTransition(() => {
      delete_tribe(tribeId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          router.push(`/user/${user.username}`);
        }
      });
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

          <ProfileImage
            isAdmin={isAdmin}
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
              showEditOption={isAdmin}
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
            showEditOption={isAdmin}
          />

          {isAdmin && (
            <Button
              className="w-max m-auto move-button"
              onClick={() => setEditTribeModalOpen(true)}
            >
              Edit Tribe Information
            </Button>
          )}
          {users.length === 0 && isAdmin && (
            <DeleteConfirmation
              trigger={
                <Button
                  className="move-button w-max m-auto"
                  variant={'destructive'}
                  disabled={isPending}
                >
                  Delete Tribe
                </Button>
              }
              confirmationMessage="Are you sure you wan to delete task?"
              consequenceMessage="This action can not be reversed!"
              action={
                <Button onClick={deleteTribe} disabled={isPending}>
                  Delete Anyway
                </Button>
              }
            />
          )}

          {!isMember && (
            <Button
              onClick={joinTribe}
              className="w-48 m-auto move-button"
              disabled={isPending}
            >
              Join Us
            </Button>
          )}
        </div>
        <TribeUsers
          isOpen={modalIsOpen}
          users={users}
          onRequestClose={() => setModalIsOpen(false)}
          tribeName={tribeName}
          tribeId={tribeId}
        />
        <EditTribeModalForm
          isOpen={editTribeModalOpen}
          onRequestClose={() => setEditTribeModalOpen(false)}
          tribeDescription={tribeDescription}
          tribeName={tribeName}
          tribeId={tribeId}
          profileImage={profileImage}
          tribeTags={new Set(tribeTags)}
        />
      </div>
    </div>
  );
};

export default TribeDetailHeader;
