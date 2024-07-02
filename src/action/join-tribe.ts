'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { getTribeUserByTribeUserId } from '@/data/tribe';
import { revalidateTag } from 'next/cache';

export const join_tribe = async (tribeId: string, userId: string) => {
  const dbUser = await getUserById(userId as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const tribeUser = await getTribeUserByTribeUserId(tribeId, userId);

  if (tribeUser) {
    return { error: 'Already member of tribe' };
  }
  await db.tribeUser.create({
    data: {
      user: { connect: { id: dbUser.id } },
      tribe: { connect: { id: tribeId } },
      userRole: 'USER',
    },
  });
  revalidateTag('tribePosts');
  revalidateTag('userPosts');
  return { success: 'Successfully Joined Tribe' };
};

export const is_member = async (tribeId: string, userId: string) => {
  const tribeUser = await getTribeUserByTribeUserId(tribeId, userId);
  if (tribeUser) {
    return { result: true };
  }
  return { result: false };
};
