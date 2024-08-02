"use server";

import { getUserById, getUserByEmail, getUserByUsername } from "@/data/user";

export const get_user_by_id = async (userId: string) => {
	const user = await getUserById(userId);
	if (!user) {
		return { error: "User doesn't exist" };
	}
	return { user, success: "User found" };
};
export const get_user_by_email = async (email: string) => {
	const user = await getUserByEmail(email);
	if (!user) {
		return { error: "User doesn't exist" };
	}
	return { user, success: "User found" };
};

export const get_user_by_username = async (username: string) => {
	const user = await getUserByUsername(username);
	if (!user) {
		return { error: "User doesn't exist" };
	}
	return { user, success: "User found" };
};
