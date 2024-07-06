import {
  getAllOngoingUserSessions,
  getSessionAdmin,
  getSessionUserBySessionUserId,
} from '@/data/session';
import { NextResponse, type NextRequest } from 'next/server';
import { getUserByUsername } from '@/data/user';

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const searchParams = req.nextUrl.searchParams;
  const pageString = searchParams.get('page');
  const page = parseInt(pageString as string, 10);

  const filter = searchParams.get('filter');
  try {
    const dbUser = await getUserByUsername(params.username);
  } catch {}
}
