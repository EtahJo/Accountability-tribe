'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getCommentById } from '@/data/comment';
import { getPostById } from '@/data/post';
import { CreateCommentSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';

export const edit_comment = async (
  values: z.infer<typeof CreateCommentSchema>,
  commentId: string
) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  const comment = await getCommentById(commentId);
  if (!comment) {
    return { error: 'Comment does not exist' };
  }
  if (dbUser?.id !== comment?.authorId) {
    return { error: 'Not authorised to make edit' };
  }
  await db.comment.update({
    where: { id: comment.id },
    data: { ...values, edited: true },
  });
  const post = await getPostById(comment.postId);
  return {
    success: 'Comment edit made',
    postAuthorUsername: post?.author.username,
    postTribeId: post?.tribeId,
  };
};
