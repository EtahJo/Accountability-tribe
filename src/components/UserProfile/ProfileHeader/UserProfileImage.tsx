"use client";
import { Avatar , AvatarImage} from "@/components/ui/avatar";
import { CldImage } from "next-cloudinary";
import { FaUser } from "react-icons/fa";
import { User ,Account} from "@prisma/client";

const UserProfileImage = ({ user }: { user: User & {accounts:Account[]}}) => {
	return (
		<Avatar className="w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-2 border-purple dark:border-dark-primary bg-lightPink dark:bg-dark-background">
			{user?.image ? (
				user?.accounts.length>0?
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
