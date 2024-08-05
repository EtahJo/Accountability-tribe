import { getTribesWithSimilarTags, getAllTribes } from "@/data/tribe";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const searchParams = req.nextUrl.searchParams;
	const tagQuery = searchParams.get("tags");
	const userIdQuery = searchParams.get("userId");
	const tribesFilteredByTags = tagQuery
		? await getTribesWithSimilarTags(
				tagQuery as string,
				6,
				1,
				userIdQuery as string,
			)
		: await getAllTribes(6, 1, userIdQuery as string);
	const returnValue = tribesFilteredByTags.tribes;
	return NextResponse.json(returnValue);
}
