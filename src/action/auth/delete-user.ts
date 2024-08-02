"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";
import { logout } from "@/action/auth/logout";

export const delete_user = async (userId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorised" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}

	await db.user.delete({
		where: { id: userId },
	});
	revalidatePath("/");
	await logout();
	return { success: "Sad to see you go" };
};
