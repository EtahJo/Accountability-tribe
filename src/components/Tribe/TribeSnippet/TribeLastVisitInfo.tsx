"use client";
import { formatDateTime } from "@/util/DateTime";
import { useCurrentUser } from "@/hooks/use-current-user";

const TribeLastVisitInfo = ({ lastVisit }: { lastVisit?: string }) => {
	const { user }: any = useCurrentUser();
	return (
		<div className="flex justify-end   w-max absolute right-1 top-1">
			<div className="text-gray-500 dark:text-dark-text largePhone:text-[10px] bg-lighterPink dark:bg-dark-lightPrimary rounded-3xl px-2  flex flex-col items-center justify-center text-[8px]">
				{lastVisit ? (
					<>
						{" "}
						<p className="font-bold text-black">Last Visit</p>
						<p>{formatDateTime(lastVisit, user?.timezone).date}</p>
						<p>{formatDateTime(lastVisit, user?.timezone).time}</p>
					</>
				) : (
					<>
						<p>Never Visited</p>
					</>
				)}
			</div>
		</div>
	);
};

export default TribeLastVisitInfo;
