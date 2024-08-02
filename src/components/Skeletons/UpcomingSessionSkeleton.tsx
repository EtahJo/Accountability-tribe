"use client";
import { Skeleton } from "@/components/ui/skeleton";

const UpcomingSessionSkeleton = () => {
	return (
		<div
			className="bg-white p-3 largePhone:w-[400px] rounded-3xl flex items-center gap-2  
    justify-between move-button cursor-pointer m-4  shadow-3xl w-[290px] largePhone:flex-row flex-col"
		>
			<div className="flex  bg-lighterPink  h-[80px] justify-center items-center rounded-3xl px-4 gap-2">
				<Skeleton className=" bg-purple  h-[30px]   w-[30px] rounded-full" />
				<div className="flex flex-col gap-y-3">
					<Skeleton className="h-4 w-[60px]" />
					<Skeleton className="h-4 w-[60px]" />
				</div>
			</div>

			<div className="flex flex-col gap-y-3">
				<Skeleton className="h-6 largePhone:w-[180px] w-[120px]" />
				<Skeleton className="h-6 largePhone:w-[180px] w-[120px]" />
			</div>
			<Skeleton className="h-11 w-11" />
		</div>
	);
};

export default UpcomingSessionSkeleton;
