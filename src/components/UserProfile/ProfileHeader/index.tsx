"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { User, Account } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import SocialMedia from "@/components/UserProfile/ProfileHeader/SocialMedia";
import ContactInfo from "@/components/UserProfile/ProfileHeader/ContactInfo";
import UserProfileImage from "@/components/UserProfile/ProfileHeader/UserProfileImage";

interface ProfileHeaderProps {
	user: User & {accounts:Account[]};
}
const ProfileHeader = ({ user }: ProfileHeaderProps) => {
	const { session }: any = useCurrentUser();
	return (
		<div className="sm:pt-10 pt-24 mb-10">
			<div className="bg-purple grid grid-cols-12 justify-between rounded-5xl mx-10 pt-10 dark:bg-dark-primary">
				<div className="lg:col-start-2 lg:col-end-9 col-start-2 col-end-12">
					<div
						className="flex items-center border-b-[1px] border-b-black md:justify-between 
          pb-2 my-5 justify-center md:flex-row flex-col md:gap-y-0 gap-y-3"
					>
						<span className="flex items-center font-semibold md:text-2xl text-lg w-[230px] ">
							<p className=" text-white whitespace-nowrap max-largePhone:truncate md:text-center"> {user?.username}</p>
						</span>

						{session && user?.id === session?.data?.user.id && (
							<Button className="bg-black hover:bg-lightPink flex items-center gap-1 align-middle justify-between group move-button">
								<Link href={"/edit-profile"}>Edit information</Link>
								<FaEdit
									size={20}
									className="text-lightPink  group-hover:text-white mb-px dark:text-dark-lightPrimary"
								/>
							</Button>
						)}
					</div>
					<div
						className="flex md:justify-between justify-center md:flex-row 
          flex-col md:items-start items-center md:gap-y-0 gap-y-4"
					>
						<ContactInfo user={user} />
						<SocialMedia user={user} />
					</div>
				</div>

				<div
					className="lg:col-start-10 lg:col-end-12 flex 
        flex-col h-[250px] relative w-full col-start-2 col-end-12"
				>
					<UserProfileImage user={user} />
					<div
						className="bg-lightPink dark:bg-dark-background absolute bottom-0 w-full largePhone:h-[100px] border-l-2 h-[90px]
         border-l-purple dark:border-l-dark-primary border-t-2 border-t-purple dark:border-t-dark-primary rounded-tl-5xl border-r-2 border-r-purple dark:border-r-dark-primary
         rounded-tr-5xl before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright dark:before:shadow-dark-background before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5 dark:after:shadow-dark-background"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
