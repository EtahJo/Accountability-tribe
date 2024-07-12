import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { FaUser, FaBolt } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CountryFlag from '@/components/CountryFlag/index';
import { Button } from '@/components/ui/button';
import ToolTip from '@/components/ToolTip';

interface UserSnippetProps {
  username: string | null;
  userImage?: string | null;
  numberOfTribes: number;
  userCountry?: string | null;
  streak: number;
}
const UserSnippet = ({
  username,
  userImage,
  numberOfTribes,
  userCountry,
  streak,
}: UserSnippetProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/user/${username}`} className="relative">
            <Avatar className="border-purple border move-button">
              {userImage ? (
                <CldImage
                  width="180"
                  height="180"
                  crop={'fill'}
                  src={userImage}
                  sizes="100vw"
                  alt="User profile"
                />
              ) : (
                <AvatarFallback className="bg-black">
                  <FaUser className="text-white" size={120} />
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent className=" mt-3 flex flex-col items-center justify-center">
          <div className="bg-lighterPink p-4 flex flex-col justify-center items-center rounded-2xl">
            <span className="flex items-center gap-x-2 -my-2 ">
              {userCountry && <CountryFlag countryCode={userCountry} />}
              <p className="font-bold">{username}</p>
              <ToolTip
                trigger={
                  <div className=" flex item-center justify-center bg-purple rounded-full  px-2 py-px pt-px">
                    <FaBolt size={15} className=" text-lightPink" />
                    <p className="text-xs  z-20 text-white rounded-full p-px">
                      {streak}
                    </p>
                  </div>
                }
              >
                Current Streak
              </ToolTip>
            </span>

            <span className="flex gap-x-1 items-center -mb-2">
              <p>Belongs to</p>
              <Link href={`/tribes/${username}`}>
                <Button variant={'link'} className="text-purple m-0 p-0">
                  {numberOfTribes}
                </Button>
              </Link>{' '}
              <p>{numberOfTribes > 1 ? 'tribes' : 'tribe'}</p>
            </span>
          </div>

          <Link href={`/user/${username}`}>
            <Button variant={'link'} className="text-purple">
              Visit Profile
            </Button>
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserSnippet;
