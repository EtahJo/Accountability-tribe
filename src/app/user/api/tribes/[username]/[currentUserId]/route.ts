import {
	getAllUserTribesByUsername,
	getTribesWithSimilarTags,
} from "@/data/tribe";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const filterString = searchParams.get("filter");
	const pageInt = parseInt(pageString as string, 10);
	const pageLimit = 12;
	const { params } = context;
	try {
		const tribes = filterString
			? await getTribesWithSimilarTags(
					filterString,
					pageLimit,
					pageInt,
					params.currentUserId,
				)
			: await getAllUserTribesByUsername(
					params.username,
					params.currentUserId,
					pageLimit,
					pageInt,
				);
		if (!tribes) {
			return NextResponse.json([]);
		}

		return NextResponse.json(tribes);
	} catch (error) {
		console.error("Tribes Error is>>", error);
	}
}
