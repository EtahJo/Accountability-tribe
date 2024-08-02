"use client";
import PaginationController from "@/components/PaginationController";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Task } from "@prisma/client";
import Achievement from "@/components/Achievements/Achievement";
import AchievementSkeleton from "@/components/Skeletons/AchievementSkeleton";
import UserAchievementsFilter from "./UserAchievementsFilter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UserAchievementsBody = ({ username }: { username: string }) => {
	const searchParams = useSearchParams();
	let page = parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const filter = searchParams.get("filter") || "";
	const { data: completedTasks, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${username}/completed-task?page=${page}`,
		fetcher,
	);
	if (isLoading || completedTasks === undefined) {
		return (
			<div className="flex gap-2 flex-wrap">
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementSkeleton key={index} />
				))}
			</div>
		);
	}
	const { tasks, hasMore, totalPages } = completedTasks;
	const pageNumbers = [];
	const offsetNumber = 3;
	for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
		if (i >= 1 && i <= totalPages) {
			pageNumbers.push(i);
		}
	}
	return (
		<div>
			<div className="flex gap-4 flex-wrap">
				<div
					className="flex items-center gap-1 bg-white p-3 rounded-2xl
         shadow-3xl w-max"
				>
					<p className="uppercase text-lightPink">Total:</p>
					<p className="font-bold">{tasks.length}</p>
				</div>
				<UserAchievementsFilter />
			</div>
			<div className="flex flex-wrap gap-2">
				{tasks?.map((task: Task) => (
					<Achievement
						key={task.id}
						taskTitle={task.title}
						dateCompleted={task.dateCompleted as any}
					/>
				))}
			</div>

			<PaginationController
				page={page}
				hasMore={hasMore}
				totalPages={totalPages}
				pageNumbers={pageNumbers}
			/>
		</div>
	);
};

export default UserAchievementsBody;
