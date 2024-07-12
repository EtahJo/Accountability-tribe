import { db } from '@/lib/db';

export const getAllTribePosts = async (
  tribeId: string,
  currentUserId: string
) => {
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
        tribe: {
          include: {
            users: true,
            tribeVisit: { where: { userId: currentUserId } },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
};
export const getAllUserPosts = async (
  authorId: string,
  currentUserId: string
) => {
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
        tribe: {
          include: {
            users: true,
            tribeVisit: {
              where: { userId: currentUserId },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return newPosts;
  } catch (error) {
    throw error;
  }
};
