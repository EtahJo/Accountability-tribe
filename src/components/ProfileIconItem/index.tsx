import React from 'react';
interface ProfileIconItemProps {
  title?: string;
  icon: React.ReactNode;
  number?: number | null;
}

const ProfileIconItem = ({ title, icon, number }: ProfileIconItemProps) => {
  return (
    <div className="flex align-middle items-center my-2 cursor-pointer  rounded-md move-button">
      <div className="relative">
        {icon}
        {number && (
          <p className="absolute -top-2 z-10 text-white font-bold -right-2  bg-lightPink rounded-full px-2 py-px text-sm">
            {number}
          </p>
        )}
      </div>
      {title && <p className="ml-4 w-[150px]">{title}</p>}
    </div>
  );
};

export default ProfileIconItem;
