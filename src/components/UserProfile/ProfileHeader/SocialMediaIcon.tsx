"use client";
import Link from "next/link";

interface SocialMediaIconProps {
	link: string;
	icon: React.ReactNode;
}

const SocialMediaIcon = ({ link, icon }: SocialMediaIconProps) => {
	return (
		<Link
			href={link}
			passHref
			target={"_blank"}
			rel="noopener noreferrer"
			className="bg-white rounded-full p-px hover:bg-lightPink
   hover:shadow-3xl cursor-pointer move-button"
		>
			{icon}
		</Link>
	);
};

export default SocialMediaIcon;
