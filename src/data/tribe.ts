import { db } from '@/lib/db';

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
    const tribes = await db.user.findUnique({
      where: { id: userId },
      include: { tribes: { include: { tribe: true } } },
    });
    return tribes?.tribes;
  } catch {
    return null;
  }
};
export const getAllUserTribesByUsername = async (username: string) => {
  try {
    const tribes = await db.user.findUnique({
      where: { username },
      include: { tribes: { include: { tribe: true } } },
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

export const getTribeById = async (tribeId: string) => {
  try {
    const tribes = await db.tribe.findUnique({
      where: { id: tribeId },
      include: {
        users: { include: { user: true } },
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

export const getTribesWithSimilarTags = async (tags: string) => {
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
      },
    });
    return tribes;
  } catch (error) {
    throw error;
  }
};
export const getAllTribes = async () => {
  try {
    const tribes = await db.tribe.findMany();
    return tribes;
  } catch (error) {
    throw error;
  }
};
