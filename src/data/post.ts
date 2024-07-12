import { db } from '@/lib/db';

export const getAllTribePosts = async (tribeId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { tribeId, approved: true },
      include: {
        author: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: true,
            likes: { include: { user: true } },
            replies: {
              include: {
                author: true,
                likes: { include: { user: true } },
                replies: {
                  include: { author: true, likes: { include: { user: true } } },
                },
              },
            },
          },
        },
        likes: { include: { user: true } },
        tribe: { include: { users: true } },
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
export const getAllUserPosts = async (authorId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { authorId, approved: true },
      include: {
        author: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: true,
            likes: { include: { user: true } },
            replies: {
              include: {
                author: true,
                likes: { include: { user: true } },
                replies: {
                  include: { author: true, likes: { include: { user: true } } },
                },
              },
            },
          },
        },
        likes: { include: { user: true } },
        tribe: { include: { users: true } },
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
export const getPostById = async (postId: string) => {
  try {
    const post = db.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });
    return post;
  } catch (error) {
    throw error;
  }
};

export const getAllTribeNewPosts = async (
  tribeId: string,
  userlastVisit: Date
) => {
  try {
    const newPosts = await db.post.findMany({
      where: {
        tribeId,
        approved: true,
        createdAt: {
          gt: userlastVisit,
        },
      },
    });
    return newPosts;
  } catch (error) {
    throw error;
  }
};
