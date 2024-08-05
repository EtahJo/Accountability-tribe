import { NextRequest, NextResponse } from "next/server";
import { getAllTribes, getTribesWithSimilarTags } from "@/data/tribe";
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
		return NextResponse.json(tribes);
	} catch (error) {
		console.error("Error getting all tribes", error);
		NextResponse.error();
	}
}
