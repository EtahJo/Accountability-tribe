import { getActiveTribes, getRecommendedTribes } from '@/data/tribe';
import { NextResponse } from 'next/server';

export async function GET() {
  const activeTribes = await getActiveTribes();
  const recommendedTribes = await getRecommendedTribes();

  const result = recommendedTribes
    ? [...recommendedTribes, ...activeTribes]
    : [...activeTribes];

  return NextResponse.json(result);
}
