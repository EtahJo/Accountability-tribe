import { getAllUserTribesByUsername } from '@/data/tribe';
import { getAllTribeNewPosts, getAllTribePosts } from '@/data/post';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const searchParams = req.nextUrl.searchParams;
  const pageString = searchParams.get('page');
  const pageInt = parseInt(pageString as string, 10);
  const pageLimit = 12;
  const { params } = context;
  try {
    const tribes = await getAllUserTribesByUsername(
      params.username,
      params.currentUserId,
      pageLimit,
      pageInt
    );
    const modifiedData = [];
    if (!tribes) {
      return NextResponse.json([]);
    }
    for (const tribe of tribes.tribes) {
      const newPosts =
        tribe.tribeVisit.length === 1
          ? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0]?.lastVisit)
          : await getAllTribePosts(tribe.id, params.currentUserId);
      modifiedData.push({
        ...tribe,
        newPosts,
      });
    }
    const returnValue = {
      tribes: modifiedData,
      hasMore: tribes.hasMore,
      totalPages: tribes.totalPages,
    };

    return NextResponse.json(returnValue);
  } catch (error) {
    console.error('Tribes Error is>>', error);
  }
}
