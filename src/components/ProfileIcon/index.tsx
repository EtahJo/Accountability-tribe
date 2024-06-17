import React from 'react';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import ProfileIconItem from '../ProfileIconItem/index';
import { logout } from '@/action/logout';
import { ExitIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import Link from 'next/link';

const ProfileIcon = () => {
  const { user } = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full bg-lightPink p-1.5 cursor-pointer ">
          <FaUser size={20} className="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0">
        {' '}
        <p className="font-semibold my-5 text-center">
          {' '}
          Hello, {user?.username}
        </p>
        <DropdownMenuItem>
          <Link href={'/user-profile'}>
            <ProfileIconItem
              title="Visit Your Profile"
              icon={<FaUser size={25} />}
            />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ProfileIconItem
            title="Your Messages"
            icon={<BiSolidMessageSquareDetail size={25} />}
            number={12}
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ProfileIconItem
            title="Your Notifications"
            icon={<IoIosNotificationsOutline size={25} />}
            number={20}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClick} className="ml-1.5">
          <ProfileIconItem title="Logout" icon={<ExitIcon />} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileIcon;
