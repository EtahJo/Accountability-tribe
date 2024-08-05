"use client";
import { Avatar , AvatarImage} from "@/components/ui/avatar";
import { CldImage } from "next-cloudinary";
import { FaUser } from "react-icons/fa";
import { User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
const UserProfileImage = ({ user }: { user: User }) => {
	const { session}: any = useCurrentUser();
	return (
		<Avatar className="w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-2 border-purple bg-lightPink">
			{user?.image ? (
				session.data.user.isOAuth?
				<AvatarImage src={user?.image} className='rounded-full shadow-3xl w-40 h-40 object-contain'/>:
				<CldImage
					src={user?.image}
					width="160"
					height={"160"}
					crop="fill"
					sizes="100vw"
					alt="User Profile"
					className="rounded-full bg-white  shadow-3xl"
				/>
			) : (
				<div
					className="bg-black rounded-full p-px w-[170px]
       h-[170px] flex justify-center align-middle items-center"
				>
					<FaUser className="text-white" size={120} />
				</div>
			)}
		</Avatar>
	);
};

export default UserProfileImage;
