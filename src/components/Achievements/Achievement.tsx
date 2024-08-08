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
				<CardTitle className='max-largePhone:text-center whitespace-nowrap'>Completed {taskTitle}</CardTitle>
				<CardDescription className="flex items-center gap-1 max-largePhone:flex-col">
					<p className='whitespace-nowrap'>On The</p>
					<span className="text-lightPink whitespace-nowrap dark:text-dark-primary" data-testid="completion_date">
						{day} of {format(dateCompleted, " MMMM-yyyy")}
					</span>
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default Achievement;
