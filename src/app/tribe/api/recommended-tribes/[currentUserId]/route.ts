import { getActiveTribes, getRecommendedTribes } from "@/data/tribe";
import { NextResponse } from "next/server";

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
	return NextResponse.json(result);
}
