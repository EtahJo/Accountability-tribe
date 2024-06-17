'use client';

import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import ProfileIcon from '../ProfileIcon/index';
const Navbar = () => {
  const { session } = useCurrentUser();
  return (
    <div className="bg-purple rounded-full m-4 p-2 z-50 fixed phone:w-[96%] flex items-center justify-between  w-[90]">
      <Link
        className="md:text-3xl font-semibold text-white p-2 text-xl sm:text-2xl cursor-pointer flex"
        href={'/'}
      >
        <p className="text-lightPink">Accountability </p>
        Tribe
      </Link>
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
