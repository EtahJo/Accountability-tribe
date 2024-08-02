import { getUserByUsername } from "@/data/user";
import { getAllUserPosts } from "@/data/post";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;

	try {
		const user = await getUserByUsername(params.username);
		const userPosts = await getAllUserPosts(
			user?.id as string,
			params.currentUserId,
		);
		return NextResponse.json(userPosts);
	} catch (error) {
		console.error("Error with user posts api", error);
		return NextResponse.error();
	}
}
