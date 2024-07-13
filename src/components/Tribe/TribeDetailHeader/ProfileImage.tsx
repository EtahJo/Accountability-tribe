'use client';
import { useContext } from 'react';
import UploadImage from '@/components/UploadImage';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageUploaderContext } from '@/context/ImageUploadContext';
import { FaUser } from 'react-icons/fa';
import { edit_tribe } from '@/action/tribe/edit-tribe';
import { EditTribeSchema } from '@/schemas/index';
import Formsy from 'formsy-react';
import { Button } from '@/components/ui/button';
import z from 'zod';

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
  const { url } = useContext(ImageUploaderContext);
  const onValidSubmit = (vals: z.infer<typeof EditTribeSchema>) => {
    vals.profileImage = url;
    console.log(vals);
    // edit_tribe()
  };

  return (
    <div>
      {isAdmin ? (
        <Formsy onValidSubmit={onValidSubmit}>
          <UploadImage name="profileImage" presentImage={profileImage} />
          <Button type="submit"></Button>
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
