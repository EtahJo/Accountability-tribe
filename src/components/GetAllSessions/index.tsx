"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import UpcomingSession from "@/components/UpcomingSession/index";
import SessionFilter from "@/app/sessions/_components/SessionFilter";
import { SessionParticipant } from "@prisma/client";
import FilterForm from "@/components/Forms/FilterForm";
import PaginationController from "../PaginationController";
import UpcomingSessionSkeleton from "../Skeletons/UpcomingSessionSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GetAllSessions = ({ username }: { username: string }) => {
	const [filteredData, setFilteredData] = useState(null);
	const searchParams = useSearchParams();
	let page = parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const filter = searchParams.get("filter");
	const { user }: any = useCurrentUser();
	const { data: sessionsData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${username}/${user.id}?page=1&filter=${filter}`,
		fetcher,
	);
	if (isLoading || sessionsData === undefined) {
		return (
			<div className="flex flex-wrap gap-2 items-center">
				{Array.from({ length: 3 }).map((_, index) => (
					<UpcomingSessionSkeleton key={index} />
				))}
			</div>
		);
	}
	const pageNumbers = [];
	const offsetNumber = 3;
	for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
		if (i >= 1 && i <= sessionsData?.totalPages) {
			pageNumbers.push(i);
		}
	}

	const getFilteredData = (data: any) => {
		setFilteredData(data);
	};

	return (
		<div className="h-max mt-4">
			<div className="flex flex-col gap-y-3 justify-center items-center">
				<div className="flex flex-col justify-center items-center">
					<SessionFilter />
					<FilterForm
						data={sessionsData.sessions.sessions}
						getFilteredData={getFilteredData}
					/>
				</div>

				<div className="flex flex-wrap justify-center gap-4 my-5">
					{(filteredData ? filteredData : sessionsData.sessions.sessions).map(
						({
							session,
							goal,
							adminUsername,
							userId,
							tasks,
							sessionParticipantId,
							user,
						}: any) => {
							return (
								<div key={session.id}>
									<UpcomingSession
										goal={goal || session.goal}
										duration={JSON.parse(session.duration)}
										meetingLink={session.meetingLink}
										isAdmin={adminUsername === user.username}
										sessionId={session.id}
										isMember={session.users?.some(
											(sessionParticipant: SessionParticipant) =>
												sessionParticipant.userId === user.id,
										)}
										members={session.participants}
										admin={adminUsername}
										userId={userId}
										endDateTime={session.endDateTime}
										tasks={tasks}
										pageUser={user}
										pageUsername={username}
										startDateTime={session.startDateTime}
										sessionParticipantId={sessionParticipantId}
									/>
								</div>
							);
						},
					)}
				</div>
				{sessionsData.totalPages === 0 && (
					<div className="m-auto flex justify-center  h-screen">
						<p className="bg-white rounded-xl p-2 h-10">
							{" "}
							No sessions{" "}
							{filter === "thisWeek" ? "THIS WEEK" : filter?.toUpperCase()}
						</p>
					</div>
				)}
				<PaginationController
					page={page}
					pageNumbers={pageNumbers}
					hasMore={sessionsData.hasMore}
					totalPages={sessionsData.totalPages}
					filter={filter}
				/>
			</div>
		</div>
	);
};

export default GetAllSessions;
