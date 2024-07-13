'use server';
import { db } from '@/lib/db';
import { getPostById } from '@/data/post';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/authentication';
import { revalidateTag } from 'next/cache';

export const delete_post = async (postId: string) => {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);
  if (!user || !dbUser) {
    return { error: 'Unauthorised access' };
  }
  const post = await getPostById(postId);
  if (!post) {
    return { error: 'Post does not exist' };
  }
  if (post.authorId !== dbUser.id) {
    return { error: 'You are not the author of post' };
  }
  await db.post.delete({
    where: {
      id: postId,
    },
  });
  revalidateTag('tribePosts');

  return { success: 'Post deleted' };
};
