"use server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";
import { getTribeById, getSpecificTribeAdmin } from "@/data/tribe";

export const delete_tribe = async (tribeId: string) => {
	const user = await currentUser();
	const dbUser = await getUserById(user?.id as string);
	if (!user || !dbUser) {
		return { error: "Unauthorised access" };
	}
	const tribe = await getTribeById(tribeId, user?.id as string);
	if (!tribe) {
		return { error: "Tribe does not exist" };
	}
	const isTribeAdmin = tribe.adminsUserIds.includes(
		dbUser?.id as string,
	);
	if (!isTribeAdmin) {
		return { error: "You are not allowed to delete tribe" };
	}
	if (tribe.users.length !== 0)
		return { error: "Tribe with members can not be deleted" };

	await db.tribe.delete({
		where: { id: tribe.id },
	});
	return {
		success: "Tribe deleted",
		creatorUsername: dbUser.username,
		tribeId,
	};
};
