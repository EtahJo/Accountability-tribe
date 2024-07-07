import { getUserByUsername } from '@/data/user';
import { NextResponse, type NextRequest } from 'next/server';
import {
  getAllUserSessions,
  getSessionAdmin,
  getSessionUserBySessionUserId,
  getAllOngoingUserSessions,
  getAllEndedUserSessions,
  getAllUserSessionsThisWeek,
  getAllUserSessionsToday,
  getAllUserSessionsTomorrow,
} from '@/data/session';

import { get_session_participants } from '@/action/get-session-participants';

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const searchParams = req.nextUrl.searchParams;
  const pageString = searchParams.get('page');
  const page = parseInt(pageString as string, 10);

  const filter = searchParams.get('filter');

  try {
    const dbUser = await getUserByUsername(params.username);
    const perPage = 12;
    let userSessions;
    userSessions =
      filter === 'ended'
        ? await getAllEndedUserSessions(dbUser?.id as string, perPage, page)
        : filter === 'ongoing'
        ? await getAllOngoingUserSessions(dbUser?.id as string, perPage, page)
        : filter === 'today'
        ? await getAllUserSessionsToday(dbUser?.id as string, perPage, page)
        : filter === 'thisWeek'
        ? await getAllUserSessionsThisWeek(dbUser?.id as string, perPage, page)
        : filter === 'tomorrow'
        ? await getAllUserSessionsTomorrow(dbUser?.id as string, perPage, page)
        : await getAllUserSessions(dbUser?.id as string, perPage, page);

    if (!userSessions) {
      return NextResponse.json({});
    }

    const sessions: {}[] = [];

    for (const session of userSessions?.sessions) {
      const sessionUser = await getSessionUserBySessionUserId(
        session.sessionId,
        params.currentUserId
      );
      const isMember = sessionUser ? true : false;
      const sessionAdmin = await getSessionAdmin(session.sessionId);
      const participants = await get_session_participants(session.sessionId);

      const sessionAndCheck = {
        sessionId: session.sessionId,
        sessionParticipantId: session.id,
        session: session.session,
        userRole: session.userRole,
        goal: session.goal,
        userId: session.userId,
        isMember,
        isUserAdmin: sessionAdmin?.id === params.currentUserId,
        participants,
        admin: sessionAdmin,
        user: session.user,
        tasks: session.tasks,
      };
      sessions.push(sessionAndCheck);
    }
    const returnValue = pageString
      ? {
          sessions,
          hasMore: userSessions.hasMore,
          totalPages: userSessions.totalPages,
        }
      : sessions;
    return NextResponse.json(returnValue);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
