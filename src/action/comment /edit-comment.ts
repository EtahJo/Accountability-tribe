'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getCommentById } from '@/data/comment';
import { CreateCommentSchema } from '@/schemas/index';
import { check_user } from '@/action/check-user';
import { revalidateTag } from 'next/cache';

export const edit_comment = async (
  values: z.infer<typeof CreateCommentSchema>,
  commentId: string
) => {
  const dbUser: any = await check_user();
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
  //   revalidateTag('tribePosts');
  revalidateTag('userPosts');
  return { success: 'Comment edit made' };
};
