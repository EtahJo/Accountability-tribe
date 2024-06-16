import React from 'react';
interface ProfileIconItemProps {
  title: string;
  icon: React.ReactNode;
  number?: number;
}

const ProfileIconItem = ({ title, icon, number }: ProfileIconItemProps) => {
  return (
    <div className="flex align-middle items-center my-2 cursor-pointer  rounded-md">
      <div className="relative">
        {icon}
        <p className="absolute -top-2 z-10 text-white font-bold -right-2  bg-lightPink rounded-full p-px text-sm">
          {number}
        </p>
      </div>
      <p className="ml-4 w-[150px]">{title}</p>
    </div>
  );
};

export default ProfileIconItem;
