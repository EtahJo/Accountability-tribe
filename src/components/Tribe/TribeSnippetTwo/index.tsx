import React from 'react';
import Image from 'next/image';
import { TribeSnippetTwoType } from '@/types/types';
import Link from 'next/link';
const TribeSnippetTwo = ({
  profileImage,
  tribeName,
  members,
  description,
  link,
}: TribeSnippetTwoType) => {
  return (
    <div className="rounded-full relative my-4">
      <Image
        className="absolute left-2 top-3 border-purple border-2 rounded-full object-cover"
        src={profileImage}
        style={{
          width: '80px',
          height: '70px',
        }}
        alt="Picture of the author"
        sizes="50vw"
      />

      <div className="bg-purple flex justify-between px-5 py-3 rounded-t-full">
        <p className="font-bold ml-16">{tribeName}</p>
        <span className="flex text-lightPink gap-px leading-3">
          <p className="sm:text-base text-xs">{members} members</p>
        </span>
      </div>
      <div className="bg-[rgba(137,77,214,0.3)] flex justify-between p-2 rounded-b-full">
        <p className="ml-20 w-6/12 truncate">{description}</p>
        <Link
          className="bg-lightPink rounded-full shadow-buttonInner px-2 py-px text-center font-bold h-10 place-content-center mr-5"
          href={link}
        >
          Join
        </Link>
      </div>
    </div>
  );
};

export default TribeSnippetTwo;
