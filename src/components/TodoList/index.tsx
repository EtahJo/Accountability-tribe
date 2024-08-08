"use client";
import useSWR from "swr";
import SectionHeader from "@/components/SectionHeader/index";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { FaArrowRight } from "react-icons/fa";
import TaskSkeleton from "../Skeletons/TaskSkeleton";
import Todo from "@/components/TodoList/Todo";
import Link from "next/link";
import NoData from "../NoData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TodoList = ({ pageUsername }: { pageUsername: string }) => {
	const { data: tasks, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${pageUsername}/uncompleted?page=1`,
		fetcher,
	);
	if (isLoading || tasks === undefined) {
		return (
			<div className="flex items-center gap-2 flex-wrap">
				{Array.from({ length: 3 }).map((_, index) => (
					<TaskSkeleton key={index} />
				))}
			</div>
		);
	}
	return (
		<div>
			<SectionHeader
				name="Your Todo List"
				buttonLink="/create-task"
				buttonTitle="Create Task"
				pageUsername={pageUsername}
			/>
			{
				tasks.tasks.length===0?
				<NoData message="You Have No Tasks"/>
				:
				<div>
					<Carousel
				opts={{
					align: "start",
				}}
				className="w-full my-5"
			>
				<CarouselContent className="w-full">
					{tasks?.tasks.map((task: any) => (
						<CarouselItem
							key={task.id}
							className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
						>
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
								pageUsername={pageUsername}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
				<CarouselNext className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
			</Carousel>
			<div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto dark:text-dark-primary">
				<Link href={`/user/${pageUsername}/tasks?page=1`}>View All Tasks</Link>
				<FaArrowRight />
			</div>
				</div>
			}
			
		</div>
	);
};

export default TodoList;
