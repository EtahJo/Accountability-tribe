import { getHighPriorityTasks } from "@/data/task";
import { getUserByUsername } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const user = await getUserByUsername(params.username);
		const highPriorityTasks = await getHighPriorityTasks(user?.id as string);
		return NextResponse.json(highPriorityTasks);
	} catch {}
}
