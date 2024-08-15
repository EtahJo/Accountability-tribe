import { getHiglightedUsers } from "@/data/user";
import { NextResponse ,NextRequest} from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const page = parseInt(pageString as string, 10);
	const pageLimit=12
	try {
		const highlightedUsers = await getHiglightedUsers(pageLimit,page);
		return NextResponse.json(highlightedUsers);
	} catch(error) {
		console.error("Error getting all highlighted users",error);
		NextResponse.error()
	}
}
