import { db } from '@/lib/db';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import { currentUser } from '@/lib/authentication';

export const getTribeUserByTribeUserId = async (
  tribeId: string,
  userId: string
) => {
  try {
    const tribeUser = await db.tribeUser.findUnique({
      where: { userId_tribeId: { tribeId: tribeId, userId: userId } },
    });
    return tribeUser;
  } catch (error) {
    return null;
  }
};

export const getAllUserTribes = async (userId: string) => {
  try {
    const user = await currentUser();
    const tribes = await db.user.findUnique({
      where: { id: userId },
      include: {
        tribes: {
          include: {
            tribe: {
              include: {
                tribeVisit: {
                  where: { userId: user?.id as string },
                  // include: { user: true },
                },
              },
            },
          },
        },
      },
    });

    return tribes?.tribes;
  } catch {
    return null;
  }
};
export const getAllUserTribesByUsername = async (
  username: string,
  currentUserId: string
) => {
  try {
    const tribes = await db.user.findUnique({
      where: { username },
      include: {
        tribes: {
          include: {
            tribe: {
              include: {
                tribeVisit: {
                  where: { userId: currentUserId },
                },
              },
            },
          },
        },
      },
    });
    return tribes?.tribes;
  } catch {
    return null;
  }
};

export const getAllUsersInTribe = async (tribeId: string) => {
  try {
    const users = await db.tribe.findUnique({
      where: { id: tribeId },
      include: { users: { include: { user: true } } },
    });
    return users?.users;
  } catch {
    return null;
  }
};

export const getTribeById = async (tribeId: string, currentUserId: string) => {
  try {
    const tribes = await db.tribe.findUnique({
      where: { id: tribeId },
      include: {
        users: { include: { user: true } },
        tribeVisit: {
          where: {
            userId: currentUserId,
          },
        },
      },
    });
    return tribes;
  } catch {
    return null;
  }
};

export const getTribeAdmin = async (tribeId: string) => {
  try {
    const tribe = await db.tribeUser.findFirst({
      where: {
        tribeId,
        userRole: 'ADMIN',
      },
      include: {
        user: true,
      },
    });
    return tribe?.user;
  } catch {
    return null;
  }
};
export const getSpecificTribeAdmin = async (
  tribeId: string,
  userId: string
) => {
  try {
    const specificAdmin = await db.tribeUser.findFirst({
      where: { userId, tribeId, userRole: 'ADMIN' },
    });
    return specificAdmin;
  } catch (error: any) {
    console.error('Error while fetching specific admin', error.message);
  }
};
export const getAllTribeAdmins = async (tribeId: string) => {
  try {
    const allTribeAdmins = await db.tribeUser.findMany({
      where: { tribeId, userRole: 'ADMIN' },
    });
    return allTribeAdmins;
  } catch (error: any) {
    console.error('Error while getting all tribe admins', error.message);
  }
};
export const getTribesWithSimilarTags = async (
  tags: string,
  currentUserId: string
) => {
  try {
    const tagsArray = tags.split(',');
    const tribes = await db.tribe.findMany({
      where: {
        tags: {
          hasSome: tagsArray,
        },
      },
      include: {
        users: { include: { user: true } },
        tribeVisit: {
          where: {
            userId: currentUserId,
          },
        },
      },
    });
    return tribes;
  } catch (error) {
    throw error;
  }
};
export const getAllTribes = async (currentUserId: string) => {
  try {
    const tribes = await db.tribe.findMany({
      include: {
        users: {
          include: { user: true },
        },
        tribeVisit: {
          where: {
            userId: currentUserId,
          },
        },
      },
    });
    return tribes;
  } catch {
    throw new Error();
  }
};

export const getActiveTribes = async (currentUserId: string) => {
  try {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const lastWeeekStart = subWeeks(weekStart, 1);
    const weekEnd = endOfWeek(now);
    const lastWeeKEnd = subWeeks(weekEnd, 1);
    const tribes = await db.tribe.findMany({
      where: {
        posts: {
          some: {
            createdAt: {
              gte: lastWeeekStart,
              lt: lastWeeKEnd,
            },
          },
        },
      },
      include: {
        posts: true,
        users: true,
        tribeVisit: {
          where: {
            userId: currentUserId,
          },
          include: {
            user: true,
          },
        },
      },
    });
    const activeTribes = tribes.filter((tribe) => tribe.posts.length >= 3);
    return activeTribes;
  } catch {
    throw new Error();
  }
};

export const getRecommendedTribes = async (currentUserId: string) => {
  try {
    const recommendedTribes = await db.tribe.findMany({
      where: {
        recommended: true,
      },
      include: {
        users: true,
        tribeVisit: {
          where: {
            userId: currentUserId,
          },
          include: {
            user: true,
          },
        },
      },
    });
    return recommendedTribes;
  } catch {
    return null;
  }
};

export const totalTribePostUnApproved = async (tribeId: string) => {
  try {
    const totalUnapprovedPosts = await db.post.count({
      where: {
        tribeId,
        approved: false,
      },
    });
    return totalUnapprovedPosts;
  } catch (error: any) {
    console.error('Issue with counting unapproved tribe posts', error.message);
  }
};

export const getAllTribesUserIsAdmin = async (username: string) => {
  try {
    const tribes = await db.tribe.findMany({
      where: {
        adminsUsername: {
          has: username,
        },
      },
      include: {
        users: true,
        tribeVisit: true,
      },
    });
    return tribes;
  } catch (error: any) {
    console.error('Error getting all tribes user is admin ', error.message);
  }
};
