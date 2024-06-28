import { getAllTribePosts } from '@/data/post';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const posts = await getAllTribePosts(params.tribeId);
    return NextResponse.json(posts);
  } catch {}
}
