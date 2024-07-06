import { db } from '@/lib/db';
import { date } from 'zod';
import {
  startOfWeek,
  endOfWeek,
  endOfTomorrow,
  startOfTomorrow,
} from 'date-fns';

export const getAllUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
  // skipCount: number
) => {
  try {
    const sessions: any = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
          take: pageLimit + 1,
          skip: pageLimit * (pageNumber - 1),
          orderBy: {
            session: {
              startDateTime: 'desc',
            },
          },
        },
      },
    });
    const hasMore = sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions.sessions.slice(0, pageLimit)
      : sessions.sessions;

    return { sessions: result, hasMore };
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

export const getAllOngoingUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: {
            session: {
              endDateTime: {
                gt: new Date(),
              },
              startDateTime: {
                lte: new Date(),
              },
            },
          },
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
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
    const hasMore = sessions && sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions?.sessions.slice(0, pageLimit)
      : sessions?.sessions;
    return { sessions: result, hasMore };
  } catch {
    return null;
  }
};
export const getAllEndedUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: {
            session: {
              endDateTime: {
                lt: new Date(),
              },
            },
          },
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
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
    const hasMore = sessions && sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions?.sessions.slice(0, pageLimit)
      : sessions?.sessions;
    return { sessions: result, hasMore };
  } catch {
    return null;
  }
};

export const getAllUserSessionsToday = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: {
            session: {
              startDateTime: {
                gte: startOfToday,
                lt: endOfToday,
              },
            },
          },
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
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
    const hasMore = sessions && sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions?.sessions.slice(0, pageLimit)
      : sessions?.sessions;
    return { sessions: result, hasMore };
  } catch {
    return null;
  }
};
export const getAllUserSessionsThisWeek = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: {
            session: {
              startDateTime: {
                gte: startOfThisWeek,
                lt: endOfThisWeek,
              },
            },
          },
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
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
    const hasMore = sessions && sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions?.sessions.slice(0, pageLimit)
      : sessions?.sessions;
    return { sessions: result, hasMore };
  } catch {
    return null;
  }
};
export const getAllUserSessionsTomorrow = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  const startTomorrow = startOfTomorrow();
  const endTomorrow = endOfTomorrow();
  try {
    const sessions = await db.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: {
            session: {
              startDateTime: {
                gte: startTomorrow,
                lt: endTomorrow,
              },
            },
          },
          include: {
            session: true,
            user: { include: { tasks: true } },
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: { include: { session: true } },
                      },
                    },
                  },
                },
              },
            },
          },
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
    const hasMore = sessions && sessions?.sessions.length > pageLimit;
    const result = hasMore
      ? sessions?.sessions.slice(0, pageLimit)
      : sessions?.sessions;
    return { sessions: result, hasMore };
  } catch {
    return null;
  }
};
export const getSessionTaskByTaskIdSessionId = async (
  taskId: string,
  sessionParticipantId: string
) => {
  try {
    const sessionTask = await db.sessionTask.findUnique({
      where: { sessionParticipantId_taskId: { sessionParticipantId, taskId } },
    });
    return sessionTask;
  } catch {
    return null;
  }
};
