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
			},
		});
		return user;
	} catch {
		return null;
	}
};

export const getHiglightedUsers = async () => {
	try {
		const users = await db.user.findMany({
			where: {
				hightlighted: true,
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
			},
		});
		return users;
	} catch {
		return null;
	}
};
