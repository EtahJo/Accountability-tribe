"use client";
import { useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import TaskSkeleton from "@/components/Skeletons/TaskSkeleton";
import Todo from "@/components/TodoList/Todo";
import PaginationController from "@/components/PaginationController";
import UserTasksFilters from "./UserTasksFilters";
import {
	filteredPeriod,
	filteredStatus,
	filteredPriority,
	filteredDate,
	onValidSubmit,
} from "../_utils/filterFunctions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UserTasksBody = ({ username }: { username: string }) => {
	const [filteredData, setFilteredData] = useState<any>(null);
	const searchParams = useSearchParams();
	let page = Number.parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const { data: tasksData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${username}/unCompleted?page=${page}`,
		fetcher,
	);
	if (isLoading || tasksData === undefined) {
		return (
			<div className="flex items-center gap-2 flex-wrap">
				{Array.from({ length: 3 }).map((_, index) => (
					<TaskSkeleton key={index} />
				))}
			</div>
		);
	}
	const { tasks, hasMore, totalPages } = tasksData;
	const pageNumbers = [];
	const offsetNumber = 3;
	for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
		if (i >= 1 && i <= totalPages) {
			pageNumbers.push(i);
		}
	}

	return (
		<div className="flex flex-col justify-start items-center">
			<UserTasksFilters
				filterPeriod={(value) => filteredPeriod(value, tasks, setFilteredData)}
				filterStatus={(value) => filteredStatus(value, tasks, setFilteredData)}
				filterPriority={(value) =>
					filteredPriority(value, tasks, setFilteredData)
				}
				filterDate={(value) => filteredDate(value, tasks, setFilteredData)}
				onValidSubmit={(vals) => onValidSubmit(vals, tasks, setFilteredData)}
			/>
			<div
				className="flex flex-wrap lg:justify-start  gap-2 justify-center 
"
			>
				{(filteredData || tasks)?.map((task: any) => (
					<div key={task.id} className="min-[1450px]:basis-1/4 basis-2/2 ">
						<Todo
							title={task.title}
							priority={task.priority}
							description={task.description}
							status={task.status}
							id={task.id}
							dueDate={task.dueDate}
							sessionParticipants={task.sessionParticipants}
							taskId={task.id}
							userId={task.userId}
							pageUsername={username}
						/>
					</div>
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

export default UserTasksBody;
