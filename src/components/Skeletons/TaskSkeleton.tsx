"use client";
import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeleton = () => {
	return (
		<div className="bg-white rounded-2xl my-2 largePhone:w-[320px] shadow-3xl mx-2 p-2 flex items-center gap-x-2 w-[200px]">
			<Skeleton className="w-[20px] h-[20px] rounded-full" />
			<div className="flex flex-col gap-y-2">
				<Skeleton className="w-[260px] h-7" />
				<div className="flex items-center gap-x-2">
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			</div>
		</div>
	);
};

export default TaskSkeleton;
