import { db } from '@/lib/db';

export const getCommentById = async (commentId: string) => {
  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      include: {
        post: { include: { tribe: true } },
      },
    });
    return comment;
  } catch {}
};
