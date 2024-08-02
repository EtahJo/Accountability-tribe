import { Status } from "@prisma/client";

export const statusItems = [
	{
		title: Status.STARTED,
		id: Status.STARTED,
	},
	{
		title: "NOT STARTED",
		id: Status.NOTSTARTED,
	},
	{
		title: Status.PROGRESS,
		id: Status.PROGRESS,
	},
];
export const priorityItems = [
	{
		title: "First Priority",
		id: "1",
	},
	{
		title: "High Priority",
		id: "2",
	},
	{
		title: "Low Priority",
		id: "3",
	},
];
export const periodItems = [
	{
		title: "Today",
		id: "today",
	},
	{
		title: "This Week",
		id: "thisWeek",
	},
	{
		title: "This Month",
		id: "thisMonth",
	},
];
