import { getAllUserTribesByUsername } from '@/data/tribe';
import { getAllTribeNewPosts, getAllTribePosts } from '@/data/post';
import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/authentication';
import { useCurrentUser } from '@/hooks/use-current-user';
export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    // const user = useCurrentUser();
    const tribes = await getAllUserTribesByUsername(
      params.username,
      params.currentUserId
    );
    const modifiedData = [];
    if (!tribes) {
      return NextResponse.json([]);
    }
    for (const tribe of tribes) {
      const newPosts =
        tribe.tribe?.tribeVisit.length === 1
          ? await getAllTribeNewPosts(
              tribe.tribeId,
              tribe.tribe?.tribeVisit[0]?.lastVisit
            )
          : await getAllTribePosts(tribe.tribeId, params.currentUserId);
      modifiedData.push({
        ...tribe,
        newPosts,
      });
    }

    return NextResponse.json(modifiedData);
  } catch (error) {
    console.error('Tribes Error is>>', error);
  }
}
