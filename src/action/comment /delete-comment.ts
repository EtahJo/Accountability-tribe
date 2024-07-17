'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { getCommentById, getCommentReplies } from '@/data/comment';
import { getSpecificTribeAdmin } from '@/data/tribe';

import { revalidateTag } from 'next/cache';

export const delete_comment = async (commentId: string) => {
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
  const specificAdmin = await getSpecificTribeAdmin(
    comment.post.tribeId,
    dbUser.id
  );

  if (dbUser.id !== comment.authorId && !specificAdmin) {
    return { error: 'You are not authorised to delete comment' };
  }
  const commentAdminId = comment.authorId;
  async function deleteCommentAndReplies(commentId: string) {
    const replies = await getCommentReplies(commentId);

    for (const reply of replies as { id: string }[]) {
      await deleteCommentAndReplies(reply.id);
    }

    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
  deleteCommentAndReplies(commentId);
  if (specificAdmin && dbUser.id !== commentAdminId) {
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
