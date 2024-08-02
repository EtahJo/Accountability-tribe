"use client";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { User } from "@prisma/client";
import SocialMediaIcon from "@/components/UserProfile/ProfileHeader/SocialMediaIcon";

const SocialMedia = ({ user }: { user: User }) => {
	return (
		<div className="flex items-center gap-x-2">
			{user?.facebook && (
				<SocialMediaIcon
					icon={<FaFacebook size={40} />}
					link={user?.facebook}
				/>
			)}
			{user?.X && (
				<SocialMediaIcon icon={<FaTwitter size={35} />} link={user?.X} />
			)}
			{user?.linkedIn && (
				<SocialMediaIcon
					icon={<FaLinkedin size={35} />}
					link={user?.linkedIn}
				/>
			)}
		</div>
	);
};

export default SocialMedia;
