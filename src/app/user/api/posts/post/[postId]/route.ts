import { getPostById } from "@/data/post";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
	const { params } = context;
	try {
		const post = await getPostById(params.postId);
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.error();
	}
}
