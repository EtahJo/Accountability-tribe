"use client";
import useSWR from "swr";
import ProfileHeader from "@/components/UserProfile/ProfileHeader/index";
import LongHeaderSkeleton from "@/components/Skeletons/LongHeaderSkeleton";
import UserSkeleton from "@/components/Skeletons/UserSkeleton";
import UserProfileBody from "@/components/UserProfileBody/index";
import { Skeleton } from "@/components/ui/skeleton";
import UpcomingSessionSkeleton from "@/components/Skeletons/UpcomingSessionSkeleton";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UseProfilePage = ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const decodedUsername = decodeURIComponent(username)
	const { data: user, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/${decodedUsername}`,
		fetcher,
	);
	if (isLoading) {
		return (
			<div className="mx-16">
				<LongHeaderSkeleton
					classNames="bg-purple flex justify-between items-center 
         mt-16 w-full py-10 px-32 largePhone:flex-row flex-col dark:bg-dark-primary "
				>
					<div className="flex flex-col gap-y-2 p-3">
						<Skeleton className="h-12 w-[250px]" />
						<div className="flex flex-col space-y-3">
							{Array.from({ length: 3 }).map((_, index) => (
								<div key={index} className="flex items-center gap-2">
									<Skeleton className="h-5 w-12 " />
									<Skeleton className="h-5 w-[120px] bg-lightPink dark:bg-dark-background" />
								</div>
							))}
						</div>
					</div>
					<UserSkeleton classNames="w-[180px] h-[180px]" />
				</LongHeaderSkeleton>
				<div className="flex items-center gap-x-2 lg:flex-row flex-col my-10">
					{Array.from({ length: 2 }).map((_, index) => (
						<UpcomingSessionSkeleton key={index} />
					))}
				</div>
				<PostSkeleton />
			</div>
		);
	}
	return (
		<div>
			<div>
				<ProfileHeader user={user} />
				<UserProfileBody pageUserName={decodedUsername} />
			</div>
		</div>
	);
};

export default UseProfilePage;
