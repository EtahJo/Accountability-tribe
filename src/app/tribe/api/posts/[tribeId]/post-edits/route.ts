import { getAllTribePostEdits } from '@/data/adminInfo';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    const postEdits = await getAllTribePostEdits(params.tribeId);
    return NextResponse.json(postEdits);
  } catch (error: any) {
    console.error('Error with tribe post edits api', error.message);
  }
}
