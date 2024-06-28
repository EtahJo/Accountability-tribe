import { db } from '@/lib/db';

export const getAllTribePosts = async (tribeId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { tribeId, approved: true },
      include: {
        author: true,
        comments: { include: { author: true } },
        likes: { include: { user: true } },
        tribe: { include: { users: true } },
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
