'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import {
  getTribeById,
  getSpecificTribeAdmin,
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
  const tribeAdmin = await getSpecificTribeAdmin(tribeId, dbUser.id);
  if (
    tribe.adminsUsername.includes(userToDelete.username as string) &&
    tribe.adminsUsername.length === 1 &&
    tribe.users.length > 1
  ) {
    // if the admin want to leave and there is no other admin
    return { error: 'Make another admin before you leave' };
  }

  if (userToDelete.id !== dbUser.id && !tribeAdmin) {
    // checking if the user logged in is either an admin or the person who wants to leave
    return { error: 'You are not authorised ' };
  }

  await db.tribeUser.delete({
    where: { id: tribeUser.id },
  });
  revalidateTag('tribeInfo');
  return { success: 'Tribe member deleted' };
};
