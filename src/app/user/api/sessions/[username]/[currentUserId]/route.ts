import { getUserByUsername } from '@/data/user';
import { NextResponse, type NextRequest } from 'next/server';
import {
  getAllUserSessions,
  getSessionAdmin,
  getSessionUserBySessionUserId,
} from '@/data/session';

import { get_session_participants } from '@/action/get-session-participants';

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const searchParams = req.nextUrl.searchParams;
  const pageString = searchParams.get('page');
  const page = parseInt(pageString as string, 10);

  try {
    const dbUser = await getUserByUsername(params.username);
    const perPage = 12;

    const userSessions = await getAllUserSessions(
      dbUser?.id as string,
      perPage,
      page
    );
    if (!userSessions) {
      return NextResponse.json({});
    }
    // console.log('userSession', userSessions);

    const sessions: {}[] = [];
    for (const session of userSessions.sessions) {
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
