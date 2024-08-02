import { getUserClosestSession } from "@/data/session";
import { getUserByUsername } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	const user = await getUserByUsername(params.username);
	const closestSession = await getUserClosestSession(user?.id as string);
	return NextResponse.json(closestSession);
}
