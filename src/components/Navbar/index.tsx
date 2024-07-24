'use client';
import { useTransition, useState } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import ProfileIcon from '@/components/NavbarIcon/ProfileIcon';
import NotificationIcon from '@/components/NavbarIcon/NotificationIcon';
import StreakIcon from '@/components/NavbarIcon/StreakIcon';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';
import { usePathname, useRouter } from 'next/navigation';
import ModalWrapper from '../ModalWrap/index';
import { delete_user } from '@/action/auth/delete-user';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import MobileView from '@/components/Navbar/MobileView';
import { FaBars } from 'react-icons/fa';

import { cn } from '@/lib/utils';

const Navbar = () => {
  const { session, user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const deleteAccount = () => {
    startTransition(() => {
      delete_user(user.id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          router.push('/');
        }
      });
    });
  };
  return (
    <div className="bg-purple rounded-full m-4 p-2 z-50 fixed phone:w-[96%] flex items-center justify-between  w-[90]">
      <Link
        className="md:text-3xl font-semibold text-white p-2 text-lg sm:text-2xl cursor-pointer flex"
        href={'/'}
      >
        <p className="text-lightPink">Accountability </p>
        Tribe
      </Link>

      <div className=" rounded-2xl p-2 lg:flex gap-2 items-center hidden">
        <Link
          href={'/tribes?page=1'}
          className={cn(
            'bg-lightPink rounded-2xl p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black shadow-3xl group',
            pathname.startsWith('/tribes') && 'bg-black text-white shadow-none'
          )}
        >
          <p className="w-full group-hover:text-white">Tribes</p>
        </Link>
        <Link
          href={'/sessions?page=1&filter=all'}
          className={cn(
            'bg-lightPink rounded-2xl p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black shadow-3xl',
            pathname.startsWith('/sessions') &&
              'bg-black text-white shadow-none'
          )}
        >
          Sessions
        </Link>
        {session.status === 'authenticated' && (
          <Link
            href={'/tribe-admin-management'}
            className={cn(
              'bg-lightPink rounded-2xl p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black shadow-3xl',
              pathname.startsWith('/tribe-admin-management') &&
                'bg-black text-white shadow-none'
            )}
          >
            Manage Tribes
          </Link>
        )}
      </div>
      {session.status === 'authenticated' ? (
        <div className="flex justify-between items-center gap-x-4">
          <FaBars
            size={25}
            className="text-lightPink block lg:hidden "
            onClick={() => setOpenDropdown((prev) => !prev)}
          />
          {openDropdown && (
            <MobileView closeDropdown={() => setOpenDropdown(false)} />
          )}{' '}
          <div className="relative lg:flex items-center gap-4 hidden">
            <StreakIcon count={user?.streak?.count} />
            <NotificationIcon notifications={user.notifications} />
          </div>
          <ProfileIcon
            deleteUser={
              <Button
                variant={'destructive'}
                onClick={() => setOpenDeleteUserModal(true)}
              >
                Delete Account
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            className="font-thin hover:font-bold cursor-pointer"
            href={'/auth/login'}
          >
            Login
          </Link>
          <Link
            href={'/auth/signup'}
            className="text-white font-thin hover:font-bold cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      )}
      <ModalWrapper
        isOpen={openDeleteUserModal}
        onRequestClose={() => setOpenDeleteUserModal(false)}
      >
        <DeleteConfirmation
          trigger={
            <Button variant={'destructive'} disabled={isPending}>
              Delete My Account
            </Button>
          }
          confirmationMessage={'Are you sure you want to delete your account'}
          consequenceMessage={'This action cannot be undone'}
          action={
            <Button variant={'destructive'} onClick={deleteAccount}>
              Delete Anyway
            </Button>
          }
        />
      </ModalWrapper>
    </div>
  );
};

export default Navbar;
