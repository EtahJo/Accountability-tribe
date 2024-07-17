'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import NavbarIcon from '@/components/NavbarIcon/index';
import { CldImage } from 'next-cloudinary';
import { Avatar } from '@radix-ui/react-avatar';
import { logout } from '@/action/auth/logout';
import { delete_user } from '@/action/auth/delete-user';
import { FaCog, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import NavbarItem from '@/components/ProfileIconItem/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfileIcon = ({ deleteUser }: { deleteUser: React.ReactNode }) => {
  const { user }: any = useCurrentUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onLogoutClick = () => {
    logout().then(() => {
      router.push('/auth/login');
    });
  };
  const deleteAccount = () => {
    startTransition(() => {
      delete_user(user.id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };
  return (
    <div>
      <NavbarIcon
        trigger={
          <div>
            {user?.image ? (
              <Avatar>
                <CldImage
                  src={user?.image}
                  width="50"
                  height="50"
                  crop={'fill'}
                  alt="User Profile"
                  sizes="100vw"
                  className="rounded-full shadow-3xl"
                />
              </Avatar>
            ) : (
              <div className="rounded-full bg-lightPink p-1.5 cursor-pointer shadow-3xl ">
                <FaUser size={20} className="text-white" />
              </div>
            )}
          </div>
        }
      >
        {' '}
        <p className="font-semibold my-5 text-center">
          {' '}
          Hello, {user?.username}
        </p>
        <DropdownMenuItem>
          <Link href={`/user/${user?.username}`}>
            <NavbarItem
              title="Visit Your Profile"
              icon={<FaUser size={25} />}
            />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <NavbarItem title="Settings" icon={<FaCog size={25} />} />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Change Theme</DropdownMenuItem>

              <DropdownMenuItem>{deleteUser}</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={onLogoutClick} className="ml-1.5">
          <NavbarItem title="Logout" icon={<ExitIcon />} />
        </DropdownMenuItem>
      </NavbarIcon>
    </div>
  );
};

export default ProfileIcon;
