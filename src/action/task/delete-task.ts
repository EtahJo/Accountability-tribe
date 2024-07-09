'use server';

import { db } from '@/lib/db';
import { getTaskById } from '@/data/task';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { revalidateTag } from 'next/cache';

export const delete_task = async (taskId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not authorised' };
  }
  const task = await getTaskById(taskId);
  if (!task) {
    return { error: 'Task does not exist' };
  }
  if (task.sessionParticipants.length > 0) {
    await db.$transaction(
      task.sessionParticipants.map((participant) =>
        db.sessionTask.delete({
          where: { id: participant.id },
        })
      )
    );
  }
  await db.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidateTag('userTasks');
  revalidateTag('userUnCompletedTasks');
  return { success: 'Task deleted' };
};
