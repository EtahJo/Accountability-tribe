import { db } from '@/lib/db';

export const getUserPostLike = async (postId: string, userId: string) => {
  try {
    const like = await db.like.findFirst({
      where: { userId, postId },
    });
    return like;
  } catch (error: any) {
    console.error('Error getting user post like', error.message);
  }
};

export const getUserCommentLike = async (commentId: string, userId: string) => {
  try {
    const like = await db.like.findFirst({
      where: {
        commentId,
        userId,
      },
    });
    return like;
  } catch (error: any) {
    console.error('Error with getting user comment like', error.message);
  }
};
