'use client';
import { useTransition } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import { remove_tribe_user } from '@/action/tribe/remove-tribe-member';
import { make_tribe_admin } from '@/action/tribe/add-tribe-admin';
import { remove_as_admin } from '@/action/tribe/remove-as-admin';
import { toast } from 'sonner';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

interface TribeUserProps {
  name: string;
  profileImage: string;
  isAdmin: boolean;
  adminsUsername?: string[];
  userId?: string;
  tribeId?: string;
  users?: {
    user: { username: string; image: string };
    userRole: string;
    adminsUsername: string[];
    userId: string;
  }[];
}
const TribeUser = ({
  name,
  profileImage,
  isAdmin,
  adminsUsername,
  userId,
  tribeId,
  users,
}: TribeUserProps) => {
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const canLeaveTribe =
    user.username === name &&
    (!adminsUsername?.includes(name) ||
      (adminsUsername.length > 1 && adminsUsername.includes(name)));
  const isAdminLoggedIn = adminsUsername?.includes(user.username);
  const canAdminleaveTribe = isAdminLoggedIn && users?.length === 1;
  const canMakeAdmin = !adminsUsername?.includes(name);

  const canUnMakeAdmin = adminsUsername ? adminsUsername.length > 1 : null;
  const makeAdmin = () => {
    startTransition(() => {
      if (tribeId && userId)
        make_tribe_admin(tribeId, userId).then((data) => {
          if (data?.success) {
            toast.success(data.success);
          }
          if (data?.error) {
            toast.error(data.error);
          }
        });
    });
  };
  const removeAsAdmin = () => {
    startTransition(() => {
      if (tribeId && userId)
        remove_as_admin(tribeId, userId).then((data) => {
          if (data?.success) {
            toast.success(data.success);
          }
          if (data?.error) {
            toast.error(data.error);
          }
        });
    });
  };
  const removeTribeUser = () => {
    startTransition(() => {
      if (tribeId && userId)
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
      <Link href={`/user/${name}`} className=" flex items-center gap-x-2">
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
      </Link>

      <div className="flex items-center  justify-between ">
        <div className="flex justify-end items-center gap-x-2">
          {(canLeaveTribe || canAdminleaveTribe) && (
            <Button
              size={'sm'}
              className="bg-gray-400 hover:bg-gray-600"
              onClick={removeTribeUser}
              disabled={isPending}
            >
              Leave Tribe
            </Button>
          )}
          {isAdminLoggedIn && name !== user.username && (
            <Button
              size={'sm'}
              variant={'destructive'}
              onClick={removeTribeUser}
              disabled={isPending}
            >
              Remove Member
            </Button>
          )}
          {isAdminLoggedIn &&
            (canMakeAdmin ? (
              <Button size={'sm'} onClick={makeAdmin} disabled={isPending}>
                Make Admin
              </Button>
            ) : (
              canUnMakeAdmin && (
                <Button
                  size={'sm'}
                  disabled={isPending}
                  onClick={removeAsAdmin}
                >
                  Remove As Admin
                </Button>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default TribeUser;
