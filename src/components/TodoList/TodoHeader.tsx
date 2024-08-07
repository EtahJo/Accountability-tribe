"use client";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaCheck } from "react-icons/fa";
import { edit_task } from "@/action/task/edit-task";
import { mutate } from "swr";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";

import StatusUpdate from "@/components/TodoList/StatusUpdate";
import PriorityUpdate from "@/components/TodoList/PriorityUpdate";

interface TodoHeaderProps {
	taskId: string;
	userId: string;
}

const TodoHeader = ({
	taskId,
	userId,
	status,
	title,
	priority,
}: TodoHeaderProps &
	Pick<Task, "title" | "priority" | "status" | "userId">) => {
	const [completed, setCompleted] = useState(false);
	const { user }: any = useCurrentUser();
	const onUpdateSuccess = (data: any) => {
		if (data.success) {
			mutate(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/high-priority`,
			);
			mutate(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted`,
			);
			mutate(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`,
			);
			mutate(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`,
			);
			mutate(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/completed-task`,
			);
		}
	};
	return (
		<div className="flex gap-x-2 items-center">
			{user?.id === userId ? (
				<div
					className="h-5 w-5 bg-transparent border-lightPink border-2 rounded-full flex items-center justify-center cursor-pointer p-2 dark:border-dark-background "
					onClick={() => {
						setCompleted((prev) => !prev);
						if (status === "COMPLETE") {
							edit_task({ status: "PROGRESS" }, taskId).then(onUpdateSuccess);
						} else {
							edit_task({ status: "COMPLETE" }, taskId).then(onUpdateSuccess);
						}
					}}
				>
					<FaCheck
						className={cn(
							"text-purple m-auto dark:text-dark-primary",
							status === "COMPLETE" || completed ? "block" : "hidden",
						)}
						size={20}
					/>
				</div>
			) : (
				<div className="ml-3" />
			)}

			<div>
				<p className="font-bold largePhone:text-base text-start   text-xs">
					{title}
				</p>
				<div className="flex largePhone:items-center gap-2 largePhone:flex-row flex-col items-start">
					<PriorityUpdate priority={priority} taskId={taskId} userId={userId} />
					<StatusUpdate status={status} taskId={taskId} userId={userId} />
				</div>
			</div>
		</div>
	);
};

export default TodoHeader;
