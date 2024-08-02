"use client";
import { Skeleton } from "@/components/ui/skeleton";

const TribeSkeleton = () => {
	return (
		<div
			className="
  bg-white flex flex-col items-center 
    justify-center px-5 py-3 rounded-3xl my-5 gap-y-1 shadow-2xl
     m-auto largePhone:w-[300px] w-[200px] "
		>
			<Skeleton className="w-[80px]  h-[80px] shadow-lg rounded-full" />
			<Skeleton className="h-4 w-[100px]" />
			<Skeleton className="h-4 w-[150px]" />
			<Skeleton className="h-10 w-[200px]" />
		</div>
	);
};

export default TribeSkeleton;
