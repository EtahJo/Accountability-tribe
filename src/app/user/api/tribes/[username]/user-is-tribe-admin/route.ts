import { getAllTribesUserIsAdmin } from '@/data/tribe';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const searchParams = req.nextUrl.searchParams;
  const pageString = searchParams.get('page');
  const pageInt = parseInt(pageString as string, 10);
  const pageLimit = 12;
  try {
    const tribes = await getAllTribesUserIsAdmin(
      params.username,
      pageLimit,
      pageInt
    );
    return NextResponse.json(tribes);
  } catch (error: any) {
    console.error('Error with the tribe admin management api', error.message);
  }
}
