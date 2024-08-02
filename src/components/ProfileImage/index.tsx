import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { FaUsers } from "react-icons/fa";

interface ProfileImageProps {
	image?: string | null;
	alt: string;
	dimensions?: string;
}

const ProfileImage = ({ image, alt, dimensions }: ProfileImageProps) => {
	return (
		<Avatar
			className={cn(
				"largePhone:w-[80px]  largePhone:h-[80px] shadow-lg w-[50px] h-[50px]",
				dimensions,
			)}
		>
			{image ? (
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
					<FaUsers className="text-white" size={100} />
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default ProfileImage;
