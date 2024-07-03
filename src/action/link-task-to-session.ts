'use server';

import { db } from '@/lib/db';
import { getSessionById, getSessionParticipantById } from '@/data/session';
import { getTaskById } from '@/data/task';
import { revalidateTag } from 'next/cache';
import { isAfter } from 'date-fns';

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
  const checkIsAfter = isAfter(session.endDateTime as Date, dateNow);
  if (checkIsAfter) {
    return { error: 'Session has already ended' };
  }

  const task = await getTaskById(taskId);
  if (!task) {
    return { error: 'Task does not exist' };
  }
  await db.sessionTask.create({
    data: {
      sessionParticipantId,
      taskId,
    },
  });
  revalidateTag('userTasks');
  revalidateTag('userSessions');
};
