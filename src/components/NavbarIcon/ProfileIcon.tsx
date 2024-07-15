'use client';
import { useRouter } from 'next/navigation';
import NavbarIcon from '@/components/NavbarIcon';
import { CldImage } from 'next-cloudinary';
import { Avatar } from '@radix-ui/react-avatar';
import { logout } from '@/action/auth/logout';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import NavbarItem from '@/components/ProfileIconItem/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const ProfileIcon = () => {
  const { user }: any = useCurrentUser();
  const router = useRouter();
  const onLogoutClick = () => {
    logout().then(() => {
      router.push('/auth/login');
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
        <DropdownMenuItem onClick={onLogoutClick} className="ml-1.5">
          <NavbarItem title="Logout" icon={<ExitIcon />} />
        </DropdownMenuItem>
      </NavbarIcon>
    </div>
  );
};

export default ProfileIcon;
