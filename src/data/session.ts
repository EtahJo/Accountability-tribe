import { db } from '@/lib/db';
import {
  startOfWeek,
  endOfWeek,
  endOfTomorrow,
  startOfTomorrow,
} from 'date-fns';
import { Status } from '@prisma/client';

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
) => {
  try {
    const totalItems = await getTotalNumberOfUserSessions(userId);
    const totalPages = Math.ceil(totalItems / pageLimit);

    const sessions = await db.sessionParticipant.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            users: true,
          },
        },
        user: {
          include: {
            tasks: { where: { status: { not: Status.COMPLETE } } },
          },
        },
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
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;

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
      include: {
        session: true,
        tasks: {
          include: {
            task: {
              include: {
                sessionParticipants: {
                  include: {
                    sessionParticipant: {
                      include: { session: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
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
      include: {
        users: {
          include: {
            tasks: {
              include: {
                task: true,
              },
            },
          },
        },
      },
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

const getOngoingUserSessionsTotal = async (userId: string) => {
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
      },
    },
  });
  return sessions?.sessions.length;
};
export const getAllOngoingUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await getOngoingUserSessionsTotal(userId);
    const totalPages = totalItems && Math.ceil(totalItems / pageLimit);
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
            user: {
              include: {
                tasks: { where: { status: { not: Status.COMPLETE } } },
              },
            },
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
    return { sessions: result, hasMore, totalPages };
  } catch {
    return null;
  }
};
const getEndedUserSessionsTotal = async (userId: string) => {
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
      },
    },
  });
  return sessions?.sessions.length;
};
export const getAllEndedUserSessions = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await getEndedUserSessionsTotal(userId);
    const totalPages = totalItems && Math.ceil(totalItems / pageLimit);
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
            user: {
              include: {
                tasks: { where: { status: { not: Status.COMPLETE } } },
              },
            },
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
    return { sessions: result, hasMore, totalPages };
  } catch {
    return null;
  }
};
const getUserTodaySessionsTotal = async (userId: string) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
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
      },
    },
  });
  return sessions?.sessions.length;
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
    const totalItems = await getUserTodaySessionsTotal(userId);
    const totalPages = totalItems && Math.ceil(totalItems / pageLimit);
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
            user: {
              include: {
                tasks: { where: { status: { not: Status.COMPLETE } } },
              },
            },
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
    return { sessions: result, hasMore, totalPages };
  } catch {
    return null;
  }
};

