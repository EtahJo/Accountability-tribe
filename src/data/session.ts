import { db } from '@/lib/db';

export const getSessionById = async (id: string) => {
  try {
    const session = await db.session.findUnique({
      where: { id },
    });
    return session;
  } catch {
    return null;
  }
};

export const getAllUserSessions = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        sessions: true,
      },
    });
    console.log(getAllUserSessions);
  } catch {
    return null;
  }
};
