'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import {
  getSessionById,
  getSessionParticipantById,
  getSessionTaskByTaskIdSessionId,
} from '@/data/session';
import { getTaskById } from '@/data/task';
import { revalidateTag } from 'next/cache';
import { isAfter } from 'date-fns';
import { checkIsAfter } from '@/util/DateTime';
import { LinkMultipleTaskSchema } from '@/schemas/index';

export const link_task_session = async (
  sessionParticipantId: string,
  taskId: string
) => {
  const sessionParticipant = await getSessionParticipantById(
    sessionParticipantId
  );

  const session = await getSessionById(sessionParticipant?.sessionId as string);
  if (!session) {
    return { error: 'Session does not exist' };
  }
  if (!sessionParticipant) {
    return { error: 'Add session to link to task' };
  }
  const dateNow = new Date();
  const isAfter = checkIsAfter(session?.endDateTime);

  if (isAfter) {
    return { error: 'Session has already ended' };
  }

  const task = await getTaskById(taskId as string);

  if (!task) {
    return { error: 'Task does not exist' };
  }
  const taskPresent = await getSessionTaskByTaskIdSessionId(
    taskId,
    sessionParticipantId
  );
  if (taskPresent) {
    return { error: 'Task already in session' };
  }
  await db.sessionTask.create({
    data: {
      sessionParticipantId,
      taskId,
    },
  });
  revalidateTag('userTasks');
  revalidateTag('userSessions');
  revalidateTag('userUnCompletedTasks');
  return { success: 'Task added to session' };
};

// export const link_multiple_tasks = async (
//   values: z.infer<typeof LinkMultipleTaskSchema>,
//   sessionParticipantId: string
// ) => {
//   const validdatedFields = LinkMultipleTaskSchema.safeParse(values);
//   if (!validdatedFields.success) {
//     return { error: 'Invalid Fields' };
//   }
//   const { taskIds } = validdatedFields.data;
//   taskIds.map(
//     async ({ value }) => await link_task_session(sessionParticipantId, value)
//   );

//   return { success: 'Tasks added to session' };
// };
