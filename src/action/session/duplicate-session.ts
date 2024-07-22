'use server';
import * as z from 'zod';
import { getSessionById, getSessionUserBySessionUserId } from '@/data/session';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { db } from '@/lib/db';
import { EditSessionSchema } from '@/schemas/index';
import { addDays, isToday } from 'date-fns';

export const duplicate_session = async (
  values: z.infer<typeof EditSessionSchema>,
  sessionId: string
) => {
  const { goal, meetingLink, taskIds } = values;
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorised access' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const session = await getSessionById(sessionId);
  const sessionParticipant = await getSessionUserBySessionUserId(
    sessionId,
    dbUser.id
  );
  if (!sessionParticipant) {
    return { error: "You can't duplicate" };
  }
  const isEndToday = isToday(session?.endDateTime as Date);
  if (!isEndToday) {
    return { error: 'Too old to Duplicate, consider creating new session' };
  }
  const sessionDuplicate = await db.session.create({
    data: {
      goal: goal || (sessionParticipant.goal as string),
      startDateTime: addDays(session?.startDateTime as Date, 1),
      endDateTime: addDays(session?.endDateTime as Date, 1),
      meetingLink: meetingLink as string,
      duration: session?.duration,
    },
  });

  const sessionParticipantDuplicate = await db.sessionParticipant.create({
    data: {
      user: { connect: { id: dbUser.id } },
      session: { connect: { id: sessionDuplicate.id } },
      userRole: 'ADMIN',
      goal,
      adminUsername: dbUser.username,
    },
  });
  await db.session.update({
    where: {
      id: sessionDuplicate.id,
    },
    data: {
      participants: {
        increment: 1,
      },
    },
  });
  if (taskIds) {
    await db.$transaction(
      taskIds.map((taskId) =>
        db.sessionTask.create({
          data: {
            taskId: taskId.value,
            sessionParticipantId: sessionParticipantDuplicate.id,
          },
        })
      )
    );
  }
  return { success: 'Session Duplicated', creatorUsername: dbUser.username };
};
