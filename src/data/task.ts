import { db } from '@/lib/db';

export const getAllUserTasks = async (userId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: { userId },
      include: {
        sessions: true,
        user: true,
      },
      orderBy: {
        priority: 'asc',
      },
    });
    return tasks;
  } catch {}
};
