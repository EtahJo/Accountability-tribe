import { getAllTribesUserIsAdmin } from '@/data/tribe';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const tribes = await getAllTribesUserIsAdmin(params.username);
    return NextResponse.json(tribes);
  } catch (error: any) {
    console.error('Error with the tribe admin management api', error.message);
  }
}
