"use client";
import { Skeleton } from "@/components/ui/skeleton";

const ShortHeaderSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-5">
			<div
				className="flex bg-purple rounded-3xl p-5 shadow-3xl 
    w-max gap-3 items-center"
			>
				<Skeleton className="w-[80px] h-[80px] rounded-full" />
				<div className="gap-y-4 flex flex-col">
					<Skeleton className="h-7 md:w-[250px] w-[150px]" />
					<Skeleton className="h-4 md:w-[300px] w-[200px]" />
				</div>
			</div>
			<div className="flex gap-2 items-center">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						className="bg-white rounded-3xl flex 
          items-center gap-2 p-5 justify-center"
						key={index}
					>
						<Skeleton className="h-6 w-6" />
						<Skeleton className="h-7 w-12" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ShortHeaderSkeleton;
