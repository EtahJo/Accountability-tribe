'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import {
  getTribeById,
  getTribeAdmin,
  getTribeUserByTribeUserId,
} from '@/data/tribe';
import { revalidateTag } from 'next/cache';

export const remove_tribe_user = async (tribeId: string, userId: string) => {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);
  if (!user || !dbUser) {
    return { error: 'Unauthorised access' };
  }
  const userToDelete = await getUserById(userId);
  if (!userToDelete) {
    return { error: 'Not a member of tribe' };
  }
  const tribe = await getTribeById(tribeId, dbUser.id);
  if (!tribe) {
    return { error: 'Tribe does not exist' };
  }
  const tribeUser = await getTribeUserByTribeUserId(tribeId, userToDelete.id);
  if (!tribeUser) {
    return { error: 'Not a member of tribe' };
  }
  const tribeAdmin = await getTribeAdmin(tribeId);
  if (userToDelete.id !== tribeUser.userId || dbUser.id !== tribeAdmin?.id) {
    return { error: 'You are not authorised ' };
  }
  await db.tribeUser.delete({
    where: { id: tribeUser.id },
  });
  await db.tribeVisit.delete({
    where: { userId_tribeId: { userId: userToDelete.id, tribeId } },
  });
  revalidateTag('tribeInfo');
  return { success: 'Tribe member deleted' };
};
