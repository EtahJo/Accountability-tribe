'use server';
import * as z from 'zod';
import { CreateCommentSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getCommentById } from '@/data/comment';
import { is_member } from '@/action/tribe/join-tribe';
import { db } from '@/lib/db';
import { revalidateTag } from 'next/cache';

export const create_comment_response = async (
  values: z.infer<typeof CreateCommentSchema>,
  commentId: string
) => {
  const validatedFields = CreateCommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }

  const { content } = validatedFields.data;
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to respond to comments' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const comment = await getCommentById(commentId);
  const post = comment?.post;
  const tribeId = post?.tribeId;
  const isMember = await is_member(tribeId as string, dbUser.id);
  if (!isMember.result) {
    return { error: 'Join tribe to be able to comment' };
  }
  await db.comment.create({
    data: {
      content,
      author: { connect: { id: dbUser.id } },
      parent: { connect: { id: commentId } },
      post: { connect: { id: post?.id } },
    },
  });
  revalidateTag('tribePosts');
  revalidateTag('userPosts');
  return { success: 'Comment created' };
};
