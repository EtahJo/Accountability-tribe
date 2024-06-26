'use server';
import {
  getAllUserSessions,
  getSessionUserBySessionUserId,
  getSessionAdmin,
} from '@/data/session';

import { currentUser } from '@/lib/authentication';
import { is_member } from '@/action/join-session';
import { get_session_participants } from '@/action/get-session-participants';

export const get_all_user_sessions = async (userId: string) => {
  const sessions = await getAllUserSessions(userId);
  if (!sessions) {
    return null;
  }
  //   console.log('Action sessions', sessions);
  const user = await currentUser();
  const modifiedSessions: {}[] = [];
  for (const session of sessions) {
    const isCurrentUserMember = await is_member(
      session.sessionId,
      user?.id as string
    );
    const sessionAdmin = await getSessionAdmin(session.sessionId);
    const participants = await get_session_participants(session.sessionId);

    const sessionAndCheck = {
      session: session.session,
      userRole: session.userRole,
      userGoal: session.goal,
      userId: session.userId,
      isMember: isCurrentUserMember.isMember,
      isUserAdmin: session.userRole === 'ADMIN' && session.userId === user?.id,
      participants,
      admin: sessionAdmin,
    };
    modifiedSessions.push(sessionAndCheck);
  }

  return { sessions: modifiedSessions };
};
