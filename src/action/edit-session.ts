'use server';
import * as z from 'zod';
import { EditSessionSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { getSessionById, getSessionAdmin } from '@/data/session';
import { is_member } from '@/action/join-tribe';
import { checkIsAfter, getTimeDifference, getDuration } from '@/util/DateTime';

export const edit_session = async (
  values: z.infer<typeof EditSessionSchema>,
  sessionId: string
) => {
  // console.log(values);
  // check if fields valied
  // const validatedFields = EditSessionSchema.safeParse(values);
  // console.log(validatedFields.error);
  // if (!validatedFields.success) {
  //   return { error: 'Invalid Fields' };
  // }
  const { goal, startEndDateTime, meetingLink } = values;
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
  // get session from database
  const session = await getSessionById(sessionId);
  if (!session) {
    return { error: 'Session does not exit' };
  }

  // check if user is the admin
  const checkIfAdmin = await getSessionAdmin(session.id);

  if (checkIfAdmin?.id !== dbUser.id) {
    return { error: 'You are not authorised to make edits to Session!' };
  }

  // check if session has started or end
  // const isAfter = checkIsAfter(session.endDateTime);

  const timeLeft = parseFloat(
    getTimeDifference(session.startDateTime.toISOString()).minutes
  );
  if (values.startEndDateTime) {
    if (timeLeft < 5) {
      return {
        error: 'Too late to make any changes to session Time',
      };
    }
  }
  const durationObj = getDuration(
    startEndDateTime?.startDateTime.toISOString() as string,
    startEndDateTime?.endDateTime.toISOString() as string
  ).hm;
  const duration = JSON.stringify(durationObj);
  await db.session.update({
    where: { id: session.id },
    data: {
      goal,
      startDateTime: startEndDateTime?.startDateTime,
      endDateTime: startEndDateTime?.endDateTime,
      meetingLink,
      duration,
    },
  });

  // TODO: send email to all participants

  return { success: 'Changes successfully made to Session' };

  // all checks passed then update session
};
