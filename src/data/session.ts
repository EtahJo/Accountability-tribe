import { db } from '@/lib/db';

export const getTotalNumberOfUserSessions = async (userId: string) => {
  const sessions = await db.sessionParticipant.findMany({
    where: { userId },
  });
  return sessions.length;
};

export const getAllUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
  // skipCount: number
) => {
  try {
    const totalItems = await getTotalNumberOfUserSessions(userId);
    const totalPages = Math.ceil(totalItems / pageLimit);
    const sessions: any = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          include: { session: true, user: true },
          take: pageLimit + 1,
          skip: pageLimit * (pageNumber - 1),
          orderBy: {
            session: {
              startDateTime: 'asc',
            },
          },
        },
      },
    });
    const hasMore = sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions.sessions.slice(0, pageLimit)
      : sessions.sessions;

    return { sessions: result, hasMore, totalPages };
  } catch {
    return null;
  }
};
export const getAllUsersInSession = async (sessionId: string) => {
  try {
    const users = await db.session.findUnique({
      where: { id: sessionId },
      include: { users: { include: { user: true } } },
    });
    return users?.users;
  } catch {
    return null;
  }
};

export const getSessionUserBySessionUserId = async (
  sessionId: string,
  userId: string
) => {
  try {
    const sessionUser = await db.sessionParticipant.findUnique({
      where: { userId_sessionId: { sessionId, userId } },
    });
    return sessionUser;
  } catch {
    return null;
  }
};

export const getSessionAdmin = async (sessionId: string) => {
  try {
    const session = await db.sessionParticipant.findFirst({
      where: {
        sessionId,
        userRole: 'ADMIN',
      },
      include: {
        user: true,
      },
    });
    return session?.user;
  } catch {
    return null;
  }
};

export const getSessionById = async (sessionId: string) => {
  try {
    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { users: true },
    });
    return session;
  } catch {
    return null;
  }
};

export const getSessionParticipantById = async (
  sessionParticipantId: string
) => {
  try {
    const sessionParticipant = await db.sessionParticipant.findUnique({
      where: { id: sessionParticipantId },
    });
    return sessionParticipant;
  } catch {}
};
