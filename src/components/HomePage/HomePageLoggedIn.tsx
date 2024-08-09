"use client";
import useSWR from "swr";
import HeroLoggedIn from "@/components/HomePage/HeroSection/HeroLoggedIn";
import UpcomingSessionDetail from "@/components/UpcomingSessionDetails/index";
import UpcomingSessionDetailSkeleton from "../Skeletons/UpcomingSessionDetailSkeleton";

import ContactSection from "@/components/ContactSection/ContactSection";
import TasksCarousel from "./RecommendedTasksCarousel";
import RecommendedTribesCarousel from "@/components/HomePage/RecommendedTribesCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SessionParticipant } from "@prisma/client";
import NoData from "../NoData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HomeLoggedIn = () => {
	const { user }: any = useCurrentUser();
	const { data: session, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`,
		fetcher,
	);
	return (
		<div className="pb-48 largePhone:px-20 px-5">
			<HeroLoggedIn />
			<div
				className={cn(
					"flex gap-2 xl:flex-row flex-col mt-14 min-[640px]:mt-0 justify-center items-start",
				)}
			>
				<div className="xl:w-3/4 w-full">
					<div className="bg-purple p-10 rounded-5xl my-5 flex flex-col w-full dark:bg-dark-primary">
						<h1 className="largePhone:text-2xl font-bold text-white uppercase mb-3 text-lg largePhone:text-start text-center">
							{" "}
							Some High Priority Task
						</h1>

						<TasksCarousel />
					</div>

					<div className="bg-purple p-5 rounded-5xl my-5 flex flex-col w-full dark:bg-dark-primary">
						<h1 className="largePhone:text-2xl font-bold text-white uppercase mb-3 text-lg largePhone:text-start text-center ,l-5">
							{" "}
							Some Tribes to Visit
						</h1>
						<RecommendedTribesCarousel userId={user.id} />
					</div>
				</div>

				<div className="bg-purple p-5 rounded-5xl my-5 flex flex-col  xl:w-[450px] w-full dark:bg-dark-primary">
					<h1 className="largePhone:text-2xl font-bold text-white uppercase mb-3 text-lg largePhone:text-start text-center">
						{" "}
						Your Next Session
					</h1>
					{isLoading ? (
						<UpcomingSessionDetailSkeleton />
					) : session ? (
						<UpcomingSessionDetail
							startDateTime={session.session.startDateTime}
							pageUsername={user.username as string}
							goal={session?.goal}
							duration={JSON.parse(session.session.duration)}
							meetingLink={session.session.meetingLink}
							isAdmin={session.adminUserId === user.id}
							sessionId={session.session.id}
							isMember={session.session.users.some(
								(participant: any) => participant.userId === user.id,
							)}
							members={session.session.participants as number}
							admin={session.session.users.filter((user:SessionParticipant)=>user.userRole==='ADMIN')[0].user.username}
							userId={session.userId} // the id of th user with the session
							endDateTime={session.session.endDateTime}
							tasks={session.tasks}
							pageUser={user}
							sessionParticipantId={session.id}
						/>
					) : (
						<NoData 
						message="No Upcoming Session" 
						linkTo="/create-session"
						buttonTitle="Create Session"
						/>
					)}
				</div>
			</div>

			<ContactSection />
		</div>
	);
};

export default HomeLoggedIn;
