"use client";
import Link from "next/link";

interface AboutSessionProps {
	isAdmin?: boolean;
	isMember?: boolean;
	members: number;
	admin?: string;
}

const AboutSession = ({
	isAdmin,
	admin,
	members,
	isMember,
}: AboutSessionProps) => {
	return (
		<div className="flex gap-x-1 flex-wrap -mt-5 ml-2 text-xs min-[434px]:text-sm largePhone:justify-start justify-center">
			<p className="whitespace-nowrap dark:text-black">This Session with </p>
			{/* TODO:Add link to user profile */}
			<Link href={`/user/${admin}`} className="text-lightPink dark:text-dark-primary">
				{isAdmin ? "you" : admin}
			</Link>

			<p className="whitespace-nowrap dark:text-black">
				as admin has {members}{" "}
				{members > 1 ? " participants" : " participant"}
			</p>
			<p className="font-bold dark:text-black"> {isMember && !isAdmin && ",including you"}</p>
		</div>
	);
};

export default AboutSession;
