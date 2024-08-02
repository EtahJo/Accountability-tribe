import { getHiglightedUsers } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	try {
		const highlightedUsers = await getHiglightedUsers();
		return NextResponse.json(highlightedUsers);
	} catch {}
}
