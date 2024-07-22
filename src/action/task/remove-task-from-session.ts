'use server';

import { db } from '@/lib/db';

import {
  getTaskById,
  getSessionTaskByTaskIdAndSessionParticipantId,
} from '@/data/task';
import { getSessionParticipantById } from '@/data/session';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';

export const remove_task_from_session = async (
  taskId: string,
  sessionParticipantId: string
) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  const task = await getTaskById(taskId);
  if (!task) {
    return { error: 'task does not exist' };
  }
  if (task.userId !== dbUser.id) {
    return { error: 'You are not authorised' };
  }
  const sessionParticipant = await getSessionParticipantById(
    sessionParticipantId
  );
  if (!sessionParticipant) {
    return { error: 'Not a participant of session' };
  }
  const sessionTask = await getSessionTaskByTaskIdAndSessionParticipantId(
    taskId,
    sessionParticipant.id
  );
  if (!sessionTask) {
    return { error: 'Task not in session' };
  }
  await db.sessionTask.delete({
    where: { id: sessionTask.id },
  });
  return {
    success: 'Task removed from session',
    creatorUsername: dbUser.username,
  };
};
