import { getUserByUsername } from "@/data/user";
import { getUserUnCompletedTask } from "@/data/task";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const { params } = context;
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const page = parseInt(pageString as string, 10);
	const perPage = 12;
	try {
		const user = await getUserByUsername(params.username);
		const userUncompletedTasks = await getUserUnCompletedTask(
			user?.id as string,
			perPage,
			page,
		);
		return NextResponse.json(userUncompletedTasks);
	} catch (error) {
		console.error("Error getting all user's uncompleted tasks >>", error);
		NextResponse.error();
	}
}
