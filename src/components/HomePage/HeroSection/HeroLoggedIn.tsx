"use client";
import useSWR from "swr";
import BackgroundSlideShow from "@/components/BackgroundSlidShow/index";
import { FaEllipsisH } from "react-icons/fa";
import ToolTip from "@/components/ToolTip/index";
import UserSnippet from "@/components/UserSnippet/index";
import UserSkeleton from "@/components/Skeletons/UserSkeleton";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { User , Account} from "@prisma/client";

export type highlightedUsersType = Pick<
	User,
	"id" | "username" | "country" | "image"
> & { streak: { count: number }; tribes: {}[] ; accounts:Account[]};
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HeroLoggedIn = () => {
	const { data: highlightedUsers, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/highlighted-users`,
		fetcher,
	);

	const slides = [
		{ src: "v1718702194/ztkcydlsey7rtrrxnq7l.jpg" },
		{
			src: "v1718704071/eslhb9bgdycqw5d9r1re.jpg",
		},
		{
			src: "v1718702194/ztkcydlsey7rtrrxnq7l.jpg",
		},
	];
	return (
		<div>
			<div className=" rounded-5xl grid grid-cols-12 h-[450px]  w-full relative my-5">
				<div className="absolute left-0 w-full top-0 z-0 h-full rounded-5xl mt-14 min-[640px]:mt-0">
					<BackgroundSlideShow
						slides={slides}
						className="w-full h-[450px] rounded-5xl"
						imageClass="rounded-5xl"
						asChild
					/>
				</div>
				<div
					className="col-start-1 
        col-span-3 flex justify-center rounded-tl-3xl relative"
				>
					<div
						className="bg-lightPink dark:bg-dark-background absolute top-0 w-full h-[100px] 
          rounded-br-5xl before:absolute before:top-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5  before:-right-5 before:shadow-roundTright after:absolute after:-bottom-5 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundTright after:left-0  justify-center items-center  min-[640px]:flex hidden
		   dark:after:shadow-dark-background dark:before:shadow-dark-background"
					>
						<p className=" font-bold uppercase text-shadow-lg whitespace-nowrap  
						text-sm xl:text-4xl lg:text-3xl  min-[824px]:text-2xl text-center sm:text-md dark:text-white ">
							Build Tribes
						</p>
					</div>
				</div>

				<div
					className=" col-start-9 col-span-4 
        w-full flex justify-center relative"
				>
					<div
						className="bg-lightPink  dark:bg-dark-background absolute top-0 w-full h-[100px] 
         rounded-bl-5xl before:absolute before:top-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5  before:-left-5 before:shadow-roundTleft after:absolute after:-bottom-5 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundTleft after:right-0  justify-center items-center min-[640px]:flex hidden
		   dark:after:shadow-dark-background dark:before:shadow-dark-background"
					>
						<p
							className=" font-bold uppercase text-shadow-lg
            text-sm xl:text-4xl lg:text-3xl  min-[824px]:text-2xl text-center sm:text-md dark:text-white "
						>
							Be Accountable
						</p>
					</div>
				</div>
				<div
					className="z-10 col-span-3  flex items-center py-5
         px-10 flex-col justify-end gap-3 min-[777px]:col-start-2 min-[640px]:col-start-3 col-start-5"
				>
					<div className="flex items-center text-white bg-black p-2 rounded-md flex-col ">
						<h1 className="font-bold text-lg whitespace-nowrap">
							Hightlighted Users
						</h1>
						<p className="whitespace-nowrap text-base text-lightPink dark:text-dark-primary">
							{"Because of their consistency 🎊"}
						</p>
					</div>
					<div className="flex items-center gap-x-2">
						{isLoading?
						<div className="flex gap-2 items-center">
							{
								Array.from({length:2}).map((_,index)=>(
									<UserSkeleton classNames="bg-white w-8 h-8" key={index}/>
								))
							}
							
						</div>
							:
							<div className="flex items-center gap-2">
								{
						highlightedUsers?.map(
							({
								username,
								country,
								image,
								id,
								streak,
								tribes,
								accounts
							}: highlightedUsersType) => {
								return (
									<UserSnippet
										key={id}
										username={username}
										numberOfTribes={tribes.length}
										userCountry={country}
										streak={streak?.count}
										userImage={image}
										accounts={accounts}
									/>
								);
							},
						)
								}
								{
							highlightedUsers?.length !==0 &&
						<ToolTip
							trigger={
								<Link href="/highlighted-users">
									<Avatar className="bg-purple dark:bg-dark-primary rounded-full flex justify-center items-center move-button mt-1">
										<FaEllipsisH className="text-white" />
									</Avatar>
								</Link>
							}
						>
							<p>View All Hightlighted users</p>
						</ToolTip>
						}

							</div>
					}
						
						
					</div>
				</div>
				<div className="col-start-8 col-end-12 w-full flex justify-center relative">
					<div
						className="bg-lightPink absolute bottom-0 w-full h-[100px] dark:bg-dark-background
        rounded-t-5xl  before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5  justify-center items-center min-[640px]:flex hidden
		   dark:after:shadow-dark-background dark:before:shadow-dark-background"
					>
						<p className=" font-bold uppercase text-shadow-lg text-sm xl:text-4xl lg:text-3xl 
						 min-[824px]:text-2xl text-center sm:text-md dark:text-white ">
							Stay Consistent
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroLoggedIn;
