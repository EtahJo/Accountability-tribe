import { getUserCompletedTask } from "@/data/task";
import { getUserByUsername } from "@/data/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const { params } = context;
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const page = Number.parseInt(pageString as string, 10);
	const filterString = searchParams.get("filter");
	const perPage = 12;
	try {
		const user = await getUserByUsername(params.username);
		const userCompletedTasks = await getUserCompletedTask(
			user?.id as string,
			perPage,
			page,
		);

		return NextResponse.json(userCompletedTasks);
	} catch (error) {
		console.error("Error with getting users' completed tasks api", error);
		NextResponse.error();
	}
}
