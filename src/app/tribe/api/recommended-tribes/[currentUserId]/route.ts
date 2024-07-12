import { getActiveTribes, getRecommendedTribes } from '@/data/tribe';
import { getAllTribeNewPosts, getAllTribePosts } from '@/data/post';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  const activeTribes = await getActiveTribes(params.currentUserId);
  const recommendedTribes = await getRecommendedTribes(params.currentUserId);

  const result = recommendedTribes
    ? [...recommendedTribes, ...activeTribes]
    : [...activeTribes];
  if (!result) {
    return NextResponse.json([]);
  }
  const modifiedData = [];
  for (const tribe of result) {
    const newPosts =
      tribe.tribeVisit.length === 1
        ? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0]?.lastVisit)
        : await getAllTribePosts(tribe.id);
    modifiedData.push({
      ...tribe,
      newPosts,
    });
  }
  return NextResponse.json(modifiedData);
}
