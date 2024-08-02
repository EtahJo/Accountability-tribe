import { getAllAdminNeededTribeInfo } from "@/data/adminInfo";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const tribeDetails = await getAllAdminNeededTribeInfo(params.tribeId);
		return NextResponse.json(tribeDetails);
	} catch (error: any) {
		console.error("Error with the tribe admin details api", error.message);
	}
}
