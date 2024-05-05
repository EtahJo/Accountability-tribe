'use client';
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthenticationContext';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
const Navbar = () => {
  const { login } = useContext(AuthContext);
  return (
    <div className="bg-purple rounded-full m-4 p-2 z-50 fixed phone:w-[96%] flex items-center justify-between  w-[90]">
      <Link
        className="md:text-5xl font-bold text-white p-2 text-xl sm:text-2xl cursor-pointer"
        href={'/'}
      >
        Accountability Tribe
      </Link>
      {login ? (
        <div className="flex justify-between items-center">
          {' '}
          <div className="bg-white rounded-full flex place-content-center p-4 h-10 items-center">
            <BiSolidMessageSquareDetail size={30} />
            <IoIosNotificationsOutline size={30} />
            <AiOutlineUser size={30} />
          </div>{' '}
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            className="font-thin hover:font-bold cursor-pointer"
            href={'/auth/login'}
          >
            Login
          </Link>
          <p className="text-white font-thin hover:font-bold cursor-pointer">
            Sign Up
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
