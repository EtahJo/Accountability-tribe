import { getTribesWithSimilarTags, getAllTribes } from '@/data/tribe';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('tags');
  const tribesFilteredByTags =
    query && (await getTribesWithSimilarTags(query as string));
  const allTribes = await getAllTribes();
  const ReturnValue = query ? tribesFilteredByTags : allTribes;
  return NextResponse.json(ReturnValue);
}
