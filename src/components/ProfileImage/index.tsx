"use client"
import { Avatar, AvatarFallback , AvatarImage} from "@/components/ui/avatar";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { FaUser,FaUsers } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ProfileImageProps {
	image?: string | null;
	alt: string;
	group?:boolean;
	dimensions?: string;
}

const ProfileImage = ({ image, alt, dimensions ,group}: ProfileImageProps) => {
	const {user}= useCurrentUser()
	return (
		<Avatar
			className={cn(
				"largePhone:w-[80px]  largePhone:h-[80px] shadow-lg w-[50px] h-[50px]",
				dimensions,
			)}
		>
			{image ? (
				user?.isOAuth?
				<AvatarImage src={image} className='rounded-full shadow-3xl  object-contain'/>:
				<CldImage
					width={"100"}
					height="100"
					crop={"fill"}
					src={image}
					sizes="100vw"
					alt={alt}
				/>
			) : (
				<AvatarFallback className="bg-black">
					{group?<FaUsers className="text-white" size={100}/>:<FaUser className="text-white" size={100} />}
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default ProfileImage;
