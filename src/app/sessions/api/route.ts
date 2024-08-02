import {
	getAllSessions,
	getAllTomorrowSessions,
	getAllThisWeekSessions,
	getAllTodaySessions,
	getAllOngoingSessions,
	getAllEndedSessions,
} from "@/data/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const filterString = searchParams.get("filter");
	const pageInt = parseInt(pageString as string, 10);
	const pageLimit = 12;
	try {
		let sessions;
		switch (filterString) {
			case "tomorrow":
				sessions = await getAllTomorrowSessions(pageLimit, pageInt);
				break;
			case "ended":
				sessions = await getAllEndedSessions(pageLimit, pageInt);
				break;
			case "ongoing":
				sessions = await getAllOngoingSessions(pageLimit, pageInt);
				break;
			case "today":
				sessions = await getAllTodaySessions(pageLimit, pageInt);
				break;
			case "thisweek":
				sessions = await getAllThisWeekSessions(pageLimit, pageInt);
				break;
			default:
				sessions = await getAllSessions(pageLimit, pageInt);
		}

		return NextResponse.json(sessions);
	} catch (error) {
		console.error("Error getting all sessions >>", error);
		NextResponse.error();
	}
}
