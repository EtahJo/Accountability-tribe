'use server';
import { db } from '@/lib/db';
import { getSessionUserBySessionUserId } from '@/data/session';
import { getUserById } from '@/data/user';
import { revalidateTag } from 'next/cache';

export const join_session = async (
  values: any,
  sessionId: string,
  userId: string
) => {
  const dbUser = await getUserById(userId as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const sessionUser = await getSessionUserBySessionUserId(sessionId, userId);
  if (sessionUser) {
    return { error: 'Already a Participant' };
  }

  await db.sessionParticipant.create({
    data: {
      user: { connect: { id: dbUser.id } },
      session: { connect: { id: sessionId } },
      userRole: 'USER',
      goal: values.goal,
    },
  });
  revalidateTag('userSessions');
  return { success: 'Session Successfully Added' };
};

export const is_member = async (sessionId: string, userId: string) => {
  const sessionUser = await getSessionUserBySessionUserId(sessionId, userId);
  if (sessionUser) {
    return { isMember: true };
  } else {
    return { isMember: false };
  }
};
