'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import {
  getTribeUserByTribeUserId,
  getSpecificTribeAdmin,
  getTribeById,
} from '@/data/tribe';
import { revalidateTag } from 'next/cache';

export const make_tribe_admin = async (tribeId: string, userId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not authorised' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Not authorised' };
  }
  const doesUserExist = await getUserById(userId);
  if (!doesUserExist) {
    return { error: 'No such user exists' };
  }
  const isUserAdmin = await getSpecificTribeAdmin(tribeId, dbUser.id); // check if present user logged in is an admin
  if (!isUserAdmin) {
    return { error: 'Only admins are authorised to perform this action' };
  }
  const isUserMember = await getTribeUserByTribeUserId(tribeId, userId); // check if user that is about to be make admin is a member of tribe
  if (!isUserMember) {
    return { error: 'Only tribe members can be made admins' };
  }
  await db.tribeUser.update({
    where: { userId_tribeId: { userId, tribeId } },
    data: {
      userRole: 'ADMIN',
    },
  });
  if (!isUserMember.adminsUsername.includes(doesUserExist.username as string)) {
    await db.tribeUser.updateMany({
      where: { tribeId },
      data: {
        adminsUsername: {
          push: doesUserExist.username as string,
        },
      },
    });
  }
  const tribe = await getTribeById(tribeId, dbUser.id);
  if (!tribe?.adminsUsername.includes(doesUserExist.username as string)) {
    await db.tribe.update({
      where: { id: tribeId },
      data: {
        adminsUsername: {
          push: doesUserExist.username as string,
        },
      },
    });
  }
  await db.notification.create({
    data: {
      userId,
      message: `You have been made an admin of the ${tribe?.name} tribe`,
      type: 'APPROVAL',
      pageId: tribe?.id,
    },
  });
  revalidateTag('tribeInfo');
  return { success: 'New Admin Added' };
};
