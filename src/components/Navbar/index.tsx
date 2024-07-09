'use client';

import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import ProfileIcon from '../ProfileIcon/index';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { session } = useCurrentUser();
  const pathname = usePathname();

  return (
    <div className="bg-purple rounded-full m-4 p-2 z-50 fixed phone:w-[96%] flex items-center justify-between  w-[90]">
      <Link
        className="md:text-3xl font-semibold text-white p-2 text-xl sm:text-2xl cursor-pointer flex"
        href={'/'}
      >
        <p className="text-lightPink">Accountability </p>
        Tribe
      </Link>
      <div className=" rounded-2xl p-2 flex gap-2 items-center">
        <Link
          href={'/tribes'}
          className={cn(
            'bg-lightPink rounded-2xl p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black shadow-3xl group',
            pathname === '/tribes' && 'bg-black text-white'
          )}
        >
          <p className="w-full group-hover:text-white">Tribes</p>
        </Link>
        <Link
          href={'/sessions'}
          className={cn(
            'bg-lightPink rounded-2xl p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black shadow-3xl',
            pathname === '/sessions' && 'bg-black text-white'
          )}
        >
          Sessions
        </Link>
      </div>
      {session.status === 'authenticated' ? (
        <div className="flex justify-between items-center">
          {' '}
          <div className="relative">
            <ProfileIcon />
          </div>
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
    </div>
  );
};

export default Navbar;
