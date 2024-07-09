'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { revalidateTag } from 'next/cache';

export const create_post_like = async (postId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to like ' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }

  await db.like.create({
    data: {
      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: dbUser.id },
      },
      // postId,
      // userId: dbUser.id,
    },
  });
  revalidateTag('userPosts');
  revalidateTag('tribePosts');
  return { success: 'Like Added' };
};
export const create_comment_like = async (commentId: string) => {
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
      comment: {
        connect: { id: commentId },
      },
      user: {
        connect: { id: dbUser.id },
      },
    },
  });
  revalidateTag('userPosts');
  revalidateTag('tribePosts');
};
