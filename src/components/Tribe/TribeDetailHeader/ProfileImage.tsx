"use client";
import UploadImage from "@/components/UploadImage/index";
import { CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback , AvatarImage} from "@/components/ui/avatar";
import { FaUsers } from "react-icons/fa";
import { mutate } from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import { edit_tribe } from "@/action/tribe/edit-tribe";
import Formsy from "formsy-react";
import { toast } from "sonner";

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
	const { user }:any = useCurrentUser();
	const onValidSubmit = (profileImage: string) => {
		const inputInfo = { profileImage };
		edit_tribe(inputInfo, tribeId).then((data) => {
			if (data.error) {
				toast.error(data.error);
			}
			if (data.success) {
				toast.success(data.success);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`,
				);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`,
				);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
				);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`,
				);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/recommended-tribes/${user.id}`,
				);
				mutate(
					`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
				);
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
						group
					/>
				</Formsy>
			) : (
				<Avatar
					className=" w-[180px] h-[180px] z-10 items-center flex justify-center m-auto border-4
border-white -mt-24 shadow-3xl relative"
				>
					{!profileImage ? (
						<AvatarFallback className="bg-black">
							<FaUsers className="text-white" size={100} />
						</AvatarFallback>
					) 
						:
						<CldImage
							width="180"
							height="180"
							crop={"fill"}
							src={profileImage}
							sizes="100vw"
							alt="Tribe profile"
						/>
				}
				</Avatar>
			)}
		</div>
	);
};

export default ProfileImage;
