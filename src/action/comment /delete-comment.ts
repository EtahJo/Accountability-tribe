'use server';

import { db } from '@/lib/db';
import { check_user } from '@/action/check-user';
import { currentUser } from '@/lib/authentication';
import { getCommentById } from '@/data/comment';
import { getSpecificTribeAdmin } from '@/data/tribe';
import { revalidateTag } from 'next/cache';

export const delete_comment = async (commentId: string) => {
  const dbUser: any = await check_user();
  const comment = await getCommentById(commentId);
  if (!comment) {
    return { error: 'Comment does not exist' };
  }
  const specificAdmin = await getSpecificTribeAdmin(
    comment.post.tribeId,
    dbUser.id
  );

  if (dbUser.id !== comment.authorId && !specificAdmin) {
    return { error: 'You are not authorised to delete comment' };
  }
  await db.comment.delete({
    where: { id: comment.id },
  });
  if (specificAdmin && dbUser !== comment.authorId) {
    await db.notification.create({
      data: {
        userId: comment.authorId,
        type: 'WARNING',
        message: 'Your comment has been deleted by tribe admin',
      },
    });
  }
  revalidateTag('tribePosts');
  return { success: 'Comment deleted' };
};
