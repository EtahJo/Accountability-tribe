'use server';
import { db } from '@/lib/db';
import { getSessionById } from '@/data/session';
import { currentUser } from '@/lib/authentication';
import { isParticipant } from '@/util/Check';
import { getUserById } from '@/data/user';

export const add_session = async (values: any, sessionId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorised access' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const session = await getSessionById(sessionId);
  if (!session) {
    return { error: 'Session does not exit' };
  }
  const alreadyAParticipant = isParticipant(
    session.participants,
    dbUser.username
  );
  if (alreadyAParticipant) {
    return { error: 'You are already added this session' };
  }

  const participant = await db.sessionParticipant.create({
    data: {
      name: dbUser.username as string,
      goal: values.goal || session?.goal,
      country: dbUser.country,
      email: dbUser.email as string,
      sessionId: session.id,
    },
  });
  // await db.user.update({
  //   where: { id: dbUser.id },
  //   data: {
  //     sessions: {
  //      connect:{id:sessionId}
  //     },
  //   },
  // });
  // await db.session.create({
  //   data: {
  //     goal: participant.goal || session.goal,
  //     startDateTime: session.startDateTime,
  //     endDateTime: session.endDateTime,
  //     meetingLink: session.meetingLink,
  //     duration: session.duration,
  //     creatorId: session.creatorId,
  //   },
  // });
  return { success: 'Session Successfully Added' };
};
