import { getAllTribesUserIsAdmin } from "@/data/tribe";
import { getUserByUsername } from "@/data/user";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const { params } = context;
	const user = await getUserByUsername(params.username)
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const pageInt = parseInt(pageString as string, 10);
	const pageLimit = 12;
	try {
		const tribes = await getAllTribesUserIsAdmin(
			user?.id as string,
			pageLimit,
			pageInt,
		);
		return NextResponse.json(tribes);
	} catch (error: any) {
		console.error("Error with the tribe admin management api", error.message);
	}
}
