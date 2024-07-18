'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import {
  getTribeUserByTribeUserId,
  getTribeById,
  getAllTribeAdmins,
} from '@/data/tribe';
import { revalidateTag } from 'next/cache';
import { currentUser } from '@/lib/authentication';

export const join_tribe = async (tribeId: string, userId: string) => {
  const user = currentUser();
  if (!user) {
    return { error: 'Unauthorised User' };
  }
  const dbUser = await getUserById(userId as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const tribe = await getTribeById(tribeId, dbUser.id);
  const tribeUser = await getTribeUserByTribeUserId(tribeId, userId);

  if (tribeUser) {
    return { error: 'Already member of tribe' };
  }
  await db.tribeUser.create({
    data: {
      user: { connect: { id: dbUser.id } },
      tribe: { connect: { id: tribeId } },
      userRole: 'USER',
      adminsUsername: tribe?.adminsUsername,
    },
  });
  const allTribeAdmins = await getAllTribeAdmins(tribeId);
  if (allTribeAdmins) {
    await db.$transaction(
      allTribeAdmins?.map((admin) =>
        db.notification.create({
          data: {
            userId: admin.userId,
            message: 'You have a new tribe member',
            type: 'ADMINTASK',
            pageId: tribeId,
          },
        })
      )
    );
  }
  await db.notification.create({
    data: {
      userId: dbUser.id,
      message: `You are now a member of ${tribe?.name} tribe`,
      type: 'APPROVAL',
      pageId: tribe?.id,
    },
  });
  revalidateTag('tribeInfo');
  return { success: 'Successfully Joined Tribe' };
};

export const is_member = async (tribeId: string, userId: string) => {
  const tribeUser = await getTribeUserByTribeUserId(tribeId, userId);
  if (tribeUser) {
    return { result: true };
  }
  return { result: false };
};
