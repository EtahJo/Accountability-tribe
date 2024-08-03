"use client";
import useSWR from "swr";
import SectionHeader from "@/components/SectionHeader/index";
import Achievement from "@/components/Achievements/Achievement";
import { Task } from "@prisma/client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AchievementSkeleton from "@/components/Skeletons/AchievementSkeleton";

interface AchievementsProps {
	pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Achievements = ({ pageUsername }: AchievementsProps) => {
	const { data: completedTasks, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${pageUsername}/completed-task?page=1`,
		fetcher,
	);
	if (isLoading || completedTasks === undefined) {
		return (
			<div>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementSkeleton key={index} />
				))}
			</div>
		);
	}
	const showAchievements = completedTasks?.tasks?.slice(0, 5);
	return (
		<div>
			<SectionHeader name="Achievements" />
			{
				showAchievements.length===0?<div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10">
					<div>
						<p>No Achievements</p>
					</div>
			</div>:
			
			<div>
			<div>
				{showAchievements?.map((task: Task) => (
					<Achievement
						key={task.id}
						taskTitle={task.title}
						dateCompleted={task.dateCompleted as any}
					/>
				))}
			</div>
			<div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline mx-auto ">
				<Link
					href={`/user/${pageUsername}/achievements?page=1&filter=all`}
					className="whitespace-nowrap"
				>
					View All Achievements
				</Link>
				<FaArrowRight />
			</div>
			</div>
}
		</div>
	);
};

export default Achievements;
