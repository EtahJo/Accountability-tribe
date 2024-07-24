'use client';
import useSWR from 'swr';
import BackgroundSlideShow from '@/components/BackgroundSlidShow/index';
import { FaEllipsisH } from 'react-icons/fa';
import ToolTip from '@/components/ToolTip/index';
import UserSnippet from '@/components/UserSnippet/index';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import { User } from '@prisma/client';

export type highlightedUsersType = Pick<
  User,
  'id' | 'username' | 'country' | 'image'
> & { streak: { count: number }; tribes: {}[] };
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HeroLoggedIn = () => {
  const { data: highlightedUsers, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/highlighted-users`,
    fetcher
  );

  const slides = [
    { src: 'v1718702194/ztkcydlsey7rtrrxnq7l.jpg' },
    {
      src: 'v1718704071/eslhb9bgdycqw5d9r1re.jpg',
    },
    {
      src: 'v1718702194/ztkcydlsey7rtrrxnq7l.jpg',
    },
  ];
  return (
    <div>
      <div className="bg-white rounded-5xl grid grid-cols-12 h-[450px]  w-full relative my-5">
        <div className="absolute left-0 w-full top-0 z-0 h-full bg-red-200 rounded-5xl">
          <BackgroundSlideShow
            slides={slides}
            className="w-full h-[450px] rounded-5xl"
            imageClass="rounded-5xl"
            asChild
          />
        </div>
        <div
          className="col-start-1 
        col-span-3 flex justify-center rounded-tl-3xl relative"
        >
          <div
            className="bg-lightPink absolute top-0 w-full h-[100px] 
          rounded-br-5xl before:absolute before:top-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5  before:-right-5 before:shadow-roundTright after:absolute after:-bottom-5 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundTright after:left-0 flex justify-center items-center "
          >
            <p className="text-2xl xl:text-4xl lg:text-3xl font-bold uppercase text-shadow-lg whitespace-nowrap">
              Build Tribes
            </p>
          </div>
        </div>

        <div
          className=" col-start-9 col-span-4 
        w-full flex justify-center relative"
        >
          <div
            className="bg-lightPink absolute top-0 w-full h-[100px] 
         rounded-bl-5xl before:absolute before:top-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5  before:-left-5 before:shadow-roundTleft after:absolute after:-bottom-5 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundTleft after:right-0 flex justify-center items-center "
          >
            <p
              className=" font-bold uppercase text-shadow-lg
            text-sm xl:text-4xl lg:text-3xl  min-[824px]:text-2xl text-center sm:text-md "
            >
              Be Accountable
            </p>
          </div>
        </div>
        <div
          className="z-10 col-span-3  flex items-center py-5
         px-10 flex-col justify-end gap-3"
        >
          <span className="flex items-center text-white bg-black p-2 rounded-md flex-col">
            <h1 className="font-bold text-lg whitespace-nowrap">
              Hightlighted Users
            </h1>
            <p className="whitespace-nowrap text-base text-lightPink">
              {'Because of their consistency 🎊'}
            </p>
          </span>
          <div className="flex items-center gap-x-2">
            {highlightedUsers?.map(
              ({
                username,
                country,
                image,
                id,
                streak,
                tribes,
              }: highlightedUsersType) => {
                return (
                  <UserSnippet
                    key={id}
                    username={username}
                    numberOfTribes={tribes.length}
                    userCountry={country}
                    streak={streak?.count}
                    userImage={image}
                  />
                );
              }
            )}

            <ToolTip
              trigger={
                <Link href="/highlighted-users">
                  <Avatar className="bg-purple rounded-full flex justify-center items-center move-button">
                    <FaEllipsisH className="text-white" />
                  </Avatar>
                </Link>
              }
            >
              <p>View All Hightlighted users</p>
            </ToolTip>
          </div>
        </div>
        <div className="col-start-8 col-end-12 w-full flex justify-center relative">
          <div
            className="bg-lightPink absolute bottom-0 w-full h-[100px] 
        rounded-t-5xl  before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5 flex justify-center items-center"
          >
            <p className="text-5xl font-bold uppercase text-shadow-lg ">
              Stay Consistent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLoggedIn;
