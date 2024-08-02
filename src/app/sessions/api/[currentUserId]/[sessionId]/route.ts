import { getSessionUserBySessionUserId } from "@/data/session";

import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const session = await getSessionUserBySessionUserId(
			params.sessionId,
			params.currentUserId,
		);
		return NextResponse.json(session);
	} catch (error) {
		console.error("Error getting session by id >>", error);
		NextResponse.error();
	}
}
