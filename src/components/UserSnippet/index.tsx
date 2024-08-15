"use client"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { FaUser, FaBolt } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountryFlag from "@/components/CountryFlag/index";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ToolTip/index";

interface UserSnippetProps {
	username: string | null;
	userImage?: string | null;
	numberOfTribes: number;
	userCountry?: string | null;
	streak: number;
	accounts:{}[];
}
const UserSnippet = ({
	username,
	userImage,
	numberOfTribes,
	userCountry,
	streak,
	accounts
}: UserSnippetProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href={`/user/${username}`} className="relative">
						<Avatar className="border-purple border move-button dark:border-dark-primary">
							{userImage ? (
								accounts?.length>0?
							<AvatarImage src={userImage} className='rounded-full shadow-3xl object-contain'/>:
								<CldImage
									width="180"
									height="180"
									crop={"fill"}
									src={userImage}
									sizes="100vw"
									alt="User profile"
								/>
							) : (
								<AvatarFallback className="bg-black">
									<FaUser className="text-white" size={120} />
								</AvatarFallback>
							)}
						</Avatar>
					</Link>
				</TooltipTrigger>
				<TooltipContent className=" mt-3 flex flex-col items-center justify-center">
					<div className="bg-lighterPink dark:bg-dark-lightBackground p-4 flex flex-col justify-center items-center rounded-2xl dark:text-dark-text">
						<span className="flex items-center gap-x-2 -my-2 ">
							{userCountry && <CountryFlag countryCode={userCountry} />}
							<p className="font-bold">{username}</p>
							<ToolTip
								trigger={
									<div className=" flex item-center justify-center bg-purple rounded-full  px-2 py-px pt-px dark:bg-dark-background">
										<FaBolt size={15} className=" text-lightPink dark:text-dark-primary" />
										<p className="text-xs  z-20 text-white rounded-full p-px">
											{streak}
										</p>
									</div>
								}
							>
								Current Streak
							</ToolTip>
						</span>

						<span className="flex gap-x-1 items-center -mb-2">
							<p>Belongs to</p>
							<Link href={`/user/${username}/tribes?page=1`}>
								<Button variant={"link"} className="text-lightPink m-0 p-0 dark:text-dark-primary">
									{numberOfTribes}
								</Button>
							</Link>{" "}
							<p>{numberOfTribes > 1 ? "tribes" : "tribe"}</p>
						</span>
					</div>

					<Link href={`/user/${username}`}>
						<Button variant={"link"} className="text-white dark:text-dark-primary">
							Visit Profile
						</Button>
					</Link>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserSnippet;
