'use client';
import UploadImage from '@/components/UploadImage/index';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { edit_tribe } from '@/action/tribe/edit-tribe';
import Formsy from 'formsy-react';
import { toast } from 'sonner';

interface ProfileImageProps {
  isAdmin: boolean;
  profileImage: string;
  tribeId: string;
}

const ProfileImage = ({
  isAdmin,
  profileImage,
  tribeId,
}: ProfileImageProps) => {
  const onValidSubmit = (profileImage: string) => {
    const inputInfo = { profileImage };
    edit_tribe(inputInfo, tribeId).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <div>
      {isAdmin ? (
        <Formsy>
          <UploadImage
            name="profileImage"
            presentImage={profileImage}
            submitUrl={onValidSubmit}
          />
        </Formsy>
      ) : (
        <Avatar
          className=" w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-4
border-white -mt-24 shadow-3xl relative"
        >
          {!profileImage ? (
            <AvatarFallback className="bg-black">
              <FaUser className="text-white" size={100} />
            </AvatarFallback>
          ) : (
            <CldImage
              width="180"
              height="180"
              crop={'fill'}
              src={profileImage}
              sizes="100vw"
              alt="Tribe profile"
            />
          )}
        </Avatar>
      )}
    </div>
  );
};

export default ProfileImage;
