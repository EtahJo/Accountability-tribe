'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { CreatePostSchema } from '@/schemas';
import { currentUser } from '@/lib/authentication';
import { getTribeAdmin, getTribeUserByTribeUserId } from '@/data/tribe';
import { getUserById } from '@/data/user';
import { revalidateTag } from 'next/cache';

export const create_post = async (
  values: z.infer<typeof CreatePostSchema>,
  tribeId: string
) => {
  const validatedFields = CreatePostSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }

  const { content, title } = validatedFields.data;
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to post' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const tribeUser = await getTribeUserByTribeUserId(tribeId, dbUser.id);
  if (!tribeUser) {
    return { error: 'Only tribe members can add post to tribe' };
  }
  const tribeAdmin = await getTribeAdmin(tribeId);
  const approved = tribeAdmin?.id === dbUser.id ? true : false;

  await db.post.create({
    data: {
      content,
      title,
      tribeId,
      authorId: dbUser.id,
      approved,
    },
  });
  const tags = ['tribePosts', 'userPosts'];
  for (const tag of tags) {
    revalidateTag(tag);
  }
  // revalidateTag('userPosts');
  // revalidateTag('tribePosts');
  const returnMessage =
    tribeAdmin?.id === dbUser.id
      ? 'Post Successfully Created'
      : 'Post Created and Pending Approval';

  return { success: returnMessage };
};
