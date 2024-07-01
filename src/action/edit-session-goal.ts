'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { is_member } from '@/action/join-tribe';
import { getSessionUserBySessionUserId } from '@/data/session';
import { EditSessionSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { revalidateTag } from 'next/cache';

export const edit_session_goal = async (
  values: z.infer<typeof EditSessionSchema>,
  sessionId: string
  //   pageUserId: string
) => {
  const { goal } = values;
  // check if user logged in
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorized User' };
  }
  // check if user exist in database
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unathorised User' };
  }
  const sessionParticipant = await getSessionUserBySessionUserId(
    sessionId,
    dbUser.id
  );
  if (!sessionParticipant) {
    return { error: 'Add session first' };
  }
  await db.sessionParticipant.update({
    where: { id: sessionParticipant.id },
    data: {
      goal,
    },
  });

  revalidateTag('userSessions');
  return { success: 'Goal Successfully Updated' };
};
