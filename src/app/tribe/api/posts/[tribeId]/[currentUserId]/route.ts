import { getAllTribePosts, getAllTribeNewPosts } from "@/data/post";
import { getTribeById } from "@/data/tribe";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const posts = await getAllTribePosts(params.tribeId, params.currentUserId);
		const tribe = await getTribeById(params.tribeId, params.currentUserId);
		const newPosts =
			tribe?.tribeVisit.length == 1 &&
			(await getAllTribeNewPosts(
				params.tribeId,
				tribe?.tribeVisit[0].lastVisit,
			));
		const returnValue = { posts, newPosts };
		return NextResponse.json(returnValue);
	} catch (error) {
		console.error("Error with tribe posts >>", error);
	}
}
