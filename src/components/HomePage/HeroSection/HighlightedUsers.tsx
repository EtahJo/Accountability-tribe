"use client"
import useSWR from "swr";
import { FaEllipsisH } from "react-icons/fa";
import ToolTip from "@/components/ToolTip/index";
import UserSnippet from "@/components/UserSnippet/index";
import UserSkeleton from "@/components/Skeletons/UserSkeleton";
import { Avatar } from "@/components/ui/avatar";
import { User , Account} from "@prisma/client";
import Link from "next/link";

export type highlightedUsersType = Pick<
	User,
	"id" | "username" | "country" | "image"
> & { streak: { count: number }; tribes: {}[] ; accounts:Account[]};
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HighlightedUsers = () => {
    const { data: highlightedUsers, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/highlighted-users?page=1`,
		fetcher,
	);
  return (
    <div className='flex gap-2 items-center'>
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
						highlightedUsers?.users?.map(
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
								<Link href="/highlighted-users?page=1">
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
  )
}

export default HighlightedUsers