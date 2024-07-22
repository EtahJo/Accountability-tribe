'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import {
  getSessionById,
  getSessionParticipantById,
  getSessionTaskByTaskIdSessionId,
} from '@/data/session';
import { getTaskById } from '@/data/task';
import { isAfter } from 'date-fns';

export const link_task_session = async (
  sessionParticipantId: string,
  taskId: string
) => {
  const sessionParticipant = await getSessionParticipantById(
    sessionParticipantId
  );
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  const session = await getSessionById(sessionParticipant?.sessionId as string);
  if (!session) {
    return { error: 'Session does not exist' };
  }
  if (!sessionParticipant) {
    return { error: 'Add session to link to task' };
  }
  const dateNow = new Date();
  const checkIssAfter = isAfter(dateNow, session.endDateTime as Date);

  if (checkIssAfter) {
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
  return { success: 'Task added to session', creatorUsername: dbUser.username };
};
