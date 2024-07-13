'use server';
import * as z from 'zod';
import { EditTribeSchema } from '@/schemas/index';
import { db } from '@/lib/db';
import { getTribeById, getTribeAdmin } from '@/data/tribe';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { revalidateTag } from 'next/cache';

export const edit_tribe = async (
  values: z.infer<typeof EditTribeSchema>,
  tribeId: string
) => {
  const validatedFields = EditTribeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }
  const { name, description, profileImage, tags } = validatedFields.data;
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);
  if (!user || !dbUser) {
    return { error: 'Unauthorised access' };
  }

  const tribe = await getTribeById(tribeId, dbUser.id as string);
  if (!tribe) {
    return { error: 'Tribe does not exist' };
  }
  const tribeAdmin = await getTribeAdmin(tribe.id);
  if (tribeAdmin?.id !== dbUser.id) {
    return { error: 'Only admin authorised to make changes' };
  }
  await db.tribe.update({
    where: {
      id: tribeId,
    },
    data: {
      ...values,
    },
  });
  revalidateTag('tribeInfo');
  return { success: 'Change saved' };
};
