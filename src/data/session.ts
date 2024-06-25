import { db } from '@/lib/db';

export const getSessionById = async (id: string) => {
  try {
    const session = await db.session.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });
    return session;
  } catch {
    return null;
  }
};

// export const getAllUserSessions = async (email: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: { email },
//       include: {
//         sessions: true,
//       },
//     });
//   } catch {
//     return null;
//   }
// };

export const getAllUserSessions = async (username: string) => {
  try {
    const userSessions = await db.session.findMany({
      where: {
        participants: {
          every: { name: username },
        },
      },
      include: {
        participants: true,
      },
    });
    return userSessions;
  } catch {
    return null;
  }
};
