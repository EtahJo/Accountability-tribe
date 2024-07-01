import { getAllUserTribesByUsername } from '@/data/tribe';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const tribes = await getAllUserTribesByUsername(params.username);
    return NextResponse.json(tribes);
  } catch {}
}
