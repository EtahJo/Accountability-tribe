import { db } from '@/lib/db';
import { Status } from '@prisma/client';
export const getAllUserTasks = async (userId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: { userId },
      include: {
        user: true,
        sessionParticipants: {
          include: {
            sessionParticipant: {
              include: { session: true },
            },
          },
        },
      },
      orderBy: {
        priority: 'asc',
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
                    users: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        priority: 'asc',
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
  sessionParticipantId: string
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
      error.message
    );
  }
};
export const getUserUnCompletedTask = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
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
              include: { session: true },
            },
          },
        },
      },
      orderBy: {
        priority: 'asc',
      },
      take: pageLimit + 1,
      skip: pageLimit * (pageNumber - 1),
    });
    const hasMore = tasks && tasks.length > pageLimit;
    const result = hasMore ? tasks.slice(0, pageLimit) : tasks;
    return { tasks: result, hasMore, totalPages };
  } catch {}
};

export const getUserCompletedTask = async (userId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
        status: Status.COMPLETE,
      },
      orderBy: {
        dateCompleted: 'desc',
      },
    });
    return tasks;
  } catch {}
};
