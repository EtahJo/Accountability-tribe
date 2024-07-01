import { getUserByUsername } from '@/data/user';
import { NextResponse } from 'next/server';
import {
  getAllUserSessions,
  getSessionAdmin,
  getSessionUserBySessionUserId,
} from '@/data/session';

import { get_session_participants } from '@/action/get-session-participants';

export async function GET(req: Request, context: any) {
  const { params } = context;

  try {
    const dbUser = await getUserByUsername(params.username);
    const userSessions = await getAllUserSessions(dbUser?.id as string);
    if (!userSessions) {
      return NextResponse.json({});
    }

    const sessions: {}[] = [];
    for (const session of userSessions) {
      const sessionUser = await getSessionUserBySessionUserId(
        session.sessionId,
        params.currentUserId
      );
      const isMember = sessionUser ? true : false;
      const sessionAdmin = await getSessionAdmin(session.sessionId);
      const participants = await get_session_participants(session.sessionId);

      const sessionAndCheck = {
        sessionId: session.sessionId,
        session: session.session,
        userRole: session.userRole,
        goal: session.goal,
        userId: session.userId,
        isMember,
        isUserAdmin: sessionAdmin?.id === params.currentUserId,
        participants,
        admin: sessionAdmin,
        user: session.user,
      };
      sessions.push(sessionAndCheck);
    }
    return NextResponse.json(sessions);
  } catch (error) {
    return null;
  }
}
