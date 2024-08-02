import { getTribeById, getTribesWithSimilarTags } from "@/data/tribe";
import { getAllTribeNewPosts, getAllTribePosts } from "@/data/post";
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
		const modifiedData = [];
		for (const tribe of similarTribes.tribes) {
			const newPosts =
				tribe.tribeVisit.length === 1
					? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0].lastVisit)
					: await getAllTribePosts(tribe.id, params.currentUserId as string);
			modifiedData.push({
				...tribe,
				newPosts,
			});
		}
		return NextResponse.json(modifiedData);
	} catch (error) {
		console.error("Error getting similar tribes", error);
		return NextResponse.error();
	}
}
