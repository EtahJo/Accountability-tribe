import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CldImage } from 'next-cloudinary';
import { FaUsers } from 'react-icons/fa';

const ProfileImage = ({ image }: { image?: string | null }) => {
  return (
    <Avatar className="w-[80px]  h-[80px] shadow-lg">
      {image ? (
        <CldImage
          width={'100'}
          height="100"
          crop={'fill'}
          src={image}
          sizes="100vw"
          alt="Tribe profile"
        />
      ) : (
        <AvatarFallback className="bg-black">
          <FaUsers className="text-white" size={100} />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default ProfileImage;
