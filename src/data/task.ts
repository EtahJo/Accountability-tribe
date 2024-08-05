import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { 
	startOfWeek,
	endOfWeek, 
	startOfMonth, 
	endOfMonth, 
	startOfYear,
	endOfYear ,
	startOfDay,
	endOfDay,
} from "date-fns";
export const getAllUserTasks = async (userId: string) => {
	try {
		const tasks = await db.task.findMany({
			where: { userId },
			include: {
				user: true,
				sessionParticipants: {
					include: {
						sessionParticipant: {
							include: { session: {
								include:{
									users:{
										include:{
											user:true
										}
									}
								}
							}},
						},
					},
				},
			},
			orderBy: {
				priority: "asc",
			},
		});
		return tasks;
	} catch {}
};
export const getHighPriorityTasks = async (userId: string) => {
	try {
		const tasks = await db.task.findMany({
			where: {
				userId,
				OR: [{ priority: 1 }, { priority: 2 }],
				status: {
					not: Status.COMPLETE,
				},
			},
			include: {
				user: true,
				sessionParticipants: {
					include: {
						sessionParticipant: {
							include: {
								session: {
									include: {
										users: {
											include:{
												user:true
											}
										},
									},
								},
							},
						},
					},
				},
			},
			orderBy: {
				priority: "asc",
			},
		});
		return tasks;
	} catch {}
};
export const getTaskById = async (taskId: string) => {
	try {
		const task = await db.task.findUnique({
			where: { id: taskId },
			include: {
				sessionParticipants: true,
			},
		});
		return task;
	} catch {}
};

export const getSessionTaskByTaskIdAndSessionParticipantId = async (
	taskId: string,
	sessionParticipantId: string,
) => {
	try {
		const SessionTask = await db.sessionTask.findUnique({
			where: { sessionParticipantId_taskId: { sessionParticipantId, taskId } },
		});
		return SessionTask;
	} catch {}
};
const totalUserUncompletedTasks = async (userId: string) => {
	try {
		const total = await db.task.count({
			where: {
				userId,
				status: {
					not: Status.COMPLETE,
				},
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting user's total uncompleted tasks",
			error.message,
		);
	}
};
export const getUserUnCompletedTask = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
		const totalItems = await totalUserUncompletedTasks(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: {
					not: Status.COMPLETE,
				},
			},
			include: {
				user: true,
				sessionParticipants: {
					include: {
						sessionParticipant: {
							include: { session: {
								include:{
									users:{
										include:{
											user:true
										}
									}
								}
							} },
						},
					},
				},
			},
			orderBy: {
				priority: "asc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error("Error getting all user uncompleted tasks", error.message);
	}
};

const totalCompletedTasks = async (userId: string) => {
	try {
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting the total of user's completed tasks",
			error.message,
		);
	}
};

export const getUserCompletedTask = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
		const totalItems = await totalCompletedTasks(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error("Error getting all user completed tasks", error.message);
	}
};
const totalCompletedTasksToday = async (userId: string) => {
	try {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);
		const endOfToday = new Date();
		endOfToday.setHours(23, 59, 59, 999);
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfToday,
					lt: endOfToday,
				},
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting total of tasks completed today",
			error.message,
		);
	}
};

export const getUserCompletedTaskToday = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);
		const endOfToday = new Date();
		endOfToday.setHours(23, 59, 59, 999);
		const totalItems = await totalCompletedTasksToday(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfToday,
					lt: endOfToday,
				},
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error(
			"Error getting all user completed tasks today",
			error.message,
		);
	}
};

const totalCompletedTasksThisWeek = async (userId: string) => {
	try {
		const now = new Date();
		const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
		const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
          			gte: startOfThisWeek,
					lt: endOfThisWeek,
        },
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting the total of user's completed tasks this week",
			error.message,
		);
	}
};

export const getUserCompletedTaskThisWeek = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
    	const now = new Date();
		const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
		const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
		const totalItems = await totalCompletedTasksThisWeek(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
        		dateCompleted: {
        		gte: startOfThisWeek,
				lt: endOfThisWeek,
        },
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error("Error getting all user completed tasks this week", error.message);
	}
};

const totalCompletedTasksThisMonth = async (userId: string) => {
	try {
		const now = new Date()
		const startOfThisMonth= startOfMonth(now);
		const endOfThisMonth= endOfMonth(now)
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfThisMonth,
					lt: endOfThisMonth,
				},
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting total of tasks completed this month",
			error.message,
		);
	}
};

export const getUserCompletedTaskThisMonth = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
		const now = new Date()
		const startOfThisMonth= startOfMonth(now);
		const endOfThisMonth= endOfMonth(now)
		const totalItems = await totalCompletedTasksThisMonth(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfThisMonth,
					lt: endOfThisMonth,
				},
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error(
			"Error getting all user completed tasks this month",
			error.message,
		);
	}
};

const totalCompletedTasksThisYear = async (userId: string) => {
	try {
		const now = new Date()
		const startOfThisYear= startOfYear(now);
		const endOfThisYear= endOfYear(now)
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfThisYear,
					lt: endOfThisYear,
				},
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting total of tasks completed this year",
			error.message,
		);
	}
};

export const getUserCompletedTaskThisYear = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
) => {
	try {
		const now = new Date()
		const startOfThisYear= startOfYear(now);
		const endOfThisYear= endOfYear(now)
		const totalItems = await totalCompletedTasksThisYear(userId);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte: startOfThisYear,
					lt: endOfThisYear,
				},
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error(
			"Error getting all user completed tasks this year",
			error.message,
		);
	}
};


const totalCompletedTasksSpecificDate = async (userId: string, specificDate:string) => {
	try {
		const day = new Date(specificDate)
		const startOfTheDay= startOfDay(day);
		const endOfTheDay = endOfDay(day);
		const total = await db.task.count({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte:startOfTheDay,
					lt:endOfTheDay
				}
			},
		});
		return total;
	} catch (error: any) {
		console.error(
			"Error getting total of tasks completed on specific date",
			error.message,
		);
	}
};

export const getUserCompletedTaskSpecificDate = async (
	userId: string,
	pageLimit: number,
	pageNumber: number,
	specificDate:string
) => {
	try {
		const day = new Date(specificDate)
		const startOfTheDay= startOfDay(day);
		const endOfTheDay = endOfDay(day);
		const totalItems = await totalCompletedTasksSpecificDate(userId,specificDate);
		const totalPages = Math.ceil((totalItems as number) / pageLimit);
		const tasks = await db.task.findMany({
			where: {
				userId,
				status: Status.COMPLETE,
				dateCompleted: {
					gte:startOfTheDay,
					lt:endOfTheDay
				}
			},
			orderBy: {
				dateCompleted: "desc",
			},
			take: pageLimit + 1,
			skip: pageLimit * (pageNumber - 1),
		});
		const hasMore = tasks && tasks.length > pageLimit;
		const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
		return { tasks: result, hasMore, totalPages };
	} catch (error: any) {
		console.error(
			"Error getting all user completed tasks on specific date",
			error.message,
		);
	}
};