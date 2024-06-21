'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

import { FaFacebook, FaLinkedin, FaTwitter, FaEdit } from 'react-icons/fa';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { format, isValidNumber } from 'libphonenumber-js';

countries.registerLocale(enLocale);

const ProfileHeader = () => {
  const { session, user, phoneNumber, countryCode } = useCurrentUser();
  const countryName = countries.getName(user?.country, 'en');
  const isValid = phoneNumber ? isValidNumber(phoneNumber, countryCode) : false;
  const formatedNumber = phoneNumber
    ? format(phoneNumber, countryCode, 'International')
    : '';
  return (
    <div className="py-10">
      <div className="bg-purple grid grid-cols-12 justify-between rounded-5xl mx-10 pt-10 ">
        <div className="col-start-2 col-end-9">
          <div className="flex items-center border-b-[1px] border-b-black justify-between pb-2 my-5">
            <span className="text-lightPink flex items-center font-semibold text-4xl">
              Hello,
              <p className=" text-white"> {user?.username}</p>
            </span>

            <Button
              // variant={'primary'}
              className="bg-black hover:bg-lightPink flex items-center gap-1 align-middle justify-between group move-button"
            >
              <Link href={'/edit-profile'}>Edit information</Link>
              <FaEdit
                size={20}
                className="text-lightPink  group-hover:text-white mb-px"
              />
            </Button>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="flex items-center">
                <p className="text-white mr-1.5">Email:</p>
                <p className="text-lightPink">{user?.email}</p>
              </span>
              {user?.country && (
                <span className="flex items-center">
                  <p className="text-white mr-1.5">Country:</p>
                  <p className="text-lightPink">{countryName}</p>
                </span>
              )}
              {user?.number && (
                <span className="flex items-center">
                  <p className="text-white mr-1.5">Phone Number:</p>
                  <p className="text-lightPink">{formatedNumber}</p>
                </span>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              {user?.facebook && (
                <Link
                  href={user?.facebook}
                  passHref
                  target={'_blank'}
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-px hover:bg-lightPink
                   hover:shadow-3xl cursor-pointer move-button"
                >
                  <FaFacebook size={40} />
                </Link>
              )}
              {user?.x && (
                <Link
                  href={user?.x}
                  passHref
                  target={'_blank'}
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-1.5  hover:bg-lightPink hover:shadow-3xl cursor-pointer
                  move-button"
                >
                  <FaTwitter size={35} />
                </Link>
              )}
              {user?.linkedIn && (
                <Link
                  href={user?.linkedIn}
                  passHref
                  target={'_blank'}
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-1.5  hover:bg-lightPink hover:shadow-3xl cursor-pointer
                move-button"
                >
                  <FaLinkedin size={35} />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="col-start-10 col-end-12 flex flex-col h-[250px] relative w-full">
          <Avatar className="w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-2 border-purple bg-lightPink">
            {user?.image ? (
              <CldImage
                src={user?.image}
                width="160"
                height={'160'}
                crop="fill"
                sizes="100vw"
                alt="User Profile"
                className="rounded-full bg-white  shadow-3xl"
              />
            ) : (
              <div
                className="bg-black rounded-full p-px w-[170px]
               h-[170px] flex justify-center align-middle items-center"
              >
                <FaUser className="text-white" size={120} />
              </div>
            )}
          </Avatar>
          <div
            className="bg-lightPink absolute bottom-0 w-full h-[100px] border-l-2
         border-l-purple border-t-2 border-t-purple rounded-tl-5xl border-r-2 border-r-purple
         rounded-tr-5xl before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