const getUserThisWeekSessionsTotal = async (userId: string) => {
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
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
      },
    },
  });
  return sessions?.sessions.length;
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
    const totalItems = await getUserThisWeekSessionsTotal(userId);
    const totalPages = totalItems && Math.ceil(totalItems / pageLimit);
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
            user: {
              include: {
                tasks: { where: { status: { not: Status.COMPLETE } } },
              },
            },
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
    return { sessions: result, hasMore, totalPages };
  } catch {
    return null;
  }
};
const getAllUserTomorrowSessionsTotal = async (userId: string) => {
  const startTomorrow = startOfTomorrow();
  const endTomorrow = endOfTomorrow();
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
      },
    },
  });
  return sessions?.sessions.length;
};
export const getAllUserSessionsTomorrow = async (
  userId: string,
  pageLimit: number,
  pageNumber: number
) => {
  const startTomorrow = startOfTomorrow();
  const endTomorrow = endOfTomorrow();
  try {
    const totalItems = await getAllUserTomorrowSessionsTotal(userId);
    const totalPages = totalItems && Math.ceil(totalItems / pageLimit);
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
            user: {
              include: {
                tasks: { where: { status: { not: Status.COMPLETE } } },
              },
            },
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
    return { sessions: result, hasMore, totalPages };
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

export const getUserClosestSession = async (userId: string) => {
  try {
    const session = await db.sessionParticipant.findFirst({
      where: {
        userId,
        session: {
          startDateTime: {
            gte: new Date(),
          },
        },
      },
      include: {
        session: {
          include: {
            users: true,
          },
        },
        user: {
          include: {
            tasks: { where: { status: { not: Status.COMPLETE } } },
          },
        },
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
      orderBy: {
        session: {
          startDateTime: 'asc',
        },
      },
    });

    return session;
  } catch {
    return null;
  }
};

export const getSessionUsers = async (sessionId: string) => {
  try {
    const sessionUsers = await db.sessionParticipant.findMany({
      where: { sessionId },
    });
    return sessionUsers;
  } catch (error: any) {
    console.error('Error getting session users', error.message);
  }
};

export const totalAllSessions = async () => {
  try {
    const total = await db.session.count({});
    return total;
  } catch (error: any) {
    console.error('Error getting all sessions total', error.message);
  }
};

export const getAllSessions = async (pageLimit: number, pageNumber: number) => {
  try {
    const totalItems = await totalAllSessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);
    const sessions = await db.session.findMany({
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all sessions', error.message);
  }
};

export const totalTomorrowSessions = async () => {
  try {
    const startTomorrow = startOfTomorrow();
    const endTomorrow = endOfTomorrow();
    const total = await db.session.count({
      where: {
        startDateTime: {
          gte: startTomorrow,
          lt: endTomorrow,
        },
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions total', error.message);
  }
};

export const getAllTomorrowSessions = async (
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await totalTomorrowSessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);
    const startTomorrow = startOfTomorrow();
    const endTomorrow = endOfTomorrow();
    const sessions = await db.session.findMany({
      where: {
        startDateTime: {
          gte: startTomorrow,
          lt: endTomorrow,
        },
      },
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions', error.message);
  }
};

export const totalThisWeekSessions = async () => {
  const now = new Date();

  try {
    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
    const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
    const total = await db.session.count({
      where: {
        startDateTime: {
          gte: startOfThisWeek,
          lt: endOfThisWeek,
        },
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting all this week sessions total', error.message);
  }
};

export const getAllThisWeekSessions = async (
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await totalThisWeekSessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);
    const now = new Date();
    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start of the week (Monday)
    const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // End of the week (Sunday)
    const sessions = await db.session.findMany({
      where: {
        startDateTime: {
          gte: startOfThisWeek,
          lt: endOfThisWeek,
        },
      },
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions', error.message);
  }
};

export const totalTodaySessions = async () => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const total = await db.session.count({
      where: {
        startDateTime: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting all this week sessions total', error.message);
  }
};

export const getAllTodaySessions = async (
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await totalTodaySessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const sessions = await db.session.findMany({
      where: {
        startDateTime: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions', error.message);
  }
};

export const totalOngoingSessions = async () => {
  try {
    const total = await db.session.count({
      where: {
        startDateTime: {
          lte: new Date(),
        },
        endDateTime: {
          gt: new Date(),
        },
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting all this week sessions total', error.message);
  }
};

export const getAllOngoingSessions = async (
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await totalOngoingSessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);

    const sessions = await db.session.findMany({
      where: {
        startDateTime: {
          lte: new Date(),
        },
        endDateTime: {
          gt: new Date(),
        },
      },
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions', error.message);
  }
};

export const totalEndedSessions = async () => {
  try {
    const total = await db.session.count({
      where: {
        endDateTime: {
          lt: new Date(),
        },
      },
    });
    return total;
  } catch (error: any) {
    console.error('Error getting all this week sessions total', error.message);
  }
};

export const getAllEndedSessions = async (
  pageLimit: number,
  pageNumber: number
) => {
  try {
    const totalItems = await totalEndedSessions();
    const totalPages = Math.ceil((totalItems as number) / pageLimit);

    const sessions = await db.session.findMany({
      where: {
        endDateTime: {
          lt: new Date(),
        },
      },
      include: {
        users: {
          include: {
            user: true,
            tasks: {
              include: {
                task: {
                  include: {
                    sessionParticipants: {
                      include: {
                        sessionParticipant: {
                          include: {
                            session: true,
                          },
                        },
                      },
                    },
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
        startDateTime: 'desc',
      },
    });
    const hasMore = sessions?.length > pageLimit;
    const result = hasMore ? sessions.slice(0, pageLimit) : sessions;
    return { sessions: result, hasMore, totalPages };
  } catch (error: any) {
    console.error('Error getting all tomorrow sessions', error.message);
  }
};
