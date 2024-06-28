import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';

interface TribeUserProps {
  name: string;
  profileImage: string;
  isAdmin: boolean;
}
const TribeUser = ({ name, profileImage, isAdmin }: TribeUserProps) => {
  return (
    <div className="flex items-center gap-x-3 rounded-sm hover:shadow-3xl hover:bg-lighterPink p-2 w-[280px]">
      <Avatar className=" w-[40px] h-[40px] z-10 items-center border-2 border-lightPink  shadow-3xl">
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
      <div className="flex items-center w-[230px] justify-between mr-6">
        <p className="text-lg">{name}</p>
        {isAdmin && <p className="text-sm text-gray-400">Admin</p>}
      </div>
    </div>
  );
};

export default TribeUser;
