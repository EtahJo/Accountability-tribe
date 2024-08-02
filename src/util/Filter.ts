import { isToday, isThisWeek, isThisMonth, isThisYear } from "date-fns";
import { Task, Status } from "@prisma/client";
export const taskFilter = (
	data: Task[],
	filter: "period" | "status" | "priority" | "date",
	value: string | Date,
) => {
	let filteredData;
	if (value === "") {
		return data;
	}
	if (filter === "period") {
		const periodFilteredData = data.filter((task) => {
			const todayCheck = isToday(task.dueDate);
			const weekCheck = isThisWeek(task.dueDate);
			const monthCheck = isThisMonth(task.dueDate);
			if (value === "today") {
				return todayCheck;
			} else if (value === "thisWeek") {
				return weekCheck;
			} else if (value === "thisMonth") {
				return monthCheck;
			}
		});
		filteredData = periodFilteredData;
	}
	if (filter === "status") {
		const statusFilteredData = data.filter((task) => {
			if (value === Status.COMPLETE) {
				return task.status === Status.COMPLETE;
			} else if (value === Status.NOTSTARTED) {
				return task.status === Status.NOTSTARTED;
			} else if (value === Status.PROGRESS) {
				return task.status === Status.PROGRESS;
			} else if (value === Status.STARTED) {
				return task.status === Status.STARTED;
			}
		});
		filteredData = statusFilteredData;
	}
	if (filter === "priority") {
		const priorityFilteredData = data.filter((task) => {
			if (value === "1") {
				return task.priority === 1;
			} else if (value === "2") {
				return task.priority === 2;
			} else if (value === "3") {
				return task.priority === 3;
			}
		});
		filteredData = priorityFilteredData;
	}
	if (filter === "date") {
		const dateFilteredData = data.filter((task) => {
			return (task.dueDate as object) === value;
		});
		filteredData = dateFilteredData;
	}
	return filteredData;
};

export const completedTasksFilter = (tasks: Task[], filterString: string) => {
	if (filterString === "all") {
		return tasks;
	}
	const filteredData = tasks.filter((task) => {
		const todayCheck = isToday(task.dateCompleted as Date);
		const weekCheck = isThisWeek(task.dateCompleted as Date);
		const monthCheck = isThisMonth(task.dateCompleted as Date);
		const yearCheck = isThisYear(task.dateCompleted as Date);
		if (filterString === "today") {
			return todayCheck;
		} else if (filterString === "thisWeek") {
			return weekCheck;
		} else if (filterString === "thisMonth") {
			return monthCheck;
		} else if (filterString === "thisYear") {
			return yearCheck;
		}
	});
	return filteredData;
};
