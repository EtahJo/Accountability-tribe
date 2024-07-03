import { db } from '@/lib/db';

export const getAllUserSessions = async (userId: string) => {
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: { sessions: { include: { session: true, user: true } } },
    });
    return sessions?.sessions;
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
