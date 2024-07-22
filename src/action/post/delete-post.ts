'use server';
import { db } from '@/lib/db';
import { getPostById } from '@/data/post';
import { getUserById } from '@/data/user';
import { getSpecificTribeAdmin } from '@/data/tribe';
import { currentUser } from '@/lib/authentication';

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
  const tribeAdmin = await getSpecificTribeAdmin(post.tribeId, dbUser.id);
  if (post.authorId !== dbUser.id && !tribeAdmin) {
    return { error: 'You are not the author of post' };
  }

  const postAuthorId = post.authorId;
  const postContent = post.content;
  const tribeId = post.tribeId;
  await db.post.delete({
    where: {
      id: postId,
    },
  });
  if (tribeAdmin && postAuthorId !== dbUser.id) {
    await db.notification.create({
      data: {
        userId: postAuthorId,
        type: 'WARNING',
        message: `Admin deleted your post with content: ${postContent}`,
      },
    });
    return { success: 'Post deleted and post author informed' };
  }

  return {
    success: 'Post deleted',
    postAuthorUsername: dbUser.username,
    postTribeId: tribeId,
  };
};
