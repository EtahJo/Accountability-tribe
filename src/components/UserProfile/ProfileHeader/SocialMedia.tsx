"use client";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { User } from "@prisma/client";
import SocialMediaIcon from "@/components/UserProfile/ProfileHeader/SocialMediaIcon";

const SocialMedia = ({ user }: { user: User }) => {
	return (
		<div className="flex items-center gap-x-2">
			{user?.facebook && (
				<SocialMediaIcon
					icon={<FaFacebook size={40} className='dark:text-dark-background'/>}
					link={user?.facebook}
				/>
			)}
			{user?.X && (
				<SocialMediaIcon icon={<FaTwitter size={35} className='dark:text-dark-background' />} link={user?.X} />
			)}
			{user?.linkedIn && (
				<SocialMediaIcon
					icon={<FaLinkedin size={35} className='dark:text-dark-background' />}
					link={user?.linkedIn}
				/>
			)}
		</div>
	);
};

export default SocialMedia;
