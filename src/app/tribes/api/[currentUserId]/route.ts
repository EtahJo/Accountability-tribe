import { NextRequest, NextResponse } from "next/server";
import { getAllTribes, getTribesWithSimilarTags } from "@/data/tribe";
import { getAllTribeNewPosts, getAllTribePosts } from "@/data/post";

export async function GET(req: NextRequest, context: any) {
	const { params } = context;
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const filterString = searchParams.get("filter");
	const pageInt = parseInt(pageString as string, 10);
	const pageLimit = 12;
	try {
		const tribes = filterString
			? await getTribesWithSimilarTags(
					filterString,
					pageLimit,
					pageInt,
					params.currentUserId,
				)
			: await getAllTribes(pageLimit, pageInt, params.currentUserId);
		const modifiedTribeData = [];
		for (const tribe of tribes.tribes) {
			const newPosts =
				tribe?.tribeVisit && tribe?.tribeVisit?.length === 1
					? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0].lastVisit)
					: await getAllTribePosts(tribe.id, params.currentUserId as string);
			modifiedTribeData.push({
				...tribe,
				newPosts,
			});
		}
		const returnValue = {
			tribes: modifiedTribeData,
			hasMore: tribes.hasMore,
			totalPages: tribes.totalPages,
		};
		return NextResponse.json(returnValue);
	} catch (error) {
		console.error("Error getting all tribes", error);
		NextResponse.error();
	}
}
