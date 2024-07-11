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
import { link_task_session } from '@/action/task/link-task-to-session';
import { getStreakByUserId } from '@/data/streak';
import { Status } from '@prisma/client';
import { startOfDay, isSameDay, differenceInDays } from 'date-fns';
import { Streak } from '@prisma/client';

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
      dateCompleted: status === 'COMPLETE' ? new Date() : null,
    },
  });
  if (status === Status.COMPLETE) {
    const streak: any = await getStreakByUserId(dbUser.id);
    const now = new Date();
    if (streak) {
      const daysDifference = differenceInDays(
        startOfDay(now),
        startOfDay(streak.lastUpdated)
      );
      // get the difference between days
      // if the day is same, make no change
      if (daysDifference === 0) {
        return { error: 'Already increased for the day' };
      } else if (daysDifference === 1) {
        // if it is the next day increase by one
        await db.streak.update({
          where: { userId: dbUser.id },
          data: {
            count: {
              increment: 1,
            },
            lastUpdated: now,
          },
        });
      } else {
        // if it is more than one reset streak
        await db.streak.update({
          where: { userId: dbUser.id },
          data: {
            count: 1,
            lastUpdated: now,
          },
        });
      }
    } else {
      await db.streak.create({
        data: {
          userId: dbUser.id,
          count: 1,
          lastUpdated: now,
        },
      });
    }
    console.log(streak);
    if (streak.count === 1) {
      await db.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          hightlighted: true,
        },
      });
    }
  }
  // if (dbUser.streak === )
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
  revalidateTag('userUnCompletedTasks');
  return { success: 'Task Successfully Updated' };
};
