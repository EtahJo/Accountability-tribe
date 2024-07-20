import { db } from '@/lib/db';

export const totalTribePosts = async (tribeId: string) => {
  try {
    const total = await db.post.count({
      where: {
        tribeId,
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting tribe post total', error.message);
  }
};

export const getAllAdminNeededTribeInfo = async (tribeId: string) => {
  try {
    const tribeTotalPosts = await totalTribePosts(tribeId);
    const tribeInfo = await db.tribe.findUnique({
      where: {
        id: tribeId,
      },
      include: {
        users: { include: { user: true } },
        posts: {
          where: {
            approved: false,
          },
          include: {
            author: true,
            comments: {
              include: {
                author: true,
                likes: { include: { user: true } },
                replies: {
                  include: {
                    author: true,
                    likes: { include: { user: true } },
                    replies: {
                      include: {
                        author: true,
                        likes: { include: { user: true } },
                      },
                    },
                  },
                },
              },

              orderBy: {
                createdAt: 'desc',
              },
            },
            likes: {
              include: { user: true },
            },
          },
        },
      },
    });
    return { tribeInfo, tribeTotalPosts };
  } catch (error: any) {
    console.error('Error getting admin needed tribe info', error.message);
  }
};

export const getAllTribePostEdits = async (tribeId: string) => {
  try {
    const postEdits = await db.postEdit.findMany({
      where: {
        post: {
          tribeId,
        },
        approved: false,
      },
      include: {
        post: {
          include: {
            author: true,
            tribe: true,
            comments: {
              include: {
                author: true,
                likes: { include: { user: true } },
                replies: {
                  include: {
                    author: true,
                    likes: { include: { user: true } },
                    replies: {
                      include: {
                        author: true,
                        likes: { include: { user: true } },
                      },
                    },
                  },
                },
              },

              orderBy: {
                createdAt: 'desc',
              },
            },
            likes: {
              include: { user: true },
            },
          },
        },
      },
    });
    return postEdits;
  } catch (error: any) {
    console.error('Error get tribe edits', error.message);
  }
};
