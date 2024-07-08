'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getSessionById, getSessionUserBySessionUserId } from '@/data/session';
import { revalidateTag } from 'next/cache';

export const leave_session = async (sessionId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'UnAuthorised Access' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'UnAuthorised Access' };
  }

  const session = await getSessionById(sessionId);
  if (!session) {
    return { error: 'Session does not exist' };
  }
  const sessionParticipant = await getSessionUserBySessionUserId(
    sessionId,
    dbUser.id
  );
  if (!sessionParticipant) {
    return { error: 'You are not a member of this session' };
  }
  if (sessionParticipant.tasks) {
    await db.$transaction(
      sessionParticipant.tasks.map((sessionTask) =>
        db.sessionTask.delete({
          where: {
            id: sessionTask.id,
          },
        })
      )
    );
  }
  await db.sessionParticipant.delete({
    where: {
      id: sessionParticipant.id,
    },
  });

  revalidateTag('userSessions');
  return { success: 'You left Session' };
};
