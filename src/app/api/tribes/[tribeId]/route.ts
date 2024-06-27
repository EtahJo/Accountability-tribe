import { getTribeById } from '@/data/tribe';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const tribe = await getTribeById(params.tribeId);
    return NextResponse.json(tribe);
  } catch {
    // NextResponse.status(500).json({ error: 'Internal Server Error' });
  }
}
