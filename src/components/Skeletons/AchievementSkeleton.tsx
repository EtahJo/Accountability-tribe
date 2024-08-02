"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const AchievementSkeleton = () => {
	return (
		<Card className="my-3">
			<CardHeader>
				<CardTitle>
					<Skeleton className="w-[200px] h-5 bg-black" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="w-[180px] h-4 bg-lightPink" />
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default AchievementSkeleton;
