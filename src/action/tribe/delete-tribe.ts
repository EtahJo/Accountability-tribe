'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getTribeById, getTribeAdmin } from '@/data/tribe';
import { revalidateTag } from 'next/cache';

export const delete_tribe = async (tribeId: string) => {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);
  if (!user || !dbUser) {
    return { error: 'Unauthorised access' };
  }
  const tribe = await getTribeById(tribeId, user?.id as string);
  if (!tribe) {
    return { error: 'Tribe does not exist' };
  }
  const tribeAdmin = await getTribeAdmin(tribe.id);
  if (tribeAdmin?.id !== user.id && tribe.users.length !== 0) {
    return { error: 'You are not allowed to delete tribe' };
  }
  if (tribe.users.length !== 0)
    return { error: 'Tribe with members can not be deleted' };

  await db.tribe.delete({
    where: { id: tribe.id },
  });
  revalidateTag('userTribes');
  return { success: 'Tribe deleted' };
};
