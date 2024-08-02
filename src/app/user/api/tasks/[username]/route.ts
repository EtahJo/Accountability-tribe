import { getUserByUsername } from "@/data/user";
import { getAllUserTasks } from "@/data/task";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const user = await getUserByUsername(params.username);
		const userTasks = await getAllUserTasks(user?.id as string);
		return NextResponse.json(userTasks);
	} catch {}
}
