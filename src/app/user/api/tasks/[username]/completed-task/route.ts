import { 
	getUserCompletedTask, 
	getUserCompletedTaskThisMonth,
	getUserCompletedTaskThisWeek,
	getUserCompletedTaskToday,
	getUserCompletedTaskThisYear,
	getUserCompletedTaskSpecificDate
 } from "@/data/task";
import { getUserByUsername } from "@/data/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
	const { params } = context;
	const searchParams = req.nextUrl.searchParams;
	const pageString = searchParams.get("page");
	const page = Number.parseInt(pageString as string, 10);
	const filterString = searchParams.get("filter");
	const dateString= searchParams.get('date');
	const perPage = 12;
	try {
		const user = await getUserByUsername(params.username);
		let userCompletedTasks;
		switch(filterString){
			case 'all':
				userCompletedTasks= await getUserCompletedTask(user?.id as string,perPage,page);
				break;
			case 'today':
				userCompletedTasks=await getUserCompletedTaskToday(user?.id as string,perPage,page);
				break;
			case 'thisWeek':
				userCompletedTasks=await getUserCompletedTaskThisWeek(user?.id as string,perPage,page);
				break;
			case 'thisMonth':
				userCompletedTasks= await getUserCompletedTaskThisMonth(user?.id as string,perPage,page);
				break;
			case 'thisYear':
				userCompletedTasks= await getUserCompletedTaskThisYear(user?.id as string,perPage,page);
				break;
			case 'date':
				userCompletedTasks= await getUserCompletedTaskSpecificDate(user?.id as string,perPage,page,dateString as string);
				break;
			default:
				userCompletedTasks= await getUserCompletedTask(user?.id as string,perPage,page);
		}
	

		return NextResponse.json(userCompletedTasks);
	} catch (error) {
		console.error("Error with getting users' completed tasks api", error);
		NextResponse.error();
	}
}
