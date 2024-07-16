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

export const getUserUnCompletedTask = async (userId: string) => {
  try {
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
    });
    return tasks;
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
