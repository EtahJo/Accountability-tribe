'use client';
import { useContext, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Input } from '@/components/ui/input';
import { withFormsy } from 'formsy-react';
import { ImageUploaderContext } from '@/context/ImageUploadContext';

const UploadImage = () => {
  const { addUrl } = useContext(ImageUploaderContext);
  const [resource, setResource] = useState();
  const { user } = useCurrentUser();
  return (
    <div className="relative -mt-32 ">
      <Avatar className=" w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-4 border-white">
        {!resource && !user?.image ? (
          <AvatarFallback className="bg-black">
            <FaUser className="text-white" size={100} />
          </AvatarFallback>
        ) : (
          <CldImage
            width="180"
            height="180"
            crop={'fill'}
            src={resource?.path || user?.image}
            sizes="100vw"
            alt="User profile"
          />
        )}
      </Avatar>

      <CldUploadWidget
        signatureEndpoint={'/api/sign-image'}
        onSuccess={(result, { widget }) => {
          setResource(result?.info);
          addUrl(result?.info.path);
        }}
      >
        {({ open }) => {
          const handleClicked = () => {
            open();
          };

          return (
            <div
              onClick={handleClicked}
              className="flex w-full justify-center -mt-8 ml-10"
            >
              <div
                className="bg-purple rounded-full p-2  z-10
            hover:bg-white hover:shadow-3xl cursor-pointer  w-10 h-10 transition duration-1000 hover:-translate-y-1 transform hover:duration-300 "
              >
                <AiFillCamera className="text-lightPink " size={25} />
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default withFormsy(UploadImage);
