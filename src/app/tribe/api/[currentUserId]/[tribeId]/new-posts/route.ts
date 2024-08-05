import { getTribeById } from "@/data/tribe";
import { getAllTribeNewPosts,getAllTribePosts } from "@/data/post";
import { NextResponse } from "next/server";

export async function GET(req:Request,context:any){
    const {params} =context;
    try{
        const tribe = await getTribeById(params.tribeId, params.currentUserId);
        const newPosts =
				tribe?.tribeVisit.length === 1
					? await getAllTribeNewPosts(tribe.id, tribe.tribeVisit[0]?.lastVisit)
					: await getAllTribePosts(tribe?.id as string,  params.currentUserId);

       return NextResponse.json(newPosts)
    }catch(error){
        console.error("Error getting tribe new posts",error);
        NextResponse.error()
    }
}