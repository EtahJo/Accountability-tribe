'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { CreateCommentSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getPostById } from '@/data/post';
import { is_member } from '@/action/tribe/join-tribe';
import { revalidateTag } from 'next/cache';

export const create_comment = async (
  values: z.infer<typeof CreateCommentSchema>,
  postId: string
) => {
  const validatedFields = CreateCommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }

  const { content } = validatedFields.data;
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to comment' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const post = await getPostById(postId);
  const isMember = await is_member(post?.tribeId as string, dbUser.id);
  if (!isMember.result) {
    return { error: 'Join tribe to be able to comment' };
  }
  await db.comment.create({
    data: {
      content,
      post: {
        connect: { id: postId },
      },
      author: {
        connect: { id: dbUser.id },
      },
    },
  });
  //   revalidatePath(`/user/${dbUser.username}`);
  revalidateTag('tribePosts');
  revalidateTag('userPosts');
  // revalidateTag('userTribes');

  return { success: 'Comment Created' };
};
