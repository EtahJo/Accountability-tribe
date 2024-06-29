'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';

export const create_like = async (postId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorised access' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }

  await db.like.create({
    data: {
      postId,
      userId: dbUser.id,
    },
  });
  return { success: 'Like Added' };
};
