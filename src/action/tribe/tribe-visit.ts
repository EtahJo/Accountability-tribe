'use server';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { revalidateTag } from 'next/cache';

export const tribe_visit = async (tribeId: string, userId: string) => {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);
  if (!user || !dbUser) {
    return { error: 'Unauthorised access' };
  }
  await db.tribeVisit.upsert({
    where: {
      userId_tribeId: {
        userId,
        tribeId,
      },
    },
    update: {
      lastVisit: new Date(),
    },
    create: {
      userId,
      tribeId,
      lastVisit: new Date(),
    },
  });
  revalidateTag('userSimilarTribes');
};
