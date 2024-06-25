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
