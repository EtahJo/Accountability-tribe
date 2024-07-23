import { getTribesWithSimilarTags, getAllTribes } from '@/data/tribe';
import { getAllTribeNewPosts, getAllTribePosts } from '@/data/post';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const searchParams = req.nextUrl.searchParams;
  const tagQuery = searchParams.get('tags');
  const userIdQuery = searchParams.get('userId');
  const tribesFilteredByTags = tagQuery
    ? await getTribesWithSimilarTags(
        tagQuery as string,
        userIdQuery as string,
        6,
        1
      )
    : await getAllTribes(userIdQuery as string, 6, 1);
  // const allTribes = await getAllTribes(userIdQuery as string, 6, 1);
  const returnValue = tribesFilteredByTags.tribes;
  const modifiedData = [];
  if (!returnValue) {
    return NextResponse.json({});
  }
  for (const tribe of returnValue) {
    const newPosts =
      tribe.tribeVisit.length === 1
        ? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0].lastVisit)
        : await getAllTribePosts(tribe.id, userIdQuery as string);
    modifiedData.push({
      ...tribe,
      newPosts,
    });
  }
  return NextResponse.json(modifiedData);
}
