'use server';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';

import { getUserPostLike, getUserCommentLike } from '@/data/like';
import { revalidateTag } from 'next/cache';

export const delete_post_like = async (postId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  const like = await getUserPostLike(postId, dbUser.id);
  if (!like) {
    return { error: 'User has not liked post' };
  }
  await db.like.delete({
    where: {
      id: like.id,
    },
  });
  revalidateTag('userPosts');
  return { success: 'Like deleted' };
};

export const delete_comment_like = async (commentId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  const like = await getUserCommentLike(commentId, dbUser.id);
  if (!like) {
    return { error: 'User has not liked post' };
  }
  await db.like.delete({
    where: {
      id: like.id,
    },
  });
  revalidateTag('userPosts');
  return { success: 'Like deleted' };
};
