import { getUserByUsername } from '@/data/user';
import { getUserUnCompletedTask } from '@/data/task';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const user = await getUserByUsername(params.username);
    const userUncompletedTasks = await getUserUnCompletedTask(
      user?.id as string
    );
    return NextResponse.json(userUncompletedTasks);
  } catch {}
}
