'use client';
import { FaUser, FaPen } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import EditableComponent from '@/components/Tribe/TribeDetailHeader/EditableComponent';
import { Avatar } from '@radix-ui/react-avatar';

interface TribeHeaderProps {
  tribeName: string;
  tribeDescription: string;
  tribeProfileImage: string;
  tribeId: string;
}
const TribeHeader = ({
  tribeName,
  tribeDescription,
  tribeProfileImage,
  tribeId,
}: TribeHeaderProps) => {
  return (
    <div
      className="flex bg-purple rounded-3xl p-5 shadow-3xl 
    w-max gap-3"
    >
      <div>
        {tribeProfileImage ? (
          <Avatar>
            <CldImage
              src={tribeProfileImage}
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
      <div>
        <EditableComponent
          text={tribeName}
          textClass="font-bold text-2xl text-white text-start"
          divClasses="flex items-center gap-x-2"
          editTrigger={
            <FaPen className="text-lightPink cursor-pointer hover:text-black" />
          }
          cancelTrigger={
            <p className="text-lightPink font-bold cursor-pointer">X</p>
          }
          showEditOption={true}
          tribeId={tribeId}
          name="name"
        />
        <EditableComponent
          text={tribeDescription}
          editTrigger={
            <FaPen className="text-lightPink cursor-pointer hover:text-black" />
          }
          cancelTrigger={
            <p className="text-lightPink font-bold cursor-pointer">X</p>
          }
          showEditOption={true}
          tribeId={tribeId}
          divClasses="flex items-center gap-x-2"
          name="description"
        />
      </div>
    </div>
  );
};

export default TribeHeader;
