"use client";
import useSWR from "swr";
import SectionHeader from "@/components/SectionHeader/index";
import { useCurrentUser } from "@/hooks/use-current-user";
import UpcomingSession from "@/components/UpcomingSession/index";
import UpcomingSessionSkeleton from "@/components/Skeletons/UpcomingSessionSkeleton";
import { SessionParticipant } from "@prisma/client";
import { FaPlusCircle, FaArrowRight } from "react-icons/fa";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";

interface UpcomingSessionsProps {
	pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UpcomingSessions = ({ pageUsername }: UpcomingSessionsProps) => {
	const { user: currentUser }: any = useCurrentUser();
	const { data: sessions, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${pageUsername}/${currentUser.id}?page=1`,
		fetcher,
	);
	if (isLoading || sessions === undefined) {
		return (
			<div className="flex items-center gap-x-2 lg:flex-row flex-col">
				{Array.from({ length: 2 }).map((_, index) => (
					<UpcomingSessionSkeleton key={index} />
				))}
			</div>
		);
	}
	return (
		<div>
			<SectionHeader
				name="Upcoming Work or Study Sessions"
				buttonLink="/create-session"
				buttonTitle="Create Session"
				pageUsername={pageUsername as string}
			/>

			{sessions?.sessions?.sessions.length === 0 ? (
				<div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10 dark:bg-dark-lightBackground dark:border dark:border-slate-800">
					<div>
						<p>No upcoming sessions</p>
						{/* TODO: add session recommendations */}
					</div>
				</div>
			) : (
				<div>
					<Carousel
						opts={{
							align: "center",
						}}
						className="w-full"
					>
						<CarouselContent className="w-full">
							{sessions?.sessions?.sessions.map(
								({ session, goal, tasks, adminUserId, id, userId }: any) => {
									const sessionAdmin = session.users.filter((user:SessionParticipant)=>user.userRole==='ADMIN')
									return (
										<CarouselItem
											key={session.id}
											className=" basis-2/2 flex-col "
										>
											<UpcomingSession
												startDateTime={session.startDateTime}
												tasks={tasks}
												pageUser={currentUser}
												pageUsername={pageUsername}
												goal={goal || session.goal}
												duration={JSON.parse(session.duration)}
												meetingLink={session.meetingLink}
												sessionId={session.id}
												isAdmin={adminUserId === currentUser.id}
												isMember={session.users.some(
													(sessionUser: SessionParticipant) =>
														sessionUser.userId === currentUser.id,
												)}
												members={session.participants}
												admin={sessionAdmin[0].user.username}
												userId={userId}
												endDateTime={session.endDateTime}
												sessionParticipantId={id}
											/>
										</CarouselItem>
									);
								},
							)}
						</CarouselContent>
						<CarouselPrevious className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
						<CarouselNext className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
					</Carousel>
			<div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto dark:text-dark-primary ">
				<Link href={`/user/${pageUsername}/sessions?page=1&filter=upcoming`}>
					View All Sessions
				</Link>
				<FaArrowRight />
			</div>
				</div>
			)}
			
		</div>
	);
};

export default UpcomingSessions;
