import { Skeleton } from "@/components/ui/skeleton";
const UpcomingSessionDetailSkeleton = () => {
	return (
		<div className="bg-white p-5 rounded-3xl shadow-3xl  ">
			<div className="bg-purple rounded-2xl px-5 py-2 text-xl font-bold text-white flex justify-center">
				<Skeleton className="h-5 largePhone:w-[250px] w-[100px]" />
			</div>
			<div className="flex items-center gap-4 ">
				<div className="flex flex-col gap-y-6 p-4 border-purple border-2 rounded-3xl my-2">
					<div
						className="flex largePhone:justify-between mx-4 largePhone:gap-x-4 
          largePhone:flex-row flex-col items-center justify-center largePhone:items-start"
					>
						{Array.from({ length: 2 }).map((_, index) => (
							<div key={index} className="flex items-start gap-2">
								<Skeleton className="h-4 w-12" />
								<span className="flex flex-col gap-y-2">
									<Skeleton className="h-4 w-12" />
									<Skeleton className="h-4 w-12" />
								</span>
							</div>
						))}
					</div>
					<span className="flex items-center gap-1 mx-4">
						<Skeleton className="h-5 w-5 rounded-full" />
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-4 w-12" />
					</span>
					<div
						className="bg-lighterPink p-5 rounded-2xl flex largePhone:justify-between 
          items-center largePhone:flex-row flex-col justify-center gap-y-2"
					>
						<Skeleton className="h-8 w-12" />
						<Skeleton className="h-4 w-12" />
					</div>
					<Skeleton className="h-4 w-full" />
				</div>
			</div>
			<Skeleton className="h-10 w-12 m-auto" />
		</div>
	);
};

export default UpcomingSessionDetailSkeleton;
