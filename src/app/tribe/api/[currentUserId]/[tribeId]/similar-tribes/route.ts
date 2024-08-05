import { getTribeById, getTribesWithSimilarTags } from "@/data/tribe";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const tribe = await getTribeById(params.tribeId, params.currentUserId);
		const tags = tribe?.tags.join(",");
		const similarTribes = await getTribesWithSimilarTags(
			tags as string,
			6,
			1,
			params.currentUserId,
		);
		return NextResponse.json(similarTribes);
	} catch (error) {
		console.error("Error getting similar tribes", error);
		return NextResponse.error();
	}
}
