'use server';

import * as z from 'zod';
import { CreateSessionSchema } from '@/schemas/index';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getDuration } from '@/util/DateTime';

export const create_session = async (
  values: z.infer<typeof CreateSessionSchema>
) => {
  const validatedFields = CreateSessionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }
  const { goal, startEndDateTime, meetingLink } = validatedFields.data;
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorised access' };
  }
  const durationObj = getDuration(
    startEndDateTime.startDateTime.toISOString(),
    startEndDateTime.endDateTime.toISOString()
  ).hm;
  const duration = JSON.stringify(durationObj);
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const session = await db.session.create({
    data: {
      goal,
      startDateTime: startEndDateTime.startDateTime,
      endDateTime: startEndDateTime.endDateTime,
      meetingLink,
      duration,
      creatorId: dbUser?.id as string,
    },
  });
  await db.sessionParticipant.create({
    data: {
      name: dbUser?.username as string,
      goal,
      country: dbUser.country,
      email: dbUser.email as string,
      sessionId: session.id,
    },
  });
  return { success: 'Session Created' };
};
