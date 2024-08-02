"use client";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

interface AchievementProps {
	dateCompleted: string | Date;
	taskTitle: string;
}

const Achievement = ({ dateCompleted, taskTitle }: AchievementProps) => {
	const day = format(dateCompleted, "do");
	return (
		<Card className="my-3">
			<CardHeader>
				<CardTitle>Completed {taskTitle}</CardTitle>
				<CardDescription className="flex items-center gap-1">
					On The
					<span className="text-lightPink" data-testid="completion_date">
						{day} of {format(dateCompleted, " MMMM-yyyy")}
					</span>
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default Achievement;
