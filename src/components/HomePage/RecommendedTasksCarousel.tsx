"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import TaskSkeleton from "@/components/Skeletons/TaskSkeleton";
import Todo from "@/components/TodoList/Todo";
import { useCurrentUser } from "@/hooks/use-current-user";
import useSWR from "swr";
import GotoButton from "@/components/GoTo/index";
import NoData from "../NoData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const RecommendedTasksCarousel = () => {
	const { user }: any = useCurrentUser();
	const { data: highPriorityTasks, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${user.username}/high-priority`,
		fetcher,
	);
	if (isLoading || highPriorityTasks === undefined) {
		return (
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full "
			>
				<CarouselContent className="w-full">
					{Array.from({ length: 3 }).map((_, index) => (
						<CarouselItem
							className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
							key={index}
						>
							<TaskSkeleton />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		);
	}
	if (highPriorityTasks?.length === 0) {
		return (
		<NoData message="No High Priority tasks" linkTo="/create-task" buttonTitle="Create Task"/>
		);
	}
	return (
		<div className="largePhone:mx-4 mx-3">
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full "
			>
				<CarouselContent className="w-full">
					{highPriorityTasks?.map(
						({
							dueDate,
							id,
							title,
							status,
							userId,
							priority,
							description,
							sessionParticipants,
						}: any) => (
							<CarouselItem
								key={id}
								className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
							>
								<Todo
									title={title}
									priority={priority}
									description={description}
									status={status}
									id={id}
									dueDate={dueDate}
									sessionParticipants={sessionParticipants}
									taskId={id}
									userId={userId}
									pageUsername={user.username}
								/>
							</CarouselItem>
						),
					)}
				</CarouselContent>

				<CarouselPrevious className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
				<CarouselNext className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
			</Carousel>
		</div>
	);
};

export default RecommendedTasksCarousel;
