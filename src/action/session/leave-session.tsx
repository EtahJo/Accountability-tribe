'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import {
  getSessionById,
  getSessionUserBySessionUserId,
  getSessionUsers,
} from '@/data/session';
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
  if (sessionParticipant.adminUsername === dbUser.username) {
    const allSessionUsers = await getSessionUsers(sessionId);
    const filteredUsers = allSessionUsers?.filter(
      (user) => user.userId !== dbUser.id
    );
    if (filteredUsers?.length === 0 || !filteredUsers) {
      return { error: 'You can delete session instead' };
    }
    const firstParticipant = await getUserById(filteredUsers[0].userId);
    await db.sessionParticipant.update({
      where: {
        userId_sessionId: { sessionId, userId: firstParticipant?.id as string },
      },
      data: {
        userRole: 'ADMIN',
      },
    });

    await db.sessionParticipant.updateMany({
      where: { sessionId },
      data: {
        adminUsername: firstParticipant?.username,
      },
    });

    await db.notification.create({
      data: {
        userId: firstParticipant?.id as string,
        message: 'You have been made admin of a session',
        type: 'SESSIONUPDATES',
      },
    });
  }

  await db.sessionParticipant.delete({
    where: {
      id: sessionParticipant.id,
    },
  });

  await db.session.update({
    where: { id: sessionId },
    data: {
      participants: {
        decrement: 1,
      },
    },
  });

  revalidateTag('userSessions');
  return { success: 'You left Session' };
};
