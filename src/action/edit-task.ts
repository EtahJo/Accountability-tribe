'use server';

import * as z from 'zod';
import {
  getTaskById,
  getSessionTaskByTaskIdAndSessionParticipantId,
} from '@/data/task';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { EditTaskSchema } from '@/schemas/index';
import { revalidateTag } from 'next/cache';
import { currentUser } from '@/lib/authentication';
import { link_task_session } from '@/action/link-task-to-session';

export const edit_task = async (
  values: z.infer<typeof EditTaskSchema>,
  taskId: string
) => {
  const validatedFields = EditTaskSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }

  const {
    title,
    description,
    status,
    priority,
    sessionParticipantId,
    dueDate,
  } = validatedFields.data;
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorised access' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }

  const task = await getTaskById(taskId);
  if (!task) {
    return { error: 'Task does not exist' };
  }
  if (dbUser.id !== task.userId) {
    return { error: 'You are not authorised to make this change' };
  }
  await db.task.update({
    where: { id: taskId },
    data: {
      ...values,
    },
  });
  if (sessionParticipantId) {
    const SessionTask = await getSessionTaskByTaskIdAndSessionParticipantId(
      taskId,
      sessionParticipantId
    );
    if (SessionTask) {
      return { error: 'task already added to session' };
    }
    const newSessionTask = await link_task_session(
      sessionParticipantId,
      taskId
    );
    return { success: 'Task added to session' };
  }
  revalidateTag('userTasks');
  return { success: 'Task Successfully Updated' };
};
