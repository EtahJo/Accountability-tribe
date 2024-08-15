import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: { email },
		});
		return user;
	} catch {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({
			where: { id },
			include: {
				sessions: true,
				tasks: {
					where: {
						status: {
							not: Status.COMPLETE,
						},
					},
				},
				streak: true,
				notifications: {
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});
		return user;
	} catch {
		return null;
	}
};

export const getUserByUsername = async (username: string) => {
	try {
		const user = await db.user.findUnique({
			where: { username },
			include: {
				sessions: true,
				accounts:true,
			},
		});
		return user;
	} catch {
		return null;
	}
};
const totalHighlightedUsers = async()=>{
	try{
		const total = await db.user.count({
			where:{
				streak:{
					count:{
						gte:1
					}
				}
			}
		});
	return total;

	}catch(error:any){
		console.error("Error getting total of highlighted users",error.message)
	}
}

export const getHiglightedUsers = async (pageLimit:number,pageNumber:number) => {
	try {
		const totalItems= await totalHighlightedUsers();
		const totalPages = Math.ceil(totalItems as number/ pageLimit);
		const users = await db.user.findMany({
			where: {
				// hightlighted: true,
				streak: {
					count: {
						gte: 1,
					},
				},
			},
			include: {
				tribes: {
					include: {
						tribe: true,
					},
				},
				streak: true,
				accounts:true
			},
		take:pageLimit+1,
		skip:pageLimit*(pageNumber-1),
		});
		const hasMore = users.length>pageLimit;
		const result = hasMore? users.slice(0,pageLimit):users;
		return {users:result,hasMore,totalPages};
	} catch {
		return null;
	}
};


export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error:any){
    console.error("Error getting reset token by token",error.message);
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error:any){
    console.error("Error getting reset token by email",error.message);
  }
};