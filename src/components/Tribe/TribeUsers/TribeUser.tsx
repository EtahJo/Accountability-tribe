'use client';
import { useTransition } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import { remove_tribe_user } from '@/action/tribe/remove-tribe-member';
import { toast } from 'sonner';
import { FaUser } from 'react-icons/fa';

interface TribeUserProps {
  name: string;
  profileImage: string;
  isAdmin: boolean;
  adminUsername: string;
  userId: string;
  tribeId: string;
}
const TribeUser = ({
  name,
  profileImage,
  isAdmin,
  adminUsername,
  userId,
  tribeId,
}: TribeUserProps) => {
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const removeTribeUser = () => {
    startTransition(() => {
      remove_tribe_user(tribeId, userId).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className="flex items-center gap-x-3 rounded-sm hover:shadow-3xl hover:bg-lighterPink p-2 w-full justify-between">
      <div className=" flex items-center gap-x-2">
        <Avatar className=" w-[40px] h-[40px] z-10 items-center border-2 border-lightPink  shadow-3xl">
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
        <span>
          <p className="text-lg">{name}</p>
          {isAdmin && <p className="text-sm text-gray-400">Admin</p>}
        </span>
      </div>

      <div className="flex items-center  justify-between ">
        <div className="flex justify-end items-center gap-x-2">
          {user?.username === name && (
            <Button
              size={'sm'}
              className="bg-gray-400 hover:bg-gray-600"
              onClick={removeTribeUser}
              disabled={isPending}
            >
              Leave Tribe
            </Button>
          )}
          {adminUsername === user?.username && (
            <Button
              size={'sm'}
              variant={'destructive'}
              onClick={removeTribeUser}
              disabled={isPending}
            >
              Remove Member
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TribeUser;
