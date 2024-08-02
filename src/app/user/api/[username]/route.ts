import { getUserByUsername } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const user = await getUserByUsername(params.username);
		return NextResponse.json(user);
	} catch {}
}
