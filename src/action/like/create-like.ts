'use server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getPostById } from '@/data/post';
import { getCommentById } from '@/data/comment';

export const create_post_like = async (postId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to like ' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const post = await getPostById(postId);
  if (!post) {
    return { error: 'No such post exist' };
  }
  await db.like.create({
    data: {
      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: dbUser.id },
      },
    },
  });
  if (post.authorId !== dbUser.id) {
    await db.notification.create({
      data: {
        userId: post.authorId,
        message: `${dbUser.username} liked your post`,
        type: 'LIKE',
        locationId: postId,
        pageId: post.tribeId,
      },
    });
  }
  return {
    success: 'Like Added',
    postAuthorUsername: post?.author.username,
    postTribeId: post?.tribeId,
  };
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
  const comment = await getCommentById(commentId);
  if (!comment) {
    return { error: 'No such comment exists' };
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
  if (comment.authorId !== dbUser.id) {
    await db.notification.create({
      data: {
        userId: comment.authorId,
        message: `${dbUser.username} liked your comment`,
        type: 'LIKE',
        locationId: commentId,
        pageId: comment.post.tribeId,
      },
    });
  }
  const post = await getPostById(comment.postId);
  return {
    success: 'Comment Liked',
    postAuthorUsername: post?.author.username,
    postTribeId: post?.tribeId,
  };
};
